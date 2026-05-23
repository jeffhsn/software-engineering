import type { Dict } from "../types";

export const ar: Dict = {
  brand: "Software Engineering BSc",
  nav: {
    allSubjects: "جميع المواد",
    language: "اللغة",
  },
  home: {
    pill: "الدفاتر",
    title: "اختر دفتراً.",
    subtitle: "كل مادة لها دفترها الخاص — محاضرات، تمارين، امتحانات، ملخصات.",
  },
  subject: {
    notebook: "الدفتر",
    areasCount: (n) => `${n} أقسام`,
    read: "قراءة",
    practice: "تدريب",
    lecture: "محاضرة",
    previous: "السابق",
    next: "التالي",
  },
  section: {
    emptyTitle: "لا يوجد محتوى بعد",
    emptyBody: "ارفع المواد وسنبني منطقة التدريب معاً.",
  },
  sections: {
    lectures: "محاضرات",
    exercises: "تمارين",
    exams: "امتحانات",
    summaries: "ملخصات",
    flashcards: "بطاقات",
    cheatsheets: "ملخصات سريعة",
    code: "كود",
  },
};
