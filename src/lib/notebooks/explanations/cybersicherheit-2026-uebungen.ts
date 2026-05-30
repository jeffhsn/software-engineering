import type { Explanation } from "../explanation-types";

/**
 * Step-by-step Lösungswege for the Cybersicherheit SoSe 2026 Übungen.
 *
 * Written in the professor's method: grounded in each sheet's own aufgaben.md +
 * loesung.md (pdf-to-md of the source PDFs). The job is to make the *path* to
 * the answer obvious — name the rule, say where it comes from, then compute
 * every intermediate step by hand so the reader can reproduce it under exam
 * pressure. Übungsblatt 4 (RSA) has no official Lösung yet, so its walkthrough
 * is built from the sheet + the RSA lecture. German is canonical.
 *
 * Gotcha: the whole body is one TS template literal — never use a backtick
 * inside the content (use **bold** for code-ish terms), and never an ASCII
 * double-quote inside a markdown image title.
 */

const ueb01: Explanation = {
  id: "cs-2026-u01",
  lesson: 2,
  title: {
    de: "Lösungsweg — Übungsblatt 1: Klassische Kryptografie (Caesar, Transposition, Vigenère)", en: "Solution — Exercise Sheet 1: Classical Cryptography (Caesar, Transposition, Vigenère)", tr: "Çözüm - Alıştırma Kağıdı 1: Klasik Kriptografi (Caesar, Transpozisyon, Vigenère)", ar: "الحل - ورقة التمرين 1: التشفير الكلاسيكي (Caesar، Transposition، Vigenère)", ru: "Решение — Лист упражнения 1: Классическая криптография (Цезарь, транспонирование, Виженер)", it: "Soluzione — Scheda di esercizio 1: Crittografia classica (Cesare, Trasposizione, Vigenère)", es: "Solución: Hoja de ejercicio 1: Criptografía clásica (César, Transposición, Vigenère)", fr: "Solution — Fiche d'exercice 1 : Cryptographie classique (César, Transposition, Vigenère)", zh: "解决方案 — 练习表 1：经典密码学（凯撒密码学、转置密码学、维吉尼亚密码学）", pl: "Rozwiązanie — Arkusz ćwiczenia 1: Kryptografia klasyczna (Cezar, Transpozycja, Vigenère)", pt: "Solução - Folha de Exercícios 1: Criptografia Clássica (César, Transposição, Vigenère)", uk: "Рішення — аркуш із вправою 1: класична криптографія (Цезар, транспозиція, Віженер)", fa: "راه حل - برگه تمرین 1: رمزنگاری کلاسیک (سزار، جابجایی، ویژنر)", ja: "解決策 — 演習シート 1: 古典的な暗号 (シーザー、転置、ヴィジェネール)", ko: "솔루션 — 연습 시트 1: 고전 암호화(Caesar, Transposition, Vigenère)", vi: "Giải pháp - Bảng bài tập 1: Mật mã cổ điển (Caesar, Chuyển vị, Vigenère)", hi: "समाधान - अभ्यास शीट 1: शास्त्रीय क्रिप्टोग्राफी (सीज़र, ट्रांसपोज़िशन, विगेनियर)", ur: "حل - مشق شیٹ 1: کلاسیکی خفیہ نگاری (سیزر، ٹرانسپوزیشن، ویگنیر)", nl: "Oplossing — Oefenblad 1: Klassieke cryptografie (Caesar, Transpositie, Vigenère)", el: "Λύση — Φύλλο Άσκησης 1: Κλασική Κρυπτογραφία (Caesar, Transposition, Vigenère)", cs: "Řešení — Cvičební list 1: Klasická kryptografie (Caesar, Transpozice, Vigenère)", hu: "Megoldás – 1. feladatlap: Klasszikus kriptográfia (Caesar, Transposition, Vigenère)", ro: "Soluție — Fișa de exercițiu 1: Criptografie clasică (Caesar, Transposition, Vigenère)", sq: "Zgjidhja — Fleta e ushtrimit 1: Kriptografia klasike (Cezar, Transposition, Vigenère)", sr: "Решење — Табела за вежбу 1: Класична криптографија (Цезар, Транспозиција, Виженер)", hr: "Rješenje — list za vježbu 1: Klasična kriptografija (Caesar, Transpozicija, Vigenère)", bg: "Решение — лист за упражнение 1: Класическа криптография (Цезар, транспониране, Виженер)", sv: "Lösning — Övningsblad 1: Klassisk kryptografi (Caesar, Transposition, Vigenère)", fi: "Ratkaisu – Harjoitustaulukko 1: Klassinen kryptografia (Caesar, Transpositio, Vigenère)", id: "Solusi — Lembar Latihan 1: Kriptografi Klasik (Caesar, Transposisi, Vigenère)", th: "แนวทางแก้ไข — เอกสารแบบฝึกหัดที่ 1: วิทยาการเข้ารหัสลับแบบคลาสสิก (ซีซาร์ การขนย้าย Vigenère)", sw: "Suluhisho - Jedwali la 1 la Zoezi: Siri za Kawaida (Kaisari, Ubadilishaji, Vigenère)",
  },
  content: {
    de: `Dieses Blatt ist deine erste echte Begegnung mit Verschlüsselung von Hand. Es führt dich durch genau drei historische Verfahren, und sie sind mit Absicht in dieser Reihenfolge gewählt: Caesar zeigt das Grundprinzip *und* sofort seine Schwäche, die Transposition dreht das Prinzip auf den Kopf, und Vigenère repariert die Caesar-Schwäche. Wer diese drei von Hand rechnen kann, versteht danach jede Substitutions- und Permutationsidee im Kurs. Wir lösen jede Aufgabe so, wie der Professor sie an der Tafel vorrechnet: erst die Regel, dann jeder einzelne Buchstabe.

Eine Sache vorweg, die *alle* drei Verfahren teilen: jeder Buchstabe bekommt eine Zahl, A = 0, B = 1, …, Z = 25. Das ganze Rechnen passiert dann „modulo 26", weil das Alphabet 26 Buchstaben hat und wir am Ende von Z wieder bei A landen wollen — dasselbe Uhren-Prinzip wie aus der Vorlesung.

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
  id: "cs-2026-u02",
  lesson: 3,
  title: {
    de: "Lösungsweg — Übungsblatt 2: Vernam/One-Time-Pad, Formbarkeit, DES & S-Boxen", en: "Solution — Exercise Sheet 2: Vernam/One-Time-Pad, Formability, DES & S-Boxes", tr: "Çözüm - Alıştırma Kağıdı 2: Vernam/Tek Kullanımlık Ped, Şekillendirilebilirlik, DES ve S-Box'lar", ar: "الحل - ورقة التمرين 2: Vernam/One-TimePad، وقابلية التشكيل، وDES، وS-Boxes", ru: "Решение — Таблица с упражнением 2: Vernam/одноразовый блокнот, возможность формования, DES и S-Box", it: "Soluzione — Foglio di esercizi 2: Vernam/One-Time-Pad, formabilità, DES e S-Boxes", es: "Solución: Hoja de ejercicio 2: Vernam/One-Time-Pad, formabilidad, DES y S-Boxes", fr: "Solution — Feuille d'exercice 2 : Vernam/One-Time-Pad, formabilité, DES et S-Boxes", zh: "解决方案 — 练习表 2：Vernam/One-Time-Pad、可成形性、DES 和 S-Boxes", pl: "Rozwiązanie — Arkusz ćwiczeń 2: Vernam/jednorazowa podkładka, formowalność, DES i S-Boxy", pt: "Solução - Folha de Exercícios 2: Vernam/One-Time-Pad, Formabilidade, DES e S-Boxes", uk: "Рішення — Аркуш вправи 2: Vernam/One-Time-Pad, Formability, DES & S-Box", fa: "راه حل - برگه تمرین 2: ورنام/ پد یکبار مصرف، شکل پذیری، DES و جعبه های S", ja: "ソリューション — 演習シート 2: Vernam/ワンタイムパッド、成形性、DES および S-Box", ko: "솔루션 — 연습 시트 2: Vernam/One-Time-Pad, 성형성, DES 및 S-Box", vi: "Giải pháp — Bảng bài tập 2: Vernam/One-Time-Pad, Khả năng định dạng, DES & S-Box", hi: "समाधान - अभ्यास शीट 2: वर्नाम/वन-टाइम-पैड, फॉर्मेबिलिटी, डीईएस और एस-बॉक्स", ur: "حل — ایکسرسائز شیٹ 2: ورنام/ون ٹائم پیڈ، فارمیبلٹی، ڈی ای ایس اور ایس بکس", nl: "Oplossing — Oefenblad 2: Vernam/One-Time-Pad, vervormbaarheid, DES & S-Boxen", el: "Λύση — Φύλλο άσκησης 2: Vernam/One-Time-Pad, Formability, DES & S-Box", cs: "Řešení — Cvičební list 2: Vernam/One-Time-Pad, Formability, DES & S-Boxes", hu: "Megoldás — 2. gyakorlati lap: Vernam/Egyszeri Pad, Formálhatóság, DES és S-Boxok", ro: "Soluție — Fișa de exercițiu 2: Vernam/One-Time-Pad, Formabilitate, DES și S-Box", sq: "Zgjidhja — Fleta e ushtrimeve 2: Vernam/Pad për një herë, Formueshmëria, DES & S-Boxes", sr: "Решење — Табела за вежбу 2: Вернам/једнократна подлога, формабилност, ДЕС и С-кутије", hr: "Rješenje — List za vježbu 2: Vernam/One-Time-Pad, Formability, DES & S-Boxovi", bg: "Решение — лист за упражнение 2: Vernam/еднократна подложка, оформяне, DES и S-кутии", sv: "Lösning — Övningsblad 2: Vernam/One-Time-Pad, Formability, DES & S-Boxes", fi: "Ratkaisu — Harjoitustaulukko 2: Vernam/One-Time-Pad, Muovattavuus, DES & S-Boxes", id: "Solusi — Lembar Latihan 2: Vernam/One-Time-Pad, Sifat mampu bentuk, DES & S-Box", th: "แนวทางแก้ไข — เอกสารแบบฝึกหัดที่ 2: Vernam/One-Time-Pad, ความสามารถในการขึ้นรูป, DES และ S-Boxes", sw: "Suluhisho — Laha ya 2 ya Zoezi: Vernam/Padi ya Wakati Mmoja, Uundaji, DES & S-Boxes",
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
- **Diffusion** streut den Einfluss eines einzelnen Klartextsymbols über möglichst viele Geheimtextstellen — kippt ein Klartextbit, sollen sich viele Geheimtextbits ändern. Baustein bei DES: die **Bit-Permutation** (und die Expansion).

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

const ueb02_2: Explanation = {
  id: "cs-2026-u02_2",
  lesson: 3,
  title: {
    de: "Lösungsweg — Übungsblatt 2.2: Die erste DES-Runde, Avalanche-Effekt & Entschlüsselung", en: "Solution — Exercise sheet 2.2: The first round of DES, Avalanche effect & decryption", tr: "Çözüm — Alıştırma Kağıdı 2.2: DES'in ilk turu, Çığ etkisi ve şifre çözme", ar: "الحل - ورقة التمرين 2.2: الجولة الأولى من DES وتأثير الانهيار الجليدي وفك التشفير", ru: "Решение — Таблица упражнений 2.2: Первый раунд DES, эффект лавины и расшифровка", it: "Soluzione — Scheda di esercizio 2.2: Il primo round di DES, effetto valanga e decrittazione", es: "Solución: Hoja de ejercicio 2.2: La primera ronda de DES, efecto Avalancha y descifrado", fr: "Solution — Fiche d'exercice 2.2 : Le premier tour de DES, Effet Avalanche & décryptage", zh: "解决方案 — 练习表 2.2：第一轮 DES、雪崩效应和解密", pl: "Rozwiązanie — Arkusz ćwiczeń 2.2: Pierwsza runda DES, efekt lawiny i deszyfrowanie", pt: "Solução - Folha de exercícios 2.2: A primeira rodada de DES, efeito Avalanche e descriptografia", uk: "Рішення — аркуш із вправою 2.2: перший раунд DES, ефект лавини та дешифрування", fa: "راه حل - برگه تمرین 2.2: دور اول DES، جلوه بهمن و رمزگشایی", ja: "解決策 — 演習シート 2.2: DES の最初のラウンド、アバランチ効果と復号化", ko: "솔루션 — 연습 시트 2.2: DES의 첫 번째 라운드, 눈사태 효과 및 암호 해독", vi: "Giải pháp — Bài tập 2.2: Vòng đầu tiên của DES, hiệu ứng Avalanche & giải mã", hi: "समाधान - अभ्यास शीट 2.2: डीईएस का पहला दौर, हिमस्खलन प्रभाव और डिक्रिप्शन", ur: "حل — ایکسرسائز شیٹ 2.2: ڈی ای ایس کا پہلا دور، برفانی تودہ اثر اور ڈکرپشن", nl: "Oplossing — Oefenblad 2.2: De eerste ronde van DES, Avalanche-effect en decodering", el: "Λύση — Φύλλο άσκησης 2.2: Ο πρώτος γύρος DES, εφέ χιονοστιβάδας και αποκρυπτογράφηση", cs: "Řešení — Cvičební list 2.2: První kolo DES, Avalanche effect & dešifrování", hu: "Megoldás — 2.2. feladatlap: A DES első köre, Avalanche effektus és visszafejtés", ro: "Soluție — Fișa de exercițiu 2.2: Prima rundă de DES, efect de avalanșă și decriptare", sq: "Zgjidhja — Fleta e ushtrimeve 2.2: Raundi i parë i DES, efekti i ortekut dhe deshifrimi", sr: "Решење — Табела за вежбу 2.2: Први круг ДЕС-а, ефекат лавине и дешифровање", hr: "Rješenje — List za vježbu 2.2: Prvi krug DES-a, efekt lavine i dešifriranje", bg: "Решение — Лист за упражнение 2.2: Първият кръг на DES, ефект на лавина и дешифриране", sv: "Lösning — Övningsblad 2.2: Den första omgången av DES, lavineffekt och dekryptering", fi: "Ratkaisu — Harjoituslomake 2.2: Ensimmäinen DES-kierros, Avalanche Effect & salauksen purku", id: "Solusi — Lembar latihan 2.2: Putaran pertama DES, efek Longsor & dekripsi", th: "แนวทางแก้ไข — เอกสารแบบฝึกหัด 2.2: รอบแรกของ DES, เอฟเฟกต์ Avalanche และการถอดรหัส", sw: "Suluhisho — Laha ya mazoezi 2.2: Mzunguko wa kwanza wa DES, athari ya Avalanche & usimbuaji",
  },
  content: {
    de: `Auf dem ersten Blatt zu DES ging es um S-Boxen und das Prinzip. Dieses Blatt nimmt dich an die Hand und rechnet die **erste komplette DES-Runde** bitweise durch, zeigt dann am selben Aufbau den **Avalanche-Effekt** und beweist zum Schluss, dass die **Entschlüsselung** dieselbe Maschine rückwärts ist. Der Trick bei allen drei Aufgaben: Man füttert DES mit fast lauter Nullen und einem einzigen gesetzten Bit. Dann muss man nicht 64 zufällige Bits durch die Tabellen jagen, sondern kann jeden Schritt nachvollziehen, weil fast überall Nullen stehen. Genau so wird es auch in der Klausur gestellt.

Halte die Reihenfolge der Rundenfunktion **f** bereit, die hier ständig gebraucht wird — die Eselsbrücke **E-X-S-P**: **E**xpansion (32→48 Bit), **X**OR mit dem Rundenschlüssel, **S**-Boxen (48→32 Bit), **P**ermutation. Und die zwei Feistel-Zeilen: **L_i = R_{i−1}** und **R_i = L_{i−1} ⊕ f(R_{i−1}, k_i)**.

## Aufgabe 1 — Die erste DES-Runde Schritt für Schritt

**Aufbau.** Der Klartext besteht aus 64 Bit, alle 0 außer dem Bit an Position 15, das 1 ist (gezählt von links, x1…x64). Der Schlüssel ist komplett 0, also sind auch alle Rundenschlüssel k_i = 0.

**Startzustand x.** Du schreibst die 64 Bit in 4 Zeilen zu je 16 Bit. Nur in der ersten Zeile, an Position 15, steht eine 1:

    0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
    0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0

**Eingangspermutation IP → L0, R0.** Die feste IP-Tabelle würfelt nur die Positionen. Sie bildet das eine gesetzte Bit (Position 15) auf die *vorletzte* Stelle der **rechten** Hälfte ab; alles andere bleibt 0. Ergebnis:

- **L0** = 0000000000000000 0000000000000000 (32 Nullen)
- **R0** = 0000000000000000 0000000000000010 (eine 1 an der vorletzten Stelle)

Hier zahlt sich das Nullen-Setup aus: Statt eine ganze Permutationstabelle abzuarbeiten, musst du nur *einer* 1 folgen.

**Expansion E(R0) ⊕ k1 → Eingaben der 8 S-Boxen.** Die Expansion bläst die 32 Bit von R0 auf 48 Bit auf und verteilt sie auf acht 6-Bit-Päckchen, eines pro S-Box. Da k1 = 0 ist, ändert das XOR nichts (E(R0) ⊕ 0 = E(R0)). Das einzige gesetzte Bit von R0 landet im Eingabebereich der **letzten** S-Box S8, an Position 4 ihrer 6 Bit:

- S1 = S2 = S3 = S4 = S5 = S6 = S7 = **000000**
- S8 = **000100**

**S-Box-Ausgabe S_out (vor P).** Jede S-Box liefert über Zeile = b1b6 und Spalte = b2b3b4b5 einen 4-Bit-Wert. Für S1…S7 ist die Eingabe 000000 → Zeile 0, Spalte 0; für S8 ist sie 000100 → Zeile 0, Spalte 2. Aus dem NIST-Standard:

> S1(000000)=14, S2(000000)=15, S3(000000)=10, S4(000000)=7, S5(000000)=2, S6(000000)=12, S7(000000)=4, S8(000100)=8.

Als 4-Bit-Zahlen aneinandergehängt (14=1110, 15=1111, 10=1010, 7=0111, 2=0010, 12=1100, 4=0100, 8=1000):

    S_out = 1110 1111 1010 0111 0010 1100 0100 1000

**Permutation P → P_out.** Die P-Tabelle verwürfelt diese 32 Bit zu:

    P_out = 1101 1000 1101 1000 1101 0011 1001 1100

**Zustand am Rundenende (L1, R1).** Nach Feistel ist L1 = R0 und R1 = L0 ⊕ P_out. Da L0 = 0 ist, gilt R1 = P_out:

- **L1** = R0 (die eine 1 an der vorletzten Stelle)
- **R1** = 1101 1000 1101 1000 1101 0011 1001 1100

> **Beobachtung:** Ein einziges gesetztes Eingabebit erzeugt nach *einer* Runde schon zahlreiche Einsen in R1. Das ist die Diffusion der Rundenfunktion in Aktion.

## Aufgabe 2 — Der Avalanche-Effekt

Jetzt änderst du nur eine Kleinigkeit und schaust, wie stark sich das Ergebnis verändert. Eingang: alle Bits 0 außer **x37 = 1**; alle 56 Schlüsselbits (und damit alle Rundenschlüssel) sind diesmal **1**.

**Auf welche S-Boxen wirkt x37?** Nach IP landet das Bit wieder in R0. Die Expansion dupliziert Randbits, deshalb fällt diese Position in die *überlappenden* Eingabebereiche von **S5 und S6**. Weil der Rundenschlüssel aus lauter Einsen besteht, wird nach E noch alles mit 1 ge-XOR-t — fast alle S-Box-Eingaben sind also 111111, nur bei S5 und S6 kippt das betroffene Bit:

- S1 = S2 = S3 = S4 = S7 = S8 = 111111
- S5 = 111101 (das betroffene Bit an Position 5)
- S6 = 011111 (das betroffene Bit an Position 1)

**Zustand (L1, R1).** L1 = R0 (enthält genau das eine Bit), und R1 = L0 ⊕ P(S-Box-Ausgabe). Die Musterlösung liefert:

- **L1** = 0000000000000000 0001000000000000
- **R1** = 0011100011011111 1101100101000011

**Wie viele Bits unterscheiden sich vom Lauf mit x = 0⁶⁴?** Vergleicht man (L1, R1) hier mit dem Ergebnis, das derselbe Schlüssel (alle 1) für den Null-Eingang liefert, beträgt die **Hamming-Distanz 5 Bit**: ein Bit kommt aus dem trivialen Übergang in L1, vier weitere aus den geänderten S5/S6-Eingaben in R1. Die Aussage: Schon eine einzige Runde verstärkt eine 1-Bit-Differenz über die nichtlinearen S-Boxen zu mehreren Bit. Über 16 Runden schaukelt sich das zum **vollständigen Avalanche-Effekt** auf — im Mittel ändert sich rund die Hälfte aller Chiffratbits. Genau das will man von einer guten Blockchiffre.

> **Eselsbrücke (Avalanche):** Ein gekipptes Eingabebit → nach 5 Runden hängt jedes Ausgabebit von *jedem* Klartext- und Schlüsselbit ab. Die S-Boxen (Konfusion) machen die Verstärkung nichtlinear, Expansion und P (Diffusion) tragen sie über den ganzen Block.

## Aufgabe 3 — DES-Entschlüsselung

**Warum derselbe Algorithmus?** Die Feistel-Runde L_i = R_{i−1}, R_i = L_{i−1} ⊕ f(R_{i−1}, k_i) ist auch dann umkehrbar, wenn f selbst *nicht* invertierbar ist (und die nichtlinearen S-Boxen sind es nicht). Der Grund steckt in der Struktur: Wendet man auf den vertauschten Zustand erneut eine Feistel-Runde mit demselben k_i an, kommt der vorherige Zustand heraus. Beim Entschlüsseln durchläuft DES daher genau dieselben Operationen, nur die Rundenschlüssel kommen in **umgekehrter Reihenfolge** k16, k15, …, k1. Eine Implementierung braucht also nur *einen* Datenpfad für beide Richtungen — das ist der Spar-Trick der Feistel-Chiffren.

**Die inverse Rundenrekursion.** Stellt man die zwei Rundengleichungen um, erhält man:

> **R_{i−1} = L_i** und **L_{i−1} = R_i ⊕ f(L_i, k_i)**

**Anwenden auf (L1, R1) aus Aufgabe 2 mit k1 = 1⁴⁸.** Es gilt R0 = L1 (das eine gesetzte Bit wandert unverändert zurück). Für L0 rechnest du L0 = R1 ⊕ f(L1, k1). Und hier kommt der schöne Kurzschluss: In Aufgabe 2 war L0 = 0, also galt bei der Verschlüsselung R1 = L0 ⊕ f(R0, k1) = f(R0, k1). Da L1 = R0, ist f(L1, k1) = f(R0, k1) = R1. Damit:

> L0 = R1 ⊕ f(L1, k1) = R1 ⊕ R1 = **0³²**

Ergebnis: **L0 = 0** (32 Nullen) und **R0** trägt genau das eine Bit aus L1.

**Vergleich.** Das rekonstruierte (L0, R0) stimmt exakt mit dem Zustand überein, den die Eingangspermutation IP aus dem ursprünglichen Klartext (x37 = 1) erzeugt hatte. Anschließendes IP⁻¹ liefert also wieder den Original-Klartext. Damit ist am Beispiel einer Runde gezeigt: Die inverse Feistel-Runde hebt die Verschlüsselungsrunde exakt auf, unabhängig davon, wie f im Inneren aussieht — und das überträgt sich auf alle 16 Runden.

## Klausur-Fokus

Dieses Blatt prüft Genauigkeit, nicht Tricks. Übe: (1) **eine Runde durchrechnen** — Startzustand notieren, IP einer einzelnen 1 folgen, E-X-S-P abarbeiten (welche S-Box bekommt das Bit?), S-Boxen über Zeile=b1b6 / Spalte=b2b3b4b5 nachschlagen und in 4 Bit zurückwandeln, dann L1 = R0 und R1 = L0 ⊕ P_out. (2) **Avalanche** — sagen können, dass schon eine Runde eine 1-Bit-Differenz auf mehrere Bit verstärkt und nach ~5 Runden jedes Bit von allem abhängt, und das mit der Hamming-Distanz belegen. (3) **Entschlüsselung** — die inverse Rekursion R_{i−1} = L_i, L_{i−1} = R_i ⊕ f(L_i, k_i) aufstellen und begründen, warum f nicht invertierbar sein muss und die Rundenschlüssel rückwärts laufen. Der rote Faden über alle drei Aufgaben ist die Feistel-Symmetrie.`,
  },
};

const ueb03: Explanation = {
  id: "cs-2026-u03",
  lesson: 4,
  title: {
    de: "Lösungsweg — Übungsblatt 3: Wiederholung, AES-Brute-Force & Betriebsmodi (ECB/CBC/OFB)", en: "Solution — Exercise Sheet 3: Repetition, AES Brute Force & Operating Modes (ECB/CBC/OFB)", tr: "Çözüm — Alıştırma Kağıdı 3: Tekrarlama, AES Kaba Kuvvet ve Çalışma Modları (ECB/CBC/OFB)", ar: "الحل - ورقة التمرين 3: التكرار، والقوة الغاشمة لـ AES، وأوضاع التشغيل (ECB/CBC/OFB)", ru: "Решение — Лист упражнения 3: повторение, перебор AES и режимы работы (ECB/CBC/OFB)", it: "Soluzione — Scheda di esercizio 3: Ripetizione, AES Brute Force e modalità operative (ECB/CBC/OFB)", es: "Solución: Hoja de ejercicio 3: repetición, fuerza bruta AES y modos de funcionamiento (ECB/CBC/OFB)", fr: "Solution — Feuille d'exercice 3 : Répétition, force brute AES et modes de fonctionnement (ECB/CBC/OFB)", zh: "解决方案 — 练习表 3：重复、AES 暴力破解和操作模式 (ECB/CBC/OFB)", pl: "Rozwiązanie — Arkusz ćwiczeń 3: Powtórzenia, brutalna siła AES i tryby działania (ECB/CBC/OFB)", pt: "Solução - Folha de Exercícios 3: Repetição, Força Bruta AES e Modos Operacionais (ECB/CBC/OFB)", uk: "Рішення — аркуш із вправами 3: повторення, груба сила AES і режими роботи (ECB/CBC/OFB)", fa: "راه‌حل - برگه تمرین 3: تکرار، AES Brute Force و حالت‌های عملیاتی (ECB/CBC/OFB)", ja: "ソリューション — 演習シート 3: 反復、AES ブルート フォース、動作モード (ECB/CBC/OFB)", ko: "솔루션 — 연습 시트 3: 반복, AES 무차별 공격 및 작동 모드(ECB/CBC/OFB)", vi: "Giải pháp — Bảng bài tập 3: Sự lặp lại, AES Brute Force & Các chế độ vận hành (ECB/CBC/OFB)", hi: "समाधान - अभ्यास शीट 3: दोहराव, एईएस क्रूर बल और संचालन मोड (ईसीबी/सीबीसी/ओएफबी)", ur: "حل — ایکسرسائز شیٹ 3: تکرار، AES بروٹ فورس اور آپریٹنگ موڈز (ECB/CBC/OFB)", nl: "Oplossing — Oefenblad 3: Herhaling, AES Brute Force en bedieningsmodi (ECB/CBC/OFB)", el: "Λύση — Φύλλο άσκησης 3: Επανάληψη, AES Brute Force & Operating Modes (ECB/CBC/OFB)", cs: "Řešení — Cvičební list 3: Opakování, hrubá síla AES a provozní režimy (ECB/CBC/OFB)", hu: "Megoldás — 3. gyakorlati lap: Ismétlés, AES nyers erő és működési módok (ECB/CBC/OFB)", ro: "Soluție — Fișa de exercițiu 3: Repetiție, forță brută AES și moduri de operare (ECB/CBC/OFB)", sq: "Zgjidhja — Fleta e Ushtrimit 3: Përsëritja, Forca Brute AES dhe mënyrat e funksionimit (ECB/CBC/OFB)", sr: "Решење — Табела за вежбу 3: Понављање, АЕС груба сила и режими рада (ЕЦБ/ЦБЦ/ОФБ)", hr: "Rješenje — List za vježbu 3: Ponavljanje, AES gruba sila i načini rada (ECB/CBC/OFB)", bg: "Решение — Упражнение Лист 3: Повторение, AES груба сила и режими на работа (ECB/CBC/OFB)", sv: "Lösning — Övningsblad 3: Upprepning, AES Brute Force och driftlägen (ECB/CBC/OFB)", fi: "Ratkaisu – Harjoitustaulukko 3: Toisto, AES-raaka voima ja toimintatilat (ECB/CBC/OFB)", id: "Solusi — Lembar Latihan 3: Pengulangan, Brute Force AES & Mode Pengoperasian (ECB/CBC/OFB)", th: "แนวทางแก้ไข — เอกสารแบบฝึกหัดที่ 3: การทำซ้ำ AES Brute Force และโหมดการทำงาน (ECB/CBC/OFB)", sw: "Suluhisho — Laha ya 3 ya Zoezi: Kurudia, Nguvu ya AES Brute & Njia za Uendeshaji (ECB/CBC/OFB)",
  },
  content: {
    de: `Dieses Blatt hat drei Teile, die alles bündeln, was die symmetrische Kryptografie ausmacht. Erst eine kurze **Wiederholung** der Grundbegriffe (Kerckhoffs, Kryptografie/Kryptanalyse, Notation), dann eine Stromchiffre, die diesmal nicht auf Bits, sondern auf **Buchstaben** läuft, dann die große Frage der **Langzeitsicherheit von AES** (lohnt sich ein Brute-Force überhaupt?), und zum Schluss die **Betriebsmodi** ECB, CBC und OFB an einer Spielzeug-Blockchiffre. Wir rechnen die rechenintensiven Teile vollständig durch.

## Aufgabe 1 — Wiederholung der Grundlagen

Diese Fragen sollst du frei formulieren können — hier die Musterantworten in einem Satz:

- **Kerckhoffs'sches Prinzip:** Die Sicherheit eines Kryptosystems darf *nur* auf der Geheimhaltung des **Schlüssels** beruhen, nicht auf der Geheimhaltung des Algorithmus. Beispiel: Caesar ist bei bekanntem Verfahren völlig unsicher, RSA bleibt trotz vollständig öffentlichem Algorithmus sicher.
- **Der gegenteilige Ansatz** (Sicherheit durch Geheimhaltung des Designs) heißt **Security by Obscurity** — und ist fast immer eine Falle.
- **Kryptografie vs. Kryptanalyse:** Kryptografie *baut* und schützt Informationen (z. B. durch Verschlüsselung); Kryptanalyse *bricht* Kryptosysteme. Zusammen sind sie die Kryptologie.
- **Alice/Bob/Oskar:** Alice und Bob kommunizieren über einen unsicheren Kanal (Internet), auf dem Oskar mitliest. Ohne Verschlüsselung könnte Oskar alles mitlesen — deshalb brauchen sie kryptografische Algorithmen.
- **Notation:** Klartext **x**, Chiffrat **y**, Schlüssel **k** (bzw. K für den Schlüsselraum), Verschlüsselung **e(·)**, Entschlüsselung **d(·)**, Schlüsselraum **K**, Anzahl möglicher Schlüssel **|K|**.

## Aufgabe 2 — Eine Stromchiffre auf Buchstaben

Die bekannte Stromchiffre y_i = x_i ⊕ s_i arbeitet auf Bits, also modulo 2. Die Aufgabe verallgemeinert sie auf das lateinische Alphabet.

- **Welches Alphabet im Bit-Fall?** x_i, y_i, s_i ∈ {0, 1}, also P = {0, 1}.
- **Welcher Modulus für A…Z?** Mit 26 Buchstaben (A=0 … Z=25) wird aus „mod 2" jetzt **mod 26**.
- **Wie sieht der Schlüsselstrom aus?** Jedes s_i ∈ {0, 1, …, 25} — also Buchstaben statt Bits.
- **Was ändert sich an der Entschlüsselung?** Statt XOR (das im Bit-Fall seine eigene Umkehrung ist) muss man jetzt *subtrahieren*: y_i = (x_i + s_i) mod 26 beim Verschlüsseln, x_i = (y_i − s_i) mod 26 beim Entschlüsseln.

### Schritt für Schritt — HWHWZB mit Key BSASRP entschlüsseln

Buchstaben in Zahlen, dann x = (y − k) mod 26 pro Stelle (bei negativem Ergebnis +26):

| Chiffrat | H | W | H | W | Z | B |
|---|---|---|---|---|---|---|
| y | 7 | 22 | 7 | 22 | 25 | 1 |
| Key | B | S | A | S | R | P |
| k | 1 | 18 | 0 | 18 | 17 | 15 |
| y − k | 6 | 4 | 7 | 4 | 8 | −14 |
| mod 26 | 6 | 4 | 7 | 4 | 8 | 12 |
| Klartext | **G** | **E** | **H** | **E** | **I** | **M** |

Der Klartext ist **GEHEIM**. Achte auf die letzte Stelle: 1 − 15 = −14, und −14 + 26 = 12 = M. Das ist genau die Stelle, an der man das „mod" beim Subtrahieren ernst nehmen muss.

## Aufgabe 3 — Brute-Force gegen AES-128

Hier geht es um die Langzeitsicherheit. Annahme: Der beste Angriff ist die vollständige Schlüsselsuche.

- **Wie viele 128-Bit-Schlüssel gibt es?** Jedes der 128 Bit ist 0 oder 1 → **|K| = 2¹²⁸** (das sind etwa 3,4 · 10³⁸ Schlüssel).
- **Wie viele ASICs für 1 Mio. €?** Ein ASIC kostet 40 €, plus 100 % Overhead (Integration, Strom, Kühlung) → effektiv **80 € pro ASIC**. Mit 1 000 000 € sind das 1 000 000 / 80 = **12 500 ASICs**.
- **Gesamtrate.** Jeder ASIC prüft 7 · 10⁸ Schlüssel/s, also zusammen 12 500 · 7 · 10⁸ ≈ **8,75 · 10¹² Schlüssel/s**.
- **Durchschnittliche Suchdauer.** Im Mittel muss man nur die *Hälfte* aller Schlüssel testen: 2¹²⁷ ≈ 1,7 · 10³⁸ Schlüssel. Zeit = 1,7 · 10³⁸ / 8,75 · 10¹² ≈ **1,9 · 10²⁵ Sekunden**. In Jahren (÷ 3,15 · 10⁷ s) sind das rund **6 · 10¹⁷ Jahre**.
- **Im Vergleich zum Universum.** Das Universum ist ca. 10¹⁰ Jahre alt. Die Suche dauert also etwa **6 · 10⁷-mal so lange wie das Alter des Universums** — also rund 60 Millionen Universumsalter.

> **Merksatz:** 128 Bit sind nicht „doppelt so gut" wie 64 Bit, sondern unvorstellbar viel besser — jedes zusätzliche Bit *verdoppelt* den Aufwand. Genau deshalb ist AES-128 gegen Brute-Force für alle Zeiten sicher, während DES mit 56 Bit (2⁵⁶ ≈ 7 · 10¹⁶) heute in Stunden fällt.

## Aufgabe 4 — Betriebsmodi mit einer 5-Bit-Spielzeugchiffre

Statt AES nimmt das Blatt eine durchschaubare Blockchiffre mit 5-Bit-Blöcken, die nur die Bits *permutiert*:

> e(b1 b2 b3 b4 b5) = (b2 b5 b4 b1 b3)

Das liest du so: an Position 1 kommt b2, an Position 2 das b5, an Position 3 das b4, an Position 4 das b1, an Position 5 das b3. Klartext: x = 01101 11011 11010 00110 (vier Blöcke x1…x4).

### ECB — jeder Block für sich

**ECB** (Electronic Code Book) verschlüsselt jeden Block einzeln, y_i = e(x_i):

| Block | b1 b2 b3 b4 b5 | → (b2 b5 b4 b1 b3) | y_i |
|---|---|---|---|
| x1 = 01101 | 0 1 1 0 1 | 1 1 0 0 1 | **11001** |
| x2 = 11011 | 1 1 0 1 1 | 1 1 1 1 0 | **11110** |
| x3 = 11010 | 1 1 0 1 0 | 1 0 1 1 0 | **10110** |
| x4 = 00110 | 0 0 1 1 0 | 0 0 1 0 1 | **00101** |

ECB-Chiffrat: **y = 11001 11110 10110 00101**.

**Warum ECB gefährlich ist:** gleiche Klartextblöcke ergeben *immer* dasselbe Chiffrat. Verschlüsselt man ein Bild, bleiben große einfarbige Flächen als Muster sichtbar — das berühmte „ECB-Pinguin"-Bild zeigt genau das.

### CBC — jeder Block wird in den nächsten verkettet

**CBC** (Cipher Block Chaining) mischt vor dem Verschlüsseln jeden Block per XOR mit dem *vorherigen Chiffratblock*; für den ersten Block dient der **IV**. Regel: y_i = e(x_i ⊕ y_{i−1}), mit y_0 = IV = 11001.

- y1 = e(x1 ⊕ IV) = e(01101 ⊕ 11001) = e(10100) = **00011**
- y2 = e(x2 ⊕ y1) = e(11011 ⊕ 00011) = e(11000) = **10010**
- y3 = e(x3 ⊕ y2) = e(11010 ⊕ 10010) = e(01000) = **10000**
- y4 = e(x4 ⊕ y3) = e(00110 ⊕ 10000) = e(10110) = **00111**

CBC-Chiffrat: **y = 00011 10010 10000 00111**. Der Effekt: derselbe Klartextblock liefert je nach Vorgeschichte ein *anderes* Chiffrat — die ECB-Muster verschwinden.

### OFB — die Chiffre erzeugt einen Schlüsselstrom

**OFB** (Output Feedback) macht aus der Blockchiffre eine **Stromchiffre**: man erzeugt aus dem IV einen Schlüsselstrom, indem man e(·) immer wieder auf seine eigene Ausgabe anwendet, und XORt diesen Strom auf den Klartext. Schlüsselstrom: s_1 = e(IV), s_i = e(s_{i−1}); Chiffrat: y_i = s_i ⊕ x_i.

- s1 = e(11001) = 11010, s2 = e(11010) = 10110, s3 = e(10110) = 00111, s4 = e(00111) = 01101
- y1 = s1 ⊕ x1 = 11010 ⊕ 01101 = **10111**
- y2 = s2 ⊕ x2 = 10110 ⊕ 11011 = **01101**
- y3 = s3 ⊕ x3 = 00111 ⊕ 11010 = **11101**
- y4 = s4 ⊕ x4 = 01101 ⊕ 00110 = **01011**

OFB-Chiffrat: **y = 10111 01101 11101 01011**. Wichtig: der Schlüsselstrom hängt *nur* vom IV und vom Schlüssel ab, nicht vom Klartext — man könnte ihn sogar im Voraus berechnen.

> **Eselsbrücke:** ECB = jeder Block allein (Muster bleiben). CBC = Chiffrat des Vorgängers wird *vor* die Chiffre per XOR eingespeist. OFB = Chiffre läuft im Kreis und erzeugt einen Schlüsselstrom, der *nach* der Chiffre per XOR auf den Klartext kommt.

## Klausur-Fokus

Drei Fertigkeiten: (1) **Stromchiffre auf Buchstaben** — verschlüsseln (x+s mod 26), entschlüsseln (y−s mod 26), und sauber mod rechnen, wenn beim Subtrahieren etwas Negatives entsteht (+26). (2) **Brute-Force-Abschätzung** — Schlüsselzahl als Zweierpotenz, ASICs aus Budget und Stückkosten (Overhead nicht vergessen!), Rate × Hälfte der Schlüssel, Zeit in Jahren und ins Verhältnis zum Universumsalter setzen. (3) **Betriebsmodi von Hand** — die CBC-Kette (XOR mit vorigem Chiffrat *vor* der Chiffre, erster Block mit IV) und den OFB-Schlüsselstrom (Chiffre läuft im Kreis, XOR *nach* der Chiffre) sauber durchziehen, und in einem Satz sagen, warum ECB Muster durchscheinen lässt.`,
  },
};

const ueb04: Explanation = {
  id: "cs-2026-u04",
  lesson: 5,
  title: {
    de: "Lösungsweg — Übungsblatt 4: RSA von Hand & der Vergleich AES ↔ RSA", en: "Solution — Exercise sheet 4: RSA by hand & the comparison AES ↔ RSA", tr: "Çözüm — Alıştırma Kağıdı 4: Elle RSA ve AES ↔ RSA karşılaştırması", ar: "الحل - ورقة التمرين 4: RSA يدويًا والمقارنة AES ↔ RSA", ru: "Решение. Лист упражнения 4: RSA вручную и сравнение AES ↔ RSA", it: "Soluzione — Foglio di esercizio 4: RSA a mano e confronto AES ↔ RSA", es: "Solución — Hoja de ejercicio 4: RSA a mano y la comparación AES ↔ RSA", fr: "Solution — Fiche d'exercice 4 : RSA à la main & la comparaison AES ↔ RSA", zh: "解决方案 — 练习表 4：手工 RSA 和比较 AES ↔ RSA", pl: "Rozwiązanie — Ćwiczenie 4: RSA ręcznie i porównanie AES ↔ RSA", pt: "Solução - Folha de exercícios 4: RSA manualmente e a comparação AES ↔ RSA", uk: "Рішення — аркуш із вправою 4: RSA вручну та порівняння AES ↔ RSA", fa: "راه حل - برگه تمرین 4: RSA با دست و مقایسه AES ↔ RSA", ja: "解決策 — 演習シート 4: 手動による RSA と AES ↔ RSA の比較", ko: "솔루션 — 연습 시트 4: RSA 직접 작성 및 AES ← RSA 비교", vi: "Giải — Bài tập 4: RSA viết tay & so sánh AES ↔ RSA", hi: "समाधान - अभ्यास शीट 4: हाथ से आरएसए और तुलना एईएस ↔ आरएसए", ur: "حل — ایکسرسائز شیٹ 4: ہاتھ سے RSA اور موازنہ AES ↔ RSA", nl: "Oplossing — Oefenblad 4: RSA met de hand & de vergelijking AES ↔ RSA", el: "Λύση — Φύλλο άσκησης 4: RSA με το χέρι & η σύγκριση AES ↔ RSA", cs: "Řešení — Cvičební list 4: RSA ručně & srovnání AES ↔ RSA", hu: "Megoldás — 4. gyakorlati lap: RSA kézzel és az AES ↔ RSA összehasonlítása", ro: "Soluție — Fișa de exercițiu 4: RSA manual și comparația AES ↔ RSA", sq: "Zgjidhja — Fleta e ushtrimit 4: RSA me dorë dhe krahasimi AES ↔ RSA", sr: "Решење — Лист за вежбу 4: РСА руком и поређење АЕС ↔ РСА", hr: "Rješenje — List za vježbu 4: RSA rukom & usporedba AES ↔ RSA", bg: "Решение — Лист за упражнение 4: RSA на ръка и сравнението AES ↔ RSA", sv: "Lösning — Övningsblad 4: RSA för hand & jämförelsen AES ↔ RSA", fi: "Ratkaisu — Harjoituslomake 4: RSA käsin & vertailu AES ↔ RSA", id: "Solusi — Lembar latihan 4: RSA dengan tangan & perbandingan AES ↔ RSA", th: "วิธีแก้ปัญหา — แบบฝึกหัดที่ 4: RSA ด้วยมือและการเปรียบเทียบ AES ↔ RSA", sw: "Suluhisho — Laha ya 4 ya Zoezi: RSA kwa mkono & kulinganisha AES ↔ RSA",
  },
  content: {
    de: `Dieses Blatt hat noch keine offizielle Musterlösung — der Lösungsweg hier ist deshalb vollständig aus der Aufgabenstellung und der RSA-Vorlesung hergeleitet. Es ist deine erste vollständige RSA-Rechnung von Hand, gefolgt von den großen Vergleichen zwischen symmetrischer und asymmetrischer Kryptografie, die der Professor gern in der Klausur abfragt: Schlüsselanzahl, Performance und die Hybrid-Idee als Auflösung. Wir rechnen alles mit kleinen Zahlen durch.

## Aufgabe 1a — Public-Key und Private-Key zuordnen

Die Schlüsselerzeugung steht in fünf Schritten im Blatt: zwei Primzahlen p, q wählen → N = p·q → Totient T = (p−1)(q−1) → e und d so, dass (e·d) mod T = 1 → **Public-Key (N, e)**, **Private-Key (N, d)**. Verschlüsseln: y = xᵉ mod N. Entschlüsseln: x = yᵈ mod N.

Gegeben sind p = 2, q = 7, N = 14, T = 6, e = 5, d = 11. Also:

- **Public-Key = (N, e) = (14, 5)** — das Paar mit dem öffentlichen Exponenten e zum Verschlüsseln.
- **Private-Key = (N, d) = (14, 11)** — das Paar mit dem geheimen d zum Entschlüsseln.

Kurzprobe, dass die Schlüssel zusammenpassen: e · d = 5 · 11 = 55, und 55 mod 6 = 1. ✓ Genau die Bedingung aus Schritt 4. (Außerdem ist e = 5 teilerfremd zu T = 6 und kleiner als T — alle Hinweise des Blatts erfüllt.)

## Aufgabe 1b — „BCD" verschlüsseln und durch Entschlüsseln prüfen

Erst die Buchstaben in Zahlen (Tabelle 1): B = 1, C = 2, D = 3. Jede Zahl muss kleiner als N = 14 sein — passt. **Verschlüsseln** mit y = x⁵ mod 14:

| Buchstabe | x | x⁵ | mod 14 | Chiffre |
|---|---|---|---|---|
| B | 1 | 1 | 1 | **B (1)** |
| C | 2 | 32 | 4 | **E (4)** |
| D | 3 | 243 | 5 | **F (5)** |

Bei C: 2⁵ = 32, und 32 = 2·14 + 4, also mod 14 = 4 = E. Bei D: 3⁵ = 243 = 17·14 + 5, also mod 14 = 5 = F. Das Chiffrat ist die Zahlenfolge **1, 4, 5** (als Buchstaben BEF).

**Kontrolle durch Entschlüsseln** mit x = y¹¹ mod 14 — kommt wieder BCD heraus? Der Trick beim Potenzieren mod 14 von Hand: nie die Riesenzahl ausrechnen, sondern nach jedem Schritt sofort modulo reduzieren.

- y1 = 1: 1¹¹ mod 14 = 1 = B ✓
- y2 = 4: die Potenzen von 4 mod 14 laufen im Zyklus 4, 2, 8, 4, 2, 8 … (Periode 3); der 11. Wert (11 mod 3 = 2 → zweiter im Zyklus) ist 2 = C ✓
- y3 = 5: die Potenzen von 5 mod 14: 5, 11, 13, 9, 3, 1 (Periode 6); der 11. Wert (11 mod 6 = 5 → fünfter im Zyklus) ist 3 = D ✓

Entschlüsseln liefert wieder **BCD** — die Rechnung ist konsistent.

## Aufgabe 1c — symmetrisch vs. asymmetrisch

| | symmetrisch (z. B. AES) | asymmetrisch (z. B. RSA) |
|---|---|---|
| Schlüssel | *ein* gemeinsamer geheimer Schlüssel | Schlüsselpaar (öffentlich + privat) |
| Tempo | sehr schnell | langsam (100–1000×) |
| Schlüsselverteilung | Problem: jeder Kanal braucht einen eigenen, sicher ausgetauschten Schlüssel | einfach: den öffentlichen Schlüssel darf man frei verteilen |
| Anzahl Schlüssel | wächst quadratisch mit der Teilnehmerzahl | wächst nur linear |
| Signaturen / Nichtabstreitbarkeit | nicht möglich (beide kennen denselben Schlüssel) | möglich (digitale Signatur) |

Kurz: Asymmetrisch löst das *Schlüsselaustauschproblem* und ermöglicht Signaturen, ist aber langsam; symmetrisch ist schnell, hat aber das Verteilungsproblem.

## Aufgabe 1d — Schlüsselanzahl für 120 Mitarbeiter

- **Nur AES (symmetrisch):** Jedes *Paar* von Personen braucht einen eigenen gemeinsamen Schlüssel. Anzahl Paare = n·(n−1)/2 = 120·119/2 = **7140 Schlüssel**.
- **Nur RSA (asymmetrisch):** Jede Person hat *ein* Schlüsselpaar, dessen öffentlichen Teil sie mit allen teilt — also nur **120 Schlüsselpaare**.

Das ist der Skalierungsvorteil asymmetrischer Verfahren: linear statt quadratisch. Bei 120 Personen schon ein Faktor ~60, bei 10 000 Personen wären es ~50 Mio. gegen 10 000.

## Aufgabe 1e — 1-GB-Video entschlüsseln

1 GB = 8 · 10⁹ Bit.

- **RSA** bei 100 kbit/s = 10⁵ Bit/s: 8 · 10⁹ / 10⁵ = 8 · 10⁴ s = 80 000 s ≈ **22,2 Stunden**.
- **AES** bei 17 Mbit/s = 1,7 · 10⁷ Bit/s: 8 · 10⁹ / 1,7 · 10⁷ ≈ 471 s ≈ **7 min 51 s**.

Der Unterschied ist gewaltig — über 22 Stunden gegen unter 8 Minuten für dieselben Daten.

## Aufgabe 1f — woher der Unterschied, und wie kombiniert man die Vorteile?

RSA rechnet teure modulare Potenzen mit riesigen Zahlen (Hunderte bis Tausende Bit); AES macht nur billige Bit-Operationen (Substitution, Permutation, XOR auf 128 Bit) — daher der gewaltige Tempo-Unterschied. Die Lösung ist die **Hybridverschlüsselung**: Man benutzt das langsame asymmetrische Verfahren *nur*, um einen zufälligen symmetrischen Sitzungsschlüssel sicher auszutauschen, und verschlüsselt die eigentlichen Daten dann schnell mit AES. Genau so arbeitet **TLS** hinter jedem „https" — es verbindet RSAs einfache Schlüsselverteilung mit AES' Geschwindigkeit.

> **Eselsbrücke:** „Asymmetrisch fürs Schloss, symmetrisch für die Last." RSA tauscht nur den Schlüssel, AES trägt die Daten.

## Aufgabe 2 — GPG in der Praxis (Bonus)

Die Bonusaufgabe ist praktisch und braucht keinen Rechenweg: Du installierst GPG (unter Windows GPG4Win), erzeugst ein **RSA-Schlüsselpaar mit mindestens 2048 Bit**, tauschst mit einer Partnerin die *öffentlichen* Schlüssel aus (per Mail oder USB-Stick — der öffentliche Teil darf ruhig über unsichere Kanäle), importierst ihren öffentlichen Schlüssel, verschlüsselst eine Datei damit und schickst sie übers Internet; die Partnerin entschlüsselt mit ihrem privaten Schlüssel. Das ist exakt das Briefkasten-Prinzip aus der Vorlesung in echter Software: verschlüsseln mit dem *öffentlichen* Schlüssel des Empfängers, entschlüsseln nur mit dessen *privatem*.

## Klausur-Fokus

Drei Blöcke: (1) **RSA rechnen** — Schlüsselpaar zuordnen (Public hat e, Private hat d), die Konsistenz e·d ≡ 1 (mod T) prüfen, dann x^e mod N verschlüsseln und y^d mod N entschlüsseln, dabei immer *früh* modulo reduzieren (oder den Zyklus der Potenzen nutzen). (2) **Die großen Vergleiche** — Schlüsselanzahl n(n−1)/2 (symmetrisch) gegen n Paare (asymmetrisch), die Performance-Rechnung (Datenmenge ÷ Rate) und das Tempo-Argument. (3) **Die Hybrid-Idee** als Auflösung des Dilemmas, plus die Vor-/Nachteile-Tabelle sicher im Kopf. Beachte: x muss kleiner als N sein, und e muss teilerfremd zu T gewählt werden, sonst existiert kein passendes d.`,
  },
};

export function buildCybersicherheit2026UebungWalkthroughs(): Explanation[] {
  return [ueb01, ueb02, ueb02_2, ueb03, ueb04];
}
