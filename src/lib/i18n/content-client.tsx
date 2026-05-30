"use client";

import { useEffect, useState } from "react";
import { useI18n } from "./client";

/**
 * Client-side resolver for DEEP notebook content (lecture explanations + quiz
 * question/answer/option text). See tools/translate/README.md for the why.
 *
 * German is the canonical fallback and is always already in the page (rendered
 * from the bundled content objects), so German users fetch nothing. For any
 * other locale we lazily fetch the notebook's per-locale store once
 * (`/content-i18n/<notebook>/<locale>.json`, a stable-key → translated-string
 * map served as a static, CDN-cacheable file) and overlay it on top of the
 * German. A missing file or a not-yet-translated key falls back to German, so
 * the UI never breaks while translations are still being filled in.
 *
 * This keeps translations OUT of the JS bundle entirely: adding the 31 locales
 * adds static files, never bundle weight. Loading one notebook in one language
 * fetches exactly one file, cached for the rest of the session.
 */

// One in-flight/resolved fetch per (notebook, locale) for the whole page load.
const cache = new Map<string, Promise<Record<string, string>>>();
// Synchronously-available maps (seeded from the server HTML for the active
// locale), so the very first paint already has the translations — no
// post-hydration fetch, no German-then-swap flash. See seedContent below.
const resolved = new Map<string, Record<string, string>>();

const cacheKey = (notebook: string, locale: string) => `${notebook}|${locale}`;

/**
 * Seed a notebook+locale map that the server already embedded in the HTML.
 * Idempotent and safe to call during render: it only fills the caches the
 * first time, so the active-locale explanation/quiz text is available
 * synchronously on the first render (peekContent) instead of being fetched.
 */
export function seedContent(
  notebook: string,
  locale: string,
  map: Record<string, string>,
): void {
  if (locale === "de" || !notebook || notebook === "_misc") return;
  const k = cacheKey(notebook, locale);
  if (!resolved.has(k)) resolved.set(k, map);
  if (!cache.has(k)) cache.set(k, Promise.resolve(map));
}

/** The seeded map for notebook+locale if present, else null. Synchronous. */
function peekContent(
  notebook: string,
  locale: string,
): Record<string, string> | null {
  return resolved.get(cacheKey(notebook, locale)) ?? null;
}

function load(notebook: string, locale: string): Promise<Record<string, string>> {
  const k = cacheKey(notebook, locale);
  let p = cache.get(k);
  if (!p) {
    p = fetch(`/content-i18n/${notebook}/${locale}.json`)
      .then((r) => (r.ok ? (r.json() as Promise<Record<string, string>>) : {}))
      .then((m) => {
        resolved.set(k, m);
        return m;
      })
      .catch(() => ({}));
    cache.set(k, p);
  }
  return p;
}

/** `cs-2025-l01` / `cs-2026-l1-begriffe` → `cs-2025` / `cs-2026`. */
export function notebookOf(id: string): string {
  const m = /^([a-z][a-z0-9]*-\d{4})/i.exec(id);
  return m ? m[1] : "_misc";
}

/** Stable content keys — must match tools/translate/content-i18n.js exactly. */
export const contentKey = {
  expl: (explId: string, field: "content" | "simpleContent") =>
    `expl:${explId}:${field}`,
  question: (quizId: string, qId: string) => `quiz:${quizId}:${qId}:question`,
  statement: (quizId: string, qId: string) => `quiz:${quizId}:${qId}:statement`,
  explanation: (quizId: string, qId: string) =>
    `quiz:${quizId}:${qId}:explanation`,
  option: (quizId: string, qId: string, i: number) =>
    `quiz:${quizId}:${qId}:opt:${i}`,
};

/**
 * A resolver `(key, german) => string` for one notebook. Always returns German
 * for the `de` locale (and as the fallback for any missing translation); swaps
 * in the translated string once the per-locale store has loaded.
 */
export function useContentText(notebookKey: string) {
  const { locale } = useI18n();
  const [, force] = useState(0);

  // Seeded map (from the server HTML) is available synchronously on the very
  // first render → no flash. If it isn't seeded (e.g. a client-side route into
  // a locale we haven't loaded yet), fall back to fetching once, then re-render.
  const seeded = peekContent(notebookKey, locale);

  useEffect(() => {
    if (locale === "de" || !notebookKey || notebookKey === "_misc") return;
    if (peekContent(notebookKey, locale)) return; // already have it, no fetch
    let alive = true;
    load(notebookKey, locale).then(() => {
      if (alive) force((n) => n + 1);
    });
    return () => {
      alive = false;
    };
  }, [notebookKey, locale]);

  const map = locale === "de" ? null : seeded ?? peekContent(notebookKey, locale);

  return (key: string, german: string): string => {
    if (locale === "de") return german;
    return (map && map[key]) || german;
  };
}
