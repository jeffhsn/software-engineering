# loesung

> Converted from PDF | Pages: 20

---

© `SYSSEC`, Prof. Dr. Lucas Davi

‹bungsblatt 4:

### Eine kleine Zusammenfassung
Christian Niesler

### Tristan Lˆding
Firas Khamis

### Fakult‰t f¸r Informatik
Arbeitsgruppe Systemsicherheit [https://www.syssec.wiwi.uni-due.de/](https://www.syssec.wiwi.uni-due.de/)

### Universit‰t Duisburg-Essen
‹bung Cybersicherheit

-- 1 of 20 --

paluno – The Ruhr Institute for Software Technology

@ `SYSSEC`, Prof. Dr. Lucas Davi

### Fragen zu Vorlesungsinhalten, Organisation,
Ablauf, … ?

2

-- 2 of 20 --

© `SYSSEC`, Prof. Dr. Lucas Davi

## SYSTEMSICHERHEIT
Prof. Dr. L. Davi

### Aufgabe 1
Vorlesung Cybersicherheit SoSe 2023

- Das Kerckhoffs’sche Prinzip spielt in der modernen Kryptographie eine zentrale Rolle. Geben Sie es mit Ihren
eigenen Worten wieder.

Es besagt dass die Sicherheit eines Kryptographischen Algorithmus nur auf der Geheimhaltung des

Schl¸ssels beruhen soll und nicht auf der Geheimhaltung des Algorithmus selbst

- Bsp.: C‰sar-Verschl¸sselung bei bekanntem Algorithmus vollkommen unsicher, RSA trotz komplett
bekanntem Algorithmus sehr sicher

-- 3 of 20 --

© `SYSSEC`, Prof. Dr. Lucas Davi

## SYSTEMSICHERHEIT
Prof. Dr. L. Davi

### Aufgabe 1
Vorlesung Cybersicherheit SoSe 2023

- In der Vergangenheit wurden h‰ufig Kryptosysteme entworfen, deren Sicherheit entgegengesetzt zum
Kerckhoffs’schen Prinzip auf der Geheimhaltung des Designs beruhte. Wie nennt man diesen Ansatz?

### Security by Obscurity
-- 4 of 20 --

© `SYSSEC`, Prof. Dr. Lucas Davi

## SYSTEMSICHERHEIT
Prof. Dr. L. Davi

### Aufgabe 1
Vorlesung Cybersicherheit SoSe 2023

- Die Wissenschaft der Kryptologie l‰sst sich in die Untergebiete Kryptographie und Kryptanalyse
gliedern. Beschreiben Sie beide kurz mit Ihren eigenen Worten.

- Kryptographie: Befasst sich mit dem Schutz von Informationen z.B. durch Verschl¸sselung von
Nachrichten

- Kryptanalyse: Befasst sich mit dem Brechen von Kryptosystemen
-- 5 of 20 --

© `SYSSEC`, Prof. Dr. Lucas Davi

## SYSTEMSICHERHEIT
Prof. Dr. L. Davi

### Aufgabe 1
Vorlesung Cybersicherheit SoSe 2023

- Skizzieren Sie die klassische Ausgangssituation zweier Kommunikationspartner Alice und Bob, die
¸ber einen unsicheren Kanal miteinander kommunizieren. Erkl‰ren Sie anhand dessen, warum die

Kommunikationspartner kryptographische Algorithmen einsetzen m¸ssen.

### Alice Bob
Oscar

### Oscar kˆnnte alle Kommunikation
mitlesen wenn nicht verschl¸sselt wird

-- 6 of 20 --

© `SYSSEC`, Prof. Dr. Lucas Davi

## SYSTEMSICHERHEIT
Prof. Dr. L. Davi

### Aufgabe 1
Vorlesung Cybersicherheit SoSe 2023

- Ordnen Sie den in der Kryptographie sehr wichtigen Variablen bzw. Funktionen e(∑), d(∑), x, y,
k, K und |K| ihre jeweiligen Bezeichnungen zu. Zur Auswahl stehen: Anzahl mˆglicher Schl¸ssel,

Schl¸ssel, Verschl¸sselung, Schl¸sselraum, Chiffrat/Ciphertext, Entschl¸sselung und Klartext.

- Klartext: x, Chiffrat: y
- Schl¸ssel: K
- Verschlüsselung: e(∙)
- Entschlüsselung: d(∙)
- Schl¸sselraum: K
- Anzahl mˆglicher Schl¸ssel: |K|
-- 7 of 20 --

© `SYSSEC`, Prof. Dr. Lucas Davi

## SYSTEMSICHERHEIT
Prof. Dr. L. Davi

### Aufgabe 2
Vorlesung Cybersicherheit SoSe 2023

- Wie viele verschiedene 128-Bit-Schl¸ssel gibt es? Geben Sie das Ergebnis als Zweierpotenz an.
- |K| = 2128
-- 8 of 20 --

© `SYSSEC`, Prof. Dr. Lucas Davi

## SYSTEMSICHERHEIT
Prof. Dr. L. Davi

### Aufgabe 2
Vorlesung Cybersicherheit SoSe 2023

- Wir nehmen an, dass der Angreifer spezielle Hardware, sogenannte Application Specific Integrated Circuits (ASICs)
hat, die f¸r `AES`-Schl¸sseltests optimiert sind. Ein solcher `ASIC` kann 7 ∑ 108 Schl¸ssel pro Sekunde ¸berpr¸fen und der

Angreifer verfügt über ein Budget von einer Million Euro. Ein einzelnes `ASIC` kostet 40€ und es wird ein Overhead

(Mehraufwand) von 100% f¸r die Integration der ASICs angenommen (Bau des Computers, Stromversorgung, K¸hlung

usw.). Wie viele ASICs kann man mit dem gegebenen Budget parallel betreiben? Wie lange dauert eine vollst‰ndige

Schl¸sselsuche im Durchschnitt? Setzen Sie diese Zeit in Relation zu dem Alter des Universums, welches ca. 1010 Jahre

betr‰gt.

- 1x ASIC = 40€ + 100% Overhead (40€) = 80€ pro ASIC inkl. Overhead
- Bei Budget von 106 €: 106/80 = 12.500 ASICS kˆnnen gekauft werden
- Folglich kˆnnen also 7 x 108 x 12.500 = 8,75 x 1012 Schl¸ssel pro Sekunde getestet werden
- 2127 Schl¸ssel m¸ssen ausprobiert werden
- Demnach Schl¸sselsuche: 2127
8,75⋅1012 = 1,94 ⋅ 1025 Sekunden = 6,16 ⋅ 1017 Jahre

- Dies ist etwa 107 -mal l‰nger als das Universum alt ist
-- 9 of 20 --

© `SYSSEC`, Prof. Dr. Lucas Davi

## SYSTEMSICHERHEIT
Prof. Dr. L. Davi

### Aufgabe 3
Vorlesung Cybersicherheit SoSe 2023

- Welches Alphabet kˆnnen in der oben genannten Funktion xi , yi , si annehmen.
- ∑ = {0, 1}
-- 10 of 20 --

© `SYSSEC`, Prof. Dr. Lucas Davi

## SYSTEMSICHERHEIT
Prof. Dr. L. Davi

### Aufgabe 3
Vorlesung Cybersicherheit SoSe 2023

- Angenommen wir ersetzten nun das bin‰re durch das lateinische Alphabet A, . . . , Z, wobei die
Buchstaben durch die Zahlen 0, 1, . . . , 25 repr‰sentiert werden. Wie m¸sste sich der Modulus

m zur oben genannten Funktion ver‰ndern?

- m= 26
-- 11 of 20 --

© `SYSSEC`, Prof. Dr. Lucas Davi

## SYSTEMSICHERHEIT
Prof. Dr. L. Davi

### Aufgabe 3
Vorlesung Cybersicherheit SoSe 2023

- Angenommen wir ersetzten nun das bin‰re durch das lateinische Alphabet A, . . . , Z, wobei die
Buchstaben durch die Zahlen 0, 1, . . . , 25 repr‰sentiert werden. Wie m¸sste sich der Modulus

m zur oben genannten Funktion ver‰ndern?

- Si= {0, 1, 2, … , 25}
-- 12 of 20 --

© `SYSSEC`, Prof. Dr. Lucas Davi

## SYSTEMSICHERHEIT
Prof. Dr. L. Davi

### Aufgabe 3
Vorlesung Cybersicherheit SoSe 2023

- Was m¸sste sich an der Entschl¸sselungsfunktion ver‰ndern, damit diese korrekt bleibt?
- yi = esi (xi) = xi + si mod 26
- xi = dsi (yi) = yi - si mod 26
-- 13 of 20 --

© `SYSSEC`, Prof. Dr. Lucas Davi

## SYSTEMSICHERHEIT
Prof. Dr. L. Davi

### Aufgabe 3
Vorlesung Cybersicherheit SoSe 2023

- Entschl¸sseln Sie den folgenden Chiffretext HWHWZB mit dem Key BSASRP.
- H: 7 B: 1 7 – 1 mod 26 = 6 G
- W: 22 S: 18 22 – 18 mod 26 = 4 E
- H: 7 A: 0 7 – 0 mod 26 = 7 H
- W: 22 S: 18 22 – 18 mod 26 = 4 E
- Z: 25 R: 17 25 – 17 mod 26 = 8 I
- B: 1 P: 15 1 – 15 mod 26 = 12 M
-- 14 of 20 --

© `SYSSEC`, Prof. Dr. Lucas Davi

## SYSTEMSICHERHEIT
Prof. Dr. L. Davi

### Aufgabe 4
Vorlesung Cybersicherheit SoSe 2023

- Zeichnen Sie ein Blockdiagram der Chiffre.
x

### K
y

### S1
+

-- 15 of 20 --

© `SYSSEC`, Prof. Dr. Lucas Davi

## SYSTEMSICHERHEIT
Prof. Dr. L. Davi

### Aufgabe 4
Vorlesung Cybersicherheit SoSe 2023

- Wie oft kommt jeder 4-Bit Ausgangswert der S-Box bei 6-Bit Eingabewerten vor, sofern die Zuordnung
gleichverteilt ist?

- 4 mal, einmal pro Zeile der S-Box
-- 16 of 20 --

© `SYSSEC`, Prof. Dr. Lucas Davi

## SYSTEMSICHERHEIT
Prof. Dr. L. Davi

### Aufgabe 4
Vorlesung Cybersicherheit SoSe 2023

- Wie viele Kandidaten erhalt man dementsprechend f¸r k, wenn ein einziges Klartext-Chiffrat- Paar
(x1 , y1) gegeben ist?

- 4 Kandidaten
-- 17 of 20 --

© `SYSSEC`, Prof. Dr. Lucas Davi

## SYSTEMSICHERHEIT
Prof. Dr. L. Davi

### Aufgabe 4
Vorlesung Cybersicherheit SoSe 2023

- Bestimmen Sie k f¸r die gegebenen Klartext-Chiffrat-Paare (x1 , y1) und (x2 , y2).
y1= 1100

## 1. Zeile: 010 110
## 2. Zeile: 010 101
## 3. Zeile: 110 010
## 4. Zeile: 100 011
K= x1 `XOR` S1-1 (y1) x1= 111 000

## 1. 111 000 XOR 010 110 = 101 110
## 2. 111 000 XOR 010 101 = 101 101
## 3. 111 000 XOR 110 010 = 001 010
## 4. 111 000 XOR 100 011 = 011 011
-- 18 of 20 --

© `SYSSEC`, Prof. Dr. Lucas Davi

## SYSTEMSICHERHEIT
Prof. Dr. L. Davi

### Aufgabe 4
Vorlesung Cybersicherheit SoSe 2023

### Nun f¸r das zweite Paar (x2, y2) x2= 000 111 y2= 0110
## 1. Zeile: 010 100
## 2. Zeile: 010 011
## 3. Zeile: 101 010
## 4. Zeile: 111 101
S1-1 (y2) =

### K= x2 XOR S1-1 (y2) x2= 000 111
## 1. 000 111 XOR 010 100 = 010 011
## 2. 000 111 XOR 010 011 = 010 100
## 3. 000 111 XOR 101 010 = 101 101
## 4. 000 111 XOR 111 101 = 111 010
## 1. 111 000 XOR 010 110 = 101 110
## 2. 111 000 XOR 010 101 = 101 101
## 3. 111 000 XOR 110 010 = 001 010
## 4. 111 000 XOR 100 011 = 011 011
Der einzig g¸ltige Schl¸ssel f¸r

beide Klartext-Chiffrat-Paare ist

### K= 101 101
-- 19 of 20 --

© `SYSSEC`, Prof. Dr. Lucas Davi

Vielen Dank f¸r Ihre Aufmerksamkeit!

‹bung Cybersicherheit SoSe 2025

### Christian Niesler
Tristan Lˆding

### Firas Khamis
Fakult‰t f¸r Informatik

Arbeitsgruppe Systemsicherheit [https://www.syssec.wiwi.uni-due.de/](https://www.syssec.wiwi.uni-due.de/)

### Universit‰t Duisburg-Essen
-- 20 of 20 --