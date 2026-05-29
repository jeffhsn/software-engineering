"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { cn } from "@/lib/utils";
import { PageSkeleton } from "@/components/pdf-skeleton";
import { PDF_ZOOM_FACTOR, usePdfZoom } from "@/lib/notebooks/use-pdf-zoom";

interface DocumentState {
  src: string;
  numPages: number | null;
  loadError: boolean;
}

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

interface Props {
  src: string;
  className?: string;
  /** Notify the parent once pdfjs has finished parsing the document. */
  onReady?: () => void;
  /**
   * `fit`  — fills the parent box and scrolls internally (default; for
   *          single-PDF panes).
   * `stack` — flows to natural height, leaves scrolling to the parent
   *          (so several PDFs can stack in one scrolling column).
   */
  mode?: "fit" | "stack";
}

/**
 * Embedded PDF — no toolbar. Pages render stacked vertically and are
 * virtualized: only pages near the viewport are actually rasterized,
 * everything else is a sized placeholder so the scrollbar/track stays
 * stable. As the user scrolls, more pages mount in.
 */
export function PdfViewer({ src, className, onReady, mode = "fit" }: Props) {
  const [containerElement, setContainerElement] = useState<HTMLDivElement | null>(
    null,
  );
  const [containerWidth, setContainerWidth] = useState<number | null>(null);
  const zoom = usePdfZoom();
  const [documentState, setDocumentState] = useState<DocumentState>({
    src,
    numPages: null,
    loadError: false,
  });
  // Real page aspect ratio (height / width). Slides are landscape (~0.56),
  // exercise sheets are portrait (~1.41). We measure it from page 1 so the
  // loading skeleton has the SAME shape as the slide — no ugly tall/thin
  // placeholder that then snaps to a wide slide.
  const [pageAspect, setPageAspect] = useState<number | null>(null);
  const currentDocument =
    documentState.src === src
      ? documentState
      : { src, numPages: null, loadError: false };

  useEffect(() => {
    if (!containerElement) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        // Stack mode (the notebook reader) gets the full container width
        // so slides actually fill the column. Fit mode keeps a little
        // breathing room for its own internal scrollbar.
        const pad = mode === "stack" ? 0 : 32;
        const w = entry.contentRect.width - pad;
        setContainerWidth(Math.max(200, w));
      }
    });
    ro.observe(containerElement);
    return () => ro.disconnect();
  }, [containerElement, mode]);

  // Stack mode (the notebook reader) always renders at the full column
  // width — slides should fill their column, period. Fit mode keeps the
  // user-controlled zoom for the dedicated viewer.
  const pageWidth =
    containerWidth === null
      ? null
      : mode === "stack"
        ? containerWidth
        : Math.max(220, Math.round(containerWidth * PDF_ZOOM_FACTOR[zoom]));

  const onLoad = useCallback(
    (pdf: {
      numPages: number;
      getPage: (n: number) => Promise<{
        getViewport: (o: { scale: number }) => { width: number; height: number };
      }>;
    }) => {
      setDocumentState({ src, numPages: pdf.numPages, loadError: false });
      // Measure page 1 so every placeholder matches the real slide shape.
      pdf
        .getPage(1)
        .then((page) => {
          const vp = page.getViewport({ scale: 1 });
          if (vp.width > 0) setPageAspect(vp.height / vp.width);
        })
        .catch(() => setPageAspect(1.414));
      onReady?.();
    },
    [onReady, src],
  );

  const isStack = mode === "stack";

  return (
    <div
      ref={setContainerElement}
      className={cn(
        "relative w-full",
        isStack
          ? "overflow-visible"
          : "h-full overflow-y-auto overflow-x-hidden",
        className,
      )}
    >
      {currentDocument.loadError ? (
        <div
          className={cn(
            "flex items-center justify-center px-6 py-10 text-sm text-muted-foreground",
            isStack ? "min-h-[160px]" : "h-full",
          )}
        >
          Could not load PDF.
        </div>
      ) : (
        <Document
          file={src}
          onLoadSuccess={onLoad}
          onLoadError={() =>
            setDocumentState({ src, numPages: null, loadError: true })
          }
          loading={
            <div className={cn("w-full", isStack ? "py-1" : "px-4 py-4")}>
              <PageSkeleton
                height={pageWidth ? Math.round(pageWidth * (pageAspect ?? 0.6)) : 320}
                srLabel="PDF wird geladen"
              />
            </div>
          }
          error={
            <div
              className={cn(
                "flex items-center justify-center px-6 py-10 text-sm text-muted-foreground",
                isStack ? "min-h-[160px]" : "h-full",
              )}
            >
              Failed to load.
            </div>
          }
          className={cn(
            "flex flex-col items-center",
            isStack ? "gap-3 py-1" : "gap-4 px-4 py-4",
          )}
        >
          {currentDocument.numPages && pageWidth ? (
            pageAspect ? (
              Array.from({ length: currentDocument.numPages }, (_, i) => (
                <LazyPage
                  key={`${src}-p-${i + 1}-w-${Math.round(pageWidth)}`}
                  root={isStack ? null : containerElement}
                  pageNumber={i + 1}
                  width={pageWidth}
                  aspect={pageAspect}
                  eager={i === 0}
                />
              ))
            ) : (
              // Aspect not measured yet (a tick after parse): one matching-width
              // skeleton, sized landscape-ish so no thin/tall slide flashes.
              <PageSkeleton height={Math.round(pageWidth * 0.6)} />
            )
          ) : null}
        </Document>
      )}
    </div>
  );
}

/**
 * One page wrapped in an IntersectionObserver gate. Until the wrapper is
 * within ~1 viewport of being on-screen, we render a sized placeholder.
 * Once mounted, we keep the page mounted — scrolling back is instant.
 */
function LazyPage({
  pageNumber,
  width,
  aspect,
  root,
  eager,
}: {
  pageNumber: number;
  width: number;
  /** Real page height/width, so the placeholder matches the rendered page. */
  aspect: number;
  root: HTMLElement | null;
  /** When true, mount immediately — used for the first page so it renders ASAP. */
  eager?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(!!eager);

  useEffect(() => {
    if (mounted || !ref.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setMounted(true);
          io.disconnect();
        }
      },
      { root: root ?? undefined, rootMargin: "300px 0px" },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [mounted, root]);

  const placeholderHeight = Math.round(width * aspect);

  return (
    <div ref={ref} style={{ width }}>
      {mounted ? (
        // Text + annotation layers are heavy and not needed for read-only
        // slide viewing — leaving them off ~halves per-page render time.
        <Page
          pageNumber={pageNumber}
          width={width}
          renderTextLayer={false}
          renderAnnotationLayer={false}
          className="shadow-sm!"
          loading={<PageSkeleton height={placeholderHeight} />}
        />
      ) : (
        <PageSkeleton height={placeholderHeight} loading={false} />
      )}
    </div>
  );
}
