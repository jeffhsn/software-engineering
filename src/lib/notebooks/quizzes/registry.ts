import type { QuizSet } from "../quiz-types";
import { cybersicherheit2025QuizSets } from "./cybersicherheit-2025";

const ALL: QuizSet[] = [...cybersicherheit2025QuizSets];

export function getQuizSet(id: string): QuizSet | undefined {
  return ALL.find((q) => q.id === id);
}
