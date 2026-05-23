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
