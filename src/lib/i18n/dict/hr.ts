import type { Dict } from "../types";

export const hr: Dict = {
  brand: "Software Engineering BSc",
  nav: { allSubjects: "Svi predmeti", language: "Jezik" },
  home: {
    pill: "Bilježnice",
    title: "Odaberi bilježnicu.",
    subtitle:
      "Svaki predmet ima svoju bilježnicu — predavanja, vježbe, ispiti, sažeci.",
  },
  subject: { notebook: "Bilježnica", areasCount: (n) => `${n} odjeljaka` },
  section: {
    emptyTitle: "Još nema sadržaja",
    emptyBody:
      "Učitaj materijale i izgradit ćemo područje za vježbu zajedno.",
  },
  sections: {
    lectures: "Predavanja",
    exercises: "Vježbe",
    exams: "Ispiti",
    summaries: "Sažeci",
    flashcards: "Kartice",
    cheatsheets: "Šalabahteri",
    code: "Kod",
  },
};
