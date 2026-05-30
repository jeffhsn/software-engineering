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
    de: "Lösungsweg — Grundlagenübung: Modulo- und Binärrechnung", en: "Solution — basic exercise: modulo and binary calculation", tr: "Çözüm — temel alıştırma: modülo ve ikili hesaplama", ar: "الحل - التمرين الأساسي: الحساب المعياري والثنائي", ru: "Решение — базовое упражнение: расчет по модулю и двоичный код", it: "Soluzione — esercizio base: modulo e calcolo binario", es: "Solución - ejercicio básico: cálculo de módulo y binario", fr: "Solution — exercice de base : calcul modulo et binaire", zh: "解决方案 — 基本练习：模数和二进制计算", pl: "Rozwiązanie — ćwiczenie podstawowe: obliczenia modulo i binarne", pt: "Solução — exercício básico: módulo e cálculo binário", uk: "Розв’язання — базова вправа: обчислення по модулю та двійкове", fa: "راه حل - تمرین اساسی: محاسبه مدول و باینری", ja: "解決策 — 基本的な演習: モジュロとバイナリの計算", ko: "솔루션 — 기본 연습: 모듈로 및 이진 계산", vi: "Giải pháp - bài tập cơ bản: tính toán modulo và nhị phân", hi: "समाधान - बुनियादी अभ्यास: मॉड्यूलो और बाइनरी गणना", ur: "حل - بنیادی مشق: ماڈیولو اور بائنری کیلکولیشن", nl: "Oplossing — basisoefening: modulo- en binaire berekening", el: "Λύση — βασική άσκηση: modulo και δυαδικός υπολογισμός", cs: "Řešení — základní cvičení: modulový a binární výpočet", hu: "Megoldás — alapgyakorlat: modulo és bináris számítás", ro: "Rezolvare — exercițiu de bază: calcul modulo și binar", sq: "Zgjidhja — ushtrimi bazë: llogaritja modulore dhe binare", sr: "Решење — основна вежба: модуло и бинарно рачунање", hr: "Rješenje — osnovna vježba: modulsko i binarno računanje", bg: "Решение — основно упражнение: модулно и двоично пресмятане", sv: "Lösning — grundläggande övning: modulo och binär beräkning", fi: "Ratkaisu – perusharjoitus: modulo ja binäärilaskenta", id: "Solusi - latihan dasar: perhitungan modulo dan biner", th: "วิธีแก้ปัญหา — แบบฝึกหัดพื้นฐาน: การคำนวณแบบโมดูโลและไบนารี", sw: "Suluhisho - zoezi la msingi: hesabu ya modulo na binary",
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
    de: "Lösungsweg — Übungsblatt 1: Klassische Kryptografie (Caesar, Transposition, Vigenère)", en: "Solution — Exercise Sheet 1: Classical Cryptography (Caesar, Transposition, Vigenère)", tr: "Çözüm - Alıştırma Kağıdı 1: Klasik Kriptografi (Caesar, Transpozisyon, Vigenère)", ar: "الحل - ورقة التمرين 1: التشفير الكلاسيكي (Caesar، Transposition، Vigenère)", ru: "Решение — Лист упражнения 1: Классическая криптография (Цезарь, транспонирование, Виженер)", it: "Soluzione — Scheda di esercizio 1: Crittografia classica (Cesare, Trasposizione, Vigenère)", es: "Solución: Hoja de ejercicio 1: Criptografía clásica (César, Transposición, Vigenère)", fr: "Solution — Fiche d'exercice 1 : Cryptographie classique (César, Transposition, Vigenère)", zh: "解决方案 — 练习表 1：经典密码学（凯撒密码学、转置密码学、维吉尼亚密码学）", pl: "Rozwiązanie — Arkusz ćwiczenia 1: Kryptografia klasyczna (Cezar, Transpozycja, Vigenère)", pt: "Solução - Folha de Exercícios 1: Criptografia Clássica (César, Transposição, Vigenère)", uk: "Рішення — аркуш із вправою 1: класична криптографія (Цезар, транспозиція, Віженер)", fa: "راه حل - برگه تمرین 1: رمزنگاری کلاسیک (سزار، جابجایی، ویژنر)", ja: "解決策 — 演習シート 1: 古典的な暗号 (シーザー、転置、ヴィジェネール)", ko: "솔루션 — 연습 시트 1: 고전 암호화(Caesar, Transposition, Vigenère)", vi: "Giải pháp - Bảng bài tập 1: Mật mã cổ điển (Caesar, Chuyển vị, Vigenère)", hi: "समाधान - अभ्यास शीट 1: शास्त्रीय क्रिप्टोग्राफी (सीज़र, ट्रांसपोज़िशन, विगेनियर)", ur: "حل - مشق شیٹ 1: کلاسیکی خفیہ نگاری (سیزر، ٹرانسپوزیشن، ویگنیر)", nl: "Oplossing — Oefenblad 1: Klassieke cryptografie (Caesar, Transpositie, Vigenère)", el: "Λύση — Φύλλο Άσκησης 1: Κλασική Κρυπτογραφία (Caesar, Transposition, Vigenère)", cs: "Řešení — Cvičební list 1: Klasická kryptografie (Caesar, Transpozice, Vigenère)", hu: "Megoldás – 1. feladatlap: Klasszikus kriptográfia (Caesar, Transposition, Vigenère)", ro: "Soluție — Fișa de exercițiu 1: Criptografie clasică (Caesar, Transposition, Vigenère)", sq: "Zgjidhja — Fleta e ushtrimit 1: Kriptografia klasike (Cezar, Transposition, Vigenère)", sr: "Решење — Табела за вежбу 1: Класична криптографија (Цезар, Транспозиција, Виженер)", hr: "Rješenje — list za vježbu 1: Klasična kriptografija (Caesar, Transpozicija, Vigenère)", bg: "Решение — лист за упражнение 1: Класическа криптография (Цезар, транспониране, Виженер)", sv: "Lösning — Övningsblad 1: Klassisk kryptografi (Caesar, Transposition, Vigenère)", fi: "Ratkaisu – Harjoitustaulukko 1: Klassinen kryptografia (Caesar, Transpositio, Vigenère)", id: "Solusi — Lembar Latihan 1: Kriptografi Klasik (Caesar, Transposisi, Vigenère)", th: "แนวทางแก้ไข — เอกสารแบบฝึกหัดที่ 1: วิทยาการเข้ารหัสลับแบบคลาสสิก (ซีซาร์ การขนย้าย Vigenère)", sw: "Suluhisho - Jedwali la 1 la Zoezi: Siri za Kawaida (Kaisari, Ubadilishaji, Vigenère)",
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
    de: "Lösungsweg — Übungsblatt 3: Betriebsmodi (ECB/CBC/OFB) & RSA", en: "Solution — Exercise sheet 3: Operating modes (ECB/CBC/OFB) & RSA", tr: "Çözüm — Alıştırma sayfası 3: Çalışma modları (ECB/CBC/OFB) ve RSA", ar: "الحل — ورقة التمرين 3: أوضاع التشغيل (ECB/CBC/OFB) وRSA", ru: "Решение — Таблица упражнений 3: Режимы работы (ECB/CBC/OFB) и RSA", it: "Soluzione — Scheda di esercizio 3: Modalità operative (BCE/CBC/OFB) e RSA", es: "Solución: Hoja de ejercicio 3: Modos de funcionamiento (ECB/CBC/OFB) y RSA", fr: "Solution — Fiche d'exercice 3 : Modes de fonctionnement (ECB/CBC/OFB) & RSA", zh: "解决方案 — 练习表 3：操作模式 (ECB/CBC/OFB) 和 RSA", pl: "Rozwiązanie — arkusz ćwiczeń 3: Tryby operacyjne (ECB/CBC/OFB) i RSA", pt: "Solução — Folha de exercícios 3: Modos de operação (ECB/CBC/OFB) e RSA", uk: "Розв’язання — Завдання 3: Режими роботи (ECB/CBC/OFB) і RSA", fa: "راه حل - برگه تمرین 3: حالت های عملیاتی (ECB/CBC/OFB) و RSA", ja: "解決策 - 演習シート 3: 動作モード (ECB/CBC/OFB) および RSA", ko: "솔루션 — 연습 시트 3: 작동 모드(ECB/CBC/OFB) 및 RSA", vi: "Giải pháp — Bảng bài tập 3: Các chế độ vận hành (ECB/CBC/OFB) & RSA", hi: "समाधान - अभ्यास शीट 3: ऑपरेटिंग मोड (ईसीबी/सीबीसी/ओएफबी) और आरएसए", ur: "حل — ورزش شیٹ 3: آپریٹنگ موڈز (ECB/CBC/OFB) اور RSA", nl: "Oplossing — Oefenblad 3: Bedrijfsmodi (ECB/CBC/OFB) en RSA", el: "Λύση — Φύλλο άσκησης 3: Τρόποι λειτουργίας (ECB/CBC/OFB) & RSA", cs: "Řešení — Cvičební list 3: Provozní režimy (ECB/CBC/OFB) & RSA", hu: "Megoldás — 3. gyakorlati lap: Üzemmódok (ECB/CBC/OFB) és RSA", ro: "Soluție — Fișa de exercițiu 3: Moduri de funcționare (ECB/CBC/OFB) și RSA", sq: "Zgjidhja — Fleta e ushtrimeve 3: Mënyrat e funksionimit (ECB/CBC/OFB) & RSA", sr: "Решење — Лист за вежбу 3: Радни режими (ЕЦБ/ЦБЦ/ОФБ) & РСА", hr: "Rješenje — Vježba 3: Načini rada (ECB/CBC/OFB) & RSA", bg: "Решение — Лист за упражнение 3: Режими на работа (ECB/CBC/OFB) & RSA", sv: "Lösning — Övningsblad 3: Driftlägen (ECB/CBC/OFB) & RSA", fi: "Ratkaisu — Harjoituslomake 3: Toimintatilat (ECB/CBC/OFB) & RSA", id: "Solusi — Lembar latihan 3: Mode pengoperasian (ECB/CBC/OFB) & RSA", th: "แนวทางแก้ไข — เอกสารแบบฝึกหัดที่ 3: โหมดการทำงาน (ECB/CBC/OFB) และ RSA", sw: "Suluhisho — Laha ya 3 ya Zoezi: Njia za Uendeshaji (ECB/CBC/OFB) & RSA",
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
    de: "Lösungsweg — Übungsblatt 4: Wiederholung (Kerckhoffs, AES-Brute-Force, Stromchiffre, S-Box-Angriff)", en: "Solution - Exercise sheet 4: Repetition (Kerckhoffs, AES brute force, stream cipher, S-box attack)", tr: "Çözüm - Alıştırma Kağıdı 4: Tekrarlama (Kerckhoffs, AES kaba kuvvet, akış şifresi, S-box saldırısı)", ar: "الحل - ورقة التمرين 4: التكرار (Kerckhoffs، القوة الغاشمة AES، تشفير التدفق، هجوم S-box)", ru: "Решение. Лист упражнения 4. Повторение (Керкхоффс, перебор AES, потоковое шифрование, атака S-box)", it: "Soluzione - Foglio di esercizio 4: Ripetizione (Kerckhoffs, AES brute force, stream cipher, attacco S-box)", es: "Solución - Hoja de ejercicio 4: Repetición (Kerckhoffs, fuerza bruta AES, cifrado de flujo, ataque S-box)", fr: "Solution - Fiche d'exercice 4 : Répétition (Kerckhoffs, force brute AES, chiffrement par flux, attaque S-box)", zh: "解决方案 - 练习表 4：重复（Kerckhoffs、AES 暴力破解、流密码、S-box 攻击）", pl: "Rozwiązanie - Arkusz ćwiczenia 4: Powtórzenie (Kerckhoffs, brutalna siła AES, szyfr strumieniowy, atak S-box)", pt: "Solução - Folha de exercícios 4: Repetição (Kerckhoffs, força bruta AES, cifra de fluxo, ataque S-box)", uk: "Розв’язання – Аркуш із вправою 4: Повторення (Керкгоффс, груба сила AES, потоковий шифр, атака S-box)", fa: "راه حل - برگه تمرین 4: تکرار (Kerckhoffs، AES brute force، استریم رمز، حمله S-box)", ja: "解決策 - 演習シート 4: 反復 (ケルクホフス、AES ブルート フォース、ストリーム暗号、S-box 攻撃)", ko: "솔루션 - 연습 시트 4: 반복(Kerckhoffs, AES 무차별 대입, 스트림 암호, S-box 공격)", vi: "Giải pháp - Bài tập 4: Lặp lại (Kerckhoffs, AES brute Force, Stream cipher, S-box attack)", hi: "समाधान - अभ्यास शीट 4: दोहराव (केरखॉफ्स, एईएस जानवर बल, स्ट्रीम सिफर, एस-बॉक्स हमला)", ur: "حل - ایکسرسائز شیٹ 4: تکرار (کیرکہفس، اے ای ایس بروٹ فورس، اسٹریم سائفر، ایس باکس اٹیک)", nl: "Oplossing - Oefenblad 4: Herhaling (Kerckhoffs, AES brute force, stream cipher, S-box aanval)", el: "Λύση - Φύλλο άσκησης 4: Επανάληψη (Kerckhoffs, AES brute force, stream cipher, S-box επίθεση)", cs: "Řešení - Cvičební list 4: Opakování (Kerckhoffs, hrubá síla AES, proudová šifra, útok S-boxem)", hu: "Megoldás – 4. gyakorlatlap: Ismétlés (Kerckhoffs, AES brute force, stream cipher, S-box támadás)", ro: "Soluție - Fișa de exercițiu 4: Repetiție (Kerckhoffs, AES brute force, stream cipher, S-box attack)", sq: "Zgjidhja - Fleta e ushtrimit 4: Përsëritje (Kerckhoffs, forca brutale AES, shifra e transmetimit, sulmi i S-box)", sr: "Решење – Вежба лист 4: Понављање (Керцкхоффс, АЕС груба сила, стреам шифра, С-бок напад)", hr: "Rješenje - list za vježbu 4: Ponavljanje (Kerckhoffs, AES brute force, stream šifra, S-box napad)", bg: "Решение – лист за упражнение 4: Повторение (Kerckhoffs, груба сила на AES, поточен шифър, S-box атака)", sv: "Lösning - Övningsblad 4: Upprepning (Kerckhoffs, AES brute force, strömchiffer, S-box attack)", fi: "Ratkaisu - Harjoitustaulukko 4: Toisto (Kerckhoffs, AES brute force, stream crypt, S-box hyökkäys)", id: "Solusi - Lembar latihan 4: Pengulangan (Kerckhoffs, brute force AES, stream cipher, serangan S-box)", th: "วิธีแก้ปัญหา - แบบฝึกหัดที่ 4: การทำซ้ำ (Kerckhoffs, AES bruteforce, stream cipher, การโจมตี S-box)", sw: "Suluhisho - Karatasi ya Zoezi la 4: Kurudia (Kerckhoffs, AES brute force, cipher mkondo, shambulio la S-box)",
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
    de: "Lösungsweg — Übungsblatt 5: RSA vervollständigen, Signaturen & Hash-Signaturen", en: "Solution — Exercise Sheet 5: Complete RSA, Signatures & Hash Signatures", tr: "Çözüm - Alıştırma Sayfası 5: RSA'yı, İmzaları ve Karma İmzaları Tamamlayın", ar: "الحل - ورقة التمرين 5: أكمل RSA والتوقيعات وتوقيعات التجزئة", ru: "Решение — Лист упражнения 5: Полный RSA, подписи и хэш-подписи", it: "Soluzione: foglio di esercizio 5: completare RSA, firme e firme hash", es: "Solución: Hoja de ejercicio 5: RSA completo, firmas y firmas hash", fr: "Solution — Feuille d'exercice 5 : RSA complet, signatures et signatures de hachage", zh: "解决方案 — 练习表 5：完整的 RSA、签名和哈希签名", pl: "Rozwiązanie — Arkusz ćwiczeń 5: Wypełnij RSA, podpisy i podpisy mieszające", pt: "Solução - Folha de exercícios 5: RSA completo, assinaturas e assinaturas hash", uk: "Рішення — Аркуш вправи 5: Повний RSA, підписи та хеш-підписи", fa: "راه حل - برگه تمرین 5: RSA کامل، امضاها و امضاهای هش", ja: "解決策 - 演習シート 5: 完全な RSA、署名、およびハッシュ署名", ko: "솔루션 — 연습 시트 5: 완전한 RSA, 서명 및 해시 서명", vi: "Giải pháp - Bảng bài tập 5: RSA hoàn chỉnh, Chữ ký & Chữ ký băm", hi: "समाधान - अभ्यास शीट 5: पूर्ण आरएसए, हस्ताक्षर और हैश हस्ताक्षर", ur: "حل — ورزش شیٹ 5: مکمل RSA، دستخط اور ہیش دستخط", nl: "Oplossing – Oefenblad 5: Voltooi RSA, handtekeningen en hash-handtekeningen", el: "Λύση — Φύλλο άσκησης 5: Πλήρης RSA, υπογραφές & υπογραφές κατακερματισμού", cs: "Řešení — Cvičební list 5: Kompletní RSA, podpisy a hash podpisy", hu: "Megoldás — 5. gyakorlat: RSA teljes kitöltése, aláírások és kivonatoló aláírások", ro: "Soluție — Fișa de exercițiu 5: Completați RSA, semnături și semnături hash", sq: "Zgjidhja — Fleta e Ushtrimit 5: Plotësoni RSA, Nënshkrimet & Nënshkrimet Hash", sr: "Решење — Табела за вежбу 5: Попуните РСА, потписе и хеш потписе", hr: "Rješenje — List za vježbu 5: Kompletan RSA, potpisi i raspršeni potpisi", bg: "Решение — лист за упражнение 5: Пълен RSA, подписи и хеш подписи", sv: "Lösning — Övningsblad 5: Fyll i RSA, signaturer och hashsignaturer", fi: "Ratkaisu — Harjoitustaulukko 5: Täydellinen RSA, allekirjoitukset ja hajautusallekirjoitukset", id: "Solusi — Lembar Latihan 5: Lengkapi RSA, Tanda Tangan & Tanda Tangan Hash", th: "แนวทางแก้ไข — เอกสารแบบฝึกหัดที่ 5: ทำ RSA ลายเซ็น และลายเซ็นแฮชให้สมบูรณ์", sw: "Suluhisho — Laha ya Mazoezi ya 5: Kamilisha RSA, Sahihi & Sahihi za Hash",
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
    de: "Lösungsweg — Übungsblatt 6: Hash-Tabellen, Kollisionswahrscheinlichkeit & Passwort-Hashing", en: "Solution — Exercise Sheet 6: Hash Tables, Collision Probability & Password Hashing", tr: "Çözüm - Alıştırma Kağıdı 6: Karma Tablolar, Çarpışma Olasılığı ve Parola Karma", ar: "الحل - ورقة التمرين 6: جداول التجزئة، واحتمالية التصادم، وتجزئة كلمة المرور", ru: "Решение — Лист упражнения 6: хеш-таблицы, вероятность конфликта и хеширование паролей", it: "Soluzione: foglio di esercizio 6: tabelle hash, probabilità di collisione e hashing delle password", es: "Solución: Hoja de ejercicio 6: tablas hash, probabilidad de colisión y hash de contraseñas", fr: "Solution — Feuille d'exercice 6 : Tables de hachage, probabilité de collision et hachage de mot de passe", zh: "解决方案 — 练习表 6：哈希表、冲突概率和密码哈希", pl: "Rozwiązanie — Arkusz ćwiczeń 6: Tabele skrótów, prawdopodobieństwo kolizji i mieszanie haseł", pt: "Solução - Folha de exercícios 6: tabelas hash, probabilidade de colisão e hash de senha", uk: "Рішення — Аркуш із вправою 6: Хеш-таблиці, ймовірність зіткнень і хешування паролів", fa: "راه حل - برگه تمرین 6: جداول هش، احتمال برخورد و درهم سازی رمز عبور", ja: "解決策 — 演習シート 6: ハッシュ テーブル、衝突確率、パスワード ハッシュ", ko: "솔루션 — 연습 시트 6: 해시 테이블, 충돌 확률 및 비밀번호 해싱", vi: "Giải pháp — Bảng bài tập 6: Bảng băm, Xác suất xung đột & Băm mật khẩu", hi: "समाधान - अभ्यास शीट 6: हैश टेबल्स, टकराव की संभावना और पासवर्ड हैशिंग", ur: "حل - مشق شیٹ 6: ہیش ٹیبلز، تصادم کا امکان اور پاس ورڈ ہیشنگ", nl: "Oplossing – Oefenblad 6: Hashtabellen, kans op botsingen en wachtwoordhashing", el: "Λύση — Φύλλο άσκησης 6: Πίνακες κατακερματισμού, πιθανότητα σύγκρουσης και κατακερματισμός κωδικού πρόσβασης", cs: "Řešení — Cvičební list 6: Hašovací tabulky, pravděpodobnost kolize a hašování hesel", hu: "Megoldás – 6. gyakorlat: Kivonattáblázatok, ütközési valószínűség és jelszókivonat", ro: "Soluție — Fișa de exercițiu 6: Tabele de hash, probabilitatea de coliziune și hashing parole", sq: "Zgjidhja — Fleta e Ushtrimit 6: Tabelat Hash, Probabiliteti i Përplasjes dhe Hashimi i Fjalëkalimit", sr: "Решење — Табела за вежбу 6: Хеш табеле, вероватноћа колизије и хеширање лозинке", hr: "Rješenje — List za vježbu 6: Hash tablice, vjerojatnost kolizije i raspršivanje lozinki", bg: "Решение — Упражнение Лист 6: Хеш таблици, вероятност за сблъсък и хеширане на пароли", sv: "Lösning — Övningsblad 6: Hash-tabeller, kollisionssannolikhet och lösenordshashning", fi: "Ratkaisu — Harjoitustaulukko 6: Hash-taulukot, törmäystodennäköisyys ja salasanan hajautus", id: "Solusi — Lembar Latihan 6: Tabel Hash, Probabilitas Tabrakan & Hashing Kata Sandi", th: "แนวทางแก้ไข — เอกสารแบบฝึกหัดที่ 6: ตารางแฮช ความน่าจะเป็นของการชนกัน และการแฮชรหัสผ่าน", sw: "Suluhisho — Laha ya 6 ya Zoezi: Majedwali ya Hashi, Uwezekano wa Mgongano na Hashing Nenosiri",
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
    de: "Lösungsweg — Übungsblatt 7: Rainbow-Tables, Bitcoin & einen Block selbst minen", en: "Solution — Exercise sheet 7: Rainbow tables, Bitcoin & mining a block yourself", tr: "Çözüm — Alıştırma Kağıdı 7: Rainbow tabloları, Bitcoin ve kendi başınıza blok madenciliği", ar: "الحل - ورقة التمرين 7: جداول قوس قزح، والبيتكوين، وتعدين الكتلة بنفسك", ru: "Решение — Лист упражнения 7: Радужные таблицы, биткойны и майнинг блока самостоятельно", it: "Soluzione: foglio di esercizio 7: tabelle arcobaleno, Bitcoin e mining di un blocco da soli", es: "Solución: Hoja de ejercicio 7: tablas Rainbow, Bitcoin y extraer un bloque usted mismo", fr: "Solution — Feuille d'exercice 7 : Tables arc-en-ciel, Bitcoin et minage d'un bloc vous-même", zh: "解决方案 — 练习表 7：彩虹表、比特币和自己开采区块", pl: "Rozwiązanie — Arkusz ćwiczeń 7: Tabele Rainbow, Bitcoin i samodzielne wydobywanie bloku", pt: "Solução - Folha de exercícios 7: tabelas Rainbow, Bitcoin e mineração de um bloco você mesmo", uk: "Рішення — аркуш із вправою 7: веселкові таблиці, біткойн і самостійне майнінг блоку", fa: "راه حل - برگه تمرین 7: جداول رنگین کمان، بیت کوین و استخراج یک بلوک توسط خودتان", ja: "解決策 — 演習シート 7: レインボー テーブル、ビットコイン、自分でブロックをマイニングする", ko: "솔루션 — 연습 시트 7: 레인보우 테이블, 비트코인 ​​및 직접 블록 채굴", vi: "Giải pháp — Bảng bài tập 7: Bảng cầu vồng, Bitcoin & tự khai thác khối", hi: "समाधान - अभ्यास शीट 7: रेनबो टेबल, बिटकॉइन और स्वयं एक ब्लॉक खनन करना", ur: "حل - ورزشی شیٹ 7: رینبو ٹیبلز، بٹ کوائن اور بلاک کی کان کنی خود کریں", nl: "Oplossing – Oefenblad 7: Rainbow-tabellen, Bitcoin en zelf een blok minen", el: "Λύση — Φύλλο άσκησης 7: Πίνακες Rainbow, Bitcoin & εξόρυξη μπλοκ μόνοι σας", cs: "Řešení — Cvičební list 7: Rainbow tables, bitcoin & těžba bloku sami", hu: "Megoldás — 7. gyakorlat: Rainbow asztalok, Bitcoin és saját maga bányászjon ki egy blokkot", ro: "Soluție — Fișa de exercițiu 7: Tabelele curcubeu, Bitcoin și extragerea unui bloc singur", sq: "Zgjidhja — Fleta e ushtrimit 7: Tabelat Rainbow, Bitcoin dhe nxjerrja e një blloku vetë", sr: "Решење — Лист за вежбу 7: Раинбов табеле, Битцоин и сами рударите блок", hr: "Rješenje — List za vježbu 7: Rainbow tablice, Bitcoin i sami rudarite blok", bg: "Решение — Упражнение лист 7: Rainbow таблици, биткойни и копаене на блок сами", sv: "Lösning — Övningsblad 7: Regnbågstabeller, Bitcoin & mining ett block själv", fi: "Ratkaisu — Harjoitustaulukko 7: Rainbow-pöydät, Bitcoin ja louhi lohko itse", id: "Solusi — Lembar latihan 7: Tabel pelangi, Bitcoin & menambang sendiri satu blok", th: "แนวทางแก้ไข — แบบฝึกหัดที่ 7: โต๊ะสายรุ้ง Bitcoin และการขุดบล็อกด้วยตัวเอง", sw: "Suluhisho - Karatasi ya Zoezi la 7: Meza za upinde wa mvua, Bitcoin & uchimbaji wa madini mwenyewe",
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
    de: "Lösungsweg — Übungsblatt 8: Diffie-Hellman-Schlüsselaustausch, X.509 & Vertrauensmodelle", en: "Solution — Exercise Sheet 8: Diffie-Hellman Key Exchange, X.509 & Trust Models", tr: "Çözüm — Alıştırma Kağıdı 8: Diffie-Hellman Anahtar Değişimi, X.509 ve Güven Modelleri", ar: "الحل - ورقة التمرين 8: نماذج Diffie-Hellman Key Exchange وX.509 وTrust", ru: "Решение — Лист упражнения 8: обмен ключами Диффи-Хеллмана, X.509 и модели доверия", it: "Soluzione: foglio di esercizi 8: scambio di chiavi Diffie-Hellman, X.509 e modelli di fiducia", es: "Solución: Hoja de ejercicio 8: Intercambio de claves Diffie-Hellman, X.509 y modelos de confianza", fr: "Solution — Feuille d'exercice 8 : Échange de clés Diffie-Hellman, X.509 et modèles de confiance", zh: "解决方案 — 练习表 8：Diffie-Hellman 密钥交换、X.509 和信任模型", pl: "Rozwiązanie — Arkusz ćwiczeń 8: Wymiana kluczy Diffiego-Hellmana, X.509 i modele zaufania", pt: "Solução - Folha de exercícios 8: Diffie-Hellman Key Exchange, X.509 e modelos de confiança", uk: "Рішення — Аркуш із завданням 8: Обмін ключами Діффі-Хеллмана, X.509 і моделі довіри", fa: "راه حل — برگه تمرین 8: تبادل کلید دیفی-هلمن، مدل های X.509 و اعتماد", ja: "ソリューション — 演習シート 8: Diffie-Hellman 鍵交換、X.509、および信頼モデル", ko: "솔루션 — 연습 시트 8: Diffie-Hellman 키 교환, X.509 및 신뢰 모델", vi: "Giải pháp — Bảng bài tập 8: Trao đổi khóa Diffie-Hellman, X.509 & Trust Models", hi: "समाधान - अभ्यास शीट 8: डिफी-हेलमैन कुंजी एक्सचेंज, एक्स.509 और ट्रस्ट मॉडल", ur: "حل — ایکسرسائز شیٹ 8: Diffie-Hellman Key Exchange, X.509 اور ٹرسٹ ماڈلز", nl: "Oplossing – Oefenblad 8: Diffie-Hellman Key Exchange-, X.509- en Trust-modellen", el: "Λύση — Φύλλο άσκησης 8: Diffie-Hellman Key Exchange, X.509 & Trust Models", cs: "Řešení — Cvičební list 8: Diffie-Hellman Key Exchange, X.509 & Trust Models", hu: "Megoldás – 8. gyakorlat: Diffie-Hellman kulcscsere, X.509 és Trust Models", ro: "Soluție — Fișa de exercițiu 8: Schimb de chei Diffie-Hellman, modele X.509 și Trust", sq: "Zgjidhja — Fleta e ushtrimeve 8: Diffie-Hellman Key Exchange, X.509 & Trust Models", sr: "Решење — Табела за вежбу 8: Размена кључева Диффие-Хеллман, Кс.509 и модели поверења", hr: "Rješenje — Vježba 8: Diffie-Hellman Key Exchange, X.509 i modeli povjerenja", bg: "Решение — Упражнение лист 8: Размяна на ключове на Diffie-Hellman, X.509 и модели на доверие", sv: "Lösning — Övningsblad 8: Diffie-Hellman Key Exchange, X.509 & Trust Models", fi: "Ratkaisu — Harjoitustaulukko 8: Diffie-Hellman Key Exchange, X.509 & Trust Models", id: "Solusi — Lembar Latihan 8: Pertukaran Kunci Diffie-Hellman, X.509 & Model Kepercayaan", th: "แนวทางแก้ไข — เอกสารแบบฝึกหัดที่ 8: การแลกเปลี่ยนคีย์ Diffie-Hellman, X.509 และโมเดลความน่าเชื่อถือ", sw: "Suluhisho — Laha ya 8 ya Mazoezi: Diffie-Hellman Key Exchange, X.509 & Miundo ya Kuaminika",
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
    de: "Lösungsweg — Übungsblatt 9: XSS, SQL-Injection, DoS/DDoS & Botnetze", en: "Solution — Exercise Sheet 9: XSS, SQL Injection, DoS/DDoS & Botnets", tr: "Çözüm - Alıştırma Kağıdı 9: XSS, SQL Enjeksiyonu, DoS/DDoS ve Botnet'ler", ar: "الحل - ورقة التمرين 9: XSS، وحقن SQL، وDoS/DDoS، وشبكات الروبوت", ru: "Решение — Упражнение 9: XSS, SQL-инъекция, DoS/DDoS и ботнеты", it: "Soluzione: foglio di esercizi 9: XSS, SQL Injection, DoS/DDoS e botnet", es: "Solución: Hoja de ejercicio 9: XSS, inyección SQL, DoS/DDoS y Botnets", fr: "Solution — Feuille d'exercice 9 : XSS, injection SQL, DoS/DDoS et botnets", zh: "解决方案 — 练习表 9：XSS、SQL 注入、DoS/DDoS 和僵尸网络", pl: "Rozwiązanie — Arkusz ćwiczeń 9: XSS, SQL Injection, DoS/DDoS i botnety", pt: "Solução - Folha de exercícios 9: XSS, injeção de SQL, DoS/DDoS e botnets", uk: "Рішення — аркуш із вправами 9: XSS, впровадження SQL, DoS/DDoS і ботнети", fa: "راه حل - برگه تمرین 9: XSS، SQL Injection، DoS/DDoS و Botnets", ja: "ソリューション — 演習シート 9: XSS、SQL インジェクション、DoS/DDoS、ボットネット", ko: "솔루션 — 연습 시트 9: XSS, SQL 주입, DoS/DDoS 및 봇넷", vi: "Giải pháp — Bảng bài tập 9: XSS, SQL Insert, DoS/DDoS & Botnet", hi: "समाधान - अभ्यास शीट 9: एक्सएसएस, एसक्यूएल इंजेक्शन, डीओएस/डीडीओएस और बॉटनेट", ur: "حل — ایکسرسائز شیٹ 9: XSS، SQL انجکشن، DoS/DDoS اور Botnets", nl: "Oplossing — Oefenblad 9: XSS, SQL-injectie, DoS/DDoS en botnets", el: "Λύση — Φύλλο άσκησης 9: XSS, SQL Injection, DoS/DDoS & Botnets", cs: "Řešení — Cvičební list 9: XSS, SQL Injection, DoS/DDoS a botnety", hu: "Megoldás – 9. gyakorlati lap: XSS, SQL Injection, DoS/DDoS és botnetek", ro: "Soluție — Fișa de exercițiu 9: XSS, injecție SQL, DoS/DDoS și rețele bot", sq: "Zgjidhja — Fleta e ushtrimeve 9: XSS, SQL Injection, DoS/DDoS & Botnets", sr: "Решење — Табела за вежбу 9: КССС, СКЛ ињекција, ДоС/ДДоС и ботнети", hr: "Rješenje — Vježba 9: XSS, SQL Injection, DoS/DDoS & Botneti", bg: "Решение — Упражнение лист 9: XSS, SQL инжектиране, DoS/DDoS и ботнет мрежи", sv: "Lösning — Övningsblad 9: XSS, SQL Injection, DoS/DDoS & Botnets", fi: "Ratkaisu — Harjoitustaulukko 9: XSS, SQL-injektio, DoS/DDoS ja bottiverkot", id: "Solusi — Lembar Latihan 9: XSS, Injeksi SQL, DoS/DDoS & Botnet", th: "โซลูชัน — เอกสารแบบฝึกหัดที่ 9: XSS, SQL Injection, DoS/DDoS และ Botnets", sw: "Suluhisho - Laha ya 9 ya Mazoezi: XSS, Sindano ya SQL, DoS/DDoS & Botnets",
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

const ueb10: Explanation = {
  id: "cs-2025-u10",
  lesson: 10,
  title: {
    de: "Lösungsweg — Übungsblatt 10: C-Crashkurs (Kompilierung, Pointer & der Boden für Exploits)", en: "Solution — Exercise Sheet 10: C Crash Course (Compilation, Pointers & the Groundwork for Exploits)", tr: "Çözüm - Alıştırma Kağıdı 10: Hızlandırılmış C Kursu (Derleme, İşaretçiler ve Açıklardan Yararlanmaların Temelleri)", ar: "الحل — ورقة التمرين 10: الدورة التدريبية المكثفة للغة C (التجميع والمؤشرات وأساس برمجيات إكسبلويت)", ru: "Решение — Лист упражнения 10: Ускоренный курс C (компиляция, указатели и основа для эксплойтов)", it: "Soluzione - Foglio di esercizi 10: C Corso accelerato (compilazione, suggerimenti e basi per gli exploit)", es: "Solución: Hoja de ejercicio 10: Curso intensivo de C (compilación, sugerencias y base para las hazañas)", fr: "Solution — Feuille d'exercice 10 : Cours intensif C (compilation, pointeurs et bases des exploits)", zh: "解决方案 — 练习表 10：C 速成课程（编译、指针和漏洞利用基础）", pl: "Rozwiązanie — Arkusz ćwiczeń 10: C Crash Course (kompilacja, wskaźniki i podstawy exploitów)", pt: "Solução - Folha de exercícios 10: Curso intensivo C (compilação, dicas e bases para explorações)", uk: "Рішення — аркуш із вправою 10: Прискорений курс C (компіляція, покажчики та основа для експлойтів)", fa: "راه‌حل - برگه تمرین 10: دوره Crash Course (تجمیع، اشاره‌گرها و زمینه‌سازی برای اکسپلویت‌ها)", ja: "解決策 — 演習シート 10: C クラッシュ コース (コンパイル、ポインター、エクスプロイトの基礎)", ko: "솔루션 — 연습 시트 10: C 충돌 코스(컴파일, 포인터 및 익스플로잇의 기초)", vi: "Giải pháp — Bảng bài tập 10: Khóa học C Crash (Biên dịch, Con trỏ & Nền tảng để khai thác)", hi: "समाधान - अभ्यास शीट 10: सी क्रैश कोर्स (संकलन, संकेत और शोषण के लिए आधारभूत कार्य)", ur: "حل — ایکسرسائز شیٹ 10: C کریش کورس (تالیف، اشارے اور کارناموں کے لیے بنیاد)", nl: "Oplossing — Oefenblad 10: C-spoedcursus (compilatie, tips en de basis voor exploits)", el: "Λύση — Φύλλο άσκησης 10: Crash Course (Σύνταξη, δείκτες & το υπόβαθρο για Exploits)", cs: "Řešení — Cvičební list 10: Crash Course (kompilace, ukazatele a základy pro exploity)", hu: "Megoldás – 10. gyakorlat: C gyorsmenet (összeállítás, mutatók és a kihasználások alapjai)", ro: "Soluție — Fișa de exercițiu 10: Curs intensiv C (compilare, indicații și bazele pentru exploatări)", sq: "Zgjidhja — Fleta e Ushtrimit 10: Crash Course (Përmbledhje, Pointers & The Groundwork for Exploits)", sr: "Решење — Табела за вежбу 10: Ц убрзани курс (Компилација, показивачи и основа за експлоатације)", hr: "Rješenje — List za vježbu 10: C ubrzani tečaj (kompilacija, smjernice i osnova za eksploatacije)", bg: "Решение — Упражнение Лист 10: C Crash Course (компилация, указатели и основа за експлойти)", sv: "Lösning — Övningsblad 10: C Crash Course (sammanställning, pekare och grunden för exploater)", fi: "Ratkaisu — Harjoitustaulukko 10: C-pikakurssi (kokoonpano, osoittimet ja hyödykkeiden perusteet)", id: "Solusi - Lembar Latihan 10: Kursus Singkat C (Kompilasi, Petunjuk & Dasar Eksploitasi)", th: "แนวทางแก้ไข — เอกสารแบบฝึกหัดที่ 10: หลักสูตร C Crash (การรวบรวม ตัวชี้ และรากฐานสำหรับการแสวงหาผลประโยชน์)", sw: "Suluhisho - Laha ya 10 ya Zoezi: Kozi ya Kuacha Kufanya Kazi (Mkusanyiko, Vielelezo na Msingi wa Matumizi)",
  },
  content: {
    de: `Dieses Blatt stellt keine Aufgaben — es ist ein C-Crashkurs. Und das hat einen Grund: das *nächste* Blatt lässt dich Programme *kaputtmachen*, und du kannst nichts brechen, was du nicht verstehst. C ist die Sprache, in der Betriebssysteme und alte, verwundbare Software geschrieben sind, und C hat eine gefährliche Eigenschaft: es prüft fast nichts für dich. Genau diese fehlenden Prüfungen sind später die Einfallstore. Dieser Lösungsweg führt dich durch die C-Grundlagen — mit Blick darauf, was davon im Exploit-Kapitel zur Waffe wird.

## Von Quellcode zu Programm — die vier Kompilierungsphasen

Wenn du gcc aufrufst, läuft eine **Pipeline** aus vier Stufen ab, und du solltest jede benennen können (beliebte Klausurfrage):

1. **Präprozessor** — verarbeitet Direktiven wie #include und #define und erzeugt *erweiterten* Quellcode (er fügt Header-Inhalte ein, ersetzt Makros).
2. **Compiler** — übersetzt den vorverarbeiteten C-Code in **Assembler** (architekturspezifisch, z. B. x86).
3. **Assembler** — wandelt den Assemblercode in maschinenlesbaren **Objektcode** (.o).
4. **Linker** — kombiniert die Objektdateien und Bibliotheken zur fertigen **ausführbaren Datei**.

> **Eselsbrücke:** „PCAL" — Präprozessor, Compiler, Assembler, Linker. Aus Text wird Assembler, aus Assembler Objektcode, aus Objektcode ein lauffähiges Programm.

## Variablen, Typen und ihre Größen

In C musst du jede Variable *vor* Gebrauch deklarieren (Typ + Name, optional Initialwert). Die Typgrößen solltest du kennen, denn im Exploit-Kapitel zählt jedes Byte:

| Typ | Größe | Bedeutung |
|---|---|---|
| char | 1 Byte | einzelnes Zeichen |
| int | 4 Byte | ganze Zahl |
| float | 4 Byte | Fließkommazahl |
| double | 8 Byte | große Fließkommazahl |

C ist **case-sensitiv** (alter ≠ Alter), und lokale Variablen leben nur innerhalb ihrer geschweiften Klammern (ihr **Scope**).

## Verzweigungen und Schleifen — kurz

Verzweigungen steuern den Fluss: **if / else if / else** und **switch-case** (wo break den Fall-Through verhindert). Schleifen wiederholen Code: **while** (Bedingung *vor* dem Durchlauf — null oder mehr Durchläufe), **do-while** (Bedingung *nach* dem Durchlauf — mindestens einer), **for** (Zähler kompakt in einer Zeile). break verlässt die Schleife sofort, continue überspringt nur den Rest des aktuellen Durchlaufs. Das alles ist Handwerkszeug — wichtig wird gleich der Speicher.

## Funktionen: Call by Value vs. Call by Reference

Hier liegt der erste echte Stolperstein und die Brücke zu den Pointern. C kennt zwei Arten, einer Funktion etwas zu übergeben:

- **Call by Value (Wertübergabe):** Die Funktion bekommt eine *Kopie*. Ändert sie den Parameter, bleibt die Originalvariable des Aufrufers unberührt. Eine Funktion quadrat(int x), die x = x*x rechnet, ändert *nichts* draußen.
- **Call by Reference (Referenzübergabe):** Die Funktion bekommt die *Adresse* (einen **Pointer**). Über die Adresse kann sie die Originalvariable wirklich verändern. quadrat(int *x), die *x = (*x)*(*x) rechnet, ändert den Wert beim Aufrufer.

Der Stern hat zwei Rollen, die man am Anfang verwechselt: in der Deklaration **int *x** heißt er „x ist ein Pointer auf int", im Ausdruck **(*x)** heißt er „der Wert, auf den x zeigt" (Dereferenzieren). Das **&** vor einer Variable liefert ihre Adresse.

## Arrays und Pointer — hier wird C gefährlich

Ein **Array** ist ein zusammenhängender Speicherbereich gleichartiger Werte. Deklarierst du **int buffer[8]**, hast du 8 ganze Zahlen hintereinander, gültige Indizes 0 bis 7. Und jetzt der Punkt, auf den alles hinausläuft: **C prüft die Array-Grenzen nicht.** Schreibst du buffer[8] oder buffer[100], gibt es keinen Fehler — du schreibst einfach in den Speicher *daneben*. Das ist **undefiniertes Verhalten**, im besten Fall ein Absturz (Segfault), im schlimmsten Fall die Grundlage eines Exploits (genau das ist der **Buffer Overflow** aus Blatt 11).

Arrays und Pointer sind eng verwandt: der Array-Name ist praktisch ein Pointer auf das erste Element. Es gilt **arr[i]** ist dasselbe wie ***(arr + i)**. Pointer-Arithmetik rechnet dabei in *Element*-Schritten: ptr + 1 springt um sizeof(Typ) Bytes weiter, nicht um ein Byte.

### Schritt für Schritt — einen Pointer von Hand verfolgen

Betrachte: **int var = 42; int \\*ptr = &var;** Jetzt zeigt ptr auf var. Dann ist *ptr gleich 42 (Dereferenzieren liefert den Wert). Schreibst du **\\*ptr = 100;**, änderst du *durch den Pointer* die Variable var — danach ist var = 100, obwohl du var nie direkt angefasst hast. Genau diese Macht (über eine Adresse fremden Speicher ändern) ist es, die ein Angreifer später missbraucht.

## Dynamischer Speicher und Strings

Mit **malloc(n)** holt man sich zur Laufzeit n Bytes vom Heap, mit **free()** gibt man sie zurück — vergisst man free, leckt Speicher; benutzt man Speicher nach free, droht ein weiterer Exploit-Typ. Ein **String** ist in C nur ein char-Array, das mit einem unsichtbaren **Nullbyte** (0, das „\\0") endet — daran erkennen Funktionen wie strcpy oder strcmp das Ende. Merke dir das Nullbyte gut: viele C-Bugs drehen sich darum, dass es fehlt, an der falschen Stelle steht oder mitkopiert wird.

> **Typische Falle:** **char name[] = "Max"** belegt *vier* Bytes (M, a, x und das Nullbyte), nicht drei. Wer die Grenze um eins verrechnet, produziert den klassischen „Off-by-one"-Fehler.

## Klausur-Fokus und Brücke zu den Exploits

Können musst du: die **vier Kompilierungsphasen** (Präprozessor → Compiler → Assembler → Linker) und was jede tut; die **Typgrößen** (char 1, int 4, float 4, double 8); der Unterschied **Call by Value vs. Reference** und warum dafür Pointer nötig sind; und vor allem das eine, das alles trägt: **C prüft keine Array-Grenzen**. Ein Schreibzugriff jenseits eines Buffers landet im Nachbarspeicher — das ist die Saat, aus der im nächsten Blatt der Buffer Overflow, der Data-Only-Angriff und am Ende das Einschleusen von fremdem Code wächst. Wer Pointer, Array-Grenzen und das Stack-Layout im Griff hat, versteht die ganze Exploit-Welt.`,
  },
};

const ueb11: Explanation = {
  id: "cs-2025-u11",
  lesson: 10,
  title: {
    de: "Lösungsweg — Übungsblatt 11: Software-Exploits (x86, Data-Only-Angriff & Canary-Bypass)", en: "Solution — Exercise Sheet 11: Software Exploits (x86, Data-Only Attack & Canary Bypass)", tr: "Çözüm — Alıştırma Kağıdı 11: Yazılım İstismarları (x86, Yalnızca Veri Saldırısı ve Kanarya Baypas)", ar: "الحل - ورقة التمرين 11: عمليات استغلال البرمجيات (x86، هجوم البيانات فقط وتجاوز Canary)", ru: "Решение. Лист упражнения 11. Программные эксплойты (x86, атака только на данные и Canary Bypass)", it: "Soluzione: foglio di esercizio 11: exploit software (x86, attacco solo dati e Canary Bypass)", es: "Solución: Hoja de ejercicio 11: Explotaciones de software (x86, ataque de solo datos y derivación canary)", fr: "Solution — Feuille d'exercice 11 : Exploits logiciels (x86, attaque de données uniquement et contournement Canary)", zh: "解决方案 — 练习表 11：软件漏洞利用（x86、纯数据攻击和金丝雀绕过）", pl: "Rozwiązanie — Arkusz ćwiczeń 11: Exploity w oprogramowaniu (x86, atak tylko na dane i obejście Canary)", pt: "Solução - Folha de exercícios 11: Explorações de software (x86, ataque somente de dados e desvio canário)", uk: "Рішення — Вправа 11: Експлойти програмного забезпечення (x86, атака лише на дані та обхід Canary)", fa: "راه حل - برگه تمرین 11: بهره برداری از نرم افزار (x86، حمله فقط داده و دور زدن قناری)", ja: "解決策 — 演習シート 11: ソフトウェアのエクスプロイト (x86、データのみの攻撃、カナリア バイパス)", ko: "솔루션 — 연습 시트 11: 소프트웨어 악용(x86, 데이터 전용 공격 및 카나리아 우회)", vi: "Giải pháp — Bảng bài tập 11: Khai thác phần mềm (x86, Tấn công chỉ dữ liệu & Bỏ qua Canary)", hi: "समाधान - अभ्यास शीट 11: सॉफ़्टवेयर शोषण (x86, डेटा-केवल हमला और कैनरी बाईपास)", ur: "حل — ایکسرسائز شیٹ 11: سافٹ ویئر ایکسپلائٹس (x86، صرف ڈیٹا اٹیک اور کینری بائی پاس)", nl: "Oplossing — Oefenblad 11: Software-exploits (x86, data-only aanval & Canary Bypass)", el: "Λύση — Φύλλο άσκησης 11: Εκμεταλλεύσεις λογισμικού (x86, Επίθεση μόνο για δεδομένα & Παράκαμψη Καναρίων)", cs: "Řešení — Cvičební list 11: Software Exploits (x86, Data-Only Attack & Canary Bypass)", hu: "Megoldás – 11. gyakorlat: Szoftver-kihasználások (x86, csak adattámadás és Canary Bypass)", ro: "Soluție — Fișa de exercițiu 11: Exploits software (x86, atac numai pentru date și ocolire Canary)", sq: "Zgjidhja — Fleta e ushtrimeve 11: Shfrytëzimi i softuerit (x86, Sulmi vetëm për të dhënat dhe anashkalimi i Kanarit)", sr: "Решење — Табела за вежбу 11: Експлоатације софтвера (к86, напад само са подацима и заобилажење Цанари)", hr: "Rješenje — Vježba 11: Softverske eksploatacije (x86, Data-Only Attack & Canary Bypass)", bg: "Решение — Упражнение лист 11: Софтуерни експлойти (x86, атака само за данни и Canary Bypass)", sv: "Lösning — Övningsblad 11: Mjukvaruexploatering (x86, Data-Only Attack & Canary Bypass)", fi: "Ratkaisu – Harjoitustaulukko 11: Ohjelmiston hyväksikäytöt (x86, vain datan hyökkäys ja Canary Bypass)", id: "Solusi — Lembar Latihan 11: Eksploitasi Perangkat Lunak (x86, Serangan Khusus Data & Bypass Canary)", th: "แนวทางแก้ไข — เอกสารแบบฝึกหัดที่ 11: การใช้ซอฟต์แวร์ให้เกิดประโยชน์ (x86, การโจมตีเฉพาะข้อมูล & Canary Bypass)", sw: "Suluhisho — Laha ya Mazoezi ya 11: Matumizi ya Programu (x86, Mashambulizi ya Data Pekee & Njia ya Kupitia Canary)",
  },
  content: {
    de: `Jetzt wird es ernst: du brichst zum ersten Mal ein echtes Programm. Das Blatt führt dich vom Lesen von Maschinencode (was tut die CPU wirklich?) über deinen ersten Angriff (ein Passwort umgehen, ohne es zu kennen) bis zum Aushebeln einer Schutzmaßnahme (dem Stack-Canary). Der rote Faden ist der **Buffer Overflow** aus Blatt 10: weil C keine Array-Grenzen prüft, schreibt eine zu lange Eingabe in den Nachbarspeicher — und dort liegen Dinge, die über Erfolg oder Misserfolg entscheiden. Wir gehen jeden Schritt durch.

## Aufgabe 1 — Hello World in x86-Assembler und System Calls

Ein winziges Assemblerprogramm (Linux i386) gibt „Hello World" aus und beendet sich. Disassembliert sieht die Routine _start so aus — jede Zeile erklärt:

    mov eax,0x4        ; Syscall-Nummer 4 = SYS_WRITE
    mov ebx,0x1        ; 1. Parameter: fd 1 = Standardausgabe
    mov ecx,0x804901f  ; 2. Parameter: Adresse des Strings "Hello World"
    mov edx,0xd        ; 3. Parameter: Länge 0xd = 13 Zeichen
    int 0x80           ; Kernel aufrufen: write(1, str, 13)
    mov eax,0x1        ; Syscall-Nummer 1 = SYS_EXIT
    xor ebx,ebx        ; Parameter: Exit-Code 0 (xor mit sich selbst = 0)
    int 0x80           ; Kernel aufrufen: exit(0)

**Wie funktionieren Linux-System-Calls auf x86-32?** Ein System-Call ist die Tür vom Benutzerprogramm zum Kernel (für Hardware-Zugriff, Prozesse, Speicher). Das Schema:

- Die **Syscall-Nummer** kommt ins Register **eax** (4 = write, 1 = exit, …).
- Die **Parameter** kommen der Reihe nach in **ebx, ecx, edx** (dann esi, edi).
- Ausgelöst wird der Call mit der Instruktion **int 0x80** (32-Bit; im 64-Bit-Modus heißt sie syscall).
- Der **Rückgabewert** landet wieder in **eax**.

> **Eselsbrücke:** eax sagt *was* (welcher Syscall), ebx/ecx/edx sagen *womit* (die Parameter), int 0x80 sagt *los*, und eax bringt das Ergebnis zurück.

## Aufgabe 2 — Data-Only-Angriff: ein Passwort umgehen

Der verwundbare Code (Listing 1):

    int pw_check(char *password) {
        int auth = 0;
        char pw_buffer[16] = {0};
        strcpy(pw_buffer, password);              // kopiert ALLES, ungeprüft
        if (strcmp(pw_buffer, "cyssec") == 0)
            auth = 1;
        return auth;
    }

**2.1 — Wo ist der Fehler?** In Zeile mit **strcpy(pw_buffer, password)**. strcpy kopiert den *gesamten* String (inklusive Nullbyte) nach pw_buffer — **ohne zu prüfen, ob er hineinpasst**. pw_buffer ist nur 16 Byte groß. Ist password länger, schreibt strcpy über das Buffer-Ende hinaus in den Nachbarspeicher (Buffer Overflow). Beheben: vor dem Kopieren die Länge prüfen, z. B. if (strlen(password) > 16) exit(0); — oder gleich das sichere strncpy verwenden.

**2.2 — Stackframe-Layout von pw_check.** Auf dem Stack liegen die Daten der Funktion in dieser Reihenfolge (von niedrigen zu höheren Adressen):

| Adresse | Inhalt |
|---|---|
| niedrig | **pw_buffer[16]** (der überlaufende Puffer) |
| ↓ | **auth** (die Entscheidungsvariable) |
| ↓ | saved ebp |
| ↓ | return address |
| hoch | &password |

Entscheidend: **auth liegt direkt hinter pw_buffer**. Ein Überlauf von pw_buffer trifft also als Erstes auth.

### Schritt für Schritt — auth überschreiben (2.3)

Du sollst eine Eingabe finden, die *nicht* „cyssec" ist, aber trotzdem „Gut gemacht!" auslöst. „Gut gemacht!" erscheint, wenn pw_check etwas Wahres (auth ≠ 0) zurückgibt. Die Idee: den Buffer überlaufen lassen, bis ein Byte in auth landet und es von 0 verschieden macht.

- Gib **16-mal 'A'** ein, um pw_buffer komplett zu füllen (Indizes 0–15).
- Hänge **ein weiteres Zeichen** an, z. B. ein 'B'. strcpy schreibt dieses 'B' an die Stelle direkt hinter dem Buffer — also in **auth**.
- Jetzt ist auth = … irgendein von Null verschiedener Wert (durch das 'B' = 0x42). Der strcmp schlägt zwar fehl (der Inhalt ist nicht „cyssec"), aber **auth wurde nicht durch strcmp gesetzt, sondern durch den Überlauf** — und return auth gibt einen Wahr-Wert zurück.

Eine funktionierende Eingabe ist also **AAAAAAAAAAAAAAAAB** (16 A + 1 B), oder großzügiger AAAAAAAAAAAAAAAABBBB. Das Programm gibt „Gut gemacht!" aus, obwohl niemand das Passwort kennt. Weil hier eine *Daten*variable (auth) und nicht der Kontrollfluss manipuliert wird, heißt das ein **Data-Only-Angriff** (Non-Control-Data).

**2.4 — Was, wenn der Compiler die Variablen anders anordnet?** Dann hängt der Angriff davon ab, ob auth *hinter* pw_buffer liegt. Legt der Compiler auth an eine niedrigere Adresse (vor den Buffer), läuft der Überlauf von pw_buffer *weg* von auth — und dieser konkrete Angriff trifft ins Leere. Die Anordnung der lokalen Variablen ist also nicht garantiert; sie ist compiler-/architekturabhängig, und genau das macht solche Layout-abhängigen Angriffe brüchig.

## Aufgabe 3 — Bonus: den Canary aushebeln

Der Entwickler hat dazugelernt und das Programm canary gebaut: es **terminiert bei zu langen Eingaben** bzw. erkennt Buffer Overflows. Der Trick ist ein **Stack-Canary** — ein bekannter Wächter-Wert, der zwischen Buffer und den schützenswerten Daten auf den Stack gelegt wird.

**3.1 / 3.2 — Was hat sich geändert?** pw_check legt jetzt einen Canary auf den Stack. Im Disassembly sieht man, wie vier Bytes gesetzt werden: 0x63 ('c'), 0x68 ('h'), 0x61 ('a'), 0x64 ('d') — der Canary ist das Wort **„chad"**. Am *Ende* der Funktion prüft das Programm, ob dieser Wert noch unverändert ist. Ein normaler Überlauf, der durch den Buffer läuft, überschreibt zwangsläufig den Canary — die Prüfung schlägt an und das Programm bricht ab, bevor der Schaden wirkt.

**3.3 — Wie umgeht man das?** Der Canary schützt nur, *solange sein Wert geheim ist*. Hier ist er aber konstant und bekannt („chad"). Der Trick: man überschreibt den Canary mit **genau seinem eigenen Wert** wieder — dann ist er beim Abschluss-Check unverändert, die Prüfung merkt nichts, und man kann *darüber hinaus* weiterschreiben, um auth zu treffen.

### Schritt für Schritt — die Eingabe bauen (3.4)

Layout: zuerst die 16 Buffer-Bytes, dann der 4-Byte-Canary „chad", dann auth. Also baust du die Eingabe genau in dieser Reihenfolge:

- **16-mal 'A'** → füllt pw_buffer.
- **chad** → überschreibt den Canary mit *seinem korrekten Wert* (Prüfung bleibt zufrieden).
- **B** → landet in auth und setzt es auf einen Wahr-Wert.

Die fertige Eingabe ist **AAAAAAAAAAAAAAAAchadB**. Das Programm erkennt den Overflow *nicht* (Canary intakt) und gibt trotzdem „Gut gemacht!" aus. Die Lehre: ein Canary ist nur so stark wie die Geheimhaltung seines Werts — ein vorhersagbarer Canary ist kein Schutz.

> **Eselsbrücke:** Der Canary ist der „Kanarienvogel im Bergwerk": stirbt er (ändert sich sein Wert), Alarm. Kennt der Angreifer den Vogel aber, setzt er ihn unversehrt zurück und schleicht vorbei.

## Klausur-Fokus

Drei Dinge, die wirklich drankommen: (1) **x86-Syscall-Konvention** — Nummer in eax, Parameter in ebx/ecx/edx, int 0x80 löst aus, Rückgabe in eax; und ein paar Instruktionen lesen können (mov, xor ebx,ebx = 0, int 0x80). (2) Der **Data-Only-Angriff** — erkläre, warum strcpy ohne Längenprüfung gefährlich ist, zeichne das Stackframe (pw_buffer → auth → saved ebp → return address) und gib eine konkrete Eingabe an, die auth über den Überlauf setzt (16 Füllbytes + 1). (3) Der **Canary** — was er ist, warum ein normaler Overflow ihn auslöst, und wie ein *bekannter* Canary umgangen wird (im Klartext zurückschreiben), inklusive der Eingabe AAAAAAAAAAAAAAAAchadB. Und das übergreifende Warum: alles wurzelt in der fehlenden Array-Grenzprüfung von C.`,
  },
};

const ueb12: Explanation = {
  id: "cs-2025-u12",
  lesson: 11,
  title: {
    de: "Lösungsweg — Übungsblatt 12: Multics Rings & Brackets und Linux-Dateirechte", en: "Solution — Exercise Sheet 12: Multics Rings & Brackets and Linux File Permissions", tr: "Çözüm — Alıştırma Kağıdı 12: Multics Halkaları ve Parantezleri ve Linux Dosya İzinleri", ar: "الحل - ورقة التمرين 12: الحلقات والأقواس المتعددة وأذونات ملفات Linux", ru: "Решение — Упражнение 12: Кольца и скобки Multics и права доступа к файлам Linux", it: "Soluzione: foglio di esercizio 12: anelli e parentesi Multics e permessi dei file Linux", es: "Solución: Hoja de ejercicio 12: Anillos y corchetes Multics y permisos de archivos de Linux", fr: "Solution — Feuille d'exercice 12 : Anneaux et supports Multics et autorisations de fichiers Linux", zh: "解决方案 — 练习表 12：Multics 环和括号以及 Linux 文件权限", pl: "Rozwiązanie — Arkusz ćwiczeń 12: Pierścienie i nawiasy Multics oraz uprawnienia do plików w systemie Linux", pt: "Solução - Folha de exercícios 12: Anéis e colchetes Multics e permissões de arquivo Linux", uk: "Рішення — аркуш із вправою 12: кільця та дужки Multics і дозволи на файли Linux", fa: "راه حل - برگه تمرین 12: حلقه ها و براکت های Multics و مجوزهای فایل لینوکس", ja: "解決策 — 演習シート 12: Multics リングとブラケットおよび Linux ファイル権限", ko: "솔루션 — 연습 시트 12: Multics 링 및 괄호와 Linux 파일 권한", vi: "Giải pháp — Bảng bài tập 12: Vòng & Chân đế Multics và Quyền của tệp Linux", hi: "समाधान - अभ्यास शीट 12: मल्टिक्स रिंग्स और ब्रैकेट्स और लिनक्स फ़ाइल अनुमतियाँ", ur: "حل — ایکسرسائز شیٹ 12: ملٹکس رنگز اور بریکٹس اور لینکس فائل پرمیشنز", nl: "Oplossing – Oefenblad 12: Multics Rings & Brackets en Linux-bestandsrechten", el: "Λύση — Φύλλο άσκησης 12: Multics Rings & Brackets και δικαιώματα αρχείων Linux", cs: "Řešení — Cvičební list 12: Multics Rings & Brackets a oprávnění k souborům Linux", hu: "Megoldás – 12. gyakorlat: Multics gyűrűk és zárójelek és Linux-fájlengedélyek", ro: "Soluție — Fișa de exercițiu 12: Multics Rings & Brackets și permisiuni pentru fișiere Linux", sq: "Zgjidhja — Fleta e ushtrimeve 12: Unazat dhe kllapat e Multics dhe lejet e skedarëve Linux", sr: "Решење — Табела за вежбу 12: Мултицс прстенови и заграде и дозволе за Линук фајлове", hr: "Rješenje — List za vježbu 12: Multics prstenovi i zagrade i dozvole za Linux datoteke", bg: "Решение — Упражнение Лист 12: Пръстени и скоби на Multics и Разрешения за файлове на Linux", sv: "Lösning — Övningsblad 12: Multics Rings & Brackets och Linux-filbehörigheter", fi: "Ratkaisu — Harjoitustaulukko 12: Multics-renkaat ja -sulut ja Linux-tiedostojen käyttöoikeudet", id: "Solusi — Lembar Latihan 12: Cincin & Braket Multics dan Izin File Linux", th: "แนวทางแก้ไข — เอกสารแบบฝึกหัดที่ 12: Multics Rings & Brackets และการอนุญาตไฟล์ Linux", sw: "Suluhisho - Laha ya 12 ya Zoezi: Pete na Mabano ya Multics na Ruhusa za Faili za Linux",
  },
  content: {
    de: `Dieses Blatt dreht sich um die Frage, die jedes Betriebssystem beantworten muss: *Darf dieser Prozess auf dieses Segment zugreifen?* Multics beantwortet sie mit **Ringen und Klammern** — und das ist genau die Sorte Aufgabe, bei der man in der Klausur Punkte verschenkt, weil man das Entscheidungsverfahren nicht sauber im Kopf hat. Wir bauen dieses Verfahren hier als feste Schritt-für-Schritt-Maschine auf und füttern dann jeden Fall hindurch. Am Ende kommt das praktischere, aber verwandte Linux-Rechtemodell.

## Theoriefragen (Aufgabe 1.1–1.4)

**Warum Protection Rings — reichen ACLs nicht?** Eine ACL legt *feste* Rechte fest. Ein Prozess läuft damit in *einer* Domäne mit unveränderlichen Rechten. Manchmal braucht ein Prozess aber *kurzzeitig* mehr Rechte — etwa um einen System-Call auszuführen (int 0x80). Genau das leisten Ringe: sie erlauben einen kontrollierten, vorübergehenden Wechsel der Privilegstufe. ACLs sagen *wer* darf, Ringe sagen *mit welcher Privilegstufe*.

**Wie wird die Einhaltung sichergestellt?** Der **Supervisor** wacht darüber. Er läuft in Ring 0/1, ist die höchste Instanz (Root of Trust) und setzt die Ring-Regeln bei jedem Zugriff durch.

**Gate-Segmente.** Ein Gate ist eine *spezielle Art von Code-Segment*. Will ein Prozess Code aufrufen, der in einem **höher-privilegierten** Ring laufen muss, geht das nur über ein Gate. Das Gate **prüft die übergebenen Argumente** (aus dem niedriger-privilegierten Ring) auf Typ und Länge und kontrolliert, ob der Aufruf an einer *gültigen Startadresse* erfolgt. So kann ein unprivilegierter Prozess privilegierten Code nur an genau definierten, abgesicherten Eintrittspunkten betreten.

**Warum muss für Gates r2 < r3 gelten?** Eine Ring-Transition zu einem höher-privilegierten Ring ist nur im Bereich r2 < r ≤ r3 möglich. Gälte r2 = r3, gäbe es diesen Bereich gar nicht — es könnte *nie* eine privilegierende Transition stattfinden, der Prozess bliebe in seinem Ring. Das widerspräche dem Sinn eines Gates (das ja genau solche Transitions ermöglichen soll). Also: **kein Gate ohne r2 < r3.**

## Das Entscheidungsverfahren (auswendig können!)

Jeder Zugriff läuft in dieser festen Reihenfolge. Notation: Access Bracket (r1, r2), Call Bracket (r2, r3), aktueller Prozessring r.

**Schritt 1 — ACL prüfen.** Gibt es einen Eintrag, dessen User-ID (Person.Project.Tag, mit * als Platzhalter) zum Prozess passt *und* das gewünschte Recht (r/w/e) enthält? Wenn nein → **Zugriff verweigert**, fertig. Erst wenn ja, geht es weiter zu den Klammern.

**Schritt 2a — Lesen/Schreiben (Access Bracket r1, r2):**

- r ≤ r1 → **lesen und schreiben** erlaubt
- r1 < r ≤ r2 → **nur lesen** (kein Schreiben)
- r > r2 → weder lesen noch schreiben

**Schritt 2b — Ausführen (Call Bracket r2, r3):**

- r < r1 → **ausführen, Transition nach r1** (Prozess steigt auf r1 ab)
- r1 ≤ r ≤ r2 → **ausführen, keine Transition**
- r2 < r ≤ r3 → **ausführen, Transition nach r2** — nur über ein **Gate** (setzt r2 < r3 voraus)
- r > r3 → **ausführen verboten**

> **Eselsbrücke:** Erst ACL (*darf* der User das Recht überhaupt?), dann Klammern (*passt* der Ring?). Für r/w die Access-Klammer, fürs Ausführen die Call-Klammer mit ihren vier Zonen — von „zu privilegiert, steig auf r1 ab" über „passt genau" und „Gate nach r2" bis „zu unprivilegiert, verboten".

## Schritt für Schritt — die Zugriffsfälle

Die Segmente (als (r1, r2, r3) zusammengefasst) und die Prozessringe:

| Segment | (r1, r2, r3) | Typ |
|---|---|---|
| A | (3, 5, 5) | Daten |
| B | (0, 2, 2) | Daten |
| C | (0, 0, 5) | Code |
| D | (1, 3, 5) | Code |

Prozesse: P1 r=3, P2 r=0, P3 r=5, P4 r=2, P5 r=6, P6 r=0, P7 r=4.

**Die Ausführen-Fälle** (Call Bracket — hier glänzt das Verfahren):

| # | Prozess (r) | Segment | passende Zone | Ergebnis |
|---|---|---|---|---|
| 7 | P6 (0) | C (0,0,5) | r1≤r≤r2: 0≤0≤0 | **Ausführen, keine Transition** |
| 8 | P3 (5) | C (0,0,5) | r2<r≤r3: 0<5≤5 | **Ausführen, Transition nach r2 = 0** (Gate, da 0<5) |
| 9 | P2 (0) | D (1,3,5) | r<r1: 0<1 | **Ausführen, Transition nach r1 = 1** (kein Gate nötig) |
| 10 | P5 (6) | D (1,3,5) | r>r3: 6>5 | **Ausführen verboten** |
| 11 | P4 (2) | D (1,3,5) | r1≤r≤r2: 1≤2≤3 | **Ausführen, keine Transition** (+ Pointer-Prüfung, s. u.) |

Lies Fall 8 als Muster: P3 läuft in Ring 5, Segment C hat Call-Bracket (r2,r3)=(0,5). r=5 liegt in der Zone r2 < r ≤ r3 (0 < 5 ≤ 5) → Ausführen *mit Transition auf r2 = 0* ist erlaubt, **weil C ein Gate ist** (r2=0 < r3=5). P3 betritt also privilegierten Code an einem abgesicherten Eintrittspunkt. Fall 9 ist der Gegenpol: P2 ist mit r=0 *privilegierter* als die Heimatklammer von D (r1=1), also steigt es beim Ausführen auf r1=1 *herab* — keine Gate-Frage, weil keine Privilegierung stattfindet.

**Fall 11 mit Pointer.** P4 (r=2) führt D aus: r1=1 ≤ 2 ≤ r2=3 → ausführen ohne Transition. Zusätzlich übergibt P4 einen **Pointer auf Speicher in Ring 3**. Hier greift die zweite Aufgabe von Gates/Supervisor: der übergebene Pointer muss geprüft werden, damit ein Prozess nicht über ein Argument auf Speicher zugreifen lässt, für den ihm die Rechte fehlen. Da P4 in Ring 2 läuft und Ring 3 *niedriger* privilegiert ist, ist der Zugriff auf die Ring-3-Daten unkritisch — die Prüfung bestätigt ihn.

**Die Lesen/Schreiben-Fälle.** Hier entscheidet zuerst die ACL, dann die Access-Klammer. Die Musterlösung hält fest: Fall 3 (P2 liest B), Fall 5 (P6 liest B) und Fall 6 (P1 schreibt A) werden **verweigert** — es fehlt der passende ACL-Eintrag bzw. das Recht. Bei den positiven Fällen entscheidet die Access-Klammer: Fall 1 (P1 r=3 liest A, Access (3,5)) liegt mit r=r1=3 in der Zone „lesen und schreiben" → Lesen erlaubt; Fall 2 (P7 r=4 schreibt A) liegt mit r1=3 < 4 ≤ r2=5 in „nur lesen" → **Schreiben nicht erlaubt**; Fall 4 (P4 r=2 schreibt B, Access (0,2)) liegt mit r1=0 < 2 ≤ r2=2 ebenfalls in „nur lesen" → **Schreiben nicht erlaubt**. Merke: die Access-Klammer kann ein Schreibrecht kippen, selbst wenn die ACL „rw" gewährt — beide Hürden müssen passen.

## Linux-Dateirechte (Aufgabe 2)

Linux schreibt Rechte als zehn Zeichen, z. B. -rw-r--r--: das erste Zeichen ist der Typ (- Datei, d Verzeichnis), dann drei Dreiergruppen rwx für **Eigentümer**, **Gruppe**, **andere (others)**.

- **a)** Datei -rw-r--r-- devconnect devconnect, Zugriff als Eigentümer devconnect → die Eigentümer-Gruppe ist rw- → **ja, er kann schreiben**.
- **b)** Verzeichnis drwxr-xr-- Alice GroupAlice, Zugriff als Bob. Bob ist nicht Alice und nicht in GroupAlice → für ihn gelten die *others*-Rechte r-- (kein x). Ein Verzeichnis zu *öffnen/betreten* braucht das **Execute-Recht** → **nein, Bob kann nicht hinein**.
- **c)** Die Nutzerliste steht in **/etc/passwd**.
- **d)** chmod-Zahlen (jede Ziffer ist eine Oktal-Bitmaske rwx = 4/2/1): **444** = r--r--r--; **777** = rwxrwxrwx; **641** = rw-r----x (6=rw-, 4=r--, 1=--x).
- **e)** Beim **Verzeichnis** bedeutet das **Execute-Recht** „durch das Verzeichnis navigieren/hineinwechseln dürfen", das **Write-Recht** „Einträge (Dateien/Ordner) darin anlegen/löschen dürfen".
- **f)** **SUID**: ein Befehl läuft mit den Rechten des *Datei-Eigentümers* statt denen des ausführenden Nutzers. **SGID/GUID**: er läuft mit der *Gruppe der Datei* statt der Gruppe des Nutzers.

> **Typische Falle (Linux):** Bei Verzeichnissen ist nicht „r" das Eintrittsrecht, sondern „x". Ohne x kommst du nicht hinein, selbst wenn du r hast. Genau daran scheitert Bob in (b).

## Klausur-Fokus

Das absolute Kernstück ist die **Rings-&-Brackets-Entscheidung**: erst ACL (User-ID-Match + Recht), dann für r/w die Access-Klammer (r≤r1: rw, r1<r≤r2: nur r, r>r2: nichts), für e die Call-Klammer mit den vier Zonen (r<r1: Transition nach r1; r1≤r≤r2: ohne Transition; r2<r≤r3: Gate-Transition nach r2; r>r3: verboten) — und r2<r3 als Gate-Bedingung. Übe, jeden Prozess-Segment-Fall in Sekunden der richtigen Zone zuzuordnen. Dazu die Theorie (warum Ringe statt nur ACLs, Supervisor als Root of Trust, Gates prüfen Argumente) und das Linux-Modell (Eigentümer/Gruppe/others, x = Verzeichnis betreten, w = Einträge ändern, chmod-Oktalzahlen, SUID/SGID, /etc/passwd).`,
  },
};

const ueb13: Explanation = {
  id: "cs-2025-u13",
  lesson: 12,
  title: {
    de: "Lösungsweg — Übungsblatt 13: Reverse Engineering, strings-Analyse & Deobfuskation", en: "Solution — Exercise sheet 13: Reverse engineering, strings analysis & deobfuscation", tr: "Çözüm - Alıştırma Kağıdı 13: Tersine mühendislik, dizi analizi ve kod gizlemeyi kaldırma", ar: "الحل - ورقة التمرين 13: الهندسة العكسية، وتحليل السلاسل، وإزالة التشويش", ru: "Решение. Лист упражнения 13. Обратное проектирование, анализ строк и деобфускация.", it: "Soluzione — Foglio di esercizi 13: Reverse engineering, analisi delle stringhe e deoffuscamento", es: "Solución: hoja de ejercicio 13: ingeniería inversa, análisis de cadenas y desofuscación", fr: "Solution — Feuille d'exercice 13 : Ingénierie inverse, analyse de chaînes et désobscurcissement", zh: "解决方案 — 练习表 13：逆向工程、字符串分析和反混淆", pl: "Rozwiązanie — Arkusz ćwiczenia 13: Inżynieria wsteczna, analiza ciągów i usuwanie zaciemnień", pt: "Solução - Folha de exercício 13: Engenharia reversa, análise de strings e desofuscação", uk: "Рішення — аркуш із вправою 13: зворотне проектування, аналіз рядків і деобфускація", fa: "راه حل - برگه تمرین 13: مهندسی معکوس، تحلیل رشته ها و رفع ابهام", ja: "ソリューション — 演習シート 13: リバース エンジニアリング、文字列分析、難読化解除", ko: "솔루션 — 연습 시트 13: 리버스 엔지니어링, 문자열 분석 및 난독화", vi: "Giải pháp - Bảng bài tập 13: Kỹ thuật đảo ngược, phân tích chuỗi và giải mã", hi: "समाधान - अभ्यास शीट 13: रिवर्स इंजीनियरिंग, स्ट्रिंग्स विश्लेषण और डिओबफस्केशन", ur: "حل — ورزشی شیٹ 13: ریورس انجینئرنگ، سٹرنگز کا تجزیہ اور ڈیوبسیکشن", nl: "Oplossing – Oefenblad 13: Reverse engineering, stringanalyse en deobfuscatie", el: "Λύση — Φύλλο άσκησης 13: Αντίστροφη μηχανική, ανάλυση χορδών και αποσυμφόρηση", cs: "Řešení — Cvičební list 13: Reverzní inženýrství, analýza řetězců a deobfuskace", hu: "Megoldás — 13. feladatlap: Visszafejtés, karakterlánc-elemzés és deobfuszkáció", ro: "Soluție — Fișa de exercițiu 13: Inginerie inversă, analiza șirurilor și dezfundarea", sq: "Zgjidhja - Fleta e ushtrimit 13: Inxhinieri e kundërt, analiza e vargjeve dhe deofuzioni", sr: "Решење — Лист за вежбу 13: Реверзни инжењеринг, анализа стрингова и демаскирање", hr: "Rješenje — List za vježbu 13: Obrnuti inženjering, analiza nizova & demaskiranje", bg: "Решение — лист за упражнение 13: Обратно инженерство, анализ на низове и деобфускация", sv: "Lösning — Övningsblad 13: Reverse engineering, stränganalys & deobfuscation", fi: "Ratkaisu — Harjoitustaulukko 13: Käänteinen suunnittelu, merkkijonoanalyysi ja deobfuskaatio", id: "Solusi - Lembar latihan 13: Rekayasa balik, analisis string & deobfuscation", th: "แนวทางแก้ไข — เอกสารแบบฝึกหัดที่ 13: วิศวกรรมย้อนกลับ การวิเคราะห์สตริง และการถอดรหัสที่สร้างความสับสน", sw: "Suluhisho — Laha ya 13 ya Zoezi: Uhandisi wa Reverse, uchanganuzi wa masharti na kurahisisha kueleweka",
  },
  content: {
    de: `Beim Reverse Engineering drehst du den Spieß um: statt Code zu schreiben, *liest* du fertige Programme und findest heraus, was sie tun — ohne Quellcode. Dieses Blatt zeigt die einfachste und oft erstaunlich mächtige Technik (das Extrahieren von Zeichenketten) und dann den nächsten Schritt, wenn die Malware sich wehrt: das *Deobfuskieren* eines versteckten Domainnamens. Genau das ist Analystenalltag — und die Deobfuskation rechnen wir Byte für Byte durch.

## Aufgabe 1 — Statische Analyse mit strings

Das Werkzeug **strings** durchsucht eine Programmdatei und gibt alle darin gefundenen lesbaren Zeichenketten aus. Das ist **statische Analyse** (man führt das Programm *nicht* aus) und verrät oft schon erstaunlich viel: Fehlermeldungen, Pfade, URLs, Bibliotheksnamen.

**Welche Programme sind es?** Anhand der extrahierten Strings ließen sich die drei Dateien identifizieren als **7-Zip** (Datei 1), **Notepad** (Datei 2) und **VLC** (Datei 3) — die jeweiligen Strings (Versionsangaben, Menütexte, Bibliotheks- und Funktionsnamen) verraten Zweck und Funktionsweise.

**Warum so viel Müll dazwischen?** strings versucht, *jedes* Byte als Text zu deuten. Eine Programmdatei enthält aber nicht nur Text, sondern auch andere Datentypen (int, double) und vor allem **Code (Maschineninstruktionen)**. Manche dieser Bytefolgen sehen *zufällig* wie druckbare ASCII-Zeichen aus und werden mit ausgegeben — daher die vielen sinnlosen Zeichenketten. Man muss die nützlichen Strings also aus dem Rauschen herausfiltern.

## Aufgabe 2 — Den obfuskierten Domainnamen knacken

Die Testmalware macht etwas Typisches: eine **DNS-Abfrage**, um Kontakt zu einem **Command-and-Control-Server** aufzubauen. Als Analyst willst du den Domainnamen herausfinden, um ihn zu sperren. Das Problem: der Name liegt nicht im Klartext vor, sondern ist **obfuskiert** (verschleiert), damit ein simpler strings-Lauf ihn nicht verrät.

**Den Namen finden.** Führt man die Malware aus (oder analysiert sie), zeigt die DNS-Fehlermeldung den aufzulösenden Namen: **www.evil-domain.abcd** (die Domain existiert absichtlich nicht). Aber die spannende Aufgabe ist, ihn *aus den verschleierten Daten* zurückzurechnen.

**Wie verschleiert die Malware?** Ein Decompiler zeigt: es ist simples **Byte-XOR**. Jedes Zeichen des Domainnamens wurde mit einem Schlüsselbyte ge-XOR-t. Und hier kommt der entscheidende Trick, den du schon von den Stromchiffren kennst: **XOR ist seine eigene Umkehrung.** Wenn obfusByte = klarByte ⊕ key, dann ist klarByte = obfusByte ⊕ key — derselbe Schlüssel deobfuskiert wieder.

### Schritt für Schritt — die Deobfuskation

Gegeben sind die verschleierten Bytes und der Schlüssel:

    obfus = [22, 18, 18, 55, 124, 99, 124, 125, 60, 113, 122, 116, 120, 108, 107, 47, 96, 103, 102, 125]
    key   = [97, 101, 101, 25, 25, 21, 21, 17, 17, 21, 21, 25, 25, 5, 5, 1, 1, 5, 5, 25]

Du gehst stellenweise durch und XORst jedes Paar; das Ergebnis ist der ASCII-Code eines Klartextzeichens. Die ersten Schritte von Hand:

- 22 ⊕ 97 = 119 → ASCII 119 = **w**
- 18 ⊕ 101 = 119 → **w**
- 18 ⊕ 101 = 119 → **w**
- 55 ⊕ 25 = 46 → ASCII 46 = **.** (Punkt)
- 124 ⊕ 25 = 101 → **e**, 99 ⊕ 21 = 118 → **v**, 124 ⊕ 21 = 105 → **i**, 125 ⊕ 17 = 108 → **l**, 60 ⊕ 17 = 45 → **-**

Führt man das bis zum letzten Byte durch (… 125 ⊕ 25 = 100 → **d**), entsteht Zeichen für Zeichen wieder **www.evil-domain.abcd**. Als kleines Python-Programm, das den Deobfuskierungsalgorithmus „reimplementiert":

    temp = ""
    for i in range(len(obfus)):
        temp += chr(obfus[i] ^ key[i])
    print("Deobfuscated:", temp)

Das gibt **www.evil-domain.abcd** aus. Genau dieses „den Algorithmus der Malware nachbauen, um ihre Geheimnisse offenzulegen" ist der Kern der dynamischen/statischen Malware-Analyse.

> **Eselsbrücke:** Verschleiern mit XOR und Entschleiern mit XOR sind dieselbe Operation — a ⊕ k ⊕ k = a. Wer den Schlüssel hat (oder ihn aus dem dekompilierten Code abliest), dreht die Obfuskation in einer Zeile zurück.

## Funktionsprolog und -epilog (Brücke zum Stack)

Die Musterlösung schlägt am Ende den Bogen zurück zum Stack aus dem Exploit-Blatt — wichtig fürs Reverse Engineering, weil man im Disassembly *jede* Funktion an diesem Muster erkennt. Am **Anfang** jeder x86-Funktion steht der **Prolog**:

    push ebp                 ; alten Base-Pointer sichern (Kontext der aufrufenden Funktion)
    mov  ebp, esp            ; neuen Stack-Frame beginnen (ebp markiert den Anfang)
    sub  esp, 20             ; Platz für lokale Variablen schaffen (hier 20 Byte)

Bei pw_check aus Übung 9/11 sind die 20 Byte genau 4 Byte für die int-Variable auth plus 16 Byte für pw_buffer. Am **Ende** steht der **Epilog**, der alles sauber rückgängig macht:

    mov  esp, ebp            ; lokale Variablen verwerfen (Stack-Pointer zurücksetzen)
    pop  ebp                 ; alten Base-Pointer wiederherstellen
    ret                      ; Rücksprungadresse vom Stack holen und dorthin springen

Weil der Stack „nach unten" wächst, *verkleinert* sub esp den Stack-Pointer, um Platz zu schaffen. Das Argument (char *password) und die Rücksprungadresse wurden schon *vor* dem Prolog von der aufrufenden Funktion bzw. durch die call-Instruktion auf den Stack gelegt — genau darum lagen sie beim Buffer Overflow „über" dem pw_buffer.

## Klausur-Fokus

Können musst du: (1) **strings/statische Analyse** erklären — Programme an ihren Zeichenketten erkennen und sagen, *warum* viele sinnlose Strings entstehen (strings deutet auch Code/Zahlen als Text). (2) Die **XOR-Deobfuskation** rechnen — gegeben obfuskierte Bytes und Schlüssel, das Klartext-Zeichen je Stelle per XOR bestimmen, und das Prinzip „XOR ist seine eigene Umkehrung" benennen; typischer Malware-Zweck ist die DNS-Abfrage zum C&C-Server. (3) **Prolog/Epilog** lesen — push ebp / mov ebp,esp / sub esp,N am Anfang, mov esp,ebp / pop ebp / ret am Ende — und damit im Disassembly Funktionsgrenzen und das Stack-Frame-Layout erkennen.`,
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
  ueb10,
  ueb11,
  ueb12,
  ueb13,
];
