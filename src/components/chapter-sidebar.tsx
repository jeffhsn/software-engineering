"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, Home } from "lucide-react";
import type { Lesson, Notebook } from "@/lib/notebooks/types";
import { useI18n } from "@/lib/i18n/client";
import { setLessonInUrl } from "@/lib/notebooks/nav";
import { getSubject } from "@/lib/subjects/registry";
import { ACCENT_INK } from "@/lib/subjects/accents";
import { cn } from "@/lib/utils";

/**
 * Mobile-only chapter drawer. A hamburger button in the header opens a
 * left off-canvas panel (e-commerce style) listing every chapter, so the
 * header doesn't have to carry the chapter picker on a narrow screen.
 */
export function ChapterSidebar({
  notebook,
  currentLesson,
}: {
  notebook: Notebook;
  currentLesson?: Lesson;
}) {
  const { tr } = useI18n();
  const [open, setOpen] = useState(false);
  const subject = getSubject(notebook.subject);
  const accent = subject ? ACCENT_INK[subject.accent] : "var(--ink)";

  // Lock body scroll + close on Escape while the drawer is open.
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
        aria-label="Kapitel"
        title="Kapitel"
        onClick={() => setOpen(true)}
        className={cn(
          "inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-foreground/[0.05]",
          "transition-colors hover:bg-foreground/[0.1]",
        )}
      >
        <Menu className="h-[19px] w-[19px] text-muted-foreground" strokeWidth={1.75} />
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
          {/* Panel */}
          <div className="absolute inset-y-0 left-0 flex w-[84vw] max-w-80 flex-col bg-background shadow-2xl animate-in slide-in-from-left duration-200">
            <div className="flex shrink-0 items-center justify-between gap-2 border-b border-border/60 px-4 py-3">
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Inhalt
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

            <ul className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-2">
              {notebook.lessons.map((lesson) => {
                const active = lesson.number === currentLesson?.number;
                return (
                  <li key={lesson.number}>
                    <button
                      type="button"
                      onClick={() => {
                        setOpen(false);
                        if (!active) setLessonInUrl(lesson.number);
                      }}
                      className={cn(
                        "flex w-full items-start gap-2.5 rounded-lg px-2 py-2 text-start transition-colors",
                        active
                          ? "bg-accent/60 font-semibold"
                          : "cursor-pointer hover:bg-accent",
                      )}
                    >
                      <span
                        aria-hidden
                        className={cn(
                          "grid h-7 w-7 shrink-0 place-items-center rounded-md text-[11px] font-bold tabular-nums",
                          active
                            ? "text-background"
                            : "bg-foreground/10 text-foreground/80",
                        )}
                        style={active ? { backgroundColor: accent } : undefined}
                      >
                        {String(lesson.number).padStart(2, "0")}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-serif text-[14px] leading-snug text-foreground">
                          {tr(lesson.title)}
                        </span>
                        <span className="mt-0.5 block text-[11px] text-muted-foreground">
                          {chapterMeta(lesson)}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="flex shrink-0 items-center gap-2 border-t border-border/60 px-4 py-3 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <Home className="h-4 w-4" strokeWidth={1.75} />
              Alle Notizbücher
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

function chapterMeta(lesson: Lesson): string {
  const parts: string[] = ["Vorlesung"];
  const exCount = lesson.exercises.filter(
    (e) => (e.aufgaben?.length ?? 0) > 0 || e.solutions.length > 0,
  ).length;
  if (exCount > 0) {
    parts.push(`${exCount} ${exCount === 1 ? "Übung" : "Übungen"}`);
  }
  if (lesson.lecture.quizBankId) parts.push("Quiz");
  if (lesson.lecture.walkthroughId) parts.push("Erklärung");
  return parts.join(" · ");
}
