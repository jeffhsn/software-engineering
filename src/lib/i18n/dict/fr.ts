import type { Dict } from "../types";

export const fr: Dict = {
  brand: "Software Engineering BSc",
  nav: {
    allSubjects: "Toutes les matières",
    language: "Langue",
  },
  home: {
    pill: "Cahiers",
    title: "Choisis un cahier.",
    subtitle:
      "Chaque matière a son cahier — cours, exercices, examens, résumés.",
  },
  subject: {
    notebook: "Cahier",
    areasCount: (n) => `${n} sections`,
    read: "Lire",
    practice: "Pratiquer",
    lecture: "Cours",
    previous: "Précédent",
    next: "Suivant",
  },
  section: {
    emptyTitle: "Aucun contenu pour l'instant",
    emptyBody:
      "Téléverse des supports et nous construirons l'espace d'entraînement.",
  },
  sections: {
    lectures: "Cours",
    exercises: "Exercices",
    exams: "Examens",
    summaries: "Résumés",
    flashcards: "Cartes",
    cheatsheets: "Mémentos",
    code: "Code",
  },
};
