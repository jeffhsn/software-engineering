#!/usr/bin/env node
/**
 * content-i18n.js — the scalable translation pipeline for DEEP notebook content
 * (lecture explanations + quiz questions/answers/options), as opposed to the
 * short navigation labels handled inline by translate.js.
 *
 * WHY THIS EXISTS (read once, never wonder again)
 *   The nav layer (titles, labels, descriptions) is short, so translate.js
 *   inlines all 32 locales straight into the .ts files. Deep content is ~2 MB
 *   of German prose; inlining 32 copies would bloat the *client* bundle ~32×
 *   (notebook-view.tsx is a client component that imports the content
 *   registries) and break the build. So deep content is handled differently:
 *
 *     1. German stays canonical in the .ts files — you author exactly as today.
 *     2. This tool EXTRACTS every deep-content German string under a stable,
 *        globally-unique key into a per-notebook source manifest
 *        (src/content-i18n/<notebook>/de.json).
 *     3. translate-content.js (Phase 3) LLM-translates each manifest entry into
 *        every locale and writes src/content-i18n/<notebook>/<locale>.json —
 *        incremental + cached, so a new notebook only translates its new keys.
 *     4. At render time the server loads only the active locale of the viewed
 *        notebook (Phase 2), so the browser never ships 32 copies of anything.
 *
 * KEY SCHEME (stable forever — never renumber, or saved progress/translations
 * orphan, exactly like quiz attempt ids):
 *     expl:<explanationId>:content
 *     expl:<explanationId>:simpleContent
 *     quiz:<quizId>:<questionId>:question      (mcq)
 *     quiz:<quizId>:<questionId>:statement     (tf)
 *     quiz:<quizId>:<questionId>:explanation
 *     quiz:<quizId>:<questionId>:opt:<index>
 *   All ids come straight from the source objects. explanationId and quizId are
 *   globally unique; questionId is unique within its quiz. The notebook a key
 *   belongs to is the `<subject>-<year>` prefix of its id (e.g. cs-2025).
 *
 * USAGE
 *   node tools/translate/content-i18n.js              # extract → de.json manifests
 *   node tools/translate/content-i18n.js --dry        # report counts only, no writes
 *   node tools/translate/content-i18n.js <file|dir…>  # restrict to given sources
 */

const fs = require("fs");
const path = require("path");
const ts = require("typescript");

const ROOT = path.resolve(__dirname, "..", "..");
const CONTENT_SRC = path.join(ROOT, "src/lib/notebooks");
// Served statically so the client can fetch one notebook+locale on demand
// (CDN-cacheable). de.json is the translation source; <locale>.json the output.
const STORE_DIR = path.join(ROOT, "public/content-i18n");

// Every locale must have a file so the client never 404s (a 404 is a console
// error). Untranslated locales get an empty {} placeholder that translate-
// content.js later fills; existing translations are never overwritten here.
const TARGET_LOCALES = [
  "en", "tr", "ar", "ru", "it", "es", "fr", "zh", "pl", "pt", "uk", "fa", "ja",
  "ko", "vi", "hi", "ur", "nl", "el", "cs", "hu", "ro", "sq", "sr", "hr", "bg",
  "sv", "fi", "id", "th", "sw",
];

// Deep-content properties whose German we lift into the per-locale store.
// Mirrors translate.js's SKIP_KEYS (the nav layer is handled there, inline).
const EXPL_FIELDS = new Set(["content", "simpleContent"]);
const QUESTION_FIELDS = new Set(["question", "statement", "explanation"]);

const args = process.argv.slice(2);
const DRY = args.includes("--dry");
const inputs = args.filter((a) => !a.startsWith("--"));

/** `cs-2025-l01` / `cs-2025-l1-komplett-a` → `cs-2025`. */
function notebookOf(id) {
  const m = /^([a-z][a-z0-9]*-\d{4})/i.exec(id);
  return m ? m[1] : "_misc";
}

/** Read the German string out of a LocalizedText node (string form OR { de }). */
function germanOf(node, src) {
  if (!node) return null;
  if (
    ts.isStringLiteral(node) ||
    ts.isNoSubstitutionTemplateLiteral(node)
  ) {
    return node.text;
  }
  if (ts.isObjectLiteralExpression(node)) {
    for (const p of node.properties) {
      if (
        ts.isPropertyAssignment(p) &&
        p.name &&
        p.name.getText(src).replace(/['"]/g, "") === "de"
      ) {
        return germanOf(p.initializer, src);
      }
    }
  }
  return null; // template with ${…} or other — we assert there are none
}

/** Ids of the enclosing object literals, innermost first. */
function enclosingIds(node, src) {
  const ids = [];
  for (let n = node.parent; n; n = n.parent) {
    if (ts.isObjectLiteralExpression(n)) {
      for (const p of n.properties) {
        if (
          ts.isPropertyAssignment(p) &&
          p.name &&
          p.name.getText(src).replace(/['"]/g, "") === "id" &&
          ts.isStringLiteral(p.initializer)
        ) {
          ids.push(p.initializer.text);
        }
      }
    }
  }
  return ids;
}

/** Walk one source file → [{ key, de }]. */
function extractFile(file) {
  const code = fs.readFileSync(file, "utf8");
  const src = ts.createSourceFile(file, code, ts.ScriptTarget.Latest, true);
  const out = [];
  const warn = [];

  function push(key, node) {
    const de = germanOf(node, src);
    if (de == null) {
      warn.push(`${key} @ ${path.relative(ROOT, file)} — could not read German`);
      return;
    }
    out.push({ key, de });
  }

  function visit(node) {
    if (ts.isPropertyAssignment(node) && node.name) {
      const field = node.name.getText(src).replace(/['"]/g, "");
      if (EXPL_FIELDS.has(field)) {
        const ids = enclosingIds(node, src); // [explId, …]
        if (ids[0]) push(`expl:${ids[0]}:${field}`, node.initializer);
      } else if (QUESTION_FIELDS.has(field)) {
        const ids = enclosingIds(node, src); // [questionId, quizId, setId]
        if (ids[0] && ids[1]) {
          push(`quiz:${ids[1]}:${ids[0]}:${field}`, node.initializer);
        }
      } else if (
        field === "options" &&
        ts.isArrayLiteralExpression(node.initializer)
      ) {
        const ids = enclosingIds(node, src); // [questionId, quizId, …]
        if (ids[0] && ids[1]) {
          node.initializer.elements.forEach((el, i) =>
            push(`quiz:${ids[1]}:${ids[0]}:opt:${i}`, el),
          );
        }
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(src);
  return { out, warn };
}

function listFiles() {
  const acc = [];
  const roots = inputs.length
    ? inputs.map((i) => path.resolve(ROOT, i))
    : [CONTENT_SRC];
  for (const r of roots) {
    const st = fs.statSync(r);
    if (st.isDirectory()) walk(r, acc);
    else acc.push(r);
  }
  return acc;
}
function walk(dir, acc) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p, acc);
    else if (p.endsWith(".ts") && !p.endsWith(".d.ts")) acc.push(p);
  }
}

function run() {
  const byNotebook = {}; // notebook -> { key: de }
  const allWarn = [];
  let total = 0;
  for (const file of listFiles()) {
    const { out, warn } = extractFile(file);
    allWarn.push(...warn);
    for (const { key, de } of out) {
      const nb = notebookOf(key.split(":")[1]);
      (byNotebook[nb] ||= {})[key] = de;
      total++;
    }
  }

  for (const [nb, map] of Object.entries(byNotebook)) {
    const sorted = Object.fromEntries(
      Object.keys(map)
        .sort()
        .map((k) => [k, map[k]]),
    );
    const dir = path.join(STORE_DIR, nb);
    const dest = path.join(dir, "de.json");
    console.log(`• ${nb} — ${Object.keys(sorted).length} deep-content string(s)`);
    if (!DRY) {
      fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(dest, JSON.stringify(sorted, null, 2) + "\n");
      // Ensure a placeholder exists for every locale (never clobber real ones).
      let created = 0;
      for (const loc of TARGET_LOCALES) {
        const lp = path.join(dir, `${loc}.json`);
        if (!fs.existsSync(lp)) {
          fs.writeFileSync(lp, "{}\n");
          created++;
        }
      }
      if (created) console.log(`    + ${created} locale placeholder(s)`);
    }
  }

  if (allWarn.length) {
    console.warn(`\n⚠ ${allWarn.length} unreadable string(s):`);
    for (const w of allWarn.slice(0, 20)) console.warn("  " + w);
  }
  console.log(
    `\n${DRY ? "[dry] would extract" : "Extracted"} ${total} string(s) across ` +
      `${Object.keys(byNotebook).length} notebook(s) → public/content-i18n/<nb>/de.json`,
  );
}

run();
