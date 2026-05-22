import type { Dict } from "../types";

export const hu: Dict = {
  brand: "Software Engineering BSc",
  nav: { allSubjects: "Összes tárgy", language: "Nyelv" },
  home: {
    pill: "Füzetek",
    title: "Válassz egy füzetet.",
    subtitle:
      "Minden tantárgynak van saját füzete — előadások, gyakorlatok, vizsgák, összefoglalók.",
  },
  subject: { notebook: "Füzet", areasCount: (n) => `${n} szekció` },
  section: {
    emptyTitle: "Még nincs tartalom",
    emptyBody: "Tölts fel anyagokat és felépítjük a gyakorló területet.",
  },
  sections: {
    lectures: "Előadások",
    exercises: "Gyakorlatok",
    exams: "Vizsgák",
    summaries: "Összefoglalók",
    flashcards: "Kártyák",
    cheatsheets: "Puska",
    code: "Kód",
  },
};
