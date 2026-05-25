import type { LocalizedText } from "@/lib/i18n/types";

export type QuestionDifficulty = "easy" | "medium" | "hard";

export type Question = MultipleChoiceQuestion | TrueFalseQuestion;

export interface MultipleChoiceQuestion {
  id: string;
  type: "mcq";
  difficulty: QuestionDifficulty;
  question: LocalizedText;
  options: LocalizedText[];
  /** Zero-based index into `options`. */
  correct: number;
  explanation?: LocalizedText;
}

export interface TrueFalseQuestion {
  id: string;
  type: "tf";
  difficulty: QuestionDifficulty;
  statement: LocalizedText;
  correct: boolean;
  explanation?: LocalizedText;
}

export interface Quiz {
  /** Stable id, used to persist attempts across sessions. */
  id: string;
  /** Quiz display title — themed within a lesson (e.g. "Basics", "CIA deep-dive"). */
  title: LocalizedText;
  /** One-line summary shown in the quiz picker. */
  description?: LocalizedText;
  /** Lesson number this quiz belongs to. */
  lesson: number;
  /** Optional theme tag for grouping in UI (e.g. "basics", "exam-style"). */
  theme?: string;
  questions: Question[];
}

/** All quizzes that belong to a single lesson, grouped under one menu. */
export interface QuizSet {
  /** Stable id used by Lesson.practice[].src — typically `<subject>-<year>-l<N>`. */
  id: string;
  lesson: number;
  /** Display title shown above the picker (usually the lecture title). */
  title: LocalizedText;
  quizzes: Quiz[];
}
