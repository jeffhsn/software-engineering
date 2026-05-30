#!/usr/bin/env node
/**
 * translate-content.js — fill the per-locale DEEP-content store from the German
 * source manifests, into static files the site serves for free. See
 * tools/translate/README.md for the architecture.
 *
 * INPUT   public/content-i18n/<notebook>/de.json   (from content-i18n.js)
 * OUTPUT  public/content-i18n/<notebook>/<locale>.json   (merged, incremental)
 *
 * TWO ENGINES, BY STRING TYPE
 *   --engine=google (default): the free Google web endpoint. Fast HTTP, no key,
 *     unlimited, parallel. Great for the SHORT quiz strings (question / option /
 *     statement / answer-explanation) — plain text that machine-translates
 *     cleanly. This is the bulk and it costs nothing.
 *   --engine=claude: shells out to the local `claude` CLI (uses your existing
 *     plan, no API key). Reserved for the LONG lecture explanations
 *     (expl:*:content / :simpleContent) — markdown + formulas + „quotes" that
 *     Google would mangle. Higher quality, slower, background.
 *
 * By default Google SKIPS the explanation keys (they stay German until the
 * claude pass), so nothing ships with broken markdown. Flags flip the scope:
 *   --only=quiz         only quiz strings           (google default target)
 *   --only=explanations only expl:*:content/simple  (use with --engine=claude)
 *
 * Resumable + cached: every translation is cached (content-cache.json) and the
 * per-locale files are merged, so re-runs only do what's missing. Safe to stop
 * and restart, and a new notebook only translates its new keys.
 *
 * USAGE
 *   node tools/translate/translate-content.js                  # google, quiz, all locales
 *   node tools/translate/translate-content.js cs-2026          # one notebook
 *   node tools/translate/translate-content.js --locales=en,tr,fr
 *   node tools/translate/translate-content.js --engine=claude --only=explanations
 *   node tools/translate/translate-content.js --dry
 */

const fs = require("fs");
const path = require("path");
const { execFile } = require("child_process");

const ROOT = path.resolve(__dirname, "..", "..");
const STORE_DIR = path.join(ROOT, "public/content-i18n");

const ALL_LOCALES = [
  "en", "tr", "ar", "ru", "it", "es", "fr", "zh", "pl", "pt", "uk", "fa", "ja",
  "ko", "vi", "hi", "ur", "nl", "el", "cs", "hu", "ro", "sq", "sr", "hr", "bg",
  "sv", "fi", "id", "th", "sw",
];
const GOOGLE_CODE = { zh: "zh-CN" };
const LOCALE_NAME = {
  en: "English", tr: "Turkish", ar: "Arabic", ru: "Russian", it: "Italian",
  es: "Spanish", fr: "French", zh: "Chinese (Simplified)", pl: "Polish",
  pt: "Portuguese", uk: "Ukrainian", fa: "Persian", ja: "Japanese",
  ko: "Korean", vi: "Vietnamese", hi: "Hindi", ur: "Urdu", nl: "Dutch",
  el: "Greek", cs: "Czech", hu: "Hungarian", ro: "Romanian", sq: "Albanian",
  sr: "Serbian", hr: "Croatian", bg: "Bulgarian", sv: "Swedish", fi: "Finnish",
  id: "Indonesian", th: "Thai", sw: "Swahili",
};

// ── args ────────────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const DRY = args.includes("--dry");
const engine = (args.find((a) => a.startsWith("--engine=")) || "").split("=")[1] || "google";
const only = (args.find((a) => a.startsWith("--only=")) || "").split("=")[1] ||
  (engine === "claude" ? "explanations" : "quiz");
const localesArg = (args.find((a) => a.startsWith("--locales=")) || "").split("=")[1];
const LOCALES = localesArg ? localesArg.split(",") : ALL_LOCALES;
const concArg = (args.find((a) => a.startsWith("--concurrency=")) || "").split("=")[1];
const CONCURRENCY = Number(concArg) || (engine === "claude" ? 4 : 10);
const notebookFilter = args.filter((a) => !a.startsWith("--"));

const isExpl = (key) => key.startsWith("expl:") && /:(content|simpleContent)$/.test(key);
function inScope(key) {
  if (only === "quiz") return !isExpl(key);
  if (only === "explanations") return isExpl(key);
  return true; // only=all
}

// ── cache (separate file so it can't race the nav translate.js cache) ─────────
const CACHE_PATH = path.join(__dirname, "content-cache.json");
let cache = fs.existsSync(CACHE_PATH)
  ? JSON.parse(fs.readFileSync(CACHE_PATH, "utf8"))
  : {};
let cacheDirty = 0;
/** Read a JSON file, tolerating a concurrent writer (partial read → {}). */
function readJsonSafe(p) {
  try {
    return fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, "utf8")) : {};
  } catch {
    return {};
  }
}
/** Atomic write (temp + rename) so concurrent readers never see a partial file. */
function writeJsonAtomic(p, obj) {
  const tmp = `${p}.${process.pid}.tmp`;
  fs.writeFileSync(tmp, obj);
  fs.renameSync(tmp, p);
}
function saveCache() {
  // Merge with whatever another engine's process wrote so neither clobbers the
  // other (keys are engine-prefixed, so the two sets are disjoint).
  cache = { ...readJsonSafe(CACHE_PATH), ...cache };
  writeJsonAtomic(CACHE_PATH, JSON.stringify(cache));
  cacheDirty = 0;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ── engines ───────────────────────────────────────────────────────────────
async function googleOnce(text, locale) {
  const tl = GOOGLE_CODE[locale] || locale;
  const url =
    "https://translate.googleapis.com/translate_a/single?client=gtx&sl=de&tl=" +
    tl + "&dt=t&q=" + encodeURIComponent(text);
  const res = await fetch(url);
  if (res.status === 429) throw Object.assign(new Error("rate"), { rate: true });
  if (!res.ok) throw new Error(`google ${res.status}`);
  const j = await res.json();
  return j[0].map((s) => s[0]).join("");
}

const CLAUDE_SYS =
  "You are a machine translation engine. Output ONLY the translated text — " +
  "no preamble, no notes, no glossary, no surrounding quotes. Preserve all " +
  "Markdown, links, image syntax, formulas, code and numbers exactly; " +
  "translate only the human-readable prose, keeping the same paragraph and " +
  "heading structure.";

function claudeOnce(text, locale) {
  // Headless one-shot via the local, already-authenticated `claude` CLI (no API
  // key). The system prompt forces clean translation-only output.
  const prompt = `Translate this German Markdown to ${LOCALE_NAME[locale]}:\n\n${text}`;
  return new Promise((resolve, reject) => {
    execFile(
      "claude",
      ["-p", "--append-system-prompt", CLAUDE_SYS, prompt],
      { maxBuffer: 64 * 1024 * 1024, timeout: 300000 },
      (err, stdout) => (err ? reject(err) : resolve(stdout.trim())),
    );
  });
}

async function translate(text, locale) {
  const ck = `${engine}\t${locale}\t${text}`;
  if (cache[ck] != null) return cache[ck];
  for (let attempt = 0; ; attempt++) {
    try {
      const out =
        engine === "claude"
          ? await claudeOnce(text, locale)
          : await googleOnce(text, locale);
      if (!out) throw new Error("empty");
      cache[ck] = out;
      if (++cacheDirty >= 50) saveCache();
      if (engine === "google") await sleep(40);
      return out;
    } catch (e) {
      if (attempt >= 6) throw e;
      await sleep((e.rate ? 4000 : 800) * (attempt + 1));
    }
  }
}

// ── simple async pool ───────────────────────────────────────────────────────
async function pool(items, n, worker) {
  let i = 0;
  let done = 0;
  const total = items.length;
  let lastLog = Date.now();
  async function run() {
    while (i < items.length) {
      const idx = i++;
      await worker(items[idx]);
      done++;
      if (Date.now() - lastLog > 5000) {
        process.stdout.write(`\r    ${done}/${total} (${Math.round((done / total) * 100)}%)   `);
        lastLog = Date.now();
      }
    }
  }
  await Promise.all(Array.from({ length: Math.min(n, items.length) }, run));
  process.stdout.write(`\r    ${done}/${total} (100%)        \n`);
}

// ── main ────────────────────────────────────────────────────────────────────
async function run() {
  const available = fs
    .readdirSync(STORE_DIR)
    .filter((d) => fs.existsSync(path.join(STORE_DIR, d, "de.json")));
  // Respect the order given on the command line (so a priority notebook can go
  // first); otherwise directory order.
  const notebooks = notebookFilter.length
    ? notebookFilter.filter((d) => available.includes(d))
    : available;

  let grandTotal = 0;
  let failures = 0;
  for (const nb of notebooks) {
    const dir = path.join(STORE_DIR, nb);
    const de = JSON.parse(fs.readFileSync(path.join(dir, "de.json"), "utf8"));
    const keys = Object.keys(de).filter(inScope);
    console.log(
      `\n■ ${nb} — ${keys.length} ${only} key(s) × ${LOCALES.length} locale(s), engine=${engine}`,
    );

    for (const locale of LOCALES) {
      const dest = path.join(dir, `${locale}.json`);
      const ckOf = (k) => `${engine}\t${locale}\t${de[k]}`;
      // A key needs the engine only when its CURRENT German has never been
      // translated (cache miss). The cache is keyed by source text, so an edited
      // explanation/quiz is a new key → re-translated automatically; unchanged
      // text is an instant cache hit; deleted keys are dropped on write below.
      const need = keys.filter((k) => cache[ckOf(k)] == null);
      console.log(
        `  ${locale}: ${need.length ? need.length + " to (re)translate" : "up to date"}`,
      );
      if (DRY) {
        grandTotal += need.length;
        continue;
      }
      // A single failing string must NOT kill an unattended overnight run: skip
      // it (stays untranslated → German fallback) and a later re-run fills it.
      await pool(need, CONCURRENCY, async (key) => {
        try {
          await translate(de[key], locale); // fills cache
        } catch (e) {
          failures++;
          process.stderr.write(`\n    ! skip ${key} (${locale}): ${e.message}\n`);
        }
      });
      // Rebuild this pass's keys from the (now fresh) cache: changed German
      // overwrites the stale translation, removed keys disappear. Preserve the
      // other engine's disjoint keys already on disk (e.g. quiz keys while this
      // is the explanations pass), and write atomically so no reader/writer ever
      // sees a partial file.
      const result = {};
      for (const [k, v] of Object.entries(readJsonSafe(dest))) {
        if (!inScope(k)) result[k] = v; // keep the other pass's work untouched
      }
      for (const k of keys) {
        const v = cache[ckOf(k)];
        if (v != null) result[k] = v; // skip any that failed → German fallback
      }
      const sorted = Object.fromEntries(
        Object.keys(result).sort().map((k) => [k, result[k]]),
      );
      writeJsonAtomic(dest, JSON.stringify(sorted, null, 2) + "\n");
      saveCache();
      grandTotal += need.length;
    }
  }
  saveCache();
  console.log(
    `\n${DRY ? "[dry] would translate" : "Translated"} ${grandTotal} string(s)` +
      (failures ? `, ${failures} skipped (re-run to fill).` : "."),
  );
}

run().catch((e) => {
  console.error("\ntranslate-content failed:", e);
  saveCache();
  process.exit(1);
});
