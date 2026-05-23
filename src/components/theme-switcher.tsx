"use client";

import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type Theme = "light" | "dark" | "system";

const THEME_COOKIE = "se-bsc-theme";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

const OPTIONS: { value: Theme; label: string; icon: string }[] = [
  { value: "light", label: "Light", icon: "☀" },
  { value: "dark", label: "Dark", icon: "☾" },
  { value: "system", label: "System", icon: "◐" },
];

function readCookie(): Theme {
  if (typeof document === "undefined") return "system";
  const m = document.cookie.match(new RegExp(`(?:^|; )${THEME_COOKIE}=([^;]+)`));
  const v = m?.[1] as Theme | undefined;
  return v === "light" || v === "dark" || v === "system" ? v : "system";
}

function applyTheme(theme: Theme) {
  const dark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.classList.toggle("dark", dark);
  document.cookie = `${THEME_COOKIE}=${theme}; path=/; max-age=${COOKIE_MAX_AGE}; samesite=lax`;
}

export function ThemeSwitcher() {
  const [theme, setThemeState] = useState<Theme>("system");
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setThemeState(readCookie());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (theme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => applyTheme("system");
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [theme]);

  const setTheme = (next: Theme) => {
    setThemeState(next);
    applyTheme(next);
    setOpen(false);
  };

  const current = OPTIONS.find((o) => o.value === theme) ?? OPTIONS[2];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        aria-label="Theme"
        className={cn(
          "inline-flex h-7 cursor-pointer items-center justify-center gap-1.5 rounded-md border border-border/60 bg-card px-2 text-xs font-medium",
          "transition-colors hover:bg-accent hover:text-accent-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        )}
      >
        <span aria-hidden className="text-sm leading-none">
          {mounted ? current.icon : "◐"}
        </span>
      </PopoverTrigger>
      <PopoverContent align="end" sideOffset={6} className="w-36 p-1">
        {OPTIONS.map((o) => {
          const active = o.value === theme;
          return (
            <button
              key={o.value}
              type="button"
              onClick={() => setTheme(o.value)}
              className={cn(
                "flex w-full cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm",
                "transition-colors hover:bg-accent",
                active && "font-semibold",
              )}
            >
              <span aria-hidden className="text-base leading-none">
                {o.icon}
              </span>
              <span>{o.label}</span>
              {active && (
                <span aria-hidden className="ms-auto text-xs text-muted-foreground">
                  ✓
                </span>
              )}
            </button>
          );
        })}
      </PopoverContent>
    </Popover>
  );
}
