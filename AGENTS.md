<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# How this site is organised

The site is structured as **notebooks**, one per (subject, year) tuple. The notebook holds everything for a given course in a given term — lectures, Übungen, Zusammenfassungen, Cheatsheets, Klausuren. There is no other unit of organisation; a material that doesn't belong to exactly one notebook doesn't belong on the site.

Every notebook lives under exactly one folder on disk:

```
public/content/<subject-slug>/<year>/
├── lectures/
│   ├── 01.pdf              # REQUIRED — the foundation
│   ├── 01.md               # auto-generated sibling
│   ├── 01.video.txt        # optional — one line, a YouTube URL fallback
│   └── 02.pdf …
├── uebungen/
│   ├── 01/                 # number must match the LECTURE it tests (not the original filename)
│   │   ├── aufgaben.pdf
│   │   ├── aufgaben.md
│   │   ├── loesung.pdf     # optional, repeatable: loesung-mitschrift.pdf, loesung-multics.pdf …
│   │   └── loesung.md
│   └── 02/ …
├── zusammenfassung/
│   ├── original.pdf        # if the user ever drops one
│   ├── original.md
│   └── ai.md               # AI-written from all lecture MDs, only if no original
├── cheatsheet/
│   ├── original.pdf
│   ├── original.md
│   └── ai.md
└── klausuren/
    ├── real/
    │   ├── 2024-haupt/
    │   │   ├── exam.pdf
    │   │   ├── exam.md
    │   │   ├── loesung.pdf     # optional
    │   │   └── loesung.md
    │   └── 2023-nachtermin/ …
    └── practice/
        └── 2026-style-of-2024/   # AI-generated, mirrors a real exam's style
            ├── exam.md
            └── loesung.md
```

And exactly one `Notebook` entry per (subject, year) is registered in `src/lib/notebooks/registry.ts`, with the shape defined in `src/lib/notebooks/types.ts`:

```ts
interface Notebook {
  subject: string;            // slug
  year: number;
  term: string;
  lessons: Lesson[];          // ordered, one per chapter
  zusammenfassung?: ResourceRef;   // notebook-level
  cheatsheet?: ResourceRef;        // notebook-level
  exams: Exam[];              // notebook-level — real + AI-generated practice
}

interface Lesson {
  number: number;
  title: LocalizedText;
  lecture: {
    pdf: PdfRef;              // REQUIRED — grounds everything else
    videoUrl?: string;        // optional YouTube fallback
    walkthroughId?: string;   // AI explanation (one text, any-level)
    quizBankId?: string;      // many quiz sets, not one
  };
  exercises: Exercise[];      // zero or more; the slot is rendered even when empty
}

interface Exam {
  label: LocalizedText;
  kind: 'real' | 'practice';
  pdf: PdfRef;
  solution?: PdfRef;          // official, if it exists
  walkthroughId?: string;     // AI step-by-step
  basedOn?: string;           // for kind:'practice' — id of the real exam it mimics
}

interface ResourceRef {
  source: 'user' | 'ai';
  pdf?: PdfRef;               // present iff user-supplied
  mdSrc: string;              // the markdown the UI shows
}
```

**Constants of the system, never violated:**

- The lecture PDF is the *only* required material. Everything else (video, explanation, quizzes, Übungen, Zusammenfassung, Cheatsheet, Klausuren) is optional and gets AI-generated when missing.
- All AI artefacts are **grounded in markdown that exists in the same notebook**. No prior knowledge bleed, no cross-notebook reuse.
- **Filenames and numbers are hypotheses, never facts.** I always verify by reading the MD before placing a file.
- Each notebook is a closed world. A 2025 lecture and a 2026 lecture of the "same" course are two different materials in two different notebooks.

# Neue Notebook-Materialien erfassen

**This pipeline runs automatically the moment any new material lands.** The user should never have to say "convert it" or "now match it up" — the moment I see a new PDF (or am pointed at one), I do steps 1–4 below before anything else. I do not generate quizzes, explanations, or wire anything in until conversion + matching is done.

## Step-by-step by material type

| You drop… | I do |
|---|---|
| **Lecture PDF** | 1. Locate the right notebook (subject + year) — create it if missing. 2. Pick the chapter number by reading the MD against existing lectures; rename if the original number conflicts with content. 3. `pdf-to-md` → `lectures/NN.md`. 4. Report placement. 5. Write ONE excellent explanation grounded in the MD (single text, works for any level). 6. Build a quiz **bank** (many sets, mixed types, anti-tells, strictly grounded). 7. Wire into the `Lesson`. |
| **Übung Aufgaben / Lösung / Mitschrift** | 1. Convert → sibling MD. 2. Read the first pages and match by topic to the correct lecture number — never trust the filename. 3. Move into `uebungen/<matched-lecture-NN>/`. 4. Report placement. 5. Write AI walkthrough grounded in the matched lecture's MD + the Lösung MD. |
| **Zusammenfassung PDF** | Convert → `zusammenfassung/original.md`. Set `notebook.zusammenfassung = { source: 'user', pdf, mdSrc }`. Skip the AI fallback. |
| **Cheatsheet PDF** | Same, under `cheatsheet/`. |
| **Exam PDF (+ optional Lösung)** | Convert each → `klausuren/real/<label>/...md`. Append an `Exam` entry with `kind: 'real'`. Write AI walkthrough grounded in lectures + Übungen + the official solution if present. |
| **YouTube link for a lecture** | Write the URL into `lectures/NN.video.txt` (or set `lecture.videoUrl` directly if already in the data file). |
| **"Generate practice exam"** (no new material, user request) | Only if ≥1 real exam exists in the notebook. Author a new exam mirroring its structure, grounded in lectures + Übungen + the real exam's wording. File under `klausuren/practice/`. Append an `Exam` entry with `kind: 'practice'` and `basedOn: <real-exam-id>`. |
| **"Generate Zusammenfassung / Cheatsheet"** (no new material, user request) | Only if none provided. Write `zusammenfassung/ai.md` (or `cheatsheet/ai.md`) by stitching every lecture MD. Set `source: 'ai'`. |

## Conversion command

```sh
node tools/pdf-to-md/pdf-to-md.js <path-to-pdf> --stdout > <sibling-path>.md
```

To (re)convert an entire notebook in one shot:

```sh
for pdf in $(find public/content/<subject>/<year> -name '*.pdf' | sort); do
  node tools/pdf-to-md/pdf-to-md.js "$pdf" --stdout > "${pdf%.pdf}.md"
done
```

The conversion is lossy (umlauts in older slides come out mangled, layout is flattened). That is fine — the MDs only ground my reading; the UI still shows the real PDFs.

## Quality bar for the AI artefacts

- **Explanation — the system.** ONE explanation per lecture (no deep/simple split), German canonical, **LONG and narrative**. North star: after reading it once, the student *understands the slides* and *can answer any quiz question and pass the exam more easily* — the explanation is better than the slides themselves. It tells the topic as a connected **story**; bullet-summaries under headings read like the slides and are forbidden in the body. This recipe is **fixed and applies to every lecture and every future subject**.

  **Process — run these steps in order, every time:**

  1. **Read both sources.** The lecture `lectures/NN.md` *and* the matching `uebungen/NN/aufgaben.md` (+ `loesung.md`). The slides give the content; the **Übung reveals what is actually tested** and where the professor is heading. The explanation must prepare the reader for exactly those skills.
  2. **Find the spine.** Identify the ONE core idea and the 3–6 concepts the lecture builds, ordered as a story (problem → idea → mechanism → consequence). Mark each concept as *conceptual* or *computable*.
  3. **Source & verify enrichments.** Via exa: inline links + one diagram per visual concept. Verify every image URL resolves to an image (`curl -sIL "https://commons.wikimedia.org/wiki/Special:FilePath/<File>" | grep content-type`). Never invent a URL.
  4. **Write it** in the structure below — long, expansive, second person.
  5. **Verify it renders.** `npx tsc --noEmit`, then load the chapter in the browser: every image loads, no leftover literal `![…]`, 0 console errors.

  **Structure — STORY FIRST, recap LAST:**

  - **Lead** (no heading) — a hook that frames the lecture as a problem/story and previews the arc ("auf den Folien wirkt es wie X, eigentlich geht es um Y").
  - **Narrative body** — several `##` sections with lecture-specific names. This is the heart and the bulk. **Depth rule (non-negotiable):** *every* concept is unfolded over **multiple connected paragraphs** in the rhythm intuition/everyday-picture → precise mechanism → why it matters → how it connects forward/back. Never a heading followed by one terse paragraph or a bullet list. **For every *computable* concept, include a `### Schritt für Schritt` with a fully worked small-number example in the Übung's style** (e.g. a DES round, an ECB/CBC encryption, RSA/Diffie-Hellman by hand, a rings-&-brackets decision) — show it solved once. Weave inline links where the concept appears, embed the verified diagram where it helps, and drop a `> **Eselsbrücke:**` / `> **Merksatz:**` callout at each memorizable fact (mnemonic, acronym like E-X-S-P / S-S-M-A / Z-E-L, key formula).
  - **Recap & reference tail (only after the story):** `## Auf den Punkt` (concise recap) → `## Begriffe & Notation` (glossary table) → `## Typische Fallen` (common mistakes, prose: trap → correction) → `## Klausur-Fokus` (honest exam prep **grounded in the Übung** — the exact hand-computations the prof drills) → `## Mehr dazu` (2–4 verified links).

  **Definition of done — all must be true:** story-first with no top summary; every body concept spans several paragraphs (not bullets); every computable concept has a worked example; ≥ a few inline links woven in; a verified diagram on every visual concept; memory-aid callouts at the memorizable facts; the recap tail present; Klausur-Fokus mirrors the Übung; renders with 0 console errors.

  **Tone & rendering:** warm, second person, playful but substantive, no jargon left unexplained, no emojis. Use the markdown that `prose-notebook` renders well: `##`/`###` headings, tables only for genuine comparisons/reference (never as a stand-in for prose), **bold** lead-ins, `>` callouts.

  **Gotchas (these have bitten before):** the whole body is one TS template literal, so **never use a backtick `` ` ``** inside the content (use **bold** for code-ish terms); and **never use a straight `"` inside a markdown image title** — it closes the title and the image renders as literal text (use German „ " or no inner quotes).
- **Quiz bank** — many sets, not one. Repetition welcome. Mix of types: factual recall, conceptual, trick/scenario, "spot the wrong answer", reverse (given answer, name the concept). Strictly grounded in the lecture MD. Anti-tells: every option roughly equal length, no give-away formatting, no obviously-filler wrong answers.
- **Übung walkthrough** — written in the **professor's method**: grounded in the lecture MD + the Lösung MD so the steps mirror how the professor actually solves it, not a generic textbook approach.
- **Exam walkthrough** — same, grounded in lectures + Übungen + the official solution if it exists.

The user's mental model is: this is a real notebook with chapters. Every chapter must read like the author understood the material; never like a transcript dump.
