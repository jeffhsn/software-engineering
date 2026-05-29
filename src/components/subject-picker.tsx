"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useI18n } from "@/lib/i18n/client";
import { SUBJECTS } from "@/lib/subjects/registry";
import { getNotebook } from "@/lib/notebooks/registry";
import type { Subject } from "@/lib/subjects/types";
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
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * The current-subject pill, but as a searchable dropdown of every notebook —
 * same Popover + Command pattern as the language switcher, so you can jump to
 * another Fach fast. Subjects that already have a notebook deep-link into
 * chapter 1 (the primary "click → start reading" flow); the rest open their
 * subject home and are flagged „bald".
 */
export function SubjectPicker({ current }: { current: Subject }) {
  const { dict } = useI18n();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        aria-label={dict.nav.allSubjects}
        className={cn(
          "group inline-flex h-9 min-w-0 cursor-pointer items-center gap-2 rounded-full bg-foreground/[0.05] px-3.5",
          "transition-colors hover:bg-foreground/[0.1]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
          "data-[state=open]:bg-foreground/[0.1]",
        )}
      >
        <span className="shrink-0 text-[16px] leading-none transition-transform group-hover:-rotate-6">
          {current.emoji}
        </span>
        <span className="truncate font-serif text-[13.5px] font-medium text-foreground">
          {current.title}
        </span>
        <ChevronDown
          className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform group-data-[state=open]:rotate-180"
          strokeWidth={2}
        />
      </PopoverTrigger>
      <PopoverContent align="start" sideOffset={6} className="w-72 p-0">
        <Command>
          <CommandInput placeholder={dict.nav.allSubjects + "…"} />
          <CommandList className="max-h-80">
            <CommandEmpty>—</CommandEmpty>
            <CommandGroup>
              {SUBJECTS.map((s) => {
                const active = s.slug === current.slug;
                const hasNotebook = Boolean(getNotebook(s.slug));
                return (
                  <CommandItem
                    key={s.slug}
                    value={`${s.title} ${s.shortTitle} ${s.slug}`}
                    onSelect={() => {
                      setOpen(false);
                      if (!active) {
                        router.push(
                          hasNotebook
                            ? `/subjects/${s.slug}?l=1`
                            : `/subjects/${s.slug}`,
                        );
                      }
                    }}
                    className={cn(
                      "flex cursor-pointer items-center justify-between gap-2",
                      active && "font-semibold",
                    )}
                  >
                    <span className="flex min-w-0 items-center gap-2">
                      <span aria-hidden className="shrink-0 text-[15px] leading-none">
                        {s.emoji}
                      </span>
                      <span className="truncate">{s.title}</span>
                    </span>
                    {active ? (
                      <span aria-hidden className="shrink-0 text-xs text-muted-foreground">
                        ✓
                      </span>
                    ) : !hasNotebook ? (
                      <span className="shrink-0 text-[10px] uppercase tracking-wider text-muted-foreground">
                        bald
                      </span>
                    ) : null}
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
