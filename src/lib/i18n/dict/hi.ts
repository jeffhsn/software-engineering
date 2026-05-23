import type { Dict } from "../types";

export const hi: Dict = {
  brand: "Software Engineering BSc",
  nav: { allSubjects: "सभी विषय", language: "भाषा" },
  home: {
    pill: "नोटबुक",
    title: "एक नोटबुक चुनें।",
    subtitle:
      "हर विषय की अपनी नोटबुक है — व्याख्यान, अभ्यास, परीक्षाएँ, सारांश।",
  },
  subject: {
    notebook: "नोटबुक",
    areasCount: (n) => `${n} खंड`,
    read: "पढ़ें",
    practice: "अभ्यास",
  },
  section: {
    emptyTitle: "अभी कोई सामग्री नहीं",
    emptyBody: "सामग्री अपलोड करें और हम अभ्यास क्षेत्र बनाएँगे।",
  },
  sections: {
    lectures: "व्याख्यान",
    exercises: "अभ्यास",
    exams: "परीक्षाएँ",
    summaries: "सारांश",
    flashcards: "फ्लैशकार्ड",
    cheatsheets: "चीटशीट",
    code: "कोड",
  },
};
