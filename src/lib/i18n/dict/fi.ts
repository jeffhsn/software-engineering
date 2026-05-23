import type { Dict } from "../types";

export const fi: Dict = {
  brand: "Software Engineering BSc",
  nav: { allSubjects: "Kaikki aineet", language: "Kieli" },
  home: {
    pill: "Vihkot",
    title: "Valitse vihko.",
    subtitle:
      "Jokaisella aineella on oma vihkonsa — luennot, harjoitukset, tentit, tiivistelmät.",
  },
  subject: {
    notebook: "Vihko",
    areasCount: (n) => `${n} osiota`,
    read: "Lue",
    practice: "Harjoittele",
  },
  section: {
    emptyTitle: "Ei vielä sisältöä",
    emptyBody:
      "Lataa materiaalit ja rakennamme harjoitusalueen yhdessä.",
  },
  sections: {
    lectures: "Luennot",
    exercises: "Harjoitukset",
    exams: "Tentit",
    summaries: "Tiivistelmät",
    flashcards: "Muistikortit",
    cheatsheets: "Lunttilaput",
    code: "Koodi",
  },
};
