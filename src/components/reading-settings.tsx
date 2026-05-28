"use client";

import { useState } from "react";
import { AArrowDown, AArrowUp, ALargeSmall, RotateCcw } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const SCALE_KEY = "se-bsc-reading-scale";
const LEADING_KEY = "se-bsc-reading-leading";
const MIN = 0.8;
const MAX = 1.5;
const STEP = 0.1;

const LEADINGS = [
  { label: "Eng", value: 0.9 },
  { label: "Normal", value: 1 },
  { label: "Luftig", value: 1.15 },
] as const;

function round(n: number) {
  return Math.round(n * 100) / 100;
}

function clampScale(n: number) {
  return Math.min(MAX, Math.max(MIN, round(n)));
}

function applyScale(scale: number) {
  document.documentElement.style.setProperty("--reading-scale", String(scale));
  try {
    localStorage.setItem(SCALE_KEY, String(scale));
  } catch {}
}

function applyLeading(leading: number) {
  document.documentElement.style.setProperty(
    "--reading-leading",
    String(leading),
  );
  try {
    localStorage.setItem(LEADING_KEY, String(leading));
  } catch {}
}

/**
 * Text / reading settings — a soft tinted "Aa" button next to the theme
 * toggle. Opens a small panel to adjust the reading font size and line
 * spacing of the Erklärungen / walkthroughs. The choices are persisted in
 * localStorage and applied as CSS variables (--reading-scale,
 * --reading-leading) on <html>, consumed by `.prose-notebook`.
 */
function readStored(key: string, fallback: number) {
  if (typeof window === "undefined") return fallback;
  const v = parseFloat(localStorage.getItem(key) ?? "");
  return Number.isNaN(v) ? fallback : v;
}

export function ReadingSettings() {
  // Mirror whatever the pre-paint inline script already applied.
  const [scale, setScale] = useState(() => clampScale(readStored(SCALE_KEY, 1)));
  const [leading, setLeading] = useState(() => readStored(LEADING_KEY, 1));

  const changeScale = (next: number) => {
    const c = clampScale(next);
    setScale(c);
    applyScale(c);
  };

  const changeLeading = (next: number) => {
    setLeading(next);
    applyLeading(next);
  };

  const reset = () => {
    changeScale(1);
    changeLeading(1);
  };

  const pct = Math.round(scale * 100);
  const atMin = scale <= MIN + 1e-9;
  const atMax = scale >= MAX - 1e-9;

  return (
    <Popover>
      <PopoverTrigger
        aria-label="Textgröße & Lesedarstellung"
        title="Text"
        className={cn(
          "group inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-foreground/[0.05]",
          "transition-colors hover:bg-foreground/[0.1]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "data-[state=open]:bg-foreground/[0.1]",
        )}
      >
        <ALargeSmall
          aria-hidden
          className="h-[19px] w-[19px] text-muted-foreground transition-transform duration-300 group-hover:scale-110 group-hover:text-foreground"
          strokeWidth={1.75}
        />
      </PopoverTrigger>
      <PopoverContent align="end" sideOffset={6} className="w-64 gap-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Text
          </span>
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] text-muted-foreground transition-colors hover:bg-foreground/[0.06] hover:text-foreground"
          >
            <RotateCcw aria-hidden className="h-3 w-3" strokeWidth={2} />
            Zurücksetzen
          </button>
        </div>

        {/* Font size */}
        <div>
          <div className="mb-1.5 flex items-center justify-between text-[13px]">
            <span className="text-foreground">Schriftgröße</span>
            <span className="font-serif italic text-muted-foreground">
              {pct}%
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Schrift verkleinern"
              disabled={atMin}
              onClick={() => changeScale(scale - STEP)}
              className={cn(
                "inline-flex h-9 flex-1 cursor-pointer items-center justify-center rounded-lg bg-foreground/[0.05] transition-colors hover:bg-foreground/[0.1]",
                "disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-foreground/[0.05]",
              )}
            >
              <AArrowDown aria-hidden className="h-4 w-4" strokeWidth={1.75} />
            </button>
            <button
              type="button"
              aria-label="Schrift vergrößern"
              disabled={atMax}
              onClick={() => changeScale(scale + STEP)}
              className={cn(
                "inline-flex h-9 flex-1 cursor-pointer items-center justify-center rounded-lg bg-foreground/[0.05] transition-colors hover:bg-foreground/[0.1]",
                "disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-foreground/[0.05]",
              )}
            >
              <AArrowUp aria-hidden className="h-5 w-5" strokeWidth={1.75} />
            </button>
          </div>
        </div>

        {/* Line spacing */}
        <div>
          <div className="mb-1.5 text-[13px] text-foreground">Zeilenabstand</div>
          <div className="flex items-center gap-1.5">
            {LEADINGS.map((opt) => {
              const active = Math.abs(leading - opt.value) < 1e-9;
              return (
                <button
                  key={opt.label}
                  type="button"
                  onClick={() => changeLeading(opt.value)}
                  className={cn(
                    "inline-flex h-8 flex-1 cursor-pointer items-center justify-center rounded-lg text-[12.5px] transition-colors",
                    active
                      ? "bg-foreground text-background"
                      : "bg-foreground/[0.05] text-muted-foreground hover:bg-foreground/[0.1] hover:text-foreground",
                  )}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
