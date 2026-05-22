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
          "inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-border/60 bg-card px-2.5 py-1 text-xs font-medium",
          "transition-colors hover:bg-accent/60 hover:text-accent-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        )}
      >
        <span className="text-sm leading-none" aria-hidden>
          {current.flag}
        </span>
        <span className="uppercase tracking-wider text-muted-foreground">
          {current.code}
        </span>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        sideOffset={6}
        className="w-64 p-0"
      >
        <Command>
          <CommandInput placeholder={dict.nav.language + "…"} />
          <CommandList className="max-h-72">
            <CommandEmpty>—</CommandEmpty>
            <CommandGroup>
              {LOCALES.map((l) => {
                const active = l.code === locale;
                return (
                  <CommandItem
                    key={l.code}
                    value={`${l.nativeLabel} ${l.label} ${l.code}`}
                    onSelect={() => {
                      setOpen(false);
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
      </PopoverContent>
    </Popover>
  );
}
