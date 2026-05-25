"use client";

import { useState } from "react";
import type {
  MultipleChoiceQuestion,
  Quiz,
  QuizSet,
  TrueFalseQuestion,
} from "@/lib/notebooks/quiz-types";
import type { LocalizedText } from "@/lib/i18n/types";
import { useI18n } from "@/lib/i18n/client";
import { usePersistedState } from "@/lib/storage/use-persisted-state";
import { cn } from "@/lib/utils";

interface Props {
  quizSet: QuizSet;
}

type AnswerState = {
  chosen: number | boolean;
  correct: boolean;
};

interface QuizAttempt {
  startedAt: string;
  finishedAt: string;
  score: number;
  total: number;
}

/* ────────── Outer: picker → quiz ────────── */

export function QuizPlayer({ quizSet }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = quizSet.quizzes.find((q) => q.id === selectedId) ?? null;

  if (!selected) {
    return (
      <QuizSetPicker quizSet={quizSet} onPick={(id) => setSelectedId(id)} />
    );
  }

  return (
    <SingleQuizPlayer
      key={selected.id}
      quiz={selected}
      onBack={() => setSelectedId(null)}
    />
  );
}

/* ────────── Picker: full-width rows, click → straight into the runner ────────── */

function QuizSetPicker({
  quizSet,
  onPick,
}: {
  quizSet: QuizSet;
  onPick: (id: string) => void;
}) {
  const { tr } = useI18n();
  const totalQuestions = quizSet.quizzes.reduce(
    (acc, q) => acc + q.questions.length,
    0,
  );

  return (
    <div className="flex h-full flex-col overflow-y-auto bg-background">
      <div className="border-b border-border/60 px-6 py-8 sm:px-10 sm:py-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
          Quiz
        </p>
        <h2
          className="mt-2 text-balance text-3xl font-semibold tracking-tight sm:text-4xl"
          style={{ fontFamily: "var(--font-serif), Georgia, serif", color: "var(--ink)" }}
        >
          {tr(quizSet.title)}
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {quizSet.quizzes.length}{" "}
          {quizSet.quizzes.length === 1 ? "Quiz" : "Quizzes"} ·{" "}
          {totalQuestions} Fragen insgesamt. Tippe auf ein Quiz, um direkt zu starten.
        </p>
      </div>

      <ul className="divide-y divide-border/60">
        {quizSet.quizzes.map((q, idx) => (
          <QuizRow
            key={q.id}
            index={idx + 1}
            quiz={q}
            onClick={() => onPick(q.id)}
          />
        ))}
      </ul>
    </div>
  );
}

function QuizRow({
  index,
  quiz,
  onClick,
}: {
  index: number;
  quiz: Quiz;
  onClick: () => void;
}) {
  const { tr } = useI18n();
  const storageKey = `quiz:${quiz.id}:attempts`;
  const [attempts] = usePersistedState<QuizAttempt[]>(storageKey, []);
  const best = attempts.reduce<QuizAttempt | undefined>(
    (acc, a) =>
      !acc || a.score / a.total > acc.score / acc.total ? a : acc,
    undefined,
  );
  return (
    <li>
      <button
        type="button"
        onClick={onClick}
        className={cn(
          "group flex w-full cursor-pointer items-center gap-5 px-6 py-6 text-start transition-colors",
          "hover:bg-accent/40 sm:px-10",
        )}
      >
        <span
          className="hidden shrink-0 text-end text-3xl font-medium tabular-nums text-muted-foreground/70 sm:inline-block sm:min-w-[3ch]"
          style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
          aria-hidden
        >
          {String(index).padStart(2, "0")}
        </span>
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Quiz {index}
          </p>
          <h3 className="text-lg font-semibold leading-snug tracking-tight sm:text-xl">
            {tr(quiz.title)}
          </h3>
          {quiz.description && (
            <p className="text-sm leading-relaxed text-muted-foreground">
              {tr(quiz.description)}
            </p>
          )}
          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
            <span className="font-semibold tabular-nums text-foreground">
              {quiz.questions.length} Fragen
            </span>
            {attempts.length > 0 && (
              <span>{attempts.length}× versucht</span>
            )}
          </div>
        </div>
        <div className="ms-auto flex shrink-0 flex-col items-end gap-1.5">
          {best && (
            <span
              className={cn(
                "rounded-full px-2.5 py-1 text-xs font-semibold tabular-nums",
                best.score / best.total >= 0.8
                  ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                  : best.score / best.total >= 0.5
                    ? "bg-amber-500/10 text-amber-700 dark:text-amber-400"
                    : "bg-red-500/10 text-red-700 dark:text-red-400",
              )}
            >
              Beste {Math.round((best.score / best.total) * 100)}%
            </span>
          )}
          <span
            aria-hidden
            className="text-2xl leading-none text-muted-foreground transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
          >
            ›
          </span>
        </div>
      </button>
    </li>
  );
}

/* ────────── Single quiz: jumps straight into the runner ────────── */

function SingleQuizPlayer({
  quiz,
  onBack,
}: {
  quiz: Quiz;
  onBack: () => void;
}) {
  const { tr } = useI18n();
  const storageKey = `quiz:${quiz.id}:attempts`;
  const [attempts, setAttempts] = usePersistedState<QuizAttempt[]>(
    storageKey,
    [],
  );

  type View =
    | {
        kind: "running";
        index: number;
        answers: Record<string, AnswerState>;
        startedAt: string;
      }
    | { kind: "done"; attempt: QuizAttempt };

  const [view, setView] = useState<View>(() => ({
    kind: "running",
    index: 0,
    answers: {},
    startedAt: new Date().toISOString(),
  }));

  const submit = (chosen: number | boolean) => {
    if (view.kind !== "running") return;
    const q = quiz.questions[view.index];
    const correct =
      q.type === "mcq" ? chosen === q.correct : chosen === q.correct;
    setView({
      ...view,
      answers: { ...view.answers, [q.id]: { chosen, correct } },
    });
  };

  const next = () => {
    if (view.kind !== "running") return;
    if (view.index < quiz.questions.length - 1) {
      setView({ ...view, index: view.index + 1 });
    } else {
      const score = Object.values(view.answers).filter((a) => a.correct).length;
      const attempt: QuizAttempt = {
        startedAt: view.startedAt,
        finishedAt: new Date().toISOString(),
        score,
        total: quiz.questions.length,
      };
      setAttempts((prev) => [attempt, ...prev].slice(0, 50));
      setView({ kind: "done", attempt });
    }
  };

  const prev = () => {
    if (view.kind !== "running") return;
    setView({ ...view, index: Math.max(0, view.index - 1) });
  };

  const restart = () => {
    setView({
      kind: "running",
      index: 0,
      answers: {},
      startedAt: new Date().toISOString(),
    });
  };

  if (view.kind === "done") {
    const prevBest = attempts.slice(1).reduce<QuizAttempt | undefined>(
      (acc, a) =>
        !acc || a.score / a.total > acc.score / acc.total ? a : acc,
      undefined,
    );
    return (
      <QuizSummary
        attempt={view.attempt}
        previousBest={prevBest}
        onRetake={restart}
        onBack={onBack}
      />
    );
  }

  return (
    <QuizRunner
      quiz={quiz}
      view={view}
      onSubmit={submit}
      onNext={next}
      onPrev={prev}
      onExit={onBack}
      tr={tr}
    />
  );
}

/* ────────── RUNNER (full-width, no centered narrow column) ────────── */

function QuizRunner({
  quiz,
  view,
  onSubmit,
  onNext,
  onPrev,
  onExit,
  tr,
}: {
  quiz: Quiz;
  view: {
    kind: "running";
    index: number;
    answers: Record<string, AnswerState>;
    startedAt: string;
  };
  onSubmit: (chosen: number | boolean) => void;
  onNext: () => void;
  onPrev: () => void;
  onExit: () => void;
  tr: (text: LocalizedText | undefined) => string;
}) {
  const questions = quiz.questions;
  const question = questions[view.index];
  const state = view.answers[question.id];
  const answered = !!state;
  const total = questions.length;
  const score = Object.values(view.answers).filter((a) => a.correct).length;
  const finished = view.index === total - 1 && answered;

  return (
    <div className="flex h-full flex-col bg-background">
      <header className="shrink-0 border-b border-border/60 px-6 py-4 sm:px-10">
        <div className="flex items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onExit}
              className="inline-flex cursor-pointer items-center gap-1 rounded-full border border-border bg-card px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              title="Quiz verlassen"
            >
              <span aria-hidden className="rtl:rotate-180">
                ‹
              </span>
              <span>Quiz-Liste</span>
            </button>
            <span aria-hidden className="text-base leading-none">
              🧠
            </span>
            <span className="font-semibold tabular-nums">
              {view.index + 1} / {total}
            </span>
          </div>
          <span className="text-muted-foreground">
            Punkte:{" "}
            <span className="font-semibold tabular-nums text-foreground">
              {score}
            </span>
            <span className="text-muted-foreground">
              {" "}
              / {Object.keys(view.answers).length}
            </span>
          </span>
        </div>
        <div className="mt-3 flex gap-1">
          {questions.map((_, i) => {
            const ans = view.answers[questions[i].id];
            const done = !!ans;
            const current = i === view.index;
            return (
              <span
                key={i}
                className={cn(
                  "h-1.5 flex-1 rounded-full transition-colors",
                  current
                    ? "bg-foreground"
                    : done
                      ? ans.correct
                        ? "bg-emerald-500/70"
                        : "bg-amber-500/70"
                      : "bg-muted",
                )}
              />
            );
          })}
        </div>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto px-6 py-10 sm:px-10 sm:py-14">
        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
          Frage {view.index + 1}
        </p>
        <h3
          className="mt-2 text-balance text-2xl font-semibold leading-tight tracking-tight sm:text-3xl"
          style={{ fontFamily: "var(--font-serif), Georgia, serif", color: "var(--ink)" }}
        >
          {tr(
            question.type === "mcq"
              ? question.question
              : (question as TrueFalseQuestion).statement,
          )}
        </h3>

        <div className="mt-8 space-y-2.5">
          {question.type === "mcq"
            ? renderMcq(question, state, onSubmit, tr)
            : renderTf(question, state, onSubmit)}
        </div>

        {answered && question.explanation && (
          <div
            className={cn(
              "mt-8 rounded-2xl border p-5 text-sm leading-relaxed",
              state.correct
                ? "border-emerald-500/30 bg-emerald-500/5"
                : "border-amber-500/30 bg-amber-500/5",
            )}
          >
            <div
              className={cn(
                "mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em]",
                state.correct
                  ? "text-emerald-700 dark:text-emerald-400"
                  : "text-amber-700 dark:text-amber-400",
              )}
            >
              <span aria-hidden className="text-base leading-none">
                {state.correct ? "✓" : "✗"}
              </span>
              <span>{state.correct ? "Richtig" : "Nicht ganz"}</span>
            </div>
            {tr(question.explanation)}
          </div>
        )}
      </div>

      <footer className="flex shrink-0 items-center justify-between gap-3 border-t border-border/60 px-6 py-4 sm:px-10">
        <button
          type="button"
          onClick={onPrev}
          disabled={view.index === 0}
          className={cn(
            "inline-flex h-10 cursor-pointer items-center gap-1.5 rounded-full border border-border bg-card px-4 text-sm font-medium",
            "transition-colors hover:bg-accent",
            "disabled:pointer-events-none disabled:opacity-30",
          )}
        >
          <span aria-hidden className="rtl:rotate-180">
            ‹
          </span>
          <span>Zurück</span>
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!answered}
          className={cn(
            "inline-flex h-10 cursor-pointer items-center gap-1.5 rounded-full border border-foreground bg-foreground px-5 text-sm font-semibold text-background",
            "transition-opacity hover:opacity-90",
            "disabled:pointer-events-none disabled:opacity-30",
          )}
        >
          <span>{finished ? "Quiz abschließen" : "Weiter"}</span>
          <span aria-hidden className="rtl:rotate-180">
            ›
          </span>
        </button>
      </footer>
    </div>
  );
}

/* ────────── SUMMARY ────────── */

function QuizSummary({
  attempt,
  previousBest,
  onRetake,
  onBack,
}: {
  attempt: QuizAttempt;
  previousBest: QuizAttempt | undefined;
  onRetake: () => void;
  onBack: () => void;
}) {
  const pct = Math.round((attempt.score / attempt.total) * 100);
  const newRecord =
    !previousBest ||
    attempt.score / attempt.total > previousBest.score / previousBest.total;

  return (
    <div className="flex h-full flex-col items-center justify-center bg-background px-6 py-10">
      <div className="flex w-full max-w-md flex-col items-center gap-6 rounded-3xl border border-border bg-card p-8 text-center shadow-sm">
        <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
          Ergebnis
        </span>
        <span aria-hidden className="text-7xl leading-none">
          {pct >= 90 ? "🎯" : pct >= 70 ? "✨" : pct >= 50 ? "💪" : "📚"}
        </span>
        <div className="flex flex-col items-center gap-1">
          <div
            className="text-6xl font-semibold tabular-nums tracking-tighter"
            style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
          >
            {attempt.score}
            <span className="text-muted-foreground/60"> / {attempt.total}</span>
          </div>
          <div className="text-lg tabular-nums text-muted-foreground">
            {pct}%
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
          {newRecord && (
            <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-emerald-700 dark:text-emerald-400">
              Neue Bestleistung 🎉
            </span>
          )}
          {!newRecord && previousBest && (
            <span className="text-muted-foreground">
              Bestleistung: {previousBest.score}/{previousBest.total}
            </span>
          )}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            onClick={onRetake}
            className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-full border border-foreground bg-foreground px-6 text-sm font-semibold text-background transition-opacity hover:opacity-90"
          >
            Nochmal versuchen
          </button>
          <button
            type="button"
            onClick={onBack}
            className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-full border border-border bg-card px-6 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
          >
            Andere Quizzes
          </button>
        </div>
      </div>
    </div>
  );
}

/* ────────── Answer renderers ────────── */

function renderMcq(
  q: MultipleChoiceQuestion,
  state: AnswerState | undefined,
  submit: (chosen: number) => void,
  tr: (text: LocalizedText | undefined) => string,
) {
  return q.options.map((opt, i) => {
    const answered = !!state;
    const chosen = answered ? state.chosen === i : false;
    const isCorrectChoice = i === q.correct;
    return (
      <button
        key={i}
        type="button"
        onClick={() => !answered && submit(i)}
        disabled={answered}
        className={cn(
          "flex w-full items-start gap-3 rounded-2xl border-2 px-4 py-3.5 text-start text-sm leading-snug transition-all sm:text-base",
          !answered &&
            "cursor-pointer hover:-translate-y-0.5 hover:border-foreground/30 hover:bg-accent",
          answered && isCorrectChoice
            ? "border-emerald-500/60 bg-emerald-500/5"
            : answered && chosen && !isCorrectChoice
              ? "border-amber-500/60 bg-amber-500/5"
              : "border-border bg-card",
        )}
      >
        <span
          className={cn(
            "mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold",
            answered && isCorrectChoice
              ? "border-emerald-500 bg-emerald-500 text-white"
              : answered && chosen && !isCorrectChoice
                ? "border-amber-500 bg-amber-500 text-white"
                : "border-border text-muted-foreground",
          )}
        >
          {String.fromCharCode(65 + i)}
        </span>
        <span className="flex-1">{tr(opt)}</span>
        {answered && isCorrectChoice && (
          <span
            aria-hidden
            className="ms-auto text-lg leading-none text-emerald-600 dark:text-emerald-400"
          >
            ✓
          </span>
        )}
        {answered && chosen && !isCorrectChoice && (
          <span
            aria-hidden
            className="ms-auto text-lg leading-none text-amber-600 dark:text-amber-400"
          >
            ×
          </span>
        )}
      </button>
    );
  });
}

function renderTf(
  q: TrueFalseQuestion,
  state: AnswerState | undefined,
  submit: (chosen: boolean) => void,
) {
  const choices: { value: boolean; label: string; icon: string }[] = [
    { value: true, label: "Richtig", icon: "✓" },
    { value: false, label: "Falsch", icon: "✗" },
  ];
  return (
    <div className="grid grid-cols-2 gap-2.5">
      {choices.map(({ value, label, icon }) => {
        const answered = !!state;
        const chosen = answered ? state.chosen === value : false;
        const isCorrectChoice = value === q.correct;
        return (
          <button
            key={String(value)}
            type="button"
            onClick={() => !answered && submit(value)}
            disabled={answered}
            className={cn(
              "flex items-center justify-center gap-2 rounded-2xl border-2 px-4 py-6 text-base font-semibold transition-all",
              !answered &&
                "cursor-pointer hover:-translate-y-0.5 hover:border-foreground/30 hover:bg-accent",
              answered && isCorrectChoice
                ? "border-emerald-500/60 bg-emerald-500/5"
                : answered && chosen && !isCorrectChoice
                  ? "border-amber-500/60 bg-amber-500/5"
                  : "border-border bg-card",
            )}
          >
            <span aria-hidden className="text-xl leading-none">
              {icon}
            </span>
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
}

