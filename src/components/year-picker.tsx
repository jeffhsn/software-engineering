"use client";

import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
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

/**
 * Iteration (term/year) switcher — a searchable Popover + Command dropdown,
 * same pattern as the language and subject pickers. Type to filter when a
 * subject has many years; ✓ marks the current one.
 */
export function YearPicker({ current, available, onSelect }: Props) {
  const [open, setOpen] = useState(false);
  const subject = getSubject(current.subject);
  const accent = subject ? ACCENT_INK[subject.accent] : "var(--ink)";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        aria-label={`Term: ${current.term}`}
        className={cn(
          "group inline-flex h-9 shrink-0 cursor-pointer items-center gap-1.5 rounded-full bg-foreground/[0.05] px-3 text-[13.5px] font-medium text-muted-foreground",
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
      <PopoverContent align="start" sideOffset={6} className="w-60 p-0">
        <Command>
          <CommandInput placeholder="Semester…" />
          <CommandList className="max-h-72">
            <CommandEmpty>—</CommandEmpty>
            <CommandGroup>
              {available.map((n) => {
                const active =
                  n.year === current.year && n.term === current.term;
                return (
                  <CommandItem
                    key={`${n.year}-${n.term}`}
                    value={`${n.term} ${n.year}`}
                    onSelect={() => {
                      setOpen(false);
                      if (!active) onSelect?.(n);
                    }}
                    className={cn(
                      "flex cursor-pointer items-center justify-between gap-2",
                      active && "font-semibold",
                    )}
                  >
                    <span className="flex items-center gap-2">
                      <span
                        aria-hidden
                        className="h-2 w-2 shrink-0 rounded-full"
                        style={{ backgroundColor: accent }}
                      />
                      <span>{n.term}</span>
                    </span>
                    {active && (
                      <span aria-hidden className="text-xs text-muted-foreground">
                        ✓
                      </span>
                    )}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
