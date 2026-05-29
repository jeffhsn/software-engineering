import type { QuizSet } from "../quiz-types";
import { cybersicherheit2025QuizSets } from "./cybersicherheit-2025";
import { cybersicherheit2026QuizSets } from "./cybersicherheit-2026";

const ALL: QuizSet[] = [
  ...cybersicherheit2025QuizSets,
  ...cybersicherheit2026QuizSets,
];

export function getQuizSet(id: string): QuizSet | undefined {
  return ALL.find((q) => q.id === id);
}
