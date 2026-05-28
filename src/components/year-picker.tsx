"use client";

import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { Notebook } from "@/lib/notebooks/types";
import { getSubject } from "@/lib/subjects/registry";
import { ACCENT_INK } from "@/lib/subjects/accents";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  current: Notebook;
  available: Notebook[];
  onSelect?: (notebook: Notebook) => void;
}

export function YearPicker({ current, available, onSelect }: Props) {
  const [open, setOpen] = useState(false);
  const subject = getSubject(current.subject);
  const accent = subject ? ACCENT_INK[subject.accent] : "var(--ink)";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        aria-label={`Term: ${current.term}`}
        className={cn(
          "group inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full bg-foreground/[0.05] px-3 py-1.5 text-[12px] font-medium text-muted-foreground",
          "transition-colors hover:bg-foreground/[0.1] hover:text-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
          "data-[state=open]:bg-foreground/[0.1]",
        )}
      >
        <span
          aria-hidden
          className="h-2 w-2 shrink-0 rounded-full"
          style={{ backgroundColor: accent }}
        />
        <span className="font-serif italic">{current.term}</span>
        <ChevronDown
          className="h-3.5 w-3.5 transition-transform group-data-[state=open]:rotate-180"
          strokeWidth={2}
        />
      </PopoverTrigger>
      <PopoverContent align="start" sideOffset={6} className="w-56 p-1">
        <div className="px-2 pb-1 pt-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
          Iteration
        </div>
        {available.map((n) => {
          const active = n.year === current.year && n.term === current.term;
          return (
            <button
              key={`${n.year}-${n.term}`}
              type="button"
              onClick={() => {
                setOpen(false);
                if (!active) onSelect?.(n);
              }}
              disabled={active}
              className={cn(
                "flex w-full items-center justify-between gap-2 rounded-sm px-2 py-1.5 text-sm",
                "transition-colors hover:bg-accent",
                active ? "font-semibold" : "cursor-pointer",
              )}
            >
              <span>{n.term}</span>
              {active && (
                <span
                  aria-hidden
                  className="text-xs text-muted-foreground"
                >
                  ✓
                </span>
              )}
            </button>
          );
        })}
        {available.length === 1 && (
          <p className="border-t border-border/60 px-2 pb-1.5 pt-2 text-[11px] leading-snug text-muted-foreground">
            Only one iteration uploaded. New years will appear here when added.
          </p>
        )}
      </PopoverContent>
    </Popover>
  );
}
