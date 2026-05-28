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

- **Explanation** — ONE single explanation per lecture (no deep/simple split), German canonical. Goal: the user must *understand a horrible lecture on the first read* and *prep for the exam fast* — not become a researcher. Stay strictly inside the lecture MD; never add topics the slides don't cover. Every concept opens with an everyday picture/analogy a beginner gets, then deepens into the precise mechanism and the *why*. It follows a **fixed, standardized skeleton** so it's identical to read across every lecture and every subject — fixed top-and-tail, flexible middle:

  1. **Lead paragraph** (no heading, 2–4 sentences) — what this lecture is *really* about, the ONE core idea, how it follows from the previous chapter. Demystify ("auf den Folien wirkt es wie X, eigentlich geht es um Y").
  2. **## Das Wichtigste in Kürze** — 3–6 bullets, the pure essence. If the reader reads only this, they have the gist. The fast-prep entry point.
  3. **[BODY — 2–5 `##` sections with lecture-specific names]** — the understanding layer that decodes the slides. Each concept in a consistent rhythm: intuition/analogy → precise mechanism → why it matters / where it's used. Use tables for comparisons, **numbered `### Schritt für Schritt`** worked examples for any algorithm/procedure (DES round, RSA key-gen, …).
  4. **## Begriffe & Notation** — glossary table (term/symbol → meaning, + tiny example). Fast lookup + memorization.
  5. **## Typische Fallen** — common misunderstandings & exam traps, each bullet: *the trap → the correction*.
  6. **## Klausur-Fokus** — explicit, honest exam prep: what's most likely asked, what you must be able to *do* (derive/compute), what to memorize cold. Grounded in what the slides actually emphasise.
  7. **## Mehr dazu** — 2–4 curated, verified links (search with exa), each with what it helps with + duration/language. Only resources that reinforce the lecture's own topics.

  Tone: warm, clear, playful but substantive, no jargon left unexplained. Use the markdown that renders beautifully in `prose-notebook`: `##`/`###` headings, tables, ordered/unordered lists, **bold** lead-ins, and the occasional `>` blockquote as a memorable-principle pull-quote (renders as a soft callout card). No emojis in the text.
- **Quiz bank** — many sets, not one. Repetition welcome. Mix of types: factual recall, conceptual, trick/scenario, "spot the wrong answer", reverse (given answer, name the concept). Strictly grounded in the lecture MD. Anti-tells: every option roughly equal length, no give-away formatting, no obviously-filler wrong answers.
- **Übung walkthrough** — written in the **professor's method**: grounded in the lecture MD + the Lösung MD so the steps mirror how the professor actually solves it, not a generic textbook approach.
- **Exam walkthrough** — same, grounded in lectures + Übungen + the official solution if it exists.

The user's mental model is: this is a real notebook with chapters. Every chapter must read like the author understood the material; never like a transcript dump.
