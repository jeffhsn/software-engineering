# aufgaben

> Converted from PDF | Pages: 3

---

### Universität Duisburg-Essen
Fakultät für Informatik

### Professor im Bereich Informatik
Prof. Dr.-Ing. Lucas Davi

### Christian Niesler
Übungsblatt 4

### Vorlesung “Cybersicherheit”
Sommersemester 2025

### Eine kleine Zusammenfassung
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

### Brute-Force Angriff auf AES
Übung 2.

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

1

-- 1 of 3 --

### Anpassung einer Stromchiffre
Übung 3.

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

### Ein wenig DES
Abbildung 1: SBox #1 von `DES`. Hier wird ein Eingabewert mit 6-Bit angenommen, welcher einen 4-Bit

Ausgabewert durch Substitution erzeugt.

Übung 4.

Gegeben sei eine (unsichere) stark reduzierte Chiffre mit den 6-Bit breiten Eingaben x und k und der

4-Bit breiten Ausgabe y = S1(x ⊕ k), wobei S1 der ersten `DES` S-Box entspricht. Sie kennen außerdem

die beiden folgenden Klartext-Chiffrat-Paare:

x1 = 111000, x2 = 000111

y1 = 1100 , y2 = 0110

2

-- 2 of 3 --

- Zeichnen Sie ein Blockdiagram der Chiffre.
- Wie oft kommt jeder 4-Bit Ausgangswert der S-Box bei 6-Bit Eingabewerten vor, sofern die Zu-
ordnung gleichverteilt ist?

- Wie viele Kandidaten erhalt man dementsprechend für k, wenn ein einziges Klartext-Chiffrat- Paar
(x1 , y1) gegeben ist?

- Bestimmen Sie k für die gegebenen Klartext-Chiffrat-Paare (x1 , y1) und (x2 , y2).
3

-- 3 of 3 --