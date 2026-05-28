import { cn } from "@/lib/utils";

/**
 * Single source of truth for the three-column page geometry. Header,
 * progress strip, body, and floating nav all align to these tokens so
 * the cells of every page line up vertically across the site.
 */
export const SHELL_GRID =
  "grid grid-cols-1 lg:grid-cols-[19rem_minmax(0,1fr)_21rem]";

/**
 * Header-specific grid. Mobile keeps a real 3-cell row (so brand, title
 * and switchers don't stack on top of each other) and at `lg+` it
 * mirrors the body `SHELL_GRID` widths so the cells line up vertically
 * with the rails below.
 */
export const HEADER_GRID =
  "grid grid-cols-[auto_minmax(0,1fr)_auto] lg:grid-cols-[19rem_minmax(0,1fr)_21rem]";

/**
 * Two-column geometry for the notebook reading view: left nav tree +
 * wide content column. Header uses `NOTEBOOK_HEADER_GRID` on the same
 * routes so the year picker lines up with the reading column.
 */
export const NOTEBOOK_GRID =
  "grid grid-cols-1 lg:grid-cols-[19rem_minmax(0,1fr)]";

export const NOTEBOOK_HEADER_GRID =
  "grid grid-cols-[auto_minmax(0,1fr)_auto] lg:grid-cols-[19rem_minmax(0,1fr)]";

interface ContainerProps {
  className?: string;
  children: React.ReactNode;
}

/**
 * Full-bleed outer wrapper used by the header and every page that adopts
 * the shell. The content stretches edge-to-edge — only a tiny side
 * padding keeps cells from touching the viewport border.
 */
export function ShellContainer({ className, children }: ContainerProps) {
  return (
    <div className={cn("w-full px-4 sm:px-6", className)}>{children}</div>
  );
}
