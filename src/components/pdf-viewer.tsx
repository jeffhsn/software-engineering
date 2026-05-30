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

// Use the LEGACY worker build (matches the legacy engine aliased in
// next.config). pdf.js v5's default build targets very recent browsers: its
// module worker needs Safari 16.4+ and the engine calls Promise.withResolvers
// (Safari 17.4+). On an older iPad (iPadOS 16.0–16.3) the default build throws
// while rendering and Safari kills the tab ("a problem repeatedly occurred").
// The legacy build is transpiled/polyfilled for those browsers.
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/legacy/build/pdf.worker.min.mjs",
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
  /**
   * Expected page aspect (height / width) before page 1 is measured — the
   * caller knows the material type (lecture slides ≈ 0.5625 = 16:9, exercise
   * sheets ≈ 1.414 = A4). Seeding it means every loading placeholder already
   * has the real page shape, so nothing morphs from a thin/short box into the
   * slide once parsing finishes; the measurement just confirms it.
   */
  initialAspect?: number;
}

/**
 * Embedded PDF — no toolbar. Pages render stacked vertically and are
 * virtualized: only pages near the viewport are actually rasterized,
 * everything else is a sized placeholder so the scrollbar/track stays
 * stable. As the user scrolls, more pages mount in.
 */
export function PdfViewer({
  src,
  className,
  onReady,
  mode = "fit",
  initialAspect,
}: Props) {
  const [containerElement, setContainerElement] = useState<HTMLDivElement | null>(
    null,
  );
  const [containerWidth, setContainerWidth] = useState<number | null>(null);
  // Cap the rasterisation resolution. pdf.js renders each page to a canvas of
  // width × devicePixelRatio pixels; on a Retina iPad that is ×2, which on a
  // 30-slide deck adds up to hundreds of MB and crashes the Safari tab
  // ("a problem repeatedly occurred"). 1.5 stays crisp for slides while
  // roughly halving canvas memory vs the native ×2. Measured on the client
  // after mount so SSR markup is unaffected.
  const [pixelRatio, setPixelRatio] = useState(1);
  useEffect(() => {
    setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  }, []);
  const zoom = usePdfZoom();
  const [documentState, setDocumentState] = useState<DocumentState>({
    src,
    numPages: null,
    loadError: false,
  });
  // Real page aspect ratio (height / width). Slides are landscape (0.5625 =
  // 16:9), exercise sheets are portrait (1.414 = A4). We SEED it with the
  // caller's hint so every placeholder already has the slide's shape, then
  // confirm it by measuring page 1 — no ugly tall/thin box that snaps to a
  // wide slide. `null` only if the caller gave no hint.
  const [pageAspect, setPageAspect] = useState<number | null>(
    initialAspect ?? null,
  );
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
                aspect={pageAspect ?? initialAspect ?? 0.5625}
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
                // Key is width-free on purpose: when the column resizes or the
                // user zooms, react-pdf re-fits the SAME mounted page in place
                // instead of unmounting → re-rasterizing every page (which
                // flashed). Smooth resize, no flicker.
                <LazyPage
                  key={`${src}-p-${i + 1}`}
                  root={isStack ? null : containerElement}
                  pageNumber={i + 1}
                  width={pageWidth}
                  aspect={pageAspect}
                  devicePixelRatio={pixelRatio}
                  eager={i === 0}
                />
              ))
            ) : (
              // Aspect neither hinted nor measured yet: one full-width skeleton
              // in the slide shape so no thin/tall box flashes.
              <PageSkeleton aspect={initialAspect ?? 0.5625} />
            )
          ) : null}
        </Document>
      )}
    </div>
  );
}

/**
 * One page wrapped in an IntersectionObserver gate. A page is only rasterised
 * while it is within ~1.5 viewports of the screen; once it scrolls far away it
 * is unmounted again and its canvas is freed. Keeping every viewed page
 * mounted (the old behaviour) means a long slide deck accumulates hundreds of
 * MB of canvases and crashes memory-constrained tablets — so we trade instant
 * scroll-back for bounded memory. The buffer is generous enough that normal
 * reading never sees a placeholder.
 */
function LazyPage({
  pageNumber,
  width,
  aspect,
  root,
  devicePixelRatio,
  eager,
}: {
  pageNumber: number;
  width: number;
  /** Real page height/width, so the placeholder matches the rendered page. */
  aspect: number;
  root: HTMLElement | null;
  /** Capped rasterisation ratio — keeps canvas memory in check on Retina. */
  devicePixelRatio: number;
  /** When true, mount immediately — used for the first page so it renders ASAP. */
  eager?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // `visible` mounts/unmounts the page for bounded memory; `rendered` drives the
  // crossfade so a freshly-rasterized slide settles in gently instead of popping.
  const [visible, setVisible] = useState(!!eager);
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) setVisible(entry.isIntersecting);
      },
      // ~1.5 screens of buffer: a page mounts ahead of the viewport so it has
      // time to rasterize and fade in before it is reached, and once it scrolls
      // that far away again it unmounts and frees its canvas — keeping resident
      // memory bounded on low-RAM tablets instead of growing with every page.
      { root: root ?? undefined, rootMargin: "1200px 0px" },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [root]);

  const placeholderHeight = Math.round(width * aspect);

  return (
    <div ref={ref} style={{ width }}>
      {visible ? (
        // The page reserves its real height immediately; the skeleton sits
        // underneath and crossfades out as the rasterized page fades in, so a
        // slide settles in gently instead of popping.
        <div className="relative" style={{ minHeight: placeholderHeight }}>
          <div
            aria-hidden
            className={cn(
              "absolute inset-0 transition-opacity duration-500 ease-out",
              rendered ? "opacity-0" : "opacity-100",
            )}
          >
            <PageSkeleton height={placeholderHeight} loading={!rendered} />
          </div>
          {/* Text + annotation layers are heavy and not needed for read-only
              slide viewing — leaving them off ~halves per-page render time.
              devicePixelRatio is capped by the parent to keep canvas memory in
              check on Retina. */}
          <Page
            pageNumber={pageNumber}
            width={width}
            devicePixelRatio={devicePixelRatio}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            onRenderSuccess={() => setRendered(true)}
            className={cn(
              "shadow-sm! transition-opacity duration-500 ease-out",
              rendered ? "opacity-100" : "opacity-0",
            )}
            loading={<div style={{ height: placeholderHeight }} />}
          />
        </div>
      ) : (
        <PageSkeleton height={placeholderHeight} loading={false} />
      )}
    </div>
  );
}
