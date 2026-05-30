"use client";

import type { Explanation } from "./explanation-types";
import type { QuizSet } from "./quiz-types";

/**
 * Client-side cache of the heavy content OBJECTS (explanation prose + quiz
 * banks) for the notebook currently on screen. The server resolves the current
 * notebook's objects (content-server.ts) and hands them to NotebookView, which
 * seeds them here synchronously during render; the panels + the overlay then
 * look them up by id exactly as before.
 *
 * The point: client components import THIS module, never the all-notebooks
 * registries. So the JS bundle no longer carries every notebook's German
 * prose — adding notebooks adds server-resolved payload for the page you're on,
 * not bundle weight. German text travels in the current page's RSC payload;
 * other languages travel via the per-locale store (content-client).
 */

const explMap = new Map<string, Explanation>();
const quizMap = new Map<string, QuizSet>();

/** Idempotent: register the current notebook's objects (safe to call in render). */
export function seedContentObjects(
  explanations: Explanation[] = [],
  quizSets: QuizSet[] = [],
): void {
  for (const e of explanations) explMap.set(e.id, e);
  for (const q of quizSets) quizMap.set(q.id, q);
}

export function getExplanation(id: string): Explanation | undefined {
  return explMap.get(id);
}

export function getQuizSet(id: string): QuizSet | undefined {
  return quizMap.get(id);
}
