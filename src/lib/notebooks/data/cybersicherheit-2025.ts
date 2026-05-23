import type { Notebook } from "../types";

const BASE = "/content/cybersicherheit/2025";

export const cybersicherheit2025: Notebook = {
  subject: "cybersicherheit",
  year: 2025,
  term: "SoSe 2025",
  lessons: [
    {
      number: 1,
      title: "Kursorganisation & Grundlagen IT-Sicherheit",
      read: [
        { label: "Vorlesung", kind: "pdf", src: `${BASE}/lectures/01.pdf` },
      ],
      practice: [
        { label: "Aufgaben", kind: "pdf", src: `${BASE}/uebungen/01/aufgaben.pdf` },
        { label: "Lösung", kind: "pdf", src: `${BASE}/uebungen/01/loesung.pdf` },
        { label: "Zusatzhilfe", kind: "pdf", src: `${BASE}/uebungen/01/zusatzhilfe.pdf` },
      ],
    },
    {
      number: 2,
      title: "Einführung Kryptografie",
      read: [
        { label: "Vorlesung", kind: "pdf", src: `${BASE}/lectures/02.pdf` },
      ],
      practice: [
        { label: "Aufgaben", kind: "pdf", src: `${BASE}/uebungen/02/aufgaben.pdf` },
        { label: "Lösung", kind: "pdf", src: `${BASE}/uebungen/02/loesung.pdf` },
        { label: "Mitschrift", kind: "pdf", src: `${BASE}/uebungen/02/loesung-mitschrift.pdf` },
      ],
    },
    {
      number: 3,
      title: "Symmetrische Kryptografie · DES",
      read: [
        { label: "Vorlesung", kind: "pdf", src: `${BASE}/lectures/03.pdf` },
      ],
      practice: [
        { label: "Aufgaben", kind: "pdf", src: `${BASE}/uebungen/03/aufgaben.pdf` },
        { label: "Lösung", kind: "pdf", src: `${BASE}/uebungen/03/loesung.pdf` },
        { label: "Mitschrift", kind: "pdf", src: `${BASE}/uebungen/03/loesung-mitschrift.pdf` },
      ],
    },
    {
      number: 4,
      title: "AES & Einführung asymmetrische Kryptografie",
      read: [
        { label: "Vorlesung", kind: "pdf", src: `${BASE}/lectures/04.pdf` },
      ],
      practice: [
        { label: "Aufgaben", kind: "pdf", src: `${BASE}/uebungen/04/aufgaben.pdf` },
        { label: "Lösung", kind: "pdf", src: `${BASE}/uebungen/04/loesung.pdf` },
      ],
    },
    {
      number: 5,
      title: "RSA-Kryptosystem",
      read: [
        { label: "Vorlesung", kind: "pdf", src: `${BASE}/lectures/05.pdf` },
      ],
      practice: [
        { label: "Aufgaben", kind: "pdf", src: `${BASE}/uebungen/05/aufgaben.pdf` },
        { label: "Lösung", kind: "pdf", src: `${BASE}/uebungen/05/loesung.pdf` },
      ],
    },
    {
      number: 6,
      title: "Digitale Signaturen, Hash, MAC",
      read: [
        { label: "Vorlesung", kind: "pdf", src: `${BASE}/lectures/06.pdf` },
      ],
      practice: [
        { label: "Aufgaben", kind: "pdf", src: `${BASE}/uebungen/06/aufgaben.pdf` },
        { label: "Lösung", kind: "pdf", src: `${BASE}/uebungen/06/loesung.pdf` },
      ],
    },
    {
      number: 7,
      title: "Bitcoin",
      read: [
        { label: "Vorlesung", kind: "pdf", src: `${BASE}/lectures/07.pdf` },
      ],
      practice: [
        { label: "Aufgaben", kind: "pdf", src: `${BASE}/uebungen/07/aufgaben.pdf` },
        { label: "Lösung", kind: "pdf", src: `${BASE}/uebungen/07/loesung.pdf` },
      ],
    },
    {
      number: 8,
      title: "Sicherheitsprotokolle · Schlüsselvereinbarung",
      read: [
        { label: "Vorlesung", kind: "pdf", src: `${BASE}/lectures/08.pdf` },
      ],
      practice: [
        { label: "Aufgaben", kind: "pdf", src: `${BASE}/uebungen/08/aufgaben.pdf` },
        { label: "Lösung", kind: "pdf", src: `${BASE}/uebungen/08/loesung.pdf` },
      ],
    },
    {
      number: 9,
      title: "Sicherheitsprotokolle · DoS, Input Validation, Web",
      read: [
        { label: "Vorlesung", kind: "pdf", src: `${BASE}/lectures/09.pdf` },
      ],
      practice: [
        { label: "Aufgaben", kind: "pdf", src: `${BASE}/uebungen/09/aufgaben.pdf` },
        { label: "Lösung", kind: "pdf", src: `${BASE}/uebungen/09/loesung.pdf` },
      ],
    },
    {
      number: 10,
      title: "Software-Exploits",
      read: [
        { label: "Vorlesung", kind: "pdf", src: `${BASE}/lectures/10.pdf` },
      ],
      practice: [
        { label: "Aufgaben", kind: "pdf", src: `${BASE}/uebungen/10/aufgaben.pdf` },
      ],
    },
    {
      number: 11,
      title: "Betriebssystemsicherheit · Multics & TEE",
      read: [
        { label: "Vorlesung", kind: "pdf", src: `${BASE}/lectures/11.pdf` },
      ],
      practice: [
        { label: "Aufgaben", kind: "pdf", src: `${BASE}/uebungen/11/aufgaben.pdf` },
        { label: "Lösung", kind: "pdf", src: `${BASE}/uebungen/11/loesung.pdf` },
      ],
    },
    {
      number: 12,
      title: "Reverse Engineering & Malware",
      read: [
        { label: "Vorlesung", kind: "pdf", src: `${BASE}/lectures/12.pdf` },
      ],
      practice: [
        { label: "Aufgaben", kind: "pdf", src: `${BASE}/uebungen/12/aufgaben.pdf` },
        { label: "Lösung", kind: "pdf", src: `${BASE}/uebungen/12/loesung.pdf` },
        { label: "Lösung (Multics)", kind: "pdf", src: `${BASE}/uebungen/12/loesung-multics.pdf` },
      ],
    },
    {
      number: 13,
      title: "Zusammenfassung & Klausurvorbereitung",
      read: [
        { label: "Vorlesung", kind: "pdf", src: `${BASE}/lectures/13.pdf` },
      ],
      practice: [
        { label: "Aufgaben", kind: "pdf", src: `${BASE}/uebungen/13/aufgaben.pdf` },
        { label: "Lösung", kind: "pdf", src: `${BASE}/uebungen/13/loesung.pdf` },
      ],
    },
  ],
  extras: [
    {
      label: "Übungs-Zusammenfassung (Aufgaben)",
      src: `${BASE}/uebungen/_zusammenfassung.pdf`,
    },
  ],
};
