import type { Dict } from "../types";

export const fa: Dict = {
  brand: "Software Engineering BSc",
  nav: { allSubjects: "همه دروس", language: "زبان" },
  home: {
    pill: "دفترها",
    title: "یک دفتر انتخاب کن.",
    subtitle:
      "هر درس دفتر مخصوص خودش را دارد — کلاس‌ها، تمرین‌ها، امتحان‌ها، خلاصه‌ها.",
  },
  subject: {
    notebook: "دفتر",
    areasCount: (n) => `${n} بخش`,
    read: "خواندن",
    practice: "تمرین",
  },
  section: {
    emptyTitle: "هنوز محتوایی نیست",
    emptyBody: "مطالب را آپلود کن تا با هم بخش تمرین را بسازیم.",
  },
  sections: {
    lectures: "کلاس‌ها",
    exercises: "تمرین‌ها",
    exams: "امتحان‌ها",
    summaries: "خلاصه‌ها",
    flashcards: "فلش‌کارت",
    cheatsheets: "تقلب‌نامه",
    code: "کد",
  },
};
