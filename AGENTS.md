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
│   ├── 01/                 # KEEP the original Übungsblatt number; the lecture↔Übung
│   │   │                   #   match lives in the registry's Lesson.exercises refs, BY CONTENT.
│   │   │                   #   (Ü-numbers rarely equal lesson-numbers — see Matching playbook.)
│   │   ├── aufgaben.pdf
│   │   ├── aufgaben.md
│   │   ├── loesung.pdf     # optional, repeatable: loesung-mitschrift.pdf, loesung-multics.pdf …
│   │   ├── loesung.md
│   │   └── zusatzhilfe.pdf # optional — a bundled helper is NOT automatically a Lösung
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

**This pipeline runs automatically the moment any new material lands.** The user should never have to say "convert it" or "now match it up" — the moment I see a new PDF (or am pointed at one), I run it before anything else. I do not generate quizzes, explanations, or wire anything in until conversion + classification + matching is done.

## Order of operations — every time, never changes

1. **Convert** every PDF with `pdf-to-md` so I can read its *exact* content. Conversion is what gives me the detailed chapter knowledge that makes every later step (matching, explanations, quizzes, summaries, exams, translation) correct.
2. **Triage / classify** each file by what it *is* — lecture, Übung (Aufgaben / Lösung / Mitschrift), a Grundlagen-/prep helper, Zusammenfassung, Cheatsheet, or Klausur. The filename and number are hypotheses; the content decides.
3. **Place & match by content** (see *Matching playbook* below): lectures get chapter numbers; Übungen get wired to the lecture they actually test.
4. **Report placement**, then generate the per-lecture AI artefacts (one explanation, one quiz bank) and wire everything into the registry.

**Sequencing of the whole notebook:** lectures + their Übungen + per-chapter explanations + quizzes come **first** and must be solid. Zusammenfassungen, Cheatsheets and Klausuren are notebook-level and **deferred** — I still convert and file any the user drops, but the polished AI versions come *later*, on request, once the chapters are done. **Translation comes dead last** (see *Translation* at the end). The per-type table is the detail for each kind.

## Step-by-step by material type

| You drop… | I do |
|---|---|
| **Lecture PDF** | 1. Locate the right notebook (subject + year) — create it if missing. 2. Pick the chapter number by reading the MD against existing lectures; rename if the original number conflicts with content. 3. `pdf-to-md` → `lectures/NN.md`. 4. Report placement. 5. Write ONE excellent explanation grounded in the MD (single text, works for any level). 6. Build a quiz **bank** (many sets, mixed types, anti-tells, strictly grounded). 7. Wire into the `Lesson`. |
| **Übung Aufgaben / Lösung / Mitschrift / Zusatzhilfe** | 1. Convert → sibling MD. 2. **Classify** it (real Aufgabenblatt? a Lösung/Mitschrift? a prep/Grundlagen helper?). 3. **Match by content** to the lecture it tests — never trust the number (see *Matching playbook*). 4. Store under `uebungen/<original-Blatt-NN>/` and express the match by referencing that folder from the right `Lesson.exercises` in the registry (this is why one lesson can carry two Übungen and another none). 5. Report placement. 6. Write AI walkthrough grounded in the matched lecture's MD + the Lösung MD. |
| **Zusammenfassung PDF** | Convert → `zusammenfassung/original.md`. Set `notebook.zusammenfassung = { source: 'user', pdf, mdSrc }`. Skip the AI fallback. |
| **Cheatsheet PDF** | Same, under `cheatsheet/`. |
| **Exam PDF (+ optional Lösung)** | Convert each → `klausuren/real/<label>/...md`. Append an `Exam` entry with `kind: 'real'`. Write AI walkthrough grounded in lectures + Übungen + the official solution if present. |
| **YouTube link for a lecture** | Write the URL into `lectures/NN.video.txt` (or set `lecture.videoUrl` directly if already in the data file). |
| **"Generate practice exam"** (no new material, user request) | Only if ≥1 real exam exists in the notebook. Author a new exam mirroring its structure, grounded in lectures + Übungen + the real exam's wording. File under `klausuren/practice/`. Append an `Exam` entry with `kind: 'practice'` and `basedOn: <real-exam-id>`. |
| **"Generate Zusammenfassung / Cheatsheet"** (no new material, user request) | Only if none provided. Write `zusammenfassung/ai.md` (or `cheatsheet/ai.md`) by stitching every lecture MD. Set `source: 'ai'`. |

## Matching playbook — content over numbers

The Übungsblatt number is a hypothesis, never the answer. Match every sheet to the lecture it actually *tests*, by content. These rules are general — they hold for every subject and year:

- **Read the lecture spine.** Each lecture MD opens with a *Rückblick und Agenda* / *Themen heute* slide and usually carries a date. That tells me precisely what was taught, and when. A sheet belongs to the lecture whose taught content it *requires* — ask: "could a student even do this sheet right after that lecture?"
- **Numbers usually shift by one.** The first lecture is typically pure Kursorganisation + Motivation and teaches no real skill → it carries **no Übung**. So Übungsblatt 1 tests the first *content* lecture (often lecture 2), and the whole Übung sequence is shifted.
- **A pure recap / Klausurvorbereitung lecture** (usually the last one) likewise carries **no Übung**.
- **Counts won't line up — that's expected.** When there are more sheets than content lectures, the slack is absorbed by either (a) a lecture that **spans two weeks** → it carries two sheets, or (b) a **consolidation / Wiederholung sheet** that recaps several earlier lectures → hang it on the last lecture of the block it recaps. Give a lecture's two Übungen distinct labels.
- **Prep / Grundlagen material is neither an Übung nor a Lösung.** A maths refresher (e.g. *Modulo & Binärrechnung*) or a "how to compute" helper is calculation prep, not subject content — attach it to the **intro lecture** as its own prep Übung, never as a solution to a real sheet.
- **A bundled helper (e.g. a "Zusatzhilfe") is not automatically the Lösung** of the sheet it shipped with. Classify it by its own content; it may belong to a different lecture entirely.
- **No Übung → no chip.** Never invent a phantom empty Übung for a lecture that genuinely has none (set `exercises: []`). But keep the chip whenever a lecture has *any* Übung material — even a Lösung without its Aufgaben.

After matching, sanity-check in the browser: open the affected chapters, confirm the chips read right, the right column degrades gracefully when a Lösung is missing, and there are **0 console errors**.

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

- **Explanation — the system: „Stell dir vor, du hast keine Folien."** Each lecture gets ONE explanation, German canonical. The mental model is radical and **fixed**: the explanation is **not a companion to the slides — it replaces them.** It is the lecture, the textbook chapter, and the professor's office hour rolled into one continuous text. The acid test, applied to every paragraph: *a student who never opens the PDF should, from this text alone, understand the whole chapter, see how each idea connects to the next, answer any quiz question, solve the Übung by hand, and pass the Klausur.* If something important lives only on the slides and not here, the explanation has failed. This recipe **applies to every lecture and every future subject.**

  Because it stands alone, the explanation is **long** — much longer than the slides — and it **teaches from zero.** Never write "auf den Folien sieht man …", "wie die Vorlesung zeigt …", or any reference to a slide the reader can't see. Build every idea from an everyday intuition and *then* make it precise. Assume a smart, motivated student who simply wasn't in the room and has nothing but your text.

  **Process — run these steps in order, every time:**

  1. **Read everything that grounds the chapter.** The lecture `lectures/NN.md`, the matched `uebungen/NN/aufgaben.md` (+ every `loesung*.md`), and — for later chapters — the explanations of the earlier lectures it builds on. The slides give the skeleton plus the exact terms/notation to use; the **Übung reveals what is actually tested** and how the professor dresses up exam questions. The explanation must teach all of the first and fully prepare the reader for the second.
  2. **Find the spine, then expand — never compress.** Identify the ONE core idea and the concepts the lecture builds, ordered as a story (problem → idea → mechanism → consequence). Mark each *conceptual* or *computable*. Unlike a summary, the job is to **unfold**: give every concept room to breathe.
  3. **Source rich, verified media — no artificial limit.** Use exa to find inline links, explainer **videos**, and **as many diagrams/images as genuinely help** (one per visual concept is the floor, not the cap). Verify every image before using it: query the Commons API for the canonical upload URL, then `curl -sIL "<url>" | grep -i content-type` must report `image/*`. Never invent or guess a URL. Prefer Wikimedia Commons; embed with a descriptive caption.
  4. **Write it** — long, expansive, second person, in the structure below.
  5. **Verify it renders.** `npx tsc --noEmit`, then load the chapter in the browser: every image loads, no leftover literal `![…]`, 0 console errors.

  **Structure — STORY FIRST, recap LAST:**

  - **Lead** (no heading) — a hook that frames the chapter as a problem or question and previews the arc, **without referencing slides**. Make the reader curious and tell them where the story is heading.
  - **Narrative body** — several `##` sections with chapter-specific names. This is the heart and the bulk. **Depth rule (non-negotiable):** *every* concept is unfolded over **multiple connected paragraphs** in the rhythm everyday-picture → precise mechanism → why it matters → how it connects forward/back to the rest of the course. Never a heading followed by one terse paragraph, and **never a bullet list standing in for teaching** (bullets read like slides — forbidden in the body). Define every term the first time it appears. Anticipate the reader's confusion out loud ("hier stolpern viele, weil …"). **For every *computable* concept, include a `### Schritt für Schritt` with a fully worked small-number example in the Übung's exact style** (Caesar/Vigenère by hand, an ECB/CBC encryption, a DES round, RSA/Diffie-Hellman by hand, a rings-&-brackets decision …) — narrate each step so the reader can reproduce it under exam pressure. Weave inline links where a concept appears, embed a verified diagram on every visual concept, and drop a `> **Eselsbrücke:**` / `> **Merksatz:**` callout at each memorizable fact (mnemonic, acronym like E-X-S-P / S-S-M-A / Z-E-L, key formula).
  - **Recap & reference tail (only after the story):** `## Auf den Punkt` (concise recap of the whole arc) → `## Begriffe & Notation` (glossary table) → `## Typische Fallen` (common mistakes as prose: trap → correction) → `## Klausur-Fokus` (honest exam prep **grounded in the Übung** — the exact hand-computations and question shapes the prof drills) → `## Mehr dazu` (a handful of verified links/videos for going deeper).

  **Definition of done — all must be true:** stands completely alone (a reader with no slides learns the whole chapter); zero slide references; story-first with no top summary; every body concept spans several connected paragraphs (never bullets); every computable concept has a fully worked Schritt-für-Schritt example in the Übung's style; rich verified media (a diagram on every visual concept, videos where they help); memory-aid callouts at every memorizable fact; the recap tail present; Klausur-Fokus mirrors the Übung; renders with 0 console errors.

  **Tone & rendering:** warm, second person, the patient professor you wish you'd had — playful but substantive, no jargon left unexplained, no emojis. Use the markdown that `prose-notebook` renders well: `##`/`###` headings, tables only for genuine comparisons/reference (never as a stand-in for prose), **bold** lead-ins, `>` callouts.

  **Gotchas (these have bitten before):** the whole body is one TS template literal, so **never use a backtick** inside the content (use **bold** for code-ish terms); and **never use a straight `"` inside a markdown image title** — it closes the title and the image renders as literal text (use German „ " or no inner quotes).
- **Quiz bank — the system.** The goal is that the student *memorizes and perfects* each chapter, so every lecture gets a **bank of many quizzes** where (a) each quiz alone covers the whole chapter, and (b) the quizzes differ in angle, wording and format so re-takes never feel like reciting one memorized run. Repetition across quizzes is welcome; tricks and hard questions are welcome — the only test is "does practising this make the Übung and the Klausur easier?" This recipe is **fixed and applies to every lecture and every future subject**.

  **Data model** (`src/lib/notebooks/quiz-types.ts`): one `QuizSet` per lesson (id `cs-<year>-l<N>`, referenced by `Lecture.quizBankId`, authored in `quizzes/<subject>-<year>.ts`), holding many `Quiz` objects. Each `Quiz` has a `theme`, a `title`, a one-line `description`, `lesson`, and `questions: Question[]`. A `Question` is `mcq` (≥4 options, one `correct` index, `explanation`) or `tf` (statement, bool, `explanation`), each tagged `difficulty`. **Every question carries a short `explanation`** — that is what turns a wrong answer into learning.

  **Results persist automatically (already wired).** `QuizPlayer` saves every attempt to `localStorage` via `usePersistedState` (namespaced `se-bsc:v1:`) under the key `quiz:<quizId>:attempts`; the picker shows each quiz's attempt count and best %, and the summary screen flags a new best. Because `localStorage` is per browser/profile, friends on their own machines each keep their own history with no server and no login. **Keep every `Quiz.id` stable forever** — renaming an id silently orphans a student's saved history.

  **The themed menu — author quizzes from this fixed list** (skip any that don't apply, repeat any with lots of material). The first one or two are *complete* runs; the rest are *angles* on the same material:

  1. **Komplettdurchlauf** (`complete`) — the long one, ~20–30 Q, walks the whole chapter in lecture order. "If you ace this, you know the chapter." Build 1–2 distinct versions so a re-take isn't the identical run.
  2. **Begriffe & Notation** (`terms`) — definitions, vocabulary, symbols; pure recall.
  3. **Konzepte & Verständnis** (`concepts`) — why/how, cause→effect, "which mechanism/goal applies".
  4. **Szenario & Anwendung** (`scenario`) — a situation is described, pick the right diagnosis/fix; mirrors how the prof dresses up exam questions.
  5. **Rechnen / Schritt für Schritt** (`compute`) — for *every computable skill the Übung drills* (Caesar, ECB/CBC, RSA, DES-Runde, Diffie-Hellman, Ringe & Klammern, Modulo/Binär …), worked questions with small numbers. Skip for purely conceptual chapters.
  6. **Wahr/Falsch-Blitzrunde** (`truefalse`) — fast TF sweep over the whole chapter; surfaces shaky spots.
  7. **Typische Fallen / Fehlersuche** (`traps`) — built from the chapter's common misconceptions ("spot the wrong statement"); deliberately tricky.
  8. **Reverse — nenne den Begriff** (`reverse`) — given a description or a result, name the concept/term.
  9. **Gemischt** (`mixed`) — a fresh shuffle re-asking everything in new wording, to keep later re-takes honest.

  **Exhaustive coverage is the hard requirement — completeness beats brevity.** The bar: *after working through a chapter's bank, there is no piece of knowledge from that lecture the student hasn't been tested on.* Walk the lecture MD **and its explanation** end to end and make sure every fact, definition, name, number, principle, mechanism, mnemonic and worked skill appears in at least one question. Length is not a concern — if a chapter needs 15 quizzes and 250 questions to leave no gap, write them. As a floor, aim for **at least ~10 quizzes per chapter, ~12–25 questions each** (rich chapters need far more). The same fact appearing in several quizzes, worded differently, is encouraged. Only genuinely non-examinable logistics (room numbers, exact deadlines) may be skipped; everything substantive must be covered.

  **Design for memorization, not just testing.** The goal is that the student *memorizes and internalises* the chapter through the bank. So engineer retrieval: (1) ask the same fact from multiple directions — recognition (MCQ), discrimination (Wahr/Falsch), cued recall (Reverse: given the definition, name the term), and production (compute it). (2) Turn every mnemonic/acronym the explanation introduces (e.g. Z-E-L, E-X-S-P, S-S-M-A) into its own question. (3) Repeat the load-bearing facts across several quizzes in fresh wording so they survive spaced re-takes. (4) Make distractors the *actual* confusable neighbours (the things students mix up), so a correct answer proves real discrimination. (5) Keep each `explanation` a crisp, self-contained recall cue, not just a verdict. If a fact is worth knowing, it should be reachable by at least two different question shapes.

  **Anti-tells & difficulty — the #1 rule, non-negotiable.** A question must be *impossible to answer correctly without knowing the material*. The single most common failure is a question that gives itself away by the *shape* of the options instead of their content. Audit every MCQ with this test: **cover the answer key — could a clueless student still pick the right option from the options alone?** If yes, it's broken. Specifically:
  - **Equal length & shape.** All options sit within a few words of each other. The correct answer is *never* systematically the longest, the most detailed, the most hedged, or the most "textbook-worded" one — that length/specificity tell is exactly what we forbid. If the right answer needs more words, pad the distractors to match (or trim it).
  - **No grammatical / formatting tells.** Every option agrees with the stem (article, number, tense), same capitalization, same punctuation, same register. Nothing stands out as "the one written more carefully".
  - **Distractors are genuine confusable neighbours.** Each wrong option is something a half-prepared student really believes — the actual mix-up (Integrität↔Vertraulichkeit, Kryptografie↔Kryptanalyse, symmetrisch↔asymmetrisch, „schwächstes" ↔ „stärkstes Glied"). Never filler, never absurd, never a joke option. Eliminating a distractor should require knowing the precise fact.
  - **No meta-options.** No "Alle der genannten", "Keine der genannten", "A und C" — they are lazy tells. Every option is a concrete standalone claim.
  - **Vary the correct position.** Spread `correct` roughly evenly across A/B/C/D within a quiz; balance true/false in TF runs. Never let position-memory beat a re-take.
  - **No absolute-word giveaways.** *immer / nie / alle / keinesfalls* appear only when genuinely correct, not as a signal.

  **Difficulty floor — no `easy`, ever.** Every question is tagged `medium` or `hard`. A student who merely skimmed once should *not* breeze through. `medium` = solid recall/understanding plus real discrimination between close options; `hard` = multi-step reasoning, a subtle trap, or a full hand-computation. Recognition gimmes inflate the score and teach nothing — banned. (Existing banks were authored before this rule; sweeping them up to standard is its own task.)

  **Process — run in order, every time:**
  1. **Read the sources.** The chapter's `lectures/NN.md`, its matched `uebungen/NN/aufgaben.md` (+ `loesung.md`), and the chapter's explanation. The lecture defines what's true; the **Übung defines what's tested** — drive the `compute` and `scenario` quizzes straight from it. Ground every question; no outside facts, no cross-chapter bleed.
  2. **Author** the bank from the menu. German canonical (leave `en` minimal — translation is the final pass).
  3. **Apply the anti-tells & difficulty floor above to every single question** as you write it — this is not a final polish, it is how each question is born.
  4. **Explanations:** each question's `explanation` says why the right answer is right and, where useful, why the tempting wrong one is wrong — one or two grounded sentences.
  5. **Wire it:** add the `QuizSet` to `quizzes/<subject>-<year>.ts`, set `quizBankId` on the lesson's `lecture` in the registry data.
  6. **Verify:** `npx tsc --noEmit`, then open the chapter → Quiz in the browser, run a quiz end to end, confirm the picker lists every quiz, answers + explanations show, **0 console errors**.

  **Definition of done — all must be true:** **exhaustive coverage** (every substantive fact in the lecture MD is tested somewhere in the bank — no gaps); many quizzes from the themed menu; ≥1 complete-run quiz that covers the chapter single-handed; every computable Übung skill has worked questions; every question grounded and carrying a short explanation; **no `easy` questions**; **anti-tells respected (no length/shape/grammar/meta-option giveaways; correct position varied)**; same German-quote-in-TS rule as explanations (never an ASCII `"` closing a German quote — use „ " or none); wired with `quizBankId`; renders with 0 console errors.
- **Übung walkthrough** — written in the **professor's method**: grounded in the lecture MD + the Lösung MD so the steps mirror how the professor actually solves it, not a generic textbook approach.
- **Exam walkthrough** — same, grounded in lectures + Übungen + the official solution if it exists.

The user's mental model is: this is a real notebook with chapters. Every chapter must read like the author understood the material; never like a transcript dump.

# Translation comes dead last

German is the canonical language for **everything** I author — chapter titles, chip labels, explanations, quiz banks, walkthroughs, and UI strings. When I create a new `LocalizedText`, I write the `de` field properly and may leave `en` (and any future language) as a quick mirror or placeholder. I do **not** polish translations as I go.

A single, dedicated translation pass happens **only at the very end**, once we have stopped adding and restructuring material for the notebook (lectures, Übungen, explanations, quizzes, then summaries/cheatsheets/exams). Translating earlier just means redoing it every time content moves. When that pass comes, it localises every `de` string the notebook accumulated — nothing is exempt.
