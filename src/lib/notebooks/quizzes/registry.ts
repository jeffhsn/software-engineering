import type { QuizSet } from "../quiz-types";
import { cybersicherheit2025QuizSets } from "./cybersicherheit-2025";
import { cybersicherheit2026QuizSets } from "./cybersicherheit-2026";

// Every notebook's quiz banks. Server-only (content-server.ts) for the same
// reason as ALL_EXPLANATIONS — client components receive the current
// notebook's sets via props + seedContentObjects.
export const ALL_QUIZ_SETS: QuizSet[] = [
  ...cybersicherheit2025QuizSets,
  ...cybersicherheit2026QuizSets,
];

export function getQuizSet(id: string): QuizSet | undefined {
  return ALL_QUIZ_SETS.find((q) => q.id === id);
}
