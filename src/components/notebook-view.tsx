"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import type { Exercise, Lecture, Lesson, Notebook, PdfRef } from "@/lib/notebooks/types";
import {
  clampedIndex,
  setLeftSelectionInUrl,
  setRightViewInUrl,
  setSolutionVariantInUrl,
} from "@/lib/notebooks/nav";
import { getQuizSet } from "@/lib/notebooks/quizzes/registry";
import { getExplanation } from "@/lib/notebooks/explanations/registry";
import { QuizPlayer } from "@/components/quiz-player";
import { ExplanationView } from "@/components/explanation-view";
import { useI18n } from "@/lib/i18n/client";
import { cn } from "@/lib/utils";

const PdfViewer = dynamic(
  () => import("./pdf-viewer").then((m) => m.PdfViewer),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
        Wird geladen…
      </div>
    ),
  },
);

interface Props {
  notebook: Notebook;
}

type LeftSelection = "lecture" | `ex${number}`;
type RightView = "quiz" | "walkthrough" | null;

export function NotebookView({ notebook }: Props) {
  const searchParams = useSearchParams();
  const lessonIndex = clampedIndex(
    parseInt(searchParams.get("l") ?? "1") - 1,
    notebook.lessons.length,
  );
  const lesson = notebook.lessons[lessonIndex];

  const selectionParam = (searchParams.get("s") ?? "lecture") as LeftSelection;
  const leftSelection = normaliseSelection(selectionParam, lesson);

  const rightViewParam = searchParams.get("v");
  const rightView: RightView =
    rightViewParam === "quiz" || rightViewParam === "walkthrough"
      ? rightViewParam
      : null;

  const svParam = parseInt(searchParams.get("sv") ?? "1") - 1;

  // Warm the cache for adjacent lessons so chevron jumps feel instant.
  useEffect(() => {
    const adjacent = [
      notebook.lessons[lessonIndex - 1],
      notebook.lessons[lessonIndex + 1],
    ].filter(Boolean);
    const urls = new Set<string>();
    for (const adj of adjacent) {
      if (adj.lecture.pdf?.src) urls.add(adj.lecture.pdf.src);
      for (const ex of adj.exercises) {
        if (ex.aufgaben?.src) urls.add(ex.aufgaben.src);
        for (const sol of ex.solutions) urls.add(sol.src);
      }
    }
    const controllers: AbortController[] = [];
    const timer = window.setTimeout(() => {
      for (const url of urls) {
        const c = new AbortController();
        fetch(url, {
          signal: c.signal,
          priority: "low" as RequestPriority,
          cache: "force-cache",
        }).catch(() => {});
        controllers.push(c);
      }
    }, 1500);
    return () => {
      window.clearTimeout(timer);
      controllers.forEach((c) => c.abort());
    };
  }, [notebook, lessonIndex]);

  const activeLeftPdf =
    leftSelection === "lecture"
      ? lesson.lecture.pdf?.src
      : lesson.exercises[parseExerciseIndex(leftSelection)]?.aufgaben?.src;

  return (
    <>
      {activeLeftPdf && (
        <link rel="preload" as="fetch" crossOrigin="anonymous" href={activeLeftPdf} />
      )}
      <div className="grid h-[calc(100dvh-3.5rem)] grid-cols-1 md:grid-cols-2 md:divide-x md:divide-border/60 rtl:md:divide-x-reverse">
        <LeftPane
          lesson={lesson}
          selection={leftSelection}
          onSelect={(s) => setLeftSelectionInUrl(s)}
        />
        <RightPane
          lesson={lesson}
          leftSelection={leftSelection}
          view={rightView}
          solutionIndex={svParam}
          onOpenQuiz={() => setRightViewInUrl("quiz")}
          onOpenWalkthrough={() => setRightViewInUrl("walkthrough")}
          onCloseTakeover={() => setRightViewInUrl(null)}
          onSelectSolution={(i) => setSolutionVariantInUrl(i + 1)}
        />
      </div>
    </>
  );
}

/* ────────── LEFT pane: lecture + exercises ────────── */

function LeftPane({
  lesson,
  selection,
  onSelect,
}: {
  lesson: Lesson;
  selection: LeftSelection;
  onSelect: (s: LeftSelection) => void;
}) {
  const { tr } = useI18n();

  const chips = useMemo(() => {
    const items: { id: LeftSelection; label: string }[] = [
      { id: "lecture", label: tr(lesson.lecture.pdf?.label) || "Vorlesung" },
    ];
    lesson.exercises.forEach((ex, i) => {
      items.push({ id: `ex${i}`, label: tr(ex.label) });
    });
    return items;
  }, [lesson, tr]);

  const activePdf =
    selection === "lecture"
      ? lesson.lecture.pdf
      : lesson.exercises[parseExerciseIndex(selection)]?.aufgaben;

  const isLecture = selection === "lecture";

  return (
    <div className="flex min-h-0 flex-col">
      <ChipBar>
        {chips.map((c) => (
          <Chip
            key={c.id}
            active={c.id === selection}
            onClick={() => onSelect(c.id)}
          >
            {c.label}
          </Chip>
        ))}
      </ChipBar>
      <div className="min-h-0 flex-1">
        {activePdf ? (
          <PdfViewer key={activePdf.src} src={activePdf.src} />
        ) : (
          <EmptyPane
            title={isLecture ? "Keine Vorlesung hinterlegt" : "Keine Aufgaben hinterlegt"}
            hint={
              isLecture
                ? "Diese Sitzung hat (noch) keine Vorlesungsfolien."
                : "Für diese Übung wurden keine Aufgaben veröffentlicht — eventuell gibt es trotzdem eine Lösung auf der rechten Seite."
            }
          />
        )}
      </div>
    </div>
  );
}

/* ────────── RIGHT pane: mirrors left selection, with takeovers ────────── */

function RightPane({
  lesson,
  leftSelection,
  view,
  solutionIndex,
  onOpenQuiz,
  onOpenWalkthrough,
  onCloseTakeover,
  onSelectSolution,
}: {
  lesson: Lesson;
  leftSelection: LeftSelection;
  view: RightView;
  solutionIndex: number;
  onOpenQuiz: () => void;
  onOpenWalkthrough: () => void;
  onCloseTakeover: () => void;
  onSelectSolution: (i: number) => void;
}) {
  if (view === "quiz") {
    return (
      <TakeoverShell title="Quiz" onClose={onCloseTakeover}>
        <QuizTakeover quizSetId={lesson.lecture.quizSetId} />
      </TakeoverShell>
    );
  }

  if (view === "walkthrough") {
    const ex = leftSelection === "lecture"
      ? undefined
      : lesson.exercises[parseExerciseIndex(leftSelection)];
    const walkthroughId =
      leftSelection === "lecture"
        ? lesson.lecture.walkthroughId
        : ex?.walkthroughId;
    return (
      <TakeoverShell title="Walkthrough" onClose={onCloseTakeover}>
        <WalkthroughTakeover walkthroughId={walkthroughId} />
      </TakeoverShell>
    );
  }

  if (leftSelection === "lecture") {
    return (
      <LectureContext lecture={lesson.lecture} onOpenQuiz={onOpenQuiz} />
    );
  }

  const ex = lesson.exercises[parseExerciseIndex(leftSelection)];
  return (
    <ExerciseContext
      exercise={ex}
      solutionIndex={solutionIndex}
      onSelectSolution={onSelectSolution}
      onOpenWalkthrough={onOpenWalkthrough}
    />
  );
}

/**
 * Right pane when Vorlesung is active. Erklärung fills the pane; the Quiz
 * is offered as a discreet enhancer floating in the bottom-right corner —
 * not a chip strip at the top.
 */
function LectureContext({
  lecture,
  onOpenQuiz,
}: {
  lecture: Lecture;
  onOpenQuiz: () => void;
}) {
  const explanation = lecture.walkthroughId
    ? getExplanation(lecture.walkthroughId)
    : undefined;

  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      <div className="min-h-0 flex-1">
        {explanation ? (
          <ExplanationView explanation={explanation} eyebrow="Erklärung" />
        ) : (
          <EmptyPane
            title="Noch keine Erklärung"
            hint="Diese Vorlesung hat noch keine ausgearbeitete Tiefen-Erklärung. Du kannst direkt mit dem Quiz starten."
            cta={
              lecture.quizSetId
                ? { label: "Quiz starten", onClick: onOpenQuiz }
                : undefined
            }
          />
        )}
      </div>
      {lecture.quizSetId && (
        <FloatingEnhancer
          icon="🧠"
          label="Quiz starten"
          onClick={onOpenQuiz}
        />
      )}
    </div>
  );
}

/**
 * Right pane when an Übung is active. Lösung PDF fills the pane; the
 * Walkthrough lives as a floating enhancer in the bottom-right corner.
 * Multiple Lösung variants surface as a thin chip strip pinned to the
 * BOTTOM of the pane (never at the top).
 */
function ExerciseContext({
  exercise,
  solutionIndex,
  onSelectSolution,
  onOpenWalkthrough,
}: {
  exercise: Exercise | undefined;
  solutionIndex: number;
  onSelectSolution: (i: number) => void;
  onOpenWalkthrough: () => void;
}) {
  const { tr } = useI18n();
  const solutions: PdfRef[] = exercise?.solutions ?? [];
  const activeIdx = clampedIndex(solutionIndex, solutions.length);
  const activeSolution = solutions[activeIdx];

  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      <div className="min-h-0 flex-1">
        {activeSolution ? (
          <PdfViewer key={activeSolution.src} src={activeSolution.src} />
        ) : (
          <EmptyPane
            title="Noch keine Lösung"
            hint={
              exercise?.walkthroughId
                ? "Für diese Übung gibt es keine offizielle Lösungs-PDF — der Walkthrough unten rechts erklärt jeden Schritt."
                : "Für diese Übung wurde keine Lösung veröffentlicht."
            }
            cta={
              exercise?.walkthroughId
                ? { label: "Walkthrough öffnen", onClick: onOpenWalkthrough }
                : undefined
            }
          />
        )}
      </div>
      {solutions.length > 1 && (
        <div className="flex shrink-0 flex-wrap gap-1.5 border-t border-border/60 bg-surface/40 px-4 py-2 sm:px-6">
          {solutions.map((sol, i) => (
            <Chip
              key={sol.src}
              active={i === activeIdx}
              onClick={() => onSelectSolution(i)}
            >
              {tr(sol.label)}
            </Chip>
          ))}
        </div>
      )}
      {exercise?.walkthroughId && (
        <FloatingEnhancer
          icon="📖"
          label="Walkthrough"
          onClick={onOpenWalkthrough}
        />
      )}
    </div>
  );
}

/* ────────── Takeover shell ────────── */

function TakeoverShell({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-0 flex-col">
      <div className="flex shrink-0 items-center justify-between gap-3 border-b border-border/60 bg-surface/40 px-4 py-2.5 sm:px-6">
        <button
          type="button"
          onClick={onClose}
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <span aria-hidden className="rtl:rotate-180">‹</span>
          <span>Zurück</span>
        </button>
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          {title}
        </span>
        <span aria-hidden className="w-[68px]" />
      </div>
      <div className="min-h-0 flex-1">{children}</div>
    </div>
  );
}

function QuizTakeover({ quizSetId }: { quizSetId: string | undefined }) {
  if (!quizSetId) {
    return (
      <EmptyPane title="Kein Quiz" hint="Diese Vorlesung hat noch keine Quiz-Fragen." />
    );
  }
  const set = getQuizSet(quizSetId);
  if (!set) {
    return (
      <EmptyPane title="Quiz nicht gefunden" hint={`Kein Quiz mit der ID „${quizSetId}".`} />
    );
  }
  return <QuizPlayer key={quizSetId} quizSet={set} />;
}

function WalkthroughTakeover({ walkthroughId }: { walkthroughId: string | undefined }) {
  if (!walkthroughId) {
    return (
      <EmptyPane title="Kein Walkthrough" hint="Hierfür gibt es noch keinen Schritt-für-Schritt-Walkthrough." />
    );
  }
  const expl = getExplanation(walkthroughId);
  if (!expl) {
    return (
      <EmptyPane title="Walkthrough nicht gefunden" hint={`Keine Erklärung mit der ID „${walkthroughId}".`} />
    );
  }
  return <ExplanationView explanation={expl} eyebrow="Walkthrough" />;
}

/* ────────── Reusable bits ────────── */

/**
 * Floating enhancer button — sits in the bottom-right corner of the right
 * pane like a FAB. Visually it should feel like an invitation embedded in
 * the content, not a navigation chip.
 */
function FloatingEnhancer({
  icon,
  label,
  onClick,
}: {
  icon: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "absolute bottom-5 end-5 z-20 inline-flex h-12 cursor-pointer items-center gap-2 rounded-full px-5 text-sm font-semibold",
        "border border-foreground bg-foreground text-background",
        "shadow-lg shadow-foreground/15 ring-1 ring-background/10",
        "transition-all hover:-translate-y-0.5 hover:shadow-xl",
      )}
    >
      <span aria-hidden className="text-base leading-none">{icon}</span>
      <span>{label}</span>
    </button>
  );
}

function ChipBar({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex shrink-0 flex-wrap gap-1.5 border-b border-border/60 bg-surface/40 px-4 py-2 sm:px-6">
      {children}
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
  disabled,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-colors",
        disabled ? "cursor-default" : "cursor-pointer",
        active
          ? "border-foreground bg-foreground text-background"
          : "border-border bg-card text-muted-foreground hover:bg-accent hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}

function EmptyPane({
  title,
  hint,
  cta,
}: {
  title: string;
  hint: string;
  cta?: { label: string; onClick: () => void };
}) {
  return (
    <div className="flex h-full items-center justify-center px-8 py-12">
      <div className="flex max-w-sm flex-col items-center gap-4 text-center">
        <span aria-hidden className="text-4xl leading-none opacity-60">📭</span>
        <h3
          className="text-xl font-semibold tracking-tight"
          style={{ fontFamily: "var(--font-serif), Georgia, serif", color: "var(--ink)" }}
        >
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{hint}</p>
        {cta && (
          <button
            type="button"
            onClick={cta.onClick}
            className="mt-2 inline-flex h-10 cursor-pointer items-center gap-1.5 rounded-full border border-foreground bg-foreground px-5 text-sm font-semibold text-background transition-opacity hover:opacity-90"
          >
            {cta.label}
          </button>
        )}
      </div>
    </div>
  );
}

/* ────────── Helpers ────────── */

function parseExerciseIndex(selection: LeftSelection): number {
  if (selection === "lecture") return -1;
  const n = parseInt(selection.slice(2));
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

function normaliseSelection(raw: string, lesson: Lesson): LeftSelection {
  if (raw === "lecture") return "lecture";
  if (raw.startsWith("ex")) {
    const n = parseInt(raw.slice(2));
    if (Number.isFinite(n) && n >= 0 && n < lesson.exercises.length) {
      return `ex${n}`;
    }
  }
  return "lecture";
}
