"use client";

/**
 * URL-state helpers for the notebook view. State lives in search params:
 *   ?l=<lesson-number>          lesson selection
 *   ?s=lecture | ex<i>          left-pane chip (default: lecture)
 *   ?sv=<one-based-index>       sub-variant in the right pane (e.g. solution
 *                               #2 when multiple Lösungen exist)
 *   ?v=quiz | walkthrough       right-pane takeover (omitted = default view)
 *
 * We use `history.replaceState` so server components don't re-render, then
 * dispatch popstate so Next.js's `useSearchParams` hook re-reads the value.
 */
export function setLessonInUrl(lessonNumber: number) {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  params.set("l", String(lessonNumber));
  // Reset left-pane / right-pane state when switching lessons — indices
  // and takeover targets are lesson-scoped and don't carry over.
  params.delete("s");
  params.delete("sv");
  params.delete("v");
  syncSearchParams(params);
}

export function setLeftSelectionInUrl(selection: "lecture" | `ex${number}`) {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  params.set("s", selection);
  // Switching the left chip clears any sub-variant and right-pane takeover —
  // a different exercise has its own solutions list and walkthrough.
  params.delete("sv");
  params.delete("v");
  syncSearchParams(params);
}

export function setSolutionVariantInUrl(oneBasedIndex: number) {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  params.set("sv", String(oneBasedIndex));
  syncSearchParams(params);
}

export function setRightViewInUrl(view: "quiz" | "walkthrough" | null) {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  if (view === null) params.delete("v");
  else params.set("v", view);
  syncSearchParams(params);
}

function syncSearchParams(params: URLSearchParams) {
  const qs = params.toString();
  window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

export function clampedIndex(value: number, length: number): number {
  if (length <= 0) return 0;
  if (Number.isNaN(value) || value < 0) return 0;
  if (value >= length) return length - 1;
  return value;
}
