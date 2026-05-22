import type { Dict } from "../types";

export const sr: Dict = {
  brand: "Software Engineering BSc",
  nav: { allSubjects: "Сви предмети", language: "Језик" },
  home: {
    pill: "Свеске",
    title: "Изабери свеску.",
    subtitle:
      "Сваки предмет има своју свеску — предавања, вежбе, испити, сажеци.",
  },
  subject: { notebook: "Свеска", areasCount: (n) => `${n} одељака` },
  section: {
    emptyTitle: "Још нема садржаја",
    emptyBody: "Отпреми материјале и направићемо област за вежбу.",
  },
  sections: {
    lectures: "Предавања",
    exercises: "Вежбе",
    exams: "Испити",
    summaries: "Сажеци",
    flashcards: "Картице",
    cheatsheets: "Подсетници",
    code: "Код",
  },
};
