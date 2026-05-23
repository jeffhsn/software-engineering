import type { Dict } from "../types";

export const pt: Dict = {
  brand: "Software Engineering BSc",
  nav: { allSubjects: "Todas as disciplinas", language: "Idioma" },
  home: {
    pill: "Cadernos",
    title: "Escolhe um caderno.",
    subtitle:
      "Cada disciplina tem o seu próprio caderno — aulas, exercícios, exames, resumos.",
  },
  subject: {
    notebook: "Caderno",
    areasCount: (n) => `${n} secções`,
    read: "Ler",
    practice: "Praticar",
  },
  section: {
    emptyTitle: "Ainda sem conteúdo",
    emptyBody: "Carrega materiais e iremos construir a área de prática.",
  },
  sections: {
    lectures: "Aulas",
    exercises: "Exercícios",
    exams: "Exames",
    summaries: "Resumos",
    flashcards: "Cartões",
    cheatsheets: "Folhas de revisão",
    code: "Código",
  },
};
