"use client";

import { useEffect, useState } from "react";
import { Settings, X } from "lucide-react";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { LanguageList } from "@/components/language-switcher";
import { ReadingControls } from "@/components/reading-settings";
import { cn } from "@/lib/utils";

/**
 * One gear button that opens a right-side drawer bundling every display
 * control — theme, text/reading settings and language. Used on small screens
 * where three separate pills don't fit; on desktop the controls stay split
 * out in the header. A full-height drawer (like the chapter drawer) makes it
 * obvious the content scrolls — unlike a small popover.
 */
export function SettingsMenu({
  showReading = true,
}: {
  /** The reading/text controls only matter inside a notebook. */
  showReading?: boolean;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-label="Einstellungen"
        title="Einstellungen"
        onClick={() => setOpen(true)}
        className={cn(
          "group inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-foreground/[0.05]",
          "transition-colors hover:bg-foreground/[0.1]",
        )}
      >
        <Settings
          aria-hidden
          className="h-[18px] w-[18px] text-muted-foreground transition-transform duration-300 group-hover:rotate-45 group-hover:text-foreground"
          strokeWidth={1.75}
        />
      </button>

      {open && (
        <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true">
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Schließen"
            onClick={() => setOpen(false)}
            className="absolute inset-0 cursor-default bg-black/40 animate-in fade-in duration-150"
          />
          {/* Panel — slides in from the right (the gear lives top-right). */}
          <div className="absolute inset-y-0 right-0 flex w-[84vw] max-w-sm flex-col bg-background shadow-2xl animate-in slide-in-from-right duration-200">
            <div className="flex shrink-0 items-center justify-between gap-2 border-b border-border/60 px-4 py-3">
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Einstellungen
              </span>
              <button
                type="button"
                aria-label="Schließen"
                onClick={() => setOpen(false)}
                className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-foreground/[0.05] transition-colors hover:bg-foreground/[0.1]"
              >
                <X className="h-4 w-4 text-muted-foreground" strokeWidth={2} />
              </button>
            </div>

            <div className="min-h-0 flex-1 space-y-6 overflow-y-auto overscroll-contain p-4">
              {/* Theme */}
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Darstellung
                </span>
                <ThemeSwitcher />
              </div>

              {/* Text / reading */}
              {showReading && <ReadingControls />}

              {/* Language */}
              <div>
                <div className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Sprache
                </div>
                <div className="overflow-hidden rounded-lg border border-border/60">
                  <LanguageList
                    listClassName="max-h-[40vh]"
                    onPicked={() => setOpen(false)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
