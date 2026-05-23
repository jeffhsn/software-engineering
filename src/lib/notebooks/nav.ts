"use client";

/**
 * URL-state helpers shared by the SiteHeader (lesson chevrons) and the
 * NotebookView (chip pickers). State lives in search params:
 *   ?l=<lesson-number>&rv=<read-variant>&pv=<practice-variant>
 *
 * We use `history.replaceState` instead of router.replace so server
 * components don't re-render, but still dispatch popstate so Next.js's
 * `useSearchParams` hook re-reads the new value.
 */
export function setLessonInUrl(lessonNumber: number) {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  params.set("l", String(lessonNumber));
  // Reset variant pickers when switching lessons — a different lesson likely
  // has different resources, and lingering indices would point at the wrong
  // ones (or out of range).
  params.delete("rv");
  params.delete("pv");
  syncSearchParams(params);
}

export function setVariantInUrl(side: "rv" | "pv", oneBasedIndex: number) {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  params.set(side, String(oneBasedIndex));
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
