# CySec_2026_Uebung3-Solutions

> Converted from PDF | Pages: 6

---

### Universität Duisburg-Essen
Fakultät für Informatik

### Professor im Bereich Informatik
Prof. Dr.-Ing. Lucas Davi

### Tristan Löding
Christian Niesler

### Firas Khamis
Übungsblatt 3

### Vorlesung “Cybersicherheit”
Sommersemester 2026

### Eine kleine Zusammenfassung
und

### Betriebsmodi von Blockchiffren
Grundlagen

Übung 1.

- Kerckhoffs’sche Prinzip spielt in der modernen Kryptographie eine zentrale Rolle. Geben Sie es mit
Ihren eigenen Worten wieder.

- In der Vergangenheit wurden häufig Kryptosysteme entworfen, deren Sicherheit entgegengesetzt
zum Kerckhoffs’schen Prinzip auf der Geheimhaltung des Designs beruhte. Wie nennt man diesen

Ansatz?

- Die Wissenschaft der Kryptologie lässt sich in die Untergebiete Kryptographie und Kryptanalyse
gliedern. Beschreiben Sie beide kurz mit Ihren eigenen Worten.

- Skizzieren Sie die klassische Ausgangssituation zweier Kommunikationspartner Alice und Bob, die
über einen unsicheren Kanal miteinander kommunizieren. Erklären Sie anhand dessen, warum die

Kommunikationspartner kryptographische Algorithmen einsetzen müssen.

- Ordnen Sie den in der Kryptographie sehr wichtigen Variablen bzw. Funktionen e(·), d(·), x, y,
k, K und |K| ihre jeweiligen Bezeichnungen zu. Zur Auswahl stehen: Anzahl möglicher Schlüssel,

Schlüssel, Verschlüsselung, Schlüsselraum, Chiffrat/Ciphertext, Entschlüsselung und Klartext.

Lösung 1.

- Es besagt dass die Sicherheit eines Kryptographischen Algorithmus nur auf der Geheimhaltung
des Schlüssels beruhen soll und nicht auf der Geheimhaltung des Algorithmus selbst. Bsp: Cäsar-

Verschlüsselung bei bekanntem Algorithmus vollkommen unsicher, `RSA` trotz komplett bekanntem

Algorithmus sehr sicher.

- Security by Obscurity
- Kryptographie: Befasst sich mit dem Schutz von Informationen z.B. durch Verschlüsselung von
Nachrichten; Kryptanalyse: Befasst sich mit dem Brechen von Kryptosystemen

- Alice —–/OSCAR/—-BOB; Oscar könnte alle Kommunikation mitlesen wenn nicht verschlüsselt
wird.

- Klartext: x, Chiffrat: y; Schlüssel: K; Verschlüsselung: e(·); Entschlüsselung: d(·); Schlüsselraum:
K; Anzahl möglicher Schlüssel: |K|

1

-- 1 of 6 --

### Anpassung einer Stromchiffre
Übung 2.

Bei einer klassischen Stromchiffre besteht der Klartext x, das Chiffrat y und der Schlüsselstrom s aus

individuellen Bits xi , yi , si . Ver- und Entschlüsselung ergeben sich dann wie folgt:

yi = esi (xi) = xi ⊕ si = xi + si mod 2

xi = dsi (yi) = yi ⊕ si = yi − si mod 2

Eine entsprechend definierte Stromchiffre kann sehr einfach verallgemeinert werden, sodass sie auf be-

liebigen Alphabeten operieren kann und nicht mehr nur auf das binäre Alphabet beschränkt ist. Für

Handchiffren, d. h. Chiffren für die manuelle Verschlüsselung ohne Computer, ist es beispielsweise vor-

teilhaft, wenn die Stromchiffre direkt auf Buchstaben angewendet werden kann.

- Welches Alphabet können in der oben genannten Funktion xi , yi , si annehmen.
- Angenommen wir ersetzten nun das binäre durch das lateinische Alphabet A, . . . , Z, wobei die
Buchstaben durch die Zahlen 0, 1, . . . , 25 repräsentiert werden. Wie müsste sich der Modulus

m zur oben genannten Funktion verändern?

- Wie sieht nun der Schlüsselstrom aus?
- Was müsste sich an der Entschlüsselungsfunktion verändern, damit diese korrekt bleibt?
- Entschlüsseln Sie den folgenden Chiffretext HWHWZB mit dem Key BSASRP.
A 0

### B 1
C 2

### D 3
E 4

### F 5
G 6

### H 7
I 8

### J 9
K 10

### L 11
M 12

### N 13
O 14

### P 15
Q 16

### R 17
S 18

### T 19
U 20

### V 21
W 22

### X 23
Y 24

### Z 25
Tabelle 1: Caesar Alphabet, assigned to numbers (0-25)

Lösung 2.

- P = {0, 1}
- m = 26
- Si = {0, 1, 2, . . . , 25}
- yi = esi(xi) = (xi + si) mod 26 und xi = dsi(yi) = (yi + si) mod 26
e)

### Hi Ki Computation Result Letter
H: 7 B: 1 7 − 1 mod 26 = 6 6 G

### W: 22 S: 18 22 − 18 mod 26 = 4 4 E
H: 7 A: 0 7 − 0 mod 26 = 7 7 H

### W: 22 S: 18 22 − 18 mod 26 = 4 4 E
Z: 25 R: 17 25 − 17 mod 26 = 8 8 I

### B: 1 P: 15 1 − 15 mod 26 = 12 12 M
Brute-Force Angriffe

Übung 3.

`AES` ist die momentan am häufigsten eingesetzte symmetrische Chiffre. In dieser Aufgabe wird die Lang-

zeitsicherheit von `AES` mit 128-Bit-Schlüsseln1 betrachtet. Die Annahme ist, dass der beste bekannte

Angriff die vollständige Schlüsselsuche (auch: Brute-Force-Angriff ) ist, bei dem systematisch alle mögli-

chen Schlüssel durchgetestet werden. Hinweis:Falls Sie keinen Taschenrechner haben, schätzen Sie ihr

Ergebnisse mithilfe der Potenzgesetze und der Annahme 103 is ungefähr 210 ab.

1Eine 128-Bit-Zahl besteht aus 128 aufeinanderfolgenden Nullen und Einsen

2

-- 2 of 6 --

- Wie viele verschiedene 128-Bit-Schlüssel gibt es? Geben Sie das Ergebnis als Zweierpotenz an.
- Wir nehmen an, dass der Angreifer spezielle Hardware, sogenannte Application Specific Inte- grated
Circuits (ASICs) hat, die für `AES`-Schlüsseltests optimiert sind. Ein solcher `ASIC` kann 7 · 108

Schlüssel pro Sekunde überprüfen und der Angreifer verfügt über ein Budget von einer Million

Euro. Ein einzelnes `ASIC` kostet 40€ und es wird ein Overhead (Mehraufwand) von 100% für

die Integration der ASICs angenommen (Bau des Computers, Stromversorgung, Kühlung usw.).

Wie viele ASICs kann man mit dem gegebenen Budget parallel betreiben? Wie lange dauert eine

vollständige Schlüsselsuche im Durchschnitt2? Setzen Sie diese Zeit in Relation zu dem Alter des

Universums, welches ca. 1010 Jahre beträgt.

Lösung 3.

- |K| = 2128
- Application Specific Integrated Circuits (ASICs):
2Im Durchschnitt muss nur die Hälfte aller möglichen Schlüssel getestet werden

3

-- 3 of 6 --

### Betriebsmodi von Blockchiffren
Neben der geläufigen blockweisen Verschlüsselung (sog. `ECB` Mode), gibt es noch weitere Betriebsmodi

für Blockchiffren u.a. den `CBC` und `OFB` Modus. Der `ECB`-Modus hat einige negative Effekte u.a.

bleiben einheitliche und großflächige Bereiche, welche sich im Chiffrat über mehrere Blöcke strecken,

erkennbar. Dadurch kann die eigentlich sichere symmetrische Verschlüsselung im `ECB` Mode in einer

konkreten Anwendung unsicher werden. Ein ungünstiges Szenario der Verschlüsselung im `ECB` Mode

wird in Abbildung: 1 dargestellt. In Abbildung 2, 3 und 4 sind die einzelnen Betriebsmodi dargestellt.

Der ⊕ Operator stellt eine gewöhnliche `XOR` Operation dar.

Übung 4.

Eine einfache Blockchiffre e(·) mit 5-Bit Blockgröße verschlüsselt, indem Sie eine schlüsselabhängige Bit-

Permutation durchführt. Für einen bestimmten Schlüssel, der für die diese Aufgabe angewendet wird,

führt die Blockchiffre folgende einfache Verschlüsselung aus:

e(b1b2b3b4b5) = (b2b5b4b1b3)

### Verschlüsseln Sie die Nachricht:
x = 01101 11011 11010 00110

mit dem jeweils geforderten Betriebsmodus und geben Sie in jeder Teilaufgabe das Chiffrat y an.

- ECB
- CBC mit IV = 11001
- OFB mit IV = 11001
Lösung 4.

- ECB
Klartext: x = 01101 11011 11010 00110

### Chiffrat: y = 11001 11110 10110 00101
- CBC mit IV = 11001
Klartext: x = 01101 11011 11010 00110

y1 = e(x1 ⊕ IV ) = e(01101 ⊕ 11001) = e(10100) = 00011

y2 = e(x2 ⊕ y1) = e(11011 ⊕ 00011) = e(11000) = 10010

y3 = e(x3 ⊕ y2) = e(11010 ⊕ 10010) = e(01000) = 10000

y4 = e(x4 ⊕ y3) = e(00110 ⊕ 10000) = e(10110) = 00111

### Chiffrat: y = 10010 10010 10000 10000
- OFB mit IV = 11001
Klartext: x = 01101 11011 11010 00110

s1 = e(IV ) = e(11001) = 11010

s2 = e(s1) = e(11010) = 10110

s3 = e(s2) = e(10110) = 00111

s4 = e(s3) = e(00111) = 01101

y1 = s1 ⊕ x1 = 11010 ⊕ 01101 = 10111

y2 = s2 ⊕ x2 = 10110 ⊕ 11011 = 01101

4

-- 4 of 6 --

y3 = s3 ⊕ x3 = 00111 ⊕ 11010 = 11101

y4 = s4 ⊕ x4 = 01101 ⊕ 00110 = 01011

### Chiffrat: y = 10111 01101 11101 01011
Abbildung 1: Beispiel einer konkreten ungünstigen Situation der `ECB` Modus Verschlüsselung

Links: Orginalbild, Mittig: Bild im `ECB`-Modus verschlüsselt, Rechts: Bild in einem verketteten Modus

Bildquelle: [https://de.wikipedia.org/wiki/Electronic_Code_Book_Mode](https://de.wikipedia.org/wiki/Electronic_Code_Book_Mode)

Abbildung 2: Verschlüsselung und Entschlüsselung im `ECB` Modus

Bildquelle: [https://de.wikipedia.org/wiki/Electronic_Code_Book_Mode](https://de.wikipedia.org/wiki/Electronic_Code_Book_Mode)

Abbildung 3: Verschlüsselung und Entschlüsselung im `CBC` Modus

Bildquelle: [https://de.wikipedia.org/wiki/Cipher_Block_Chaining_Mode](https://de.wikipedia.org/wiki/Cipher_Block_Chaining_Mode)

5

-- 5 of 6 --

Abbildung 4: Verschlüsselung und Entschlüsselung im `OFB` Modus

Bildquelle: [https://de.wikipedia.org/wiki/Output_Feedback_Mode](https://de.wikipedia.org/wiki/Output_Feedback_Mode)

6

-- 6 of 6 --