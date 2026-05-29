# CySec2026_Exercise_04

> Converted from PDF | Pages: 2

---

### Universität Duisburg-Essen
Fakultät für Informatik

### Professor im Bereich Informatik
Prof. Dr.-Ing. Lucas Davi

### Christian Niesler
Übungsblatt 4

### Vorlesung “Cybersicherheit”
Sommersemester 2026

### Praktische Übung Asymmetrische Kryptografie
`AES` und `RSA`

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
1

-- 1 of 2 --

Übung 1.

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
- Es wird nur RSA eingesetzt.
- Eine Verschlüsselungsbibliothek wie OpenSSL hat auf Ihrem Rechner eine Performance von 100 kbit s−1
für `RSA`. Bei einer `AES` Verschlüsselung kommt Ihr Rechner auf eine Performance von 17 Mbit s−1.

Wie lange dauert es ein Video mit einer Größe von 1 GB zu entschlüsseln? Betrachten Sie jeweils

den Fall für `AES` und `RSA`.

- Woher kommt der Performance-Unterschied zwischen AES und RSA zustande (siehe letzte Auf-
gabe)? Was müsste getan werden, um die Vorteile asymmetrischer Kryptografie mit den Vorteilen

der symmetrischen Kryptografie zu verbinden?

### Praktische Übung GPG (Bonus)
Verschlüsselung ist für die tägliche und sichere Kommunikation z.B. mit ihrer Bank oder einen der

zahlreichen Online-Shops von zentraler Bedeutung. In dieser Übung lernen Sie wie sie beliebige Dateien

mit `RSA` in der Praxis verschlüsseln und mit ihren Freunden austauschen können.

Übung 2.

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

2

-- 2 of 2 --