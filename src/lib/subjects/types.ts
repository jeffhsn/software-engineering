export type SectionKind =
  | "lectures"
  | "exercises"
  | "exams"
  | "summaries"
  | "flashcards"
  | "cheatsheets"
  | "code";

export type AccentColor =
  | "red"
  | "indigo"
  | "emerald"
  | "amber"
  | "fuchsia"
  | "sky"
  | "teal";

export interface Subject {
  slug: string;
  title: string;
  shortTitle: string;
  emoji: string;
  accent: AccentColor;
  sections: SectionKind[];
}

export interface SectionMeta {
  kind: SectionKind;
  label: string;
  blurb: string;
}
