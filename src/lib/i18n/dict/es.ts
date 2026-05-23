import type { Dict } from "../types";

export const es: Dict = {
  brand: "Software Engineering BSc",
  nav: {
    allSubjects: "Todas las asignaturas",
    language: "Idioma",
  },
  home: {
    pill: "Cuadernos",
    title: "Elige un cuaderno.",
    subtitle:
      "Cada asignatura tiene su propio cuaderno — clases, ejercicios, exámenes, resúmenes.",
  },
  subject: {
    notebook: "Cuaderno",
    areasCount: (n) => `${n} secciones`,
    read: "Leer",
    practice: "Practicar",
    lecture: "Clase",
    previous: "Anterior",
    next: "Siguiente",
  },
  section: {
    emptyTitle: "Aún no hay contenido",
    emptyBody: "Sube material y construiremos el área de práctica.",
  },
  sections: {
    lectures: "Clases",
    exercises: "Ejercicios",
    exams: "Exámenes",
    summaries: "Resúmenes",
    flashcards: "Tarjetas",
    cheatsheets: "Hojas de referencia",
    code: "Código",
  },
};
