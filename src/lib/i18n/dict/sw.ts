import type { Dict } from "../types";

export const sw: Dict = {
  brand: "Software Engineering BSc",
  nav: { allSubjects: "Masomo yote", language: "Lugha" },
  home: {
    pill: "Madaftari",
    title: "Chagua daftari.",
    subtitle:
      "Kila somo lina daftari lake — mihadhara, mazoezi, mitihani, muhtasari.",
  },
  subject: {
    notebook: "Daftari",
    areasCount: (n) => `${n} sehemu`,
    read: "Soma",
    practice: "Mazoezi",
    lecture: "Mhadhara",
    previous: "Iliyotangulia",
    next: "Inayofuata",
  },
  section: {
    emptyTitle: "Bado hakuna maudhui",
    emptyBody: "Pakia vifaa na tutajenga eneo la mazoezi pamoja.",
  },
  sections: {
    lectures: "Mihadhara",
    exercises: "Mazoezi",
    exams: "Mitihani",
    summaries: "Muhtasari",
    flashcards: "Kadi",
    cheatsheets: "Karatasi za muhtasari",
    code: "Msimbo",
  },
};
