import type { Dict } from "../types";

export const el: Dict = {
  brand: "Software Engineering BSc",
  nav: { allSubjects: "Όλα τα μαθήματα", language: "Γλώσσα" },
  home: {
    pill: "Τετράδια",
    title: "Διάλεξε ένα τετράδιο.",
    subtitle:
      "Κάθε μάθημα έχει το δικό του τετράδιο — διαλέξεις, ασκήσεις, εξετάσεις, περιλήψεις.",
  },
  subject: {
    notebook: "Τετράδιο",
    areasCount: (n) => `${n} ενότητες`,
    read: "Διαβάστε",
    practice: "Εξάσκηση",
  },
  section: {
    emptyTitle: "Δεν υπάρχει ακόμη περιεχόμενο",
    emptyBody:
      "Ανέβασε υλικό και θα χτίσουμε μαζί την περιοχή εξάσκησης.",
  },
  sections: {
    lectures: "Διαλέξεις",
    exercises: "Ασκήσεις",
    exams: "Εξετάσεις",
    summaries: "Περιλήψεις",
    flashcards: "Καρτέλες",
    cheatsheets: "Συνοπτικά",
    code: "Κώδικας",
  },
};
