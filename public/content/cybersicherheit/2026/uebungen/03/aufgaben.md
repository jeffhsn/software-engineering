# CySec2026_Exercise_03

> Converted from PDF | Pages: 4

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

1

-- 1 of 4 --

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

### Brute-Force Angriffe
Übung 3.

`AES` ist die momentan am häufigsten eingesetzte symmetrische Chiffre. In dieser Aufgabe wird die Lang-

zeitsicherheit von `AES` mit 128-Bit-Schlüsseln1 betrachtet. Die Annahme ist, dass der beste bekannte

Angriff die vollständige Schlüsselsuche (auch: Brute-Force-Angriff ) ist, bei dem systematisch alle mögli-

chen Schlüssel durchgetestet werden. Hinweis:Falls Sie keinen Taschenrechner haben, schätzen Sie ihr

Ergebnisse mithilfe der Potenzgesetze und der Annahme 103 is ungefähr 210 ab.

- Wie viele verschiedene 128-Bit-Schlüssel gibt es? Geben Sie das Ergebnis als Zweierpotenz an.
- Wir nehmen an, dass der Angreifer spezielle Hardware, sogenannte Application Specific Inte- grated
Circuits (ASICs) hat, die für `AES`-Schlüsseltests optimiert sind. Ein solcher `ASIC` kann 7 · 108

Schlüssel pro Sekunde überprüfen und der Angreifer verfügt über ein Budget von einer Million

Euro. Ein einzelnes `ASIC` kostet 40€ und es wird ein Overhead (Mehraufwand) von 100% für

die Integration der ASICs angenommen (Bau des Computers, Stromversorgung, Kühlung usw.).

Wie viele ASICs kann man mit dem gegebenen Budget parallel betreiben? Wie lange dauert eine

vollständige Schlüsselsuche im Durchschnitt2? Setzen Sie diese Zeit in Relation zu dem Alter des

Universums, welches ca. 1010 Jahre beträgt.

1Eine 128-Bit-Zahl besteht aus 128 aufeinanderfolgenden Nullen und Einsen

2Im Durchschnitt muss nur die Hälfte aller möglichen Schlüssel getestet werden

2

-- 2 of 4 --

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
Abbildung 1: Beispiel einer konkreten ungünstigen Situation der `ECB` Modus Verschlüsselung

Links: Orginalbild, Mittig: Bild im `ECB`-Modus verschlüsselt, Rechts: Bild in einem verketteten Modus

Bildquelle: [https://de.wikipedia.org/wiki/Electronic_Code_Book_Mode](https://de.wikipedia.org/wiki/Electronic_Code_Book_Mode)

Abbildung 2: Verschlüsselung und Entschlüsselung im `ECB` Modus

Bildquelle: [https://de.wikipedia.org/wiki/Electronic_Code_Book_Mode](https://de.wikipedia.org/wiki/Electronic_Code_Book_Mode)

3

-- 3 of 4 --

Abbildung 3: Verschlüsselung und Entschlüsselung im `CBC` Modus

Bildquelle: [https://de.wikipedia.org/wiki/Cipher_Block_Chaining_Mode](https://de.wikipedia.org/wiki/Cipher_Block_Chaining_Mode)

Abbildung 4: Verschlüsselung und Entschlüsselung im `OFB` Modus

Bildquelle: [https://de.wikipedia.org/wiki/Output_Feedback_Mode](https://de.wikipedia.org/wiki/Output_Feedback_Mode)

4

-- 4 of 4 --