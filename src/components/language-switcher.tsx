"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n/client";
import { LOCALES } from "@/lib/i18n/locales";
import type { Locale } from "@/lib/i18n/types";
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

export function LanguageSwitcher() {
  const { locale, setLocale, dict } = useI18n();
  const [open, setOpen] = useState(false);
  const current = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        aria-label={dict.nav.language}
        className={cn(
          "group inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-full bg-foreground/[0.05] px-3 text-[13.5px]",
          "transition-colors hover:bg-foreground/[0.1]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "data-[state=open]:bg-foreground/[0.1]",
        )}
      >
        <span className="text-sm leading-none" aria-hidden>
          {current.flag}
        </span>
        <span className="hidden font-serif italic text-muted-foreground group-hover:text-foreground sm:inline">
          {current.nativeLabel}
        </span>
        <ChevronDown
          className="h-3.5 w-3.5 text-muted-foreground transition-transform group-hover:text-foreground group-data-[state=open]:rotate-180"
          strokeWidth={2}
        />
      </PopoverTrigger>
      <PopoverContent align="end" sideOffset={6} className="w-64 p-0">
        <LanguageList onPicked={() => setOpen(false)} />
      </PopoverContent>
    </Popover>
  );
}

/**
 * The searchable language list itself (no popover) — used inside the
 * standalone LanguageSwitcher popover and inside the combined mobile
 * settings menu.
 */
export function LanguageList({
  onPicked,
  listClassName = "max-h-72",
}: {
  onPicked?: () => void;
  listClassName?: string;
}) {
  const { locale, setLocale, dict } = useI18n();
  return (
    <Command>
      <CommandInput placeholder={dict.nav.language + "…"} />
      <CommandList className={listClassName}>
        <CommandEmpty>—</CommandEmpty>
        <CommandGroup>
          {LOCALES.map((l) => {
            const active = l.code === locale;
            return (
              <CommandItem
                key={l.code}
                value={`${l.nativeLabel} ${l.label} ${l.code}`}
                onSelect={() => {
                  onPicked?.();
                  if (!active) setLocale(l.code as Locale);
                }}
                className={cn(
                  "flex cursor-pointer items-center justify-between gap-2",
                  active && "font-semibold",
                )}
              >
                <span className="flex items-center gap-2">
                  <span aria-hidden>{l.flag}</span>
                  <span>{l.nativeLabel}</span>
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    {l.code}
                  </span>
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
  );
}
