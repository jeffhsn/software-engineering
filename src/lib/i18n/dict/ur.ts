import type { Dict } from "../types";

export const ur: Dict = {
  brand: "Software Engineering BSc",
  nav: { allSubjects: "تمام مضامین", language: "زبان" },
  home: {
    pill: "نوٹ بکس",
    title: "ایک نوٹ بک منتخب کریں۔",
    subtitle:
      "ہر مضمون کی اپنی نوٹ بک ہے — لیکچرز، مشقیں، امتحانات، خلاصے۔",
  },
  subject: {
    notebook: "نوٹ بک",
    areasCount: (n) => `${n} حصے`,
    read: "پڑھیں",
    practice: "مشق",
  },
  section: {
    emptyTitle: "ابھی کوئی مواد نہیں",
    emptyBody: "مواد اپ لوڈ کریں اور ہم مل کر مشق کا حصہ بنائیں گے۔",
  },
  sections: {
    lectures: "لیکچرز",
    exercises: "مشقیں",
    exams: "امتحانات",
    summaries: "خلاصے",
    flashcards: "فلیش کارڈز",
    cheatsheets: "چیٹ شیٹس",
    code: "کوڈ",
  },
};
