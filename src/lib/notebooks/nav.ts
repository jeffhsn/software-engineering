"use client";

/**
 * URL-state helpers for the notebook view. State lives in search params:
 *   ?l=<lesson-number>        chapter selection
 *   ?v=quiz | walkthrough     fullscreen overlay (omitted = no overlay)
 *
 * We use `history.replaceState` so server components don't re-render, then
 * dispatch popstate so Next.js's `useSearchParams` hook re-reads the value.
 */
export function setLessonInUrl(lessonNumber: number) {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  params.set("l", String(lessonNumber));
  params.delete("v");
  syncSearchParams(params);
}

/**
 * Lower-impact variant used while the reader is scrolling continuously
 * through the notebook. Updates only `?l=` (no overlay reset, no
 * popstate broadcast) so the URL stays current as a deep-link target
 * without re-rendering subscribers on every chapter crossing.
 */
export function syncActiveLessonInUrl(lessonNumber: number) {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  if (params.get("l") === String(lessonNumber)) return;
  params.set("l", String(lessonNumber));
  const qs = params.toString();
  window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
}

export function setOverlayInUrl(view: "quiz" | "walkthrough" | null) {
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
