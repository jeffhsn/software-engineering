"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type {
  Exam,
  Exercise,
  Lesson,
  Notebook,
  PdfRef,
  ResourceRef,
} from "@/lib/notebooks/types";
import { clampedIndex, setLessonInUrl, setOverlayInUrl } from "@/lib/notebooks/nav";
import { useI18n } from "@/lib/i18n/client";
import { getExplanation } from "@/lib/notebooks/explanations/registry";
import { cn } from "@/lib/utils";

const PdfViewer = dynamic(
  () => import("./pdf-viewer").then((m) => m.PdfViewer),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-40 items-center justify-center text-sm text-muted-foreground">
        Wird geladen…
      </div>
    ),
  },
);

interface Props {
  notebook: Notebook;
}

/**
 * NotebookView routes between two screens off the `?l=` search param:
 *
 *  - **Home** (no `?l=`) — title, short blurb, then a flat list of every
 *    chapter; library shelf below for notebook-wide resources.
 *  - **Chapter** (`?l=N`) — two-column reading view. Left column holds the
 *    primary materials (Folien & Video, Übungen) with a chip switcher.
 *    Right column holds AI helpers (Erklärung, Quiz for the lecture;
 *    Lösung, Walkthrough for the Übung). Floating prev/next arrows at
 *    the bottom switch chapters.
 */
export function NotebookView({ notebook }: Props) {
  const searchParams = useSearchParams();
  const rawL = searchParams.get("l");
  const hasChapterSelection = rawL != null && rawL !== "0";

  if (!hasChapterSelection) {
    return <NotebookHome notebook={notebook} />;
  }

  const index = clampedIndex(parseInt(rawL ?? "1") - 1, notebook.lessons.length);
  return <ChapterView notebook={notebook} lessonIndex={index} />;
}

/* ─────────────────────── Notebook Home ─────────────────────── */

function NotebookHome({ notebook }: { notebook: Notebook }) {
  const { tr } = useI18n();
  return (
    <div className="w-full">
      <section className="w-full border-b border-border/60 bg-[var(--paper-tint)]/50 px-4 py-10 sm:px-8 sm:py-14 lg:px-12">
        <h1 className="font-serif text-4xl font-semibold tracking-tight text-[var(--ink)] sm:text-5xl">
          {capitalSubjectTitle(notebook.subject)}
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          {notebook.term} · {notebook.lessons.length} Kapitel · Notizbuch
          durchsuchen — oben im Header tippen oder unten direkt ein Kapitel
          öffnen. Jedes Modul bringt sein eigenes Material mit: Folien,
          Übungen, Zusammenfassungen und Klausuren. Alles, was du in diesem
          Fach schon gemacht hast, liegt hier.
        </p>
      </section>

      <div className="w-full px-4 py-10 sm:px-8 lg:px-12">
        <section className="mb-12 max-w-3xl">
          <h2 className="mb-3 font-serif text-lg font-medium italic text-[var(--ink-soft)]">
            Kapitel
          </h2>
          <ul className="flex flex-col">
            {notebook.lessons.map((lesson) => (
              <li key={lesson.number}>
                <ChapterCard
                  lesson={lesson}
                  title={tr(lesson.title)}
                  slug={notebook.subject}
                />
              </li>
            ))}
          </ul>
        </section>

        <section className="max-w-3xl">
        <h2 className="mb-3 font-serif text-lg font-medium italic text-[var(--ink-soft)]">
          Bibliothek
        </h2>
        <ul className="flex flex-col gap-3">
          <LibraryRow
            icon="📚"
            title="Zusammenfassung"
            resource={notebook.zusammenfassung}
            emptyHint="Noch keine Zusammenfassung. Sobald die Vorlesungen ausgearbeitet sind, kann ich eine aus allen Lektionen schreiben."
          />
          <LibraryRow
            icon="📋"
            title="Cheatsheet"
            resource={notebook.cheatsheet}
            emptyHint="Noch kein Cheatsheet. Wenn keines vorliegt, kompiliere ich eines aus den Vorlesungen."
          />
          <LibraryRow
            icon="📝"
            title="Klausuren"
            exams={notebook.exams}
            emptyHint="Noch keine Klausuren. Lege echte Klausuren ab, dann schreibe ich Walkthroughs und kann Übungsklausuren im Stil des Profs erstellen."
          />
        </ul>
        </section>
      </div>
    </div>
  );
}

function ChapterCard({
  lesson,
  title,
  slug,
}: {
  lesson: Lesson;
  title: string;
  slug: string;
}) {
  return (
    <Link
      href={`/subjects/${slug}?l=${lesson.number}`}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey) return;
        e.preventDefault();
        setLessonInUrl(lesson.number);
      }}
      className={cn(
        "group flex w-full items-center gap-4 border-b border-border/40 py-4",
        "transition-colors hover:bg-foreground/[0.025] focus-visible:bg-foreground/[0.025]",
        "focus:outline-none",
      )}
    >
      <span
        aria-hidden
        className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-foreground/5 text-sm font-bold tabular-nums text-muted-foreground"
      >
        {String(lesson.number).padStart(2, "0")}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[15px] font-medium text-foreground">
          {title}
        </span>
        <span className="mt-0.5 block text-[12px] text-muted-foreground">
          {chapterMetaSummary(lesson)}
        </span>
      </span>
      <span
        aria-hidden
        className="text-muted-foreground/60 transition-transform group-hover:translate-x-0.5 group-hover:text-foreground"
      >
        →
      </span>
    </Link>
  );
}

function chapterMetaSummary(lesson: Lesson): string {
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

function LibraryRow({
  icon,
  title,
  resource,
  exams,
  emptyHint,
}: {
  icon: string;
  title: string;
  resource?: ResourceRef;
  exams?: Exam[];
  emptyHint: string;
}) {
  const isExams = exams !== undefined;
  const provided = isExams ? exams!.length > 0 : Boolean(resource);
  const meta = isExams
    ? exams!.length === 0
      ? "leer"
      : `${exams!.length} ${exams!.length === 1 ? "Klausur" : "Klausuren"}`
    : provided
      ? resource!.source === "ai"
        ? "KI-generiert"
        : "vom Lehrstuhl"
      : "leer";

  return (
    <li className="flex items-start gap-4 border-b border-border/40 py-4">
      <span aria-hidden className="text-2xl leading-none">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-serif text-[16px] font-semibold text-foreground">
            {title}
          </h3>
          <span className="font-serif text-[12px] italic text-muted-foreground">
            {meta}
          </span>
        </div>
        <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
          {provided ? "Bereit zum Lesen." : emptyHint}
        </p>
      </div>
    </li>
  );
}

function capitalSubjectTitle(slug: string): string {
  if (!slug) return "";
  return slug.charAt(0).toUpperCase() + slug.slice(1);
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
    (e) => e.aufgaben || e.solutions.length > 0,
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
      label: "Folien & Video",
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
          label: "Walkthrough",
          active: rightUebung === "walkthrough",
          onClick: () => setRightUebung("walkthrough"),
        },
      ];

  return (
    <div className="relative grid h-[calc(100dvh-3.5rem)] w-full grid-cols-1 lg:grid-cols-2 lg:divide-x lg:divide-[var(--rule)]">
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
              emptyHint="Noch kein Walkthrough. Sobald ich die Lösung gelesen habe, schreibe ich einen — Schritt für Schritt, im Stil des Profs."
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
  children,
}: {
  ariaLabel: string;
  scrollRef: React.RefObject<HTMLDivElement | null>;
  chips: Chip[];
  progress?: boolean;
  background?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      aria-label={ariaLabel}
      className={cn(
        "relative grid h-full min-h-0 grid-rows-[auto_minmax(0,1fr)]",
        background,
      )}
    >
      {progress && <ColumnTopProgress scrollRef={scrollRef} />}

      <div className="px-3 pb-3 pt-3 sm:px-5">
        <FloatingChipPill chips={chips} />
      </div>

      <div ref={scrollRef} className="min-h-0 overflow-y-auto">
        {children}
      </div>
    </section>
  );
}

/**
 * Thicker progress bar pinned to the very top edge of the column.
 * Sits above the chip pill, doesn't try to look like a divider.
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
      className="absolute inset-x-0 top-0 z-20 h-1.5 bg-[var(--rule)]/30"
    >
      <span
        className="absolute inset-y-0 inset-s-0 bg-[var(--rule-strong)] transition-[width]"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

/**
 * Borderless floating chip pill — same vibe as the bottom chevron nav.
 * Card-tinted background, soft shadow, no outline.
 */
function FloatingChipPill({ chips }: { chips: Chip[] }) {
  return (
    <div className="inline-flex items-center gap-0.5 rounded-full bg-card/90 p-1 shadow-[0_3px_12px_rgba(0,0,0,0.06)] backdrop-blur">
      {chips.map((c) => (
        <button
          key={c.key}
          type="button"
          onClick={c.onClick}
          aria-pressed={c.active}
          className={cn(
            "cursor-pointer rounded-full px-3.5 py-1.5 text-[12.5px] font-medium transition-colors",
            c.active
              ? "bg-[var(--paper-tint)] text-[var(--ink)]"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {c.label}
        </button>
      ))}
    </div>
  );
}

/**
 * Two small chevron buttons, fixed at the center-bottom of the
 * viewport. Floats above the content. Clicking switches the whole
 * chapter (both columns reset to lecture). Keyboard ← / → does the
 * same thing.
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
      className="pointer-events-none fixed inset-x-0 bottom-5 z-30 flex justify-center"
    >
      <div className="pointer-events-auto inline-flex items-center gap-1 rounded-full bg-card/90 px-1 py-1 shadow-[0_4px_14px_rgba(0,0,0,0.12)] backdrop-blur">
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
      </div>
    </nav>
  );
}

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
  return (
    <button
      type="button"
      onClick={lesson ? () => setLessonInUrl(lesson.number) : undefined}
      disabled={disabled}
      aria-label={ariaLabel}
      title={ariaLabel}
      className={cn(
        "inline-flex h-8 w-8 items-center justify-center rounded-full text-[15px] transition-colors",
        disabled
          ? "cursor-not-allowed text-muted-foreground/40"
          : "cursor-pointer text-[var(--ink)] hover:bg-[var(--paper-tint)]",
      )}
    >
      {direction === "prev" ? "‹" : "›"}
    </button>
  );
}

/* ─────────────────────── Material panels ─────────────────────── */

function LecturePanel({ lesson }: { lesson: Lesson }) {
  return (
    <div className="flex flex-col">
      {lesson.lecture.videoUrl && (
        <div className="px-3 pb-3 pt-1 sm:px-5">
          <a
            href={lesson.lecture.videoUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-card/90 px-3 py-1.5 text-[12px] font-medium text-foreground shadow-[0_3px_12px_rgba(0,0,0,0.06)] backdrop-blur transition-colors hover:bg-card"
          >
            <span aria-hidden>▶︎</span>
            <span>Video öffnen</span>
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
  if (!exercise.aufgaben) {
    return (
      <EmptyHint>
        {`Kein Aufgaben-PDF zu „${title}“. Manchmal wird nur die Lösung veröffentlicht — schau in der rechten Spalte unter „Lösung“.`}
      </EmptyHint>
    );
  }
  return <PdfBlock src={exercise.aufgaben.src} />;
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
        Keine Lösung veröffentlicht. Den Walkthrough nutzen, sobald er
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
    <article className="prose-notebook max-w-none px-5 pt-1 pb-8 text-[14.5px] sm:px-8">
      <h2 className="not-prose mb-5 font-serif text-[22px] font-semibold leading-tight text-[var(--ink)]">
        {title}
      </h2>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
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
  return (
    <div className="px-5 pt-1 sm:px-8">
      <button
        type="button"
        onClick={() => setOverlayInUrl("quiz")}
        className="group flex w-full cursor-pointer items-center gap-4 rounded-3xl bg-card/90 px-6 py-6 text-start text-foreground shadow-[0_3px_14px_rgba(0,0,0,0.06)] backdrop-blur transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(0,0,0,0.1)]"
      >
        <span aria-hidden className="text-3xl leading-none">
          🧠
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-serif text-[19px] font-semibold leading-snug text-[var(--ink)]">
            Quiz öffnen
          </span>
          <span className="mt-1 block text-[12.5px] leading-snug text-muted-foreground">
            Viele Sets · beliebig wiederholbar · keine Antwort-Tells
          </span>
        </span>
        <span
          aria-hidden
          className="text-2xl leading-none text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground"
        >
          →
        </span>
      </button>
    </div>
  );
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
    <div className="px-5 pt-1 sm:px-8">
      <p className="rounded-2xl bg-card/70 px-5 py-4 font-serif text-[14px] italic leading-relaxed text-muted-foreground">
        {children}
      </p>
    </div>
  );
}
