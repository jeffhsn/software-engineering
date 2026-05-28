"use client";

import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { Lesson, Notebook } from "@/lib/notebooks/types";
import { useI18n } from "@/lib/i18n/client";
import { setLessonInUrl } from "@/lib/notebooks/nav";
import { cn } from "@/lib/utils";

interface Props {
  notebook: Notebook;
  currentLesson: Lesson;
}

/**
 * Header-middle picker. Trigger shows the current chapter ("Kapitel NN ·
 * Title"), popover lists every chapter in the notebook with title, exercise
 * count and a check mark on the active one. Lets the reader hop to any
 * chapter without scrolling through the home page.
 */
export function ChapterPicker({ notebook, currentLesson }: Props) {
  const { tr } = useI18n();
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        aria-label={`Kapitel ${currentLesson.number}`}
        className={cn(
          "group inline-flex max-w-[min(60vw,32rem)] cursor-pointer items-center gap-2 rounded-full px-3 py-1.5",
          "transition-colors hover:bg-foreground/[0.04]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
          "data-[state=open]:bg-foreground/[0.06]",
        )}
      >
        <span
          aria-hidden
          className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[var(--paper-tint)] text-[10px] font-semibold tabular-nums text-[var(--ink)]"
        >
          {String(currentLesson.number).padStart(2, "0")}
        </span>
        <span className="truncate font-serif text-[13.5px] font-medium text-foreground">
          {tr(currentLesson.title)}
        </span>
      </PopoverTrigger>
      <PopoverContent align="center" sideOffset={8} className="w-80 p-1">
        <div className="px-2 pb-1 pt-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
          Kapitelübersicht
        </div>
        <ul className="max-h-[60vh] overflow-y-auto">
          {notebook.lessons.map((lesson) => {
            const active = lesson.number === currentLesson.number;
            return (
              <li key={lesson.number}>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    if (!active) setLessonInUrl(lesson.number);
                  }}
                  className={cn(
                    "flex w-full items-start gap-2.5 rounded-sm px-2 py-1.5 text-start text-sm transition-colors",
                    active
                      ? "bg-accent/60 font-semibold"
                      : "cursor-pointer hover:bg-accent",
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "grid h-6 w-6 shrink-0 place-items-center rounded-md text-[10px] font-bold tabular-nums",
                      active
                        ? "bg-foreground text-background"
                        : "bg-foreground/10 text-foreground/80",
                    )}
                  >
                    {String(lesson.number).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13px] leading-snug">
                      {tr(lesson.title)}
                    </span>
                    <span className="mt-0.5 block text-[11px] text-muted-foreground">
                      {chapterMeta(lesson)}
                    </span>
                  </span>
                  {active && (
                    <span
                      aria-hidden
                      className="mt-1 text-[10px] text-muted-foreground"
                    >
                      ✓
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </PopoverContent>
    </Popover>
  );
}

function chapterMeta(lesson: Lesson): string {
  const parts: string[] = ["Vorlesung"];
  const exCount = lesson.exercises.filter(
    (e) => e.aufgaben || e.solutions.length > 0,
  ).length;
  if (exCount > 0) {
    parts.push(`${exCount} ${exCount === 1 ? "Übung" : "Übungen"}`);
  }
  if (lesson.lecture.quizBankId) parts.push("Quiz");
  if (lesson.lecture.walkthroughId) parts.push("Erklärung");
  return parts.join(" · ");
}
