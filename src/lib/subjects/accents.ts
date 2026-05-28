import type { AccentColor } from "./types";

interface AccentClasses {
  dot: string;
  ring: string;
  text: string;
  bg: string;
  border: string;
  hoverBorder: string;
  hoverBg: string;
  badgeBg: string;
  badgeText: string;
  /**
   * Soft, paper-respecting wash for the notebook header body. Sits on top
   * of the page background, blends with the cream/leather palette instead
   * of fighting it.
   */
  notebookCover: string;
  /**
   * Thin saturated strip at the very top of the notebook header — the
   * binding/spine of the notebook. Uses the saturated 500 shade.
   */
  notebookSpine: string;
  /**
   * Soft accent border at the bottom of the notebook header. Makes the
   * cover feel lifted from the page below.
   */
  notebookEdge: string;
}

/**
 * Raw accent ink per subject, as an oklch string. Threaded into the
 * notebook reader as the `--accent` CSS variable so the active tab,
 * progress bar and focus ring all carry the subject's identity (the
 * same color used on its home-page cover card). Mid shade chosen to
 * read well on both the ivory light paper and the charcoal dark page.
 */
export const ACCENT_INK: Record<AccentColor, string> = {
  red: "oklch(0.62 0.21 25.3)",
  indigo: "oklch(0.585 0.233 277.1)",
  emerald: "oklch(0.66 0.16 163.2)",
  amber: "oklch(0.72 0.17 65)",
  fuchsia: "oklch(0.62 0.27 322.9)",
  sky: "oklch(0.62 0.16 240)",
  teal: "oklch(0.66 0.13 183)",
};

export const ACCENT: Record<AccentColor, AccentClasses> = {
  red: {
    dot: "bg-red-500",
    ring: "ring-red-500/30",
    text: "text-red-600 dark:text-red-400",
    bg: "bg-red-500",
    border: "border-red-500/20",
    hoverBorder: "hover:border-red-500/50",
    hoverBg: "hover:bg-red-500/5",
    badgeBg: "bg-red-500/10 dark:bg-red-500/15",
    badgeText: "text-red-700 dark:text-red-300",
    notebookCover: "bg-red-50/85 dark:bg-red-950/45",
    notebookSpine: "bg-red-500",
    notebookEdge: "border-red-200/70 dark:border-red-900/50",
  },
  indigo: {
    dot: "bg-indigo-500",
    ring: "ring-indigo-500/30",
    text: "text-indigo-600 dark:text-indigo-400",
    bg: "bg-indigo-500",
    border: "border-indigo-500/20",
    hoverBorder: "hover:border-indigo-500/50",
    hoverBg: "hover:bg-indigo-500/5",
    badgeBg: "bg-indigo-500/10 dark:bg-indigo-500/15",
    badgeText: "text-indigo-700 dark:text-indigo-300",
    notebookCover: "bg-indigo-50/85 dark:bg-indigo-950/45",
    notebookSpine: "bg-indigo-500",
    notebookEdge: "border-indigo-200/70 dark:border-indigo-900/50",
  },
  emerald: {
    dot: "bg-emerald-500",
    ring: "ring-emerald-500/30",
    text: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-500",
    border: "border-emerald-500/20",
    hoverBorder: "hover:border-emerald-500/50",
    hoverBg: "hover:bg-emerald-500/5",
    badgeBg: "bg-emerald-500/10 dark:bg-emerald-500/15",
    badgeText: "text-emerald-700 dark:text-emerald-300",
    notebookCover: "bg-emerald-50/85 dark:bg-emerald-950/45",
    notebookSpine: "bg-emerald-500",
    notebookEdge: "border-emerald-200/70 dark:border-emerald-900/50",
  },
  amber: {
    dot: "bg-amber-500",
    ring: "ring-amber-500/30",
    text: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-500",
    border: "border-amber-500/20",
    hoverBorder: "hover:border-amber-500/50",
    hoverBg: "hover:bg-amber-500/5",
    badgeBg: "bg-amber-500/10 dark:bg-amber-500/15",
    badgeText: "text-amber-700 dark:text-amber-300",
    notebookCover: "bg-amber-50/85 dark:bg-amber-950/45",
    notebookSpine: "bg-amber-500",
    notebookEdge: "border-amber-200/70 dark:border-amber-900/50",
  },
  fuchsia: {
    dot: "bg-fuchsia-500",
    ring: "ring-fuchsia-500/30",
    text: "text-fuchsia-600 dark:text-fuchsia-400",
    bg: "bg-fuchsia-500",
    border: "border-fuchsia-500/20",
    hoverBorder: "hover:border-fuchsia-500/50",
    hoverBg: "hover:bg-fuchsia-500/5",
    badgeBg: "bg-fuchsia-500/10 dark:bg-fuchsia-500/15",
    badgeText: "text-fuchsia-700 dark:text-fuchsia-300",
    notebookCover: "bg-fuchsia-50/85 dark:bg-fuchsia-950/45",
    notebookSpine: "bg-fuchsia-500",
    notebookEdge: "border-fuchsia-200/70 dark:border-fuchsia-900/50",
  },
  sky: {
    dot: "bg-sky-500",
    ring: "ring-sky-500/30",
    text: "text-sky-600 dark:text-sky-400",
    bg: "bg-sky-500",
    border: "border-sky-500/20",
    hoverBorder: "hover:border-sky-500/50",
    hoverBg: "hover:bg-sky-500/5",
    badgeBg: "bg-sky-500/10 dark:bg-sky-500/15",
    badgeText: "text-sky-700 dark:text-sky-300",
    notebookCover: "bg-sky-50/85 dark:bg-sky-950/45",
    notebookSpine: "bg-sky-500",
    notebookEdge: "border-sky-200/70 dark:border-sky-900/50",
  },
  teal: {
    dot: "bg-teal-500",
    ring: "ring-teal-500/30",
    text: "text-teal-600 dark:text-teal-400",
    bg: "bg-teal-500",
    border: "border-teal-500/20",
    hoverBorder: "hover:border-teal-500/50",
    hoverBg: "hover:bg-teal-500/5",
    badgeBg: "bg-teal-500/10 dark:bg-teal-500/15",
    badgeText: "text-teal-700 dark:text-teal-300",
    notebookCover: "bg-teal-50/85 dark:bg-teal-950/45",
    notebookSpine: "bg-teal-500",
    notebookEdge: "border-teal-200/70 dark:border-teal-900/50",
  },
};
