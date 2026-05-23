import type { SectionKind } from "./types";

/**
 * The notebook is laid out like an open book: the "read" side holds the
 * theory/reference material; the "practice" side holds active practice.
 *
 * Adding a new SectionKind? Place it on the side that matches how a student
 * would use it during study — passively reading vs. actively solving.
 */
export const READ_SIDE: readonly SectionKind[] = [
  "lectures",
  "summaries",
  "cheatsheets",
  "flashcards",
];

export const PRACTICE_SIDE: readonly SectionKind[] = [
  "exercises",
  "exams",
  "code",
];

export function splitSections(sections: SectionKind[]) {
  return {
    read: sections.filter((s) => READ_SIDE.includes(s)),
    practice: sections.filter((s) => PRACTICE_SIDE.includes(s)),
  };
}
