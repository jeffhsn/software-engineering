import type { Dict } from "../types";

export const pl: Dict = {
  brand: "Software Engineering BSc",
  nav: { allSubjects: "Wszystkie przedmioty", language: "Język" },
  home: {
    pill: "Notatniki",
    title: "Wybierz notatnik.",
    subtitle:
      "Każdy przedmiot ma swój notatnik — wykłady, ćwiczenia, egzaminy, podsumowania.",
  },
  subject: { notebook: "Notatnik", areasCount: (n) => `${n} sekcji` },
  section: {
    emptyTitle: "Brak treści",
    emptyBody: "Prześlij materiały, a zbudujemy obszar do ćwiczeń.",
  },
  sections: {
    lectures: "Wykłady",
    exercises: "Ćwiczenia",
    exams: "Egzaminy",
    summaries: "Podsumowania",
    flashcards: "Fiszki",
    cheatsheets: "Ściągi",
    code: "Kod",
  },
};
