import type { Dict } from "../types";

export const sq: Dict = {
  brand: "Software Engineering BSc",
  nav: { allSubjects: "Të gjitha lëndët", language: "Gjuha" },
  home: {
    pill: "Fletoret",
    title: "Zgjidh një fletore.",
    subtitle:
      "Çdo lëndë ka fletoren e vet — leksione, ushtrime, provime, përmbledhje.",
  },
  subject: { notebook: "Fletore", areasCount: (n) => `${n} seksione` },
  section: {
    emptyTitle: "Ende pa përmbajtje",
    emptyBody:
      "Ngarko materiale dhe do ndërtojmë së bashku zonën e ushtrimeve.",
  },
  sections: {
    lectures: "Leksione",
    exercises: "Ushtrime",
    exams: "Provime",
    summaries: "Përmbledhje",
    flashcards: "Karta",
    cheatsheets: "Përmbledhje të shpejta",
    code: "Kod",
  },
};
