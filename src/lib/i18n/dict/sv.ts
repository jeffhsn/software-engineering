import type { Dict } from "../types";

export const sv: Dict = {
  brand: "Software Engineering BSc",
  nav: { allSubjects: "Alla ämnen", language: "Språk" },
  home: {
    pill: "Anteckningsböcker",
    title: "Välj en anteckningsbok.",
    subtitle:
      "Varje ämne har sin egen anteckningsbok — föreläsningar, övningar, tentor, sammanfattningar.",
  },
  subject: {
    notebook: "Anteckningsbok",
    areasCount: (n) => `${n} sektioner`,
    read: "Läs",
    practice: "Öva",
    lecture: "Föreläsning",
    previous: "Föregående",
    next: "Nästa",
  },
  section: {
    emptyTitle: "Inget innehåll än",
    emptyBody: "Ladda upp material så bygger vi övningsområdet.",
  },
  sections: {
    lectures: "Föreläsningar",
    exercises: "Övningar",
    exams: "Tentor",
    summaries: "Sammanfattningar",
    flashcards: "Flashcards",
    cheatsheets: "Lathundar",
    code: "Kod",
  },
};
