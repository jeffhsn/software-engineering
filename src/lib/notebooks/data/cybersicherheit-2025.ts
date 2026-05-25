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

export const cybersicherheit2025: Notebook = {
  subject: "cybersicherheit",
  year: 2025,
  term: "SoSe 2025",
  lessons: [
    {
      number: 1,
      title: {
        de: "Kursorganisation & Grundlagen IT-Sicherheit",
        en: "Course organisation & IT security fundamentals",
      },
      lecture: {
        pdf: { label: L.vorlesung, src: `${BASE}/lectures/01.pdf` },
        walkthroughId: "cybersicherheit-2025-l1",
        quizSetId: "cybersicherheit-2025-l1",
      },
      exercises: [
        {
          label: L.uebung,
          aufgaben: { label: L.aufgaben, src: `${BASE}/uebungen/01/aufgaben.pdf` },
          solutions: [
            { label: L.loesung, src: `${BASE}/uebungen/01/loesung.pdf` },
            { label: L.zusatzhilfe, src: `${BASE}/uebungen/01/zusatzhilfe.pdf` },
          ],
          walkthroughId: "cybersicherheit-2025-ue1",
        },
      ],
    },
    {
      number: 2,
      title: { de: "Einführung Kryptografie", en: "Introduction to cryptography" },
      lecture: {
        pdf: { label: L.vorlesung, src: `${BASE}/lectures/02.pdf` },
        walkthroughId: "cybersicherheit-2025-l2",
        quizSetId: "cybersicherheit-2025-l2",
      },
      exercises: [
        {
          label: L.uebung,
          aufgaben: { label: L.aufgaben, src: `${BASE}/uebungen/02/aufgaben.pdf` },
          solutions: [
            { label: L.loesung, src: `${BASE}/uebungen/02/loesung.pdf` },
            { label: L.mitschrift, src: `${BASE}/uebungen/02/loesung-mitschrift.pdf` },
          ],
          walkthroughId: "cybersicherheit-2025-ue2",
        },
      ],
    },
    {
      number: 3,
      title: { de: "Symmetrische Kryptografie · DES", en: "Symmetric cryptography · DES" },
      lecture: {
        pdf: { label: L.vorlesung, src: `${BASE}/lectures/03.pdf` },
        walkthroughId: "cybersicherheit-2025-l3",
        quizSetId: "cybersicherheit-2025-l3",
      },
      exercises: [
        {
          label: L.uebung,
          aufgaben: { label: L.aufgaben, src: `${BASE}/uebungen/03/aufgaben.pdf` },
          solutions: [
            { label: L.loesung, src: `${BASE}/uebungen/03/loesung.pdf` },
            { label: L.mitschrift, src: `${BASE}/uebungen/03/loesung-mitschrift.pdf` },
          ],
          walkthroughId: "cybersicherheit-2025-ue3",
        },
      ],
    },
    {
      number: 4,
      title: {
        de: "AES & Einführung asymmetrische Kryptografie",
        en: "AES & introduction to asymmetric cryptography",
      },
      lecture: {
        pdf: { label: L.vorlesung, src: `${BASE}/lectures/04.pdf` },
        walkthroughId: "cybersicherheit-2025-l4",
        quizSetId: "cybersicherheit-2025-l4",
      },
      exercises: [
        {
          label: L.uebung,
          aufgaben: { label: L.aufgaben, src: `${BASE}/uebungen/04/aufgaben.pdf` },
          solutions: [{ label: L.loesung, src: `${BASE}/uebungen/04/loesung.pdf` }],
          walkthroughId: "cybersicherheit-2025-ue4",
        },
      ],
    },
    {
      number: 5,
      title: { de: "RSA-Kryptosystem", en: "RSA cryptosystem" },
      lecture: {
        pdf: { label: L.vorlesung, src: `${BASE}/lectures/05.pdf` },
        walkthroughId: "cybersicherheit-2025-l5",
        quizSetId: "cybersicherheit-2025-l5",
      },
      exercises: [
        {
          label: L.uebung,
          aufgaben: { label: L.aufgaben, src: `${BASE}/uebungen/05/aufgaben.pdf` },
          solutions: [{ label: L.loesung, src: `${BASE}/uebungen/05/loesung.pdf` }],
          walkthroughId: "cybersicherheit-2025-ue5",
        },
      ],
    },
    {
      number: 6,
      title: { de: "Digitale Signaturen, Hash, MAC", en: "Digital signatures, hash, MAC" },
      lecture: {
        pdf: { label: L.vorlesung, src: `${BASE}/lectures/06.pdf` },
        walkthroughId: "cybersicherheit-2025-l6",
        quizSetId: "cybersicherheit-2025-l6",
      },
      exercises: [
        {
          label: L.uebung,
          aufgaben: { label: L.aufgaben, src: `${BASE}/uebungen/06/aufgaben.pdf` },
          solutions: [{ label: L.loesung, src: `${BASE}/uebungen/06/loesung.pdf` }],
          walkthroughId: "cybersicherheit-2025-ue6",
        },
      ],
    },
    {
      number: 7,
      title: { de: "Bitcoin", en: "Bitcoin" },
      lecture: {
        pdf: { label: L.vorlesung, src: `${BASE}/lectures/07.pdf` },
        walkthroughId: "cybersicherheit-2025-l7",
        quizSetId: "cybersicherheit-2025-l7",
      },
      exercises: [
        {
          label: L.uebung,
          aufgaben: { label: L.aufgaben, src: `${BASE}/uebungen/07/aufgaben.pdf` },
          solutions: [{ label: L.loesung, src: `${BASE}/uebungen/07/loesung.pdf` }],
          walkthroughId: "cybersicherheit-2025-ue7",
        },
      ],
    },
    {
      number: 8,
      title: {
        de: "Sicherheitsprotokolle · Schlüsselvereinbarung",
        en: "Security protocols · key agreement",
      },
      lecture: {
        pdf: { label: L.vorlesung, src: `${BASE}/lectures/08.pdf` },
        walkthroughId: "cybersicherheit-2025-l8",
        quizSetId: "cybersicherheit-2025-l8",
      },
      exercises: [
        {
          label: L.uebung,
          aufgaben: { label: L.aufgaben, src: `${BASE}/uebungen/08/aufgaben.pdf` },
          solutions: [{ label: L.loesung, src: `${BASE}/uebungen/08/loesung.pdf` }],
          walkthroughId: "cybersicherheit-2025-ue8",
        },
      ],
    },
    {
      number: 9,
      title: {
        de: "Sicherheitsprotokolle · DoS, Input Validation, Web",
        en: "Security protocols · DoS, input validation, web",
      },
      lecture: {
        pdf: { label: L.vorlesung, src: `${BASE}/lectures/09.pdf` },
        walkthroughId: "cybersicherheit-2025-l9",
        quizSetId: "cybersicherheit-2025-l9",
      },
      exercises: [
        {
          label: L.uebung,
          aufgaben: { label: L.aufgaben, src: `${BASE}/uebungen/09/aufgaben.pdf` },
          solutions: [{ label: L.loesung, src: `${BASE}/uebungen/09/loesung.pdf` }],
          walkthroughId: "cybersicherheit-2025-ue9",
        },
      ],
    },
    {
      // Lecture 10 spans two weeks. Two matching exercise sheets:
      // - Übungsblatt 10: C primer (no official Lösung, just a walkthrough)
      // - Übungsblatt 11: Software exploits (the real thing, with Lösung)
      number: 10,
      title: { de: "Software-Exploits", en: "Software exploits" },
      lecture: {
        pdf: { label: L.vorlesung, src: `${BASE}/lectures/10.pdf` },
        walkthroughId: "cybersicherheit-2025-l10",
        quizSetId: "cybersicherheit-2025-l10",
      },
      exercises: [
        {
          label: L.uebungCIntro,
          aufgaben: { label: L.aufgaben, src: `${BASE}/uebungen/10/aufgaben.pdf` },
          solutions: [],
          walkthroughId: "cybersicherheit-2025-ue10",
        },
        {
          label: L.uebungExploits,
          aufgaben: { label: L.aufgaben, src: `${BASE}/uebungen/11/aufgaben.pdf` },
          solutions: [{ label: L.loesung, src: `${BASE}/uebungen/11/loesung.pdf` }],
          walkthroughId: "cybersicherheit-2025-ue11",
        },
      ],
    },
    {
      number: 11,
      title: { de: "Betriebssystemsicherheit · Multics & TEE", en: "OS security · Multics & TEE" },
      lecture: {
        pdf: { label: L.vorlesung, src: `${BASE}/lectures/11.pdf` },
        walkthroughId: "cybersicherheit-2025-l11",
        quizSetId: "cybersicherheit-2025-l11",
      },
      exercises: [
        {
          label: L.uebung,
          aufgaben: { label: L.aufgaben, src: `${BASE}/uebungen/12/aufgaben.pdf` },
          solutions: [
            { label: L.loesung, src: `${BASE}/uebungen/12/loesung.pdf` },
            { label: L.loesungMultics, src: `${BASE}/uebungen/12/loesung-multics.pdf` },
          ],
          walkthroughId: "cybersicherheit-2025-ue12",
        },
      ],
    },
    {
      number: 12,
      title: { de: "Reverse Engineering & Malware", en: "Reverse engineering & malware" },
      lecture: {
        pdf: { label: L.vorlesung, src: `${BASE}/lectures/12.pdf` },
        walkthroughId: "cybersicherheit-2025-l12",
        quizSetId: "cybersicherheit-2025-l12",
      },
      exercises: [
        {
          label: L.uebung,
          aufgaben: { label: L.aufgaben, src: `${BASE}/uebungen/13/aufgaben.pdf` },
          solutions: [{ label: L.loesung, src: `${BASE}/uebungen/13/loesung.pdf` }],
          walkthroughId: "cybersicherheit-2025-ue13",
        },
      ],
    },
    {
      // Lecture 13 is a recap/exam-prep lecture — no dedicated Übung, but
      // the empty Übung chip is preserved on the left per the always-show
      // policy.
      number: 13,
      title: { de: "Zusammenfassung & Klausurvorbereitung", en: "Summary & exam preparation" },
      lecture: {
        pdf: { label: L.vorlesung, src: `${BASE}/lectures/13.pdf` },
        walkthroughId: "cybersicherheit-2025-l13",
        quizSetId: "cybersicherheit-2025-l13",
      },
      exercises: [{ label: L.uebung, solutions: [] }],
    },
  ],
  extras: [
    {
      label: "Übungs-Zusammenfassung (Aufgaben)",
      src: `${BASE}/uebungen/_zusammenfassung.pdf`,
    },
  ],
};
