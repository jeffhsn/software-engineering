import { cn } from "@/lib/utils";

/**
 * A "sheet of paper" placeholder shown while a PDF page (or the whole
 * document) rasterizes. When `loading` it shimmers and then morphs into
 * the real page; off-screen pages use the static variant. Replaces
 * react-pdf's repeated "Loading…" / "Loading page…" text — much nicer for
 * a cozy notebook site.
 */
export function PageSkeleton({
  height,
  loading = true,
  srLabel,
  className,
}: {
  height?: number;
  loading?: boolean;
  /** Optional screen-reader text (only for the visible top-level loader). */
  srLabel?: string;
  className?: string;
}) {
  return (
    <div
      role={srLabel ? "status" : undefined}
      aria-hidden={srLabel ? undefined : true}
      className={cn(
        "sheet-skeleton w-full",
        loading && "is-loading",
        className,
      )}
      style={height ? { height } : undefined}
    >
      {srLabel ? <span className="sr-only">{srLabel}</span> : null}
      <div className="flex flex-col gap-2.5 p-5 sm:p-6">
        <div className="sheet-bar h-3 w-1/2" />
        <div className="sheet-bar h-2 w-5/6" />
        <div className="sheet-bar h-2 w-2/3" />
        <div className="sheet-bar h-2 w-[72%]" />
      </div>
    </div>
  );
}
