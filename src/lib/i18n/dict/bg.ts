import type { Dict } from "../types";

export const bg: Dict = {
  brand: "Software Engineering BSc",
  nav: { allSubjects: "Всички предмети", language: "Език" },
  home: {
    pill: "Тетрадки",
    title: "Избери тетрадка.",
    subtitle:
      "Всеки предмет има своя тетрадка — лекции, упражнения, изпити, резюмета.",
  },
  subject: {
    notebook: "Тетрадка",
    areasCount: (n) => `${n} раздела`,
    read: "Чети",
    practice: "Упражнявай",
    lecture: "Лекция",
    previous: "Назад",
    next: "Напред",
  },
  section: {
    emptyTitle: "Все още няма съдържание",
    emptyBody:
      "Качи материали и заедно ще изградим зоната за упражнения.",
  },
  sections: {
    lectures: "Лекции",
    exercises: "Упражнения",
    exams: "Изпити",
    summaries: "Резюмета",
    flashcards: "Карти",
    cheatsheets: "Помагала",
    code: "Код",
  },
};
