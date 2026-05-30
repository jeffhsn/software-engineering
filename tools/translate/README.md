# Translation pipeline

The site is **German-canonical**. Every string is authored in German in the
`.ts` files; translation into the other 31 locales is a mechanical pass that
runs **dead last**, after a notebook's content has stopped moving. There are
**two layers**, because short labels and long teaching prose have to be handled
differently.

```
                       ┌─ NAV LAYER ──────────────────────────────────────────┐
 .ts (German)  ──────► │ translate.js  → inlines all 31 locales INTO the .ts   │
 titles, labels,       │   (short strings; safe to ship to the browser)        │
 descriptions          └──────────────────────────────────────────────────────┘
                       ┌─ DEEP CONTENT ───────────────────────────────────────┐
 .ts (German)  ──────► │ content-i18n.js     → extract German → de.json        │
 explanations,         │ translate-content.js → LLM-translate → <locale>.json  │
 quiz Q/A/options       │   (per-notebook store, loaded per-locale on server)  │
                       └──────────────────────────────────────────────────────┘
```

## Why two layers

`notebook-view.tsx` is a **client** component that imports the content
registries, so anything inlined into the `.ts` files ships to *every* visitor's
browser. Short nav strings are fine. The deep content is ~2 MB of German;
inlining 32 copies would bloat the client bundle ~32× and break the build. So
deep content lives in a **per-notebook, per-locale store** that the server loads
one locale at a time — the browser only ever receives the active language of the
chapter on screen.

## The store

```
public/content-i18n/
  <notebook>/              # <subject>-<year>, e.g. cs-2025, cs-2026
    de.json                # German source manifest (generated; the input)
    en.json, tr.json, …    # one per locale — {} placeholder until translated
```

Served statically from `public/` so the client fetches exactly one
`/content-i18n/<notebook>/<locale>.json` on demand (CDN-cacheable). German is
the bundled fallback and is never fetched. **Every locale always has a file**
(an empty `{}` until translated) so a missing translation is a graceful German
fallback, never a 404 — a 404 would be a console error.

Each file maps a **stable key → string**. Keys are derived from the source ids
and must never be renumbered (renaming orphans saved translations):

| Key | From |
|---|---|
| `expl:<explId>:content` | `Explanation.content` |
| `expl:<explId>:simpleContent` | `Explanation.simpleContent` |
| `quiz:<quizId>:<questionId>:question` | mcq question |
| `quiz:<quizId>:<questionId>:statement` | tf statement |
| `quiz:<quizId>:<questionId>:explanation` | answer rationale |
| `quiz:<quizId>:<questionId>:opt:<i>` | mcq option `i` |

`explId` and `quizId` are globally unique; `questionId` is unique within its
quiz. A key's notebook is the `<subject>-<year>` prefix of its id.

## Commands

```sh
# 1. NAV layer — inline all locales into the .ts files
node tools/translate/translate.js              # (--dry to preview)

# 2. DEEP content — extract the German source manifest
node tools/translate/content-i18n.js           # (--dry to preview)

# 3. DEEP content — LLM-translate the manifest into every locale   [Phase 3]
node tools/translate/translate-content.js      # incremental + cached

# restrict any step to specific files/dirs
node tools/translate/content-i18n.js src/lib/notebooks/quizzes/
```

`content-i18n.js` re-extraction is idempotent: it regenerates `de.json` from the
current German. The LLM pass is keyed by source text, so it only translates keys
whose German is new or changed — adding a notebook translates just its new keys.

## Where this fits the notebook pipeline

When new material lands (new lecture / Übung / notebook / subject / year), follow
the normal pipeline in `AGENTS.md` (convert → classify → match → author German
explanations + quizzes). Translation is the **final** step and now means:

1. `node tools/translate/translate.js` — nav labels.
2. `node tools/translate/content-i18n.js` — extract deep content.
3. `node tools/translate/translate-content.js` — LLM-translate deep content.
4. `npx tsc --noEmit` + load a couple of locales in the browser, 0 console errors.

## Editing content → automatic re-translation

When an explanation or quiz is rewritten, just re-run the pass — it Does The
Right Thing, because translations are cached **by their German source text**:

```sh
node tools/translate/content-i18n.js <nb>        # re-extract de.json from the edited .ts
node tools/translate/translate-content.js <nb> --engine=claude --only=explanations
node tools/translate/translate-content.js <nb>   # quizzes
```

- **Changed** German → new cache key → **re-translated** in every language.
- **Unchanged** German → instant cache hit, not touched.
- **Deleted** strings → their keys are dropped from every locale file.

So a one-paragraph edit re-translates only that paragraph's key across all
languages; everything else is free. (Nav titles edited in `.ts` are the one
exception — `translate.js` only fills *missing* locales, so to re-translate a
changed title, clear its stale locale fields first.)

## Coverage — everything translatable in a notebook

Audited against the type model. Every `LocalizedText` field is covered:

- **Deep content (claude for explanations, google for quizzes):**
  `Explanation.content` / `simpleContent` — this includes **lecture, Übung AND
  exam walkthroughs**, since every walkthrough is an `Explanation` object;
  `Question.question` / `statement` / `options` / `explanation`.
- **Nav (inline via translate.js):** `Lesson.title`, `Exercise.label`,
  `PdfRef.label`, `Exam.label`, `Quiz.title` / `description`, `QuizSet.title`,
  `Explanation.title`.
- **App chrome:** `labels-i18n.ts`, `ui-i18n.ts`, `i18n/dict/*` — already
  localized.

### Known gaps (handle when they appear)

- **Zusammenfassung / Cheatsheet bodies** — `ResourceRef.mdSrc` is a path to a
  Markdown **file**, not inline `.ts` text, so the passes above don't touch it.
  When a notebook gains one, its `.md` needs its own translation (translate the
  file → per-locale variant, claude-quality like explanations). No notebook has
  one yet.
- **Subject catalog** — `Subject.title` / `blurb` (home page) are plain
  `string`, not `LocalizedText`, so they render German-only site-wide. Convert
  to `LocalizedText` if the catalog should localize.

## Status

- ✅ **Phase 1** — extractor + key scheme + `de.json` manifests (`content-i18n.js`).
- ✅ **Phase 2** — per-locale store in `public/` + client fetch/resolve with
  German fallback (`src/lib/i18n/content-client.tsx`, wired into
  `notebook-view.tsx` + `quiz-player.tsx`). Translations render with zero bundle
  bloat; missing keys fall back to German; verified in-browser, 0 console errors.
- ⬜ **Phase 3** — `translate-content.js` (LLM, incremental, cached) to fill the
  `{}` locale files with real translations.
- ⬜ **Phase 4** — translate the existing cs-2025 / cs-2026 notebooks; verify.
- ⬜ **Phase 2b** (optimization) — the client still imports the German content
  registries (pre-existing), so German prose ships in the JS bundle. De-bundling
  it (serve German via the store too) would shrink the initial load. Not a
  regression; translations already avoid the bundle entirely.
