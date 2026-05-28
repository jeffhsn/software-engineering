"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
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
 * Sun / moon toggle on a soft tinted button (no border). The glyph
 * does a little playful spin-and-scale on hover and swaps with the
 * mode — sun for day, moon for night.
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
        "group inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-foreground/[0.05]",
        "transition-colors hover:bg-foreground/[0.1]",
      )}
      suppressHydrationWarning
    >
      {isDark ? (
        <Moon
          aria-hidden
          className="h-[17px] w-[17px] fill-amber-200/30 text-amber-200 transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110"
          strokeWidth={1.75}
        />
      ) : (
        <Sun
          aria-hidden
          className="h-[18px] w-[18px] fill-amber-400/30 text-amber-500 transition-transform duration-300 group-hover:rotate-45 group-hover:scale-110"
          strokeWidth={1.75}
        />
      )}
    </button>
  );
}
