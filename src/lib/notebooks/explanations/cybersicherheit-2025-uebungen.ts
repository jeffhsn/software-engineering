import type { Explanation } from "../explanation-types";

/**
 * Step-by-step Lösungswege for each Cybersicherheit SoSe 2025 Übung.
 *
 * Written in the professor's method: grounded in the Übung's own `aufgaben.md`
 * + `loesung.md` (created via `pdf-to-md` next to the source PDFs). The job is
 * to make the *path* to the answer obvious — name the rule, say where it comes
 * from, then compute every intermediate step by hand so the reader can
 * reproduce it under exam pressure. Where a sheet has no official Lösung, the
 * walkthrough is built from the lecture + sheet content. German is canonical.
 *
 * Gotcha: the whole body is one TS template literal — never use a backtick
 * inside the content (use **bold** for code-ish terms), and never an ASCII
 * double-quote inside a markdown image title.
 */

const uebPrep: Explanation = {
  id: "cs-2025-u-prep",
  lesson: 1,
  title: {
    de: "Lösungsweg — Grundlagenübung: Modulo- und Binärrechnung",
  },
  content: {
    de: `Bevor in dieser Vorlesung irgendetwas verschlüsselt wird, brauchst du zwei Rechenwerkzeuge, die danach in *jeder* einzelnen Übung wieder auftauchen: das Rechnen mit Resten (**Modulo**) und das Rechnen mit Nullen und Einsen (**Binär**). Dieses Blatt hat keine offizielle Musterlösung — es ist reine Vorbereitung. Genau deshalb lohnt es sich, hier jeden Schritt einmal vollständig zu sehen, denn Caesar, Vigenère, RSA, DES und sogar das Bitcoin-Mining bestehen am Ende aus genau diesen beiden Handgriffen.

## Modulo ist nichts als „Rechnen wie auf einer Uhr"

Stell dir eine Uhr vor. Es ist 12 Uhr, und du wartest 100 Stunden. Du läufst nicht zu „112 Uhr" — die Zeiger drehen sich im Kreis und landen irgendwo zwischen 0 und 23. Genau das ist Modulo: Du interessierst dich nicht für die ganze Zahl, sondern nur für den **Rest**, der übrig bleibt, wenn du immer wieder eine volle Runde (einen vollen „Modul") abziehst.

Die eine Formel, auf der alles steht, ist die **Division mit Rest**. Teilst du eine Zahl x durch einen Divisor d, dann lässt sich x immer eindeutig so zerlegen:

> **Merksatz:** x = q · d + r, wobei q der Ganzzahlquotient (die vollen Runden) und r der Rest ist, mit 0 ≤ r < d. Der Rest r ist genau das, was „x mod d" liefert.

Das Beispiel aus dem Blatt: 47 mod 7. Wie oft passt 7 ganz in 47? Sechsmal, denn 6 · 7 = 42. Was bleibt übrig? 47 − 42 = 5. Also 47 = 6 · 7 + 5, und damit **47 mod 7 = 5**. Der Trick ist immer derselbe: größtes Vielfaches des Moduls suchen, das noch hineinpasst, und den Rest ablesen.

### Schritt für Schritt — Übung 1

**(a) Es ist April. Welcher Monat ist in 50 Monaten?** Monate wiederholen sich alle 12. April ist Monat Nummer 4. Wir wollen also nicht 4 + 50 = 54 als „Monat 54" lesen, sondern auf den Bereich 1–12 zurückfalten. Rechne 54 mod 12: wie oft passt 12 in 54? Viermal, denn 4 · 12 = 48. Rest: 54 − 48 = 6. Monat 6 ist der **Juni**. (Kurzgedacht: 50 = 4·12 + 2, also vier volle Jahre plus zwei Monate; April + 2 Monate = Juni.)

**(b) Es ist 13 Uhr. Wie spät ist es in 100 Stunden?** Stunden wiederholen sich alle 24. Falte zuerst die 100 Stunden zurück: 100 mod 24. Es gilt 4 · 24 = 96, Rest 100 − 96 = 4. In 100 Stunden sind also effektiv 4 Stunden „echte" Bewegung auf der Uhr. 13 + 4 = 17, und 17 mod 24 = 17. Antwort: **17 Uhr**.

Beachte den feinen, aber wichtigen Punkt: Bei (b) musst du den Startwert (13) noch addieren, *bevor* du fertig bist. Bei reinen „in X Tagen/Monaten ab Startpunkt"-Aufgaben kannst du auch erst alles addieren und dann einmal modulo rechnen — beides führt zum selben Ergebnis, weil Modulo mit Addition verträglich ist. Das ist kein Zufall, sondern eine Regel, die uns bei RSA noch das Leben rettet: (a + b) mod n = ((a mod n) + (b mod n)) mod n.

## Binär — die Sprache, in der jeder Rechner wirklich denkt

Unser Dezimalsystem hat zehn Ziffern (0–9), und jede Stelle ist eine Zehnerpotenz: 372 heißt 3·100 + 7·10 + 2·1, also 3·10² + 7·10¹ + 2·10⁰. Ein Computer kennt nur zwei Zustände, Strom an / Strom aus, also nur zwei Ziffern: 0 und 1. Dieselbe Idee, aber mit **Basis 2**: jede Stelle ist eine Zweierpotenz.

Merke dir die kleinen Zweierpotenzen auswendig, sie sind dein Lineal: 2⁰=1, 2¹=2, 2²=4, 2³=8, 2⁴=16, 2⁵=32, 2⁶=64, 2⁷=128, 2⁸=256, 2⁹=512, 2¹⁰=1024.

### Schritt für Schritt — Binär nach Dezimal (Übung 2a)

Du liest die Binärzahl von rechts nach links und addierst überall dort, wo eine 1 steht, die zugehörige Zweierpotenz. Stelle die Bits über ihre Wertigkeiten:

| Binär | Rechnung (nur die 1-Stellen) | Dezimal |
|---|---|---|
| 1111 | 8 + 4 + 2 + 1 | **15** |
| 10001 | 16 + 1 | **17** |
| 101010 | 32 + 8 + 2 | **42** |
| 101 | 4 + 1 | **5** |

Bei 101010 zum Beispiel stehen die Einsen an den Stellen 2⁵, 2³ und 2¹ (von rechts gezählt ab 0), also 32 + 8 + 2 = 42.

### Schritt für Schritt — Dezimal nach Binär (Übung 2b)

Hier nimmst du die **Division mit Rest** von oben — aber fortlaufend durch 2. Du teilst die Zahl immer wieder durch 2, notierst jedes Mal den Rest (0 oder 1), und hörst auf, wenn 0 herauskommt. Die Reste **von unten nach oben** gelesen sind die Binärzahl. Beispiel mit 27:

| Schritt | Rechnung | Rest |
|---|---|---|
| 27 / 2 | = 13 | **1** |
| 13 / 2 | = 6 | **1** |
| 6 / 2 | = 3 | **0** |
| 3 / 2 | = 1 | **1** |
| 1 / 2 | = 0 | **1** |

Von unten nach oben: 11011. Probe (zurückrechnen): 16 + 8 + 0 + 2 + 1 = 27. ✓

Die übrigen drei nach demselben Verfahren (oder, schneller, indem man die passenden Zweierpotenzen zusammensucht):

- **127** = 64 + 32 + 16 + 8 + 4 + 2 + 1 = **1111111** (sieben Einsen — typisch für „eins weniger als eine Zweierpotenz").
- **128** = 2⁷ = **10000000** (eine 1, dann sieben Nullen — genau eine Zweierpotenz). Schön zu sehen: 127 und 128 liegen direkt nebeneinander und sehen binär völlig verschieden aus.
- **2025**: ziehe die größten Zweierpotenzen ab. 2025 − 1024 = 1001; − 512 = 489; − 256 = 233; − 128 = 105; − 64 = 41; − 32 = 9; − 8 = 1; − 1 = 0. Benutzt wurden 2¹⁰, 2⁹, 2⁸, 2⁷, 2⁶, 2⁵, 2³, 2⁰. Das ergibt **11111101001**. Probe: 1024+512+256+128+64+32+8+1 = 2025. ✓

> **Eselsbrücke:** „Eins weniger als eine Zweierpotenz" ist immer eine lückenlose Kette von Einsen (127 = 1111111), „eine Zweierpotenz selbst" ist eine einzige 1 mit lauter Nullen dahinter (128 = 10000000).

### Schritt für Schritt — Binäre Addition mit Übertrag (Übung 2c)

Addieren funktioniert genau wie im Dezimalsystem von rechts nach links — nur dass der Übertrag schon bei 1 + 1 entsteht, denn 1 + 1 = 10 in Binär (also „0 hinschreiben, 1 weitertragen"). Rechnen wir 10101 + 11110:

| Stelle (von rechts) | oben | unten | Übertrag rein | Summe | hingeschrieben | Übertrag raus |
|---|---|---|---|---|---|---|
| 1 | 1 | 0 | 0 | 1 | **1** | 0 |
| 2 | 0 | 1 | 0 | 1 | **1** | 0 |
| 3 | 1 | 1 | 0 | 10 | **0** | 1 |
| 4 | 0 | 1 | 1 | 10 | **0** | 1 |
| 5 | 1 | 1 | 1 | 11 | **1** | 1 |
| 6 | — | — | 1 | 1 | **1** | 0 |

Von oben nach unten gelesen (höchste Stelle zuerst): **110011**. Probe im Dezimalsystem: 10101 = 21, 11110 = 30, und 110011 = 32 + 16 + 2 + 1 = 51. Tatsächlich 21 + 30 = 51. ✓ „Was musst du beachten?" — genau den **Übertrag**: sobald zwei Einsen (oder drei) zusammenkommen, wandert eine 1 in die nächste Stelle.

## Was du nach diesem Blatt sicher können musst

Diese beiden Handgriffe sind keine Nebensache — sie sind das Rückgrat des halben Semesters. Modulo 26 ist Caesar und Vigenère; Modulo n ist RSA; binär denken brauchst du bei DES, bei XOR-Stromchiffren und beim Lesen von Speicheradressen in den Exploit-Kapiteln. Wenn du „x mod d" als „Rest nach vollen Runden" liest und Binärzahlen flüssig in beide Richtungen wandeln kannst, hast du die Rechen-Hürde, an der die meisten in der Klausur Zeit verlieren, schon hinter dir.`,
  },
};

const ueb01: Explanation = {
  id: "cs-2025-u01",
  lesson: 2,
  title: {
    de: "Lösungsweg — Übungsblatt 1: Klassische Kryptografie (Caesar, Transposition, Vigenère)",
  },
  content: {
    de: `Dieses Blatt ist deine erste echte Begegnung mit Verschlüsselung von Hand. Es führt dich durch genau drei historische Verfahren, und sie sind mit Absicht in dieser Reihenfolge gewählt: Caesar zeigt das Grundprinzip *und* sofort seine Schwäche, die Transposition dreht das Prinzip auf den Kopf, und Vigenère repariert die Caesar-Schwäche. Wer diese drei von Hand rechnen kann, versteht danach jede Substitutions- und Permutationsidee im Kurs. Wir lösen jede Aufgabe so, wie der Professor sie an der Tafel vorrechnet: erst die Regel, dann jeder einzelne Buchstabe.

Eine Sache vorweg, die *alle* drei Verfahren teilen: jeder Buchstabe bekommt eine Zahl, A = 0, B = 1, …, Z = 25. Das ganze Rechnen passiert dann „modulo 26", weil das Alphabet 26 Buchstaben hat und wir am Ende von Z wieder bei A landen wollen — dasselbe Uhren-Prinzip wie auf dem Grundlagenblatt.

## Aufgabe 1 — Caesar (Shift-Chiffre) und warum sie auffliegt

Caesar ist eine **Substitutionschiffre**: jeder Buchstabe wird durch einen anderen *ersetzt*, indem man ihn um eine feste Zahl k im Alphabet weiterschiebt. Die Regel, die im Blatt formal steht und die du auswendig können musst:

> **Merksatz:** Verschlüsseln e_k(x) = (x + k) mod 26. Entschlüsseln d_k(y) = (y − k) mod 26. Mehr ist Caesar nicht.

In der Aufgabe ist der Schlüssel k = 5. Nehmen wir das erste Wort des Klartexts, **Sehr**, und verschlüsseln es Buchstabe für Buchstabe — genau das ist der Schritt, den die Musterlösung als fertigen Block ausgibt, aber nicht vorrechnet:

### Schritt für Schritt — Caesar mit k = 5

| Klartext | Zahl x | x + 5 | mod 26 | Geheimtext |
|---|---|---|---|---|
| S | 18 | 23 | 23 | **X** |
| e | 4 | 9 | 9 | **j** |
| h | 7 | 12 | 12 | **m** |
| r | 17 | 22 | 22 | **w** |

So wird aus **Sehr** das **Xjmw** der Musterlösung. Du wiederholst das für jeden Buchstaben; nur an einer Stelle wird es spannend: wenn x + 5 über 25 hinausläuft. Beispiel V: V = 21, 21 + 5 = 26, und 26 mod 26 = 0 = **A**. Genau hier sieht man, warum „mod 26" dabeistehen muss — ohne den Rest gäbe es keinen Buchstaben mehr.

**Warum Caesar so leicht zu brechen ist (Aufgaben 3–5, Häufigkeitsanalyse).** Caesar verschiebt *alle* Buchstaben um denselben Betrag. Das heißt: das häufigste Zeichen im Klartext bleibt auch im Geheimtext das häufigste — es heißt nur anders. Im Deutschen ist E mit Abstand am häufigsten (rund 17 %). Macht man eine **Häufigkeitsanalyse** (man zählt, wie oft jedes Zeichen vorkommt, und malt ein Balkendiagramm), dann ist das Diagramm des Geheimtexts exakt dasselbe wie das des Klartexts, nur seitlich verschoben — um genau k Stellen. Ein Angreifer sucht also einfach den höchsten Balken, nimmt an „das ist das E", misst die Verschiebung ab und hat k. Deshalb beobachtest du in Aufgabe 5 auch: je *länger* der Text, desto mehr ähnelt seine Verteilung der amtlichen deutschen Häufigkeitstabelle — kurze Texte schwanken, lange Texte tragen mehr Statistik in sich und verraten den Schlüssel umso zuverlässiger.

> **Eselsbrücke:** Eine monoalphabetische Chiffre *verschiebt* das Häufigkeits-Histogramm, sie *zerstört* es nicht. Genau das ist ihr Todesurteil.

## Aufgabe 2 — Spaltenweise Transposition

Jetzt wird das Prinzip umgedreht. Eine **Transpositionschiffre** ersetzt keine Buchstaben, sie *vertauscht ihre Reihenfolge*. Die Buchstaben bleiben dieselben — eine Häufigkeitsanalyse sieht deshalb völlig normal aus —, aber sie stehen an anderer Stelle. Bei der **spaltenweisen Transposition** schreibt man den Text zeilenweise in ein Raster mit so vielen Spalten, wie der Schlüssel Buchstaben hat, und liest die Spalten dann in der **alphabetischen Reihenfolge der Schlüsselbuchstaben** wieder aus.

Das Beispiel aus dem Blatt zeigt die Verschlüsselung: Klartext **Beispiele**, Schlüssel **HAL**. In drei Spalten (B/E/I, S/P/I, E/L/E). Sortiert man H, A, L alphabetisch zu A, H, L, dann kommt die A-Spalte (das war Spalte 2) zuerst, dann die H-Spalte (Spalte 1), dann die L-Spalte (Spalte 3) — Ergebnis EBIPSILEE.

**Aufgabe 2.1 fragt: wie entschlüsselt man das wieder?** Antwort, und das ist der ganze Kniff: man **kehrt die Permutation um**. Bei der Verschlüsselung ist Spalte 1 an Position 2 gewandert, Spalte 3 an Position 3 usw. Beim Entschlüsseln macht man genau diese Zuordnung rückgängig — was beim Verschlüsseln „Spalte 1 → Position 2" war, wird jetzt „Position 2 → Spalte 1".

### Schritt für Schritt — Entschlüsseln von YRCOTPCSILOO mit Schlüssel SEC

**Schritt 1 — Maße bestimmen.** Der Geheimtext hat 12 Zeichen, der Schlüssel **SEC** hat 3 Buchstaben → 3 Spalten, also 12 / 3 = 4 Zeilen. Der Geheimtext füllt die Spalten *in alphabetischer Schlüsselreihenfolge* von oben nach unten. Alphabetisch geordnet ist SEC → **C, E, S**.

**Schritt 2 — Geheimtext blockweise in die sortierten Spalten eintragen.** Wir schneiden YRCOTPCSILOO in drei Blöcke zu je 4 Zeichen (YRCO, TPCS, ILOO) und legen sie unter C, E, S:

| C-Spalte | E-Spalte | S-Spalte |
|---|---|---|
| Y | T | I |
| R | P | L |
| C | C | O |
| O | S | O |

**Schritt 3 — Spalten in die Original-Schlüsselreihenfolge zurücksortieren.** Der Schlüssel hieß im Original **S-E-C**. Also gehört in die echte Spalte 1 die S-Spalte (I, L, O, O), in Spalte 2 die E-Spalte (T, P, C, S) und in Spalte 3 die C-Spalte (Y, R, C, O). Zeilenweise zusammengesetzt:

| Spalte 1 (S) | Spalte 2 (E) | Spalte 3 (C) |
|---|---|---|
| C | R | Y |
| P | T | O |
| I | S | C |
| O | O | L |

**Schritt 4 — zeilenweise lesen.** C-R-Y, P-T-O, I-S-C, O-O-L ergibt **CRYPTOISCOOL** — „crypto is cool". Das ist exakt das Ergebnis der Musterlösung. Die Beobachtung, die der Professor festhält: Spalte 1 ist beim Verschlüsseln zu Spalte 3 geworden und umgekehrt — wir haben diese Vertauschung nur rückwärts gefahren.

> **Typische Falle:** Bei der Transposition wird **permutiert, nicht verschoben**. Wer hier (wie bei Caesar) Buchstaben um k zu verschieben versucht, hat das Verfahren verwechselt. Die Buchstaben bleiben unverändert — nur ihre Plätze tauschen.

## Aufgabe 3 — Vigenère (polyalphabetische Substitution)

Vigenère repariert Caesars Schwäche mit einer einfachen Idee: statt *einer* Verschiebung für den ganzen Text benutzt man *viele* — eine pro Schlüsselbuchstabe, und der Schlüssel wiederholt sich zyklisch. Es ist also „Caesar, aber der Schlüssel wechselt mit jedem Buchstaben". Der Schlüssel **SICHER** liefert die Verschiebungen S=18, I=8, C=2, H=7, E=4, R=17; danach beginnt er wieder von vorn.

Die Regel pro Stelle ist wieder die Caesar-Formel, nur dass k jetzt vom Schlüsselbuchstaben an *dieser* Position kommt: e(x) = (x + k_i) mod 26. Das Vigenère-Quadrat im Blatt ist nur eine Nachschlagetabelle für genau diese Addition (Zeile = Klartextbuchstabe, Spalte = Schlüsselbuchstabe).

### Schritt für Schritt — Verschlüsseln von „Cybersicherheitsvorlesung" mit SICHER

Schreibe den Schlüssel zeichenweise unter den Klartext (zyklisch wiederholt) und addiere modulo 26. Hier die ersten elf Stellen vollständig vorgerechnet — der Rest läuft identisch:

| # | Klartext | x | Schlüssel | k | x + k | mod 26 | Geheimtext |
|---|---|---|---|---|---|---|---|
| 1 | C | 2 | S | 18 | 20 | 20 | **U** |
| 2 | y | 24 | I | 8 | 32 | 6 | **G** |
| 3 | b | 1 | C | 2 | 3 | 3 | **D** |
| 4 | e | 4 | H | 7 | 11 | 11 | **L** |
| 5 | r | 17 | E | 4 | 21 | 21 | **V** |
| 6 | s | 18 | R | 17 | 35 | 9 | **J** |
| 7 | i | 8 | S | 18 | 26 | 0 | **A** |
| 8 | c | 2 | I | 8 | 10 | 10 | **K** |
| 9 | h | 7 | C | 2 | 9 | 9 | **J** |
| 10 | e | 4 | H | 7 | 11 | 11 | **L** |
| 11 | r | 17 | E | 4 | 21 | 21 | **V** |

Beachte Stelle 6 und 7: 18 + 17 = 35, und 35 mod 26 = 9 → J; 8 + 18 = 26, und 26 mod 26 = 0 → A. Immer wenn die Summe 26 erreicht oder überschreitet, zieht man 26 ab. Führt man das bis zum Ende durch (…h-e-i-t-s-v-o-r-l-e-s-u-n-g mit den weiterlaufenden Schlüsselbuchstaben), erhält man den vollständigen Geheimtext der Musterlösung:

> **Ugdlvjakjlvywqvzzfjtgzyey**

**Warum Vigenère die Häufigkeitsanalyse aushebelt (Aufgabe 3.3).** Weil derselbe Klartextbuchstabe je nach Position mit einer *anderen* Verschiebung verschlüsselt wird, wird aus einem E mal dieser, mal jener Geheimbuchstabe. Schau in die Tabelle: das e an Stelle 4 wird zu L, das e an Stelle 10 ebenfalls zu L (zufällig wieder Schlüsselposition H), aber ein e weiter hinten, das auf den Schlüsselbuchstaben S fällt, würde zu W. Der eine hohe E-Balken aus dem Caesar-Histogramm wird so über viele Buchstaben *verschmiert*. Das Geheimtext-Histogramm wird flach — und ein Angreifer kann nicht mehr einfach „höchster Balken = E" raten. Das ist der ganze Fortschritt von monoalphabetisch zu polyalphabetisch.

> **Eselsbrücke:** Caesar = ein Alphabet, verschiebt das Histogramm. Vigenère = viele Alphabete, plättet das Histogramm. Transposition = dasselbe Histogramm, andere Reihenfolge.

## Klausur-Fokus

Was hier wirklich geprüft wird, ist Handarbeit unter Zeitdruck. Übe, bis es sitzt: (1) Buchstabe ↔ Zahl ohne Nachdenken (A=0 … Z=25), (2) Caesar in beide Richtungen mit der Formel und dem sauberen „mod 26" am Schluss, (3) eine spaltenweise Transposition ver- **und** entschlüsseln — der Stolperstein ist immer das Sortieren des Schlüssels und das korrekte Umkehren der Permutation beim Entschlüsseln, (4) ein paar Vigenère-Stellen mit untergeschriebenem, zyklisch wiederholtem Schlüssel. Und sei bereit, in einem Satz zu erklären, *warum* die Häufigkeitsanalyse Caesar und einfache Substitution killt, aber an Vigenère und an Transposition (aus zwei ganz verschiedenen Gründen!) scheitert.`,
  },
};

const ueb02: Explanation = {
  id: "cs-2025-u02",
  lesson: 3,
  title: {
    de: "Lösungsweg — Übungsblatt 2: Vernam/One-Time-Pad, Formbarkeit, DES & S-Boxen",
  },
  content: {
    de: `Dieses Blatt hat zwei Gesichter. In der ersten Hälfte rechnest du die Vernam-Chiffre — und entdeckst dabei, warum „perfekte" Verschlüsselung in der Praxis trotzdem gefährlich sein kann (Stichwort Formbarkeit). In der zweiten Hälfte schaust du DES unter die Haube: S-Boxen, Feistelnetzwerk, Konfusion und Diffusion. Beide Hälften sind klausurrelevant, und beide leben von genau einer Operation, die du sicher beherrschen musst: dem **XOR** (⊕). Wir gehen jede Aufgabe einzeln durch und rechnen jeden Bit-Schritt aus.

## Aufgabe 1 — Vernam-Chiffre (One-Time-Pad) von Hand

Vernam ist „Vigenère zu Ende gedacht": der Schlüssel ist genauso lang wie der Klartext. Jeder Klartextbuchstabe wird mit *seinem eigenen* Schlüsselbuchstaben addiert (mod 26). Ist der Schlüssel echt zufällig und wird nur einmal benutzt, heißt das Verfahren **One-Time-Pad** und ist beweisbar unbrechbar. Die Regel ist die alte Caesar-Formel, nur mit wechselndem k: e(x) = (x + k) mod 26.

### Schritt für Schritt — VORLESUNG mit Schlüssel SECUNIDUE

Buchstaben in Zahlen wandeln (A=0 … Z=25), stellenweise addieren, und überall dort 26 abziehen, wo das Ergebnis größer als 25 ist:

| Klartext | V | O | R | L | E | S | U | N | G |
|---|---|---|---|---|---|---|---|---|---|
| x | 21 | 14 | 17 | 11 | 4 | 18 | 20 | 13 | 6 |
| Schlüssel | S | E | C | U | N | I | D | U | E |
| k | 18 | 4 | 2 | 20 | 13 | 8 | 3 | 20 | 4 |
| x + k | 39 | 18 | 19 | 31 | 17 | 26 | 23 | 33 | 10 |
| mod 26 | 13 | 18 | 19 | 5 | 17 | 0 | 23 | 7 | 10 |
| Chiffrat | **N** | **S** | **T** | **F** | **R** | **A** | **X** | **H** | **K** |

Das Chiffrat ist **NSTFRAXHK**. Achte auf die drei Stellen, an denen 26 abgezogen wird: 39→13, 26→0 (das wird ein A!), 33→7. Genau dort entscheidet sich, ob man das „mod 26" verstanden hat.

**Aufgabe 1.2 — Wie viele Schlüssel gibt es?** Jede der Stellen kann unabhängig einen von 26 Buchstaben tragen. Bei Länge 5 also 26 · 26 · 26 · 26 · 26 = **26⁵**, und allgemein bei Länge n eben **26ⁿ**. Das ist die ganze Stärke des One-Time-Pads: der Schlüsselraum wächst exponentiell mit der Nachrichtenlänge.

**Aufgabe 1.3 — Wie lange dauert Brute-Force?** Hier rechnest du nur sauber Einheiten zusammen. Gegeben: 1 GHz = 10⁶ Operationen/s (so im Blatt definiert), die CPU hat 2 Kerne à 4 GHz, und jede Schlüsselprüfung kostet 4 Operationen.

- Pro Kern: 4 GHz = 4 · 10⁶ Operationen/s ÷ 4 Operationen pro Schlüssel = 10⁶ Schlüssel/s.
- Zwei Kerne: 2 · 10⁶ Schlüssel/s.
- Schlüssel für Länge 1024: 26¹⁰²⁴ ≈ 8,56 · 10¹⁴⁴⁸.
- Zeit: 8,56 · 10¹⁴⁴⁸ ÷ (2 · 10⁶) ≈ 4,28 · 10¹⁴⁴² Sekunden ≈ **1,35 · 10¹⁴³⁵ Jahre**.

Die Zahl ist absurd groß — das ist die Pointe. Brute-Force gegen ein vollwertiges One-Time-Pad ist physikalisch chancenlos.

**Aufgabe 1.4 — Bringt doppeltes Verschlüsseln etwas?** Nein, und das ist überraschend. Verschlüsselt man zweimal, e_{k2}(e_{k1}(x)) = (x + k1 + k2) mod 26. Setzt man k3 = (k1 + k2) mod 26, ist das exakt eine *einfache* Vernam-Verschlüsselung mit Schlüssel k3. Der Schlüsselraum bleibt also **26ⁿ** — kein Gewinn. Der Grund: die Addition mod 26 ist „abgeschlossen", zwei Verschiebungen ergeben zusammen wieder genau eine Verschiebung. (Bei DES ist das anders, dort lohnt sich Mehrfachverschlüsselung — daher Triple-DES.)

## Aufgabe 2 — Formbarkeit (Malleability) von Stromchiffren

Eine Stromchiffre verschlüsselt mit **y = x ⊕ s** (Klartext XOR Schlüsselstrom). Genau daraus folgt eine gefährliche Eigenschaft: ein Kryptosystem heißt **formbar**, wenn ein Angreifer den Geheimtext gezielt so verändern kann, dass sich der Klartext kontrolliert ändert — *ohne den Klartext zu kennen*.

**Aufgabe 2.1 — Warum sind Stromchiffren immer formbar?** Weil XOR „durchschlägt". Addiert der Angreifer einen beliebigen Bitstring Δ auf den Geheimtext, dann gilt: y ⊕ Δ = (x ⊕ s) ⊕ Δ = (x ⊕ Δ) ⊕ s. Beim Entschlüsseln fällt s wieder weg und es bleibt **x ⊕ Δ**. Anders gesagt: jedes Bit, das der Angreifer im Geheimtext kippt, kippt exakt dasselbe Bit im Klartext. Er hat volle Kontrolle über die Klartextänderung, obwohl er den Klartext nie sieht.

### Schritt für Schritt — Aufgabe 2.2 (Bitcoin-Broker)

Der Kontostand (Anzahl Bitcoins) steckt als Zahl im Geheimtext. Du bekommst 1 BTC (≈ 40 000 €) und willst Millionär werden, also ≥ 10⁶ €. Das sind 10⁶ ÷ 40 000 = **25 BTC**. Du musst also den gespeicherten Wert von 1 auf 25 hochdrehen — per XOR, ohne den Schlüsselstrom zu kennen. Du suchst das Δ mit 1 ⊕ Δ = 25:

| | Wert | binär (5 Bit) |
|---|---|---|
| aktuell | 1 | 00001 |
| Ziel | 25 | 11001 |
| Δ = 1 ⊕ 25 | 24 | **11000** |

Probe: 00001 ⊕ 11000 = 11001 = 25. ✓ Du musst also **11000** auf das Chiffrat XOR-addieren. Das Bit-Muster Δ ist genau dort 1, wo sich 1 und 25 unterscheiden.

### Schritt für Schritt — Aufgabe 2.3 (Streaming, m → p, known-plaintext)

Du kennst den Klartext (**m**), den zugehörigen Geheimtext, und willst stattdessen den Geheimtext für **p** setzen. ASCII (7 Bit): m = 109 = 1101101, p = 112 = 1110000. Gegeben ist das Chiffrat von m: y(m) = 1000000.

**Schritt 1 — Schlüsselstrom rekonstruieren.** Weil du Klartext *und* Geheimtext kennst (known-plaintext), berechnest du s = m ⊕ y(m):

    m   = 1 1 0 1 1 0 1
    y(m)= 1 0 0 0 0 0 0
    s   = 0 1 0 1 1 0 1   (Stelle für Stelle XOR)

**Schritt 2 — neues Chiffrat für p bauen.** Jetzt verschlüsselst du p mit demselben Schlüsselstrom: y(p) = p ⊕ s:

    p   = 1 1 1 0 0 0 0
    s   = 0 1 0 1 1 0 1
    y(p)= 1 0 1 1 1 0 1

Du trägst also **1011101** in die Datenbank ein. (Kürzer geht es über die Differenz: Δ = m ⊕ p = 0011101, dann y(p) = y(m) ⊕ Δ = 1000000 ⊕ 0011101 = 1011101 — dasselbe Ergebnis, weil x ⊕ s = y und y ⊕ s = x die beiden Seiten derselben XOR-Medaille sind.)

> **Eselsbrücke:** Stromchiffre = XOR. Und XOR ist seine eigene Umkehrung: a ⊕ b ⊕ b = a. Deshalb kann ein Angreifer Bits kippen, ohne den Schlüssel zu kennen — das ist der ganze Malleability-Angriff.

## Aufgabe 3 — DES: Schlüssellänge, Konfusion & Diffusion, Feistel

**3.1 — Schlüssellänge.** Ursprünglich waren **128 Bit** vorgeschlagen, am Ende wurde auf **56 Bit** (effektiv) reduziert — auf Drängen der **NSA**. Diese kurze Schlüssellänge ist genau der Grund, warum DES heute per Brute-Force angreifbar und überholt ist.

**3.2 — Konfusion und Diffusion** sind die zwei Prinzipien (von Shannon), nach denen jede gute Blockchiffre gebaut ist:

- **Konfusion** verschleiert die Beziehung zwischen Schlüssel und Geheimtext — jeder Geheimtextteil soll auf komplizierte, undurchschaubare Weise vom Schlüssel abhängen. Baustein bei DES: die **S-Boxen** (Substitution).
- **Diffusion** streut den Einfluss eines einzelnen Klartextsymbols über möglichst viele Geheimtextstellen — kippt ein Klartextbit, sollen sich viele Geheimtextbits ändern. Baustein bei DES: die **Bit-Permutation**.

> **Eselsbrücke:** Konfusion = Schlüssel ↔ Chiffrat verschleiern (S-Box). Diffusion = ein Klartextbit über viele Chiffratbits verstreuen (Permutation).

**3.3 — Feistelnetzwerk.** Der Block wird in zwei Hälften L und R geteilt. In jeder Runde i gilt: die neue linke Hälfte ist die alte rechte (L_i = R_{i−1}), und die neue rechte Hälfte ist die alte linke XOR einer Funktion der alten rechten mit dem Rundenschlüssel: R_i = L_{i−1} ⊕ f(R_{i−1}, k_i). Der Clou: weil XOR seine eigene Umkehrung ist, lässt sich diese Runde *rückwärts* rechnen, **ohne** dass f umkehrbar sein müsste — deshalb funktioniert ent- und verschlüsseln mit demselben Hardware-Baustein, nur die Rundenschlüssel laufen rückwärts.

## Aufgabe 4 — Nichtlinearität der S-Box #1

Eine S-Box wäre **linear**, wenn S(x1) ⊕ S(x2) = S(x1 ⊕ x2) gälte. Lineare Boxen wären leicht zu brechen; DES-S-Boxen sind absichtlich **nichtlinear**. Zu zeigen ist: die Gleichung stimmt *nicht*. Dazu musst du zuerst wissen, wie man eine S-Box überhaupt liest.

### Schritt für Schritt — wie man S-Box #1 abliest

Die Eingabe hat 6 Bit: b1 b2 b3 b4 b5 b6. Die **äußeren** Bits (b1 und b6) bilden die **Zeile** (0–3), die **inneren** vier Bits (b2 b3 b4 b5) bilden die **Spalte** (0–15). Der Tabellenwert (dezimal) wird als 4-Bit-Zahl ausgegeben. Beispiel 011011: außen 0|1 → Zeile 1, innen 1101 = 13 → Spalte 13.

Jetzt die drei Paare. Für jedes berechnen wir links S(x1) ⊕ S(x2) und rechts S(x1 ⊕ x2) und zeigen, dass beide verschieden sind:

**Paar 1: x1 = 000000, x2 = 000001.**
- S(000000): Zeile 0|0 = 0, Spalte 0000 = 0 → Wert 14 = 1110.
- S(000001): Zeile 0|1 = 1, Spalte 0000 = 0 → Wert 0 = 0000.
- Links: 1110 ⊕ 0000 = **1110**.
- x1 ⊕ x2 = 000001; S(000001) = 0000. Rechts: **0000**.
- 1110 ≠ 0000 → nichtlinear. ✓

**Paar 2: x1 = 111111, x2 = 100000.**
- S(111111): Zeile 1|1 = 3, Spalte 1111 = 15 → Wert 13 = 1101.
- S(100000): Zeile 1|0 = 2, Spalte 0000 = 0 → Wert 4 = 0100.
- Links: 1101 ⊕ 0100 = **1001**.
- x1 ⊕ x2 = 011111; S(011111): Zeile 0|1 = 1, Spalte 1111 = 15 → Wert 8 = 1000. Rechts: **1000**.
- 1001 ≠ 1000 → nichtlinear. ✓

**Paar 3: x1 = 101010, x2 = 010101.**
- S(101010): Zeile 1|0 = 2, Spalte 0101 = 5 → Wert 6 = 0110.
- S(010101): Zeile 0|1 = 1, Spalte 1010 = 10 → Wert 12 = 1100.
- Links: 0110 ⊕ 1100 = **1010**.
- x1 ⊕ x2 = 111111; S(111111): Zeile 1|1 = 3, Spalte 1111 = 15 → Wert 13 = 1101. Rechts: **1101**.
- 1010 ≠ 1101 → nichtlinear. ✓

> **Typische Falle:** Die Zeile kommt aus dem **ersten und letzten** Bit (nicht aus den ersten zwei!), die Spalte aus den **mittleren vier**. Wer das verwechselt, liest jeden Wert falsch ab. Und vergiss nicht, den Dezimalwert am Ende in 4 Bit zurückzuwandeln.

## Aufgabe 5 — Schwache DES-Schlüssel (Bonus)

Ein Schlüssel heißt **schwach**, wenn Ver- und Entschlüsselung dieselbe Operation sind (DES mit diesem Schlüssel ist eine Involution: zweimal anwenden ergibt wieder den Klartext).

**5.1 — Welche Subkeys?** DES entschlüsselt, indem es die 16 Rundenschlüssel in *umgekehrter* Reihenfolge anwendet. Ver- und Entschlüsselung sind also genau dann identisch, wenn die umgekehrte Reihenfolge gleich der normalen ist — das heißt, wenn **alle 16 Subkeys gleich** sind (K1 = K2 = … = K16). Das passiert genau dann, wenn die beiden Schlüsselhälften nach der Permuted-Choice jeweils ganz aus Nullen oder ganz aus Einsen bestehen, denn dann ändern die Rundenrotationen nichts mehr.

**5.2 — Die 4 schwachen Schlüssel** (mit Paritätsbits, hexadezimal) sind: 0101010101010101 (beide Hälften nur Nullen), FEFEFEFEFEFEFEFE (nur Einsen), 1F1F1F1F0E0E0E0E und E0E0E0E0F1F1F1F1 (eine Hälfte Nullen, die andere Einsen).

**5.3 — Wahrscheinlichkeit.** Bei effektiv 56 Bit gibt es 2⁵⁶ Schlüssel, davon 4 schwache. Also P = 4 / 2⁵⁶ = 2⁻⁵⁴ ≈ 5,6 · 10⁻¹⁷ — verschwindend gering. Schwache Schlüssel sind ein theoretisch wichtiges, praktisch winziges Risiko (man vermeidet sie einfach).

## Klausur-Fokus

Trainiere drei Dinge, bis sie sitzen: (1) **Vernam von Hand** — Buchstaben↔Zahlen, addieren, mod 26, und die Erkenntnis „doppelt verschlüsseln bringt nichts, weil die Schlüssel sich addieren". (2) **XOR-Malleability** — gib zu einem gegebenen alten/neuen Wert das Δ an (Δ = alt ⊕ neu) oder rekonstruiere bei known-plaintext den Schlüsselstrom (s = x ⊕ y) und baue daraus ein neues Chiffrat. (3) **S-Box ablesen** — Zeile aus äußeren Bits, Spalte aus inneren vier, und Nichtlinearität zeigen, indem du S(x1)⊕S(x2) gegen S(x1⊕x2) rechnest. Dazu die Begriffe parat haben: Konfusion/Diffusion mit ihren DES-Bausteinen, die 56-Bit-Geschichte (NSA), und der Feistel-Trick, dass XOR die Runde umkehrbar macht.`,
  },
};

const ueb03: Explanation = {
  id: "cs-2025-u03",
  lesson: 4,
  title: {
    de: "Lösungsweg — Übungsblatt 3: Betriebsmodi (ECB/CBC/OFB) & RSA",
  },
  content: {
    de: `Eine Blockchiffre wie AES verschlüsselt immer nur einen Block fester Größe. Echte Nachrichten sind länger — und *wie* man die Blöcke aneinanderhängt, entscheidet über Sicherheit. Genau das sind die **Betriebsmodi**. Die erste Aufgabe lässt dich ECB, CBC und OFB mit einer winzigen Spielzeug-Chiffre von Hand durchrechnen, damit du den Unterschied im Knochenmark spürst. Die zweite Aufgabe ist deine erste vollständige RSA-Rechnung. Wir machen beides Schritt für Schritt.

## Aufgabe 1 — Betriebsmodi mit einer 5-Bit-Spielzeugchiffre

Statt AES nimmt das Blatt eine durchschaubare Blockchiffre mit 5-Bit-Blöcken: sie *permutiert* nur die Bits. Konkret:

> e(b1 b2 b3 b4 b5) = (b2 b5 b4 b1 b3)

Das liest du so: die Ausgabe entsteht, indem man an Position 1 das Bit b2 schreibt, an Position 2 das b5, an Position 3 das b4, an Position 4 das b1, an Position 5 das b3. Mehr macht e(·) nicht. Klartext: x = 01101 11011 11010 00110 (vier Blöcke x1…x4).

### ECB — jeder Block für sich

**ECB** (Electronic Code Book) ist der naivste Modus: jeder Block wird einzeln und unabhängig verschlüsselt, y_i = e(x_i). Wenden wir die Permutation auf jeden Block an:

| Block | b1 b2 b3 b4 b5 | → (b2 b5 b4 b1 b3) | y_i |
|---|---|---|---|
| x1 = 01101 | 0 1 1 0 1 | 1 1 0 0 1 | **11001** |
| x2 = 11011 | 1 1 0 1 1 | 1 1 1 1 0 | **11110** |
| x3 = 11010 | 1 1 0 1 0 | 1 0 1 1 0 | **10110** |
| x4 = 00110 | 0 0 1 1 0 | 0 0 1 0 1 | **00101** |

ECB-Chiffrat: **y = 11001 11110 10110 00101**.

**Warum ECB gefährlich ist:** gleiche Klartextblöcke ergeben *immer* dasselbe Chiffrat. Verschlüsselt man ein Bild, bleiben große einfarbige Flächen als Muster sichtbar — das berühmte „ECB-Pinguin"-Bild zeigt das. ECB versteckt die Struktur der Daten nicht.

### CBC — jeder Block wird in den nächsten verkettet

**CBC** (Cipher Block Chaining) repariert das: bevor ein Block verschlüsselt wird, wird er mit dem *vorherigen Chiffratblock* per XOR vermischt. Für den allerersten Block gibt es keinen Vorgänger, deshalb der **Initialisierungsvektor IV**. Die Regel: y_i = e(x_i ⊕ y_{i−1}), mit y_0 = IV = 11001.

- y1 = e(x1 ⊕ IV) = e(01101 ⊕ 11001) = e(10100) = **00011**
- y2 = e(x2 ⊕ y1) = e(11011 ⊕ 00011) = e(11000) = **10010**
- y3 = e(x3 ⊕ y2) = e(11010 ⊕ 10010) = e(01000) = **10000**
- y4 = e(x4 ⊕ y3) = e(00110 ⊕ 10000) = e(10110) = **00111**

CBC-Chiffrat: **y = 00011 10010 10000 00111**. (In der Musterlösung ist nur die Zusammenfassungszeile verrutscht — maßgeblich sind die vier Einzelschritte, die wir hier nachgerechnet haben.) Der Effekt: derselbe Klartextblock liefert je nach Vorgeschichte ein *anderes* Chiffrat — die ECB-Muster verschwinden.

### OFB — die Chiffre erzeugt einen Schlüsselstrom

**OFB** (Output Feedback) macht aus der Blockchiffre eine **Stromchiffre**: man verschlüsselt gar nicht den Klartext direkt, sondern erzeugt aus dem IV einen Schlüsselstrom, indem man e(·) immer wieder auf seine eigene Ausgabe anwendet, und XORt diesen Strom dann auf den Klartext. Schlüsselstrom: s_1 = e(IV), s_i = e(s_{i−1}); Chiffrat: y_i = s_i ⊕ x_i.

- s1 = e(11001) = 11010, s2 = e(11010) = 10110, s3 = e(10110) = 00111, s4 = e(00111) = 01101
- y1 = s1 ⊕ x1 = 11010 ⊕ 01101 = **10111**
- y2 = s2 ⊕ x2 = 10110 ⊕ 11011 = **01101**
- y3 = s3 ⊕ x3 = 00111 ⊕ 11010 = **11101**
- y4 = s4 ⊕ x4 = 01101 ⊕ 00110 = **01011**

OFB-Chiffrat: **y = 10111 01101 11101 01011**. Wichtig: der Schlüsselstrom hängt *nur* vom IV und vom Schlüssel ab, nicht vom Klartext — man könnte ihn sogar im Voraus berechnen.

> **Eselsbrücke:** ECB = jeder Block allein (Muster bleiben). CBC = Chiffrat des Vorgängers wird *vor* die Chiffre per XOR eingespeist. OFB = Chiffre läuft im Kreis und erzeugt einen Schlüsselstrom, der *nach* der Chiffre per XOR auf den Klartext kommt.

## Aufgabe 2 — RSA von Hand

RSA ist **asymmetrisch**: es gibt einen öffentlichen Schlüssel zum Verschlüsseln und einen privaten zum Entschlüsseln. Die Schlüsselerzeugung in fünf Schritten (steht so im Blatt): zwei Primzahlen p, q wählen → N = p·q → Totient T = (p−1)(q−1) → e und d so, dass (e·d) mod T = 1 → Public (N, e), Private (N, d). Verschlüsseln: y = x^e mod N. Entschlüsseln: x = y^d mod N.

**Aufgabe 2a — Schlüssel zuordnen.** Gegeben p=2, q=7, N=14, T=6, e=5, d=11. Der **Public-Key** ist das Paar mit e: **(N, e) = (14, 5)**. Der **Private-Key** ist das Paar mit d: **(N, d) = (14, 11)**. (Kurzprobe, dass die Schlüssel zusammenpassen: e·d = 5·11 = 55, und 55 mod 6 = 1. ✓ — genau die Bedingung aus Schritt 4.)

### Schritt für Schritt — Aufgabe 2b: „BCD" verschlüsseln und prüfen

Erst die Buchstaben in Zahlen (Tabelle): B=1, C=2, D=3. Jede Zahl muss kleiner als N=14 sein — passt. **Verschlüsseln** mit y = x^5 mod 14:

| Buchstabe | x | x⁵ | mod 14 | Chiffre |
|---|---|---|---|---|
| B | 1 | 1 | 1 | **B** |
| C | 2 | 32 | 4 | **E** |
| D | 3 | 243 | 5 | **F** |

Bei C: 2⁵ = 32, und 32 = 2·14 + 4, also mod 14 = 4 = E. Bei D: 3⁵ = 243 = 17·14 + 5, also mod 14 = 5 = F. Das Chiffrat ist **BEF**.

**Kontrolle durch Entschlüsseln** mit x = y^11 mod 14 — kommt wieder BCD heraus?

- y1 = 1: 1¹¹ mod 14 = 1 = B ✓
- y2 = 4: 4¹¹ mod 14. Die Potenzen von 4 mod 14 laufen im Zyklus 4, 2, 8, 4, 2, 8 … (Periode 3); der 11. Wert ist 2 = C ✓
- y3 = 5: 5¹¹ mod 14. Potenzen von 5 mod 14: 5, 11, 13, 9, 3, 1 (Periode 6); der 11. Wert (11 mod 6 = 5 → fünfter im Zyklus) ist 3 = D ✓

Entschlüsseln liefert wieder **BCD** — die Rechnung ist konsistent. (Der Trick beim Potenzieren mod N von Hand: nie die Riesenzahl ausrechnen, sondern nach jedem Schritt sofort mod N reduzieren, dann bleiben die Zahlen klein.)

**Aufgabe 2c — symmetrisch vs. asymmetrisch.**

| | symmetrisch (z. B. AES) | asymmetrisch (z. B. RSA) |
|---|---|---|
| Schlüssel | *ein* gemeinsamer Schlüssel | Schlüsselpaar (öffentlich + privat) |
| Tempo | sehr schnell | langsam |
| Schlüsselverteilung | Problem: jeder Kanal braucht einen eigenen Schlüssel | einfach: öffentlichen Schlüssel kann man frei verteilen |
| Signaturen / Nachweisbarkeit | nicht möglich | möglich (digitale Signatur, Nonrepudiation) |

**Aufgabe 2d — Schlüsselanzahl für 120 Mitarbeiter.** Bei **AES** braucht jedes *Paar* von Personen einen eigenen gemeinsamen Schlüssel. Anzahl Paare = n·(n−1)/2 = 120·119/2 = **7140 Schlüssel**. Bei **RSA** hat jede Person *ein* Schlüsselpaar, und der öffentliche Teil wird einfach mit allen geteilt — also nur **120 Schlüsselpaare**. Das ist der Skalierungsvorteil asymmetrischer Verfahren: linear statt quadratisch.

**Aufgabe 2e — 1-GB-Video entschlüsseln.** 1 GB = 8·10⁹ Bit.

- RSA bei 100 kbit/s = 10⁵ Bit/s: 8·10⁹ / 10⁵ = 8·10⁴ s = 80 000 s ≈ **22,2 Stunden**.
- AES bei 17 Mbit/s = 1,7·10⁷ Bit/s: 8·10⁹ / 1,7·10⁷ ≈ 471 s ≈ **7 min 51 s**.

**Aufgabe 2f — woher der Unterschied, und wie kombiniert man die Vorteile?** RSA rechnet teure modulare Potenzen mit riesigen Zahlen; AES macht nur billige Bit-Operationen (Substitution, Permutation, XOR) — daher der gewaltige Tempo-Unterschied. Die Lösung ist die **Hybridverschlüsselung**: man benutzt das langsame asymmetrische Verfahren *nur*, um einen zufälligen symmetrischen Sitzungsschlüssel sicher auszutauschen, und verschlüsselt die eigentlichen Daten dann schnell mit AES. Genau so arbeitet TLS — das verbindet RSAs einfache Schlüsselverteilung mit AES' Geschwindigkeit.

> **Eselsbrücke:** „Asymmetrisch fürs Schloss, symmetrisch für die Last." RSA tauscht nur den Schlüssel, AES trägt die Daten.

## Klausur-Fokus

Drei Fertigkeiten: (1) **Betriebsmodi von Hand** — die CBC-Kette (XOR mit vorigem Chiffrat *vor* der Chiffre) und den OFB-Schlüsselstrom (Chiffre läuft im Kreis, XOR *nach* der Chiffre) sauber durchziehen, und in einem Satz sagen können, warum ECB Muster durchscheinen lässt. (2) **RSA rechnen** — Schlüsselpaar zuordnen, x^e mod N und y^d mod N, immer früh modulo reduzieren; und e·d ≡ 1 (mod T) als Konsistenzbedingung kennen. (3) **Die großen Vergleiche** — Schlüsselanzahl n(n−1)/2 (symmetrisch) gegen n Paare (asymmetrisch), das Tempo-Argument, und die Hybrid-Idee als Auflösung.`,
  },
};

const ueb04: Explanation = {
  id: "cs-2025-u04",
  lesson: 4,
  title: {
    de: "Lösungsweg — Übungsblatt 4: Wiederholung (Kerckhoffs, AES-Brute-Force, Stromchiffre, S-Box-Angriff)",
  },
  content: {
    de: `Dieses Blatt ist eine Wiederholung der gesamten symmetrischen Kryptografie — und genau deshalb ein perfekter Klausur-Probelauf. Es prüft die Grundbegriffe, lässt dich die Langzeitsicherheit von AES *ausrechnen* (statt nur zu behaupten), verallgemeinert die Stromchiffre vom Bit aufs Alphabet, und endet mit einem kleinen, aber lehrreichen Angriff auf eine S-Box. Wir gehen alles der Reihe nach durch.

## Aufgabe 1 — Grundbegriffe sicher beherrschen

**Kerckhoffs'sches Prinzip:** Die Sicherheit eines Kryptosystems darf *nur* von der Geheimhaltung des Schlüssels abhängen, niemals von der Geheimhaltung des Algorithmus. Anschaulich: Caesar ist bei bekanntem Verfahren völlig unsicher, RSA bleibt trotz komplett öffentlichem Algorithmus sicher — weil bei RSA das Geheimnis allein im Schlüssel steckt.

**Der gegenteilige Ansatz** — die Sicherheit auf der Geheimhaltung des *Designs* aufzubauen — heißt **Security by Obscurity** und gilt als schlechte Praxis (sobald das Design durchsickert, ist alles offen).

**Kryptologie** teilt sich in zwei Teilgebiete: **Kryptografie** (das *Bauen* von Schutz, z. B. Verschlüsselung) und **Kryptanalyse** (das *Brechen* von Kryptosystemen). Die klassische Situation: Alice und Bob reden über einen *unsicheren Kanal*, und Oscar (der Angreifer) kann alles mitlesen — deshalb müssen sie kryptografische Algorithmen einsetzen, sonst liegt jede Nachricht offen.

**Die Notation, die du im ganzen Kurs brauchst** (häufige Klausurfrage — einfach auswendig):

| Symbol | Bedeutung |
|---|---|
| x | Klartext (plaintext) |
| y | Chiffrat (ciphertext) |
| e(·) | Verschlüsselungsfunktion |
| d(·) | Entschlüsselungsfunktion |
| k | Schlüssel |
| K | Schlüsselraum (Menge aller Schlüssel) |
| \\|K\\| | Anzahl möglicher Schlüssel |

> **Typische Falle:** kleines **k** ist *ein* Schlüssel, großes **K** ist der ganze *Schlüsselraum*. Verwechsle die beiden nicht.

## Aufgabe 2 — Brute-Force gegen AES-128 ausrechnen

**2a — Wie viele Schlüssel?** Ein 128-Bit-Schlüssel ist eine Folge aus 128 Nullen/Einsen, jede Stelle unabhängig zwei Möglichkeiten: |K| = **2¹²⁸**.

**2b — Wie lange dauert die vollständige Suche mit ASICs?** Reine Einheiten-Rechnung, Schritt für Schritt:

- Kosten pro ASIC: 40 € + 100 % Overhead = **80 €**.
- Bei 10⁶ € Budget: 10⁶ / 80 = **12 500 ASICs**.
- Jeder testet 7·10⁸ Schlüssel/s, zusammen 7·10⁸ · 12 500 = **8,75·10¹² Schlüssel/s**.
- Im Durchschnitt muss man nur die *Hälfte* aller Schlüssel testen: 2¹²⁷ Stück.
- Zeit: 2¹²⁷ / (8,75·10¹²) ≈ 1,94·10²⁵ Sekunden ≈ **6,16·10¹⁷ Jahre**.

Das Universum ist etwa 10¹⁰ Jahre alt — die Suche dauert also rund **10⁷-mal so lange wie das gesamte bisherige Alter des Universums**. Das ist die quantitative Begründung dafür, warum AES-128 als langzeitsicher gilt: nicht „weil es schwer aussieht", sondern weil man es ausrechnen kann.

> **Eselsbrücke:** Jedes zusätzliche Schlüssel-Bit *verdoppelt* den Aufwand. Bei 128 Bit ist selbst die halbe Suche (2¹²⁷) mit Spezialhardware und Millionenbudget jenseits jeder vorstellbaren Zeit.

## Aufgabe 3 — Stromchiffre vom Bit aufs Alphabet verallgemeinern

Die binäre Stromchiffre rechnet y_i = x_i ⊕ s_i = (x_i + s_i) mod 2. Jetzt soll sie direkt auf Buchstaben laufen.

- **3a — Welches Alphabet?** Im Originalfall nur Bits: {0, 1}.
- **3b — Neuer Modulus?** Bei A…Z (als 0…25 kodiert) wiederholt sich das Alphabet alle 26 Zeichen, also **m = 26** statt 2.
- **3c — Wie sieht der Schlüsselstrom aus?** Jeder Schlüsselstrom-Wert s_i kommt jetzt aus {0, 1, …, 25} (statt nur {0, 1}).
- **3d — Was ändert sich an der Entschlüsselung?** Aus dem XOR (das mod 2 nichts anderes als Addition/Subtraktion ist) wird jetzt eine echte Subtraktion mod 26: Verschlüsseln y_i = (x_i + s_i) mod 26, Entschlüsseln **x_i = (y_i − s_i) mod 26**.

### Schritt für Schritt — 3e: HWHWZB mit Schlüssel BSASRP entschlüsseln

Buchstaben in Zahlen, dann stellenweise (Chiffrebuchstabe − Schlüsselbuchstabe) mod 26:

| Chiffre | y | Schlüssel | k | y − k mod 26 | Klartext |
|---|---|---|---|---|---|
| H | 7 | B | 1 | 6 | **G** |
| W | 22 | S | 18 | 4 | **E** |
| H | 7 | A | 0 | 7 | **H** |
| W | 22 | S | 18 | 4 | **E** |
| Z | 25 | R | 17 | 8 | **I** |
| B | 1 | P | 15 | −14 → 12 | **M** |

Der Klartext ist **GEHEIM**. Achte auf die letzte Stelle: 1 − 15 = −14, und −14 mod 26 = 26 − 14 = 12 = M. Negative Zwischenergebnisse einfach um 26 nach oben schieben — das ist die einzige Stelle, an der man hier stolpert.

## Aufgabe 4 — Angriff auf eine reduzierte S-Box-Chiffre

Gegeben eine bewusst schwache Chiffre: y = S1(x ⊕ k), mit 6-Bit-Eingaben x und k, 4-Bit-Ausgabe y, und S1 = erste DES-S-Box. Du kennst zwei Klartext-Chiffrat-Paare: (x1 = 111000, y1 = 1100) und (x2 = 000111, y2 = 0110). Gesucht ist der Schlüssel k.

**4a — Blockdiagramm.** x und k werden zuerst per XOR verknüpft, das Ergebnis geht in die S-Box S1, heraus kommt y. Also: (x ⊕ k) → S1 → y.

**4b — Wie oft kommt jeder 4-Bit-Ausgabewert vor?** Es gibt 2⁶ = 64 mögliche 6-Bit-Eingaben, aber nur 2⁴ = 16 mögliche Ausgaben. Bei Gleichverteilung also 64 / 16 = **4-mal** — anschaulich: in jeder der 4 Zeilen der S-Box steht jeder Wer­t genau einmal, macht 4 Vorkommen über alle Zeilen.

**4c — Wie viele Schlüsselkandidaten liefert *ein* Paar?** Da y aus 4 verschiedenen Eingaben entstehen kann, gibt es zu y genau 4 Urbilder unter S1. Jedes Urbild ist ein mögliches (x ⊕ k), also ergeben sich **4 Kandidaten** für k (denn k = x ⊕ Urbild). Ein einzelnes Paar reicht nicht — es bleiben vier Verdächtige.

### Schritt für Schritt — 4d: k bestimmen

**Idee:** Für jedes Paar berechne alle 4 Schlüsselkandidaten (k = x ⊕ S1⁻¹(y)), und nimm den Schlüssel, der in *beiden* Listen auftaucht.

**Paar 1 (x1 = 111000, y1 = 1100 = dezimal 12).** Die vier Urbilder von 12 in S1 (der Wert 12 steht in Zeile 0 Spalte 11, Zeile 1 Spalte 10, Zeile 2 Spalte 9, Zeile 3 Spalte 1; daraus die 6-Bit-Eingabe als Zeile=äußere Bits, Spalte=innere Bits): 010110, 010101, 110010, 100011. Jetzt k = x1 ⊕ Urbild:

- 111000 ⊕ 010110 = 101110
- 111000 ⊕ 010101 = **101101**
- 111000 ⊕ 110010 = 001010
- 111000 ⊕ 100011 = 011011

**Paar 2 (x2 = 000111, y2 = 0110 = dezimal 6).** Die vier Urbilder von 6: 010100, 010011, 101010, 111101. Jetzt k = x2 ⊕ Urbild:

- 000111 ⊕ 010100 = 010011
- 000111 ⊕ 010011 = 010100
- 000111 ⊕ 101010 = **101101**
- 000111 ⊕ 111101 = 111010

**Schnittmenge bilden.** Liste 1 = {101110, **101101**, 001010, 011011}, Liste 2 = {010011, 010100, **101101**, 111010}. Der einzige Schlüssel, der in *beiden* Listen steht, ist **k = 101101**. Das ist der gesuchte Schlüssel.

> **Eselsbrücke:** Ein Klartext-Chiffrat-Paar grenzt den Schlüssel nur auf wenige Kandidaten ein; erst der *Schnitt* mehrerer Paare macht ihn eindeutig. Genau dieses „mehrere Beobachtungen schneiden" ist das Herz vieler kryptanalytischer Angriffe.

## Klausur-Fokus

Das hier ist die Generalprobe für den symmetrischen Teil. Sicher können: (1) Kerckhoffs in einem Satz + den Gegenbegriff Security by Obscurity, Kryptografie vs. Kryptanalyse, und die Symboltabelle (x, y, e, d, k, K, |K|). (2) Eine **Schlüsselraum-/Brute-Force-Rechnung** sauber durchziehen — Schlüsselanzahl als Zweierpotenz, Hardware-Durchsatz, Faktor „nur die Hälfte im Schnitt", Vergleich mit dem Universumsalter. (3) Eine Stromchiffre **subtraktiv mod 26 entschlüsseln** (negativ → +26). (4) Den **S-Box-Angriff mit Schnittmenge** — Urbilder über die S-Box finden, Kandidaten k = x ⊕ Urbild bilden, und über zwei Paare schneiden.`,
  },
};

const ueb05: Explanation = {
  id: "cs-2025-u05",
  lesson: 5,
  title: {
    de: "Lösungsweg — Übungsblatt 5: RSA vervollständigen, Signaturen & Hash-Signaturen",
  },
  content: {
    de: `Dieses Blatt hat einen heimlichen Star, an dem fast alle hängen bleiben: das Berechnen des privaten Schlüssels d. In den ersten RSA-Aufgaben war d geschenkt — jetzt musst du es selbst finden, und dafür brauchst du den **erweiterten euklidischen Algorithmus**. Genau diesen Schritt rechnen wir hier ganz langsam vor, denn er ist der eine Trick, der RSA-Aufgaben von „unlösbar" zu „Routine" macht. Dazu lernst du, was eine Signatur ist (RSA rückwärts) und warum man in der Praxis nicht das Dokument, sondern seinen Hash signiert.

## Aufgabe 1 — RSA-Grundwissen

- **Wann entwickelt, wie lange patentiert?** Entwickelt **1977**, in den USA patentiert bis **2000**.
- **Wofür steht RSA?** Nach den drei Erfindern **R**ivest, **S**hamir, **A**dleman.
- **Worauf beruht die Sicherheit?** Auf dem **Faktorisierungsproblem**: zwei große Primzahlen zu *multiplizieren* ist leicht, aber das Produkt wieder in seine Primfaktoren zu *zerlegen* ist (für große Zahlen) praktisch unmöglich. Wer N = p·q faktorisieren könnte, hätte sofort den privaten Schlüssel.
- **Welche Bitlänge für 128-Bit-Sicherheit?** Bei RSA ca. **3072 Bit** — asymmetrische Schlüssel müssen viel länger sein als symmetrische für dasselbe Sicherheitsniveau.

## Aufgabe 2 — Schlüsselpaar vervollständigen

Hier fehlt jeweils d, und du musst zuerst prüfen, ob überhaupt ein gültiges RSA-Paar möglich ist. Der Ablauf ist immer derselbe: N und φ(N) ausrechnen, prüfen ob e teilerfremd zu φ(N) ist, und falls ja, d als das **modulare Inverse** von e berechnen.

**Teil a) — p = 23, q = 43, e = 71.**

- N = p·q = 23·43 = **989**.
- φ(N) = (p−1)(q−1) = 22·42 = **924**.
- Ist e gültig? Prüfe ggT(924, 71). 71 ist prim und teilt 924 nicht, also ggT = 1 → e ist erlaubt.

Jetzt der Kern: **d ist die Zahl mit (e·d) mod φ(N) = 1**, also das Inverse von e modulo φ(N). *Warum diese Bedingung?* Weil beim Entschlüsseln (x^e)^d = x^{e·d} herauskommen soll, und nur wenn e·d ≡ 1 (mod φ(N)) ist, liefert Eulers Satz x^{e·d} ≡ x (mod N) — der Klartext kommt unversehrt zurück. d findest du mit dem erweiterten euklidischen Algorithmus.

### Schritt für Schritt — d = 71⁻¹ mod 924 mit dem erweiterten Euklid

**Vorwärts (normaler Euklid, gcd suchen):** teile immer mit Rest, bis der Rest 0 wird.

    924 = 13 · 71 + 1     (denn 13·71 = 923, Rest 1)
     71 =  71 ·  1 + 0     (Rest 0 → fertig, ggT = 1)

**Rückwärts (die eine Gleichung mit Rest 1 nach 1 auflösen):**

    1 = 924 − 13 · 71

Jetzt liest du diese Gleichung modulo 924: der Term 924 fällt weg (924 ≡ 0), übrig bleibt **−13 · 71 ≡ 1 (mod 924)**. Also ist 71⁻¹ ≡ −13. Negative Inverse schiebt man in den positiven Bereich: −13 + 924 = **911**. Damit ist **d = 911**.

**Probe:** 71 · 911 = 64 681 = 70 · 924 + 1, also 71·911 mod 924 = 1. ✓ Das Schlüsselpaar ist Public (989, 71), Private (989, 911).

**Verschlüsseln** des Klartexts x = 134: y = 134⁷¹ mod 989 = **632**. (So ein Riesen-Exponent rechnet man nie direkt aus, sondern mit **Square-and-Multiply** und reduziert nach jedem Schritt mod 989, sodass die Zahlen klein bleiben.)

**Teil b) — p = 31, q = 59, e = 185.**

- N = 31·59 = 1829, φ(N) = 30·58 = **1740**.
- Prüfe ggT(1740, 185): 185 = 5·37, und 1740 = 5·348 — beide durch 5 teilbar, also ggT = **5 ≠ 1**.

Damit ist e **nicht** teilerfremd zu φ(N), es existiert kein modulares Inverse → **kein gültiges RSA-Schlüsselpaar**. Genau dafür ist die ggT-Prüfung da: sie sagt dir *vor* der ganzen Rechnerei, ob ein d überhaupt existiert.

> **Typische Falle:** Immer zuerst ggT(φ(N), e) prüfen. Ist er nicht 1, hörst du sofort auf — es gibt kein d. Viele rechnen blind weiter und produzieren Unsinn.

## Aufgabe 3 — Signaturen: RSA rückwärts

Eine **Signatur** ist RSA „andersherum": Alice signiert mit ihrem *privaten* Schlüssel, jeder kann mit ihrem *öffentlichen* Schlüssel prüfen. Signieren: s = m^d mod N. Verifizieren: m = s^e mod N. Weil nur Alice d kennt, kann nur sie eine Signatur erzeugen, die mit ihrem öffentlichen e zu einem sinnvollen m „aufgeht" — das ist der Beweis der Urheberschaft (Nonrepudiation).

**Aufgabe 3a — Signatur für 'R' (= 17).** Mit den gegebenen Parametern (N = 21257891, d = 17230733): s = m^d mod N = 17^17230733 mod 21257891 = **12 246 481**. (Wieder Square-and-Multiply mit Tool; die Klausur fragt vor allem nach der *Formel* s = m^d mod N und der Richtung „privat zum Signieren".)

### Schritt für Schritt — Aufgabe 3b: Hash-Signatur für „RSAISTCOOL"

Große Dokumente signiert man nicht direkt — man signiert ihren **Hash** (einen kurzen Fingerabdruck). Hier ist die (Spielzeug-)Hashfunktion „Summe der ASCII-Werte". Erst den Hash bilden:

| R | S | A | I | S | T | C | O | O | L |
|---|---|---|---|---|---|---|---|---|---|
| 82 | 83 | 65 | 73 | 83 | 84 | 67 | 79 | 79 | 76 |

Summe: 82+83+65+73+83+84+67+79+79+76 = **771**. Das ist der Hashwert x = H(m).

Dann signierst du *den Hash* (nicht den Text) mit dem privaten Schlüssel: s = x^d mod N = 771^17230733 mod 21257891 = **11 094 112**. Bob würde zum Prüfen denselben Hash 771 selbst bilden und mit s^e mod N vergleichen — stimmen beide überein, ist die Nachricht echt und unverändert.

> **Eselsbrücke:** Verschlüsseln nutzt den *öffentlichen* Schlüssel (jeder darf dir Geheimes schicken), Signieren den *privaten* (nur du kannst unterschreiben). Und immer den **Hash** signieren, nicht das ganze Dokument — kurz, schnell, und jede Änderung am Dokument zerstört die Signatur.

## Klausur-Fokus

Das absolute Muss dieses Blatts ist der **erweiterte Euklid zum Finden von d**: forward teilen bis Rest 1, dann die Gleichung „1 = … − q·e" rückwärts lesen, das Vorzeichen-Inverse in den positiven Bereich schieben, mit e·d mod φ(N) = 1 gegenprüfen. Dazu: die ggT-Prüfung *vorher* (gcd ≠ 1 → kein Schlüssel), die RSA-Fakten (1977, Faktorisierung, 3072 Bit), und die Signatur-Richtungen sicher beherrschen — s = m^d mod N zum Signieren, s^e mod N zum Prüfen, und immer den Hash signieren. Square-and-Multiply solltest du benennen können als die Methode, mit der man x^e mod N effizient rechnet.`,
  },
};

const ueb06: Explanation = {
  id: "cs-2025-u06",
  lesson: 6,
  title: {
    de: "Lösungsweg — Übungsblatt 6: Hash-Tabellen, Kollisionswahrscheinlichkeit & Passwort-Hashing",
  },
  content: {
    de: `Hashing hat zwei Gesichter, und dieses Blatt zeigt beide. Das eine ist die *uncryptografische* Hash-Tabelle — eine Datenstruktur, die Suchen blitzschnell macht. Das andere ist die *kryptografische* Anwendung: das sichere Speichern von Passwörtern. Dazwischen liegt eine Wahrscheinlichkeitsrechnung, die direkt das Geburtstagsparadoxon aus der Vorlesung aufgreift und erklärt, warum Kollisionen viel früher kommen, als man denkt. Wir rechnen die Tabellen von Hand und führen die Formeln Schritt für Schritt her.

## Aufgabe 1 — Hash-Tabellen mit separate chaining

Eine **Hash-Tabelle** ordnet jeden Eintrag über seinen Schlüssel einem von m Behältern (Buckets) zu. Die Hashfunktion ist hier ganz simpel: **H(k) = k mod 6**, es gibt also 6 Buckets (0–5). Landen zwei Schlüssel im selben Bucket (eine **Kollision**), hängt man sie nach dem Prinzip **separate chaining** einfach hintereinander in eine Liste.

### Schritt für Schritt — Tabelle 1 befüllen

Einfügereihenfolge: 71, 36, 22, 38, 11, 10, 1, 6, 4, 112, 42. Für jeden Wert rechnest du k mod 6 und hängst ihn an:

| k | k mod 6 | Bucket |
|---|---|---|
| 71 | 5 | 5 |
| 36 | 0 | 0 |
| 22 | 4 | 4 |
| 38 | 2 | 2 |
| 11 | 5 | 5 (hinter 71) |
| 10 | 4 | 4 (hinter 22) |
| 1 | 1 | 1 |
| 6 | 0 | 0 (hinter 36) |
| 4 | 4 | 4 (hinter 10) |
| 112 | 4 | 4 (hinter 4) |
| 42 | 0 | 0 (hinter 6) |

Ergebnis:

| Bucket | 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|---|
| Inhalt | 36, 6, 42 | 1 | 38 | — | 22, 10, 4, 112 | 71, 11 |

### Tabelle 2 — dieselben Zahlen, andere Reihenfolge

Einfügereihenfolge: 42, 71, 6, 22, 38, 36, 11, 10, 1, 4, 112. Die Restklassen sind natürlich dieselben (42 mod 6 = 0, 6 mod 6 = 0, 36 mod 6 = 0 …), also landen exakt dieselben Zahlen in denselben Buckets:

| Bucket | 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|---|
| Inhalt | 42, 6, 36 | 1 | 38 | — | 22, 10, 4, 112 | 71, 11 |

**Worin unterscheiden sich die Tabellen?** Nur in der **Reihenfolge innerhalb der Ketten** — schau Bucket 0 an: einmal 36, 6, 42 und einmal 42, 6, 36. Welche Zahlen in welchem Bucket liegen, ist identisch (das bestimmt allein H(k)); aber *wer zuerst kam, steht vorne in der Liste*. Die Einfügereihenfolge ändert die Verkettung, nicht die Verteilung.

### Kollisionswahrscheinlichkeit herleiten

**P(keine Kollision in Schritt i).** Beim i-ten Einfügen sind bereits (i−1) Buckets belegt. Von m Buckets sind also noch m − (i−1) frei, und bei Gleichverteilung trifft der neue Schlüssel mit Wahrscheinlichkeit

> **P(i) = (m − (i − 1)) / m**

einen *freien* Bucket. Anschaulich bei m = 6: Schritt 1 hat P = 6/6 = 1 (noch nichts da), Schritt 2 P = 5/6, dann 4/6, 3/6, 2/6, 1/6, und ab Schritt 7 ist P = 0 — bei 6 Buckets und 7 Schlüsseln *muss* es kollidieren (Schubfachprinzip).

**P(keine Kollision für n Schlüssel)** ist dann das Produkt all dieser Einzelschritte (alle müssen kollisionsfrei sein):

> P(keine Kollision) = ∏ (von i=1 bis n) (m − (i − 1)) / m

**Geburtstagsnäherung (Teilaufgabe mit 48-Bit-Adressraum).** Für N mögliche Hashwerte und k eingefügte Werte gilt P(Kollision) ≈ 1 − e^(−k(k−1)/(2N)). Mit k = 2,3·10⁷ Dateien und N = 2⁴⁸ ≈ 2,8·10¹⁴:

- Exponent: k(k−1)/(2N) ≈ (2,3·10⁷)² / (2 · 2,8·10¹⁴) ≈ 5,3·10¹⁴ / 5,6·10¹⁴ ≈ 0,94.
- P(Kollision) ≈ 1 − e^(−0,94) ≈ 1 − 0,39 ≈ **0,61 = 61 %**.

Das ist die Pointe des Geburtstagsparadoxons: obwohl es 2⁴⁸ ≈ 281 Billionen mögliche Hashwerte gibt, reichen schon 23 Millionen Dateien für eine Kollisionswahrscheinlichkeit von 61 %. Kollisionen kommen ungefähr ab √N Einträgen — *Wurzel* aus dem Adressraum, nicht der Adressraum selbst.

> **Eselsbrücke:** Kollisionen drohen ab etwa √N Einträgen, nicht erst ab N. Deshalb braucht ein kryptografischer Hash gegen Kollisionen die *doppelte* Bitlänge (2ⁿ Werte → Kollision schon bei 2^(n/2) Versuchen).

## Aufgabe 2 — Passwörter richtig speichern

**Warum kein Klartext?** Liegen Benutzername und Passwort im Klartext in der Datenbank, kann *jeder mit Zugriff* (Admin, Angreifer nach einem Hack, ein durchgesickertes Backup) sie sofort lesen und sich überall anmelden, wo der Nutzer dasselbe Passwort verwendet.

**Warum hilft Hashing?** Ein Hash ist eine **Einwegfunktion**: aus dem gespeicherten Hash lässt sich das Klartextpasswort nicht zurückrechnen. Beim Login hasht man die Eingabe und vergleicht nur die Hashes. Klaut ein Angreifer die Datenbank, hat er bloß Hashes — und kann sich damit nicht einloggen, weil der Login einen Klartext verlangt. Die entscheidenden Hash-Eigenschaften dafür: **Urbildresistenz** (Hash → Passwort ist praktisch unmöglich) und die **Avalanche-Eigenschaft** (kleinste Passwortänderung → komplett anderer Hash, also kein Rückschluss auf „ähnliche" Passwörter).

**Rainbow-Table-Angriff und Salting.** Eine **Rainbow-Table** ist eine riesige *vorberechnete* Tabelle „Hash → Klartextpasswort". Der Angreifer schlägt den gestohlenen Hash einfach nach; steht er drin, kennt er das Passwort — Hashing allein ist also nicht genug. Die Gegenmaßnahme ist **Salting**: vor dem Hashen hängt man an jedes Passwort eine zufällige Zeichenkette (das **Salt**). Dadurch ergibt dasselbe Passwort bei jedem Nutzer einen *anderen* Hash, und eine allgemeine Rainbow-Table wird wertlos — der Angreifer müsste für jedes einzelne Salt eine eigene Tabelle vorberechnen, was den ganzen Vorberechnungs-Vorteil zerstört.

> **Eselsbrücke:** Hashing schützt das Passwort (Einwegfunktion), Salting schützt gegen *vorberechnete* Angriffe (jedes Salt macht den Hash einzigartig). Beides zusammen ist Pflicht.

## Klausur-Fokus

Zwei Rechensachen und zwei Konzeptsachen. Rechnen: (1) eine Hash-Tabelle mit H(k)=k mod m und separate chaining korrekt befüllen — und erklären, dass die Einfügereihenfolge nur die *Kettenreihenfolge*, nicht die Bucket-Zuordnung ändert. (2) die Kollisionsformeln herleiten: P(i) = (m−(i−1))/m, das Produkt für n Schlüssel, und die Geburtstagsnäherung 1 − e^(−k(k−1)/(2N)) einsetzen können. Konzept: (3) warum Klartext-Speicherung gefährlich ist und welche Hash-Eigenschaften (Urbildresistenz, Avalanche) das Hashing rettet; (4) Rainbow-Table-Angriff und warum **Salting** ihn aushebelt. Und merke die Brücke zur Vorlesung: Kollisionen ab √N — das ist exakt der Grund für die „halbe Bitlänge"-Regel bei kryptografischen Hashes.`,
  },
};

const ueb07: Explanation = {
  id: "cs-2025-u07",
  lesson: 7,
  title: {
    de: "Lösungsweg — Übungsblatt 7: Rainbow-Tables, Bitcoin & einen Block selbst minen",
  },
  content: {
    de: `Dieses Blatt verbindet zwei Hashing-Anwendungen aus der echten Welt: das Knacken von Passwörtern mit vorberechneten Tabellen und die Blockchain. Die Krönung ist Aufgabe 3, in der du eine kleine Kryptowährung (CyberCoin) tatsächlich *minst* — also per Hand eine Nonce suchst, bis der Block-Hash gültig ist. Genau dieses Nonce-Suchen ist Proof-of-Work im Kleinformat. Wir rechnen alles aus.

## Aufgabe 1 — Wie groß und wie teuer ist eine Rainbow-Table?

Eine Rainbow-Table ist ein **Zeit-Speicher-Tausch**: man berechnet einmal *alle* Passwort-Hashes vor und speichert sie, um später jeden geklauten Hash sofort nachschlagen zu können. Die Frage ist nur: wie viele Passwörter gibt es, wie viel Platz brauchen die, und wie lange dauert das Vorberechnen?

**1a — Anzahl der Passwörter.** Bei 77 erlaubten Zeichen und fester Länge L gibt es 77^L Kombinationen (jede Stelle unabhängig 77 Möglichkeiten). Für L = 4 … 8:

| L | 77^L (Anzahl) |
|---|---|
| 4 | ≈ 3,5·10⁷ (35 153 041) |
| 5 | ≈ 2,7·10⁹ |
| 6 | ≈ 2,1·10¹¹ |
| 7 | ≈ 1,6·10¹³ |
| 8 | ≈ 1,24·10¹⁵ |

**1b — Speicherplatz.** Jede Zeile braucht 26 Byte (char(10) fürs Passwort + binary(16) für den Hash). Also Disk = Anzahl · 26 B. **1c — Rechenzeit:** bei 200 000 Hashes/s ist CPU-Zeit = Anzahl / 200 000. Das ergibt die offizielle Tabelle:

| L | Disk-Größe | CPU-Zeit |
|---|---|---|
| 4 | ≈ 913 MB | ≈ 3 Minuten |
| 5 | ≈ 70 GB | ≈ 3,75 Stunden |
| 6 | ≈ 5,4 TB | ≈ 12 Tage |
| 7 | ≈ 417 TB | ≈ 2,5 Jahre |
| 8 | ≈ 32 PB | ≈ 195 Jahre |

Die Lehre: jedes zusätzliche Zeichen multipliziert Platz *und* Zeit mit 77. Schon bei Länge 8 ist die Vorberechnung mit einer normalen CPU sinnlos — genau deshalb sind lange Passwörter (plus Salting aus Blatt 6) so wirksam gegen Rainbow-Tables.

## Aufgabe 2 — Bitcoin und Blockchain in der Theorie

**Aufbau & Zweck einer Blockchain.** Ein **Block** enthält eine Liste von Transaktionen und den **Hash des vorherigen Blocks**. Dadurch hängt jeder Block am Vorgänger — ändert jemand einen alten Block, ändert sich dessen Hash und die ganze Kette dahinter wird ungültig. So entsteht ein **manipulationssicheres, dezentrales Kassenbuch** ohne zentrale Vertrauensinstanz.

**Problem der byzantinischen Generäle.** In einem offenen Netzwerk kann man niemandem vertrauen, trotzdem müssen sich alle auf *eine* gültige Version der Kette einigen — auch wenn Betrüger („Verräter") mitmischen. Das ist das byzantinische Konsensproblem. Bitcoins Lösung: **Proof-of-Work**, und die Regel „die längste Kette gewinnt". (Alternative: Proof-of-Stake.)

**Proof of Work.** Wer einen Block anhängen will, muss erst *Arbeit* leisten — ein **Hash-Puzzle** lösen (eine Nonce finden, sodass der Block-Hash eine Bedingung erfüllt). Das ist rechenintensiv, aber leicht zu *prüfen*. Bei Bitcoin erzeugt PoW den Konsens und macht Manipulation unbezahlbar teuer; der erfolgreiche Miner bekommt eine Belohnung.

**Merkle-Tree.** Ein Baum aus Hashes: jeder Elternknoten ist der Hash seiner Kinder, ganz unten stehen die Transaktionen. Die **Merkle-Root** steht im Block-Header. So sind alle Transaktionen eines Blocks gegen Manipulation geschützt, und man kann effizient prüfen, ob eine Transaktion enthalten ist.

## Aufgabe 3 — CyberCoin selbst minen

CyberCoin nutzt eine vereinfachte Hashfunktion. Ein Block ist **gültig**, wenn block_hash ≥ 90 (Werte 0–99). Die Formeln:

> block_header = (100000 · prev_blockhash + 1000 · time + 10 · tx_root) · (nonce + 1)
>
> block_hash = ganzzahliger Teil von (block_header / 773 + 4312), dann mod 100

Minen heißt: alles außer der **Nonce** ist vorgegeben; du *probierst Nonce = 0, 1, 2, …* durch, bis der Hash ≥ 90 wird. Das ist Proof-of-Work zum Anfassen.

### Schritt für Schritt — Block 1 (prev=93, time=22, tx_root=31)

Der konstante Teil ist (100000·93 + 1000·22 + 10·31) = 9 300 000 + 22 000 + 310 = **9 322 310**. Jetzt mit verschiedenen Nonces multiplizieren und den Hash prüfen:

| nonce | header = 9 322 310 · (nonce+1) | /773 + 4312, abgeschnitten | mod 100 | gültig? |
|---|---|---|---|---|
| 0 | 9 322 310 | 16 371 | 71 | nein |
| 1 | 18 644 620 | 28 431 | 31 | nein |
| 2 | 27 966 930 | 40 491 | **91** | **ja** (≥ 90) |

Bei **nonce = 2** ist der Hash **91** — der erste gültige Block ist gemined.

### Schritt für Schritt — Block 2 (time=38, tx_root=19)

Wichtig: der neue Block verkettet sich, also ist sein **prev_blockhash = 91** (der Hash von Block 1). Konstanter Teil: (100000·91 + 1000·38 + 10·19) = 9 100 000 + 38 000 + 190 = **9 138 190**. Mit nonce = 3: header = 9 138 190 · 4 = 36 552 760; 36 552 760 / 773 + 4312 ≈ 51 598,9 → abgeschnitten 51 598; mod 100 = **98** ≥ 90 → gültig. Die fertige Tabelle:

| prev_blockhash | time | tx_root | nonce | blockhash |
|---|---|---|---|---|
| 93 | 22 | 31 | 2 | **91** |
| 91 | 38 | 19 | 3 | **98** |

Beachte die Verkettung: der blockhash von Block 1 (91) wird zum prev_blockhash von Block 2 — genau so hängt eine Blockchain zusammen.

### Schritt für Schritt — maximale Anzahl CyberCoins

Pro Block gibt es 10 Coins, aber alle **730 Blöcke halbiert** sich die Belohnung. Über alle Epochen summiert: 730·10 + 730·5 + 730·2,5 + … = 730·10·(1 + ½ + ¼ + …). Die Klammer ist eine **geometrische Reihe** mit q = ½, und 1 + ½ + ¼ + … = 1/(1−½) = 2. Also Gesamtmenge = 7300 · 2 = **14 600 CyberCoins**.

> **Eselsbrücke:** Halbierung der Belohnung + geometrische Reihe = endliche Gesamtmenge. Genau dieser Mechanismus (bei Bitcoin das „Halving") deckelt die Geldmenge — bei Bitcoin auf 21 Millionen.

## Klausur-Fokus

Drei Dinge: (1) **Rainbow-Table-Rechnung** — 77^L Kombinationen, Disk = Anzahl·26 B, Zeit = Anzahl/Hashrate, und die Erkenntnis „jedes Zeichen × 77". (2) **Bitcoin-Begriffe** sauber erklären: Blockchain (Block enthält Vorgänger-Hash → manipulationssicher), byzantinische Generäle (Konsens ohne Vertrauen), Proof-of-Work (Hash-Puzzle, längste Kette gewinnt), Merkle-Tree (Hash-Baum, Root im Header). (3) **Einen Block minen** — Nonce hochzählen bis die Gültigkeitsbedingung greift, den vorigen Hash als prev_blockhash einsetzen (Verkettung!), und die maximale Coin-Menge über die geometrische Reihe (Belohnung·Epochenlänge·1/(1−q)) ausrechnen.`,
  },
};

const ueb08: Explanation = {
  id: "cs-2025-u08",
  lesson: 8,
  title: {
    de: "Lösungsweg — Übungsblatt 8: Diffie-Hellman-Schlüsselaustausch, X.509 & Vertrauensmodelle",
  },
  content: {
    de: `Wie einigen sich zwei Fremde über eine *abgehörte* Leitung auf einen geheimen Schlüssel, den der Lauscher trotzdem nicht kennt? Das ist die fast magische Leistung des Diffie-Hellman-Schlüsselaustauschs — und der rechnerische Kern dieses Blatts. Drumherum geht es um Vertrauen: Wer bürgt im Internet dafür, dass ein öffentlicher Schlüssel wirklich der richtigen Person gehört? Das beantworten X.509-Zertifikate, das Web of Trust und Let's Encrypt. Wir rechnen erst DH dreimal vollständig durch und ordnen dann die Vertrauenswelt.

## Aufgabe 1 — Diffie-Hellman-Schlüsselaustausch

Die Idee in einem Bild: Alice und Bob mischen Farben. Öffentlich bekannt sind eine Basisfarbe und die Mischregel; geheim bleibt jeweils die eigene Zutat. Beide mischen über Kreuz und landen am Ende bei *derselben* Mischfarbe — aber ein Lauscher, der nur die ausgetauschten Mischungen sieht, kann sie nicht in die geheimen Zutaten zerlegen. In Zahlen:

- Öffentlich: eine große Primzahl **p** (der Modul) und eine Basis **g**.
- Geheim: Alice wählt **a**, Bob wählt **b**.
- Alice schickt **A = g^a mod p**, Bob schickt **B = g^b mod p**.
- Gemeinsames Geheimnis: Alice rechnet **s = B^a mod p**, Bob rechnet **s = A^b mod p**.

*Warum kommt bei beiden dasselbe heraus?* Weil B^a = (g^b)^a = g^(a·b) = (g^a)^b = A^b — die Reihenfolge der Exponenten ist egal. *Warum ist es sicher?* Der Lauscher kennt g, p, A, B, müsste daraus aber a oder b zurückrechnen — das ist das **diskrete-Logarithmus-Problem**, für große p praktisch unlösbar.

### Schritt für Schritt — a) p = 13, g = 2, a = 4, b = 5

- **A = 2⁴ mod 13** = 16 mod 13 = **3**. Alice schickt 3.
- **B = 2⁵ mod 13** = 32 mod 13 = **6**. Bob schickt 6.
- Alice: **s = B^a = 6⁴ mod 13**. Rechne schrittweise mit Zwischenreduktion: 6² = 36 ≡ 10, dann 6⁴ = 10² = 100 ≡ 9 (mod 13). **s = 9**.
- Bob zur Kontrolle: **s = A^b = 3⁵ mod 13** = 243 ≡ 9 (mod 13). Gleiches Ergebnis → **gemeinsames Geheimnis s = 9**. ✓

Genau dieses „nie die Riesenzahl bilden, sondern nach jedem Quadrieren mod p reduzieren" ist **Square-and-Multiply** — dieselbe Technik wie bei RSA.

### b) p = 23, g = 9, a = 15, b = 17

- A = 9¹⁵ mod 23. Über Quadrate: 9² ≡ 12, 9⁴ ≡ 6, 9⁸ ≡ 13; dann 9¹⁵ = 9⁸·9⁴·9²·9¹ ≡ 13·6·12·9 ≡ **6**.
- B = 9¹⁷ mod 23 = 9¹⁶·9 ≡ (9⁸)²·9 ≡ 13²·9 ≡ 8·9 ≡ **3**.
- s = B^a = 3¹⁵ mod 23 ≡ 6·12·9·3 (über dieselben Quadrate von 3) ≡ **12**; Kontrolle A^b = 6¹⁷ mod 23 ≡ **12**. → **s = 12**. ✓

### c) p = 19, g = 13, a = 10, b = 2

- A = 13¹⁰ mod 19. Quadrate: 13² ≡ 17, 13⁴ ≡ 4, 13⁸ ≡ 16; dann 13¹⁰ = 13⁸·13² ≡ 16·17 ≡ **6**.
- B = 13² mod 19 = 169 ≡ **17**.
- s = B^a = 17¹⁰ mod 19. Mit 17 ≡ −2: (−2)¹⁰ = 2¹⁰ = 1024 ≡ **17** (mod 19); Kontrolle A^b = 6² = 36 ≡ **17**. → **s = 17**. ✓

> **Eselsbrücke:** g und p sind öffentlich, a und b bleiben geheim. Beide potenzieren über Kreuz: g^(ab) erreicht man von beiden Seiten. Der Lauscher scheitert am diskreten Logarithmus.

## Aufgabe 2 — X.509-Zertifikate und ihr Widerruf

**Was macht eine CA (Certificate Authority)?** Eine CA ist eine **vertrauenswürdige dritte Partei** (Trusted Third Party). Sie prüft die Identität eines Antragstellers und stellt ein **Zertifikat** aus, das die Bindung „diese Identität ↔ dieser öffentliche Schlüssel" beglaubigt (signiert). So kann jeder, der der CA vertraut, dem Schlüssel vertrauen.

**Wie widerruft man ein Zertifikat** (z. B. wenn ein privater Schlüssel gestohlen wurde)? Zwei Ansätze:

- **CRL (Certificate Revocation List):** Die CA führt eine Sperrliste aller vorzeitig widerrufenen Zertifikate. Nachteil: bei jeder Verbindung muss man die (potenziell große) Liste abgleichen — träge.
- **OCSP (Online Certificate Status Protocol):** Echtzeit-Abfrage. Der Client schickt die Seriennummer des Zertifikats per HTTP an einen OCSP-Server, der mit dem Status antwortet: **good**, **revoked** oder **unknown**. Effizienter als das Herunterladen der ganzen CRL.

## Aufgabe 3 — CA-PKI gegen Web of Trust

Beide lösen dieselbe Frage („gehört dieser Schlüssel wirklich zu dieser Person?"), aber mit gegensätzlicher Struktur:

| | X.509 / PKI (z. B. TLS) | Web of Trust (z. B. GPG/PGP) |
|---|---|---|
| Modell | **zentral** — wenige CAs beglaubigen | **dezentral** — die Nutzer beglaubigen sich gegenseitig |
| Vertrauen | man vertraut der CA | man vertraut Freunden (und deren Freunden) |
| Aufbau | hierarchisch, formal | Netz aus signierten Schlüsseln |

- **Organisation mit zentraler Verwaltung:** PKI passt — alle Zertifikate zentral steuerbar; im Web of Trust wäre es mühsam (jeder müsste jeden zertifizieren) und ein Entzug bei Austritt schwer.
- **Privatanwender:** PKI verlangt Vertrauen in eine CA; im Web of Trust kann man Freunde einfach privat (persönliches Treffen) prüfen.
- **Aktivisten/Dissidenten:** Eine CA kann staatlich unter Druck gesetzt werden — beim Web of Trust gibt es **keine zentrale Kontrollstelle**, was sie vor staatlichen Repressalien besser schützt.

## Aufgabe 4 — Let's Encrypt

**Validierung (mindestens eine Methode).** Let's Encrypt nutzt das **ACME-Protokoll** und prüft per *Challenge*, dass du wirklich die Domain kontrollierst:

- **HTTP-01:** Der ACME-Client legt eine Datei mit einem Token unter http://DEINE-DOMAIN/.well-known/acme-challenge/ ab; Let's Encrypt ruft sie ab. Einfach zu automatisieren, nur Port 80, keine Wildcards.
- **DNS-01:** Du legst einen speziellen TXT-Eintrag unter _acme-challenge.DEINE-DOMAIN an; Let's Encrypt fragt das DNS ab. Funktioniert auch für **Wildcard-Zertifikate**, braucht aber DNS-API-Zugriff.

**Vor- und Nachteile.** Vorteile: Zertifikate sind **kostenlos**, der Identitätsnachweis läuft *technisch automatisiert* (statt teurem manuellem Prozess), und sie lassen sich leicht einbinden/erneuern. Nachteile: nur **domain-validierte** Zertifikate (keine Extended Validation), kein Support, und die kurze Lebensdauer von **90 Tagen** zwingt zur Automatisierung (das ist zugleich ein Sicherheitsvorteil — gestohlene Zertifikate verfallen schnell).

**Certificate Transparency (CT).** Jedes neu ausgestellte Zertifikat wird in öffentliche, **append-only** CT-Logs eingetragen, die kryptografisch (auf Merkle-Tree-Basis) gesichert sind. Vorteil: CAs stehen unter starker öffentlicher Kontrolle, betrügerische/falsch ausgestellte Zertifikate fallen schneller auf. Nachteil: die Logs wachsen mit der Zeit immer weiter an.

## Klausur-Fokus

Der Rechenkern ist **Diffie-Hellman**: A = g^a mod p, B = g^b mod p, s = B^a = A^b mod p — von Hand mit Square-and-Multiply (immer früh mod p reduzieren), und beide Wege als Kontrolle. Wissen, *warum* es funktioniert (g^(ab) von beiden Seiten) und *warum* es sicher ist (diskreter Logarithmus). Dazu konzeptionell sicher: Aufgaben einer CA, die zwei Widerrufswege **CRL vs. OCSP** (Liste vs. Echtzeit-Abfrage), der Gegensatz **zentrale PKI vs. dezentrales Web of Trust** (mit den drei Nutzergruppen), und Let's Encrypt (ACME-Challenges HTTP-01/DNS-01, 90-Tage-Zertifikate, Certificate Transparency).`,
  },
};

const ueb09: Explanation = {
  id: "cs-2025-u09",
  lesson: 9,
  title: {
    de: "Lösungsweg — Übungsblatt 9: XSS, SQL-Injection, DoS/DDoS & Botnetze",
  },
  content: {
    de: `Dieses Blatt verlässt die Mathematik und betritt das offene Internet — hier sind die Angriffe konkret und oft erschreckend einfach. Du lernst, wie man fremden Code in Webseiten einschleust (XSS), wie man eine Login-Maske mit einer einzigen Eingabe austrickst (SQL-Injection) und wie man ganze Dienste lahmlegt (DoS/DDoS). Die meisten Aufgaben sind Verständnisfragen; das eine, das du *konkret hinschreiben* können musst, ist die SQL-Injection — die rechnen wir Zeichen für Zeichen durch.

## Aufgabe 1 — XSS, CSP und SQL-Injection

**Die drei XSS-Typen.** Cross-Site Scripting heißt: ein Angreifer schleust HTML/JavaScript in eine Seite ein, das dann im Browser des *Opfers* läuft. Die drei Spielarten unterscheiden sich darin, *woher* der Schadcode kommt:

- **Stored XSS:** Der Code wird dauerhaft auf dem Server gespeichert (Forenbeitrag, Kommentar, Besucherlog). Jeder, der die Seite abruft, bekommt ihn mitgeliefert — ein Treffer, viele Opfer.
- **Reflected XSS:** Der Code wird nicht gespeichert, sondern vom Server direkt in die Antwort *zurückgespiegelt* (z. B. über eine Fehlermeldung oder einen Suchparameter). Das Opfer wird meist über einen *manipulierten Link* hingelockt.
- **DOM-based (Client-Side) XSS:** Der Angriff läuft komplett im Browser — clientseitiges JavaScript verändert die lokale DOM-Struktur. Der Schadcode taucht gar nicht in der Serverantwort auf, sondern entsteht erst durch lokale Manipulation der Umgebung.

**CSP (Content Security Policy).** Ein HTTP-Header, den der Server mitschickt und der per **Whitelist** festlegt, aus welchen Quellen Inhalte (Skripte, Bilder …) überhaupt geladen werden dürfen — z. B. nur von der eigenen Domain, keine Inline-Skripte. *Vorteil:* erschwert XSS deutlich (eingeschleuste Inline-Skripte werden geblockt). *Nachteil:* erschwert lokales Debugging / legitime Inline-Skripte, und CSP **ersetzt keine Input-Validierung** — es ist eine zweite Verteidigungslinie, kein Ersatz.

### Schritt für Schritt — die Login-Maske per SQL-Injection umgehen

Der verwundbare Code (Listing 1) baut die Query, indem er Nutzereingaben *direkt* in den String klebt:

    SELECT uid FROM users WHERE username = "$username" AND password = "$password"

Das ist die Schwachstelle: **$username und $password sind frei eingebbar und werden ungeprüft eingesetzt** (fehlende Sanitization). Trägst du normal „test"/„test" ein, entsteht eine harmlose Query. Trägst du aber als Passwort etwas ein, das die Query-Struktur selbst verändert, übernimmst du die Kontrolle.

**Variante A — Batched Statement (so in der Musterlösung).** Setze als $password:

    test"; SELECT * FROM users WHERE username = "administrator

Dann lautet die zusammengebaute Query (gekürzt) so:

    … password = "test"; SELECT * FROM users WHERE username = "administrator"

Das angehängte zweite Statement holt direkt den administrator-Datensatz — das eingeschobene Semikolon beendet die erste Anweisung und schmuggelt eine eigene hinterher.

**Variante B — die klassische Tautologie.** Setze als Passwort die Eingabe " OR "1"="1 (Anführungszeichen, dann OR, dann 1=1). Die WHERE-Bedingung wird dann zu

    … AND password = "" OR "1"="1"

und weil "1"="1" *immer* wahr ist, liefert die Query alle Nutzer (bzw. den ersten = oft den Admin) zurück — Login umgangen, ganz ohne Passwort.

**Wie verhindert man das?** *Abstrakt:* Nutzereingaben dürfen niemals als Code interpretiert werden — man muss sie als reine *Daten* behandeln. *Konkret:* gefährliche Sonderzeichen (vor allem das Semikolon und Anführungszeichen) maskieren, z. B. in PHP mit mysql_real_escape_string($password). Die saubere moderne Lösung sind **Prepared Statements** (parametrisierte Queries): dort wird die Eingabe getrennt von der Query übergeben und kann die Struktur prinzipiell nicht mehr verändern.

> **Eselsbrücke:** SQL-Injection entsteht, wenn Eingabe zu *Code* wird. Whitelisting/Escaping/Prepared Statements machen aus Eingabe wieder reine *Daten*.

## Aufgabe 2 — Denial-of-Service

**Technisches Ziel.** Ein DoS-Angriff legt ein Zielsystem lahm, indem er dessen **Ressourcen erschöpft** (CPU, RAM, Bandbreite) — danach können *legitime* Anfragen nicht mehr bedient werden.

**CIA-Ziele.** Die drei Schutzziele sind **Confidentiality** (Vertraulichkeit), **Integrity** (Integrität) und **Availability** (Verfügbarkeit). Ein DoS verletzt *nur die Verfügbarkeit* — er liest oder verändert keine Daten, er macht den Dienst bloß unerreichbar.

**DDoS-Angriffstechniken.** (a) **Single Client** — ein Rechner schickt viele Anfragen; (b) **Amplification** — fremde Protokolle erzeugen aus kleinen Anfragen große Antworten; (c) **Botnetze** — viele mit Malware infizierte Rechner feuern koordiniert.

**DoS vs. DDoS.** DoS kann von *einem* Rechner ausgehen; DDoS verteilt den Angriff auf *viele* heterogene Quellen. Letztere sind schwerer abzuwehren, weil sich die Flut kaum von echten Anfragen unterscheiden lässt und es kaum Möglichkeiten gibt, die Quelle auf Netzebene zu identifizieren oder zu sperren.

**Amplification-Konzept.** Man missbraucht Protokolle, die auf eine *kleine* Anfrage eine *große* Antwort geben (typisch kleine UDP-Anfragen → große Pakete), z. B. **DNS, NTP, SNMP**. Per **IP-Spoofing** fälscht der Angreifer die Absenderadresse, sodass die großen Antworten alle beim *Opfer* landen — der Angreifer verstärkt seinen Datenstrom um ein Vielfaches, ohne selbst viel zu senden.

## Aufgabe 3 — Botnetze

- **Drei bekannte Botnetze:** Zeus, Mirai (Ziel: IoT-Geräte), Conficker (auch Bredolab).
- **Wie wird ein System Teil eines Botnetzes?** Z. B. durch **Malware** (etwa per E-Mail-Anhang) oder durch **Exploits** (Ausnutzen von Sicherheitslücken); seltener durch manuelle Installation auf Servern.
- **Command-&-Control-Server (C&C):** steuert die Kommunikation zwischen Angreifer und Botnetz — verteilt neue Befehle und überträgt Daten. Häufige Protokolle: IRC, HTTP, DNS; alternativ als P2P-Netz organisiert.
- **Skizze des DDoS-Flusses:** Angreifer → C&C → die drei Bots → und von den Bots gebündelt auf das Opfer (Victim). Der Angreifer spricht nie direkt mit dem Opfer, sondern nur über C&C mit den Bots, die dann die eigentliche Last erzeugen.

## Aufgabe 4 — Abwehr von DoS-Angriffen

- **Grundansätze:** Ressourcen erhöhen, plus **On-Site-Maßnahmen** (White-/Blacklisting, Login-Beschränkung, CAPTCHAs, Browser-Detection, Sperren von Adressbereichen) und **Off-Site-Maßnahmen** (Cloud-Umzug, Caching über ein CDN, BGP-Routing anpassen).
- **Layer-7-Erkennung (Application Layer) ist schwer:** Angriffe sehen aus wie viele *normale* Requests; tiefe Packet Inspection ist teuer und komplex; und bei TLS-Verschlüsselung sind die Pakete schwer zu inspizieren (und Inspektion würde das Sicherheitsmodell aushebeln).
- **Problem beim bloßen Aufrüsten der Kapazität:** Angreifer haben oft *mehr* Ressourcen, als man wirtschaftlich nachrüsten kann — und die teure Extra-Kapazität liegt im Normalbetrieb brach (schlechter Kosten-Nutzen-Effekt).
- **On-Site vs. Off-Site:** On-Site ist durch die *eigenen* Ressourcen (Bandbreite, Serverkapazität) begrenzt; Off-Site lagert die Abwehr an externe Dienstleister/CDN aus und filtert den Traffic *vor* dem eigenen Netz.
- **CDN (Content Delivery Network):** ein weit verteiltes Servernetz mit guter Anbindung. Es schirmt das eigene Netz ab (Caching, Mitigation/Detection, Scaling) und fängt Angriffslast bereits in der Cloud ab.
- **DNS-basiertes Routing im CDN:** Die DNS-Namensauflösung liefert je nach Anfrage *unterschiedliche* IP-Adressen (mit kurzer Gültigkeitsdauer), sodass sich die Last gleichmäßig und stabil auf viele Server verteilt.

## Klausur-Fokus

Das einzige „rechnerische" Muss ist die **SQL-Injection**: zeige, wie eine ungeprüfte Eingabe die Query-Struktur kapert (Batched Statement mit Semikolon *oder* die OR-1=1-Tautologie), und nenne die Abwehr (Escaping / Prepared Statements). Sonst ist es Begriffssicherheit: die drei **XSS-Typen** (Stored/Reflected/DOM) sauber unterscheiden, **CSP** als Whitelist-Header (mindert XSS, ersetzt keine Validierung), bei **DoS** „nur die Verfügbarkeit der CIA-Ziele" und das **Amplification**-Prinzip (kleine Anfrage → große Antwort, IP-Spoofing lenkt sie aufs Opfer), die **Botnetz**-Begriffe (Mirai/IoT, C&C), und die **Abwehr** (On-Site vs. Off-Site, CDN + DNS-Routing, warum Layer-7-Erkennung und reines Aufrüsten schwer sind).`,
  },
};

export const cybersicherheit2025UebungWalkthroughs: Explanation[] = [
  uebPrep,
  ueb01,
  ueb02,
  ueb03,
  ueb04,
  ueb05,
  ueb06,
  ueb07,
  ueb08,
  ueb09,
];
