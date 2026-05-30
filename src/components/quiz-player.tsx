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
import {
  useContentText,
  notebookOf,
  contentKey,
} from "@/lib/i18n/content-client";
import { usePersistedState } from "@/lib/storage/use-persisted-state";
import { UI } from "@/lib/notebooks/ui-i18n";
import { cn } from "@/lib/utils";

interface Props {
  quizSet: QuizSet;
  /** Inline reading column: pad the picker/runner/summary so their top content
      clears the floating chips. Off in the fullscreen overlay, which has a real
      header bar instead. */
  chipInset?: boolean;
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

export function QuizPlayer({ quizSet, chipInset }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = quizSet.quizzes.find((q) => q.id === selectedId) ?? null;

  if (!selected) {
    return (
      <QuizSetPicker
        quizSet={quizSet}
        onPick={(id) => setSelectedId(id)}
        chipInset={chipInset}
      />
    );
  }

  return (
    <SingleQuizPlayer
      key={selected.id}
      quiz={selected}
      onBack={() => setSelectedId(null)}
      chipInset={chipInset}
    />
  );
}

/* ────────── Picker: full-width rows, click → straight into the runner ────────── */

function QuizSetPicker({
  quizSet,
  onPick,
  chipInset,
}: {
  quizSet: QuizSet;
  onPick: (id: string) => void;
  chipInset?: boolean;
}) {
  // No header bar — the floating "Quiz" chip already labels this column and the
  // chapter title lives on the lecture side. The list scrolls under the floating
  // chips exactly like the Erklärung panel; top padding clears the chips at rest.
  return (
    <div className="flex h-full flex-col overflow-y-auto bg-background">
      <ul className={cn("divide-y divide-border/60", chipInset ? "pt-20" : "pt-6 sm:pt-8")}>
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
  const last = attempts[0];
  const bestPct = best ? Math.round((best.score / best.total) * 100) : 0;
  const lastPct = last ? Math.round((last.score / last.total) * 100) : 0;
  const mastered = best ? best.score / best.total >= 0.9 : false;
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
              {quiz.questions.length} {tr(UI.fragen)}
            </span>
            {attempts.length > 0 ? (
              <>
                <span>
                  {attempts.length}× {tr(UI.attempted)} · {tr(UI.last)}{" "}
                  <span className="font-semibold tabular-nums text-foreground">
                    {lastPct}%
                  </span>
                </span>
                {mastered && (
                  <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                    ✓ {tr(UI.mastered)}
                  </span>
                )}
              </>
            ) : (
              <span className="italic">{tr(UI.notAttempted)}</span>
            )}
          </div>
        </div>
        <div className="ms-auto flex shrink-0 flex-col items-end gap-1.5">
          {best ? (
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
              {tr(UI.best)} {bestPct}%
            </span>
          ) : (
            <span className="rounded-full border border-dashed border-border px-2.5 py-1 text-xs font-medium text-muted-foreground">
              {tr(UI.neu)}
            </span>
          )}
          {attempts.length > 0 && (
            <div className="flex items-center gap-1" aria-hidden title="Letzte Versuche">
              {attempts
                .slice(0, 5)
                .reverse()
                .map((a, i) => {
                  const p = a.score / a.total;
                  return (
                    <span
                      key={i}
                      className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        p >= 0.8
                          ? "bg-emerald-500"
                          : p >= 0.5
                            ? "bg-amber-500"
                            : "bg-red-500",
                      )}
                    />
                  );
                })}
            </div>
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
  chipInset,
}: {
  quiz: Quiz;
  onBack: () => void;
  chipInset?: boolean;
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
        attempts={attempts}
        onRetake={restart}
        onBack={onBack}
        chipInset={chipInset}
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
      chipInset={chipInset}
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
  chipInset,
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
  chipInset?: boolean;
}) {
  const ct = useContentText(notebookOf(quiz.id));
  const questions = quiz.questions;
  const question = questions[view.index];
  const state = view.answers[question.id];
  const answered = !!state;
  const total = questions.length;
  const score = Object.values(view.answers).filter((a) => a.correct).length;
  const finished = view.index === total - 1 && answered;

  // One scrolling column under the floating chips — no header/footer bars, just
  // like the Erklärung panel. The back link, progress and nav buttons flow with
  // the content. chipInset pads the top clear of the chips in the reading column.
  return (
    <div className="h-full overflow-y-auto bg-background">
      <div
        className={cn(
          "mx-auto max-w-3xl px-6 pb-16 sm:px-10",
          chipInset ? "pt-20" : "pt-8",
        )}
      >
        <div className="flex items-center justify-between gap-4 text-xs">
          <button
            type="button"
            onClick={onExit}
            className="inline-flex cursor-pointer items-center gap-1 rounded-full border border-border bg-card px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            title={tr(UI.leaveQuiz)}
          >
            <span aria-hidden className="rtl:rotate-180">
              ‹
            </span>
            <span>{tr(UI.quizList)}</span>
          </button>
          <span className="flex items-center gap-3 text-muted-foreground">
            <span className="font-semibold tabular-nums text-foreground">
              {view.index + 1} / {total}
            </span>
            <span>
              {tr(UI.points)}{" "}
              <span className="font-semibold tabular-nums text-foreground">
                {score}
              </span>
              /{Object.keys(view.answers).length}
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

        <p className="mt-10 text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
          {tr(UI.question)} {view.index + 1}
        </p>
        <h3
          className="mt-2 text-balance text-2xl font-semibold leading-tight tracking-tight sm:text-3xl"
          style={{ fontFamily: "var(--font-serif), Georgia, serif", color: "var(--ink)" }}
        >
          {question.type === "mcq"
            ? ct(
                contentKey.question(quiz.id, question.id),
                tr(question.question),
              )
            : ct(
                contentKey.statement(quiz.id, question.id),
                tr((question as TrueFalseQuestion).statement),
              )}
        </h3>

        <div className="mt-8 space-y-2.5">
          {question.type === "mcq"
            ? renderMcq(question, state, onSubmit, tr, quiz.id, ct)
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
              <span>{state.correct ? tr(UI.correct) : tr(UI.notQuite)}</span>
            </div>
            {ct(
              contentKey.explanation(quiz.id, question.id),
              tr(question.explanation),
            )}
          </div>
        )}

        <div className="mt-10 flex items-center justify-between gap-3">
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
            <span>{tr(UI.back)}</span>
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
            <span>{finished ? tr(UI.finishQuiz) : tr(UI.next)}</span>
            <span aria-hidden className="rtl:rotate-180">
              ›
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ────────── SUMMARY ────────── */

function QuizSummary({
  attempt,
  previousBest,
  attempts,
  onRetake,
  onBack,
  chipInset,
}: {
  attempt: QuizAttempt;
  previousBest: QuizAttempt | undefined;
  attempts: QuizAttempt[];
  onRetake: () => void;
  onBack: () => void;
  chipInset?: boolean;
}) {
  const { tr } = useI18n();
  const pct = Math.round((attempt.score / attempt.total) * 100);
  const newRecord =
    !previousBest ||
    attempt.score / attempt.total > previousBest.score / previousBest.total;
  // Most recent first; the just-finished attempt sits at index 0.
  const history = attempts;

  return (
    <div
      className={cn(
        "flex h-full flex-col items-center overflow-y-auto bg-background px-6 pb-10",
        chipInset ? "pt-20" : "pt-10",
      )}
    >
      <div className="my-auto flex w-full max-w-md flex-col items-center gap-6 rounded-3xl border border-border bg-card p-8 text-center shadow-sm">
        <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
          {tr(UI.result)}
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
              {tr(UI.newBest)} 🎉
            </span>
          )}
          {!newRecord && previousBest && (
            <span className="text-muted-foreground">
              {tr(UI.bestScore)}: {previousBest.score}/{previousBest.total}
            </span>
          )}
        </div>

        {history.length > 1 && (
          <div className="w-full text-start">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              {tr(UI.history)} · {history.length} {tr(UI.attemptsPlural)}
            </p>
            <ul className="flex flex-col">
              {history.slice(0, 10).map((a, i) => (
                <AttemptRow key={a.finishedAt + i} attempt={a} current={i === 0} />
              ))}
            </ul>
            {history.length > 10 && (
              <p className="mt-1.5 text-xs text-muted-foreground">
                {tr(UI.and)} {history.length - 10} {tr(UI.more)}
              </p>
            )}
          </div>
        )}

        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            onClick={onRetake}
            className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-full border border-foreground bg-foreground px-6 text-sm font-semibold text-background transition-opacity hover:opacity-90"
          >
            {tr(UI.retake)}
          </button>
          <button
            type="button"
            onClick={onBack}
            className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-full border border-border bg-card px-6 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
          >
            {tr(UI.otherQuizzes)}
          </button>
        </div>
      </div>
    </div>
  );
}

/** One row in the attempt-history list on the summary screen. */
function AttemptRow({
  attempt,
  current,
}: {
  attempt: QuizAttempt;
  current: boolean;
}) {
  const pct = Math.round((attempt.score / attempt.total) * 100);
  const when = new Date(attempt.finishedAt);
  const dateLabel = when.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
  const timeLabel = when.toLocaleTimeString("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <li
      className={cn(
        "flex items-center justify-between gap-3 rounded-lg px-2.5 py-1.5 text-sm",
        current && "bg-accent/50",
      )}
    >
      <span className="flex items-center gap-2 text-muted-foreground">
        <span className="tabular-nums">
          {dateLabel} · {timeLabel}
        </span>
        {current && (
          <span className="rounded-full bg-foreground/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-foreground">
            jetzt
          </span>
        )}
      </span>
      <span className="flex items-center gap-2">
        <span className="font-semibold tabular-nums text-foreground">
          {attempt.score}/{attempt.total}
        </span>
        <span
          className={cn(
            "w-11 rounded-full px-2 py-0.5 text-center text-xs font-semibold tabular-nums",
            pct >= 80
              ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
              : pct >= 50
                ? "bg-amber-500/10 text-amber-700 dark:text-amber-400"
                : "bg-red-500/10 text-red-700 dark:text-red-400",
          )}
        >
          {pct}%
        </span>
      </span>
    </li>
  );
}

/* ────────── Answer renderers ────────── */

function renderMcq(
  q: MultipleChoiceQuestion,
  state: AnswerState | undefined,
  submit: (chosen: number) => void,
  tr: (text: LocalizedText | undefined) => string,
  quizId: string,
  ct: (key: string, german: string) => string,
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
        <span className="flex-1">
          {ct(contentKey.option(quizId, q.id, i), tr(opt))}
        </span>
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

