import type { Dict } from "../types";

export const de: Dict = {
  brand: "Software Engineering BSc",
  nav: {
    allSubjects: "Alle Fächer",
    language: "Sprache",
  },
  home: {
    pill: "Notizbücher",
    title: "Such dir ein Notizbuch.",
    subtitle:
      "Jedes Fach hat sein eigenes Notizbuch — Lectures, Übungen, Klausuren, Zusammenfassungen.",
  },
  subject: {
    notebook: "Notizbuch",
    areasCount: (n) => `${n} Bereiche`,
    read: "Lesen",
    practice: "Üben",
  },
  section: {
    emptyTitle: "Noch keine Inhalte",
    emptyBody:
      "Lade Materialien hoch und wir bauen den Übungsbereich aus.",
  },
  sections: {
    lectures: "Lectures",
    exercises: "Übungen",
    exams: "Klausuren",
    summaries: "Zusammenfassungen",
    flashcards: "Karteikarten",
    cheatsheets: "Cheatsheets",
    code: "Code",
  },
};
