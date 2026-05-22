import type { Dict } from "../types";

export const he: Dict = {
  brand: "Software Engineering BSc",
  nav: { allSubjects: "כל המקצועות", language: "שפה" },
  home: {
    pill: "מחברות",
    title: "בחר מחברת.",
    subtitle:
      "לכל מקצוע יש מחברת משלו — הרצאות, תרגילים, מבחנים, סיכומים.",
  },
  subject: { notebook: "מחברת", areasCount: (n) => `${n} מקטעים` },
  section: {
    emptyTitle: "אין עדיין תוכן",
    emptyBody: "העלה חומרים ונבנה יחד את אזור התרגול.",
  },
  sections: {
    lectures: "הרצאות",
    exercises: "תרגילים",
    exams: "מבחנים",
    summaries: "סיכומים",
    flashcards: "כרטיסיות",
    cheatsheets: "דפי עזר",
    code: "קוד",
  },
};
