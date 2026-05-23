import type { Dict } from "../types";

export const ru: Dict = {
  brand: "Software Engineering BSc",
  nav: {
    allSubjects: "Все предметы",
    language: "Язык",
  },
  home: {
    pill: "Тетради",
    title: "Выбери тетрадь.",
    subtitle:
      "У каждого предмета своя тетрадь — лекции, упражнения, экзамены, конспекты.",
  },
  subject: {
    notebook: "Тетрадь",
    areasCount: (n) => `${n} разделов`,
    read: "Чтение",
    practice: "Практика",
    lecture: "Лекция",
    previous: "Назад",
    next: "Далее",
  },
  section: {
    emptyTitle: "Пока нет материалов",
    emptyBody: "Загрузи материалы, и мы соберём раздел для практики.",
  },
  sections: {
    lectures: "Лекции",
    exercises: "Упражнения",
    exams: "Экзамены",
    summaries: "Конспекты",
    flashcards: "Карточки",
    cheatsheets: "Шпаргалки",
    code: "Код",
  },
};
