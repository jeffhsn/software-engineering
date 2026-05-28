"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Theme = "light" | "dark";

const THEME_COOKIE = "se-bsc-theme";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

function detectInitial(): Theme {
  if (typeof document === "undefined") return "light";
  const m = document.cookie.match(new RegExp(`(?:^|; )${THEME_COOKIE}=([^;]+)`));
  const v = m?.[1];
  if (v === "dark") return "dark";
  if (v === "light") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.cookie = `${THEME_COOKIE}=${theme}; path=/; max-age=${COOKIE_MAX_AGE}; samesite=lax`;
}

/**
 * Small sun/moon toggle. Borderless — just the glyph on the page.
 * Flips between modes on click; the inactive glyph fades out.
 */
export function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTheme(detectInitial());
    setMounted(true);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
  };

  const isDark = mounted && theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Tagmodus" : "Nachtmodus"}
      title={isDark ? "Tagmodus" : "Nachtmodus"}
      className={cn(
        "inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-base text-foreground/80",
        "transition-colors hover:bg-foreground/5 hover:text-foreground",
      )}
      suppressHydrationWarning
    >
      <span aria-hidden className="leading-none">
        {isDark ? "☾" : "☀"}
      </span>
    </button>
  );
}
