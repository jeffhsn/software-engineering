import type { SectionKind, SectionMeta } from "./types";

export const SECTION_META: Record<SectionKind, SectionMeta> = {
  lectures: { kind: "lectures", label: "Lectures", blurb: "" },
  exercises: { kind: "exercises", label: "Übungen", blurb: "" },
  exams: { kind: "exams", label: "Klausuren", blurb: "" },
  summaries: { kind: "summaries", label: "Zusammenfassungen", blurb: "" },
  flashcards: { kind: "flashcards", label: "Karteikarten", blurb: "" },
  cheatsheets: { kind: "cheatsheets", label: "Cheatsheets", blurb: "" },
  code: { kind: "code", label: "Code", blurb: "" },
};
