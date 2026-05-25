import type { Notebook } from "./types";
import { cybersicherheit2025 } from "./data/cybersicherheit-2025";

/**
 * A subject can have multiple iterations (different years/terms). For now we
 * keep just one per subject; later we can add a year picker per subject if
 * the user uploads more than one iteration.
 */
const NOTEBOOKS: Notebook[] = [cybersicherheit2025];

export function getNotebook(subjectSlug: string): Notebook | undefined {
  return NOTEBOOKS.find((n) => n.subject === subjectSlug);
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
