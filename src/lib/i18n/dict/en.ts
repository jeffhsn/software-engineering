import type { Dict } from "../types";

export const en: Dict = {
  brand: "Software Engineering BSc",
  nav: {
    allSubjects: "All subjects",
    language: "Language",
  },
  home: {
    pill: "Notebooks",
    title: "Pick a notebook.",
    subtitle:
      "Each subject has its own notebook — lectures, exercises, exams, summaries.",
  },
  subject: {
    notebook: "Notebook",
    areasCount: (n) => `${n} sections`,
  },
  section: {
    emptyTitle: "No content yet",
    emptyBody: "Upload material and we'll build out the practice area.",
  },
  sections: {
    lectures: "Lectures",
    exercises: "Exercises",
    exams: "Exams",
    summaries: "Summaries",
    flashcards: "Flashcards",
    cheatsheets: "Cheatsheets",
    code: "Code",
  },
};
