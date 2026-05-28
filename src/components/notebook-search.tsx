"use client";

import { useMemo, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { Lesson, Notebook } from "@/lib/notebooks/types";
import { useI18n } from "@/lib/i18n/client";
import { setLessonInUrl } from "@/lib/notebooks/nav";
import { SUBJECTS } from "@/lib/subjects/registry";
import { cn } from "@/lib/utils";

interface Props {
  /**
   * One notebook → search inside it (used on the notebook home).
   * Many notebooks → cross-notebook search (used on the root home).
   */
  notebooks: Notebook[];
  scope: "single" | "all";
}

interface Hit {
  notebook: Notebook;
  lesson: Lesson;
  subjectTitle: string;
  lessonTitle: string;
}

/**
 * Header-middle search field. Filters chapters by number, title, or
 * subject. In `single` scope it stays inside the current notebook and
 * navigates via the in-page lesson nav; in `all` scope it lists results
 * across every notebook and full-routes to the target.
 */
export function NotebookSearch({ notebooks, scope }: Props) {
  const { tr } = useI18n();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const allHits: Hit[] = useMemo(() => {
    return notebooks.flatMap((nb) => {
      const subjectTitle =
        SUBJECTS.find((s) => s.slug === nb.subject)?.title ??
        nb.subject.charAt(0).toUpperCase() + nb.subject.slice(1);
      return nb.lessons.map<Hit>((lesson) => ({
        notebook: nb,
        lesson,
        subjectTitle,
        lessonTitle: tr(lesson.title),
      }));
    });
  }, [notebooks, tr]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allHits;
    return allHits.filter((h) => {
      const num = String(h.lesson.number).padStart(2, "0");
      return (
        h.lessonTitle.toLowerCase().includes(q) ||
        h.subjectTitle.toLowerCase().includes(q) ||
        num.includes(q)
      );
    });
  }, [allHits, query]);

  const placeholder =
    scope === "all" ? "Alle Notizbücher durchsuchen…" : "Notizbuch durchsuchen…";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        aria-label={placeholder}
        className={cn(
          "inline-flex w-[min(70vw,28rem)] cursor-text items-center gap-2 rounded-full bg-card/80 px-4 py-1.5 text-left text-xs text-muted-foreground",
          "shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all hover:bg-card hover:shadow-[0_3px_12px_rgba(0,0,0,0.06)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
          "data-[state=open]:bg-card",
        )}
      >
        <span aria-hidden className="text-[12px] leading-none">
          🔎
        </span>
        <span className="flex-1 truncate font-serif text-[12.5px] italic">
          {placeholder}
        </span>
      </PopoverTrigger>
      <PopoverContent
        align="center"
        sideOffset={8}
        className="w-[min(90vw,30rem)] p-0"
      >
        <div className="border-b border-border/60 px-3 py-2.5">
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Kapitel suchen…"
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground/70"
          />
        </div>
        <ul className="max-h-[60vh] overflow-y-auto p-1">
          {filtered.length === 0 ? (
            <li className="px-3 py-3 font-serif text-[13px] italic text-muted-foreground">
              Keine Treffer.
            </li>
          ) : (
            filtered.map((hit) => (
              <li key={`${hit.notebook.subject}-${hit.lesson.number}`}>
                <ResultButton
                  hit={hit}
                  scope={scope}
                  onClose={() => {
                    setOpen(false);
                    setQuery("");
                  }}
                />
              </li>
            ))
          )}
        </ul>
      </PopoverContent>
    </Popover>
  );
}

function ResultButton({
  hit,
  scope,
  onClose,
}: {
  hit: Hit;
  scope: "single" | "all";
  onClose: () => void;
}) {
  const href = `/subjects/${hit.notebook.subject}?l=${hit.lesson.number}`;
  return (
    <a
      href={href}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey) return;
        onClose();
        if (scope === "single") {
          e.preventDefault();
          setLessonInUrl(hit.lesson.number);
        }
      }}
      className="flex w-full items-start gap-3 rounded-sm px-2 py-1.5 text-start text-sm transition-colors hover:bg-accent"
    >
      <span
        aria-hidden
        className="grid h-7 w-7 shrink-0 place-items-center rounded-md border border-border/70 bg-[var(--paper-tint)] text-[10px] font-bold tabular-nums text-[var(--ink)]"
      >
        {String(hit.lesson.number).padStart(2, "0")}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-serif text-[14px] leading-snug text-foreground">
          {hit.lessonTitle}
        </span>
        <span className="mt-0.5 block text-[11px] text-muted-foreground">
          {scope === "all" ? `${hit.subjectTitle} · ` : ""}
          {chapterMeta(hit.lesson)}
        </span>
      </span>
    </a>
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
