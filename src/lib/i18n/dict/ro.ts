import type { Dict } from "../types";

export const ro: Dict = {
  brand: "Software Engineering BSc",
  nav: { allSubjects: "Toate materiile", language: "Limba" },
  home: {
    pill: "Caiete",
    title: "Alege un caiet.",
    subtitle:
      "Fiecare materie are propriul caiet — cursuri, exerciții, examene, rezumate.",
  },
  subject: {
    notebook: "Caiet",
    areasCount: (n) => `${n} secțiuni`,
    read: "Citește",
    practice: "Exersează",
  },
  section: {
    emptyTitle: "Încă nu există conținut",
    emptyBody: "Încarcă materiale și vom construi zona de exerciții.",
  },
  sections: {
    lectures: "Cursuri",
    exercises: "Exerciții",
    exams: "Examene",
    summaries: "Rezumate",
    flashcards: "Cartonașe",
    cheatsheets: "Fișe sintetice",
    code: "Cod",
  },
};
