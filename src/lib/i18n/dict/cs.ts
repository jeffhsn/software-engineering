import type { Dict } from "../types";

export const cs: Dict = {
  brand: "Software Engineering BSc",
  nav: { allSubjects: "Všechny předměty", language: "Jazyk" },
  home: {
    pill: "Sešity",
    title: "Vyber si sešit.",
    subtitle:
      "Každý předmět má svůj sešit — přednášky, cvičení, zkoušky, shrnutí.",
  },
  subject: { notebook: "Sešit", areasCount: (n) => `${n} sekcí` },
  section: {
    emptyTitle: "Zatím žádný obsah",
    emptyBody: "Nahraj materiály a společně postavíme cvičnou oblast.",
  },
  sections: {
    lectures: "Přednášky",
    exercises: "Cvičení",
    exams: "Zkoušky",
    summaries: "Shrnutí",
    flashcards: "Kartičky",
    cheatsheets: "Taháky",
    code: "Kód",
  },
};
