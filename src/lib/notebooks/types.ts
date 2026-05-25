import type { LocalizedText } from "@/lib/i18n/types";

/** A single labelled PDF (lecture, exercise sheet, solution variant, etc.). */
export interface PdfRef {
  label: LocalizedText;
  src: string;
}

/**
 * Everything that belongs to the Vorlesung side of a lesson. The right pane
 * defaults to the Erklärung (if any) and exposes a Quiz takeover button.
 */
export interface Lecture {
  /** The lecture PDF. Practically always present. */
  pdf?: PdfRef;
  /** Long-form lecture deep-dive — `id` from the explanations registry. */
  walkthroughId?: string;
  /** Quiz set id (from the quiz registry). */
  quizSetId?: string;
}

/**
 * One exercise sheet. A lesson always renders at least one Übung chip on
 * the left, even if every field here is empty — because sometimes a Lösung
 * exists without an Aufgaben, and the master/detail logic shouldn't collapse
 * in that case.
 */
export interface Exercise {
  /** Chip label on the left pane (e.g. "Übung", "Übung (Exploits)"). */
  label: LocalizedText;
  /** The Aufgaben PDF. Optional. */
  aufgaben?: PdfRef;
  /**
   * Solution PDFs. The first entry is the primary "Lösung"; further entries
   * are variants like Mitschrift, Multics-version, Zusatzhilfe.
   */
  solutions: PdfRef[];
  /** Step-by-step solution walkthrough — `id` from the explanations registry. */
  walkthroughId?: string;
}

/**
 * One lesson = one row in the notebook. Master/detail: clicking a chip on
 * the left changes both what's shown on the left (its PDF) and the context
 * on the right (Erklärung vs. Lösung).
 */
export interface Lesson {
  number: number;
  title: LocalizedText;
  lecture: Lecture;
  /** Always render at least one entry — empty is fine, it just shows placeholders. */
  exercises: Exercise[];
}

export interface Notebook {
  subject: string;
  year: number;
  term: string;
  lessons: Lesson[];
  extras?: { label: string; src: string }[];
}
