import type { Dict } from "../types";

export const uk: Dict = {
  brand: "Software Engineering BSc",
  nav: { allSubjects: "Усі предмети", language: "Мова" },
  home: {
    pill: "Зошити",
    title: "Обери зошит.",
    subtitle:
      "Кожен предмет має свій зошит — лекції, вправи, іспити, конспекти.",
  },
  subject: {
    notebook: "Зошит",
    areasCount: (n) => `${n} розділів`,
    read: "Читання",
    practice: "Практика",
  },
  section: {
    emptyTitle: "Поки немає матеріалів",
    emptyBody: "Завантаж матеріали — і ми зберемо розділ для практики.",
  },
  sections: {
    lectures: "Лекції",
    exercises: "Вправи",
    exams: "Іспити",
    summaries: "Конспекти",
    flashcards: "Картки",
    cheatsheets: "Шпаргалки",
    code: "Код",
  },
};
