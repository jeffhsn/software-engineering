"use client";

import { Settings } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { LanguageList } from "@/components/language-switcher";
import { ReadingControls } from "@/components/reading-settings";
import { cn } from "@/lib/utils";

/**
 * One gear button that bundles every display control — theme, language and
 * the text/reading settings — behind a single popover. Used on small screens
 * where three separate pills don't fit; on desktop the controls stay split
 * out in the header.
 */
export function SettingsMenu({
  showReading = true,
}: {
  /** The reading/text controls only matter inside a notebook. */
  showReading?: boolean;
}) {
  return (
    <Popover>
      <PopoverTrigger
        aria-label="Einstellungen"
        title="Einstellungen"
        className={cn(
          "group inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-foreground/[0.05]",
          "transition-colors hover:bg-foreground/[0.1]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "data-[state=open]:bg-foreground/[0.1]",
        )}
      >
        <Settings
          aria-hidden
          className="h-[18px] w-[18px] text-muted-foreground transition-transform duration-300 group-hover:rotate-45 group-hover:text-foreground"
          strokeWidth={1.75}
        />
      </PopoverTrigger>
      <PopoverContent
        align="end"
        sideOffset={6}
        className="grid max-h-[80vh] w-72 gap-4 overflow-y-auto p-3"
      >
        {/* Theme */}
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Darstellung
          </span>
          <ThemeSwitcher />
        </div>

        {/* Language */}
        <div>
          <div className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Sprache
          </div>
          <div className="overflow-hidden rounded-lg border border-border/60">
            <LanguageList />
          </div>
        </div>

        {/* Text / reading */}
        {showReading && (
          <div className="border-t border-border/60 pt-3">
            <ReadingControls />
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
