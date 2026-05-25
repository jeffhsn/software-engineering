"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { cn } from "@/lib/utils";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

interface Props {
  src: string;
  className?: string;
  /** Notify the parent once pdfjs has finished parsing the document. */
  onReady?: () => void;
}

/**
 * Embedded PDF — no toolbar. Pages render stacked vertically and are
 * virtualized: only pages near the viewport are actually rasterized,
 * everything else is a sized placeholder so the scrollbar/track stays
 * stable. As the user scrolls, more pages mount in.
 */
export function PdfViewer({ src, className, onReady }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageWidth, setPageWidth] = useState<number | null>(null);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    setLoadError(false);
    setNumPages(null);
  }, [src]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width - 32;
        setPageWidth(Math.max(200, w));
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const onLoad = useCallback(
    (d: { numPages: number }) => {
      setNumPages(d.numPages);
      onReady?.();
    },
    [onReady],
  );

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative h-full w-full overflow-y-auto overflow-x-hidden",
        className,
      )}
    >
      {loadError ? (
        <div className="flex h-full items-center justify-center px-6 py-10 text-sm text-muted-foreground">
          Could not load PDF.
        </div>
      ) : (
        <Document
          file={src}
          onLoadSuccess={onLoad}
          onLoadError={() => setLoadError(true)}
          loading={
            <div className="flex h-full items-center justify-center px-6 py-10 text-sm text-muted-foreground">
              Loading…
            </div>
          }
          error={
            <div className="flex h-full items-center justify-center px-6 py-10 text-sm text-muted-foreground">
              Failed to load.
            </div>
          }
          className="flex flex-col items-center gap-4 px-4 py-4"
        >
          {numPages &&
            pageWidth &&
            Array.from({ length: numPages }, (_, i) => (
              <LazyPage
                key={`${src}-p-${i + 1}-w-${Math.round(pageWidth)}`}
                root={containerRef.current}
                pageNumber={i + 1}
                width={pageWidth}
                eager={i === 0}
              />
            ))}
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
  root,
  eager,
}: {
  pageNumber: number;
  width: number;
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

  const placeholderHeight = Math.round(width * 1.414);

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
          className="!shadow-sm"
        />
      ) : (
        <div
          aria-hidden
          className="rounded-sm border border-border/40 bg-muted/40"
          style={{ height: placeholderHeight }}
        />
      )}
    </div>
  );
}
