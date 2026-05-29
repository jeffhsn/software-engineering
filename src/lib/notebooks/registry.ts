import type { Notebook } from "./types";
import { cybersicherheit2025 } from "./data/cybersicherheit-2025";
import { cybersicherheit2026 } from "./data/cybersicherheit-2026";

/**
 * A subject can have multiple iterations (different years/terms). For now we
 * keep just one per subject; later we can add a year picker per subject if
 * the user uploads more than one iteration.
 */
const NOTEBOOKS: Notebook[] = [cybersicherheit2026, cybersicherheit2025];

export function getNotebook(subjectSlug: string): Notebook | undefined {
  return NOTEBOOKS.find((n) => n.subject === subjectSlug);
}

/**
 * Pick a specific iteration of a subject by year. Falls back to the newest
 * iteration when no year is given or the requested year doesn't exist. This is
 * what the year picker and the subject page use to switch between, e.g., the
 * 2025 and 2026 notebooks.
 */
export function getNotebookForYear(
  subjectSlug: string,
  year?: number,
): Notebook | undefined {
  const all = getNotebooksForSubject(subjectSlug); // newest year first
  if (year != null) {
    const match = all.find((n) => n.year === year);
    if (match) return match;
  }
  return all[0];
}

/**
 * All available iterations of a subject, newest year first. Used by the
 * year picker in the header.
 */
export function getNotebooksForSubject(subjectSlug: string): Notebook[] {
  return NOTEBOOKS.filter((n) => n.subject === subjectSlug).sort(
    (a, b) => b.year - a.year,
  );
}

/** Every registered notebook. Used by cross-notebook search on the root home. */
export function getAllNotebooks(): Notebook[] {
  return NOTEBOOKS;
}
