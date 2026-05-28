import type { Explanation } from "./explanation-types";
import type { QuizSet } from "./quiz-types";

/**
 * Source-grounded explanations for Cybersicherheit SoSe 2025.
 *
 * Each lecture gets ONE explanation, written from the corresponding
 * `lectures/NN.md` (the pdf-to-md script next to the PDF) — never from prior
 * knowledge. German canonical. All follow the SAME standardized skeleton
 * (see AGENTS.md → Quality bar → Explanation): a framing lead, "Das Wichtigste
 * in Kürze", lecture-specific body sections, then "Begriffe & Notation",
 * "Typische Fallen", "Klausur-Fokus" and "Mehr dazu". Goal: understand a
 * horrible slide set on first read and prep the exam fast.
 */

const lecture01: Explanation = {
  id: "cs-2025-l01",
  lesson: 1,
  title: {
    de: "Einführung in die IT-Sicherheit: Schutzziele, Denkweise und der Start in die Kryptografie",
  },
  content: {
    de: `Auf den Folien wirkt die erste Vorlesung wie ein Sammelsurium: Organisatorisches, ein paar Schlagworte, dann plötzlich Kryptografie. Eigentlich legt sie das Denkgerüst für das ganze Semester — drei Schutzziele, eine Hand voll Grundprinzipien und eine Angreifer-Brille, durch die danach alles andere (Verschlüsselung, Hashes, Exploits, Malware) Sinn ergibt. Du brauchst kein Vorwissen; wir bauen jeden Begriff von der Alltagsanschauung aus auf.

## Das Wichtigste in Kürze

- **IT-Sicherheit = drei Schutzziele (CIA):** Vertraulichkeit (Confidentiality), Integrität (Integrity), Verfügbarkeit (Availability). Alles, was wir tun, dient einem davon.
- **Zwei Grundprinzipien:** ein System ist nur so stark wie sein *schwächstes Glied*; und man baut Schutz in *mehreren Schichten* (Defense in Depth).
- **Adversarial Setting:** Der Gegner denkt mit, hält sich an keine Regeln und braucht nur eine Lücke — der Verteidiger muss alle schließen.
- **Es gibt keine perfekte Sicherheit.** Deshalb definiert man ein *Threat Model*: Was schütze ich, und gegen wen?
- **Start der Kryptografie:** Kryptologie = Kryptografie (bauen) + Kryptanalyse (brechen). Symmetrisch (1 geteilter Schlüssel), asymmetrisch (Schlüsselpaar, seit 1976), Protokolle. Bühne: Alice, Bob, Lauscher Oskar.

## Die drei Schutzziele: die CIA-Triade

Bevor man etwas „sicher" machen kann, muss man sagen, *was* sicher heißt. Die Antwort sind drei Ziele (das Akronym CIA hat nichts mit dem Geheimdienst zu tun):

| Ziel | Einfach gesagt | Verletzt, wenn … | Beispiel |
|---|---|---|---|
| **Confidentiality** (Vertraulichkeit) | Nur Befugte dürfen es **lesen** | ein Datenleck deine Passwörter veröffentlicht | nur der Empfänger liest deine Nachricht |
| **Integrity** (Integrität) | Niemand verändert es **unbemerkt** | aus 100 € Überweisung heimlich 10 000 € werden | ein Update stammt echt vom Hersteller |
| **Availability** (Verfügbarkeit) | Es ist **da, wenn man es braucht** | ein Angriff den Shop lahmlegt | das Krankenhaus-System läuft im Notfall |

Der wichtige Punkt: Diese Ziele **konkurrieren**. Sperrst du Daten maximal weg (gut für Vertraulichkeit), leidet die Verfügbarkeit — niemand kommt mehr leicht ran. Sicherheit ist deshalb immer ein **Abwägen**, nie „mehr Schloss = besser". Und ein roter Faden fürs Semester: Verschlüsselung schützt Vertraulichkeit, Hashes und Signaturen die Integrität, Verfügbarkeit rettet man mit ganz anderen Mitteln (Redundanz, Backups).

## Zwei Grundprinzipien: schwächstes Glied & Defense in Depth

**Das schwächste Glied entscheidet.** Eine Kette reißt am dünnsten Glied — egal wie dick der Rest ist. Die beste Verschlüsselung nützt nichts, wenn das Passwort „1234" lautet oder unter der Fußmatte liegt. Angreifer suchen nie die starke Stelle, sondern die schwächste — und die ist oft *der Mensch* (Phishing umgeht jede Mathematik, weil es den Schlüssel einfach erfragt).

**Defense in Depth.** Weil ein einzelner Schutz versagen kann, staffelt man mehrere: wie eine Burg mit Wassergraben, Mauer, Wachen und verschlossenem Verlies. In der IT: Firewall *und* Authentifizierung *und* Verschlüsselung *und* Überwachung. Fällt eine Schicht, halten die anderen.

## Wie Sicherheitsleute denken: Adversarial Setting & Security Mindset

Was Sicherheit von normaler Softwareentwicklung unterscheidet: Man kämpft nicht gegen die *Natur* (Schwerkraft ist gnadenlos, aber nicht boshaft), sondern gegen einen **denkenden Gegner**. Daraus folgen drei Wahrheiten der Vorlesung:

1. Angreifer halten sich an **keine Regeln** — sie tun, womit niemand rechnet.
2. Eine Architektur muss **alle** Angriffe abdecken, sogar künftige.
3. Es herrscht ein **Ungleichgewicht**: Verteidiger muss jede Tür schließen, Angreifer braucht nur eine offene.

Die passende Denkweise ist das **Security Mindset**: bei allem fragen „Was, wenn ich das System angreife, indem ich …?". Normales Engineering fragt, wie etwas *funktioniert*; das Security Mindset fragt, wie man es zum *Versagen* bringt.

## Keine perfekte Sicherheit — das Threat Model

Ehrlich zu Ende gedacht heißt das: **Es gibt keine perfekte Sicherheit.** Man muss immer jemandem vertrauen (Hardware, Betriebssystem, Admins) — daher das Risiko der **Insider-Angriffe**. Statt „alles absichern" definiert man ein **Threat Model** mit zwei Fragen: *Welche Daten/Prozesse schütze ich?* und *Welche Angriffe berücksichtige ich?*. Eine App gegen die kleine Schwester abzusichern ist etwas anderes als gegen einen Geheimdienst.

## Einstieg Kryptografie: Kryptologie, Teilgebiete, Alice & Bob

Erste Begriffsklärung: **Kryptologie** ist der Oberbegriff und zerfällt in **Kryptografie** (Nachrichten absichern) und **Kryptanalyse** (Kryptosysteme brechen) — wieder das Adversarial Setting. Die Kryptografie hat drei Teilgebiete:

| Teilgebiet | Idee | Schlüssel | Seit |
|---|---|---|---|
| **Symmetrisch** | ein gemeinsamer geheimer Schlüssel | 1 geteilter | Antike |
| **Asymmetrisch** (Public-Key) | Schlüsselpaar: öffentlich + privat | 1 Paar/Person | **1976** |
| **Protokolle** | Anwendungen auf den Algorithmen | — | z. B. TLS |

Die symmetrische Verschlüsselung wird mit einer Bühne erklärt, die immer wiederkommt: **Alice** schickt **Bob** eine Nachricht durchs **Internet** (unsicherer Kanal), wo **Oskar** mitlauscht. Beide teilen vorab einen Schlüssel über einen sicheren Kanal; Alice verschlüsselt den Klartext, Oskar sieht nur Salat, Bob entschlüsselt mit demselben Schlüssel.

## Begriffe & Notation

| Begriff | Bedeutung |
|---|---|
| **x** | Klartext (plaintext) — die lesbare Nachricht |
| **y** | Chiffrat / Geheimtext (ciphertext) |
| **k** | Schlüssel (key) |
| **e( )** | Verschlüsselung (encryption): aus x wird y |
| **d( )** | Entschlüsselung (decryption): aus y wird x |
| **Schlüsselraum** | Menge *aller* möglichen Schlüssel |
| **CIA-Triade** | Confidentiality, Integrity, Availability |
| **Threat Model** | Festlegung, was wogegen geschützt wird |
| **Kryptologie** | Oberbegriff: Kryptografie + Kryptanalyse |

## Typische Fallen

- **CIA ≠ der Geheimdienst.** Es steht für die drei Schutzziele. In Klausuren oft: „Welches Schutzziel ist verletzt?" — Lesen=C, unbemerkte Änderung=I, Ausfall=A.
- **„Stärkste Komponente = sicher" ist falsch.** Es zählt das schwächste Glied, nicht das stärkste.
- **Verschlüsselung ≠ Verfügbarkeit.** Krypto liefert C und I, aber nie A — gegen Ausfälle helfen nur Redundanz/Backups.
- **Asymmetrisch ist nicht „besser" als symmetrisch.** Es löst ein anderes Problem (Schlüsselaustausch) und ist langsamer (siehe Vorlesung 4–5).

## Klausur-Fokus

- Die **CIA-Triade** definieren und an Beispielen das verletzte Ziel zuordnen können.
- **Weakest Link** und **Defense in Depth** in eigenen Worten erklären.
- Erklären, warum das **Adversarial Setting** Sicherheit so schwer macht (Asymmetrie Angreifer/Verteidiger).
- Wissen, was ein **Threat Model** ist und warum „perfekte Sicherheit" nicht existiert.
- **Kryptologie vs. Kryptografie vs. Kryptanalyse** unterscheiden; symmetrisch/asymmetrisch/Protokoll einordnen; die Notation x, y, k, e, d sicher lesen.

## Mehr dazu

- **Professor Messer — The CIA Triad** (~5 Min., EN): die drei Schutzziele knapp mit Beispielen. https://www.youtube.com/watch?v=SBcDGb9l6yo
- **Bruce Schneier — „The Security Mindset"** (Essay, EN): Originalquelle des „Denke wie ein Angreifer"-Prinzips. https://www.schneier.com/blog/archives/2008/03/the_security_mi_1.html
- **Crash Course Computer Science #33 — Cryptography** (~12 Min., EN): lebendiger Überblick über Verschlüsselung von Caesar bis AES. https://www.youtube.com/watch?v=jhXCTbFnK8o
- **Code.org — Encryption & Public Keys** (~7 Min., EN): anfängerfreundlich zu Klartext, Schlüssel, symmetrischer Verschlüsselung. https://www.youtube.com/watch?v=ZghMPWGXexs`,
  },
};

const lecture02: Explanation = {
  id: "cs-2025-l02",
  lesson: 2,
  title: {
    de: "Einführung in die Kryptografie: Substitutionschiffren, modulare Arithmetik und Stromchiffren",
  },
  content: {
    de: `Diese Vorlesung beantwortet zwei Fragen, die zusammengehören: *Wie verschlüsselt man klassisch?* und *Wie zerbricht man so eine Verschlüsselung wieder?* Daraus wächst die erste echte Lektion der Kryptografie — ein großer Schlüsselraum allein macht nichts sicher. Auf dem Weg lernst du das Werkzeug, das die ganze restliche Krypto trägt (modulare Arithmetik), und den schlanksten Verschlüsselungstyp überhaupt: die Stromchiffre mit XOR.

## Das Wichtigste in Kürze

- **Kerckhoffs' Prinzip:** Ein Verfahren muss sicher sein, *obwohl* der Angreifer den Algorithmus kennt — geheim ist nur der Schlüssel.
- **Substitutionschiffre:** jeder Buchstabe wird ersetzt. Schlüsselraum 26! ≈ 2^88 — riesig, und trotzdem leicht zu brechen.
- **Zwei Angriffe:** Brute-Force (alle Schlüssel durchprobieren) und **Frequenzanalyse** (Buchstabenhäufigkeiten ausnutzen). Lektion: großer Schlüsselraum ≠ sicher; eine Chiffre muss die *Statistik* des Klartextes verbergen.
- **Modulare Arithmetik:** Rechnen „im Kreis" mit Rest — das mathematische Fundament fast aller späteren Verfahren.
- **Stromchiffre:** verschlüsselt Bit für Bit per XOR mit einem Schlüsselstrom. Sicherheit = Qualität des Zufalls. Theoretisch perfekt: das **One-Time-Pad**.

## Kerckhoffs' Prinzip: Sicherheit steckt im Schlüssel

Eine naheliegende, aber falsche Idee: „Wenn niemand weiß, *wie* ich verschlüssele, ist es sicher." **Kerckhoffs' Prinzip** sagt das Gegenteil: Ein Verfahren muss sicher bleiben, selbst wenn der Angreifer Ver- und Entschlüsselungsalgorithmus vollständig kennt. Geheim ist *nur der Schlüssel*. Warum? Algorithmen sprechen sich herum, werden reverse-engineered, stecken in Hardware. Verlässt sich Sicherheit auf Geheimhaltung des Verfahrens („Security by Obscurity"), ist sie verloren, sobald das Verfahren bekannt wird. Das ist der Grund, warum DES und AES *öffentlich* sind und trotzdem sicher.

## Die Substitutionschiffre und wie man sie knackt

Die **Substitutionschiffre** (schon in der Antike genutzt) ersetzt jeden Buchstaben durch einen anderen — gemäß einer festen Tabelle (C→U, Y→N, …). Der Schlüssel ist die ganze Tabelle.

**Wie groß ist der Schlüsselraum?** Der erste Buchstabe hat 26 mögliche Bilder, der zweite 25, usw. — also 26! = 26 × 25 × … × 1 ≈ 2^88. Das sind unvorstellbar viele Schlüssel. Trotzdem ist die Chiffre unsicher. Zwei Angriffe zeigen warum:

1. **Brute-Force:** alle Schlüssel durchprobieren. Funktioniert, wenn der Schlüsselraum klein ist (siehe Cäsar unten), bei 2^88 aber zu groß.
2. **Frequenzanalyse:** der eigentliche Killer. Jede Sprache hat charakteristische Buchstabenhäufigkeiten (im Deutschen ist „E" am häufigsten). Eine Substitution lässt diese Häufigkeiten *unangetastet* — sie verschiebt sie nur. Der häufigste Geheimtextbuchstabe ist also wahrscheinlich „E", der zweithäufigste „N", und so weiter. Man rekonstruiert den Klartext, ohne je den Schlüssel zu raten.

Daraus die **zwei zentralen Lektionen** der Vorlesung:

> Ein großer Schlüsselraum bedeutet **nicht** automatisch Sicherheit. Eine gute Chiffre muss die **statistischen Eigenschaften** des Klartextes verbergen.

Die Kryptanalyse insgesamt teilt sich übrigens in klassische, mathematische und Brute-Force-Analyse sowie Implementierungsangriffe und Social Engineering.

## Modulare Arithmetik: Rechnen „im Kreis"

Fast alle Verfahren rechnen auf einer *endlichen* Zahlenmenge — wie eine Uhr, die nach 12 wieder bei 1 anfängt. Formal: a ≡ r (mod m) heißt „m teilt a − r". m ist der **Modul**, r der **Rest**.

Wichtig: Der Rest ist **nicht eindeutig**. 12 ≡ 3 (mod 9), aber auch 12 ≡ 21 ≡ −6 (mod 9). Alle Zahlen mit demselben Rest bilden eine **Restklasse** (… −6, 3, 12, 21 …). Konvention: man nimmt den kleinsten positiven Rest.

Der praktische Trick, der später (RSA!) Gold wert ist: **Modulo darf man auf Zwischenergebnisse anwenden**, um klein zu rechnen. Beispiel 3^8 mod 7: statt 3^8 = 6561 auszurechnen, nimmt man 3^8 = 81 × 81 ≡ 4 × 4 = 16 ≡ 2 (mod 7). Gleiches Ergebnis, winzige Zahlen.

### Schritt für Schritt: Cäsar-Chiffre

Die **Cäsar-Chiffre** ist der Spezialfall der Substitution: jeder Buchstabe wird um eine feste Zahl verschoben (Römer nutzten 3: A→D, B→E, …). Verschlüsseln, modular gedacht:

1. Buchstaben in Zahlen umwandeln (A=0, B=1, …, Z=25).
2. Schlüssel k addieren: y = (x + k) mod 26.
3. Zurück in Buchstaben.

Wie sicher? Sehr unsicher: Der Schlüsselraum ist nur **26** — Brute-Force in Sekunden, und Frequenzanalyse geht ohnehin.

## Stromchiffren: Verschlüsseln mit XOR

Jetzt die Trennung, die du dir merken musst: **Stromchiffren** verschlüsseln Bit für Bit, **Blockchiffren** (DES/AES, ab Vorlesung 3) ganze Blöcke.

Eine Stromchiffre erzeugt einen **Schlüsselstrom** s und verknüpft jedes Klartextbit damit per Addition modulo 2:

- Verschlüsselung: y_i = x_i + s_i (mod 2)
- Entschlüsselung: x_i = y_i + s_i (mod 2)

Addition modulo 2 ist **XOR** (exklusives Oder). XOR eignet sich perfekt, weil es **ausbalanciert** ist: bei zufälligem s ist y mit je 50 % 0 oder 1.

| x | s | y = x ⊕ s |
|---|---|---|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

Schön daran: dasselbe XOR mit s macht die Verschlüsselung wieder rückgängig (y ⊕ s = x). Beispiel aus der Praxis: A5/1 in der GSM-Mobilfunkverschlüsselung.

## Zufall ist alles: RNGs und das One-Time-Pad

Die ganze Sicherheit einer Stromchiffre hängt am **Schlüsselstrom**. Drei Typen von Zufallsgeneratoren:

- **TRNG** (True RNG): echter physikalischer Zufall (z. B. Rauschen).
- **PRNG** (Pseudo-RNG): aus einem Startwert (Seed) berechnet — reproduzierbar, *vorhersagbar*.
- **CSPRNG** (Cryptographically Secure PRNG): wie PRNG, aber **nicht vorhersagbar** — das, was Krypto braucht.

Das theoretische Ideal ist das **One-Time-Pad (OTP)**: Schlüsselstrom per TRNG erzeugt, nur den Teilnehmern bekannt, **nur einmal** verwendet. Das OTP ist *beweisbar sicher* — und wird trotzdem kaum genutzt. Der Grund ist das größte Problem: Der Schlüssel muss **genauso lang** sein wie die Nachricht und darf sich nie wiederholen. In der Praxis nutzt man darum einen CSPRNG mit einem kurzen geheimen Schlüssel k als Seed; effiziente Hardware-Stromchiffren bauen auf linear rückgekoppelten Schieberegistern (LFSR) wie A5/1.

## Begriffe & Notation

| Begriff | Bedeutung |
|---|---|
| **Kerckhoffs' Prinzip** | nur der Schlüssel ist geheim, nicht der Algorithmus |
| **Substitutionschiffre** | jeder Buchstabe wird ersetzt; Schlüssel = Tabelle |
| **Cäsar-Chiffre** | Substitution mit fester Verschiebung; y = (x+k) mod 26 |
| **Brute-Force** | alle Schlüssel durchprobieren |
| **Frequenzanalyse** | Buchstabenhäufigkeiten ausnutzen |
| **a ≡ r (mod m)** | m teilt a − r; r ist der Rest |
| **Restklasse** | alle Zahlen mit gleichem Rest |
| **Stromchiffre** | Bit-für-Bit-Verschlüsselung per XOR |
| **XOR (⊕)** | Addition modulo 2 |
| **TRNG / PRNG / CSPRNG** | echter / pseudo- / krypto-sicherer Zufall |
| **One-Time-Pad** | beweisbar sichere Stromchiffre, Schlüssel so lang wie Nachricht |

## Typische Fallen

- **Großer Schlüsselraum = sicher? Nein.** 26! ist gewaltig, die Substitution fällt trotzdem durch Frequenzanalyse. Das ist *die* Kernaussage der Vorlesung.
- **„Geheimer Algorithmus = mehr Sicherheit"** verstößt gegen Kerckhoffs. Geheim ist nur k.
- **Rest ist eindeutig? Nein.** Es gibt unendlich viele gültige Reste (eine Restklasse); per Konvention der kleinste positive.
- **PRNG ≠ CSPRNG.** Ein normaler PRNG ist vorhersagbar und damit unsicher für Krypto.
- **OTP ist sicher, aber unpraktisch** — wegen Schlüssellänge und Einmaligkeit, nicht weil es „schwach" wäre.

## Klausur-Fokus

- **Kerckhoffs' Prinzip** zitieren und begründen können.
- Schlüsselraum der Substitution (26!) und der Cäsar-Chiffre (26) angeben; **Frequenzanalyse** als Bruchstelle erklären.
- Eine kleine **Cäsar-Rechnung** y = (x+k) mod 26 durchführen.
- **Modulo** sicher rechnen, inkl. „Reduktion auf Zwischenergebnisse" (z. B. 3^8 mod 7).
- **XOR-Wahrheitstabelle** auswendig; Stromchiffren-Gleichungen y_i = x_i ⊕ s_i.
- **TRNG/PRNG/CSPRNG** unterscheiden; die **drei OTP-Bedingungen** und warum es selten eingesetzt wird.

## Mehr dazu

- **Crypto Corner — Frequency Analysis: Breaking the Code** (Artikel, EN): zeigt genau die Kernaussage — warum Substitution an der Buchstaben-Statistik scheitert. https://crypto.interactive-maths.com/frequency-analysis-breaking-the-code.html
- **Wikipedia — One-Time Pad** (EN): die vier Bedingungen, der Beweis der perfekten Sicherheit und warum es in der Praxis unpraktisch ist. https://en.wikipedia.org/wiki/One-time_pad
- **Crash Course Computer Science #33 — Cryptography** (~12 Min., EN): ordnet Substitution, Schlüssel und Stromchiffren historisch ein. https://www.youtube.com/watch?v=jhXCTbFnK8o`,
  },
};

const lecture03: Explanation = {
  id: "cs-2025-l03",
  lesson: 3,
  title: {
    de: "Symmetrische Kryptografie: der Data Encryption Standard (DES)",
  },
  content: {
    de: `DES ist die erste „echte" Blockchiffre des Kurses und der Prototyp, an dem man versteht, wie moderne Verschlüsselung gebaut ist: Man mischt zwei einfache Zutaten (Konfusion und Diffusion) viele Runden lang, bis aus Klartext heilloser Salat wird. Die Folien sind ein Diagramm-Dschungel — hier ist der rote Faden, der sie ordnet: ein genialer Struktur-Trick (Feistel), ein Innenleben (die f-Funktion), ein Schlüsselfahrplan, und am Ende der Grund, warum DES heute zu schwach ist.

## Das Wichtigste in Kürze

- **DES = Blockchiffre:** 64-Bit-Blöcke, 56-Bit-Schlüssel, **16 Runden**, in jeder Runde ein abgeleiteter Rundenschlüssel k_i.
- **Zwei Zutaten (Shannon):** **Konfusion** (Zusammenhang Schlüssel↔Chiffrat verschleiern, via S-Boxen) und **Diffusion** (ein Klartextbit auf viele Chiffratbits streuen, via Permutationen).
- **Feistel-Struktur:** der Trick, mit dem Ver- und Entschlüsselung *fast identisch* werden. Pro Runde wird nur eine Hälfte verändert.
- **f-Funktion:** Expansion 32→48, XOR mit Rundenschlüssel, 8 S-Boxen 6→4, Permutation. Die **S-Boxen** sind der nichtlineare Kern.
- **DES ist heute unsicher** — der 56-Bit-Schlüssel ist per Brute-Force in Stunden knackbar. Lösung: **Triple-DES** (112 Bit effektiv).

## Etwas Geschichte (warum 56 Bit?)

1972 schreibt das NBS (heute NIST) einen Standard aus; 1974 liefert IBM den besten Vorschlag — basierend auf einer **Feistel-Chiffre**. Gerücht und Streitpunkt: Die NSA soll Einfluss genommen und die Schlüssellänge auf **56 Bit** reduziert haben (was Brute-Force erleichtert). Ein Verdacht auf eine Hintertür in den S-Boxen hat sich dagegen *nicht* bestätigt — die S-Boxen waren sogar besonders robust gewählt. 1977 wird DES veröffentlicht.

## Konfusion & Diffusion: die zwei Zutaten jeder guten Blockchiffre

Claude Shannon hat die beiden Bausteine benannt, aus denen jede sichere Chiffre besteht:

- **Konfusion** — den Zusammenhang zwischen Schlüssel und Chiffrat *verschleiern*. Beispiel: Substitutionstabellen (S-Boxen). Ändert man ein Schlüsselbit, soll sich das Chiffrat unvorhersehbar ändern.
- **Diffusion** — den Einfluss *eines* Klartextsymbols auf *viele* Chiffratsymbole *streuen*. Beispiel: Bitpermutationen. Ändert man ein Klartextbit, sollen sich viele Chiffratbits ändern.

Moderne Blockchiffren schalten Konfusion und Diffusion in **wiederholten Runden** hintereinander. Genau das macht DES 16-mal.

## Die Feistel-Struktur: der geniale Trick

Der 64-Bit-Block wird (nach einer Eingangspermutation IP) in zwei Hälften L_0 und R_0 geteilt. Jede Runde macht nur zwei Dinge:

- **L_i = R_{i−1}** (die rechte Hälfte wandert unverändert nach links)
- **R_i = L_{i−1} ⊕ f(R_{i−1}, k_i)** (die neue rechte Hälfte ist die alte linke, XOR-verknüpft mit dem Ergebnis der f-Funktion)

Pro Runde wird also **nur eine Hälfte** verschlüsselt — das ist *die* Eigenschaft der Feistel-Struktur. Konfusion und Diffusion stecken komplett in der f-Funktion. Nach 16 Runden folgt die Ausgangspermutation IP⁻¹ (die exakte Umkehrung von IP), und man erhält y = DES_k(x).

Warum ist das genial? Weil die Feistel-Struktur **umkehrbar ist, ohne dass f umkehrbar sein muss** — f darf eine beliebige (auch nicht invertierbare) Funktion sein. Dadurch ist die Entschlüsselung im Wesentlichen dieselbe Operation wie die Verschlüsselung.

## Eine DES-Runde von innen: die f-Funktion

Die f-Funktion bekommt die 32-Bit-Hälfte R_{i−1} und den 48-Bit-Rundenschlüssel k_i. Vier Schritte:

1. **Expansion E:** 32 Bit werden auf 48 Bit aufgeweitet (4-Bit-Blöcke → 6 Bit). Erhöht die Diffusion und passt die Länge an k_i an.
2. **XOR mit dem Rundenschlüssel** k_i.
3. **S-Boxen:** die 48 Bit werden in acht 6-Bit-Blöcke geteilt; jede S-Box (S1…S8) bildet **6 Bit auf 4 Bit** ab (äußere 2 Bit = Zeile, innere 4 Bit = Spalte). Ergebnis: wieder 32 Bit.
4. **Permutation P:** verwürfelt die 32 Bit, sodass die Ausgangsbits einer S-Box in der nächsten Runde *mehrere* S-Boxen beeinflussen.

Die **S-Boxen sind der kryptografische Kern** von DES: Sie sind das einzige **nichtlineare** Element (S(a) ⊕ S(b) ≠ S(a ⊕ b)) und liefern die Konfusion. Zusammen mit E und P sorgen sie für den **Avalanche-Effekt**: Spätestens nach **Runde 5** hängt jedes Bit von *jedem* Klartext- und *jedem* Schlüsselbit ab.

## Der Schlüsselfahrplan: woher die 16 Rundenschlüssel kommen

Aus dem 64-Bit-Schlüssel werden die 16 Rundenschlüssel k_i (je 48 Bit) erzeugt:

1. **PC-1** (Permuted Choice 1) wirft jedes 8. Bit weg (das waren Paritätsbits) → 56 Bit, permutiert; aufgeteilt in zwei 28-Bit-Hälften C_0, D_0.
2. In jeder Runde werden C und D **rotiert** (Left Rotate): um 1 Bit in den Runden 1, 2, 9, 16, sonst um 2 Bit.
3. **PC-2** (Permuted Choice 2) wählt aus den rotierten Hälften 48 Bit als Rundenschlüssel k_i aus.

Ein Detail, das die Entschlüsselung möglich macht: Die Gesamtzahl der Rotationen ist 4×1 + 12×2 = 28 ⇒ **C_0 = C_16 und D_0 = D_16**. Der Schlüsselfahrplan „schließt sich" also zum Kreis.

## Entschlüsselung & das Ende von DES

Dank Feistel ist die **Entschlüsselung dieselbe Operation** — nur der Schlüsselfahrplan läuft rückwärts (rechts statt links rotieren), sodass die Rundenschlüssel in umgekehrter Reihenfolge k_16, k_15, …, k_1 verwendet werden.

Abschließende Bewertung:

- **Mathematisch ist DES robust** — keine praktikablen Schwächen, die S-Boxen sind gut gewählt.
- **Aber der Schlüssel ist zu kurz:** 56 Bit lassen sich heute per Brute-Force in Stunden durchsuchen.
- **Lösung Triple-DES (3DES):** drei DES-Operationen hintereinander (Encrypt-Decrypt-Encrypt), **112 Bit effektive** Schlüssellänge. Deshalb steckt DES/3DES bis heute z. B. in EC-Karten.
- **Nachteile:** in Software ineffizient (3DES dreimal langsamer), kleine 64-Bit-Blockgröße, und nicht quantensicher.

## Begriffe & Notation

| Begriff | Bedeutung |
|---|---|
| **Blockchiffre** | verschlüsselt feste Blöcke (DES: 64 Bit) |
| **Konfusion** | Zusammenhang Schlüssel↔Chiffrat verschleiern (S-Boxen) |
| **Diffusion** | ein Klartextbit auf viele Chiffratbits streuen (Permutation) |
| **Feistel-Struktur** | L_i = R_{i−1}, R_i = L_{i−1} ⊕ f(R_{i−1}, k_i) |
| **f-Funktion** | E → XOR k_i → S-Boxen → P |
| **S-Box** | 6→4 Bit, nichtlinear, kryptografischer Kern |
| **Avalanche-Effekt** | nach Runde 5 hängt jedes Bit von allem ab |
| **IP / IP⁻¹** | Eingangs-/Ausgangspermutation (zueinander invers) |
| **PC-1 / PC-2** | Schlüsselfahrplan: 64→56 Bit / Auswahl 48-Bit-Rundenschlüssel |
| **Triple-DES** | EDE, 112 Bit effektiv |

## Typische Fallen

- **DES-Schlüssel: 64 oder 56 Bit?** Eingegeben 64, *effektiv* 56 — 8 Paritätsbits fallen in PC-1 weg.
- **S-Boxen = Diffusion? Nein.** S-Boxen liefern **Konfusion** (nichtlinear). Diffusion kommt von Expansion und Permutation.
- **Feistel braucht eine umkehrbare f-Funktion? Nein** — gerade nicht. Der Witz ist, dass f beliebig sein darf.
- **DES ist „geknackt"?** Nicht mathematisch — es ist nur der *Schlüssel zu kurz* (Brute-Force).
- **3DES = dreifacher Schlüssel = 168 Bit Sicherheit?** Effektiv nur **112 Bit** (Meet-in-the-Middle), und EDE, nicht EEE.

## Klausur-Fokus

- **Konfusion vs. Diffusion** definieren und je ein DES-Element zuordnen.
- Die **Feistel-Gleichungen** auswendig: L_i = R_{i−1}, R_i = L_{i−1} ⊕ f(R_{i−1}, k_i) — und eine Runde durchrechnen können.
- Die **vier Schritte der f-Funktion** in Reihenfolge nennen; Rolle der **S-Boxen** (nichtlinear, Konfusion).
- **Avalanche-Effekt** und „nach Runde 5" erklären.
- Den **Schlüsselfahrplan** skizzieren (PC-1 → Rotation → PC-2) und wissen, warum C_0 = C_16.
- Begründen, warum DES **unsicher** ist und wie **3DES** das mildert.

## Mehr dazu

- **Computerphile — Feistel Cipher** (EN): die Feistel-Idee anschaulich erklärt — warum Ver- und Entschlüsselung gleich sind. https://www.youtube.com/watch?v=FGhj3CGxl8I
- **Neso Academy — Feistel Cipher Structure** (EN): ruhiger, tafelartiger Durchgang der Struktur und Designparameter. https://www.youtube.com/watch?v=8l9xAvuGJFo
- **DES-Zusatzmaterial (Wikipedia): IP, E, S-Boxen, P als Tabellen** — gut zum Nachschlagen beim Üben. https://en.wikipedia.org/wiki/DES_supplementary_material`,
  },
};

const lecture04: Explanation = {
  id: "cs-2025-l04",
  lesson: 4,
  title: {
    de: "AES, Betriebsmodi und der Einstieg in die asymmetrische Kryptografie",
  },
  content: {
    de: `Zwei große Themen treffen hier aufeinander. Erst der Nachfolger von DES — **AES**, das heute den Großteil der Welt verschlüsselt und anders gebaut ist (Schichten statt Feistel). Dann ein Bruch: Symmetrische Verfahren haben ein Problem, das keine noch so gute Chiffre löst — *wie tauschen Alice und Bob überhaupt den Schlüssel aus?* Die Antwort ist die **asymmetrische Kryptografie**, die hier vorbereitet wird. Dazwischen die praktische Frage, wie man Nachrichten verschlüsselt, die länger als ein Block sind (Betriebsmodi).

## Das Wichtigste in Kürze

- **AES** verschlüsselt 128-Bit-Blöcke, Schlüssel 128/192/256 Bit, **10/12/14 Runden**. Keine Feistel-Struktur, sondern **Schichten**, die in jeder Runde *alle* 128 Bit bearbeiten.
- **Vier Schichten pro Runde:** SubBytes (S-Box, Konfusion), ShiftRows + MixColumns (Diffusion), AddRoundKey (Schlüssel einbringen).
- **Betriebsmodi** lösen „länger als ein Block": **ECB** (deterministisch → unsicher), **CBC** (verkettet, mit IV), **OFB** (macht aus der Blockchiffre eine Stromchiffre).
- **Symmetrisch hat Grenzen:** Schlüsselaustauschproblem, quadratisch viele Schlüssel, keine Nichtabstreitbarkeit.
- **Asymmetrisch** löst das mit einem **Schlüsselpaar** (öffentlich + privat) und braucht eine **Einwegfunktion**. Drei Familien: RSA, Diffie-Hellman, Elliptische Kurven.

## AES: vier Schichten statt Feistel

Nach einem öffentlichen Wettbewerb (1997 ausgeschrieben, 5 Finalisten, 2000 gewinnt **Rijndael**) wurde AES der Standard. Unterschiede zu DES auf einen Blick:

| | DES | AES |
|---|---|---|
| Blockgröße | 64 Bit | **128 Bit** |
| Schlüssel | 56 Bit | 128 / 192 / 256 Bit |
| Runden | 16 | **10 / 12 / 14** |
| Struktur | Feistel (halbe Hälfte/Runde) | **Schichten** (ganze 128 Bit/Runde) |
| arbeitet auf | Bits | **Bytes** |

AES verschlüsselt in jeder Runde den **kompletten** Block über aufeinanderfolgende Schichten. Die Anzahl der Runden hängt von der Schlüssellänge ab (128→10, 192→12, 256→14).

## Die vier Schichten einer AES-Runde

Man stellt den 16-Byte-Block als 4×4-Matrix („State") vor. Eine Runde wendet vier Schichten an:

1. **SubBytes (Byte-Substitution):** jedes Byte durch die **S-Box** ersetzen. Anders als bei DES gibt es nur *eine* S-Box (8 Bit rein, 8 Bit raus), und sie ist keine Zufallstabelle, sondern eine mathematische Operation über dem endlichen Körper GF(2^8) (Inverse + affine Abbildung). Das ist das **einzige nichtlineare** Element → liefert **Konfusion**.
2. **ShiftRows:** die Zeilen der Matrix zyklisch verschieben (Zeile 2 um 1, Zeile 3 um 2, Zeile 4 um 3) → **Diffusion**.
3. **MixColumns:** jede Spalte mit einer festen 4×4-Matrix multiplizieren → **Diffusion**. Zusammen sorgen ShiftRows + MixColumns dafür, dass nach **2 Runden** jedes Byte von *allen 16* Klartext-Bytes abhängt.
4. **AddRoundKey (Key-Addition):** die State-Matrix mit dem Rundenschlüssel XOR-verknüpfen.

Zwei Feinheiten: AES nutzt **Key Whitening** — ein zusätzliches AddRoundKey ganz am Anfang (vor Runde 1) und am Ende. Und die **letzte Runde lässt MixColumns weg**. Der **Schlüsselfahrplan** ist wortbasiert (1 Wort = 32 Bit): eine nichtlineare g-Funktion (Rotation + S-Box + Rundenkonstante) erzeugt rekursiv die Rundenschlüssel. AES ist effizient in Soft- und Hardware (Intel **AES-NI**), und die NSA erlaubt AES-128 für SECRET, AES-192/256 für TOP SECRET.

## Betriebsmodi: mehr als einen Block verschlüsseln

DES/AES verschlüsseln nur einen 8- bzw. 16-Byte-Block. Für längere Nachrichten braucht man einen **Betriebsmodus**:

- **ECB (Electronic Codebook):** jeden Block separat verschlüsseln und aneinanderhängen. **Problem: deterministisch** — gleicher Klartextblock → gleicher Chiffratblock. Muster bleiben sichtbar (das berühmte „verschlüsselte Pinguin-Bild"), und ein Angreifer kann Blöcke austauschen. **Nicht benutzen.**
- **CBC (Cipher Block Chaining):** jeder Block wird vor der Verschlüsselung mit dem *vorherigen Chiffrat* XOR-verknüpft: y_i = e_k(x_i ⊕ y_{i−1}); der erste Block nutzt einen **Initialisierungsvektor** IV: y_1 = e_k(x_1 ⊕ IV). Dadurch wird die Verschlüsselung **probabilistisch** — gleicher Klartext liefert (mit anderem IV) anderes Chiffrat.
- **OFB (Output Feedback):** die Blockchiffre erzeugt einen Schlüsselstrom (s_1 = e_k(IV), s_i = e_k(s_{i−1})), der per XOR auf den Klartext gelegt wird — so wird aus einer Blockchiffre eine **Stromchiffre**.

## Warum symmetrisch nicht reicht: das Schlüsselaustauschproblem

So stark AES ist — symmetrische Verfahren haben drei eingebaute Schwächen:

1. **Schlüsselaustauschproblem:** Der Kanal, über den die Nachricht läuft (das Internet), darf nicht für den Schlüssel benutzt werden — sonst hört Oskar ihn mit. Wie tauscht man also den geheimen Schlüssel sicher aus?
2. **Anzahl der Schlüssel:** Für jedes Paar von Partnern braucht es einen eigenen Schlüssel — bei n Teilnehmern wächst das quadratisch.
3. **Keine Nichtabstreitbarkeit (Non-Repudiation):** Weil beide denselben Schlüssel haben, kann man nicht beweisen, *wer* eine Nachricht erzeugt hat.

## Asymmetrische Kryptografie: Einwegfunktionen und der öffentliche Briefkasten

Die Lösung (1976 von Diffie, Hellman, Merkle veröffentlicht; RSA 1977; Großbritanniens GCHQ kannte das Prinzip schon 1972 geheim): ein **Schlüsselpaar** (k_pub, k_pr). Die zentrale, anfangs verblüffende Eigenschaft: **Der Schlüssel zum Verschlüsseln ist nicht geheim.** Bild dazu: ein **öffentlicher Briefkasten** — jeder kann etwas einwerfen (mit dem öffentlichen Schlüssel verschlüsseln), aber nur der Besitzer mit dem privaten Schlüssel kann ihn leeren (entschlüsseln).

Damit das geht, braucht jedes asymmetrische Verfahren eine **Einwegfunktion**: y = f(x) leicht zu berechnen, x = f⁻¹(y) praktisch unmöglich. Die beiden in der Praxis:

- **Faktorisierung großer Zahlen** → RSA (Vorlesung 5).
- **Diskreter Logarithmus** → Diffie-Hellman und Elliptische Kurven.

Es gibt nur **drei große Familien**: RSA, Diffie-Hellman, Elliptische Kurven. Ein Haken: asymmetrische Verfahren sind **viel langsamer** als symmetrische. Deshalb nutzt man in der Praxis **Hybridprotokolle** (SSL/TLS): asymmetrisch *nur* zum Austausch eines symmetrischen Sitzungsschlüssels, danach symmetrisch weiter. Und weil die Mathematik mit riesigen Zahlen rechnet, brauchen asymmetrische Schlüssel viel mehr Bits für dieselbe Sicherheit:

| symmetrisch | Elliptische Kurven | RSA / Diffie-Hellman |
|---|---|---|
| 64 Bit | 128 Bit | 700 Bit |
| 128 Bit | 256 Bit | 3072 Bit |

## Begriffe & Notation

| Begriff | Bedeutung |
|---|---|
| **AES / Rijndael** | Schicht-Blockchiffre, 128-Bit-Block, 10/12/14 Runden |
| **State** | 4×4-Byte-Matrix, auf der AES arbeitet |
| **SubBytes** | S-Box-Ersetzung; einziges nichtlineares Element (Konfusion) |
| **ShiftRows / MixColumns** | Zeilen verschieben / Spalten mischen (Diffusion) |
| **AddRoundKey** | XOR mit Rundenschlüssel |
| **Key Whitening** | XOR mit Schlüssel am Anfang und Ende |
| **ECB / CBC / OFB** | Betriebsmodi (deterministisch / verkettet / strom-artig) |
| **IV** | Initialisierungsvektor (macht Modus probabilistisch) |
| **Einwegfunktion** | leicht vorwärts, praktisch unmöglich rückwärts |
| **Hybridprotokoll** | asymmetrischer Schlüsseltausch + symmetrische Daten (TLS) |
| **Non-Repudiation** | Nichtabstreitbarkeit (nur asymmetrisch möglich) |

## Typische Fallen

- **AES ist eine Feistel-Chiffre? Nein** — AES nutzt Schichten und verschlüsselt jede Runde den ganzen Block; DES ist Feistel.
- **ECB ist okay für kurze Daten? Nein** — die Determiniertheit ist *immer* ein Problem; ECB nie für echte Daten verwenden.
- **AES hat 8 S-Boxen wie DES? Nein** — AES hat genau **eine** S-Box (mathematisch, GF(2^8)).
- **Asymmetrisch ersetzt symmetrisch?** Nein — es ist langsamer; in der Praxis *hybrid* (TLS).
- **Gleiche Bitlänge = gleiche Sicherheit?** Nein — 128-Bit-symmetrisch ≈ 3072-Bit-RSA. Schlüssellängen *nicht* zwischen den Welten vergleichen.

## Klausur-Fokus

- AES-Eckdaten (Block 128, Schlüssel 128/192/256, Runden 10/12/14) und **DES vs. AES** gegenüberstellen.
- Die **vier Schichten** in Reihenfolge nennen und jeder Konfusion/Diffusion zuordnen; wissen: nur SubBytes ist nichtlinear, letzte Runde ohne MixColumns.
- **ECB/CBC/OFB** erklären; CBC-Formel y_i = e_k(x_i ⊕ y_{i−1}) und Rolle des IV; warum ECB unsicher ist.
- Die **drei Nachteile** symmetrischer Verfahren nennen (Schlüsseltausch, Anzahl, Non-Repudiation).
- **Einwegfunktion** definieren und die zwei praktischen nennen (Faktorisierung, diskreter Logarithmus); die drei Familien RSA/DH/ECC; warum **hybrid**.

## Mehr dazu

- **Computerphile — AES Explained** (EN, Mike Pound): die AES-Idee und ihre Schichten anschaulich. https://www.youtube.com/watch?v=O4xNJsjtN6E
- **Spanning Tree — AES: How to Design Secure Encryption** (EN): von Konfusion/Diffusion zur kompletten Runde, sehr klar animiert. https://www.youtube.com/watch?v=C4ATDMIz5wc
- **Computerphile — Public Key Cryptography** (EN): warum ein „öffentlicher" Schlüssel funktioniert — die Intuition hinter Einwegfunktionen. https://www.youtube.com/watch?v=GSIDS_lvRv4`,
  },
};

const lecture05: Explanation = {
  id: "cs-2025-l05",
  lesson: 5,
  title: {
    de: "Das RSA-Kryptosystem: Schlüsselerzeugung, Verschlüsselung und Square-and-Multiply",
  },
  content: {
    de: `RSA ist das erste konkrete asymmetrische Verfahren und das wahrscheinlich klausurrelevanteste Rechenthema des Kurses. Die Folien werfen viele Formeln auf einmal — der rote Faden ist einfach: Aus zwei Primzahlen baut man ein Schlüsselpaar, verschlüsselt mit einer Potenz modulo n und entschlüsselt mit der „Gegen-Potenz". Die Sicherheit lebt davon, dass man n nicht in seine Primfaktoren zerlegen kann. Dazu zwei Werkzeuge: der erweiterte Euklidische Algorithmus (für den privaten Schlüssel) und Square-and-Multiply (um große Potenzen überhaupt rechnen zu können).

## Das Wichtigste in Kürze

- **Schlüssel:** öffentlich (n, e), privat d. **Verschlüsseln:** y = x^e mod n. **Entschlüsseln:** x = y^d mod n.
- **Schlüsselerzeugung (5 Schritte):** zwei große Primzahlen p, q → n = p·q → φ(n) = (p−1)(q−1) → e mit ggT(e, φ(n)) = 1 → d = e⁻¹ mod φ(n).
- **Sicherheit = Faktorisierungsproblem:** aus n die Primzahlen p, q zurückzugewinnen ist für große Zahlen praktisch unmöglich.
- **Zwei Werkzeuge:** der **erweiterte Euklidische Algorithmus (EEA)** liefert d; **Square-and-Multiply** macht x^e mod n schnell.
- **Textbook-RSA ist unsicher** (deterministisch, manipulierbar) — die Praxis braucht **Padding**.

## Die Grundidee: öffentlich verschlüsseln, privat entschlüsseln

RSA dreht die symmetrische Logik um. Jeder kennt deinen öffentlichen Schlüssel (n, e) und kann dir damit verschlüsselte Nachrichten schicken:

- **Verschlüsselung:** y = e_{k_pub}(x) ≡ x^e mod n
- **Entschlüsselung:** x = d_{k_pr}(y) ≡ y^d mod n

Beide Operationen sind „Zahl hoch Exponent, modulo n". Der Clou: e und d sind so gewählt, dass das Hoch-d das Hoch-e genau rückgängig macht — aber nur, wer d kennt, kann entschlüsseln. Und d aus dem öffentlichen (n, e) zu berechnen, würde bedeuten, n zu faktorisieren.

## RSA-Schlüsselerzeugung in 5 Schritten

### Schritt für Schritt

1. **Wähle zwei große Primzahlen p und q.** (Der aufwändigste Schritt.)
2. **Berechne n = p · q.** Dieses n ist Teil des öffentlichen Schlüssels (der „Modul").
3. **Berechne φ(n) = (p − 1)(q − 1)** (Eulers Phi-Funktion, siehe unten).
4. **Wähle den öffentlichen Exponenten e ∈ {1, …, φ(n) − 1} mit ggT(e, φ(n)) = 1** (e und φ(n) teilerfremd).
5. **Berechne den privaten Schlüssel d mit d · e ≡ 1 mod φ(n)** — d ist also das **modulare Inverse** von e.

Öffentlich wird (n, e), geheim bleiben d (und p, q, φ(n)).

Zu den Schritten: **Schritt 1** ist der teuerste — man sucht mit einem RNG zufällige (z. B. 1024-Bit-)Zahlen und testet sie mit einem **Primzahltest** (z. B. Fermat), bis eine Primzahl gefunden ist. **Schritt 2** verdoppelt grob die Bitlänge (1024 × 1024 Bit → ~2048 Bit), und genau diese Größe macht die Faktorisierung von n unmöglich.

## Warum es funktioniert: Eulers Phi & der EEA

**Eulers Phi-Funktion φ(n)** zählt, wie viele Zahlen kleiner n teilerfremd zu n sind. Zwei Regeln, die alles tragen:

- Ist n prim, dann φ(n) = n − 1 (z. B. φ(7) = 6).
- Sind p, q prim, dann φ(p·q) = φ(p)·φ(q) = (p − 1)(q − 1).

Der Witz: φ(n) lässt sich *nur* leicht berechnen, wenn man p und q kennt. Ein Angreifer hat nur n — und ohne φ(n) kein d.

Schritt 4 und 5 erledigt man zusammen mit dem **erweiterten Euklidischen Algorithmus (EEA)**. Er berechnet zu zwei Zahlen nicht nur den ggT, sondern auch Koeffizienten s, t mit:

> ggT(φ(n), e) = s · φ(n) + t · e

Ist dieser ggT = 1, ist e gültig — und der private Schlüssel **d entspricht t** (dem Inversen von e modulo φ(n)). Der EEA läuft iterativ: in jedem Schritt r_i = r_{i−2} mod r_{i−1}, q_{i−1} = (r_{i−2} − r_i)/r_{i−1}, und s, t werden rekursiv mitgeführt, bis der Rest 0 ist.

## Square-and-Multiply: große Potenzen schnell rechnen

Problem: x^e mod n mit 1024-Bit-Exponenten naiv auszurechnen bräuchte astronomisch viele Multiplikationen (≈ 10^300). **Square-and-Multiply** schafft es mit nur ~1,5 · (Bitlänge) Operationen, indem es die **Binärdarstellung des Exponenten** abarbeitet — vom höchstwertigen Bit (MSB) zum niedrigstwertigen (LSB):

- Beim MSB: Basis einfach übernehmen.
- Bei jedem weiteren Bit: **immer quadrieren**; ist das Bit **1**, zusätzlich **mit der Basis multiplizieren**.
- Nach jedem Schritt **modulo n reduzieren** (klein rechnen, wie in Vorlesung 2 gelernt).

So wird aus einer unmöglich großen Rechnung eine, die ein Computer in Millisekunden erledigt.

## Textbook-RSA ist gefährlich: Determinismus & der ×2-Angriff

„Textbook-RSA" (genau die obige Formel ohne Zusätze) hat zwei Schwächen:

- **Deterministisch:** gleicher Klartext → immer gleiches Chiffrat. Ein Angreifer erkennt Wiederholungen.
- **Manipulierbar (malleable):** Oskar sieht das Chiffrat y, berechnet 2^e mod n und multipliziert: y · 2^e mod n. Beim Entschlüsseln kommt **2 · x** heraus — Oskar hat den Klartext gezielt verändert, ohne ihn zu kennen.

Die Lösung ist **Padding**: Vor dem Verschlüsseln werden **zufällige Daten** in den Klartext eingebaut. Das macht RSA probabilistisch und zerstört die Manipulierbarkeit. Weitere Angriffsflächen: schnellere Faktorisierungsalgorithmen (gibt es, aber für große n weiterhin chancenlos — historisch: die RSA-129-Challenge) und **Seitenkanalangriffe** (der Stromverbrauch bei Square-and-Multiply kann d verraten). Und: AES ist **100–1000-mal schneller** als RSA — daher RSA nur für den Schlüsseltausch, nicht für Massendaten.

## Begriffe & Notation

| Begriff | Bedeutung |
|---|---|
| **(n, e)** | öffentlicher Schlüssel (Modul + Exponent) |
| **d** | privater Schlüssel; d ≡ e⁻¹ mod φ(n) |
| **n = p·q** | Produkt zweier großer Primzahlen |
| **φ(n)** | Eulers Phi; φ(p·q) = (p−1)(q−1) |
| **ggT(e, φ(n)) = 1** | e und φ(n) teilerfremd (Bedingung für e) |
| **EEA** | erweiterter Euklid: liefert ggT und das Inverse d |
| **Square-and-Multiply** | schnelle modulare Exponentiation über die Bits von e |
| **Textbook-RSA** | RSA ohne Padding — deterministisch & manipulierbar |
| **Padding** | zufällige Daten im Klartext → probabilistisch & sicher |

## Typische Fallen

- **φ(n) = n − 1? Nur wenn n prim ist.** Bei RSA ist n = p·q, also φ(n) = (p−1)(q−1).
- **e frei wählbar? Fast** — aber es muss ggT(e, φ(n)) = 1 gelten, sonst existiert kein d.
- **d aus n und e leicht berechenbar?** Nur wenn man φ(n) kennt — und das setzt die Faktorisierung von n voraus (genau das ist hart).
- **Modulo erst am Ende anwenden?** Nein — bei Square-and-Multiply nach *jedem* Schritt reduzieren, sonst werden die Zahlen riesig.
- **Textbook-RSA ist sicher genug?** Nein — ohne Padding deterministisch und durch den ×2-Trick manipulierbar.

## Klausur-Fokus

- Die **5 Schritte der Schlüsselerzeugung** auswendig und mit kleinen Zahlen durchrechnen können (z. B. p, q einstellig).
- **Ver-/Entschlüsselung** y = x^e mod n und x = y^d mod n anwenden.
- **φ(n)** korrekt bilden; e prüfen (ggT = 1); **d per EEA** bestimmen.
- **Square-and-Multiply** an einem kleinen Beispiel ausführen (Binärexponent, quadrieren/multiplizieren, mod reduzieren).
- Erklären, warum **Faktorisierung** die Sicherheit trägt und warum **Textbook-RSA** (Determinismus, ×2-Angriff) Padding braucht.

## Mehr dazu

- **Practical Networking — RSA Algorithm, mit Beispiel** (EN): komplette Schlüsselerzeugung und Ver-/Entschlüsselung an Zahlen vorgerechnet. https://www.youtube.com/watch?v=Pq8gNbvfaoM
- **Eddie Woo — The RSA Encryption Algorithm (1 of 2: Computing an Example)** (EN): sehr ruhige, kleinschrittige Beispielrechnung. https://www.youtube.com/watch?v=4zahvcJ9glg
- **Art of the Problem — RSA Encryption** (EN): die Intuition (Einwegfunktion/Trapdoor, Euler) hinter RSA. https://www.youtube.com/watch?v=wXB-V_Keiu8
- **Square-and-Multiply — Rechenbeispiel** (aus den Folien verlinkt): https://www.youtube.com/watch?v=cbGB__V8MNk`,
  },
};

const lecture06: Explanation = {
  id: "cs-2025-l06",
  lesson: 6,
  title: {
    de: "Digitale Signaturen, Hash-Funktionen und Message Authentication Codes (MAC)",
  },
  content: {
    de: `Bis jetzt ging es ums Geheimhalten (Vertraulichkeit). Diese Vorlesung dreht sich um die andere Hälfte: *Wer hat das wirklich geschickt, und wurde es unterwegs verändert?* — also Authentizität und Integrität. Das Werkzeug dafür sind digitale Signaturen (asymmetrisch), praktisch gemacht durch Hash-Funktionen, plus deren symmetrischer, schneller Cousin: der MAC.

## Das Wichtigste in Kürze

- **Digitale Signatur:** mit dem **privaten** Schlüssel signieren, mit dem **öffentlichen** verifizieren — genau umgekehrt zur Verschlüsselung. Liefert Integrität, Authentizität und **Nichtabstreitbarkeit**.
- **Zertifikate & PKI** lösen das Henne-Ei-Problem: Wem gehört dieser öffentliche Schlüssel? Eine **CA** signiert die Zuordnung (Schlüssel ↔ Identität).
- **Hash-Funktion:** schlüssellos, macht aus beliebig langem Input einen **Fingerabdruck fester Länge** (128–512 Bit). Kleinste Änderung → völlig anderer Hash (Avalanche).
- **Drei Sicherheitseigenschaften:** Urbildresistenz, schwache und starke Kollisionsresistenz. Wegen des **Geburtstagsparadoxons** braucht man nur ~2^(n/2) statt 2^n Versuche für eine Kollision.
- **MAC:** wie eine Signatur, aber **symmetrisch** (geteilter Schlüssel) — schneller, aber **keine** Nichtabstreitbarkeit. Sicherer Standard: **HMAC**.

## Digitale Signaturen: mit dem privaten Schlüssel unterschreiben

Erinnerung aus Vorlesung 4: Symmetrische Verfahren können **keine Nichtabstreitbarkeit** (Non-Repudiation) garantieren — weil beide denselben Schlüssel haben, kann man nicht beweisen, *wer* etwas erzeugt hat. Digitale Signaturen lösen das mit asymmetrischer Kryptografie und drehen die RSA-Logik um:

- **Signieren:** Alice erzeugt s = sig_{kpr}(x) mit ihrem **privaten** Schlüssel und schickt (x, s).
- **Verifizieren:** Bob prüft Verify_{kpub}(s, x) = true/false mit Alices **öffentlichem** Schlüssel.

Nur Alice besitzt kpr, also kann nur sie signieren; jeder kann mit dem öffentlichen Schlüssel prüfen. Das liefert gleichzeitig **Integrität** (geändertes x fällt durch) und **Authentizität/Nichtabstreitbarkeit** (es war nachweislich Alice). Funktioniert mit RSA, Diffie-Hellman und Elliptischen Kurven; hier am Beispiel RSA.

Aber: Bisher war Oskar ein *passiver* Lauscher. Jetzt kommt der **aktive** Angreifer — der **Man-in-the-Middle (MITM)**. Er fängt Nachrichten ab und **tauscht öffentliche Schlüssel aus**: Schickt Bob seinen öffentlichen Schlüssel, ersetzt Oskar ihn durch seinen eigenen. Alice signiert/verschlüsselt dann für Oskar, ohne es zu merken.

## Zertifikate & PKI: wem gehört dieser Schlüssel?

Das Grundproblem: Asymmetrische Kryptografie braucht keinen *geheimen*, aber einen **authentisierten** Kanal, um öffentliche Schlüssel zu verteilen — sonst greift der MITM. Lösung: **Zertifikate**. Ein Zertifikat bindet einen öffentlichen Schlüssel an eine Identität, signiert von einer vertrauenswürdigen **Certificate Authority (CA)**:

> Cert_A = [ (kpub_A, ID_A), sig_{kpr_CA}(kpub_A, ID_A) ]

Die öffentlichen Schlüssel der CAs sind bereits im Browser vorinstalliert — daher kann dein Browser jedes Webseiten-Zertifikat prüfen. Das ganze Drumherum (CA + Identitätsprüfung, Rückruf, sichere Verteilung des CA-Schlüssels) heißt **Public-Key-Infrastruktur (PKI)**; das Standardformat ist **X.509** (Seriennummer, Aussteller, Gültigkeit, Inhaber, öffentlicher Schlüssel, Signatur).

## Hash-Funktionen: der digitale Fingerabdruck

Eine **Hash-Funktion h** hat **keinen Schlüssel** und macht aus einem beliebig langen Input einen **Fingerabdruck fester Länge** (typisch 128–512 Bit). Eigenschaften: hohe Effizienz auch bei langen Nachrichten, und der **Avalanche-Effekt** — kleinste Änderung am Input → komplett anderer Hash.

Warum braucht man sie bei Signaturen? Eine Signatur ist auf die Nachrichtenlänge begrenzt (bei RSA-2048 auf ~2048 Bit). Große Nachrichten kann man nicht direkt signieren, und blockweises Signieren wäre viel zu teuer. Lösung: **erst hashen, dann den Hash signieren** — s = sig_{kpr}(h(x)). Bob berechnet h(x) selbst neu und prüft die Signatur dagegen.

## Die drei Sicherheitseigenschaften

Damit das sicher ist, muss h drei Dinge erfüllen:

| Eigenschaft | Ziel | Warum wichtig |
|---|---|---|
| **Urbildresistenz** | aus h(x) lässt sich x **nicht** zurückrechnen | sonst könnte Oskar aus dem signierten Hash den Klartext gewinnen |
| **Schwache Kollisionsresistenz** | zu gegebenem x1 findet man **kein** x2 ≠ x1 mit gleichem Hash (2nd-preimage) | sonst tauscht ein aktiver Angreifer x1 gegen x2 — die alte Signatur bleibt gültig |
| **Starke Kollisionsresistenz** | man findet **gar kein** Paar x1 ≠ x2 mit gleichem Hash | strengste Anforderung; betrifft das **Geburtstagsparadoxon** |

Kollisionen **müssen** existieren (fester Output, unendlich viele Inputs — Schubfachprinzip). Die Frage ist nur, wie schwer man eine findet. Das **Geburtstagsparadoxon** liefert die ernüchternde Antwort: Schon bei 23 Personen ist die Wahrscheinlichkeit zweier gleicher Geburtstage über 50 %. Übertragen auf Hashes: Für einen n-Bit-Ausgang braucht man **nicht** 2^n, sondern nur etwa **2^(n/2)** Nachrichten für eine Kollision. Deshalb wählt man die Ausgabelänge großzügig (128–512 Bit). Wichtigste Familien: die **MD4-Familie** (MD5, SHA-1, SHA-2 — 32-Bit-Operationen, boolesche AND/OR/XOR) und Hashes auf Basis von Blockchiffren; **SHA-3** gehört nicht zur MD4-Familie (anderer interner Aufbau). SHA-1 z. B.: 512-Bit-Blöcke, Kompressionsfunktion, Padding, 160-Bit-Ausgabe.

## MAC & HMAC: Integrität mit geteiltem Schlüssel

Ein **MAC (Message Authentication Code)** ist eine kryptografische Prüfsumme. Wie Signaturen sichert er Integrität und Authentizität — aber:

- MACs basieren auf **symmetrischer** Kryptografie (ein geteilter Schlüssel k_AB), sind dadurch **deutlich schneller**,
- **aber** sie bieten **keine Nichtabstreitbarkeit** (beide kennen denselben Schlüssel).

Naiv könnte man einen MAC aus einer Hash-Funktion bauen: **Secret-Prefix** m = h(k‖x) oder **Secret-Suffix** m = h(x‖k). Beide haben Schwächen. Beim Secret-Suffix etwa: Findet Oskar eine Kollision h(x) = h(x_O), kann er x gegen x_O tauschen — die Prüfsumme h(x‖k) = h(x_O‖k) bleibt gültig. Deshalb nutzt man **HMAC** (1996, Bellare/Canetti/Krawczyk): sicher, ohne diese Schwächen, robust selbst gegen neue Hash-Angriffe, im Einsatz bei **TLS und IPSec**. Konstruktion (mit gepolstertem Schlüssel k+ und festen Masken ipad = 0x36…, opad = 0x5C…):

> HMAC_k(x) = h( (k+ ⊕ opad) ‖ h( (k+ ⊕ ipad) ‖ x ) )

## Begriffe & Notation

| Begriff | Bedeutung |
|---|---|
| **sig_{kpr}(x)** | Signatur über x mit privatem Schlüssel |
| **Verify_{kpub}(s, x)** | Signaturprüfung mit öffentlichem Schlüssel → true/false |
| **Non-Repudiation** | Nichtabstreitbarkeit (nur asymmetrisch) |
| **MITM** | Man-in-the-Middle: aktiver Angreifer tauscht Schlüssel |
| **Zertifikat / CA** | signierte Bindung Schlüssel↔Identität / Aussteller |
| **PKI / X.509** | Infrastruktur / Zertifikatsformat |
| **Hash h(x)** | schlüsselloser Fingerabdruck fester Länge |
| **Avalanche-Effekt** | kleine Inputänderung → ganz anderer Hash |
| **Urbild- / Kollisionsresistenz** | die drei Sicherheitsziele von h |
| **Geburtstagsparadoxon** | Kollision schon bei ~2^(n/2) Versuchen |
| **MAC / HMAC** | symmetrische Prüfsumme / sicherer Hash-MAC |

## Typische Fallen

- **Signieren = Verschlüsseln mit privatem Schlüssel?** Konzeptionell umgekehrt zur Verschlüsselung: **signieren mit privat, prüfen mit öffentlich**. Verschlüsselt wird mit öffentlich, entschlüsselt mit privat.
- **Hash schützt Vertraulichkeit?** Nein — ein Hash ist schlüssellos und nicht umkehrbar; er sichert **Integrität**, nicht Geheimhaltung.
- **n-Bit-Hash = 2^n Kollisionssicherheit?** Nein — wegen des Geburtstagsparadoxons nur **2^(n/2)**.
- **MAC liefert Nichtabstreitbarkeit?** Nein — das kann nur eine **Signatur** (asymmetrisch). MAC = nur Integrität/Authentizität.
- **Secret-Prefix/Suffix-MAC ist sicher?** Nein — beide haben bekannte Schwächen; nimm **HMAC**.

## Klausur-Fokus

- Den **Signatur-Ablauf** (sign mit kpr, verify mit kpub) erklären und gegen Verschlüsselung abgrenzen; **Non-Repudiation** begründen.
- Den **MITM auf den Public-Key-Austausch** schildern und erklären, wie **Zertifikate/CA** ihn verhindern; Aufbau von Cert_A.
- Warum man bei Signaturen **erst hasht**; die **drei Hash-Eigenschaften** nennen und je ein Angriffsszenario.
- **Geburtstagsparadoxon** → ~2^(n/2) herleiten/anwenden.
- **MAC vs. Signatur** (symmetrisch/asymmetrisch, Geschwindigkeit, Non-Repudiation); die Schwäche von Secret-Suffix-MAC und warum **HMAC** sie behebt.

## Mehr dazu

- **Computerphile — Hashing Algorithms and Security** (EN): drei Anforderungen an Hashes, Avalanche-Effekt, warum Kollisionen gefährlich sind. https://www.youtube.com/watch?v=b4b8ktEV4Bg
- **Practical Networking — Hashing, Algorithms, and Collisions** (EN): Digest, Kollisionen und die SHA-Familie sauber erklärt. https://www.youtube.com/watch?v=HHQ2QP_upGM
- **SHA-256-Live-Demo** (aus den Folien): tippe Text und beobachte, wie sich der Hash bei jeder Änderung komplett ändert. https://andersbrownworth.com/blockchain/hash`,
  },
};

const lecture07: Explanation = {
  id: "cs-2025-l07",
  lesson: 7,
  title: {
    de: "Kryptowährungen: wie Bitcoin aus Hashes ein dezentrales Geldsystem baut",
  },
  content: {
    de: `Bitcoin ist die große Anwendung der bisherigen Krypto-Bausteine: Hash-Funktionen und digitale Signaturen werden hier zu einem Geldsystem **ohne Bank** zusammengesetzt. Die zentrale Frage der Vorlesung: Wie verhindert man ohne zentrale Vertrauensinstanz, dass jemand dasselbe Geld zweimal ausgibt (Double-Spending) — und wer darf überhaupt neues Geld erzeugen? Die Antworten heißen Blockchain, Distributed Consensus und Proof-of-Work.

## Das Wichtigste in Kürze

- **Ziel:** dezentrales, pseudonymes Geld ohne vertrauenswürdige dritte Partei (Bank). Kernprobleme: **Double-Spending**, Konsens und Münzprägung.
- **Hash Pointer + Blockchain:** Blöcke verketten über Hash-Pointer → ein **manipulationssicheres Log**. Ändert man einen alten Block, ändern sich alle folgenden Hashes.
- **Merkle-Baum:** Hash-Baum, dessen Wurzel (Merkle Root) alle Daten zusammenfasst → effizienter **Proof of Membership**.
- **Identitäten = öffentliche Schlüssel;** eine **Bitcoin-Adresse** wird daraus per Hashing abgeleitet.
- **Consensus per Proof-of-Work:** Miner suchen eine **Nonce**, sodass H(Block) < Target. **Longest Chain Wins**; nach ~6 Bestätigungen ist Double-Spending praktisch unmöglich. **Anreize:** Block Reward (halbiert sich alle 210 000 Blöcke, max. 21 Mio. BTC) + Transaktionsgebühren.

## Das Grundproblem: digitales Geld ohne Bank

Klassisches Buchgeld (Kreditkarte, PayPal) ist **zentralisiert**: Man vertraut einer dritten Partei, und nichts ist anonym. Bargeld ist **dezentral**, anonym und offline. Bitcoin will das Beste übertragen: ein **dezentrales Peer-to-Peer-Netz**, allerdings nur **pseudonym** (nicht perfekt anonym) und im Regelfall online. Die drei Forschungsprobleme: **Anonymität**, ein wirklich **dezentrales** System, und das **Double-Spending-Problem** — denn eine digitale Münze ist nur eine Datei, die man kopieren könnte. Vorarbeiten dazu gab es lange (Byzantinische Generäle 1980, Chaums Ecash 1989, Haber/Stornettas Zeitstempel-Log 1991, Merkles Hash-Baum 1979).

## Hash Pointer & Blockchain

Ein **Pointer** zeigt auf einen Datenbereich. Ein **Hash Pointer** zeigt nicht nur dorthin, sondern enthält zusätzlich den **Hash** dieses Bereichs — man kann also prüfen, ob die Daten verändert wurden. Eine **Blockchain** ist wie eine verkettete Liste, bei der jeder „prev"-Zeiger ein Hash Pointer auf den Vorgängerblock ist (ein **manipulationssicheres Log**).

Der Clou steckt darin, dass die Hash-Berechnung **alle** Daten eines Blocks umfasst — die Transaktionen *und* den prev-Hash. Will Eve eine alte Transaktion in Block 10 fälschen, ändert sich dessen Hash, also auch der prev-Eintrag in Block 11, dessen Hash, und so weiter: Sie müsste **alle folgenden Blöcke neu berechnen**. Solange der oberste (neueste) Hash sicher bekannt ist, fällt jede Änderung auf. So entsteht eine beliebig lange Kette zurück bis zum **Genesis Block**.

## Merkle-Bäume

Ralph Merkle (1979) ersann den **Hash-Baum**: ein Binärbaum aus Hash-Pointern, dessen Wurzel die **Merkle Root** ist. Vorteil gegenüber der reinen Kette: Man kann **effizient beweisen, dass ein Element enthalten ist** (Proof of Membership), ohne alle Daten zu prüfen — man braucht nur den Pfad von der Wurzel zum Blatt.

## Identitäten & Bitcoin-Adressen

In Bitcoin sind **öffentliche Schlüssel die Identitäten**: Eine korrekt signierte Nachricht kann nur vom Besitzer des passenden privaten Schlüssels stammen. Daraus folgt **dezentrales Identity Management** — jeder kann sich beliebig viele Identitäten erzeugen (einfach neue Schlüsselpaare). Weil öffentliche Schlüssel lang sind, leitet man daraus eine kompakte **Bitcoin-Adresse** ab (wie eine IBAN):

> Public Key → SHA-256 → RIPEMD-160 → Präfix 00 → Base58Check → Adresse

## Distributed Consensus & der Double-Spend

Jeder Knoten hat die Blockchain (worüber bereits Konsens besteht) plus einen Pool **ausstehender Transaktionen**. Vereinfachter Konsens-Algorithmus:

1. Neue Transaktionen werden an alle Knoten **gebroadcastet**.
2. Jeder Knoten sammelt sie in einem Block.
3. In jeder Runde teilt ein **zufälliger** Knoten seinen Block mit (das ist die Vereinfachung).
4. Die anderen akzeptieren nur, wenn **alle Transaktionen gültig** sind (Coins noch nicht ausgegeben, Signaturen gültig).
5. Akzeptanz zeigt man, indem man den **Hash dieses Blocks** in den nächsten eigenen Block aufnimmt.

Der **Double-Spend-Angriff**: Alice sendet 100 Coins an Bob *und* gleichzeitig dieselben 100 an sich selbst (Alice'). Beide Transaktionen sind gültig signiert — es entstehen **zwei Branches**. Welcher gewinnt? **Longest Chain Wins**: Knoten bauen auf dem Branch weiter, den sie zuerst gesehen haben; langfristig wird einer länger, der kürzere wird obsolet. Praktische Folge: Wartet Bob auf **keine** Bestätigung (Zero-Confirmation), ist der Angriff leicht; je mehr Bestätigungen, desto sicherer. **Faustregel: nach 6 Bestätigungen** ist die Double-Spend-Chance praktisch null.

## Proof-of-Work & Incentives

Die „zufällige Knotenwahl" aus Schritt 3 ist unrealistisch — und angreifbar (man erzeugt einfach viele Identitäten). Bitcoin ersetzt sie durch **Proof-of-Work**: einen Wettbewerb um knappe **Rechenleistung** (Idee aus **Hashcash**, ursprünglich gegen Spam). Um einen Block zu erzeugen, muss ein Miner eine Zahl, die **Nonce**, finden, sodass:

> H(nonce ‖ prev ‖ transactions) < target

Das Puzzle ist **schwer zu lösen, aber leicht zu prüfen**; das **Target** stellt die Schwierigkeit ein. Weil das Arbeit kostet, müssen ehrliche Knoten belohnt werden (Bitcoin nimmt an, dass **>50 %** der Rechenleistung ehrlich ist):

- **Block Reward:** Jeder Block enthält eine **Coinbase-Transaktion** an den Miner. Der Reward **halbiert sich alle 210 000 Blöcke** (50 → 25 (2012) → 12,5 (2016) → 6,25 (2020) → 3,125 (2024)). Ab ~2140 ist er null; es gibt maximal **21 Mio. Bitcoin**.
- **Transaktionsgebühren:** Output < Input; die Differenz geht an den Miner. Das hält Miner auch nach 2140 motiviert.

Wie sieht ein Knoten, ob Coins schon ausgegeben sind? Über das **UTXO**-Modell (Unspent Transaction Output): Eine Transaktion hat Inputs (Adresse + unverbrauchte frühere Transaktion, je signiert) und Outputs (Adresse + Betrag); die Differenz ist die Gebühr.

## Begriffe & Notation

| Begriff | Bedeutung |
|---|---|
| **Double-Spending** | dieselbe Münze zweimal ausgeben |
| **Hash Pointer** | Zeiger + Hash des Zielbereichs (manipulationssicher) |
| **Blockchain** | über Hash-Pointer verkettete Blöcke; Start = Genesis Block |
| **Merkle-Baum / Root** | Hash-Baum; Wurzel fasst alle Daten zusammen |
| **Bitcoin-Adresse** | aus Public Key: SHA-256 → RIPEMD-160 → Base58Check |
| **Proof-of-Work** | H(nonce‖prev‖tx) < target finden (Nonce suchen) |
| **Longest Chain Wins** | der längste Branch setzt sich durch |
| **Block Reward** | Coinbase-Belohnung, halbiert alle 210 000 Blöcke |
| **UTXO** | Unspent Transaction Output (verfügbares Guthaben) |

## Typische Fallen

- **Bitcoin ist anonym?** Nein — nur **pseudonym** (Adressen statt Namen; Transaktionen sind öffentlich nachvollziehbar).
- **Eine Transaktion ist sofort sicher?** Nein — erst nach mehreren **Bestätigungen** (Faustregel 6); bei Zero-Confirmation droht Double-Spend.
- **Der Hash deckt nur die Transaktionen ab?** Nein — er umfasst auch den **prev-Hash**, deshalb verkettet sich Manipulation nach vorn.
- **Proof-of-Work „macht etwas Nützliches"?** Nein — der Sinn ist allein, dass Arbeit **knapp und teuer** ist; nur die Nonce-Suche zählt.
- **Block Reward bleibt konstant?** Nein — er **halbiert** sich; Obergrenze 21 Mio. BTC.

## Klausur-Fokus

- **Hash Pointer / Blockchain** erklären und das Manipulations-Szenario (warum alle folgenden Hashes neu müssen).
- **Merkle-Baum** skizzieren und den Vorteil (effizienter Proof of Membership) nennen.
- Den **vereinfachten Konsens-Algorithmus** und den **Double-Spend** mit „Longest Chain Wins" + 6-Bestätigungen-Regel erklären.
- **Proof-of-Work**: die Bedingung H(nonce‖prev‖tx) < target und die Rolle der Nonce; warum „schwer lösen, leicht prüfen".
- **Block Reward** (Halbierung, 21 Mio.), **Transaktionsgebühren** und **UTXO** in Grundzügen.

## Mehr dazu

- **3Blue1Brown — But how does bitcoin actually work?** (EN): baut Bitcoin Schritt für Schritt aus Ledger, Signaturen, Hashes und Proof-of-Work auf — die beste Intuition zum Thema. https://www.youtube.com/watch?v=bBC-nXj3Ng4
- **ETH.BUILD — Blockchain-Mining-Demo** (EN, ethereum.org): interaktiv sehen, wie Blöcke verkettet werden, wie Proof-of-Work sichert und was bei Manipulation passiert. https://ethereum.org/videos/blockchain-eth-build/
- **Khan Academy — Bitcoin: Cryptographic hash functions** (EN): die Hash-Grundlage hinter Bitcoin. https://www.youtube.com/watch?v=0WiTaBI82Mc`,
  },
};

const lecture08: Explanation = {
  id: "cs-2025-l08",
  lesson: 8,
  title: {
    de: "Sicherheitsprotokolle & Schlüsselvereinbarung: Diffie-Hellman, Needham-Schroeder, Kerberos",
  },
  content: {
    de: `Wir haben Chiffren (symmetrisch + asymmetrisch) und Signaturen — aber eine Lücke bleibt: *Wie einigen sich zwei Fremde über eine abgehörte Leitung auf einen gemeinsamen geheimen Schlüssel?* Genau das ist das Schlüsselaustauschproblem aus Vorlesung 4. Diese Vorlesung gibt zwei Antworten: Diffie-Hellman (rein asymmetrisch, ohne dass je ein Schlüssel über die Leitung geht) und Server-basierte Protokolle mit einem KDC (Needham-Schroeder, Kerberos).

## Das Wichtigste in Kürze

- **Diffie-Hellman (DHKE):** Alice und Bob erzeugen *gemeinsam* einen Schlüssel, ohne ihn je zu senden. Basis: das **diskrete Logarithmusproblem**. Beide kommen auf k_AB = α^(a·b) mod p.
- **DHKE ist ohne Authentisierung MITM-anfällig** — wie alle asymmetrischen Verfahren (→ Zertifikate, Vorlesung 6).
- **KDC (Key Distribution Center):** ein vertrauenswürdiger Server verteilt **Sitzungsschlüssel**; jeder Teilnehmer hat vorab einen geheimen Schlüssel mit dem KDC.
- **Zwei Angriffe auf Schlüsselprotokolle:** **Replay** (alte Nachrichten wiedereinspielen → Gegenmittel: Freshness via Nonces/Timestamps) und **fehlende Schlüsselbestätigung** (→ Challenge-Response).
- **Needham-Schroeder** (1978) hat eine Replay-Schwäche; **Kerberos** behebt sie mit **Timestamps** (braucht aber synchrone Uhren) und authentisiert Nutzer im Netz (Active Directory).

## Diffie-Hellman: ein Geheimnis öffentlich aushandeln

1976 von Diffie und Hellman veröffentlicht, nutzt DHKE das **diskrete Logarithmusproblem** als Einwegfunktion (RSA nutzt dagegen die Faktorisierung). Es löst das Schlüsselverteilungsproblem praktisch und steckt heute in SSL/TLS und IPsec.

**Setup (öffentlich):** Wähle eine große Primzahl p (idealerweise > 2048 Bit) und eine Zahl α ∈ {2, …, p−2}; veröffentliche α und p.

**Protokoll:**

1. Alice wählt geheim a, berechnet A = α^a mod p, sendet A.
2. Bob wählt geheim b, berechnet B = α^b mod p, sendet B.
3. Alice rechnet B^a = (α^b)^a = α^(a·b) mod p.
4. Bob rechnet A^b = (α^a)^b = α^(a·b) mod p.

Beide haben denselben **Sitzungsschlüssel k_AB = α^(a·b) mod p** — obwohl nur A und B über die Leitung gingen. Oskar kennt α, p, A, B, müsste aber aus A = α^a den geheimen Exponenten a ziehen (den diskreten Logarithmus) — und das ist für große p praktisch unmöglich. **Aber:** Ohne Zertifikate ist auch DHKE durch einen aktiven **MITM** angreifbar (Oskar handelt je einen Schlüssel mit Alice und mit Bob aus).

## Schlüsselserver (KDC): symmetrischer Schlüsseltausch

Man kann Sitzungsschlüssel auch rein **symmetrisch** verteilen — über einen vertrauenswürdigen Server, das **KDC (Key Distribution Center)**. Annahme: Jeder Nutzer besitzt bereits einen geheimen symmetrischen Schlüssel mit dem KDC (vorab installiert, z. B. bei der Laptop-Übergabe). Das KDC erzeugt dann **Sitzungsschlüssel (Session-/Ephemeral-Keys)** und verteilt sie verschlüsselt. Warum kurzlebige Sitzungsschlüssel? Dem Angreifer stehen weniger Chiffrate pro Schlüssel zur Verfügung, er müsste viele Schlüssel knacken, und symmetrisch ist es schnell.

## Zwei Angriffe: Replay & fehlende Bestätigung

- **Replay-Angriff:** Ist der empfangene Sitzungsschlüssel überhaupt **aktuell**? Wenn nicht, spielt der Angreifer alte (mitgeschnittene) Nachrichten erneut ein und gibt sich als KDC aus. Gegenmittel: **Freshness** — Nonces (Zufallswerte), Timestamps, Counter.
- **Schlüsselbestätigungsangriff:** Hat die Gegenseite den Schlüssel wirklich **bestätigt**? Wenn nicht, kann Oskar eine Identität austauschen und so einen Schlüssel etablieren, den er selbst kennt. Gegenmittel: **Challenge-Response** und das **Einbinden der Identitäten** in die Nachrichten.

## Needham-Schroeder & Kerberos

Das **Needham-Schroeder-Protokoll (1978)** ist ein KDC-Protokoll und wehrt Schlüsselbestätigungsangriffe ab (Identitäten sind in Nachricht 2 verschlüsselt; Nachrichten 4 und 5 bestätigen per Challenge-Response, dass Alice den Schlüssel hat). Seine **Schwäche**: Bricht das Protokoll nach Nachricht 2 ab, kann ein Angreifer, der einen *alten* Sitzungsschlüssel (und Alices Schlüssel) kennt, Nachricht 3 senden — Bob merkt nicht, dass der Schlüssel veraltet ist. Nonces allein reichen hier nicht; besser wären **Timestamps**.

**Kerberos** baut auf Needham-Schroeder auf, ist aber mehr als ein Schlüsseltransport: Es **authentisiert Nutzer im Netzwerk**, wurde 1993 (RFC 1510) standardisiert und steckt in **Active Directory** (Windows/Linux). Der entscheidende Unterschied: Kerberos nutzt **Timestamps** statt nur Nonces → der obige Angriff scheidet aus. Preis dafür: Es braucht **synchronisierte Uhren**. Beide Protokolle setzen eine **vertrauenswürdige dritte Partei (das KDC)** voraus — ein **Single Point of Failure**.

## Begriffe & Notation

| Begriff | Bedeutung |
|---|---|
| **DHKE** | Diffie-Hellman Key Exchange |
| **diskretes Log-Problem** | Einwegfunktion hinter DHKE (und ECC) |
| **α, p** | öffentliche Parameter (Generator, große Primzahl) |
| **a, b** | private Exponenten von Alice/Bob |
| **k_AB = α^(a·b) mod p** | gemeinsamer Sitzungsschlüssel |
| **KDC** | Key Distribution Center (Schlüsselserver) |
| **Session-/Ephemeral-Key** | kurzlebiger Sitzungsschlüssel |
| **Replay-Angriff** | alte Nachrichten erneut einspielen |
| **Freshness** | Aktualität via Nonce / Timestamp / Counter |
| **Challenge-Response** | Nachweis, dass die Gegenseite den Schlüssel hat |
| **Needham-Schroeder / Kerberos** | KDC-Protokolle (Nonces / Timestamps) |

## Typische Fallen

- **Bei DHKE wird der Schlüssel übertragen?** Nein — übertragen werden nur A und B; der Schlüssel α^(a·b) wird **bei beiden berechnet**, nie gesendet.
- **DHKE ist gegen MITM sicher?** Nein — ohne Authentisierung/Zertifikate ist es angreifbar (wie alle asymmetrischen Verfahren).
- **DHKE und RSA nutzen dasselbe Problem?** Nein — DHKE: **diskreter Logarithmus**; RSA: **Faktorisierung**.
- **Nonces lösen alle Replays?** Nicht ganz — die Needham-Schroeder-Lücke zeigt, dass hier **Timestamps** nötig sind.
- **KDC = mehr Sicherheit, keine Nachteile?** Es ist eine **vertrauenswürdige dritte Partei** und damit ein **Single Point of Failure**.

## Klausur-Fokus

- **DHKE** komplett: Setup, die vier Schritte, k_AB = α^(a·b) mod p — und an kleinen Zahlen durchrechnen.
- Erklären, **warum DHKE sicher** ist (diskretes Log) und **warum MITM** trotzdem möglich ist.
- **Replay** vs. **Schlüsselbestätigungsangriff** unterscheiden und je das Gegenmittel (Freshness/Nonce vs. Challenge-Response).
- Die **Needham-Schroeder-Schwäche** (Abbruch nach Nachricht 2) schildern.
- **Kerberos**: Timestamps statt Nonces (+ Bedarf an synchronen Uhren), KDC als **Single Point of Failure**.

## Mehr dazu

- **Computerphile — Secret Key Exchange (Diffie-Hellman)** (EN): die berühmte Farbmisch-Analogie — warum man ein Geheimnis öffentlich aushandeln kann. https://www.youtube.com/watch?v=NmM9HA2MQGI
- **Computerphile — Public Key Cryptography** (EN): Einordnung asymmetrischer Verfahren und Einwegfunktionen. https://www.youtube.com/watch?v=GSIDS_lvRv4
- **Wikipedia — Diffie-Hellman-Schlüsselaustausch** (DE, aus den Folien): Protokoll, Rechenbeispiel und MITM-Problem. https://de.wikipedia.org/wiki/Diffie-Hellman-Schl%C3%BCsselaustausch`,
  },
};

const lecture09: Explanation = {
  id: "cs-2025-l09",
  lesson: 9,
  title: {
    de: "Denial-of-Service und Input Validation: Angriffe auf Verfügbarkeit und Webanwendungen",
  },
  content: {
    de: `Hier verlässt der Kurs die reine Kryptografie und betritt die Netzwerk- und Web-Sicherheit. Zwei sehr unterschiedliche Angreifertypen: der eine will dein System **lahmlegen** (Denial-of-Service — Angriff auf die Verfügbarkeit), der andere schmuggelt **bösartige Eingaben** in deine Webanwendung (XSS, SQL-Injection). Davor steht noch kurz TLS als das Protokoll, das die Krypto der letzten Wochen im Web zusammenführt.

## Das Wichtigste in Kürze

- **TLS** ist das Hybridprotokoll des Webs (asymmetrischer Schlüsseltausch + symmetrische Daten); ältere SSL/TLS-Versionen sind veraltet, aktuell sind TLS 1.2/1.3.
- **DoS greift die Verfügbarkeit an:** Ressourcen so überlasten, dass legitime Anfragen nicht mehr durchkommen (Netzwerk, System, Anwendung).
- **Techniken:** ICMP-Flooding, **Source-Address-Spoofing**, SYN-Spoofing, **Reflection** und **Amplification** (kleine Anfrage → große Antwort), und verteilt als **DDoS** über ein **Botnet** (z. B. **Mirai**).
- **Input Validation:** ungeprüfte Eingaben führen zu **XSS** (eingeschleustes JavaScript) und **SQL-Injection** (eingeschleuste DB-Befehle).
- **Abwehr:** Sanitization/Encoding, Type-/Format-Prüfung, **Whitelisting** (besser als Blacklisting) und **CSP** — wobei CSP die Input-Prüfung nicht ersetzt.

## TLS in einem Satz

**SSL/TLS** verschlüsselt den Webverkehr und kombiniert dafür asymmetrische Kryptografie (für den Schlüsseltausch und Zertifikate) mit symmetrischer (für die eigentlichen Daten) — ein **Hybridprotokoll**. Die Versionsgeschichte ist vor allem eine Liste von Abkündigungen: SSL 1.0–3.0 und TLS 1.0/1.1 gelten als **veraltet**; relevant sind **TLS 1.2 (2008)** und **TLS 1.3 (2018)**.

## Denial-of-Service: die Verfügbarkeit angreifen

**DoS-Angriffe** zielen direkt auf das CIA-Schutzziel **Verfügbarkeit**: Sie **überlasten Ressourcen**, bis legitime Anfragen nicht mehr bedient werden. Angreifbar sind Netzwerk-Bandbreite, System- und Anwendungsressourcen. Die Bausteine:

- **ICMP-Flooding:** den Server mit vielen „ping"-Anfragen (ICMP echo requests) zumüllen, bis er an der Antwortlast erstickt.
- **Source-Address-Spoofing:** die **Quelladresse fälschen**. Damit verschleiert der Angreifer sich — und lenkt Antworten auf fremde Rechner.
- **SYN-Spoofing:** den TCP-Handshake missbrauchen (halb offene Verbindungen) und so die Verbindungstabelle des Servers füllen.
- **Reflection:** Anfragen mit gefälschter Quelladresse (= Opfer) an viele Server schicken; deren Antworten treffen alle das **Opfer**.
- **Amplification:** eine Verstärkungs-Variante — eine **kleine** Anfrage erzeugt eine **viel größere** Antwort. Beispiel **DNS-Amplification**: eine 60-Byte-Anfrage (mit „ANY") löst eine 512- bis 4000-Byte-Antwort aus.
- **DDoS (Distributed DoS):** statt von einem Rechner aus von **vielen** — einem **Botnet** aus gekaperten Maschinen (Handler- und Agent-Zombies).

**Mirai** (2016) ist das Lehrbuchbeispiel: ein **IoT-Botnet**, das schlecht gesicherte Geräte (Kameras, DVRs, Router) über **schwache Standardpasswörter** und offene Dienste (Telnet) kapert, sich selbst weiterverbreitet und damit die bis dahin größten DDoS-Angriffe fuhr. **Gegenmaßnahmen** sind schwer, weil man legitime von bösartiger Last unterscheiden muss: mehr Bandbreite/Redundanz, Erkennung + Filtern (Firewalls), Angreifer identifizieren.

## Input Validation: XSS & SQL-Injection

Die zweite Hälfte: Was passiert, wenn eine Webanwendung **Benutzereingaben ungeprüft** verwendet? (Die Folien nutzen PHP nur als Beispiel — in der Klausur musst du keinen PHP-Code schreiben, ggf. aber lesen.)

- **Cross-Site-Scripting (XSS):** Die Seite gibt Eingaben direkt im HTML aus, z. B. Welcome + name. Setzt der Angreifer als „name" ein Skript wie alert(document.cookie), wird es **im Browser des Opfers ausgeführt** — er kann z. B. Session-Cookies stehlen.
- **SQL-Injection:** Die Eingabe landet ungeprüft in einer SQL-Abfrage, z. B. SELECT birthday FROM users WHERE name = '$name'. Schickt der Angreifer name = foo' UNION SELECT password FROM users, ändert er die **Bedeutung** der Abfrage und liest fremde Daten (oder löscht/ändert sie).

Gemeinsame Ursache: Daten (Eingabe) und Code (HTML/SQL) vermischen sich, und der Angreifer schmuggelt Code in die Daten.

## Abwehr: Sanitization, Validation, Whitelisting, CSP

Gegen beides hilft **Input Validation** in zwei Spielarten:

- **Sanitization & Transformation** — die Eingabe *umformen*: **Typecasting** (z. B. zu int erzwingen), **Encoding** (Sonderzeichen unschädlich machen, z. B. base64/urlencode), **kontextsensitive Sanitization** (z. B. htmlentities wandelt < und > in &lt; / &gt;, oder RegEx, die nur erlaubte Zeichen durchlässt).
- **Condition-Based Validation** — die Eingabe *prüfen*: **Type-Validation** (ist es eine Zahl?), **Format-Validation** (gültiges Datum?) und vor allem **Whitelisting**.

Merksatz: **Whitelisting schlägt Blacklisting.** Eine Blacklist „verbotener" Eingaben ist fehleranfällig — man vergisst leicht einen gefährlichen Fall. Eine Whitelist erlaubt nur explizit Bekanntes und ist daher sicherer. Ergänzend gibt es die **Content Security Policy (CSP)** (W3C-Standard): eine Whitelist erlaubter Inhaltsquellen; Inline-Skripte und eval sind standardmäßig blockiert. Aber: **CSP ersetzt keine Input-Validierung**, sie ergänzt sie nur.

## Begriffe & Notation

| Begriff | Bedeutung |
|---|---|
| **TLS** | Hybridprotokoll fürs Web (asym. Tausch + sym. Daten) |
| **DoS / DDoS** | Verfügbarkeit angreifen / verteilt über ein Botnet |
| **ICMP-Flooding** | mit Ping-Anfragen überlasten |
| **Source-Address-Spoofing** | Quelladresse fälschen |
| **Reflection / Amplification** | Antworten aufs Opfer lenken / kleine Anfrage → große Antwort |
| **Botnet / Mirai** | gekaperte Rechner / IoT-Botnet 2016 |
| **XSS** | eingeschleustes JavaScript im Browser des Opfers |
| **SQL-Injection** | eingeschleuste DB-Befehle |
| **Sanitization / Validation** | Eingabe umformen / prüfen |
| **Whitelisting** | nur explizit Erlaubtes zulassen (> Blacklisting) |
| **CSP** | Content Security Policy (ergänzt Input-Validierung) |

## Typische Fallen

- **DoS verletzt Vertraulichkeit?** Nein — DoS greift die **Verfügbarkeit** an (das A der CIA-Triade).
- **Reflection = Amplification?** Nicht ganz: Reflection lenkt Antworten aufs Opfer; **Amplification** ist die Verstärkung (kleine Anfrage → große Antwort).
- **DDoS = ein besonders starker Rechner?** Nein — **viele** Rechner (Botnet); das ist gerade der Punkt.
- **Blacklisting reicht zur Abwehr?** Nein — fehleranfällig; **Whitelisting** bevorzugen.
- **CSP ersetzt Input-Validierung?** Nein — sie ist nur eine zusätzliche Schicht (Defense in Depth).

## Klausur-Fokus

- DoS als Angriff auf **Verfügbarkeit** einordnen; **ICMP-Flooding, Spoofing, Reflection, Amplification, DDoS/Botnet** unterscheiden.
- **Mirai** als IoT-Botnet erklären (warum möglich: schwache Default-Passwörter, exponierte Dienste).
- **XSS vs. SQL-Injection**: je ein Beispiel und warum es funktioniert (Vermischung von Daten und Code).
- Abwehr einordnen: **Sanitization/Encoding**, **Type-/Format-Prüfung**, **Whitelisting > Blacklisting**, **CSP** (ergänzt, ersetzt nicht).
- Hinweis: PHP-Code ggf. **lesen/analysieren** können, nicht schreiben.

## Mehr dazu

- **Computerphile — Hacking Websites with SQL Injection** (EN): Tom Scott zeigt anschaulich, wie ungeprüfte Eingaben SQL-Befehle verändern. https://www.youtube.com/watch?v=_jKylhJtPmI
- **PwnFunction — Cross-Site Scripting (XSS) Explained** (EN, ~12 Min.): wie eingeschleustes JavaScript im Opfer-Browser landet. https://www.youtube.com/watch?v=EoaDgUgS6QA
- **Aikido — Injection Attacks 101 (SQLi, Code Injection, XSS)** (EN): kompakter Überblick inkl. Abwehr durch Input Validation. https://www.youtube.com/watch?v=wu6FAsiFhv0`,
  },
};

const lecture10: Explanation = {
  id: "cs-2025-l10",
  lesson: 10,
  title: {
    de: "Software-Exploits: von der Buffer-Overflow-Lücke zu Code-Reuse und den Abwehrmechanismen",
  },
  content: {
    de: `Diese Vorlesung zeigt, wie aus einem harmlosen Programmierfehler in C eine vollständige Übernahme des Rechners wird — und wie das ewige Wettrüsten zwischen Angriff und Verteidigung dabei abläuft. Der rote Faden: Ein Speicherfehler erlaubt das Überschreiben der Rücksprungadresse; je nachdem, welche Abwehr aktiv ist, schleust der Angreifer eigenen Code ein (Code Injection) oder baut den Angriff aus vorhandenem Code zusammen (Code-Reuse/ROP). Dagegen stehen DEP, ASLR und CFI.

## Das Wichtigste in Kürze

- **Ursache:** native Sprachen (C/C++) ohne **Bounds-Checking** → ein **Buffer Overflow** überschreibt benachbarten Speicher, insbesondere die **Rücksprungadresse** auf dem Stack.
- **Code Injection:** eigenen Schadcode (**Shellcode**) in den Puffer schreiben und die Rücksprungadresse darauf umbiegen — fügt dem Kontrollflussgraphen einen **neuen Knoten** hinzu.
- **DEP** (Data Execution Prevention) verbietet Ausführung aus Datenspeicher → Code Injection wird gestoppt.
- **Code-Reuse** umgeht DEP, indem es **vorhandenen** Code wiederverwendet: **return-into-libc** (ganze Funktionen) und **ROP** (Return-Oriented Programming: kleine „Gadgets", Turing-vollständig) — fügt einen **neuen Pfad** hinzu.
- **Verteidigung:** **ASLR** (Adressen zufällig anordnen) vs. **CFI** (Kontrollfluss erzwingen, Shadow Stack); **Data-Oriented Exploits** umgehen sogar CFI, weil sie keine Kontrolldaten anfassen.

## Warum C-Programme so gefährlich sind

C und C++ erzeugen schnellen nativen Code — aber sie prüfen **keine Array-Grenzen**. Schreibt man in char buffer[8] an Position buffer[8] (oder schlimmer: an einen aus Laufzeitdaten berechneten Index), ist das **undefiniertes Verhalten**: bestenfalls ein Absturz (Segmentation Fault), schlimmstenfalls **Arbitrary Code Execution**. Klassische Stolperfallen sind unsichere String-Funktionen wie strcpy oder gets — Letztere liest beliebig viel Eingabe in einen festen Puffer, **ohne Längenprüfung**. Genau das ist das Einfallstor. Solche Speicherfehler sind seit dem Morris-Worm (1988) das „Public Enemy No. 1" — und treiben ein jahrzehntelanges Wettrüsten an (Code Injection → return-into-libc 1997 → ROP 2007).

## x86-Grundlagen: Stack, Register, Stack Frame

Um den Angriff zu verstehen, braucht man etwas x86-Wissen:

- **Prozess-Layout:** Code (.text), Daten (.data/.bss), **Heap** (wächst nach oben) und **Stack** (wächst nach **unten**, zu niedrigen Adressen).
- **Register:** Allzweckregister (EAX, EBX, …), der **Stack Pointer ESP** (zeigt aufs oberste Stack-Element), der **Base Pointer EBP** (referenziert Argumente/lokale Variablen) und der **Instruction Pointer EIP** — er zeigt auf die *nächste* Instruktion und ist nur über Sprungbefehle (CALL, JMP, RET) änderbar. (x86_64: RAX…RIP, plus R8–R15.)
- **Stack Frame:** Jeder Funktionsaufruf legt einen Rahmen an, von oben nach unten: **Funktionsargumente**, **Rücksprungadresse**, **gesicherter Base Pointer**, **lokale Variablen** (inkl. unserer Puffer!).
- **Calling Convention:** call legt automatisch die **Rücksprungadresse** auf den Stack; ret holt sie zurück und lädt sie in **EIP**. Genau diese gespeicherte Rücksprungadresse ist das Ziel.

## Code Injection: den Rücksprung kapern

### Schritt für Schritt

Beispiel: ein Echo-Programm liest mit gets(buffer) in einen lokalen Puffer und gibt ihn aus.

1. Der Angreifer gibt **mehr** Daten ein, als der Puffer fasst.
2. Die Überlänge läuft im Stack nach **oben** und überschreibt den gesicherten Base Pointer und schließlich die **Rücksprungadresse**.
3. Der Angreifer legt seinen **Shellcode** in den Puffer (oder dahinter) und setzt die Rücksprungadresse auf dessen Anfang.
4. Beim ret springt die CPU **nicht** zurück in main, sondern in den Shellcode — z. B. öffnet der eine Remote-Shell.

Das fügt dem Kontrollflussgraphen einen **komplett neuen Knoten** (eigenen Code) hinzu — der Angreifer kann beliebiges tun.

## DEP, return-into-libc und ROP

**Gegenmaßnahme DEP (Data Execution Prevention):** Speicher ist entweder **schreibbar oder ausführbar, nie beides** (W^X). Der eingeschleuste Shellcode liegt im Datenbereich (Stack) — und der ist nicht ausführbar. Code Injection scheitert.

**Antwort der Angreifer — Code-Reuse:** Statt neuen Code einzuschleusen, verwende **vorhandenen, bereits ausführbaren** Code:

- **return-into-libc:** Die Rücksprungadresse zeigt auf eine sicherheitskritische Funktion der C-Bibliothek libc (z. B. system("/bin/sh")). DEP greift nicht, weil libc legitim ausführbar ist. **Grenzen:** man ist auf vorhandene Funktionen beschränkt und kann sie nur **nacheinander** aufrufen (keine bedingten Sprünge).
- **Return-Oriented Programming (ROP)** (Shacham, 2007): die Verallgemeinerung. Man kettet viele winzige Codeschnipsel — **Gadgets** — aneinander, die jeweils mit ret enden. Der präparierte Stack ist eine Liste von Adressen: jedes ret springt zum nächsten Gadget. Mit genügend Gadgets wird ROP **Turing-vollständig** (beliebige Berechnung). Auf x86 ist der „Gadget-Raum" besonders groß, weil ohne Speicher-Alignment auch **unbeabsichtigte** Instruktionen mitten in Bytefolgen entstehen. ROP fügt dem CFG einen **neuen Pfad** durch vorhandene Knoten hinzu (kein neuer Code).

## Verteidigung: ASLR vs. CFI

Zwei Verteidigungsphilosophien:

- **Code-Randomisierung / ASLR (Address Space Layout Randomization):** verwürfelt die **Basisadressen** von Code- und Datensegmenten bei jedem Start. Dann kennt der Angreifer die Adressen seiner Gadgets/Funktionen nicht. Schwächen: grobes ASLR ist per **Brute-Force** oder **Memory-Disclosure** (eine geleakte Adresse verrät den Offset) angreifbar; feingranulares ASLR hilft mehr, wird aber von **JIT-ROP** ausgehebelt. Vorteil: geringe Performance-Kosten.
- **Control-Flow Integrity (CFI)** (Abadi, 2005): erzwingt, dass Sprünge nur Zielen folgen, die im **Kontrollflussgraphen** erlaubt sind (Label-Prüfung). Problem bei Rücksprüngen: statische Labels werden grobkörnig → ein **Shadow Stack** (Schattenkopie der Rücksprungadressen) schützt Rücksprünge feingranular, kostet aber Performance. Vorteil: formale Sicherheit; Nachteil: schwer in komplexe Software zu integrieren.

Und der nächste Zug der Angreifer: **Data-Oriented Exploits / Non-Control-Data-Angriffe.** Sie verändern **keine** Kontrolldaten (keine Rücksprungadresse, kein Funktionszeiger) — sondern nur eine harmlose **Datenvariable**, z. B. ein Feld user.id, das man per Overflow auf 0 setzt, sodass eine Adminprüfung durchgeht. Weil der Kontrollfluss dem CFG treu bleibt, **umgeht das CFI vollständig**.

## Begriffe & Notation

| Begriff | Bedeutung |
|---|---|
| **Buffer Overflow** | über Puffergrenze hinaus schreiben (kein Bounds-Check) |
| **Rücksprungadresse** | auf dem Stack gesicherte Rückkehradresse; Angriffsziel |
| **Shellcode** | eingeschleuster Schadcode (z. B. Shell öffnen) |
| **EIP / ESP / EBP** | Instruction- / Stack- / Base-Pointer |
| **Code Injection** | neuer CFG-Knoten (eigener Code) |
| **DEP (W^X)** | Daten nicht ausführbar / Code nicht schreibbar |
| **return-into-libc** | Rücksprung in vorhandene libc-Funktionen |
| **ROP / Gadget** | Code-Reuse aus ret-endenden Schnipseln, Turing-vollständig |
| **ASLR** | zufällige Basisadressen von Segmenten |
| **CFI / Shadow Stack** | Kontrollfluss erzwingen / Rücksprünge absichern |
| **Data-Oriented Exploit** | nur Daten ändern → umgeht CFI |

## Typische Fallen

- **Der Stack wächst nach oben?** Nein — er wächst zu **niedrigen** Adressen; der Überlauf läuft Richtung Rücksprungadresse.
- **DEP stoppt alle Exploits?** Nein — nur **Code Injection**. **Code-Reuse** (ret2libc, ROP) umgeht DEP, weil es vorhandenen Code nutzt.
- **ROP braucht eingeschleusten Code?** Nein — gerade nicht; ROP nutzt **nur vorhandene** Gadgets (deshalb DEP-resistent).
- **ASLR = sicher?** Nicht zwingend — Memory-Disclosure/JIT-ROP hebeln es aus; deshalb gibt es zusätzlich CFI.
- **CFI stoppt alles?** Nein — **Data-Oriented Exploits** lassen den Kontrollfluss intakt und umgehen CFI.

## Klausur-Fokus

- Den **Stack-Frame** (Argumente, Rücksprungadresse, gesicherter EBP, lokale Variablen) skizzieren; Rolle von **ESP/EBP/EIP** und call/ret.
- Einen **Code-Injection-Angriff** Schritt für Schritt erklären (Overflow → Rücksprungadresse → Shellcode).
- **DEP** erklären und **warum return-into-libc/ROP** es umgehen; Code Injection (neuer Knoten) vs. Code-Reuse (neuer Pfad).
- **ROP/Gadgets** und Turing-Vollständigkeit; warum x86 mehr Gadgets bietet (kein Alignment).
- **ASLR vs. CFI** gegenüberstellen (inkl. Shadow Stack) und erklären, warum **Data-Oriented Exploits** CFI umgehen.

## Mehr dazu

- **Computerphile — Running a Buffer Overflow Attack** (EN, Mike Pound): zeigt live, wie ein Overflow die Rücksprungadresse überschreibt und Root-Rechte erlangt. https://www.youtube.com/watch?v=1S0aBV-Waeo
- **Motasem Hamdan — Buffer Overflow & ROP Chains (CTF-Walkthrough)** (EN): wie man aus Gadgets eine ROP-Kette baut. https://www.youtube.com/watch?v=M6lXOVp1brA`,
  },
};

const lecture11: Explanation = {
  id: "cs-2025-l11",
  lesson: 11,
  title: {
    de: "Betriebssystemsicherheit am Beispiel Multics: Reference Monitor, Schutzringe und Multilevel Security",
  },
  content: {
    de: `Multics (Ende der 1960er) war das erste moderne Betriebssystem und der Geburtsort fast aller Sicherheitskonzepte, die wir bis heute nutzen: der Reference Monitor, die Schutzringe und die mehrstufige Sicherheit. Die Vorlesung benutzt dieses historische System als saubere Fallstudie, an der man versteht, *wie* ein Betriebssystem entscheidet, ob ein Prozess auf etwas zugreifen darf. Die Folien sind ein Begriffs- und Regel-Dschungel — der rote Faden ist die eine Frage: *Wer darf was, und wie setzt das System das zwingend durch?*

## Das Wichtigste in Kürze

- **Reference Monitor:** die Instanz, die **jeden** Zugriff prüft. Drei Prinzipien: **Complete Mediation** (nicht umgehbar), **Tamperproof** (manipulationssicher), **Verifiable** (klein genug zum Beweisen).
- **Prozesse & Segmente:** ein Prozess hat einen eigenen Adressraum aus **Segmenten**; jedes Segment wird über ein **Segment Descriptor Word (SDW)** beschrieben (Adresse, Länge, Rechte, Ring-Brackets, Gate).
- **Schutzringe:** hierarchisch, **Ring 0 = höchste Privilegien** (Kernel). Wechsel in einen privilegierteren Ring nur über ein **Gate-Segment** mit Argumentprüfung.
- **Drei Zugriffsmodelle gleichzeitig:** **ACL** + **Rings & Brackets** (beide DAC) und **Multilevel Security** (MAC). Alle drei müssen zustimmen.
- **Multilevel Security = Bell-LaPadula:** „**no read up, no write down**" verhindert Informationsabfluss.

## Multics & der Reference Monitor

Multics führte Virtual Memory, hierarchische Dateisysteme — und die zentralen Sicherheitsbausteine ein. Der wichtigste ist der **Reference Monitor**: die Kombination aus Hard- und Software, die die Sicherheitsrichtlinie **durchsetzt**. Er muss drei Prinzipien erfüllen:

1. **Complete Mediation:** **Jeder** Zugriff muss über den Reference Monitor laufen; ihn zu umgehen muss unmöglich sein.
2. **Tamperproof (Isolation):** Der Monitor (und sein Schutzsystem) muss vor Veränderung geschützt sein.
3. **Verifiable:** Er muss **klein genug** sein, um analysiert und getestet — idealerweise bewiesen — zu werden.

Multics realisiert die ersten beiden gut, scheitert aber an Punkt 3: Seine **TCB (Trusted Computing Base)** ist zu groß für einen formalen Beweis. Genau das motivierte spätere **Security Kernels**, die die TCB minimieren.

## Prozesse, Segmente und das SDW

Die Grundbausteine sind **Prozesse** (haben Code, eigenen virtuellen Adressraum) und **Segmente** (Unterteilungen des Adressraums: Code, Daten, Geräte …). Jeder Prozess hat ein **Descriptor-Segment** mit **Segment Descriptor Words (SDWs)**; jedes SDW beschreibt ein Segment. Das Laden eines SDW erledigt der **Supervisor** (die vertrauenswürdigsten Komponenten, in Ring 0/1). Ein SDW enthält:

- die **Adresse** und **Länge** des Segments,
- die **Rechte** R/W/E (für die ACL),
- die **Ring-Brackets** (r1, r2, r3) für das Ring-Modell,
- das **Gate**-Feld: eine Liste gültiger Eintrittspunkte in höher privilegierte Ringe.

## Schutzringe

**Schutzringe** sind eine hierarchische Schichtung: **Ring 0** = höchste Privilegien (Kernel), nach außen immer weniger. Multics bietet 64 Ringe (8 in Hardware, 56 in Software); moderne CPUs (Intel) haben 4, genutzt werden meist nur **Ring 0 (Kernel)** und **Ring 3 (User)**. Höher privilegierte Ringe dürfen auf den Speicher niedrigerer Ringe zugreifen. Ein **Code-Segment** ist ausführbar; ein **Gate-Segment** ist ein spezielles Code-Segment, das über das Gate-Feld definierte **Eintrittspunkte** in einen privilegierteren Ring bietet — dort werden die Argumente aus dem niedriger privilegierten Aufrufer **validiert** (Schutz vor bösartiger Eingabe). Typischer Anwendungsfall: ein **Systemaufruf**.

## Die drei Zugriffsmodelle: ACL, Rings & Brackets, Multilevel Security

Bei jedem Zugriff müssen **alle drei** Modelle zustimmen:

- **Access Control List (ACL)** — *DAC* (Discretionary Access Control, nach Ermessen des Eigentümers): eine Liste von Nutzern und Rechten pro Segment/Verzeichnis. Nutzer-ID = **Person.Project.Tag** (z. B. Jim.ProjectX.\*; \* ist ein Wildcard). Rechte für Segmente: r/w/e/null; für Verzeichnisse: status/modify/append.
- **Rings & Brackets** — ebenfalls *DAC*: regeln über die aktuelle Ringnummer r und die Brackets des Segments, ob gelesen/geschrieben/ausgeführt werden darf.
- **Multilevel Security** — *MAC* (Mandatory Access Control, systemweit unveränderlich): die Geheimhaltungsstufen (s. u.).

### Rings & Brackets durchrechnen

Zwei Bracket-Paare steuern den Zugriff (aktuelle Ringnummer = r; kleiner = privilegierter):

- **Access Bracket (r1, r2)** mit r1 ≤ r2 — regelt **Lesen/Schreiben**:
  - r ≤ r1: **lesen und schreiben**
  - r1 < r ≤ r2: **nur lesen**
  - r2 < r: **kein Zugriff**
- **Call Bracket (r2, r3)** — regelt **Ausführen**: r3 ist der höchste Ring, der Code ausführen darf. Ist **r2 < r3**, ist es ein **Gate-Segment**; bei **r2 = r3** ein normales Code-Segment.

Die vier Fälle der Ausführungsprüfung (Prozess in Ring r will ein Code-Segment mit (r1,r2),(r2,r3) ausführen):

| Fall | Ergebnis |
|---|---|
| **r3 < r** | Ausführung **verboten** (außerhalb des erlaubten Bereichs) |
| **r2 < r ≤ r3** | erlaubt **nur über ein Gate**; Ringwechsel auf das privilegiertere **r' = r2** (z. B. Systemaufruf) |
| **r1 ≤ r ≤ r2** | erlaubt, **kein** Ringwechsel |
| **r < r1** | erlaubt; Ringwechsel auf das weniger privilegierte **r' = r1** |

Beispiel (r = 4): Access Bracket (5, 6) → r < r1, also lesen+schreiben; (3, 4) → r1 < r ≤ r2, also nur lesen; (3, 3) → r2 < r, also kein Zugriff.

## Multilevel Security & Bell-LaPadula

Multics war Vorreiter der **Multilevel Security (MLS)**: Jedem Segment und jedem Prozess wird eine **Geheimhaltungsstufe** zugeordnet (top-secret, secret, confidential, unclassified). Die durchgesetzte Politik ist das **Bell-LaPadula-Modell**, das **Informationsabfluss** verhindert. Die zwei Kernregeln:

- **Read (no read up):** Ein Prozess darf nur von Segmenten **gleicher oder niedrigerer** Stufe lesen.
- **Write (no write down):** Ein Prozess darf nur in Segmente **gleicher oder höherer** Stufe schreiben.

Merksatz: **„no read up, no write down".** Das verhindert, dass geheime Information in eine niedrigere Stufe „durchsickert". (Multics' Erbe ist riesig: Thompson und Ritchie bauten nach Bells Ausstieg **UNIX**; Befehle wie ls, pwd, mail stammen aus Multics.)

## Begriffe & Notation

| Begriff | Bedeutung |
|---|---|
| **Reference Monitor** | prüft jeden Zugriff; Complete Mediation, Tamperproof, Verifiable |
| **TCB** | Trusted Computing Base (muss klein sein für Beweisbarkeit) |
| **Segment / SDW** | Adressraum-Teil / Segment Descriptor Word (Adresse, Länge, Rechte, Brackets, Gate) |
| **Supervisor** | vertrauenswürdigste Komponenten (Ring 0/1) |
| **Schutzring** | Privilegienschicht; Ring 0 = höchste |
| **Gate-Segment** | Eintrittspunkt in höheren Ring (r2 < r3), validiert Argumente |
| **ACL** | Nutzer+Rechte je Segment; Nutzer-ID Person.Project.Tag (DAC) |
| **Access Bracket (r1,r2)** | r≤r1 RW, r1<r≤r2 R, r2<r kein Zugriff |
| **Call Bracket (r2,r3)** | Ausführung; r2<r3 ⇒ Gate-Segment |
| **DAC / MAC** | nach Ermessen / systemweit zwingend |
| **Bell-LaPadula** | MLS-Modell: no read up, no write down |

## Typische Fallen

- **Ring 0 = am wenigsten privilegiert?** Nein — **Ring 0 ist der privilegierteste** (Kernel); nach außen sinkt die Privilegierung.
- **Gate-Segment erkennt man wie?** Am Call Bracket: **r2 < r3** ⇒ Gate-Segment; r2 = r3 ⇒ normales Segment.
- **Bell-LaPadula: man darf nach unten schreiben?** Nein — **no write down** (nur gleich/höher schreiben), **no read up** (nur gleich/niedriger lesen).
- **ACL allein entscheidet?** Nein — **alle drei** Modelle (ACL, Rings & Brackets, MLS) müssen zustimmen.
- **Multics ist formal verifiziert?** Nein — die **TCB ist zu groß**; deshalb erfüllt es Verifiable nur unzureichend.

## Klausur-Fokus

- Die **drei Reference-Monitor-Prinzipien** nennen und erklären, warum Multics am dritten scheitert (TCB-Größe).
- **Schutzringe** (Ring 0 = Kernel) und die Rolle des **Gate-Segments** bei Ringwechseln/Systemaufrufen.
- **Rings & Brackets durchrechnen**: Access Bracket (r1,r2) und Call Bracket (r2,r3), die **vier Fälle** (r3<r, r2<r≤r3, r1≤r≤r2, r<r1) und Ringwechsel auf r2 bzw. r1 — sehr beliebte Rechenaufgabe.
- **ACL** (Person.Project.Tag, Rechte) und der Unterschied **DAC vs. MAC**.
- **Bell-LaPadula**: „no read up, no write down" und wozu (Informationsabfluss verhindern).

## Mehr dazu

- **Wikipedia — Bell-LaPadula-Modell** (EN): die Lese-/Schreibregeln (no read up, no write down) und der MAC-Hintergrund. https://en.wikipedia.org/wiki/Bell-LaPadula_model
- **Saltzer & Schroeder — A Hardware Architecture for Implementing Protection Rings** (aus den Folien): die Originalquelle zu Schutzringen. https://www.multicians.org/protection.html
- **multicians.org** (aus den Folien): Geschichte und Konzepte von Multics aus erster Hand. https://www.multicians.org/`,
  },
};

const lecture12: Explanation = {
  id: "cs-2025-l12",
  lesson: 12,
  title: {
    de: "Reverse Engineering und Malware-Analyse: ein Programm ohne Quellcode verstehen",
  },
  content: {
    de: `Wie versteht man ein Programm, von dem man nur das fertige Binary hat — etwa eine verdächtige .exe? Das ist Reverse Engineering, und sein wichtigstes Einsatzfeld ist die Malware-Analyse. Die Vorlesung erklärt erst, *warum* das schwer ist (beim Kompilieren geht fast alle Bedeutung verloren), dann *was* Malware tut (Infektion, Persistenz, Typen, Ransomware), und schließlich das Katz-und-Maus-Spiel: wie Malware-Autoren die Analyse erschweren — und wie Analysten kontern.

## Das Wichtigste in Kürze

- **Reverse Engineering** ist die Umkehrung der Kompilierung. Problem: Das Binary enthält **keine** Variablennamen, Funktionsnamen oder Kommentare mehr.
- **Zwei Analysearten:** **statisch** (Programm betrachten, ohne es auszuführen — Strings, Disassembly, CFG) und **dynamisch** (ausführen und Verhalten beobachten — Debugger, Sandbox/VM).
- **Malware** = „malicious software": kompromittiert Vertraulichkeit, Integrität oder Verfügbarkeit. Analyseziele: **Infektionsweg, Persistenz, Funktion/Typ, Entfernung**.
- **Persistenz** (Überleben des Neustarts) per Windows-Autostart, **Registry Run Keys** oder **Services**.
- **Anti-Analyse:** Obfuskation (Garbage Code, String-/Code-/PE-Obfuskation) gegen statische, Debugger-/VM-Erkennung gegen dynamische Analyse — beides oft schlampig implementiert und daher **patchbar**.

## Reverse Engineering: vom Binary zurück zum Verständnis

Beim Bauen einer Anwendung durchläuft C/C++-Code eine Kette: **Präprozessor → Compiler → Assembler → Linker**. Heraus kommt Maschinencode, in dem **alle menschenlesbaren Informationen verloren** sind — Variablentypen und -namen, Funktionsnamen, Kommentare existieren nur noch (wenn überhaupt) als Debug-Info. Genau das macht Reverse Engineering schwer: Man muss aus rohem Assembler die Absicht rekonstruieren. Anwendungen: Funktionalität prüfen, Bugs/Schwachstellen finden, Programme **ohne Quellcode patchen** und vor allem **Schadsoftware erkennen**.

## Was ist Malware?

**Malware** ist laut NIST ein Programm, das (meist verdeckt) eingeschleust wird, um Vertraulichkeit, Integrität oder Verfügbarkeit der Daten/Systeme des Opfers zu kompromittieren. Meist für Windows. Eine kleine Zeitleiste: Morris-Worm (1988), ILOVEYOU (2000), Zeus (2009), Cryptolocker (2013), Mirai (2016). Die Analyse hat klare **Ziele**: den **Infektionsweg** (Downloads, E-Mail-Anhänge, Exploits in Browser/PDF/Word/OS), die **Persistenz**, die **Funktion/Typ**, die **Entfernung** und das Umgehen von Anti-Analyse.

**Persistenz** (Code auch nach Neustart ausführen) erreicht Windows-Malware vor allem über: den **Autostart-Ordner**, **Registry Run Keys** (z. B. HKLM\Software\Microsoft\Windows\CurrentVersion\Run) und **Services** (automatisch startende Hintergrundprozesse). Bei der **Entfernung** beginnt man genau hier — beim Persistenzmechanismus — und arbeitet sich zu allen Komponenten vor.

Malware-**Typen**: Trojaner, Wurm, Virus, Cryptominer, Backdoor, Bot, Adware, **Ransomware**.

## Ransomware im Detail

**Ransomware** verschlüsselt die Dateien des Opfers (Festplatte, Netzlaufwerke, Backups) und fordert **Lösegeld** (meist in Kryptowährung) für die Entschlüsselung. Besonderheit: Sie muss **nicht heimlich** sein und braucht **keine Persistenz** — der Schaden ist nach dem einmaligen Lauf angerichtet. Typische Implementierungsspuren (gut für die Analyse!): Datei-Suche (FindFirstFile/FindNextFile), Filter auf bestimmte Endungen, Verschlüsselung (AES/CryptEncrypt), **Löschen der Backups** (vssadmin delete shadows), Schreiben einer **Lösegeldforderung**. Häufige **Fehler der Autoren**, die das Knacken ermöglichen: selbstgebaute/schwache Krypto, **nicht zufällige** oder statische Schlüssel, Schlüssel aus bekannten Infos (Nutzername, Zeitstempel, MAC-Adresse), zu kurze Schlüssel.

## Statische Analyse erschweren

**Statische Analyse** betrachtet das Programm, ohne es laufen zu lassen — am ergiebigsten sind **Strings** (Fehlermeldungen, Pfade, Domains verraten viel) und das **Disassembly** (mit Kontrollflussgraph). Malware-Autoren kontern mit **Obfuskation**:

- **Garbage Code:** nutzlose Instruktionen (NOP-Äquivalente, sich aufhebende Operationen) als „Nadel im Heuhaufen".
- **String-Obfuskation:** Strings werden unleserlich gespeichert und erst **zur Laufzeit** entschlüsselt — Tools wie strings.exe laufen ins Leere. (Die Obfuskation muss nicht „sicher" sein, nur unleserlich.)
- **Code-Obfuskation:** Teile des Codes liegen verschleiert vor; ein **Stub** entschlüsselt sie zur Laufzeit im Speicher und springt hinein.
- **PE-Obfuskation:** das **komplette** Binary wird verschleiert (Code, Daten, Strings, Imports, Header) — statisch ist nichts mehr sinnvoll analysierbar; ein Stub stellt das Original zur Laufzeit her.

## Dynamische Analyse erschweren

**Dynamische Analyse** führt (Teile) des Codes aus und beobachtet das Verhalten (aufgerufene Funktionen, Datei-/Registry-Zugriffe, Internetverbindungen) — mit **Debugger**, Monitoren und **Sandboxes/VMs**. Ein **Debugger** erlaubt kontrollierte Ausführung, das Auslesen von Speicher/Registern und das Manipulieren von Daten. Malware kontert, indem sie die Analyseumgebung **erkennt**:

- **Debugger erkennen:** über die Windows-API IsDebuggerPresent oder direkt das PEB-Flag (mov eax, fs:[0x30] …). Bypass: das Flag auf 0 setzen.
- **Breakpoints erkennen:** Debugger ersetzen Instruktionsbytes durch **0xCC** (INT 3) — das Programm sucht in seinem eigenen Speicher nach 0xCC oder prüft eine **Prüfsumme** über den Code; zusätzlich gibt es Hardware-Breakpoints (Debug-Register DR0–DR3).
- **Sandbox/VM erkennen:** über **Artefakte** (Spuren, die echte Hardware nicht hat) oder **Timing** (Code läuft in der VM messbar anders).

Wichtige Lektion: Diese Checks sind oft **schlampig** implementiert — jeder Check ruft bei Erkennung einfach exit() auf. Dann muss man die Anti-Analyse gar nicht verstehen, sondern **patcht** einfach alle Checks weg.

## Begriffe & Notation

| Begriff | Bedeutung |
|---|---|
| **Reverse Engineering** | Umkehrung der Kompilierung; Absicht aus Binary rekonstruieren |
| **statische Analyse** | ohne Ausführung: Strings, Disassembly, CFG |
| **dynamische Analyse** | mit Ausführung: Debugger, Sandbox/VM |
| **Malware** | Schadsoftware (kompromittiert C/I/A) |
| **Persistenz** | Überleben des Neustarts (Autostart, Run Keys, Services) |
| **Ransomware** | verschlüsselt Dateien, fordert Lösegeld |
| **Obfuskation** | Code/Strings/PE unleserlich machen (Stub zur Laufzeit) |
| **0xCC / INT 3** | Software-Breakpoint-Byte |
| **IsDebuggerPresent** | API zur Debugger-Erkennung |
| **Sandbox/VM-Detection** | Artefakt- oder Timing-basiert |

## Typische Fallen

- **Das Binary enthält noch Quellcode?** Nein — Namen/Kommentare sind weg; höchstens Debug-Info bleibt.
- **Ransomware braucht Persistenz/Heimlichkeit?** Nein — der Schaden ist nach einem Lauf erledigt; sie darf laut sein.
- **String-Obfuskation muss kryptografisch sicher sein?** Nein — sie muss nur **unleserlich** sein (Deobfuskation zur Laufzeit).
- **PE-Obfuskation erschwert nur Strings?** Nein — sie verschleiert **das ganze** Binary (Code, Daten, Imports, Header).
- **Anti-Analyse macht Malware unknackbar?** Nein — schlecht gemachte Checks lassen sich einfach **patchen** (exit() entfernen).

## Klausur-Fokus

- Die **Kompilierungskette** und warum dabei Information verloren geht (→ RE ist schwer).
- **Statisch vs. dynamisch** unterscheiden und je Werkzeuge nennen (Strings/Disassembly vs. Debugger/Sandbox).
- Malware-Analyseziele (**Infektionsweg, Persistenz, Funktion, Entfernung**) und die drei **Persistenz**-Mechanismen.
- **Ransomware**: Ablauf und die typischen Krypto-**Fehler** (statische/schwache Schlüssel).
- **Anti-Analyse**: Obfuskationsarten (Garbage/String/Code/PE) und Detection (IsDebuggerPresent, 0xCC, VM/Timing) — und warum schlampige Checks **patchbar** sind.

## Mehr dazu

- **Computerphile — Wana Decrypt0r (WannaCry Ransomware)** (EN, Mike Pound): seziert eine echte Ransomware und erklärt, wie sie Dateien verschlüsselt. https://www.youtube.com/watch?v=88jkB1V6N9w
- **Low Level — Every Level of Reverse Engineering Explained** (EN): von Strings über Disassembly bis zur Verhaltensanalyse — genau die Stufen der Vorlesung. https://www.youtube.com/watch?v=8vk5z9VAaBQ
- **Jane Street — Reverse Engineering Ransomware (M. Sikorski)** (EN): der Autor von „Practical Malware Analysis" zeigt den Analyseprozess an echten Samples. https://www.janestreet.com/tech-talks/dude-where-are-my-files/`,
  },
};

const lecture13: Explanation = {
  id: "cs-2025-l13",
  lesson: 13,
  title: {
    de: "Zusammenfassung & Klausurvorbereitung: das ganze Semester auf einen Blick",
  },
  content: {
    de: `Die letzte Sitzung ist eine Wiederholung — und genau das richtige Werkzeug für die Klausurvorbereitung. Statt neuen Stoff bündelt dieses Kapitel den **roten Faden des ganzen Kurses**: die drei Säulen, wie die einzelnen Vorlesungen aufeinander aufbauen, und eine kompakte Checkliste, was du wirklich können musst. Nutze es als Landkarte und springe von hier in die einzelnen Kapitel-Erklärungen zurück.

## Das Wichtigste in Kürze

- Der Kurs hat **drei Säulen**: **Kryptografie** (V2–V8), **Netzwerk-/Web-Sicherheit** (V9) und **Software-/Systemsicherheit** (V10–V12) — gerahmt von den Grundkonzepten aus V1.
- **Krypto-Faden:** symmetrisch (DES, AES) → asymmetrisch (RSA, das Schlüsselaustauschproblem) → Integrität (Hashes, Signaturen, MAC) → Anwendungen (Bitcoin, Protokolle/TLS).
- **Sicherheit-Faden:** Verfügbarkeit angreifen (DoS) und Eingaben missbrauchen (XSS/SQLi) → Programme ausnutzen (Exploits) → Systeme härten (OS-Sicherheit) → Schadsoftware verstehen (Malware/RE).
- **Wiederkehrende Prinzipien:** CIA-Triade, schwächstes Glied, Defense in Depth, Kerckhoffs, Adversarial Setting — sie tauchen in **jedem** Kapitel wieder auf.

## Säule 1: Kryptografie (V2–V8)

Der Bogen ist sauber: Es beginnt mit **klassischen Chiffren** und der Lektion, dass ein großer Schlüsselraum nicht reicht (Frequenzanalyse, V2). Dann **symmetrische Blockchiffren**: **DES** mit der Feistel-Struktur (V3) und **AES** mit seinen vier Schichten (V4) — beide nach dem Prinzip Konfusion + Diffusion über viele Runden. Weil symmetrische Verfahren das **Schlüsselaustauschproblem** haben, kommt die **asymmetrische** Kryptografie: **RSA** auf Basis der Faktorisierung (V5). Für Integrität und Authentizität folgen **Hash-Funktionen, digitale Signaturen und MAC/HMAC** (V6). Den Abschluss bilden zwei große Anwendungen: **Bitcoin** (Hashes + Signaturen + Proof-of-Work, V7) und **Schlüsselvereinbarung/Protokolle** — Diffie-Hellman, Needham-Schroeder, Kerberos (V8).

## Säule 2: Netzwerk- & Web-Sicherheit (V9)

Hier verlässt der Kurs die Mathematik. **TLS** führt die Krypto im Web zusammen (hybrid). Zwei Angreifertypen: **Denial-of-Service** attackiert die **Verfügbarkeit** (ICMP-Flooding, Spoofing, Reflection/Amplification, DDoS via Botnet wie Mirai), und **Input Validation** adressiert bösartige Eingaben (**XSS**, **SQL-Injection**) — abgewehrt durch Sanitization, Validation, **Whitelisting** und CSP.

## Säule 3: Software- & Systemsicherheit (V10–V12)

Zuerst die **Software-Exploits** (V10): Ein Buffer Overflow überschreibt die Rücksprungadresse; daraus wird Code Injection, und im Wettrüsten mit DEP entstehen **Code-Reuse/ROP** sowie die Abwehr **ASLR** und **CFI**. Dann **Betriebssystemsicherheit** am Beispiel **Multics** (V11): **Reference Monitor**, **Schutzringe**, ACL und **Bell-LaPadula** zeigen, wie ein OS Zugriff zwingend durchsetzt. Schließlich **Reverse Engineering & Malware** (V12): wie man Binaries ohne Quellcode analysiert (statisch/dynamisch) und wie Malware (Persistenz, Ransomware) sich der Analyse entzieht.

## Begriffe & Notation

| Säule | Must-know-Begriffe |
|---|---|
| **Grundlagen** | CIA-Triade, schwächstes Glied, Defense in Depth, Threat Model, Kerckhoffs |
| **Symmetrisch** | Konfusion/Diffusion, Feistel (DES), Schichten (AES), ECB/CBC, XOR, OTP |
| **Asymmetrisch** | Einwegfunktion, RSA (n,e,d,φ(n)), Faktorisierung, Diffie-Hellman (diskreter Log) |
| **Integrität** | Hash (Urbild-/Kollisionsresistenz), Geburtstagsparadoxon 2^(n/2), Signatur, MAC/HMAC, Zertifikat/PKI |
| **Anwendungen** | Bitcoin (Hash Pointer, Merkle, PoW, UTXO), TLS, KDC, Replay, Kerberos |
| **Netzwerk/Web** | DoS/DDoS, Reflection/Amplification, XSS, SQL-Injection, Whitelisting, CSP |
| **Software/System** | Buffer Overflow, DEP, ROP, ASLR, CFI; Reference Monitor, Ringe/Brackets, Bell-LaPadula; Malware, Persistenz, Ransomware |

## Typische Fallen

- **Themen isoliert lernen.** Die Stärke der Klausur liegt in den **Querverbindungen** (z. B. „warum braucht Bitcoin Hashes *und* Signaturen?", „warum löst asymmetrisch das Problem von symmetrisch?").
- **Konzepte vs. Details verwechseln.** Der Prof betont: **Konzepte verstehen**, nicht nur Implementierungsdetails auswendig lernen (z. B. PHP-Code lesen, nicht schreiben).
- **CIA-Zuordnung vergessen.** Viele Angriffe lassen sich einem Schutzziel zuordnen (DoS → Verfügbarkeit, Sniffing → Vertraulichkeit, Manipulation → Integrität).
- **Rechenaufgaben unterschätzen.** RSA, Diffie-Hellman, DES-Runde und Rings & Brackets sind typische **Rechenaufgaben** — üben, nicht nur lesen.

## Klausur-Fokus

- **Rechnen können:** RSA (Schlüsselerzeugung + Ver-/Entschlüsselung + EEA + Square-and-Multiply), Diffie-Hellman (k_AB = α^(a·b) mod p), eine DES-Feistel-Runde, **Rings & Brackets** (die vier Fälle).
- **Erklären können:** Konfusion/Diffusion, Hash-Sicherheitseigenschaften + Geburtstagsparadoxon, Signatur vs. MAC, MITM + Zertifikate, Double-Spend + Longest Chain, DoS-Varianten, XSS vs. SQLi, Code Injection vs. Code-Reuse, DEP/ASLR/CFI, Reference-Monitor-Prinzipien, Bell-LaPadula.
- **Einordnen können:** jeden Mechanismus der passenden **CIA**-Eigenschaft und der richtigen **Säule** zuordnen.
- Geh die einzelnen Kapitel-Erklärungen (V1–V12) durch und prüfe dich am jeweiligen **Klausur-Fokus** — diese Zusammenfassung ist die Landkarte dazu.

## Mehr dazu

- **Computerphile (YouTube-Kanal)** (aus den Folien): kurze, hochwertige Videos zu fast allen Kursthemen — ideal zum Wiederholen. https://www.youtube.com/computerphile
- **Patrick Winston (MIT) — „How To Speak"** (aus den Folien): wie man Inhalte klar präsentiert — nützlich für mündliche Prüfungen und Vorträge. https://www.youtube.com/watch?v=Unzc731iCUY
- **David JP Phillips — „How to avoid death by PowerPoint"** (aus den Folien): bessere Folien und Präsentationen. https://www.youtube.com/watch?v=Iwpi1Lm6dFo`,
  },
};

export function buildCybersicherheit2025Explanations(): Explanation[] {
  return [
    lecture01,
    lecture02,
    lecture03,
    lecture04,
    lecture05,
    lecture06,
    lecture07,
    lecture08,
    lecture09,
    lecture10,
    lecture11,
    lecture12,
    lecture13,
  ];
}

export function buildCybersicherheit2025QuizSets(): QuizSet[] {
  return [];
}
