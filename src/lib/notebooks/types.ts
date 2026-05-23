/**
 * A resource is one viewable item on a page of the notebook. Today these are
 * all PDFs, but the shape leaves room for videos or other media later.
 */
export interface LessonResource {
  label: string;
  kind: "pdf" | "video";
  /** Public path or external URL. */
  src: string;
}

/**
 * One lesson = one row in the notebook. The left (`read`) side is reference
 * material (lecture + variants). The right (`practice`) side is what the
 * student works on (Aufgaben, Lösung, extras).
 */
export interface Lesson {
  number: number;
  /** Lecture display title. */
  title: string;
  read: LessonResource[];
  practice: LessonResource[];
}

export interface Notebook {
  subject: string;
  /** Calendar year of the course iteration. */
  year: number;
  /** Display term label, e.g. "SoSe 2025". */
  term: string;
  lessons: Lesson[];
  /** Standalone files that don't belong to any single lesson. */
  extras?: { label: string; src: string }[];
}
