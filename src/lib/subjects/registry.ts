import type { Subject } from "./types";

export const SUBJECTS: Subject[] = [
  {
    slug: "cybersicherheit",
    title: "Cybersicherheit",
    shortTitle: "Cybersec",
    emoji: "📕",
    accent: "red",
    sections: ["lectures", "summaries", "exercises", "exams", "cheatsheets"],
  },
  {
    slug: "datenstrukturen-und-algorithmen",
    title: "Datenstrukturen & Algorithmen",
    shortTitle: "DSA",
    emoji: "📘",
    accent: "indigo",
    sections: ["lectures", "summaries", "exercises", "exams", "code"],
  },
  {
    slug: "datenbankmanagementsysteme",
    title: "Datenbankmanagementsysteme",
    shortTitle: "DBMS",
    emoji: "📗",
    accent: "emerald",
    sections: ["lectures", "summaries", "exercises", "exams", "code"],
  },
  {
    slug: "software-architekturen",
    title: "Software-Architekturen",
    shortTitle: "Arch",
    emoji: "📙",
    accent: "amber",
    sections: ["lectures", "summaries", "exercises", "exams"],
  },
  {
    slug: "mensch-computer-interaktion",
    title: "Mensch-Computer-Interaktion",
    shortTitle: "HCI",
    emoji: "📔",
    accent: "fuchsia",
    sections: ["lectures", "summaries", "exercises", "exams"],
  },
  {
    slug: "web-engineering",
    title: "Web Engineering",
    shortTitle: "Web Eng",
    emoji: "📓",
    accent: "sky",
    sections: ["lectures", "summaries", "exercises", "exams", "code"],
  },
  {
    slug: "qualitaetssicherung-und-qualitaetsmanagement",
    title: "Qualitätssicherung & Management",
    shortTitle: "QS/QM",
    emoji: "📒",
    accent: "teal",
    sections: ["lectures", "summaries", "exercises", "exams", "cheatsheets"],
  },
];

export function getSubject(slug: string): Subject | undefined {
  return SUBJECTS.find((s) => s.slug === slug);
}

export function getAllSubjectSlugs(): string[] {
  return SUBJECTS.map((s) => s.slug);
}
