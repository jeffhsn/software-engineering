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
}

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
  },
};
