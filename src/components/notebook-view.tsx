"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { figureComponents } from "@/components/prose-figure";
import { PageSkeleton } from "@/components/pdf-skeleton";
import type {
  Exercise,
  Lesson,
  Notebook,
  PdfRef,
} from "@/lib/notebooks/types";
import { clampedIndex, setLessonInUrl } from "@/lib/notebooks/nav";
import { useI18n } from "@/lib/i18n/client";
import { getExplanation } from "@/lib/notebooks/explanations/registry";
import { getQuizSet } from "@/lib/notebooks/quizzes/registry";
import { QuizPlayer } from "@/components/quiz-player";
import { getSubject } from "@/lib/subjects/registry";
import { ACCENT_INK } from "@/lib/subjects/accents";
import {
  ChevronLeft,
  ChevronRight,
  PenLine,
  PlayCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

const PdfViewer = dynamic(
  () => import("./pdf-viewer").then((m) => m.PdfViewer),
  {
    ssr: false,
    loading: () => (
      <div className="w-full px-4 py-4 sm:px-6">
        <PageSkeleton height={560} srLabel="Wird geladen" />
      </div>
    ),
  },
);

interface Props {
  notebook: Notebook;
}

/**
 * NotebookView always opens straight into a chapter — there is no
 * separate notebook home. `?l=N` selects the chapter; with no param it
 * defaults to chapter 1 (the subject route also redirects bare URLs to
 * `?l=1` server-side so the header stays in sync).
 */
export function NotebookView({ notebook }: Props) {
  const searchParams = useSearchParams();
  const rawL = searchParams.get("l");
  const index = clampedIndex(parseInt(rawL ?? "1") - 1, notebook.lessons.length);
  return <ChapterView notebook={notebook} lessonIndex={index} />;
}

/* ─────────────────────── Chapter View ─────────────────────── */

type LeftKey = "lecture" | `uebung-${number}`;
type RightLectureKey = "tief" | "einfach" | "quiz";
type RightUebungKey = "loesung" | "walkthrough";

function ChapterView({
  notebook,
  lessonIndex,
}: {
  notebook: Notebook;
  lessonIndex: number;
}) {
  const { tr } = useI18n();
  const lesson = notebook.lessons[lessonIndex];
  const prev = lessonIndex > 0 ? notebook.lessons[lessonIndex - 1] : undefined;
  const next =
    lessonIndex + 1 < notebook.lessons.length
      ? notebook.lessons[lessonIndex + 1]
      : undefined;

  const exercises = lesson.exercises.filter(
    (e) => (e.aufgaben?.length ?? 0) > 0 || e.solutions.length > 0,
  );

  const [leftKey, setLeftKey] = useState<LeftKey>("lecture");
  const [rightLecture, setRightLecture] = useState<RightLectureKey>("tief");
  const [rightUebung, setRightUebung] =
    useState<RightUebungKey>("loesung");
  const [solutionIdx, setSolutionIdx] = useState(0);
  const leftScrollRef = useRef<HTMLDivElement>(null);
  const rightScrollRef = useRef<HTMLDivElement>(null);

  // Reset to lecture chip + scroll each column to top on chapter change.
  const lastSeen = useRef<number | null>(null);
  useEffect(() => {
    if (lastSeen.current !== lesson.number) {
      lastSeen.current = lesson.number;
      setLeftKey("lecture");
      setRightLecture("tief");
      setRightUebung("loesung");
      setSolutionIdx(0);
      leftScrollRef.current?.scrollTo({ top: 0 });
      rightScrollRef.current?.scrollTo({ top: 0 });
    }
  }, [lesson.number]);

  // ← / → keyboard navigation between chapters. Skip when typing.
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (
        t &&
        (t.tagName === "INPUT" ||
          t.tagName === "TEXTAREA" ||
          t.isContentEditable)
      ) {
        return;
      }
      if (e.key === "ArrowLeft" && prev) {
        e.preventDefault();
        setLessonInUrl(prev.number);
      } else if (e.key === "ArrowRight" && next) {
        e.preventDefault();
        setLessonInUrl(next.number);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [prev, next]);

  const onLecture = leftKey === "lecture";
  const activeExerciseIdx = onLecture
    ? -1
    : parseInt(leftKey.replace("uebung-", ""), 10);
  const activeExercise =
    activeExerciseIdx >= 0 ? exercises[activeExerciseIdx] : undefined;

  const leftChips: Chip[] = [
    {
      key: "lecture",
      label: "Vorlesung",
      active: leftKey === "lecture",
      onClick: () => {
        setLeftKey("lecture");
        setRightLecture("tief");
      },
    },
    ...exercises.map((ex, i) => ({
      key: `uebung-${i}`,
      label: tr(ex.label) || `Übung ${i + 1}`,
      active: leftKey === `uebung-${i}`,
      onClick: () => {
        setLeftKey(`uebung-${i}` as LeftKey);
        setRightUebung("loesung");
      },
    })),
  ];

  const lectureExplanation = lesson.lecture.walkthroughId
    ? getExplanation(lesson.lecture.walkthroughId)
    : undefined;
  const hasSimpleLecture = Boolean(lectureExplanation?.simpleContent);

  const rightChips: Chip[] = onLecture
    ? hasSimpleLecture
      ? [
          {
            key: "tief",
            label: "Tief",
            active: rightLecture === "tief",
            onClick: () => setRightLecture("tief"),
          },
          {
            key: "einfach",
            label: "Einfach",
            active: rightLecture === "einfach",
            onClick: () => setRightLecture("einfach"),
          },
          {
            key: "quiz",
            label: "Quiz",
            active: rightLecture === "quiz",
            onClick: () => setRightLecture("quiz"),
          },
        ]
      : [
          {
            key: "tief",
            label: "Erklärung",
            active: rightLecture === "tief" || rightLecture === "einfach",
            onClick: () => setRightLecture("tief"),
          },
          {
            key: "quiz",
            label: "Quiz",
            active: rightLecture === "quiz",
            onClick: () => setRightLecture("quiz"),
          },
        ]
    : [
        {
          key: "loesung",
          label: "Lösung",
          active: rightUebung === "loesung",
          onClick: () => setRightUebung("loesung"),
        },
        {
          key: "walkthrough",
          label: "Lösungsweg",
          active: rightUebung === "walkthrough",
          onClick: () => setRightUebung("walkthrough"),
        },
      ];

  const subject = getSubject(notebook.subject);
  const accentInk = subject ? ACCENT_INK[subject.accent] : "var(--ink)";

  return (
    <div
      style={{ ["--accent" as string]: accentInk }}
      className="relative grid h-[calc(100dvh-3.5rem)] w-full grid-cols-1 lg:grid-cols-2"
    >
      {/* Centre fold — a soft book-gutter shadow instead of a hard
          divider, so the two columns read like facing pages. */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-y-0 left-1/2 z-10 hidden w-10 -translate-x-1/2 lg:block",
          "bg-[linear-gradient(to_right,transparent,rgba(0,0,0,0.05)_47%,rgba(0,0,0,0.08)_50%,rgba(0,0,0,0.05)_53%,transparent)]",
          "dark:bg-[linear-gradient(to_right,transparent,rgba(0,0,0,0.28)_47%,rgba(0,0,0,0.42)_50%,rgba(0,0,0,0.28)_53%,transparent)]",
        )}
      />
      <ColumnPane
        ariaLabel="Materialien"
        scrollRef={leftScrollRef}
        chips={leftChips}
        progress={onLecture}
      >
        {onLecture ? (
          <LecturePanel lesson={lesson} />
        ) : activeExercise ? (
          <UebungPanel exercise={activeExercise} fallbackLabel={leftKey} />
        ) : null}
      </ColumnPane>

      <ColumnPane
        ariaLabel="Hilfen"
        scrollRef={rightScrollRef}
        chips={rightChips}
        progress={onLecture ? rightLecture !== "quiz" : rightUebung === "walkthrough"}
        fill={onLecture && rightLecture === "quiz"}
      >
        {onLecture ? (
          rightLecture === "quiz" ? (
            <QuizPanel quizBankId={lesson.lecture.quizBankId} />
          ) : (
            <ErklaerungPanel
              walkthroughId={lesson.lecture.walkthroughId}
              mode={rightLecture === "einfach" ? "simple" : "deep"}
            />
          )
        ) : activeExercise ? (
          rightUebung === "loesung" ? (
            <SolutionPanel
              solutions={activeExercise.solutions}
              activeIdx={solutionIdx}
              onChange={setSolutionIdx}
            />
          ) : (
            <ErklaerungPanel
              walkthroughId={activeExercise.walkthroughId}
              mode="deep"
              emptyHint="Noch kein Lösungsweg. Sobald ich die Lösung gelesen habe, schreibe ich einen — Schritt für Schritt, im Stil des Profs."
            />
          )
        ) : null}
      </ColumnPane>

      <FloatingChapterNav prev={prev} next={next} />
    </div>
  );
}

/**
 * One reading column. Chips float in a pill at the top (like the
 * floating chevron nav at the bottom), the lecture progress bar runs
 * across the very top edge of the column, and the content scrolls full
 * width below — no header bar, no subheader, no borders.
 */
function ColumnPane({
  ariaLabel,
  scrollRef,
  chips,
  progress,
  background,
  fill,
  children,
}: {
  ariaLabel: string;
  scrollRef: React.RefObject<HTMLDivElement | null>;
  chips: Chip[];
  progress?: boolean;
  background?: string;
  /** Let the child own the full column height (no scroll padding) — used by
      the inline quiz, which brings its own header/body/footer layout. */
  fill?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      aria-label={ariaLabel}
      className={cn("relative h-full min-h-0 overflow-hidden", background)}
    >
      {progress && <ColumnTopProgress scrollRef={scrollRef} />}

      {fill ? (
        // Child fills the column beneath the floating chips and manages its
        // own scrolling (e.g. the quiz player).
        <div className="absolute inset-0 pt-14">{children}</div>
      ) : (
        /* Content scrolls full-bleed from the very top; the chips float
           directly over it. overscroll-contain keeps the fixed header
           steady. */
        <div
          ref={scrollRef}
          className="h-full overflow-y-auto overscroll-contain pb-16"
        >
          {children}
        </div>
      )}

      {/* Chips float ON TOP of the material, vertically centered within
          the top spacing gap — separate pills, no subheader. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex h-16 items-center px-3 sm:px-4">
        <ChipRow chips={chips} />
      </div>
    </section>
  );
}

/**
 * Reading-progress rule pinned to the very top edge of the column, above
 * the chips. Fills left-to-right in the subject's accent as the slides
 * are read.
 */
function ColumnTopProgress({
  scrollRef,
}: {
  scrollRef: React.RefObject<HTMLDivElement | null>;
}) {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const compute = () => {
      const max = el.scrollHeight - el.clientHeight;
      if (max <= 0) {
        setPct(0);
        return;
      }
      setPct(
        Math.max(0, Math.min(100, Math.round((el.scrollTop / max) * 100))),
      );
    };
    compute();
    el.addEventListener("scroll", compute, { passive: true });
    const ro = new ResizeObserver(compute);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", compute);
      ro.disconnect();
    };
  }, [scrollRef]);
  return (
    <div
      role="progressbar"
      aria-label="Fortschritt in den Folien"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      className="pointer-events-none absolute inset-x-0 top-0 z-20 h-2.5"
    >
      <span
        className="absolute inset-y-0 inset-s-0 rounded-r-full bg-[var(--accent)] shadow-[0_0_6px_-1px_var(--accent)] transition-[width] duration-200"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

/**
 * Floating chips — each is its OWN separate pill hovering over the
 * content (not grouped in a container). Active pill is a solid accent
 * fill; inactive pills are solid cards with a hairline so they stay
 * legible over whatever slide scrolls underneath. New chips just join
 * the row at the same level.
 */
function ChipRow({ chips }: { chips: Chip[] }) {
  return (
    <div role="tablist" className="pointer-events-auto flex flex-wrap items-center gap-2">
      {chips.map((c) => (
        <button
          key={c.key}
          type="button"
          role="tab"
          aria-selected={c.active}
          onClick={c.onClick}
          className={cn(
            "cursor-pointer rounded-full px-4 py-1.5 font-serif text-[15.5px] tracking-tight shadow-[0_5px_12px_-2px_rgba(0,0,0,0.32),0_22px_50px_-10px_rgba(0,0,0,0.8)] transition-all",
            c.active
              ? "bg-[var(--accent)] font-medium text-background"
              : "bg-card text-foreground hover:text-foreground",
          )}
        >
          {c.label}
        </button>
      ))}
    </div>
  );
}

/**
 * Two chevron buttons in a solid card, fixed at the center-bottom of
 * the viewport. No blur, no glass. Clicking switches the whole chapter;
 * keyboard ← / → does the same.
 */
function FloatingChapterNav({
  prev,
  next,
}: {
  prev?: Lesson;
  next?: Lesson;
}) {
  return (
    <nav
      aria-label="Kapitelnavigation"
      className="pointer-events-none fixed inset-x-0 bottom-6 z-30 flex justify-center gap-2.5"
    >
      <ArrowButton
        direction="prev"
        lesson={prev}
        ariaLabel="Vorheriges Kapitel"
      />
      <ArrowButton
        direction="next"
        lesson={next}
        ariaLabel="Nächstes Kapitel"
      />
    </nav>
  );
}

/**
 * Each chevron is its OWN separate floating pill — matching the chips:
 * solid card with a hairline + shadow, accent fill on hover, no grouping
 * container.
 */
function ArrowButton({
  direction,
  lesson,
  ariaLabel,
}: {
  direction: "prev" | "next";
  lesson?: Lesson;
  ariaLabel: string;
}) {
  const disabled = !lesson;
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={lesson ? () => setLessonInUrl(lesson.number) : undefined}
      disabled={disabled}
      aria-label={ariaLabel}
      title={ariaLabel}
      className={cn(
        "pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full shadow-[0_5px_12px_-2px_rgba(0,0,0,0.32),0_22px_50px_-10px_rgba(0,0,0,0.8)] transition-all",
        disabled
          ? "cursor-not-allowed bg-card text-muted-foreground/30"
          : "cursor-pointer bg-card text-foreground hover:bg-[var(--accent)] hover:text-background",
      )}
    >
      <Icon className="h-[18px] w-[18px]" strokeWidth={2} />
    </button>
  );
}

/* ─────────────────────── Material panels ─────────────────────── */

function LecturePanel({ lesson }: { lesson: Lesson }) {
  return (
    <div className="flex flex-col">
      {lesson.lecture.videoUrl && (
        <div className="px-4 pb-3 pt-3 sm:px-6">
          <a
            href={lesson.lecture.videoUrl}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex cursor-pointer items-center gap-2 text-[13px] font-medium text-muted-foreground transition-colors hover:text-[var(--accent)]"
          >
            <PlayCircle className="h-4 w-4" strokeWidth={1.75} />
            <span>Aufzeichnung ansehen</span>
          </a>
        </div>
      )}
      <PdfBlock src={lesson.lecture.pdf.src} />
    </div>
  );
}

function UebungPanel({
  exercise,
  fallbackLabel,
}: {
  exercise: Exercise;
  fallbackLabel: string;
}) {
  const { tr } = useI18n();
  const title = tr(exercise.label) || fallbackLabel;
  const sheets = exercise.aufgaben ?? [];
  if (sheets.length === 0) {
    return (
      <EmptyHint>
        {`Kein Aufgaben-PDF zu „${title}“. Manchmal wird nur die Lösung veröffentlicht — schau in der rechten Spalte unter „Lösung“.`}
      </EmptyHint>
    );
  }
  // A sheet can exist in several languages (e.g. DE + EN). With more than one,
  // label each so the reader can tell the versions apart; a single sheet stays
  // caption-free, matching the Lösung column.
  if (sheets.length === 1) {
    return <PdfBlock src={sheets[0].src} />;
  }
  return (
    <div className="flex flex-col">
      {sheets.map((sheet, i) => (
        <div key={i} className="flex flex-col">
          <div className="not-prose px-5 pt-4 pb-1 font-serif text-[13px] font-semibold uppercase tracking-wide text-[var(--ink-soft)] sm:px-8">
            {tr(sheet.label)}
          </div>
          <PdfBlock src={sheet.src} />
        </div>
      ))}
    </div>
  );
}


function SolutionPanel({
  solutions,
}: {
  solutions: PdfRef[];
  activeIdx?: number;
  onChange?: (i: number) => void;
}) {
  if (solutions.length === 0) {
    return (
      <EmptyHint>
        Keine Lösung veröffentlicht. Den Lösungsweg nutzen, sobald er
        geschrieben ist.
      </EmptyHint>
    );
  }
  // Stack every variant as plain PDFs — same structure as the left
  // column's Aufgaben, no captions, so both columns read identically.
  return (
    <div className="flex flex-col">
      {solutions.map((sol, i) => (
        <PdfBlock key={i} src={sol.src} />
      ))}
    </div>
  );
}

function ErklaerungPanel({
  walkthroughId,
  mode = "deep",
  emptyHint = "Noch keine Erklärung zu diesem Kapitel. Sobald die Folien ausgearbeitet sind, schreibe ich eine tiefe + eine einfache Erklärung.",
}: {
  walkthroughId?: string;
  mode?: "deep" | "simple";
  emptyHint?: string;
}) {
  const { tr } = useI18n();

  if (!walkthroughId) {
    return <EmptyHint>{emptyHint}</EmptyHint>;
  }
  const explanation = getExplanation(walkthroughId);
  if (!explanation) {
    return <EmptyHint>{`Kein Eintrag mit der ID „${walkthroughId}“.`}</EmptyHint>;
  }

  const body =
    mode === "simple" && explanation.simpleContent
      ? tr(explanation.simpleContent)
      : tr(explanation.content);
  const title = tr(explanation.title);

  return (
    <article className="prose-notebook max-w-none px-5 pt-16 pb-8 text-[16px] sm:px-8">
      <h2 className="not-prose mb-5 font-serif text-[24px] font-semibold leading-tight text-[var(--ink)]">
        {title}
      </h2>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={figureComponents}>
        {body}
      </ReactMarkdown>
    </article>
  );
}

function QuizPanel({ quizBankId }: { quizBankId?: string }) {
  if (!quizBankId) {
    return (
      <EmptyHint>
        Noch kein Quiz zu diesem Kapitel. Sobald die Vorlesung ausgearbeitet
        ist, baue ich einen Pool aus vielen Sets — Begriffe, Konzepte,
        Szenarios — ohne Format-Tells.
      </EmptyHint>
    );
  }
  const quizSet = getQuizSet(quizBankId);
  if (!quizSet) {
    return <EmptyHint>{`Kein Quiz mit der ID „${quizBankId}".`}</EmptyHint>;
  }
  // The player owns the full column (picker → runner → summary) and brings its
  // own scrolling; ColumnPane renders it in `fill` mode.
  return <QuizPlayer quizSet={quizSet} />;
}

/* ─────────────────────── Chips & shared bits ─────────────────────── */

interface Chip {
  key: string;
  label: string;
  sub?: string;
  active: boolean;
  onClick: () => void;
}


/* ─────────────────────── Reusable bits ─────────────────────── */

function PdfBlock({ src, label }: { src: string; label?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (mounted || !ref.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setMounted(true);
          io.disconnect();
        }
      },
      { rootMargin: "1200px 0px" },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [mounted]);

  return (
    <div ref={ref} className="w-full">
      {label && (
        <div className="border-b border-border/60 px-1 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          {label}
        </div>
      )}
      {mounted ? (
        <PdfViewer key={src} src={src} mode="stack" />
      ) : (
        <div aria-hidden className="min-h-[420px] animate-pulse bg-muted/10" />
      )}
    </div>
  );
}

function EmptyHint({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full min-h-[20rem] flex-col items-center justify-center gap-4 px-10 text-center">
      <PenLine
        aria-hidden
        className="h-7 w-7 text-muted-foreground/35"
        strokeWidth={1.25}
      />
      <p className="max-w-sm font-serif text-[16px] italic leading-relaxed text-muted-foreground/80">
        {children}
      </p>
    </div>
  );
}
