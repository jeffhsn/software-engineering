import type { Dict } from "../types";

export const it: Dict = {
  brand: "Software Engineering BSc",
  nav: {
    allSubjects: "Tutte le materie",
    language: "Lingua",
  },
  home: {
    pill: "Quaderni",
    title: "Scegli un quaderno.",
    subtitle:
      "Ogni materia ha il suo quaderno — lezioni, esercizi, esami, riassunti.",
  },
  subject: {
    notebook: "Quaderno",
    areasCount: (n) => `${n} sezioni`,
    read: "Leggi",
    practice: "Esercitati",
    lecture: "Lezione",
    previous: "Indietro",
    next: "Avanti",
  },
  section: {
    emptyTitle: "Ancora nessun contenuto",
    emptyBody:
      "Carica i materiali e costruiremo insieme l'area di esercitazione.",
  },
  sections: {
    lectures: "Lezioni",
    exercises: "Esercizi",
    exams: "Esami",
    summaries: "Riassunti",
    flashcards: "Flashcard",
    cheatsheets: "Schede riassunto",
    code: "Codice",
  },
};
