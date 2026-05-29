"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { SUBJECTS } from "@/lib/subjects/registry";
import { getNotebookForYear } from "@/lib/notebooks/registry";
import { getExplanation } from "@/lib/notebooks/explanations/registry";
import { getQuizSet } from "@/lib/notebooks/quizzes/registry";
import { clampedIndex, setOverlayInUrl } from "@/lib/notebooks/nav";
import { ExplanationView } from "@/components/explanation-view";
import { QuizPlayer } from "@/components/quiz-player";
import { cn } from "@/lib/utils";

const SUBJECT_RE = /^\/subjects\/([^/]+)(?:\/([^/]+))?\/?$/;

/**
 * Fullscreen overlay for Walkthrough and Quiz. Mounted at the layout
 * level so it can sit above the entire three-column shell without
 * disturbing column geometry. URL state is driven by `?v=quiz` or
 * `?v=walkthrough`; everything else is read-only.
 */
export function NotebookOverlay() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const match = pathname.match(SUBJECT_RE);
  const slug = match?.[1];
  const subject = slug ? SUBJECTS.find((s) => s.slug === slug) : undefined;
  const rawY = searchParams.get("y");
  const notebook = subject
    ? getNotebookForYear(subject.slug, rawY ? Number(rawY) : undefined)
    : undefined;

  const view = searchParams.get("v");
  const isOpen = view === "quiz" || view === "walkthrough";

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOverlayInUrl(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  if (!isOpen || !notebook) return null;

  const lessonIndex = clampedIndex(
    parseInt(searchParams.get("l") ?? "1") - 1,
    notebook.lessons.length,
  );
  const lesson = notebook.lessons[lessonIndex];
  if (!lesson) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex flex-col bg-background",
        "animate-in fade-in duration-150",
      )}
      role="dialog"
      aria-modal="true"
    >
      <div className="flex shrink-0 items-center justify-between gap-3 border-b border-border/60 bg-background/95 px-4 py-3 sm:px-6">
        <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
          {view === "quiz" ? "Quiz" : "Walkthrough"}
        </span>
        <button
          type="button"
          onClick={() => setOverlayInUrl(null)}
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          aria-label="Schließen"
        >
          <span>Schließen</span>
          <span aria-hidden>✕</span>
        </button>
      </div>
      <div className="min-h-0 flex-1">
        {view === "quiz" ? (
          <QuizPanel quizBankId={lesson.lecture.quizBankId} />
        ) : (
          <WalkthroughPanel walkthroughId={lesson.lecture.walkthroughId} />
        )}
      </div>
    </div>
  );
}

function QuizPanel({ quizBankId }: { quizBankId: string | undefined }) {
  if (!quizBankId) return <EmptyPanel hint="Für dieses Kapitel gibt es noch kein Quiz." />;
  const set = getQuizSet(quizBankId);
  if (!set) return <EmptyPanel hint={`Kein Quiz mit der ID „${quizBankId}".`} />;
  return <QuizPlayer key={quizBankId} quizSet={set} />;
}

function WalkthroughPanel({ walkthroughId }: { walkthroughId: string | undefined }) {
  if (!walkthroughId)
    return <EmptyPanel hint="Für dieses Kapitel gibt es noch keinen Walkthrough." />;
  const expl = getExplanation(walkthroughId);
  if (!expl) return <EmptyPanel hint={`Kein Walkthrough mit der ID „${walkthroughId}".`} />;
  return <ExplanationView explanation={expl} eyebrow="Walkthrough" />;
}

function EmptyPanel({ hint }: { hint: string }) {
  return (
    <div className="flex h-full items-center justify-center px-6 py-10 text-center">
      <p className="max-w-md text-sm leading-relaxed text-muted-foreground">{hint}</p>
    </div>
  );
}
