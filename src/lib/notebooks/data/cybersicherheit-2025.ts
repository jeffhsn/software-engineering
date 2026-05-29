import type { Notebook } from "../types";

const BASE = "/content/cybersicherheit/2025";

const L = {
  vorlesung: { de: "Vorlesung", en: "Lecture" },
  uebung: { de: "Übung", en: "Exercise" },
  uebungCIntro: { de: "Übung (C-Einführung)", en: "Exercise (C primer)" },
  uebungExploits: { de: "Übung (Exploits)", en: "Exercise (Exploits)" },
  uebungModi: { de: "Übung (Betriebsmodi & RSA)", en: "Exercise (block modes & RSA)" },
  uebungWdh: { de: "Übung (Wiederholung)", en: "Exercise (recap)" },
  aufgaben: { de: "Aufgaben", en: "Exercises" },
  loesung: { de: "Lösung", en: "Solution" },
  zusatzhilfe: { de: "Zusatzhilfe", en: "Extra help" },
  mitschrift: { de: "Mitschrift", en: "Transcript" },
  loesungMultics: { de: "Lösung (Multics)", en: "Solution (Multics)" },
} as const;

/**
 * Cybersicherheit SoSe 2025 — Davi, Universität Duisburg-Essen.
 *
 * Lesson↔Übung pairing was verified against the actual MD content of each
 * Übungsblatt (not by filename or number alone). Titles below reflect the
 * lecture content, not the cover-slide titles that pdf-to-md extracted.
 *
 * The Übungsblatt number is NOT the lesson number: lecture 1 (11.04.) is pure
 * course-organisation + motivation and teaches no cipher, so it carries no
 * Übung. The first sheet (Übungsblatt 1, klassische Kryptografie) tests the
 * Caesar/Vigenère + modulare Arithmetik introduced in lecture 2 (25.04.).
 * Hence Übungsblätter 1–3 sit on lectures 2–4. Lecture 4 (AES, schliesst die
 * symmetrische Kryptografie ab) carries two sheets: Ü3 (Betriebsmodi/AES/RSA)
 * and the symmetric-crypto recap Ü4 (Grundlagen + AES-Brute-Force + Stromchiffre,
 * kein RSA). From lecture 5 on the numbers line up again (Ü5→L5 … Ü13→L12).
 * Lecture 13 is a pure Klausur-recap and likewise carries no Übung.
 */
export const cybersicherheit2025: Notebook = {
  subject: "cybersicherheit",
  year: 2025,
  term: "SoSe 2025",
  exams: [],
  lessons: [
    {
      number: 1,
      title: {
        de: "Kursorganisation & Einführung in die IT-Sicherheit",
        en: "Course organisation & introduction to IT security",
      },
      lecture: {
        pdf: { label: L.vorlesung, src: `${BASE}/lectures/01.pdf` },
        walkthroughId: "cs-2025-l01",
        quizBankId: "cs-2025-l1",
      },
      // Kein echtes Cyber-Übungsblatt (L1 ist Orga + Motivation), aber die
      // Grundlagenübung „Modulo & Binärrechnung" (die in den Folien als
      // freiwillige Wiederholung Modulo-Rechnung am 23.04. angekündigte
      // Mathe-Auffrischung) gehört genau hierher — reine Rechen-Vorbereitung,
      // noch keine Kryptografie. Die Datei liegt im Blatt-1-Bündel.
      exercises: [
        {
          label: L.uebung,
          aufgaben: [{ label: L.aufgaben, src: `${BASE}/uebungen/01/zusatzhilfe.pdf` }],
          walkthroughId: "cs-2025-u-prep",
          solutions: [],
        },
      ],
    },
    {
      number: 2,
      title: { de: "Einführung in die Kryptografie", en: "Introduction to cryptography" },
      lecture: {
        pdf: { label: L.vorlesung, src: `${BASE}/lectures/02.pdf` },
        walkthroughId: "cs-2025-l02",
        quizBankId: "cs-2025-l2",
      },
      // Übungsblatt 1 — klassische Kryptografie (Caesar, Transposition, Vigenère).
      // Die Zusatzhilfe (Modulo & Binär) ist KEINE Lösung dieses Blatts, sondern
      // eigenständige Rechen-Vorbereitung — sie hängt an Lecture 1.
      exercises: [
        {
          label: L.uebung,
          aufgaben: [{ label: L.aufgaben, src: `${BASE}/uebungen/01/aufgaben.pdf` }],
          walkthroughId: "cs-2025-u01",
          solutions: [
            { label: L.loesung, src: `${BASE}/uebungen/01/loesung.pdf` },
          ],
        },
      ],
    },
    {
      number: 3,
      title: {
        de: "Symmetrische Kryptografie: Stromchiffren & DES",
        en: "Symmetric cryptography: stream ciphers & DES",
      },
      lecture: {
        pdf: { label: L.vorlesung, src: `${BASE}/lectures/03.pdf` },
        walkthroughId: "cs-2025-l03",
        quizBankId: "cs-2025-l3",
      },
      // Übungsblatt 2 — Vernam/Stromchiffre, DES, S-Boxen, Feistelnetzwerk.
      exercises: [
        {
          label: L.uebung,
          aufgaben: [{ label: L.aufgaben, src: `${BASE}/uebungen/02/aufgaben.pdf` }],
          walkthroughId: "cs-2025-u02",
          solutions: [
            { label: L.loesung, src: `${BASE}/uebungen/02/loesung.pdf` },
            { label: L.mitschrift, src: `${BASE}/uebungen/02/loesung-mitschrift.pdf` },
          ],
        },
      ],
    },
    {
      number: 4,
      title: {
        de: "AES & asymmetrische Kryptografie: RSA-Schlüsselerzeugung",
        en: "AES & asymmetric cryptography: RSA key generation",
      },
      lecture: {
        pdf: { label: L.vorlesung, src: `${BASE}/lectures/04.pdf` },
        walkthroughId: "cs-2025-l04",
        quizBankId: "cs-2025-l4",
      },
      // Lecture 4 schliesst die symmetrische Kryptografie ab und trägt zwei
      // Blätter: Ü3 (Betriebsmodi/AES/RSA) und die Wiederholung Ü4
      // (Grundlagen + AES-Brute-Force + Stromchiffre, noch ohne RSA-Tiefe).
      exercises: [
        {
          label: L.uebungModi,
          aufgaben: [{ label: L.aufgaben, src: `${BASE}/uebungen/03/aufgaben.pdf` }],
          walkthroughId: "cs-2025-u03",
          solutions: [
            { label: L.loesung, src: `${BASE}/uebungen/03/loesung.pdf` },
            { label: L.mitschrift, src: `${BASE}/uebungen/03/loesung-mitschrift.pdf` },
          ],
        },
        {
          label: L.uebungWdh,
          aufgaben: [{ label: L.aufgaben, src: `${BASE}/uebungen/04/aufgaben.pdf` }],
          walkthroughId: "cs-2025-u04",
          solutions: [{ label: L.loesung, src: `${BASE}/uebungen/04/loesung.pdf` }],
        },
      ],
    },
    {
      number: 5,
      title: {
        de: "RSA-Verschlüsselung, digitale Signaturen & Hash-Einführung",
        en: "RSA encryption, digital signatures & hash intro",
      },
      lecture: {
        pdf: { label: L.vorlesung, src: `${BASE}/lectures/05.pdf` },
        walkthroughId: "cs-2025-l05",
        quizBankId: "cs-2025-l5",
      },
      exercises: [
        {
          label: L.uebung,
          aufgaben: [{ label: L.aufgaben, src: `${BASE}/uebungen/05/aufgaben.pdf` }],
          walkthroughId: "cs-2025-u05",
          solutions: [{ label: L.loesung, src: `${BASE}/uebungen/05/loesung.pdf` }],
        },
      ],
    },
    {
      number: 6,
      title: {
        de: "Digitale Signaturen, Hash-Funktionen & MAC",
        en: "Digital signatures, hash functions & MAC",
      },
      lecture: {
        pdf: { label: L.vorlesung, src: `${BASE}/lectures/06.pdf` },
        walkthroughId: "cs-2025-l06",
        quizBankId: "cs-2025-l6",
      },
      exercises: [
        {
          label: L.uebung,
          aufgaben: [{ label: L.aufgaben, src: `${BASE}/uebungen/06/aufgaben.pdf` }],
          walkthroughId: "cs-2025-u06",
          solutions: [{ label: L.loesung, src: `${BASE}/uebungen/06/loesung.pdf` }],
        },
      ],
    },
    {
      number: 7,
      title: { de: "Bitcoin & Hashing-Anwendungen", en: "Bitcoin & hashing use cases" },
      lecture: {
        pdf: { label: L.vorlesung, src: `${BASE}/lectures/07.pdf` },
        walkthroughId: "cs-2025-l07",
        quizBankId: "cs-2025-l7",
      },
      exercises: [
        {
          label: L.uebung,
          aufgaben: [{ label: L.aufgaben, src: `${BASE}/uebungen/07/aufgaben.pdf` }],
          walkthroughId: "cs-2025-u07",
          solutions: [{ label: L.loesung, src: `${BASE}/uebungen/07/loesung.pdf` }],
        },
      ],
    },
    {
      number: 8,
      title: {
        de: "Sicherheitsprotokolle & Schlüsselvereinbarung",
        en: "Security protocols & key agreement",
      },
      lecture: {
        pdf: { label: L.vorlesung, src: `${BASE}/lectures/08.pdf` },
        walkthroughId: "cs-2025-l08",
        quizBankId: "cs-2025-l8",
      },
      exercises: [
        {
          label: L.uebung,
          aufgaben: [{ label: L.aufgaben, src: `${BASE}/uebungen/08/aufgaben.pdf` }],
          walkthroughId: "cs-2025-u08",
          solutions: [{ label: L.loesung, src: `${BASE}/uebungen/08/loesung.pdf` }],
        },
      ],
    },
    {
      number: 9,
      title: {
        de: "DoS, Input Validation & Web-Sicherheit",
        en: "DoS, input validation & web security",
      },
      lecture: {
        pdf: { label: L.vorlesung, src: `${BASE}/lectures/09.pdf` },
        walkthroughId: "cs-2025-l09",
        quizBankId: "cs-2025-l9",
      },
      exercises: [
        {
          label: L.uebung,
          aufgaben: [{ label: L.aufgaben, src: `${BASE}/uebungen/09/aufgaben.pdf` }],
          walkthroughId: "cs-2025-u09",
          solutions: [{ label: L.loesung, src: `${BASE}/uebungen/09/loesung.pdf` }],
        },
      ],
    },
    {
      // Lecture 10 spans two weeks; two matching Übungsblätter:
      //   Ü10 — C-Einführung (no official Lösung)
      //   Ü11 — Software-Exploits (with Lösung)
      number: 10,
      title: { de: "Software-Exploits", en: "Software exploits" },
      lecture: {
        pdf: { label: L.vorlesung, src: `${BASE}/lectures/10.pdf` },
        walkthroughId: "cs-2025-l10",
        quizBankId: "cs-2025-l10",
      },
      exercises: [
        {
          label: L.uebungCIntro,
          aufgaben: [{ label: L.aufgaben, src: `${BASE}/uebungen/10/aufgaben.pdf` }],
          walkthroughId: "cs-2025-u10",
          solutions: [],
        },
        {
          label: L.uebungExploits,
          aufgaben: [{ label: L.aufgaben, src: `${BASE}/uebungen/11/aufgaben.pdf` }],
          walkthroughId: "cs-2025-u11",
          solutions: [{ label: L.loesung, src: `${BASE}/uebungen/11/loesung.pdf` }],
        },
      ],
    },
    {
      number: 11,
      title: {
        de: "Betriebssystemsicherheit: Multics & TEE",
        en: "OS security: Multics & TEE",
      },
      lecture: {
        pdf: { label: L.vorlesung, src: `${BASE}/lectures/11.pdf` },
        walkthroughId: "cs-2025-l11",
        quizBankId: "cs-2025-l11",
      },
      exercises: [
        {
          label: L.uebung,
          aufgaben: [{ label: L.aufgaben, src: `${BASE}/uebungen/12/aufgaben.pdf` }],
          walkthroughId: "cs-2025-u12",
          solutions: [
            { label: L.loesung, src: `${BASE}/uebungen/12/loesung.pdf` },
            { label: L.loesungMultics, src: `${BASE}/uebungen/12/loesung-multics.pdf` },
          ],
        },
      ],
    },
    {
      number: 12,
      title: { de: "Reverse Engineering & Malware", en: "Reverse engineering & malware" },
      lecture: {
        pdf: { label: L.vorlesung, src: `${BASE}/lectures/12.pdf` },
        walkthroughId: "cs-2025-l12",
        quizBankId: "cs-2025-l12",
      },
      exercises: [
        {
          label: L.uebung,
          aufgaben: [{ label: L.aufgaben, src: `${BASE}/uebungen/13/aufgaben.pdf` }],
          walkthroughId: "cs-2025-u13",
          solutions: [{ label: L.loesung, src: `${BASE}/uebungen/13/loesung.pdf` }],
        },
      ],
    },
    {
      // Pure recap / exam-prep lecture — no Übung.
      number: 13,
      title: {
        de: "Zusammenfassung & Klausurvorbereitung",
        en: "Summary & exam preparation",
      },
      lecture: {
        pdf: { label: L.vorlesung, src: `${BASE}/lectures/13.pdf` },
        walkthroughId: "cs-2025-l13",
        quizBankId: "cs-2025-l13",
      },
      // Reine Zusammenfassung / Klausurvorbereitung — kein Übungsblatt.
      exercises: [],
    },
  ],
};
