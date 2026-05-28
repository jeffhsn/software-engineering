import type { LocalizedText } from "@/lib/i18n/types";

/** A single labelled PDF (lecture slides, exercise sheet, solution variant, …). */
export interface PdfRef {
  label: LocalizedText;
  src: string;
}

/**
 * A notebook-level resource the user might or might not have given us. If
 * `source: 'user'` the PDF is the source of truth; if `source: 'ai'` there
 * is no PDF — the resource is authored from the lecture MDs. Either way,
 * `mdSrc` is the markdown the UI shows in the reading view.
 */
export interface ResourceRef {
  source: "user" | "ai";
  /** Set when the user actually handed us a PDF. */
  pdf?: PdfRef;
  /** Path to the markdown that backs this resource (always present). */
  mdSrc: string;
}

/**
 * Everything that belongs to the Vorlesung side of a lesson. The PDF is
 * the foundation — it's the only required material — and everything else
 * (deep + simple explanation, quiz bank, optional YouTube fallback) is
 * grounded in it.
 */
export interface Lecture {
  /** REQUIRED — the slides we ground all AI artefacts in. */
  pdf: PdfRef;
  /** Optional YouTube (or other) link when the user found a better one. */
  videoUrl?: string;
  /** Long-form deep + simple explanation — `id` from the explanations registry. */
  walkthroughId?: string;
  /** Quiz bank id (many sets, not one) from the quiz registry. */
  quizBankId?: string;
}

/**
 * One exercise sheet. In the reading column, each Übung is followed
 * inline by its Lösung PDFs (if any). The left nav tree expands the
 * active chapter to list Vorlesung, Übung, and Lösung as jump targets.
 */
export interface Exercise {
  /** Label in the nav tree and section header (e.g. "Übung", "Übung (Exploits)"). */
  label: LocalizedText;
  /** The Aufgaben PDF. Optional. */
  aufgaben?: PdfRef;
  /**
   * Solution PDFs. The first entry is the primary "Lösung"; further entries
   * are variants like Mitschrift, Multics-version, Zusatzhilfe.
   */
  solutions: PdfRef[];
  /** Step-by-step AI walkthrough in the professor's method. */
  walkthroughId?: string;
}

/**
 * One lesson = one chapter in the notebook. Lessons own everything that
 * is *per-chapter*: a required lecture and zero-or-more exercises.
 * Zusammenfassung, cheatsheet and exams live on the Notebook, not here.
 */
export interface Lesson {
  number: number;
  title: LocalizedText;
  lecture: Lecture;
  /** Always render at least one entry — empty is fine, it just shows placeholders. */
  exercises: Exercise[];
}

/**
 * A past or AI-generated practice exam. Exams are notebook-level — they
 * don't belong to any one chapter.
 */
export interface Exam {
  /** e.g. "Hauptklausur 2024" or "Praxis-Klausur 1 (Stil 2024)". */
  label: LocalizedText;
  kind: "real" | "practice";
  /** The exam itself. */
  pdf: PdfRef;
  /** Official solution, when one exists. */
  solution?: PdfRef;
  /** AI step-by-step walkthrough (grounded in lectures + Übungen + official solution if any). */
  walkthroughId?: string;
  /** For `kind: 'practice'`, the id of the real exam whose style it mirrors. */
  basedOn?: string;
}

export interface Notebook {
  subject: string;
  year: number;
  term: string;
  lessons: Lesson[];
  /** Notebook-wide summary. User-supplied or AI-generated from all lecture MDs. */
  zusammenfassung?: ResourceRef;
  /** Notebook-wide cheatsheet. User-supplied or AI-generated. */
  cheatsheet?: ResourceRef;
  /** Real past exams + AI-generated practice exams. */
  exams: Exam[];
}
