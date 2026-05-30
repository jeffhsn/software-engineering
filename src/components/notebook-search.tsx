"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { Lesson, Notebook } from "@/lib/notebooks/types";
import { useI18n } from "@/lib/i18n/client";
import { setLessonInUrl } from "@/lib/notebooks/nav";
import { SUBJECTS } from "@/lib/subjects/registry";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  /**
   * One notebook → search the chapters inside it (used on the notebook home).
   * Many notebooks → search ACROSS notebooks by name (used on the root home);
   * results are whole notebooks, not their chapters.
   */
  notebooks: Notebook[];
  scope: "single" | "all";
}

/* ── Root home: search whole notebooks by subject/term ───────────────── */

interface NotebookHit {
  notebook: Notebook;
  subjectTitle: string;
  shortTitle: string;
  emoji: string;
}

/* ── Notebook home: search chapters inside the one notebook ──────────── */

interface LessonHit {
  notebook: Notebook;
  lesson: Lesson;
  lessonTitle: string;
}

/**
 * Header-middle search field. In `all` scope it searches for whole
 * NOTEBOOKS by their subject name / term and routes to the notebook; in
 * `single` scope it stays inside the current notebook and filters its
 * chapters, navigating via the in-page lesson nav.
 */
export function NotebookSearch({ notebooks, scope }: Props) {
  if (scope === "all") return <NotebookScopeSearch notebooks={notebooks} />;
  return <ChapterScopeSearch notebook={notebooks[0]} />;
}

/* ───────────────────────── all-notebooks ───────────────────────── */

function NotebookScopeSearch({ notebooks }: { notebooks: Notebook[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const allHits: NotebookHit[] = useMemo(() => {
    return notebooks.map<NotebookHit>((nb) => {
      const s = SUBJECTS.find((x) => x.slug === nb.subject);
      return {
        notebook: nb,
        subjectTitle: s?.title ?? nb.subject,
        shortTitle: s?.shortTitle ?? "",
        emoji: s?.emoji ?? "📓",
      };
    });
  }, [notebooks]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allHits;
    return allHits.filter((h) =>
      [h.subjectTitle, h.shortTitle, h.notebook.subject, h.notebook.term, String(h.notebook.year)]
        .join(" ")
        .toLowerCase()
        .includes(q),
    );
  }, [allHits, query]);

  return (
    <SearchShell
      open={open}
      setOpen={setOpen}
      query={query}
      setQuery={setQuery}
      placeholder="Notizbuch suchen…"
    >
      {filtered.length === 0 ? (
        <Empty />
      ) : (
        filtered.map((hit) => (
          <li key={`${hit.notebook.subject}-${hit.notebook.year}`}>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                setQuery("");
                router.push(`/subjects/${hit.notebook.subject}?l=1`);
              }}
              className="flex w-full items-center gap-3 rounded-sm px-2 py-2 text-start text-sm transition-colors hover:bg-accent"
            >
              <span
                aria-hidden
                className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-[var(--paper-tint)] text-[16px]"
              >
                {hit.emoji}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate font-serif text-[14px] leading-snug text-foreground">
                  {hit.subjectTitle}
                </span>
                <span className="mt-0.5 block text-[11px] text-muted-foreground">
                  {hit.notebook.term} · {hit.notebook.lessons.length} Kapitel
                </span>
              </span>
            </button>
          </li>
        ))
      )}
    </SearchShell>
  );
}

/* ───────────────────────── one notebook ───────────────────────── */

function ChapterScopeSearch({ notebook }: { notebook: Notebook }) {
  const { tr } = useI18n();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const allHits: LessonHit[] = useMemo(
    () =>
      notebook.lessons.map<LessonHit>((lesson) => ({
        notebook,
        lesson,
        lessonTitle: tr(lesson.title),
      })),
    [notebook, tr],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allHits;
    return allHits.filter((h) => {
      const num = String(h.lesson.number).padStart(2, "0");
      return h.lessonTitle.toLowerCase().includes(q) || num.includes(q);
    });
  }, [allHits, query]);

  return (
    <SearchShell
      open={open}
      setOpen={setOpen}
      query={query}
      setQuery={setQuery}
      placeholder="Kapitel suchen…"
    >
      {filtered.length === 0 ? (
        <Empty />
      ) : (
        filtered.map((hit) => (
          <li key={hit.lesson.number}>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                setQuery("");
                setLessonInUrl(hit.lesson.number);
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
                  {chapterMeta(hit.lesson)}
                </span>
              </span>
            </button>
          </li>
        ))
      )}
    </SearchShell>
  );
}

/* ───────────────────────── shared shell ───────────────────────── */

function SearchShell({
  open,
  setOpen,
  query,
  setQuery,
  placeholder,
  children,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
  query: string;
  setQuery: (v: string) => void;
  placeholder: string;
  children: React.ReactNode;
}) {
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        aria-label={placeholder}
        className={cn(
          // Phones: a compact icon button so the brand/controls keep their room.
          // sm+: the full search bar with placeholder text.
          "inline-flex h-9 w-9 cursor-text items-center justify-center gap-2.5 rounded-full bg-card text-left text-muted-foreground ring-1 ring-[var(--rule)]",
          "sm:w-[min(70vw,28rem)] sm:justify-start sm:px-4",
          "transition-colors hover:text-foreground hover:ring-[var(--rule-strong)]/50",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          "data-[state=open]:ring-[var(--rule-strong)]/50",
        )}
      >
        <Search className="h-4 w-4 shrink-0" strokeWidth={1.75} />
        <span className="hidden flex-1 truncate font-serif text-[13.5px] italic sm:block">
          {placeholder}
        </span>
      </PopoverTrigger>
      <PopoverContent align="center" sideOffset={8} className="w-[min(90vw,30rem)] p-0">
        <div className="border-b border-border/60 px-3 py-2.5">
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground/70"
          />
        </div>
        <ul className="max-h-[60vh] overflow-y-auto p-1">{children}</ul>
      </PopoverContent>
    </Popover>
  );
}

function Empty() {
  return (
    <li className="px-3 py-3 font-serif text-[13px] italic text-muted-foreground">
      Keine Treffer.
    </li>
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
