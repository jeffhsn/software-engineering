import type { Dict } from "../types";

export const tr: Dict = {
  brand: "Software Engineering BSc",
  nav: {
    allSubjects: "Tüm dersler",
    language: "Dil",
  },
  home: {
    pill: "Defterler",
    title: "Bir defter seç.",
    subtitle:
      "Her dersin kendi defteri var — dersler, alıştırmalar, sınavlar, özetler.",
  },
  subject: {
    notebook: "Defter",
    areasCount: (n) => `${n} bölüm`,
  },
  section: {
    emptyTitle: "Henüz içerik yok",
    emptyBody: "Materyal yükle, alıştırma alanını birlikte oluşturalım.",
  },
  sections: {
    lectures: "Dersler",
    exercises: "Alıştırmalar",
    exams: "Sınavlar",
    summaries: "Özetler",
    flashcards: "Kartlar",
    cheatsheets: "Özet sayfaları",
    code: "Kod",
  },
};
