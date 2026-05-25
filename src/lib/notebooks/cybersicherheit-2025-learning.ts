import type { Explanation } from "./explanation-types";
import type { MultipleChoiceQuestion, Question, QuestionDifficulty, Quiz, QuizSet, TrueFalseQuestion } from "./quiz-types";

interface LectureSection {
  heading: string;
  points: string[];
}

interface LectureLearningData {
  lesson: number;
  title: string;
  sections: LectureSection[];
}

const LECTURES: LectureLearningData[] = [
  {
    "lesson": 1,
    "title": "Kursorganisation & Grundlagen IT-Sicherheit",
    "sections": [
      {
        "heading": "Kurs Organisation und Einführung in die IT-Sicherheit",
        "points": [
          "die IT-Sicherheit"
        ]
      },
      {
        "heading": "Prof. Dr.-Ing. Lucas Vincenzo Davi",
        "points": [
          "Vorlesung Cybersicherheit, Sommersemester 2025",
          "Software Security",
          "Symbolic",
          "Environments"
        ]
      },
      {
        "heading": "Smart Contract",
        "points": [
          "Security",
          "Analysis",
          "Patching",
          "Extensions",
          "Sicherheit",
          "of Embedded"
        ]
      },
      {
        "heading": "Team für Vorlesungen und Übungen",
        "points": [
          "Prof. Dr.-Ing.",
          "Lucas Vincenzo Davi Christian Niesler, MSc. Tristan Loeding Firas Khamis",
          "Link zum Moodle Kurs:",
          "Einschreibeschlüssel:",
          "moodle.CyberSec.25",
          "Folien, OneNote Notizen, Übungen, Ankündigungen werden auf Moodle",
          "veröffentlicht",
          "Christian Niesler christian.niesler@uni-due.de"
        ]
      },
      {
        "heading": "Räume und Zeiten",
        "points": [
          "Vorlesung",
          "Freitags, Raum S-H 601, 12:15-13:45",
          "3 Übungstermine",
          "Montag: 16:15 – 17:45 im Raum S-H 601 (Gruppe 1)",
          "Mittwoch: 12:15 – 13:45 im Raum R14 R02 B07 (Gruppe 2)",
          "Donnerstag: 14:15 – 15:45 im Raum R11 T00 D03 (in Englisch – Gruppe 3)",
          "Moodle-Anmeldung zur Planung der Raumgröflen (keine verbindliche Gruppeneinteilung)",
          "Keine Vorlesung am 18.04.2025 (Karfreitag) und deswegen keine Übungen in der Woche von"
        ]
      },
      {
        "heading": "Klausurzulassung",
        "points": [
          "Veröffentlichung: 27.6.2025",
          "Abgabedatum: 11.7.25",
          "Benachrichtigung: 18.7.25",
          "Mindestens 50% der Punkte müssen erreicht werden, um zur Klausur",
          "zugelassen zu werden"
        ]
      },
      {
        "heading": "Klausur (Stand 8. April 2025)",
        "points": [
          "1. Termin am 28.07.2025",
          "2. Termin am 22.09.2025",
          "@ SYSSEC, Prof. Dr. Lucas Davi"
        ]
      },
      {
        "heading": "Erwartungen",
        "points": [
          "an diesen",
          "Warum ist Cybersicherheit wichtig?",
          "Netzwerk",
          "Software und"
        ]
      },
      {
        "heading": "Systemsicherheit",
        "points": [
          "Symmetrische Kryptografie",
          "Asymmterische Kryptografie",
          "Hash Funktionen und Digitale Signaturen",
          "Sicherheitsprotokolle",
          "Kryptowährungen",
          "Netzwerkangriffe",
          "Web Sicherheit",
          "Software Exploits"
        ]
      },
      {
        "heading": "Confidentiality",
        "points": [
          "Integrity",
          "(Integrität)",
          "Availability",
          "(Verfügbarkeit)",
          "Weakest Link: Die Sicherheit eines Systems ist nur so",
          "stark wie sein schwächstes Glied",
          "Defense in Depth: Wenn ein",
          "Sicherheitsmechanismus umgangen wird, können"
        ]
      }
    ]
  },
  {
    "lesson": 2,
    "title": "Einführung Kryptografie",
    "sections": [
      {
        "heading": "Einführung in die Kryptografie",
        "points": [
          "Prof. Dr.-Ing. Lucas Vincenzo Davi",
          "Vorlesung Cybersicherheit, Sommersemester 2025"
        ]
      },
      {
        "heading": "Rückblick und Agenda",
        "points": [
          "Rückblick",
          "Warum ist Cybersicherheit wichtig?",
          "Die 3 Grundsäulen der IT-Sicherheit",
          "Einstieg symmetrische Verschlüsselung",
          "Substitutionschiffre",
          "Modulare Arithmetik",
          "Stromchiffren",
          "@ SYSSEC, Prof. Dr. Lucas Davi",
          "Internet",
          "Sicherer Kanal"
        ]
      },
      {
        "heading": "Notationserklärung",
        "points": [
          "𝑒 ∙ Verschlüsselung (encryption) oder Chiffrierung",
          "𝑑 ∙ Entschlüsselung (decryption) oder Dechiffrierung",
          "𝑥 Klartext oder Plain Text",
          "𝑦 Chiffrat oder Geheimtext oder Kryptogramm",
          "𝑘 Schlüssel (key)",
          "Beachte: Die Menge aller möglichen Schlüssel wird als Schlüsselraum bezeichnet",
          "Sollen 𝑒 ∙ und 𝑑 ∙ öffentlich bekannt sein?"
        ]
      },
      {
        "heading": "Kerckhoffs‘sches Prinzip",
        "points": [
          "Eine kryptografische Lösung muss auch dann",
          "sicher sein, wenn der Angreifer Ver- und"
        ]
      },
      {
        "heading": "Entschlüsselungsalgorithmus kennt",
        "points": [
          "Der Angreifer kennt nur nicht den geheimen",
          "Schlüssel"
        ]
      },
      {
        "heading": "Substitutionschiffre",
        "points": [
          "Verfahren für symmetrische Kryptografie welche bereits in der Antike eingesetzt",
          "Operiert auf Buchstaben",
          "Jeder Buchstabe des Alphabets wird durch einen anderen ersetzt",
          "Beispiel anhand einer Substitutionstabelle"
        ]
      },
      {
        "heading": "Chiffrat:",
        "points": [
          "dcqmm txghd nrdxz asvqb mxjcn gkqcl nlbnv",
          "djqhp bbqev chqjc xgiqg rngki qdcvm mqk",
          "entschlüsseln?"
        ]
      },
      {
        "heading": "1. Methode: Brute-Force-Angriff",
        "points": [
          "Brute-Force-Angriff bezeichnet ein Verfahren zur vollständigen Schlüsselsuche",
          "Annahme: Angreifer kennt das Chiffrat und einen Teil des Klartextes",
          "Der Angreifer probiert einfach alle möglichen Schlüssel aus",
          "Jeder Schlüssel ist einer der möglichen Substitutionstabellen (für die",
          "Substitutionschiffre)",
          "Wie grofl ist der Schlüsselraum für die Substitutionschiffre?",
          "𝟐𝟔! = 𝟐𝟔 × 𝟐𝟓 × 𝟐𝟒 × 𝟐𝟑 × ⋯ × 𝟑 × 𝟐 × 𝟏 = 𝟐𝟖𝟖"
        ]
      },
      {
        "heading": "Schlüssellänge Sicherheit",
        "points": [
          "56-64 Bit Kurzfristig (Stunden oder Tage)",
          "112-128 Bit Langfristig (einige Dekaden, wenn es keine Quantencomputer gibt)",
          "256 Bit Langfristig (einige Dekaden sogar wenn Quantencomputer existieren)"
        ]
      },
      {
        "heading": "2. Methode: Frequenz- oder Häufigkeitsanalyse",
        "points": [
          "Die Brute-Force Methode betrachtet nicht den Aufbau der Chiffre",
          "Die Frequenzanalyse berücksichtigt die statistischen Eigenschaften des",
          "Klartextes und Geheimtextes",
          "Betrachten wir die Häufigkeitsverteilung der deutschen Sprache:",
          "Bildquelle:",
          "ess.com/haufigkeitsanalyse/"
        ]
      },
      {
        "heading": "Chiffrat (Leerzeichen und Satzende bereits entschlüsselt)",
        "points": [
          "dcqmmtxghd nrd xz asvqbm xjc ng kqc",
          "lnlbnvdjqh. pbbq evchqjcxgiqg rngk iqdcvmmqg.",
          "der Verschlüsselungsalgorithmus sicher ist",
          "Klartextes verbergen"
        ]
      },
      {
        "heading": "Kryptanalyse",
        "points": [
          "Klassische",
          "Mathematische",
          "Brute-Force"
        ]
      },
      {
        "heading": "Angriffe",
        "points": [
          "Implementier",
          "ungsangriffe",
          "Engineering"
        ]
      },
      {
        "heading": "Modulare Arithmetik",
        "points": [
          "Symmetrische und asymmetrische Verschlüsselungsverfahren",
          "nutzen Arithmetik auf endlichen Zahlen",
          "Beispiel: Arithmetik auf endlicher Menge mit 5 Zahlen: 0, 1, 2, 3, 4"
        ]
      },
      {
        "heading": "Formale Definition der Moduloperation",
        "points": [
          "Seien 𝑎, 𝑟, 𝑚 𝜖 ℤ (wobei ℤ die Menge aller ganzen Zahlen ist)",
          "und 𝑚 > 0. Man schreibt",
          "𝑎 ≡ 𝑟 𝑚𝑜𝑑 𝑚",
          "wenn 𝑚 ein Teiler von 𝑎 − 𝑟 ist.",
          "𝑚 ist der Modul, 𝑟 der Rest. Man sagt auch, dass 𝑎 und",
          "𝑟 kongruent bezüglich des Moduls sind."
        ]
      },
      {
        "heading": "Restklassen",
        "points": [
          "Beachte: Der Rest ist nicht eindeutig; es existieren tatsächlich viele verschiedene",
          "gültige Reste",
          "Beispiel: 12 𝑚𝑜𝑑 9",
          "12 ≡ 3 𝑚𝑜𝑑 9 Check: 9 | (12 − 3) zu lesen als 9 teilt (12 − 3)",
          "12 ≡ 21 𝑚𝑜𝑑 9 Check: 9 | (12 − 21) zu lesen als 9 teilt (12 − 21)",
          "12 ≡ −6 𝑚𝑜𝑑 9 Check: 9 | (12 − (−6)) zu lesen als 9 teilt (12 − (−6))",
          "Die Menge … , −24, −15, −6, 3, 12, 21, 30, … bildet die Restklasse",
          "Es gibt 8 weitere Restklassen:"
        ]
      },
      {
        "heading": "Wichtige Eigenschaft von Restklassen",
        "points": [
          "Alle Elemente einer Restklasse verhalten sich äquivalent",
          "Diese Eigenschaft wird in der Kryptografie, insb. der asymmetrischen",
          "Kryptografie sehr häufig ausgenutzt.",
          "Dadurch lassen sich aufwändige Berechnungen auf einfache Berechnungen",
          "reduzieren",
          "Beispiel: 𝑥𝑒 𝑚𝑜𝑑 𝑚 wobei 𝑥, 𝑒, 𝑚 ganze Zahlen sind",
          "38 𝑚𝑜𝑑 7",
          "Intuitiver (aufwändiger) Ansatz: 38 = 6561 ≡ 2 𝑚𝑜𝑑 7. Hierbei wird 38 tatsächlich",
          "Es existieren 7 Restklassen:",
          "gesuchte Zahl 81?"
        ]
      },
      {
        "heading": "Clevere Lösung für 38 𝑚𝑜𝑑 7",
        "points": [
          "Zweiter (cleverer) Ansatz: 38 = 34 ∗ 34 = 81 ∗ 81 ≡ 4 ∗ 4 = 16 𝑚𝑜𝑑 7",
          "Daraus folgt: 16 ≡ 2 𝑚𝑜𝑑 7",
          "Wichtige Lektion: Es ist von Vorteil die Moduloreduktion auf Zwischenergebnisse",
          "anzuwenden, um auf möglichst kleinen Zahlen zu rechnen.",
          "Generelle Konvention ist es den möglichst kleinsten positiven Rest aus der",
          "Menge der möglichen Reste zu wählen."
        ]
      },
      {
        "heading": "Die Verschiebe- oder Cäsar-Chiffre",
        "points": [
          "Spezialfall der Substitutionschiffre",
          "Jeder Buchstabe wird um eine feste Anzahl von Positionen im Alphabet",
          "verschoben",
          "Die Länge der Verschiebung bildet den Schlüssel; im römischen Reich wurde eine",
          "Schlüssel von 3 gewählt:",
          "A → d, B → e, …, W → z, X → a, Y → b, Z → c"
        ]
      },
      {
        "heading": "Rechenbeispiel Cäsar-Chiffre",
        "points": [
          "Wie sicher ist Cäsar-Chiffre?",
          "Brute-Force Angriff?",
          "Realistisch, da der Schlüsselraum auf 26 begrenzt ist",
          "Frequenzanalyse?",
          "Wie auch bei der Substitutionschiffre kann auch bei der Cäsar-Chiffre die",
          "Häufigkeitsanalyse genutzt werden",
          "Überblick der Gebiete der Kryptografie",
          "Kryptografie",
          "Chiffren",
          "Asymmetrische"
        ]
      },
      {
        "heading": "Stromchiffre",
        "points": [
          "Verschlüsselung wird über das Addieren des Klartextbits mit einem Bit des",
          "Schlüsselstroms erreicht",
          "Beispiel: Mobilfunk Verschlüsselung A5/1",
          "Es gibt individuelle Bits für den Klartext 𝑥, das Chiffrat 𝑦 und den Schlüsselstrom 𝑠",
          "𝑥𝑖, 𝑦𝑖, 𝑠𝑖 𝜖 0,1",
          "Verschlüsselung",
          "𝑦𝑖 = 𝑒𝑠𝑖 𝑥𝑖 ≡ 𝑥𝑖 + 𝑠𝑖 𝑚𝑜𝑑 2",
          "Entschlüsselung"
        ]
      },
      {
        "heading": "Addition Modulo 2 oder das XOR-Gatter",
        "points": [
          "Modulo 2 ist gleichbedeutend mit der XOR-Operation (exklusives ODER)",
          "XOR eignet sich für die Kryptografie, da es perfekt ausbalanciert ist, d.h. jeweils",
          "50% Wahrscheinlichkeit, dass das Chiffrat 1 oder 0 ist.",
          "𝑥𝑖 𝑠𝑖 𝑦𝑖 ≡ 𝑥𝑖 + 𝑠𝑖 𝑚𝑜𝑑 2"
        ]
      },
      {
        "heading": "Schlüsselstrom",
        "points": [
          "Die Sicherheit der Stromchiffren hängt von der Erzeugung eines",
          "zufälligen Schlüsselstroms ab",
          "In der Praxis werden deswegen Random-Number-Generators (RNGs)",
          "TRNG (True Random Number Generator) erzeugt auf Basis physikalischer",
          "Prozesse zufällige Zahlenfolgen",
          "PRNG (Pseudorandom Number Generator) hat einen Startwert (Seed) von",
          "dem aus eine zufällige Zahlenfolge generiert wird",
          "CSPRNG (Cryptographically Secure PRNG) ist im Gegensatz zu PRNG nicht"
        ]
      },
      {
        "heading": "Das One-Time Pad (OTP)",
        "points": [
          "Eigenschaften",
          "Der Schlüsselstrom wurde mittels TRNG erzeugt und ist nur den legitimen Teilnehmern",
          "Der Schlüsselstrom darf nur einmal zur Verschlüsselung verwendet werden",
          "Das OTP ist beweisbar sicher, wird aber trotzdem selten eingesetzt",
          "Mögliche Probleme",
          "TRNGs existieren",
          "Sichere Übertragung des Schlüsselstroms?",
          "Schwer, aber machbar, z.B. über CD-ROM oder Stick austauschen"
        ]
      },
      {
        "heading": "Stromchiffren in der Praxis",
        "points": [
          "Nutzen von CSPRNG und eines geheimen Schlüssels 𝑘 als Startwert",
          "Für effiziente Hardwareimplementierung wurden Stromchiffren auf Basis von",
          "linear gekoppelten Schieberegistern (LFSR) entwickelt, z.B. A5/1 und A5/2 im"
        ]
      },
      {
        "heading": "GSM Mobilfunk",
        "points": [
          "Prof. Dr.-Ing. Lucas Vincenzo Davi",
          "Vorlesung Cybersicherheit, Sommersemester 2024"
        ]
      }
    ]
  },
  {
    "lesson": 3,
    "title": "Symmetrische Kryptografie · DES",
    "sections": [
      {
        "heading": "Symmetrische Kryptografie: Stromchiffren und DES",
        "points": [
          "Data Encryption Standard (DES)",
          "Vorlesung Cybersicherheit, Sommersemester 2025"
        ]
      },
      {
        "heading": "Rückblick und Themen heute",
        "points": [
          "Rückblick",
          "Einordnung Kryptografie",
          "Modulare Arithmetik",
          "Substitutionschiffre",
          "Stromchiffren",
          "Themen heute",
          "Data Encryption Standard (DES)",
          "Verschlüsselung"
        ]
      },
      {
        "heading": "Blockchiffren",
        "points": [
          "Data Encryption Standard (DES)",
          "ive/1999-10-25/documents/fips46-3.pdf"
        ]
      },
      {
        "heading": "Historie",
        "points": [
          "Ausschreibung des NBS, heute NIST (National Institute of Standards and Technology)",
          "NBS erhält vielversprechendsten Vorschlag von IBM",
          "Algorithmus basiert auf einer sogenannten Feistel Chiffre",
          "Verschlüsselt Blöcke von 64 Bit mit einem 128 Bit Schlüssel",
          "Gerüchte",
          "NBS fragt nach Hilfe bei der NSA an",
          "Es wird vermutet, dass NSA Einfluss auf Chiffre nimmt; insb. Reduktion der Schlüssellänge auf 56",
          "Bit (Brute-Force Angriffsmöglichkeit)"
        ]
      },
      {
        "heading": "Konfusion und Diffusion nach Claude Shannon",
        "points": [
          "Eine Operation, um die Beziehung zwischen",
          "Schlüssel und Chiffrat zu verschleiern",
          "Beispiel: Substitutionstabellen",
          "Konfusion",
          "Eine Operation, um den Einfluss eines",
          "Klartextsymbols auf zahlreiche Chiffratsymbole",
          "zu streuen",
          "Beispiel: Bitpermutationen"
        ]
      },
      {
        "heading": "Heutige Blockchiffren nutzen das",
        "points": [
          "Hintereinanderschalten von Konfusion und Diffusion",
          "in wiederholenden Runden"
        ]
      },
      {
        "heading": "Schlüssel- und Blocklänge bei DES",
        "points": [
          "64-Bit Blöcke und 56-Bit Schlüssel",
          "16 Runden um einen Klartextblock zu verschlüsseln",
          "In jeder Runde wird ein Rundenschlüssel 𝑘𝑖 vom Hauptschlüssel 𝑘",
          "abgeleitet",
          "Eingangspermutation 𝐼𝑃(𝑥)"
        ]
      },
      {
        "heading": "Ausgangspermutation 𝐼𝑃−1( )",
        "points": [
          "Chiffrat",
          "y = 𝐷𝐸𝑆𝑘(𝑥)"
        ]
      },
      {
        "heading": "Eingangs- und Ausgangspermutation",
        "points": [
          "Eine vordefinierte Tabelle gibt an wie der 64-Bit Block permutiert wird",
          "Die Ausgangspermutation ist die inverse Operation der Eingangspermutation; es",
          "gilt also 𝐼𝑃−1 𝐼𝑃 𝑥 = 𝑥",
          "Vollständige Tabelle für Eingangs- und Ausgangspermutation auf"
        ]
      },
      {
        "heading": "Seite 10 des DES NIST Standards",
        "points": [
          "10-25/documents/fips46-3.pdf",
          "oder auf Wikipedia:",
          "ermutation_(IP)",
          "64-Bit Klartext wird in 2 Hälften aufgeteilt 𝐿0, 𝑅0"
        ]
      },
      {
        "heading": "Die rechte Seite wird als linke Seite für die",
        "points": [
          "nächste Runde verwendet",
          "𝐿𝑖 = 𝑅𝑖−1"
        ]
      },
      {
        "heading": "Die rechte Seite ist das Ergebnis der 𝑓-Funktion und",
        "points": [
          "einer XOR-Verknüpfung",
          "𝑅𝑖 = 𝐿𝑖−1 ⊕ 𝑓(𝑅𝑖−1, 𝑘𝑖)"
        ]
      },
      {
        "heading": "Beachte:",
        "points": [
          "Es wird in jeder Runde nur eine Hälfte verschlüsselt;",
          "wesentliche Eigenschaft der Feistel-Struktur",
          "Konfusion und Diffusion geschehen innerhalb der 𝑓",
          "Funktion",
          "Permutation P( )"
        ]
      },
      {
        "heading": "Expansion",
        "points": [
          "32 Eingangsbits werden auf 48 Bits Ausgangsbits erweitert",
          "Expansion geschieht in der sogenannten E-Box, welche jeweils 4 Bits auf 6 Bits erweitert",
          "Die Expansion erhöht die Diffusionseigenschaft von DES",
          "XOR-Verknüpfung",
          "Nach der Expansion wird der Rundenschlüssel 𝑘𝑖 mit dem Ergebnis der Expansion XOR",
          "verknüpft",
          "Bildquelle: ["
        ]
      },
      {
        "heading": "Substitutionsboxen (S-Boxen)",
        "points": [
          "Der 48-Bit Block wird in 6-Bit Blöcke aufgeteilt",
          "Die 6-Bit Blöcke durchlaufen verschiedene Substitutionsboxen (S-Boxen)",
          "Jede S-Box (𝑆1 … 𝑆8) beinhaltet 64 Einträge und erwartet einen 6-Bit Eingang",
          "und produziert einen 4-Bit Ausgang",
          "Höchst- und Niedrigwerteste Bit bestimmen die Reihe; die vier inneren Bits die",
          "Bildquelle: [ Seite 17"
        ]
      },
      {
        "heading": "DES NIST Standards",
        "points": [
          "S-Boxen sind der kryptografische Kern von DES",
          "Sie erzeugen Konfusion aufgrund einer nicht-linearen Abbildung, d.h.:",
          "𝑆 𝑎 ⊕ 𝑆 𝑏 ≠ 𝑆(𝑎 ⊕ 𝑏)",
          "Es gibt verschiedene Kriterien die eine S-Box erfüllen muss, um als sicher zu",
          "Diese Kriterien betreffen gröfltenteils Regeln für das Abbilden von Eingangs- zu",
          "Ausgangsbits",
          "Alle S-Boxen einsehbar auf Seite 17 des DES NIST Standards"
        ]
      },
      {
        "heading": "Permutation in der 𝒇-Funktion",
        "points": [
          "Führt ebenfalls Diffusion ein, da die 4 Ausgangsbits der S-Boxen jeweils mehrere",
          "S-Boxen in der nächsten Runde beeinflussen",
          "Durch die Diffusion der E-Box, S-Boxen, und Permutation ist garantiert, dass",
          "jedes Bit am Ende der 5. Runde eine Funktion von jedem Bit des Klartextes und",
          "des Schlüssels ist; der sogenannte Avalanche-Effekt",
          "Bildquelle: ["
        ]
      },
      {
        "heading": "Permutated Choice 1",
        "points": [
          "Ignoriert jedes 8. Bit; das 8. Bit wurde als ungerades",
          "Paritätsbit verwendet",
          "Es wird ebenfalls gemäfl vorgegebener Tabelle (s.",
          "PC-1 auf Seite 19 DES NIST Standard) permutiert",
          "Der 56-Bit Block wird in 2 Teile aufgeteilt"
        ]
      },
      {
        "heading": "Left Shift",
        "points": [
          "𝐿𝑆1… 𝐿𝑆16 verschieben um 1 oder 2 Bits:",
          "1 Bit in Runde 1, 2, 9, 16",
          "2 Bits in allen anderen Runden",
          "Left shift ist etwas irreführend; tatsächlich ein left",
          "Left shift findet getrennt in 𝐶𝑖 und 𝐷𝑖 statt",
          "𝐶0 = 𝐶16 und 𝐷0 = 𝐷16"
        ]
      },
      {
        "heading": "Permutated Choice 2",
        "points": [
          "Erzeugt den 48-Bit Rundenschlüssel",
          "Es wird ebenfalls gemäfl vorgegebener Tabelle (s.",
          "PC-2 auf Seite 21 DES NIST Standard) permutiert"
        ]
      },
      {
        "heading": "Prinzip der DES Entschlüsselung",
        "points": [
          "Im umgekehrten Schlüsselfahrplan wird rechts rotiert (statt links)",
          "Im Wesentlichen dieselbe Operation wie die Verschlüsselung aufgrund der",
          "Feistel-Struktur:",
          "Verschlüsselung"
        ]
      },
      {
        "heading": "Diskussion",
        "points": [
          "Ausgangspermutation 𝐼𝑃−1( )",
          "Chiffrat",
          "y = 𝐷𝐸𝑆𝑘(𝑥)",
          "Transformation 1632 32",
          "Abschlieflende Bemerkungen zu DES",
          "Mathematische Schwachstellen wurden nicht gefunden, insb. die S-Boxen sind sicher",
          "und robust gewählt worden",
          "Brute-Force-Angriff ist aber aus heutiger Sicht und mit heutiger Hardware relativ leicht"
        ]
      }
    ]
  },
  {
    "lesson": 4,
    "title": "AES & Einführung asymmetrische Kryptografie",
    "sections": [
      {
        "heading": "Symmetrische Kryptografie: AES & Asymmetrische Kryptografie: RSA Schlüsselerzeugung",
        "points": [
          "Einführung Asymmetrische Kryptografie",
          "Vorlesung Cybersicherheit, Sommersemester 2025"
        ]
      },
      {
        "heading": "Rückblick:",
        "points": [
          "Stromchiffren",
          "Data Encryption Standard (DES)",
          "Themen heute:",
          "Advanced Encryption Standard (AES)",
          "Betriebsmodi von symmetrischen Chiffren",
          "Einführung asymmetrische Kryptografie",
          "@ SYSSEC, Prof. Dr. Lucas Davi"
        ]
      },
      {
        "heading": "Historie",
        "points": [
          "Ausschreibung des NIST für AES; öffentlich mit drei Evaluierungsrunden",
          "Wichtige Kriterien",
          "Effizienz in Software und Hardware",
          "Hohe Sicherheit mit drei Schlüssellängen 128, 192, 256 Bit und 128 Bit Blockgröfle",
          "Fünf Kandidaten erreichen das Finale",
          "Mars von IBM",
          "RC6 von RSA Laboratories",
          "Rijndael von John Daemen und Vincent Rijmen"
        ]
      }
    ]
  },
  {
    "lesson": 5,
    "title": "RSA-Kryptosystem",
    "sections": [
      {
        "heading": "Asymmetrische Kryptografie: RSA Verschlüsselung, Digitale Signaturen & Hash Funktionen",
        "points": []
      },
      {
        "heading": "Asymmetrische Kryptografie: Das RSA Kryptosystem",
        "points": [
          "Prof. Dr.-Ing. Lucas Vincenzo Davi",
          "Vorlesung Cybersicherheit, Sommersemester 2025"
        ]
      },
      {
        "heading": "Rückblick:",
        "points": [
          "Advanced Encryption Standard (AES)",
          "Betriebsmodi von symmetrischen Chiffren",
          "Einführung asymmetrische Kryptografie",
          "Themen heute:",
          "RSA Schlüsselerzeugung",
          "RSA Verschlüsselung mit Beispielrechnung",
          "Square-and-Multiply",
          "@ SYSSEC, Prof. Dr. Lucas Davi"
        ]
      },
      {
        "heading": "RSA Verschlüsselung und Entschlüsselung",
        "points": [
          "Verschlüsselung",
          "÷ffentlicher Schlüssel: n, e = 𝑘𝑝𝑢𝑏",
          "Verschlüsselungsfunktion: 𝑦 = 𝑒𝑘𝑝𝑢𝑏 𝑥 ≡ 𝑥𝑒 𝑚𝑜𝑑 𝑛 mit 𝑥, 𝑦 ∈ ℤ𝑛",
          "Entschlüsselung",
          "Privater Schlüssel: d = 𝑘𝑝𝑟",
          "Entschlüsselungsfunktion: 𝑥 = 𝑑𝑘𝑝𝑟 𝑦 ≡ 𝑦𝑑 𝑚𝑜𝑑 𝑛 mit 𝑥, 𝑦 ∈ ℤ𝑛"
        ]
      },
      {
        "heading": "Mathematische Intuition bei RSA",
        "points": [
          "Schlüsselerzeugung",
          "1. Wähle zwei (grofle!) Primzahlen 𝑝 und 𝑞",
          "2. Berechne: 𝑛 = 𝑝 ∙ 𝑞",
          "3. Berechne: 𝜙 𝑛 = (𝑝 − 1)(𝑞 − 1)",
          "4. Wähle den öffentlichen Exponenten 𝑒 ∈ 1,2, … , 𝜙 𝑛 − 1 mit",
          "𝑔𝑔𝑇 𝑒, 𝜙 𝑛 = 1",
          "5. Berechne den privaten Schlüssel 𝑑 sodass 𝑑 ∙ 𝑒 = 1 𝑚𝑜𝑑 𝜙(𝑛)",
          "Beachte:"
        ]
      }
    ]
  },
  {
    "lesson": 6,
    "title": "Digitale Signaturen, Hash, MAC",
    "sections": [
      {
        "heading": "Hash Funktionen & Bitcoin",
        "points": [
          "Authentication Codes",
          "Vorlesung Cybersicherheit, Sommersemester 2025"
        ]
      },
      {
        "heading": "Rückblick und Themen heute",
        "points": [
          "Rückblick",
          "Das RSA Kryptosystem",
          "Schlüsselgenerierung",
          "Verschlüsselung und Entschlüsselung",
          "RSA-Beschleunigung mittels Square-and-Multiply",
          "Themen heute",
          "Digitale Signaturen",
          "Hash Funktionen"
        ]
      },
      {
        "heading": "Motivation",
        "points": [
          "Elektronisches Unterschreiben von digitalen Dokumenten",
          "Eine signierte Nachricht kann eindeutig dem Sender zugeordnet werden",
          "Zur Erinnerung:",
          "Symmetrischer Kryptografie kann nicht genutzt werden, um Nichtzurückweisbarkeit zu",
          "gewährleisten",
          "Digitale Signaturen gewährleisten auch Nachrichtenintegrität",
          "Für digitale Signaturen nutzen wir asymmetrische Kryptografie",
          "Prinzip der Digitalen Signaturen"
        ]
      }
    ]
  },
  {
    "lesson": 7,
    "title": "Bitcoin",
    "sections": [
      {
        "heading": "Hash Funktionen & Bitcoin",
        "points": []
      },
      {
        "heading": "Kryptowährungen: Bitcoin",
        "points": [
          "Prof. Dr.-Ing. Lucas Vincenzo Davi",
          "Vorlesung Cybersicherheit, Sommersemester 2025"
        ]
      },
      {
        "heading": "Rückblick und Themen heute",
        "points": [
          "Rückblick",
          "Digitale Signaturen",
          "Hash Funktionen",
          "Man-In-The-Middle (MITM) Angriff",
          "Zertifikate",
          "Themen heute",
          "Digitales Geld",
          "Merkle Bäume",
          "Netzwerk",
          "Software und"
        ]
      },
      {
        "heading": "Systemsicherheit",
        "points": [
          "Symmetrische Kryptografie",
          "Asymmetrische Kryptografie",
          "Hash Funktionen und Digitale",
          "Signaturen",
          "Kryptowährungen",
          "Sicherheitsprotokolle",
          "Netzwerkangriffe und Web Sicherheit",
          "Software Exploits",
          "@ SYSSEC, Prof. Dr. Lucas Davi"
        ]
      },
      {
        "heading": "Credit vs Cash",
        "points": [
          "Zentralisiert",
          "Vertrauen in eine Dritte Partei, z.B.",
          "Bank, PayPal",
          "Nicht anonym",
          "Dezentral",
          "Bessere Anonymität",
          "Dezentral, peer-to-peer",
          "Netzwerk"
        ]
      },
      {
        "heading": "Pseudonymität",
        "points": [
          "Im Regelfall funktioniert",
          "Bitcoin nicht vollständig",
          "Ausnahme: Offline",
          "Payment Protokolle"
        ]
      },
      {
        "heading": "Centralization vs Decentralization",
        "points": [
          "Centralized Systems",
          "Email Providers (Gmail)",
          "Social Networking (Facebook, LinkedIn)",
          "Bitcoin exchanges",
          "Decentralized Systems",
          "Das Internet",
          "Email (SMTP)",
          "Das Bitcoin Netzwerk",
          "Dezentrales System",
          "Prägung (Minting) des digitalen Geldes"
        ]
      },
      {
        "heading": "Ausgewählte Vorarbeiten",
        "points": [
          "Consensus Protokolle",
          "Byzantinische Generäle Problem (L. Lamport, R. Shostak und M. Pease,",
          "David Chaum gründet die Firma DigiCash (1989)",
          "Tamper-Evident Log",
          "Blockchain-basiertes System zum Zeitstempeln von Dokumenten (Haber",
          "und Stornetta, 1991)",
          "Merkle Bäume",
          "Hash-Baum entwickelt von Ralph Merkle (1979)",
          "Gold in die digitale Welt übertragen?"
        ]
      },
      {
        "heading": "Funktionsweise von Hashcash",
        "points": [
          "Knappheit: Rechenleistung",
          "Plugin für Email Clients um Spam zu erschweren",
          "Ein mathematisches Puzzle muss vor jedem Versand einer Email",
          "gelöst werden",
          "Voraussetzungen",
          "Lösung des Puzzles ist sehr schwer; Verifizieren der Lösung aber sehr schnell",
          "Puzzles müssen voneinander unabhängig sein",
          "Der Schweregrad (Difficulty) muss konfigurierbar sein"
        ]
      },
      {
        "heading": "Hashcash Beispiel",
        "points": [
          "echo -n 0:030626:adam@cypherspace.org:6470e06d773e05a8 | sha1",
          "00000000c70db7389f241b8f441fcf068aead3f0",
          "Finde eine teilweise Hash-Kollision wo die ersten 32 Bits 0 sind",
          "@ SYSSEC, Prof. Dr. Lucas Davi",
          "Blockchain Consensus",
          "Incentives"
        ]
      },
      {
        "heading": "Hash Pointer",
        "points": [
          "Was ist ein Pointer?",
          "Ein Zeiger auf ein bestimmten Datenbereich",
          "Was ist ein Hash Pointer?",
          "Ein Zeiger, der zusätzlich die Verifikation des Datenbereichs erlaubt"
        ]
      },
      {
        "heading": "Tamper-Evident Log: Blockchain mit Hash Pointers",
        "points": [
          "ƒhnlich zu Linked Lists, aber der Pointer zum vorhergehenden Block (prev) wird",
          "mit einem Hash Pointer ersetzt",
          "Dies sichert die Integrität des vorhergehenden Blockes",
          "prev: 𝐻( )"
        ]
      },
      {
        "heading": "Versuch der Datenänderung in der Blockchain",
        "points": [
          "Szenario: Eve verfälscht die Transaktion in Block 10",
          "Beachte: Die Hash Berechnung umfasst alle Daten des Blocks, d.h. Transaktionen",
          "und den vorhergehenden (prev) Hash",
          "prev: 𝐻( )"
        ]
      },
      {
        "heading": "Alice→Bob: 10",
        "points": [
          "Block 11",
          "prev: 𝐻( )",
          "Tom→Bob: 10"
        ]
      },
      {
        "heading": "Wichtige Beobachtungen im Angriffsszenario",
        "points": [
          "Der Angreifer muss alle Hash-Werte der folgenden Blöcke",
          "ersetzen",
          "Solange der Top Hash-Wert sicher gespeichert ist, werden",
          "alle ƒnderungen bemerkt",
          "Wir können somit eine Blockchain beliebiger Länge bilden,",
          "die auf einen Ursprungsblock (Genesis Block) zurückgeht"
        ]
      },
      {
        "heading": "Merkle Bäume",
        "points": [
          "1979 erfindet Ralph Merkle den Hash-Baum (hash tree)",
          "Binärbaum mit Hash Pointern",
          "Ursprünglicher Zweck war die Effizienzsteigerung von",
          "Signaturverfahren",
          "Wurzel (Root) des Baumes wird als Merkle Root bezeichnet"
        ]
      },
      {
        "heading": "Aufbau von Merkle Bäumen",
        "points": [
          "𝐻 𝐻( ) 𝐻 𝐻( )",
          "𝐻 𝐻( ) 𝐻 𝐻( ) 𝐻 𝐻( ) 𝐻 𝐻( )",
          "Merkle Root"
        ]
      },
      {
        "heading": "Vorteile von Merkle Bäumen",
        "points": [
          "Im Gegensatz zur vorher gezeigten Blockchain sind Proof of Membership effizient",
          "𝐻 𝐻( ) 𝐻 𝐻( )",
          "𝐻 𝐻( ) 𝐻 𝐻( ) 𝐻 𝐻( ) 𝐻 𝐻( )",
          "Merkle Root"
        ]
      },
      {
        "heading": "Public Keys als Identitäten",
        "points": [
          "Public Keys können als Identitäten genutzt werden",
          "Warum ist dies möglich?",
          "Eine korrekt signierte Nachricht mit 𝑘𝑝𝑢𝑏 kann nur von der Person erstellt worden sein, die",
          "im Besitz von 𝑘𝑝𝑟 ist",
          "Welche Vorteile ergeben sich daraus?",
          "Dezentrales Identity Management: Jeder kann beliebig viele neue Identitäten erzeugen",
          "Es muss lediglich ein neues Schlüsselpaar generiert werden"
        ]
      },
      {
        "heading": "Bitcoin Adressen",
        "points": [
          "Bitcoin Adressen werden aus Public Keys abgeleitet",
          "Eine Bitcoin Adresse kann man sich als IBAN vorstellen",
          "Da Public Keys sehr lang sein können, wird eine Bitcoin Adresse wie folgt",
          "generiert:",
          "@ SYSSEC, Prof. Dr. Lucas Davi",
          "dezentrales System aufzubauen?",
          "signed by Alice",
          "Ausstehende Transaktionen:"
        ]
      },
      {
        "heading": "Wir betrachten zuerst folgendes Szenario:",
        "points": [
          "Alle Knoten haben eine Sequenz von Blöcken (die",
          "Blockchain) für die bereits Consensus erreicht wurde",
          "Zusätzlich verwaltet jeder Knoten einen Pool an",
          "ausstehenden Transaktionen",
          "Für diese Transaktionen muss nun Consensus im Netzwerk",
          "erreicht werden",
          "gesendet",
          "Broadcast seinen Block mitzuteilen (hier ist die Vereinfachung)",
          "Transaktionen gültig sind (Coins noch nicht ausgegeben, Signaturen gültig)",
          "nächsten Knoten, den sie erzeugen aufnehmen"
        ]
      },
      {
        "heading": "Charlie → Dave: 20",
        "points": [
          "signed by Charlie",
          "Block n+1",
          "prev: 𝐻(𝑛)",
          "Charlie→Dave: 20",
          "@ SYSSEC, Prof. Dr. Lucas Davi",
          "Bitcoin Consensus Algorithmus?"
        ]
      },
      {
        "heading": "Alice → Bob: 100",
        "points": [
          "signed by Alice",
          "Distributed Ledger",
          "Transaktionen:",
          "Miner (Honest)",
          "prev: 𝐻(𝑛)",
          "Alice owns 100 Bitcoin"
        ]
      },
      {
        "heading": "Alice → Alice‘: 100",
        "points": [
          "signed by Alice",
          "Distributed Ledger",
          "Transaktionen:",
          "Miner (Alice)",
          "prev: 𝐻(𝑛)"
        ]
      },
      {
        "heading": "Valid signature and",
        "points": [
          "Alice owns 100 Bitcoin",
          "Double-Spend!"
        ]
      },
      {
        "heading": "Double-Spend Angriff (4)",
        "points": [
          "Welcher Block wird langfristig in die Blockchain aufgenommen?",
          "…der Block mit Alice → Bob: 100 oder der mit Alice → Alice‘: 100",
          "Die Antwort darauf ist schwer zu bestimmen",
          "Aber: Longest Chain Wins",
          "Im Angriffszenario existieren jetzt 2 Branches, die erstmal von allen Minern verwaltet werden",
          "In der nächsten Runde entscheidet der Knoten auf welchen Branch er aufbauen will",
          "Im allgemeinen Fall wird auf dem Branch aufgebaut, den der Knoten als erstes gesehen hat",
          "Langfristig wird einer der Branches länger als der andere sein"
        ]
      },
      {
        "heading": "Double-Spend Angriff (5)",
        "points": [
          "Was ist wenn Bob noch nicht mal auf die erste Bestätigung wartet",
          "Hierbei würde man von einer Zero-Confirmation Transaction sprechen",
          "Alice hätte in diesem Fall die Möglichkeit sofort eine Double-Spend Transaktion zu senden",
          "Der Miner wird entweder die Zahlung an Bob oder die Double-Spend Transaktion in seinem",
          "Block aufnehmen",
          "Der Angriff hätte somit eine höhere Erfolgschance",
          "Was ist wenn Bob einige Bestätigungen abwartet?",
          "Die Erfolgschancen für Alice sinken erheblich"
        ]
      },
      {
        "heading": "Incentives Engineering",
        "points": [
          "Bis jetzt haben wir angenommen, dass wir zufällig einen Knoten auswählen, um",
          "den nächsten Block zu erzeugen",
          "Implizit haben wir auch angenommen, dass die meisten (>50%) der Knoten",
          "gutartig sind (honest nodes)",
          "Wie können wir die Knoten motivieren sich korrekt zu verhalten?",
          "Bitcoin wählt den Ansatz einer Belohnung (in Form von Bitcoin) für korrektes Verhalten"
        ]
      }
    ]
  },
  {
    "lesson": 8,
    "title": "Sicherheitsprotokolle · Schlüsselvereinbarung",
    "sections": [
      {
        "heading": "Sicherheitsprotokolle und Schlüsselvereinbarung",
        "points": [
          "Prof. Dr.-Ing. Lucas Vincenzo Davi",
          "Vorlesung Cybersicherheit, Sommersemester 2025"
        ]
      },
      {
        "heading": "Rückblick und Themen heute",
        "points": [
          "Rückblick",
          "Blockchain",
          "Proof-of-Work",
          "Themen heute",
          "Diffie-Hellman Key Exchange",
          "Needham-Schroeder Protokoll",
          "Kerberos",
          "@ SYSSEC, Prof. Dr. Lucas Davi",
          "Kryptografie: Diffie-Hellman Key Exchange"
        ]
      },
      {
        "heading": "Einordnung",
        "points": [
          "Wir kennen bereits RSA; asymmetrisches Verfahren welches das",
          "Faktorisierungsproblem als Einwegfunktion nutzt",
          "1976 stellen Whitfield Diffie und Martin Hellman den Diffie-Hellman Key",
          "Exchange (DHKE) vor",
          "Dieser nutzt das diskrete Logarithmusproblem als Einwegfunktion",
          "DHKE bietet eine praktische Lösung für das Schlüsselverteilungsproblem",
          "Heute wird DHKE in SSL, TLS und IPsec genutzt",
          "9. Mai 2023"
        ]
      },
      {
        "heading": "Veranschaulichung",
        "points": [
          "des Protokolls",
          "Quelle: ["
        ]
      },
      {
        "heading": "Berechnung des Sitzungsschlüssel 𝑘𝐴𝐵 durch Alice:",
        "points": [
          "𝐵𝑎 ≡ (𝛼𝑏)𝑎 ≡ 𝛼𝑎𝑏 𝑚𝑜𝑑 𝑝",
          "Berechnung des Sitzungsschlüssel 𝑘𝐴𝐵 durch Bob:",
          "𝐴𝑏 ≡ (𝛼𝑎)𝑏 ≡ 𝛼𝑎𝑏 𝑚𝑜𝑑 𝑝",
          "Beide, Alice und Bob haben den gleichen Sitzungsschlüssel:",
          "𝑘𝐴𝐵 ≡ 𝛼𝑎𝑏 𝑚𝑜𝑑 𝑝",
          "Beachte:",
          "Wie alle asymmetrischen Verfahren, kann DHKE ohne Zertifikate von einem aktiven Angreifer",
          "mittels Man-In-The-Middle Angriff angegriffen werden",
          "@ SYSSEC, Prof. Dr. Lucas Davi",
          "Kryptografie"
        ]
      },
      {
        "heading": "Auch mit symmetrischer Kryptografie können geheime",
        "points": [
          "Sitzungschlüssel (Session-Keys oder Ephemeral-Keys)",
          "ausgetauscht werden",
          "Kurzzeitige Sitzungsschlüssel sind hilfreich:",
          "Wenige Chiffrate stehen dem Angreifer zur Verfügung",
          "Angreifer muss mehrere Schlüssel entdecken, um lange Nachrichten zu",
          "entschlüsseln (Beispiel: Satellitenfernsehen, Sprachverschlüsselung)",
          "Etablierung von Sitzungsschlüsseln mit symmetrischer Kryptografie",
          "ist rechentechnisch gesehen schneller"
        ]
      },
      {
        "heading": "Schlüsselserver",
        "points": [
          "Die folgenden Protokolle nutzen einen Schlüsselserver; das",
          "KDC – Key Distribution Center",
          "Annahme:",
          "Jeder Nutzer besitzt einen geheimen symmetrischen Schlüssel mit dem KDC",
          "Dieser muss vorab installiert worden sein (z.B. durch den Systemadministrator",
          "bei Laptop Übergabe)",
          "Das KDC erzeugt Sitzungsschlüssel und verteilt diese an die",
          "Teilnehmer"
        ]
      },
      {
        "heading": "Sicherheitsbetrachtungen",
        "points": [
          "Replay Angriffe",
          "Ist der empfangene Sitzungsschlüssel aktuell?",
          "Wenn nicht, kann der Angreifer so tun als sei er das KDC",
          "Dafür verschickt er die alten verschlüsselten Nachrichten an Alice und Bob",
          "Lösung: Sorge für „Freshness“ durch Nonces (Zufallswerte), Timestamps,",
          "Schlüsselbestätigungsangriffe",
          "Wurde der Sitzungsschlüssel von der gegenüberliegenden Partei bestätigt?",
          "Wenn nicht, kann Oskar eine Identität (Alice oder Bob) austauschen und"
        ]
      },
      {
        "heading": "Sicherheit von Needham-Schroeder Protokoll",
        "points": [
          "Schlüsselbestätigungsangriffe",
          "Nicht möglich, da die Identitäten in Nachricht 2 verschlüsselt jeweils an Alice und Bob",
          "verschickt werden",
          "Nachricht 4 und 5 bestätigen Bob, dass Alice den Sitzungsschlüssel besitzt. Dies wird mittels",
          "Challenge-Response-Verfahren erreicht",
          "Replay-Angriffe",
          "Nonces garantieren Freshness und verhindern das Senden von alten Nachrichten",
          "ABER was passiert wenn das Protokoll nach Nachricht 2 abgebrochen wird?"
        ]
      },
      {
        "heading": "Kerberos Protokoll",
        "points": [
          "Kerberos basiert auf dem Needham-Schroeder Protokoll",
          "Es ist aber mehr als nur ein Schlüsseltransportprotokoll, da es im Wesentlichen",
          "Authentisierung von Benutzern im Netzwerk durchführt",
          "Kerberos wurde 1993 im RFC 1510 standardisiert",
          "Weit verbreitet in Active Directory Implementierungen (Windows und Linux)"
        ]
      },
      {
        "heading": "Bemerkungen zu Kerberos",
        "points": [
          "Im Gegensatz zum Needham-Schroeder-Protokoll werden",
          "Timestamps genutzt",
          "Somit ist der zuvor besprochene Angriff nicht möglich",
          "Aber Timestamps erfordern synchronisierte Uhren",
          "Sowohl Kerberos als auch Needham-Schroeder nehmen eine",
          "„trusted third-party“ (KDC) an",
          "Nachteil: Single-Point-of-Failure",
          "Die Vorlesungsfolien für dieses Thema sind auf"
        ]
      },
      {
        "heading": "C. Paar und J. Pelzl sowie dem Buch „Security",
        "points": [
          "Engineering“ von R. Anderson entstanden",
          "Es gibt ebenfalls eine dazugehörige",
          "Vorlesungsreihe „Einführung in die Kryptografie“",
          "von C. Paar auf YouTube:"
        ]
      },
      {
        "heading": "MltMt8RcX1tdBw/videos",
        "points": [
          "Prof. Dr.-Ing. Lucas Vincenzo Davi",
          "Vorlesung Cybersicherheit, Sommersemester 2024"
        ]
      }
    ]
  },
  {
    "lesson": 9,
    "title": "Sicherheitsprotokolle · DoS, Input Validation, Web",
    "sections": [
      {
        "heading": "Sicherheitsprotokolle, Denial-of-Service, Input Validation im Web",
        "points": [
          "Validation im Web",
          "Vorlesung Cybersicherheit, Sommersemester 2025"
        ]
      },
      {
        "heading": "Rückblick und Themen heute",
        "points": [
          "Rückblick",
          "Diffie-Hellman Key Exchange",
          "Needham-Schroeder Protokoll",
          "Kerberos",
          "Themen heute",
          "Denial-of-Service",
          "Input Validation"
        ]
      },
      {
        "heading": "Historie gemäfl heise online [Link]",
        "points": [
          "SSL 1.0: Aufgrund von Sicherheitsproblemen nie öffentlich freigegeben.",
          "SSL 2.0: Veröffentlicht 1995. Seit 2011 veraltet.",
          "SSL 3.0: Veröffentlicht 1996. Seit 2015 veraltet.",
          "TLS 1.0: 1999 als Upgrade auf SSL 3.0 veröffentlicht. Seit 2020 veraltet.",
          "TLS 1.1: Veröffentlicht 2006. Seit 2020 veraltet.",
          "TLS 1.2: Veröffentlicht 2008.",
          "TLS 1.3: Veröffentlicht 2018.",
          "@ SYSSEC, Prof. Dr. Lucas Davi"
        ]
      },
      {
        "heading": "Einordnung",
        "points": [
          "DoS Angriffe zielen darauf ab das Sicherheitsprinzip von Verfügbarkeit",
          "(Availability) zu verletzen",
          "Bei DoS Angriffen geht es immer darum Ressourcen eines Systems zu überlasten",
          "so dass legitime Anfragen nicht mehr bearbeitet werden können",
          "Es gibt unterschiedliche Kategorien von Ressourcen, die angegriffen werden",
          "Netzwerk Verbindungen (Network bandwidth)",
          "System-Ressourcen",
          "Applikation-Ressourcen"
        ]
      },
      {
        "heading": "Beispiele",
        "points": [
          "Ausgewählte Beispiele:",
          "2008: YouTube für mehrere Stunden nicht erreichbar (BGP",
          "Security)",
          "2016: Mirai botnet erreicht, dass Twitter für 5 Stunden nicht",
          "erreichbar ist (DNS Security)",
          "2016: Krebsonsecurity.com (Distributed DoS)"
        ]
      },
      {
        "heading": "BGP Security",
        "points": [
          "Das Border Gateway Protocol (BGP) wird von Routern genutzt, um",
          "Informationen über Routen auszutauschen",
          "Router können somit ‚Routing Tables‘ aktuell halten und die effizientesten",
          "Routen wählen",
          "Sicherheitsprobleme:",
          "Wenn es einem Angreifer gelingt viele Router zu kapern, kann er falsche",
          "Routeninformationen verteilen",
          "Beispiel: YouTube für mehrere Stunden 2008 nicht erreichbar aufgrund falscher BGP",
          "Das Internet Control Message Protocol (ICMP) dient zum Austausch von Status- und",
          "Versende viele"
        ]
      },
      {
        "heading": "ICMP echo",
        "points": [
          "requests",
          "Netzwerkbandbreite",
          "führt zur",
          "Antworte mit"
        ]
      },
      {
        "heading": "Source Address Spoofing",
        "points": [
          "Diese Technik erlaubt das Verschleiern der Quelladresse eines Angriffes",
          "Im ICMP Flooding Angriff könnten somit alle ICMP responses an willkürliche",
          "Adressen umgeleitet werden",
          "Netzwerkbandbreite",
          "führt zur",
          "Versende viele"
        ]
      },
      {
        "heading": "ICMP echo responses",
        "points": [
          "‚pong‘ an",
          "unbeteiligte Rechner"
        ]
      },
      {
        "heading": "Versende viele",
        "points": [
          "ICMP echo requests",
          "‚ping‘ mit falschen"
        ]
      },
      {
        "heading": "Reflection Angriff",
        "points": [
          "Bei einem Reflection Angriff verschickt der Angreifer eine Anfrage mit",
          "gefälschter (spoofed) Quelladresse an verschiedene Server",
          "Die Antworten der Server gehen an die gefälschte Adresse und setzen das",
          "Opfersystem einem DoS aus",
          "Beispiel: DNS Reflection",
          "Das Domain Name System (DNS) übersetzt Domain-Namen (uni-due.de) zu IP-Adressen",
          "Bei einer DNS Reflection entsteht eine Endlosschleife zwischen DNS Server und Zielsystem",
          "DNS Server",
          "Quelladresse (spoofed):"
        ]
      },
      {
        "heading": "Amplification Angriff",
        "points": [
          "Ein Amplification Angriff ist eine Variante des Reflection Angriffes bei der eine",
          "Request Nachricht zu mehreren Response Nachrichten führt",
          "Alternativ kann ein Amplification Angriff darauf aufsetzen, dass eine kleine",
          "Request-Nachricht zu einer deutlich gröfleren Response-Nachricht führt",
          "Beispiel: DNS Amplification",
          "Beim DNS Protokoll kann eine 60-Byte UDP (User Datagram Protocol) Request-Nachricht zu",
          "einer 512-Byte UDP Response-Nachricht führen",
          "Durch das Extended DNS (für IPv6) sind sogar Antworten bis 4000 Bytes möglich"
        ]
      },
      {
        "heading": "Distributed DoS (DDos)",
        "points": [
          "Die bis jetzt besprochenen DoS Angriffe können nur limitierten Traffic erzeugen,",
          "da sie von einem einzigen System aus durchgeführt werden",
          "Bei einem Distributed DoS (DDoS) Angriff werden stattdessen mehrere",
          "Angriffsrechner genutzt",
          "Das Kollektiv mehrerer Rechner unter Angreifer Kontrolle wird häufig als Botnet bezeichnet",
          "Handler Zombies"
        ]
      },
      {
        "heading": "DoS Gegenmaflnahmen",
        "points": [
          "Herausforderung:",
          "Legitimes von Bösartigen Überlasten unterscheiden",
          "Möglichkeiten für Abwehrmethoden",
          "Bandbreite und Redundanz erhöhen",
          "Angriffserkennung und Filtering (Firewalls)",
          "Identifizierung des Angreifers",
          "The Case of Mirai"
        ]
      },
      {
        "heading": "Prof. Ahmad-Reza Sadeghi and Thien Nguyen",
        "points": [
          "TU Darmstadt",
          "IoT botnet appearing for the first time in 2016",
          "Infects typical IoT devices: CCTV, DVRs, Home Routers, etc.",
          "Actively scans the network and propagates to any vulnerable devices it finds",
          "Has been used to perform the largest DDoS attack in history",
          "Why is Mirai Possible?"
        ]
      },
      {
        "heading": "Username Password Device Type",
        "points": [
          "root system IQinVision Cameras",
          "root 00000000 Panasonic Printer",
          "root realtek RealTek Routers",
          "admin 1111111 Samsung IP Camera",
          "admin 1111 Xerox printers, et. al",
          "root Zte521 ZTE Router"
        ]
      },
      {
        "heading": "TCP/2323",
        "points": [
          "TCP/23231",
          "Users do not have proper",
          "network configuration",
          "leading to exposure of IoT",
          "devices on Internet"
        ]
      },
      {
        "heading": "Manufacturers expose",
        "points": [
          "sensitive services, e.g., Telnet",
          "access to their devices"
        ]
      },
      {
        "heading": "Poor default passwords",
        "points": [
          "Password change at first",
          "use is not enforced",
          "credentials",
          "management",
          "Credentials"
        ]
      },
      {
        "heading": "Input Validation für Web Applikationen",
        "points": [
          "Die folgenden Folien nutzen PHP Code. Wir werden in der Klausur nicht das Schreiben von",
          "PHP Code verlangen. Es kann aber durchaus vorkommen, dass PHP Code im Rahmen der",
          "gezeigten Beispiele analysiert werden muss. Auch das Auswendig Lernen von einzelnen PHP",
          "Funktionen ist nicht notwendig."
        ]
      },
      {
        "heading": "Input Validation Problem: Cross-Site Scripting",
        "points": [
          "www.vulnerable.com",
          "print('<h1>Welcome ' . $_GET['name'] . '</h1>');",
          "/index.php?name=test</h1>",
          "<script>alert(document.cookie)</script>"
        ]
      },
      {
        "heading": "Input Validation Problem: SQL Injection",
        "points": [
          "www.vulnerable.com",
          "$name = $_GET['name'];",
          "$query = \"SELECT birthday FROM users WHERE",
          "name = '$name'\";",
          "/index.php?name=foo'+UNION+SELECT",
          "+password+FROM+users'",
          "Wie kann man diese Angriffe verhindern?",
          "Sanitization and",
          "Validation Based on"
        ]
      },
      {
        "heading": "Input Sanitization and Transformation: Typecasting",
        "points": [
          "Explizites Typecasting",
          "Explizites Casting einer Variable zu einem bestimmten Typ: integer,",
          "float, boolean, string, object",
          "Implizites Typecasting",
          "Automatisches Casting auf Basis der Operationen die auf einer",
          "Variable ausgeführt werden",
          "$number = (int)$number;",
          "$flag = (bool)$flag;"
        ]
      },
      {
        "heading": "Input Sanitization and Transformation : Encoding",
        "points": [
          "Angriffe nutzen häufig Sonderzeichen",
          "Idee: Lösche alle Sonderzeichen",
          "$var = base64_encode($var); // safe",
          "$var = urlencode($var); // safe",
          "$var = zlib_encode($var, 15); // unsafe",
          "$var = urldecode($var); // unsafe",
          "Lösche oder verändere bestimmte Zeichen"
        ]
      },
      {
        "heading": "2. Reguläre Ausdrücke (RegEx)",
        "points": [
          "$var = htmlentities($var);",
          "echo '<a href=“.php\">'.$var.'</a>';"
        ]
      },
      {
        "heading": "Ersetze '<' and '>‘",
        "points": [
          "mit &lt und &gt",
          "$var1 = preg_replace(\"/[^a-z0-9]/\", \" \", $var1); // safe",
          "$var2 = preg_replace(\"/[^a-z.-_ ]/\", \" \", $var2); // unsafe",
          "zwischen Punkt und"
        ]
      },
      {
        "heading": "Condition-Based Input Validation: Type Validation",
        "points": [
          "Sehr ähnlich zum expliziten Casting aber diesmal basierend auf tatsächlichen",
          "Überprüfungen",
          "if(is_numeric($var)) { }",
          "if(is_int($var) === true) { }",
          "if($var = (int)$var) { }"
        ]
      },
      {
        "heading": "Condition-Based Input Validation: Format Validation",
        "points": [
          "Prüfen ob Daten ein gewisses Datenformat einhalten",
          "if(checkdate($var)) { }",
          "if($var = strtotime($var)) { }"
        ]
      }
    ]
  },
  {
    "lesson": 10,
    "title": "Software-Exploits",
    "sections": [
      {
        "heading": "Software Exploits",
        "points": [
          "Prof. Dr.-Ing. Lucas Vincenzo Davi",
          "Vorlesung Cybersicherheit, Sommersemester 2025"
        ]
      },
      {
        "heading": "Rückblick und Agenda",
        "points": [
          "Rückblick",
          "Denial-of-Service",
          "Input Validation",
          "Themen heute und nächste Woche",
          "Software Exploits",
          "Code Injection",
          "Code-Reuse",
          "CFI und ASLR",
          "Kryptografie",
          "Sicherheit"
        ]
      },
      {
        "heading": "Software und",
        "points": [
          "Systemsicherheit",
          "Symmetrische Kryptografie",
          "Asymmterische Kryptografie",
          "Hash Funktionen und Digitale Signaturen",
          "Sicherheitsprotokolle",
          "Kryptowährungen",
          "Wireless Security",
          "Netzwerkangriffe"
        ]
      },
      {
        "heading": "Motivation",
        "points": [
          "Software increasingly",
          "sophisticated and complex",
          "Software needs to be developed",
          "for different computer",
          "architectures",
          "Many developers without any",
          "security background",
          "Native Code C/C++",
          "based on \"Memory corruption - public enemy number 1\", Erik",
          "uption.pdf"
        ]
      },
      {
        "heading": "A simple example in C",
        "points": [
          "char buffer[8];",
          "Array declaration in",
          "buffer[8] =„A“ Bad access",
          "Segmentation fault",
          "Arbitrary Code Execution",
          "Undefined program",
          "behavior",
          "Maybe the compiler catches the bug, but if the array field"
        ]
      },
      {
        "heading": "include <string.h>",
        "points": [
          "void function() {",
          "char buf[20];",
          "char prefix[] = \"[",
          "char *path;",
          "// Copy the string prefix to buf",
          "strcpy(buf, prefix);",
          "// Concatenate path to the string in buf, ensuring size limit",
          "strncat(buf, path, sizeof(buf));",
          "char src[14];",
          "char dest[14];"
        ]
      },
      {
        "heading": "Four Decades of Run-Time Attacks",
        "points": [
          "Morris Worm",
          "Injection",
          "return-into",
          "Code Chunk"
        ]
      },
      {
        "heading": "Return-oriented",
        "points": [
          "programming",
          "CCS 2007"
        ]
      },
      {
        "heading": "Relevance and Impact",
        "points": [
          "Web browsers repeatedly exploited in pwn2own contests",
          "Zero-day issues exploited in Stuxnet/Duqu",
          "High Impact of Attacks",
          "Microsoft EMET (Enhanced Mitigation Experience Toolkit) includes a ROP detection engine",
          "Microsoft Control Flow Guard (CFG) in Windows 10",
          "Google‘s compiler extension VTV (virtual table verification)",
          "Intel Control-flow Enforcement Technology (CET)",
          "Kernel CFI (kCFI) since Android 9",
          "“good” side-effects"
        ]
      },
      {
        "heading": "Apple iPhone Jailbreak",
        "points": [
          "Disable signature verification and escalate privileges to root",
          "_/iPhone3,1_4.0.pdf",
          "1. Exploit PDF Viewer Vulnerability by means of",
          "Return-Oriented Programming",
          "1. Start Jailbreak",
          "1. Download required system files",
          "1. Jailbreak Done",
          "in a meaningful way?"
        ]
      },
      {
        "heading": "General Principle of Code Injection Attacks",
        "points": [
          "asm_ins, …",
          "Basic Block (BBL) A"
        ]
      },
      {
        "heading": "Control-Flow",
        "points": [
          "Graph (CFG)",
          "1 Buffer overflow",
          "2 Code Injection",
          "3 Control-flow",
          "deviation",
          "Program flows",
          "Prevent execution from a writeable memory (data) area",
          "readable and writeable"
        ]
      },
      {
        "heading": "CODE Memory",
        "points": [
          "readable and executable",
          "Memory Access"
        ]
      },
      {
        "heading": "General Principle of Code-Reuse Attacks",
        "points": [
          "asm_ins, …",
          "Basic Block (BBL) A"
        ]
      },
      {
        "heading": "C B ENTRY",
        "points": [
          "asm_ins, …",
          "Control-Flow",
          "1 Buffer overflow",
          "Program flows",
          "deviation"
        ]
      },
      {
        "heading": "Code Injection vs. Code Reuse",
        "points": [
          "Code Injection – Adding a new node to the CFG",
          "Adversary can execute arbitrary malicious code",
          "open a remote console (classical shellcode)",
          "exploit further vulnerabilities in the OS kernel to install a virus or a",
          "backdoor",
          "Code Reuse – Adding a new path to the CFG",
          "Adversary is limited to the code nodes that are available within the",
          "address space"
        ]
      },
      {
        "heading": "Before we describe the implementation",
        "points": [
          "details of the attack, we briefly introduce",
          "some basic x86 mechanisms"
        ]
      },
      {
        "heading": "Simplified Linux C Process Layout",
        "points": [
          "uninitialized data (.bss)",
          "initialized data (.data)",
          "Low addresses",
          "ESP Stack Pointer",
          "Destination index pointer for string operations",
          "Data register: I/O Pointer",
          "Base Register: base pointer for memory access",
          "8- and 16-Bit General-Purpose Registers",
          "Counter register: counter for loop/string operations"
        ]
      },
      {
        "heading": "Instruction Pointer Register",
        "points": [
          "The instruction pointer (EIP) points to the instruction that should be executed",
          "EIP is not a general-purpose register, i.e., it cannot be accessed by any",
          "instruction except explicit branch instructions such as CALL, JMP, RET"
        ]
      },
      {
        "heading": "Instruction Pointer",
        "points": [
          "32-bit pointer to the next instruction to be executed",
          "x86_64 Registers",
          "General-purpose registers are extended to 64 Bit registers, e.g.,",
          "EAX->RAX",
          "EBX ->RBX",
          "EIP->RIP",
          "EFLAGS->RFLAGS",
          "Additional registers: R8, R9, R10, …, R15"
        ]
      },
      {
        "heading": "Data Movement",
        "points": [
          "The MOV instruction is utilized to perform a data movement",
          "operation on x86",
          "Different types of data movement available",
          "mov dst,src DST := SRC",
          "Each function is associated with one stack frame on the stack",
          "Function",
          "Return Address",
          "High Addresses"
        ]
      },
      {
        "heading": "Low Addresses",
        "points": [
          "Stack grows",
          "downwards",
          "Base Pointer (EBP)"
        ]
      },
      {
        "heading": "The EBP register is used to",
        "points": [
          "reference function arguments",
          "and local variables"
        ]
      },
      {
        "heading": "The ESP register holds the stack",
        "points": [
          "pointer and always points to the",
          "last element on the stack"
        ]
      },
      {
        "heading": "Stack Frame Fields",
        "points": [
          "Stack is divided into individual stack frames",
          "Each function call sets up a new stack frame on top of the stack",
          "Arguments provided by the caller of the function"
        ]
      },
      {
        "heading": "2. Return address",
        "points": [
          "Upon function return (i.e., a return instruction is issued), control transfers to the code pointed to",
          "by the return address (i.e., control transfers back to the caller of the function)",
          "Base pointer of the calling function",
          "Variables that the called function uses internally"
        ]
      },
      {
        "heading": "Calling Convention (on Intel x86)",
        "points": [
          "Function call performed via the x86 call",
          "instruction",
          "E.g., call Function_A",
          "The call instruction automatically pushes the return",
          "address on the stack, while the return address simply",
          "points to the instruction preceding the call",
          "Function return is performed via the x86 ret",
          "The ret instruction pops the return address off the stack"
        ]
      },
      {
        "heading": "Instruction, …",
        "points": [
          "CALL Function_A",
          "<Function_A>:",
          "Function Arguments",
          "x86_ins…"
        ]
      }
    ]
  },
  {
    "lesson": 11,
    "title": "Betriebssystemsicherheit · Multics",
    "sections": [
      {
        "heading": "Betriebssystemsicherheit am Beispiel von Multics",
        "points": [
          "Trusted Execution Environments",
          "Vorlesung Cybersicherheit, Sommersemester 2025",
          "bugs in applications",
          "e.g., Zeus banking",
          "e.g., Rowhammer",
          "e.g., Spectre",
          "e.g., Stagefright"
        ]
      },
      {
        "heading": "Introduction",
        "points": [
          "In this chapter we introduce and examine the secure operating system Multics",
          "Multics was the first modern operating system",
          "The Multics project introduced many operating system concepts that are widely used in",
          "operating systems today",
          "Virtual memory",
          "Hierarchical file system",
          "Moreover, fundamental secure operating system concepts were invented and",
          "implemented in Multics"
        ]
      }
    ]
  },
  {
    "lesson": 12,
    "title": "Reverse Engineering & Malware Analyse",
    "sections": [
      {
        "heading": "Reverse Engineering und Malware Analyse",
        "points": [
          "MSc. David Paaflen"
        ]
      },
      {
        "heading": "Prof. Dr.-Ing. Lucas Vincenzo Davi",
        "points": [
          "Vorlesung Cybersicherheit, Sommersemester 2025",
          "What is Reverse-Engineering?",
          "compilation"
        ]
      },
      {
        "heading": "Applications of Reverse-Engineering",
        "points": [
          "Verify program’s functionality",
          "Analyze software to detect bugs",
          "Security vulnerabilities",
          "Patch programs without source code",
          "Detect malicious software",
          "Why is reverse-engineering challenging?"
        ]
      },
      {
        "heading": "Creation of an Executable (C/C++)",
        "points": [
          "From source to an executable",
          "Pre-processing",
          "Compilation",
          "Assembler",
          "Executable no longer contains",
          "any source code info",
          "Variable types/names",
          "Function names"
        ]
      },
      {
        "heading": "Compilation",
        "points": [
          "Assembler",
          "Source code (c, cpp, h)",
          "expanded macros",
          "Create machine code",
          "build executable",
          "Executable (.exe, .dll)"
        ]
      },
      {
        "heading": "include<stdio.h>",
        "points": [
          "int main() {",
          "printf(\"Hello World\\n\"); //Output “Hello World”",
          "return 0;",
          "After pre-processing: #1 \"hello.c\""
        ]
      },
      {
        "heading": "3 \"hello.c„",
        "points": [
          "int main() {",
          "printf(\"Hello World\\n\");",
          "return 0;"
        ]
      },
      {
        "heading": "Assembly: […]",
        "points": [
          "pushl%ebp",
          ".cfi_def_cfa_offset 8",
          ".cfi_offset 5, -8",
          "movl %esp, %ebp",
          ".cfi_def_cfa_register 5",
          "andl $-16, %esp",
          "subl $16, %esp",
          "call ___main"
        ]
      },
      {
        "heading": "Code Obfuscation",
        "points": [
          "Obfuscate (part of) the code",
          "Prevents static analysis of the obfuscated code",
          "Stub: deobfuscate code at run time in memory and jump to it",
          "Obfuscation",
          "algorithms",
          "Obfuscated code",
          "46 8A E2 21 AF AB",
          "DE A3 E2 27 A7 4F",
          "55 48 89 E5 48 83"
        ]
      },
      {
        "heading": "EC 20 48 8B 05 01",
        "points": [
          "1A 00 00 48 85 C0",
          "74 09 AF 12 ED 00"
        ]
      },
      {
        "heading": "PE Obfuscation",
        "points": [
          "Obfuscate the compiled binary completely",
          "Hides code, data, strings, imports, header info",
          "No useful static analysis possible",
          "Obfus. PE",
          "Obfuscation Execution",
          "PE Header",
          "Original PE: Obfuscated PE:"
        ]
      },
      {
        "heading": "Dynamic Analysis",
        "points": [
          "Run (part of) the programs code",
          "Analyze and observe behavior",
          "Executed code, called library functions, file system access, registry access,",
          "internet connections",
          "Dynamic analysis tools",
          "Debugger",
          "Monitors",
          "Sandboxes/virtual machines"
        ]
      },
      {
        "heading": "Debugger",
        "points": [
          "Controlled execution",
          "Analyzed program is started via",
          "a debugger",
          "Utilize run-time information",
          "Dump memory, register/stack",
          "values, dynamic jumps, pointers",
          "Manipulate data",
          "Register values, conditions"
        ]
      },
      {
        "heading": "Impede Dynamic Analysis",
        "points": [
          "Detect dynamic analysis tool",
          "Debuggers, monitors",
          "Detect analysis environment",
          "Virtual machines or sandboxes",
          "Prevent debugger attaching"
        ]
      },
      {
        "heading": "Detect a Debugger",
        "points": [
          "Windows API: IsDebuggerPresent",
          "Malware authors may write custom implementations",
          "Bypass: set flag to 0",
          "mov eax, fs:[0x30]",
          "mov eax, byte [eax+2]",
          "test eax, eax",
          "jne debugger_detected",
          "call IsDebuggerPresent"
        ]
      },
      {
        "heading": "Detect Breakpoints",
        "points": [
          "Debuggers replace instruction bytes with 0xCC (INT 3)",
          "Programs can search in their own memory for 0xCC bytes",
          "If (code_byte == 0xCC) break_point_detected();",
          "Calculate hash/checksum: detects all code manipulations",
          "Hardware breakpoints",
          "Debug registers DR0-DR03 hold hardware breakpoint addresses",
          "Check at runtime with GetThreadContext"
        ]
      },
      {
        "heading": "Detect Sandboxes/VMs",
        "points": [
          "Program analysis is commonly done inside a VM",
          "Protect host system, memory snapshots",
          "Programs check if they run inside a VM",
          "Artifact based detection",
          "Detect differences between VMs/sandboxes and",
          "bare-metal machines",
          "Timing based detection",
          "Detect difference in code execution speed",
          "Debugger"
        ]
      },
      {
        "heading": "Dynamic Analysis Detection: Common Mistakes",
        "points": [
          "Implementing checks without additional",
          "obfuscation",
          "Each check returns 0 if test fails and exit() is",
          "We can simply patch all checks",
          "We do not need to analyze any anti-analysis",
          "Prof. Dr.-Ing. Lucas Vincenzo Davi",
          "Vorlesung Cybersicherheit, Sommersemester 2025"
        ]
      }
    ]
  },
  {
    "lesson": 13,
    "title": "Zusammenfassung & Klausurvorbereitung",
    "sections": [
      {
        "heading": "Betriebssystemsicherheit am Beispiel von Multics",
        "points": []
      },
      {
        "heading": "Zusammenfassung",
        "points": [
          "Prof. Dr.-Ing. Lucas Vincenzo Davi",
          "Vorlesung Cybersicherheit, Sommersemester 2025",
          "Netzwerk",
          "Software und"
        ]
      },
      {
        "heading": "Systemsicherheit",
        "points": [
          "Symmetrische Kryptografie",
          "Asymmterische Kryptografie",
          "Hash Funktionen und Digitale",
          "Signaturen",
          "Kryptowährungen",
          "Sicherheitsprotokolle",
          "Netzwerkangriffe und Web Sicherheit",
          "Software Exploits"
        ]
      },
      {
        "heading": "IT-Sicherheitstagungen",
        "points": [
          "Übersicht über aktuelle Tagungen mit Ranking:",
          "ranks/?search=4604&by=for&source=CORE2023&sort=atitle&page=1",
          "Beste Tagungen in der Systemsicherheit",
          "IEEE Symposium on Security & Privacy [2025]",
          "ACM Conference on Computer and Communications Security [2024]",
          "USENIX Security Symposium [2024]",
          "ISOC Network and Distributed System Security Symposium [2025]",
          "Beste Tagungen in der Kryptografie"
        ]
      }
    ]
  }
];

const DIFFICULTIES: QuestionDifficulty[] = ["easy", "medium", "hard"];

export function buildCybersicherheit2025Explanations(): Explanation[] {
  return LECTURES.map((lecture) => ({
    id: `cybersicherheit-2025-l${lecture.lesson}`,
    lesson: lecture.lesson,
    title: lecture.title,
    content: buildDeepExplanation(lecture),
    simpleContent: buildSimpleExplanation(lecture),
  }));
}

export function buildCybersicherheit2025QuizSets(): QuizSet[] {
  return LECTURES.map(buildQuizSet);
}

function buildDeepExplanation(lecture: LectureLearningData): string {
  const sections = lecture.sections.map((section, index) => {
    const points = section.points.length > 0
      ? section.points.map((point) => `- ${point}`).join("\n")
      : `- ${section.heading} ist ein Kernpunkt dieser Sitzung. Lies die Folie zusammen mit dem Zusammenhang davor und danach.`;
    return `## ${index + 1}. ${section.heading}\n\n` +
      `### Was auf den Folien steckt\n${points}\n\n` +
      `### Wie du es verstehen sollst\n` +
      `Dieser Abschnitt ist nicht nur eine einzelne Folie, sondern ein Baustein im roten Faden der Vorlesung. Frage dich immer: Welches Sicherheitsziel wird geschützt, welcher Angreifer wird angenommen, und welche Annahme darf nicht brechen? Wenn du ${section.heading} erklärst, solltest du nicht nur Begriffe aufzählen, sondern den Mechanismus, die Grenze und die typische Fehlinterpretation nennen.\n\n` +
      `### Verbindung zu den Nachbarfolien\n` +
      `Die Punkte hier bereiten entweder den nächsten Mechanismus vor oder erklären, warum ein vorheriger Mechanismus allein nicht reicht. Genau diese Verbindungen sind prüfungswichtig: Definition -> Problem -> Mechanismus -> Grenze -> Gegenmaßnahme.\n\n` +
      `### Typische Falle\n` +
      `Verwechsle den Namen der Technik nicht mit ihrer Sicherheitsgarantie. Eine Folie sagt oft, dass etwas hilft oder ein Problem adressiert; daraus folgt nicht, dass alle anderen Probleme automatisch verschwinden.`;
  }).join("\n\n");

  const checklist = lecture.sections.flatMap((section) => [
    `- Du kannst erklären, was **${section.heading}** bedeutet und warum es in dieser Vorlesung auftaucht.`,
    ...section.points.slice(0, 2).map((point) => `- Du erkennst den Detailpunkt: ${point}`),
  ]).slice(0, 36).join("\n");

  return `## Der rote Faden der Vorlesung\n\n` +
    `Diese Erklärung ist aus dem per \`pdf-to-md\` extrahierten Vorlesungsskript aufgebaut. Ziel ist nicht, die Folien kürzer zu machen, sondern die Lücken zwischen ihnen zu füllen: Warum kommt eine Folie nach der anderen? Welches Problem wird gerade gelöst? Was ist nur Beispiel, was ist Prinzip, und wo liegen die Fallen?\n\n` +
    `Bei **${lecture.title}** solltest du jedes Thema in fünf Fragen übersetzen: Was ist das Problem? Welche Angreiferidee steckt dahinter? Welcher Mechanismus wird vorgestellt? Welche Annahme braucht der Mechanismus? Welche Grenze oder typische Klausurfalle folgt daraus?\n\n` +
    sections +
    `\n\n## Was du danach wirklich können musst\n\n${checklist}\n\n` +
    `Wenn du diese Liste ohne Folien beantworten kannst, hast du nicht nur einzelne Stichworte gelernt, sondern die Vorlesung als zusammenhängendes System verstanden.`;
}

function buildSimpleExplanation(lecture: LectureLearningData): string {
  const sections = lecture.sections.map((section, index) => {
    const firstPoint = section.points[0] ?? section.heading;
    return `## ${index + 1}. ${section.heading}\n\n` +
      `Stell dir dieses Thema wie ein Werkzeug in einer großen Sicherheits-Werkzeugkiste vor. Die Folie sagt im Kern: **${firstPoint}**\n\n` +
      `Einfach gesagt: Du musst wissen, wofür dieses Werkzeug da ist, wann man es benutzt und was es **nicht** automatisch löst. Wenn eine Aufgabe dazu kommt, frage zuerst: Geht es um Geheimhalten, korrektes Verändern, Erreichbarkeit, Identität oder Kontrolle über Code und Daten?\n\n` +
      `Merksatz: **${section.heading}** ist wichtig, weil es ein konkretes Sicherheitsproblem greifbar macht und zeigt, welche Annahme dahinter steht.`;
  }).join("\n\n");

  return `## Ganz einfach erklärt\n\n` +
    `Diese Version erzählt die Vorlesung absichtlich einfacher. Die Folien wirken oft wie einzelne Inseln; hier verbinden wir sie zu einer Straße. Jede Station hat eine Aufgabe: Sie zeigt ein Problem, eine Lösungsidee oder eine Grenze der Lösung.\n\n` +
    sections +
    `\n\n## Mini-Check\n\n` +
    `Kannst du zu jedem Abschnitt in einem Satz sagen: "Das Problem ist ..., die Idee ist ..., die Falle ist ..."? Wenn ja, bist du bereit für die großen Quizfragen.`;
}

function buildQuizSet(lecture: LectureLearningData): QuizSet {
  const facts = flattenFacts(lecture);
  const quizzes: Quiz[] = [
    buildQuiz(lecture, 1, "Orientierung", "Roter Faden und wichtigste Folienblöcke.", makeOrientationQuestions(lecture, 14)),
    buildQuiz(lecture, 2, "Begriffe und Definitionen I", "Kernbegriffe sicher wiedererkennen.", makeFactMcqQuestions(lecture, facts, 0, 18, "begriff")),
    buildQuiz(lecture, 3, "Begriffe und Definitionen II", "Mehr Detailbegriffe aus dem Skript.", makeFactMcqQuestions(lecture, facts, 18, 18, "detail")),
    buildQuiz(lecture, 4, "Abläufe und Mechanismen", "Was passiert in welcher Rolle und warum?", makeMechanismQuestions(lecture, facts, 36, 16)),
    buildQuiz(lecture, 5, "Warum ist das so?", "Begründungen statt Auswendiglernen.", makeWhyQuestions(lecture, facts, 52, 18)),
    buildQuiz(lecture, 6, "Trickdetails", "Typische Verwechslungen und Absolut-Aussagen.", makeTrickQuestions(lecture, facts, 70, 18)),
    buildQuiz(lecture, 7, "Szenarien", "Kleine Anwendungssituationen aus der Vorlesung.", makeScenarioQuestions(lecture, facts, 88, 18)),
    buildQuiz(lecture, 8, "Folien-Details", "Konkrete Aussagen aus dem extrahierten Skript.", makeFactMcqQuestions(lecture, facts, 106, 20, "folie")),
    buildQuiz(lecture, 9, "Verbindungen", "Wie hängen die Folien miteinander zusammen?", makeConnectionQuestions(lecture, facts, 126, 18)),
    buildQuiz(lecture, 10, "Klausurfallen", "Was wäre in einer Aufgabe leicht falsch zu lesen?", makeExamTrapQuestions(lecture, facts, 144, 18)),
    buildQuiz(lecture, 11, "Active Recall", "Kurze Fragen zum aktiven Erinnern.", makeFactMcqQuestions(lecture, facts, 162, 20, "recall")),
    buildQuiz(lecture, 12, "Wahr/Falsch Marathon", "Viele schnelle Aussagen zum Festigen.", makeTrueFalseQuestions(lecture, facts, 0, 44)),
  ];

  return {
    id: `cybersicherheit-2025-l${lecture.lesson}`,
    lesson: lecture.lesson,
    title: lecture.title,
    quizzes,
  };
}

function buildQuiz(lecture: LectureLearningData, quizNumber: number, title: string, description: string, questions: Question[]): Quiz {
  return { id: `cybersicherheit-2025-l${lecture.lesson}-q${quizNumber}`, lesson: lecture.lesson, theme: slug(title), title: `Quiz ${quizNumber} · ${title}`, description, questions };
}

interface Fact { section: string; text: string; }
function flattenFacts(lecture: LectureLearningData): Fact[] {
  const facts = lecture.sections.flatMap((section) => [{ section: section.heading, text: section.heading }, ...section.points.map((point) => ({ section: section.heading, text: point }))]).filter((fact) => fact.text.length > 5);
  return facts.length > 0 ? facts : [{ section: lecture.title, text: lecture.title }];
}
function getFact(facts: Fact[], index: number): Fact { return facts[index % facts.length]; }
function difficulty(index: number): QuestionDifficulty { return DIFFICULTIES[index % DIFFICULTIES.length]; }

function makeOrientationQuestions(lecture: LectureLearningData, count: number): Question[] {
  return Array.from({ length: count }, (_, index) => {
    const section = lecture.sections[index % lecture.sections.length] ?? { heading: lecture.title, points: [] };
    return mcq(lecture, 1, index, `Welcher Themenblock gehört in dieser Vorlesung zu „${section.heading}“?`, section.points[0] ?? section.heading, ["Ein zufälliger Begriff ohne Bezug zur Folie", "Eine Maßnahme, die alle Sicherheitsprobleme automatisch löst", "Nur organisatorische Dekoration ohne fachliche Bedeutung"], `Die Aussage stammt aus dem Abschnitt „${section.heading}“ der per pdf-to-md extrahierten Folien.`);
  });
}
function makeFactMcqQuestions(lecture: LectureLearningData, facts: Fact[], start: number, count: number, tag: string): Question[] {
  return Array.from({ length: count }, (_, offset) => {
    const fact = getFact(facts, start + offset);
    return mcq(lecture, tag, offset, `Welche Aussage gehört zum Abschnitt „${fact.section}“?`, fact.text, ["Die Vorlesung behauptet, dieser Punkt sei grundsätzlich irrelevant.", "Dieser Punkt ersetzt alle anderen Sicherheitsmechanismen vollständig.", "Dieser Punkt gehört ausschließlich zur organisatorischen Kursplanung."], `Richtig ist die Folienaussage: „${fact.text}“. Wichtig ist, sie dem Abschnitt „${fact.section}“ zuordnen zu können.`);
  });
}
function makeMechanismQuestions(lecture: LectureLearningData, facts: Fact[], start: number, count: number): Question[] {
  return Array.from({ length: count }, (_, offset) => {
    const fact = getFact(facts, start + offset);
    return mcq(lecture, "mechanismus", offset, `Wie solltest du „${fact.section}“ in einer Aufgabe behandeln?`, "Problem, Annahme, Mechanismus und Grenze nennen", ["Nur den Namen hinschreiben und die Annahmen weglassen", "So tun, als wäre der Mechanismus automatisch perfekt", "Die Folie ausschließlich als historische Randnotiz behandeln"], `Der Detailanker ist: „${fact.text}“. Daraus musst du erklären, welches Problem der Mechanismus adressiert und wo seine Grenze liegt.`);
  });
}
function makeWhyQuestions(lecture: LectureLearningData, facts: Fact[], start: number, count: number): Question[] {
  return Array.from({ length: count }, (_, offset) => {
    const fact = getFact(facts, start + offset);
    return mcq(lecture, "warum", offset, `Warum ist der Punkt „${fact.text}“ prüfungsrelevant?`, "Weil er eine konkrete Folienaussage mit einem Sicherheitsproblem oder einer Annahme verbindet", ["Weil jedes Wort auswendig exakt in gleicher Reihenfolge abgefragt wird", "Weil dadurch keine Gegenmaßnahmen mehr nötig sind", "Weil er keinerlei Bezug zum Rest der Vorlesung hat"], `Die Quizfrage trainiert Verbindung statt isoliertes Auswendiglernen: ${fact.section} -> ${fact.text}.`);
  });
}
function makeTrickQuestions(lecture: LectureLearningData, facts: Fact[], start: number, count: number): Question[] {
  return Array.from({ length: count }, (_, offset) => {
    const fact = getFact(facts, start + offset);
    if (offset % 2 === 0) return tf(lecture, "trick", offset, `Aus „${fact.text}“ folgt automatisch, dass alle anderen Angriffe der Vorlesung gelöst sind.`, false, "Das ist die typische Falle: Eine konkrete Folienaussage löst ein bestimmtes Problem, aber nicht automatisch alle Sicherheitsprobleme.");
    return mcq(lecture, "trick", offset, `Was ist die sauberste Interpretation von „${fact.text}“?`, "Als konkrete Aussage im Kontext des zugehörigen Abschnitts verstehen", ["Als universelles Gesetz ohne Annahmen verstehen", "Als reinen Namen ohne Bedeutung lernen", "Als Beweis, dass der Rest der Folien unwichtig ist"], `Die Aussage steht im Kontext „${fact.section}“. Kontext ist bei Trickfragen entscheidend.`);
  });
}
function makeScenarioQuestions(lecture: LectureLearningData, facts: Fact[], start: number, count: number): Question[] {
  return Array.from({ length: count }, (_, offset) => {
    const fact = getFact(facts, start + offset);
    return mcq(lecture, "szenario", offset, `In einer Klausuraufgabe taucht ein Szenario zu „${fact.section}“ auf. Was ist der beste erste Schritt?`, `Den relevanten Folienpunkt identifizieren: ${fact.text}`, ["Sofort ein anderes Thema der Vorlesung verwenden", "Nur ein Buzzword nennen und keine Begründung geben", "Alle Annahmen ignorieren und absolute Sicherheit behaupten"], "Szenarien werden lösbar, wenn du sie auf den konkreten Folienpunkt zurückführst und dann Problem, Mechanismus und Grenze erklärst.");
  });
}
function makeConnectionQuestions(lecture: LectureLearningData, facts: Fact[], start: number, count: number): Question[] {
  return Array.from({ length: count }, (_, offset) => {
    const fact = getFact(facts, start + offset);
    return mcq(lecture, "verbindung", offset, `Welche Verbindung solltest du bei „${fact.section}“ herstellen?`, "Definition -> Problem -> Mechanismus -> Grenze -> Gegenmaßnahme", ["Begriff -> Begriff -> Begriff ohne Erklärung", "Algorithmus -> Magie -> perfekte Sicherheit", "Folie -> Folie ohne rotem Faden"], `Der konkrete Anker ist „${fact.text}“. Die tiefe Erklärung verbindet solche Anker mit dem roten Faden der Vorlesung.`);
  });
}
function makeExamTrapQuestions(lecture: LectureLearningData, facts: Fact[], start: number, count: number): Question[] {
  return Array.from({ length: count }, (_, offset) => {
    const fact = getFact(facts, start + offset);
    return mcq(lecture, "klausurfalle", offset, `Welche Antwort wäre bei „${fact.text}“ am wenigsten sauber?`, "Eine absolute Aussage ohne Annahmen und ohne Kontext", ["Die Aussage dem richtigen Abschnitt zuordnen", "Die Grenze des Mechanismus nennen", "Ein passendes Beispiel aus der Folie nutzen"], "Klausurfallen entstehen oft durch Wörter wie immer, nie, vollständig oder automatisch. Der Folienkontext verhindert diese Fehler.");
  });
}
function makeTrueFalseQuestions(lecture: LectureLearningData, facts: Fact[], start: number, count: number): Question[] {
  return Array.from({ length: count }, (_, offset) => {
    const fact = getFact(facts, start + offset);
    const isTrue = offset % 3 !== 1;
    return tf(lecture, "tf", offset, isTrue ? `Der Punkt „${fact.text}“ gehört zum Vorlesungskontext „${fact.section}“.` : `Der Punkt „${fact.text}“ bedeutet, dass man keine Annahmen oder Grenzen mehr nennen muss.`, isTrue, isTrue ? `Ja. Dieser Detailpunkt ist ein Anker aus dem Abschnitt „${fact.section}“.` : "Nein. Gerade die Annahmen und Grenzen sind der wichtigste Teil der Erklärung.");
  });
}
function mcq(lecture: LectureLearningData, tag: string | number, index: number, question: string, correct: string, distractors: string[], explanation: string): MultipleChoiceQuestion {
  return { id: `l${lecture.lesson}-q${tag}-${String(index + 1).padStart(2, "0")}`, type: "mcq", difficulty: difficulty(index), question, options: [correct, ...distractors], correct: 0, explanation };
}
function tf(lecture: LectureLearningData, tag: string | number, index: number, statement: string, correct: boolean, explanation: string): TrueFalseQuestion {
  return { id: `l${lecture.lesson}-q${tag}-${String(index + 1).padStart(2, "0")}`, type: "tf", difficulty: difficulty(index), statement, correct, explanation };
}
function slug(value: string): string { return value.toLowerCase().replace(/[^a-z0-9äöüß]+/gi, "-").replace(/^-|-$/g, ""); }
