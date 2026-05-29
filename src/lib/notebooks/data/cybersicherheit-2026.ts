import type { Notebook } from "../types";

const BASE = "/content/cybersicherheit/2026";

const L = {
  vorlesung: { de: "Vorlesung", en: "Lecture" },
  uebung: { de: "Übung", en: "Exercise" },
  uebungVernam: { de: "Übung (Vernam & DES-S-Boxen)", en: "Exercise (Vernam & DES S-boxes)" },
  uebungDesRunde: { de: "Übung (DES-Runde & Avalanche)", en: "Exercise (DES round & avalanche)" },
  aufgabenDe: { de: "Aufgaben (deutsch)", en: "Exercises (German)" },
  aufgabenEn: { de: "Aufgaben (englisch)", en: "Exercises (English)" },
  loesung: { de: "Lösung", en: "Solution" },
} as const;

/**
 * Cybersicherheit SoSe 2026 — Davi, Universität Duisburg-Essen.
 *
 * Lesson↔Übung pairing was verified against the actual MD content of each sheet
 * (not by filename alone). The Übungsblatt number is NOT the lesson number:
 * lecture 1 (course-intro) is pure course-organisation + IT-security motivation
 * and teaches no cipher, so it carries no Übung. The classical-crypto sheet
 * (Übung 1) therefore tests lecture 2 (crypto-intro). Lecture 3 (DES) carries
 * TWO sheets: Übung 2 (Vernam/OTP + DES S-boxes) and Übung 2.2 (a full DES round,
 * avalanche, decryption). Übung 3 (Betriebsmodi + AES brute-force) sits on lecture
 * 4 (AES & Betriebsmodi), and Übung 4 (RSA + AES↔RSA comparison) on lecture 5 (RSA).
 * Lecture 6 (signatures/hash/MAC) has no Übung yet.
 *
 * Each Aufgaben sheet exists in German AND English — both are listed in the
 * exercise's `aufgaben` array so the reader can pick either language.
 */
export const cybersicherheit2026: Notebook = {
  subject: "cybersicherheit",
  year: 2026,
  term: "SoSe 2026",
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
      },
      // Reine Orga + Motivation — kein Übungsblatt.
      exercises: [],
    },
    {
      number: 2,
      title: { de: "Einführung in die Kryptografie", en: "Introduction to cryptography" },
      lecture: {
        pdf: { label: L.vorlesung, src: `${BASE}/lectures/02.pdf` },
      },
      // Übungsblatt 1 — klassische Kryptografie (Caesar, Transposition, Vigenère).
      exercises: [
        {
          label: L.uebung,
          aufgaben: [
            { label: L.aufgabenDe, src: `${BASE}/uebungen/01/aufgaben.pdf` },
            { label: L.aufgabenEn, src: `${BASE}/uebungen/01/aufgaben.en.pdf` },
          ],
          solutions: [{ label: L.loesung, src: `${BASE}/uebungen/01/loesung.pdf` }],
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
      },
      // Lecture 3 trägt zwei Blätter: Übung 2 (Vernam/OTP + DES-S-Boxen) und
      // Übung 2.2 (erste DES-Runde, Avalanche-Effekt, DES-Entschlüsselung).
      exercises: [
        {
          label: L.uebungVernam,
          aufgaben: [
            { label: L.aufgabenDe, src: `${BASE}/uebungen/02/aufgaben.pdf` },
            { label: L.aufgabenEn, src: `${BASE}/uebungen/02/aufgaben.en.pdf` },
          ],
          solutions: [{ label: L.loesung, src: `${BASE}/uebungen/02/loesung.pdf` }],
        },
        {
          label: L.uebungDesRunde,
          aufgaben: [
            { label: L.aufgabenDe, src: `${BASE}/uebungen/02_2/aufgaben.pdf` },
            { label: L.aufgabenEn, src: `${BASE}/uebungen/02_2/aufgaben.en.pdf` },
          ],
          solutions: [{ label: L.loesung, src: `${BASE}/uebungen/02_2/loesung.pdf` }],
        },
      ],
    },
    {
      number: 4,
      title: {
        de: "Symmetrische Kryptografie: AES & Betriebsmodi",
        en: "Symmetric cryptography: AES & block-cipher modes",
      },
      lecture: {
        pdf: { label: L.vorlesung, src: `${BASE}/lectures/04.pdf` },
      },
      // Übungsblatt 3 — Wiederholung + AES-Brute-Force + Betriebsmodi (ECB/CBC/OFB).
      exercises: [
        {
          label: L.uebung,
          aufgaben: [
            { label: L.aufgabenDe, src: `${BASE}/uebungen/03/aufgaben.pdf` },
            { label: L.aufgabenEn, src: `${BASE}/uebungen/03/aufgaben.en.pdf` },
          ],
          solutions: [{ label: L.loesung, src: `${BASE}/uebungen/03/loesung.pdf` }],
        },
      ],
    },
    {
      number: 5,
      title: {
        de: "Asymmetrische Kryptografie: RSA",
        en: "Asymmetric cryptography: RSA",
      },
      lecture: {
        pdf: { label: L.vorlesung, src: `${BASE}/lectures/05.pdf` },
      },
      // Übungsblatt 4 — RSA (Schlüsselerzeugung, Ver-/Entschlüsselung) + AES↔RSA-Vergleich.
      // Noch keine offizielle Lösung veröffentlicht.
      exercises: [
        {
          label: L.uebung,
          aufgaben: [
            { label: L.aufgabenDe, src: `${BASE}/uebungen/04/aufgaben.pdf` },
            { label: L.aufgabenEn, src: `${BASE}/uebungen/04/aufgaben.en.pdf` },
          ],
          solutions: [],
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
      },
      // Noch kein Übungsblatt zu diesem Kapitel.
      exercises: [],
    },
  ],
};
