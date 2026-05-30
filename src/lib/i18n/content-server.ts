import "server-only";
import { promises as fs } from "fs";
import path from "path";
import type { Notebook } from "@/lib/notebooks/types";
import type { Explanation } from "@/lib/notebooks/explanation-types";
import type { QuizSet } from "@/lib/notebooks/quiz-types";
import { ALL_EXPLANATIONS } from "@/lib/notebooks/explanations/registry";
import { ALL_QUIZ_SETS } from "@/lib/notebooks/quizzes/registry";

/**
 * Server-side loader for the DEEP content store (lecture/Übung/exam
 * explanations + quiz strings). The matching client resolver lives in
 * content-client.tsx; this half reads the per-locale JSON from disk so the
 * active locale's text can be embedded in the server HTML and rendered
 * INSTANTLY — no post-hydration fetch, no German-then-translation flash.
 */

const STORE_DIR = path.join(process.cwd(), "public", "content-i18n");

/**
 * The current notebook's heavy content objects, resolved on the server so the
 * client never imports the all-notebooks registries. Filtered by the
 * notebook's id prefix (e.g. every "cs-2025-…" explanation/quiz). Passed to
 * NotebookView and seeded into content-objects-client.
 */
export function resolveNotebookContent(notebook: Notebook): {
  explanations: Explanation[];
  quizSets: QuizSet[];
} {
  const key = notebookStoreKey(notebook);
  if (!key) return { explanations: [], quizSets: [] };
  const belongs = (id: string) => id === key || id.startsWith(`${key}-`);
  return {
    explanations: ALL_EXPLANATIONS.filter((e) => belongs(e.id)),
    quizSets: ALL_QUIZ_SETS.filter((q) => belongs(q.id)),
  };
}

/** Derive the store key (e.g. "cs-2025") from a notebook's content ids. */
export function notebookStoreKey(notebook: Notebook): string | null {
  const re = /^([a-z][a-z0-9]*-\d{4})/i;
  for (const lesson of notebook.lessons) {
    const id = lesson.lecture.walkthroughId ?? lesson.lecture.quizBankId;
    const m = id ? re.exec(id) : null;
    if (m) return m[1];
  }
  for (const exam of notebook.exams ?? []) {
    const m = exam.walkthroughId ? re.exec(exam.walkthroughId) : null;
    if (m) return m[1];
  }
  return null;
}

/**
 * Read the seed map for a notebook in the active locale. Returns `null` for
 * German (no overlay needed) or when the store file is missing/empty, so the
 * caller can skip embedding anything.
 */
export async function readContentSeed(
  notebook: Notebook,
  locale: string,
): Promise<{ key: string; map: Record<string, string> } | null> {
  if (locale === "de") return null;
  const key = notebookStoreKey(notebook);
  if (!key) return null;
  try {
    const raw = await fs.readFile(
      path.join(STORE_DIR, key, `${locale}.json`),
      "utf8",
    );
    const map = JSON.parse(raw) as Record<string, string>;
    if (!map || Object.keys(map).length === 0) return null;
    return { key, map };
  } catch {
    return null;
  }
}
