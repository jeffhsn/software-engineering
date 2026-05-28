# loesung

> Converted from PDF | Pages: 6

---

### Universität Duisburg-Essen
Fakultät für Informatik

### Professor im Bereich Informatik
Prof. Dr.-Ing. Lucas Davi

### Christian Niesler
Übungsblatt 3

### Vorlesung “Cybersicherheit”
Sommersemester 2025

Praktische Übung Asymmetrische und Symmetrische Kryptografie

### Betriebsmodi von Blockchiffren
Neben der geläufigen blockweisen Verschlüsselung (sog. `ECB` Mode), gibt es noch weitere Betriebsmodi

für Blockchiffren u.a. den `CBC` und `OFB` Modus. Der `ECB`-Modus hat einige negative Effekte u.a.

bleiben einheitliche und großflächige Bereiche, welche sich im Chiffrat über mehrere Blöcke strecken,

erkennbar. Dadurch kann die eigentlich sichere symmetrische Verschlüsselung im `ECB` Mode in einer

konkreten Anwendung unsicher werden. Ein ungünstiges Szenario der Verschlüsselung im `ECB` Mode

wird in Abbildung: 1 dargestellt. In Abbildung 2, 3 und 4 sind die einzelnen Betriebsmodi dargestellt.

Der ⊕ Operator stellt eine gewöhnliche `XOR` Operation dar.

Übung 1.

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
1

-- 1 of 6 --

Lösung 1.

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

y3 = s3 ⊕ x3 = 00111 ⊕ 11010 = 11101

y4 = s4 ⊕ x4 = 01101 ⊕ 00110 = 01011

### Chiffrat: y = 10111 01101 11101 01011
Abbildung 1: Beispiel einer konkreten ungünstigen Situation der `ECB` Modus Verschlüsselung

Links: Orginalbild, Mittig: Bild im `ECB`-Modus verschlüsselt, Rechts: Bild in einem verketteten Modus

Bildquelle: [https://de.wikipedia.org/wiki/Electronic_Code_Book_Mode](https://de.wikipedia.org/wiki/Electronic_Code_Book_Mode)

2

-- 2 of 6 --

Abbildung 2: Verschlüsselung und Entschlüsselung im `ECB` Modus

Bildquelle: [https://de.wikipedia.org/wiki/Electronic_Code_Book_Mode](https://de.wikipedia.org/wiki/Electronic_Code_Book_Mode)

Abbildung 3: Verschlüsselung und Entschlüsselung im `CBC` Modus

Bildquelle: [https://de.wikipedia.org/wiki/Cipher_Block_Chaining_Mode](https://de.wikipedia.org/wiki/Cipher_Block_Chaining_Mode)

Abbildung 4: Verschlüsselung und Entschlüsselung im `OFB` Modus

Bildquelle: [https://de.wikipedia.org/wiki/Output_Feedback_Mode](https://de.wikipedia.org/wiki/Output_Feedback_Mode)

3

-- 3 of 6 --

### AES und RSA
Sie haben in der Vorlesung das symmetrische Verfahren `AES` und das asymmetrische Verfahren `RSA`

kennengelernt. Im Folgenden wird das grundlegende Vorgehen bei `RSA` einmal zusammengefasst.

### Schlüsselgenerierung in 5 Schritten:
## 1. Wählen Sie zwei große Primzahlen p und q.
## 2. Berechnen Sie das Produkt N aus beiden Zahlen (N = p · q).
## 3. Berechnen Sie Eulers Totient T = (p − 1) · (q − 1).
## 4. Wählen Sie zwei Zahlen ’e’ und ’d’, wobei gilt: (e · d) mod T = 1
## 5. Public-Key: (N, e) und Private-Key: (N, d)
Hinweise

- Die Zahl ’e’ muss kleiner als der Totient T sein. (e < T )
- Die Zahl ’e’ muss coprime (teilerfremd) von T und N sein.
- Achten Sie darauf, dass für ’d’: (e · d) mod T = 1 gilt.
- Für die Zahl/Buchstabe x (plaintext) muss gelten x < N
Verschlüsseln und Entschlüsseln mit `RSA`

### Der Wert x wird verschlüsselt:
y = xe mod N

### Der Wert y wird entschlüsselt indem:
x = yd mod N

### A 0
B 1

### C 2
D 3

### E 4
F 5

### G 6
H 7

### I 8
J 9

### K 10
L 11

### M 12
N 13

### O 14
P 15

### Q 16
R 17

### S 18
T 19

### U 20
V 21

### W 22
X 23

### Y 24
Z 25

### Tabelle 1: Caesar Alphabet, assigned to numbers (0-25)
Übung 2.

- Gegeben ist eine RSA-Verschlüsselung mit: p = 2, q = 7, N = 14, T = 6, e = 5 und d = 11. Welche
Zahlenpaare bilden jeweils den Private-Key, welche den Public-Key?

- Nutzen Sie die Werte aus a) und die Buchstaben-Zuordnung aus Tabelle 1 um die Nachricht
’`BCD`’ mittels `RSA` zu verschlüsseln. Prüfen Sie, indem Sie den ciphertext entschlüsseln und mit

dem plaintext vergleichen.

- Vergleichen Sie symmetrische und asymmetrische Kryptografie. Welche Vor- und Nachteile bietet
die Nutzung von symmetrisches und asymmetrischer Kryptografie. (Es ist ein allgemeiner Ver-

gleich ausreichend, Sie können aber auch am konkreten Beispiel mit Vertretern von symmetrischer

Verschlüsselung (z.B. `AES`) und asymmetrischer Verschlüsselung (z.B. `RSA`) argumentieren.)

- Ein mittelständisches Unternehmen hat 120 Mitarbeiter. Wie viele Schlüssel werden benötigt damit
alle Mitarbeiter auf direktem Wege (ohne weitere Infrastruktur) mit allen anderen Mitarbeitern

kommunizieren können. Betrachten Sie hierzu jeweils den Fall:

- Es wird nur AES eingesetzt.
4

-- 4 of 6 --

- Es wird nur RSA eingesetzt.
- Eine Verschlüsselungsbibliothek wie OpenSSL hat auf Ihrem Rechner eine Performance von 100 kbit s−1
für `RSA`. Bei einer `AES` Verschlüsselung kommt Ihr Rechner auf eine Performance von 17 Mbit s−1.

Wie lange dauert es ein Video mit einer Größe von 1 GB zu entschlüsseln? Betrachten Sie jeweils

den Fall für `AES` und `RSA`.

- Woher kommt der Performance-Unterschied zwischen AES und RSA zustande (siehe letzte Auf-
gabe)? Was müsste getan werden, um die Vorteile asymmetrischer Kryptografie mit den Vorteilen

der symmetrischen Kryptografie zu verbinden?

Lösung 2.

- Public-Key (n,e) = (14,5)
Private-Key (d) bzw. (n,d) = (11) bzw. (14, 11)

- BCD -> 123
y1 = 15 mod 14 ≡ 1 = B

y2 = 25 mod 14 ≡ 4 = E

y3 = 35 mod 14 ≡ 5 = E

### Chiffrat: y = BEF
Kontrolle:

x1 = 111 mod14 = 1 = B

x2 = 411 mod14 = 2 = C

x3 = 511 mod14 = 3 = D

- Vor- und Nachteile:
Tabelle 2: Symmetrische Verschlüsselung

### Vorteile Nachteile
Performance (oftmals einfach in Software und

Hardware zu implementieren).

### Gleicher Schlüssel für Ver und Entschlüsse-
lung.

### Ver- und Entschlüsselungs Funktion sehr ähn-
lich, Entschlüsselung ist die Inverse Operati-

on von Verschlüsselung.

### Keine Möglichkeit nachzuweisen, dass eine
Nachricht tatsächlich vom Sender stammt

(digitale Signaturen, Thema nachfolgender

Vorlesung).

### Problem der Schlüsselverteilung, alle Kom-
munikationskanäle bedürfen einen eigenen

Schlüssel.

### Tabelle 3: Asymmetrische Verschlüsselung
Vorteile Nachteile

Weniger Schlüssel notwendig.

### Nonrepudiation (Nachweisbarkeit), Integrität
kann durch digitale Signaturen gewährleistet

werden.

### Identification(identifikation), man kann Per-
sonen dank Challenge-Response Verfahren

identifizieren.

Schlechte Performance.

5

-- 5 of 6 --

- AES:
Wenn jeder der 120 Mitarbeiter mit allen 119 anderen Mitarbeitern geheim kommunizieren muss, gibt

es : 120 ∗ 119 Kommunikationskanäle. Pro Kanal gibt es aber nur einen Schlüssel, daher

120∗119
2 = 14280
2 = 7140

### Allgemein gilt für n Personen:
n ∗ (n − 1)

2

### RSA:
Jeder Mitarbeiter hat einen Private- und Public Key, wobei der Public Key mit allen anderen geteilt

wird. Daher gibt es 120 Schlüsselpaare tabular
8 ∗ 109bits

105bits/sek ≈ 8 ∗ 104sek
8 ∗ 104sek = 80000sek = 222/9Stunden

### AES:
8 ∗ 109bits

176bits/sek ≈ 8

17 ∗ 103sek

471sek ≈ 7, 85min = 7min51sek

### Praktische Übung GPG (Bonus)
Verschlüsselung ist für die tägliche und sichere Kommunikation z.B. mit ihrer Bank oder einen der

zahlreichen Online-Shops von zentraler Bedeutung. In dieser Übung lernen Sie wie sie beliebige Dateien

mit `RSA` in der Praxis verschlüsseln und mit ihren Freunden austauschen können.

Übung 3.

- Installieren Sie auf Ihrem System GPG1. Falls Sie Windows nutzen, empfehle ich Ihnen: GPG4Win2,
welches kostenlos zur Verfügung steht.

- Erstellen Sie ein RSA Schlüsselpaar (Public und Private) mit mindestens 2048 Bit Schlüssellänge.
Hierzu finden Sie bei GPG4Win detaillierte Informationen auf: [https://files.gpg4win.org/](https://files.gpg4win.org/)

doc/gpg4win-compendium-de.pdf.

- Suchen Sie sich einen Partner oder eine Partnerin mit der Sie in Zukunft geheime Nachrichten
austauschen möchten. Tauschen Sie Ihre öffentlichen `RSA` Schlüssel aus z.B. auf einem `USB`-Stick

oder per Mail. Importieren Sie den öffentlichen Schlüssel mit dem Vornamen Ihres Partners in

`GPG`.

- Verschlüsseln Sie eine Datei (z.B. Textdatei/Notepad) mit geheimem Inhalt und schicken Sie diese
über das Internet (z.B. Mail) an Ihren Partner/in.

- Entschlüsseln Sie die empfangene Nachricht.
1[https://gnupg.org/](https://gnupg.org/)

2[https://www.gpg4win.de/version4-de.html](https://www.gpg4win.de/version4-de.html)

6

-- 6 of 6 --