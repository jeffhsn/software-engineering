import type { Dict } from "../types";

export const nl: Dict = {
  brand: "Software Engineering BSc",
  nav: { allSubjects: "Alle vakken", language: "Taal" },
  home: {
    pill: "Schriften",
    title: "Kies een schrift.",
    subtitle:
      "Elk vak heeft zijn eigen schrift — colleges, oefeningen, tentamens, samenvattingen.",
  },
  subject: {
    notebook: "Schrift",
    areasCount: (n) => `${n} secties`,
    read: "Lezen",
    practice: "Oefenen",
    lecture: "College",
    previous: "Vorige",
    next: "Volgende",
  },
  section: {
    emptyTitle: "Nog geen inhoud",
    emptyBody: "Upload materiaal en we bouwen de oefenruimte uit.",
  },
  sections: {
    lectures: "Colleges",
    exercises: "Oefeningen",
    exams: "Tentamens",
    summaries: "Samenvattingen",
    flashcards: "Flashcards",
    cheatsheets: "Spiekbriefjes",
    code: "Code",
  },
};
