import type { Dict } from "../types";

export const id: Dict = {
  brand: "Software Engineering BSc",
  nav: { allSubjects: "Semua mata kuliah", language: "Bahasa" },
  home: {
    pill: "Buku catatan",
    title: "Pilih buku catatan.",
    subtitle:
      "Setiap mata kuliah punya buku catatannya sendiri — perkuliahan, latihan, ujian, ringkasan.",
  },
  subject: {
    notebook: "Buku catatan",
    areasCount: (n) => `${n} bagian`,
    read: "Baca",
    practice: "Latihan",
  },
  section: {
    emptyTitle: "Belum ada konten",
    emptyBody: "Unggah materi dan kita akan membangun area latihan.",
  },
  sections: {
    lectures: "Perkuliahan",
    exercises: "Latihan",
    exams: "Ujian",
    summaries: "Ringkasan",
    flashcards: "Kartu",
    cheatsheets: "Lembar contekan",
    code: "Kode",
  },
};
