export type Locale =
  | "de"
  | "en"
  | "tr"
  | "ar"
  | "ru"
  | "it"
  | "es"
  | "fr"
  | "zh"
  | "pl"
  | "pt"
  | "uk"
  | "fa"
  | "ja"
  | "ko"
  | "vi"
  | "hi"
  | "ur"
  | "nl"
  | "el"
  | "cs"
  | "hu"
  | "ro"
  | "sq"
  | "sr"
  | "hr"
  | "bg"
  | "sv"
  | "fi"
  | "id"
  | "th"
  | "sw";

export interface LocaleMeta {
  code: Locale;
  label: string;
  nativeLabel: string;
  dir: "ltr" | "rtl";
  flag: string;
}

import type { SectionKind } from "@/lib/subjects/types";

export interface Dict {
  brand: string;
  nav: {
    allSubjects: string;
    language: string;
  };
  home: {
    pill: string;
    title: string;
    subtitle: string;
  };
  subject: {
    notebook: string;
    areasCount: (n: number) => string;
    read: string;
    practice: string;
    lecture: string;
    previous: string;
    next: string;
  };
  section: {
    emptyTitle: string;
    emptyBody: string;
  };
  sections: Record<SectionKind, string>;
}

export type LocalizedText = string | Partial<Record<Locale, string>>;
