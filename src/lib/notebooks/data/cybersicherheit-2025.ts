import type { Notebook } from "../types";

const BASE = "/content/cybersicherheit/2025";

const L = {
  vorlesung: { de: "Vorlesung", en: "Lecture" },
  uebung: { de: "Übung", en: "Exercise" },
  uebungCIntro: { de: "Übung (C-Einführung)", en: "Exercise (C primer)" },
  uebungExploits: { de: "Übung (Exploits)", en: "Exercise (Exploits)" },
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
      lecture: { pdf: { label: L.vorlesung, src: `${BASE}/lectures/01.pdf` } },
      exercises: [
        {
          label: L.uebung,
          aufgaben: { label: L.aufgaben, src: `${BASE}/uebungen/01/aufgaben.pdf` },
          solutions: [
            { label: L.loesung, src: `${BASE}/uebungen/01/loesung.pdf` },
            { label: L.zusatzhilfe, src: `${BASE}/uebungen/01/zusatzhilfe.pdf` },
          ],
        },
      ],
    },
    {
      number: 2,
      title: { de: "Einführung in die Kryptografie", en: "Introduction to cryptography" },
      lecture: { pdf: { label: L.vorlesung, src: `${BASE}/lectures/02.pdf` } },
      exercises: [
        {
          label: L.uebung,
          aufgaben: { label: L.aufgaben, src: `${BASE}/uebungen/02/aufgaben.pdf` },
          solutions: [
            { label: L.loesung, src: `${BASE}/uebungen/02/loesung.pdf` },
            { label: L.mitschrift, src: `${BASE}/uebungen/02/loesung-mitschrift.pdf` },
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
      lecture: { pdf: { label: L.vorlesung, src: `${BASE}/lectures/03.pdf` } },
      exercises: [
        {
          label: L.uebung,
          aufgaben: { label: L.aufgaben, src: `${BASE}/uebungen/03/aufgaben.pdf` },
          solutions: [
            { label: L.loesung, src: `${BASE}/uebungen/03/loesung.pdf` },
            { label: L.mitschrift, src: `${BASE}/uebungen/03/loesung-mitschrift.pdf` },
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
      lecture: { pdf: { label: L.vorlesung, src: `${BASE}/lectures/04.pdf` } },
      exercises: [
        {
          label: L.uebung,
          aufgaben: { label: L.aufgaben, src: `${BASE}/uebungen/04/aufgaben.pdf` },
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
      lecture: { pdf: { label: L.vorlesung, src: `${BASE}/lectures/05.pdf` } },
      exercises: [
        {
          label: L.uebung,
          aufgaben: { label: L.aufgaben, src: `${BASE}/uebungen/05/aufgaben.pdf` },
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
      lecture: { pdf: { label: L.vorlesung, src: `${BASE}/lectures/06.pdf` } },
      exercises: [
        {
          label: L.uebung,
          aufgaben: { label: L.aufgaben, src: `${BASE}/uebungen/06/aufgaben.pdf` },
          solutions: [{ label: L.loesung, src: `${BASE}/uebungen/06/loesung.pdf` }],
        },
      ],
    },
    {
      number: 7,
      title: { de: "Bitcoin & Hashing-Anwendungen", en: "Bitcoin & hashing use cases" },
      lecture: { pdf: { label: L.vorlesung, src: `${BASE}/lectures/07.pdf` } },
      exercises: [
        {
          label: L.uebung,
          aufgaben: { label: L.aufgaben, src: `${BASE}/uebungen/07/aufgaben.pdf` },
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
      lecture: { pdf: { label: L.vorlesung, src: `${BASE}/lectures/08.pdf` } },
      exercises: [
        {
          label: L.uebung,
          aufgaben: { label: L.aufgaben, src: `${BASE}/uebungen/08/aufgaben.pdf` },
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
      lecture: { pdf: { label: L.vorlesung, src: `${BASE}/lectures/09.pdf` } },
      exercises: [
        {
          label: L.uebung,
          aufgaben: { label: L.aufgaben, src: `${BASE}/uebungen/09/aufgaben.pdf` },
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
      lecture: { pdf: { label: L.vorlesung, src: `${BASE}/lectures/10.pdf` } },
      exercises: [
        {
          label: L.uebungCIntro,
          aufgaben: { label: L.aufgaben, src: `${BASE}/uebungen/10/aufgaben.pdf` },
          solutions: [],
        },
        {
          label: L.uebungExploits,
          aufgaben: { label: L.aufgaben, src: `${BASE}/uebungen/11/aufgaben.pdf` },
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
      lecture: { pdf: { label: L.vorlesung, src: `${BASE}/lectures/11.pdf` } },
      exercises: [
        {
          label: L.uebung,
          aufgaben: { label: L.aufgaben, src: `${BASE}/uebungen/12/aufgaben.pdf` },
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
      lecture: { pdf: { label: L.vorlesung, src: `${BASE}/lectures/12.pdf` } },
      exercises: [
        {
          label: L.uebung,
          aufgaben: { label: L.aufgaben, src: `${BASE}/uebungen/13/aufgaben.pdf` },
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
      lecture: { pdf: { label: L.vorlesung, src: `${BASE}/lectures/13.pdf` } },
      exercises: [{ label: L.uebung, solutions: [] }],
    },
  ],
};
