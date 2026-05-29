# CySec2026_Exercise_02_2

> Converted from PDF | Pages: 5

---

### Universität Duisburg-Essen
Fakultät für Informatik

### Professor im Bereich Informatik
Prof. Dr.-Ing. Lucas Davi

### Tristan Löding
Christian Niesler

Übungsblatt 2.2

### Vorlesung “Cybersicherheit”
Sommersemester 2026

### Praktische Übung: Data Encryption Standard (DES)
Hinweis. Die für die Berechnungen benötigten S-Boxen sind ab Seite 17 im `NIST`-Standard zu finden.

### Aufgabe 1: Berechnung der ersten DES-Runde
Aufgabe 1.

In dieser Aufgabe wird die erste Runde des `DES` Schritt für Schritt berechnet. Es gelte für die Klartextbits

xi (Zählung von i = 1 bis i = 64 von links):

xi = 0 ∀ i ∈ {1, . . . , 64} \ {15}, x15 = 1.

Der Schlüssel k und sämtliche Rundenschlüssel ki bestehen vollständig aus Nullen.

- Geben Sie den Startzustand x vor Anwendung der Eingangspermutation IP an (4 Zeilen zu je
16 Bit).

x:

- Wie lautet die Ausgabe der Eingangspermutation IP, aufgeteilt in die beiden Hälften L0 und R0?
Abbildung 1: Eingangspermutation

1

-- 1 of 5 --

### L0:
R0:

- Wenden Sie die Expansionsfunktion E(R0) an und geben Sie die Eingaben der acht S-Boxen an.
Berücksichtigen Sie die `XOR`-Verknüpfung mit dem Rundenschlüssel k1 (alle Nullen).

### Abbildung 2: Expansionstabelle
S1: S5:

### S2: S6:
S3: S7:

### S4: S8:
- Bestimmen Sie die Ausgabe der S-Boxen vor Anwendung der Permutation P .
Sout:

2

-- 2 of 5 --

- Geben Sie die Ausgabe der Permutation P an.
Abbildung 3: Permutation

### Pout:
- Bestimmen Sie den Zustand (L1, R1) am Ende der ersten Runde.
L1:

### R1:
3

-- 3 of 5 --

### Aufgabe 2: Avalanche-Effekt im DES
Aufgabe 2.

Für eine gute Blockchiffre ist es wünschenswert, dass bei der Veränderung eines einzelnen Eingangsbits

möglichst viele Ausgangsbits verändert werden. Diese Eigenschaft wird auch Diffusion bzw. Avalanche-

Effekt genannt. Im Folgenden überprüfen wir die Diffusionseigenschaft des `DES`. Wir betrachten dazu

eine Bitfolge als Eingang zum `DES`, bei der das Bit an der Stelle x37 = 1 ist (Zählung von x1 bis x64)

und alle anderen Bits gleich 0 sind. Die 56 Schlüsselbits (und somit auch alle Rundenschlüssel) sind alle

auf 1 gesetzt.

- Auf welche S-Boxen wirkt sich das Bit x37 in der ersten Runde aus? Wie sehen die Eingangsbits
der acht S-Boxen aus?

### S1: S5:
S2: S6:

### S3: S7:
S4: S8:

- Geben Sie das Ergebnis (L1, R1) nach der ersten Runde an.
L1:

### R1:
- Wie viele Bits unterscheiden sich gegenüber der Berechnung mit dem Eingang x = 064 (gleiche
Schlüsselkonfiguration)? Welche Aussage lässt sich daraus für den Avalanche-Effekt ableiten?

4

-- 4 of 5 --

### Aufgabe 3: DES-Entschlüsselung
Aufgabe 3.

Bei der `DES`-Entschlüsselung wird der gleiche Algorithmus wie bei der Verschlüsselung verwendet, ledig-

lich die Rundenschlüssel werden in umgekehrter Reihenfolge angewendet. Diese Eigenschaft ergibt sich

unmittelbar aus der Symmetrie der Feistel-Struktur. Wir setzen die Berechnung aus Aufgabe 2 fort:

Nach einer Verschlüsselungsrunde mit x37 = 1, allen übrigen Klartextbits gleich 0 und einem aus Einsen

bestehenden Schlüssel liegt der Zustand (L1, R1) vor. Wir zeigen nun, dass eine inverse Feistel-Runde

mit dem Rundenschlüssel k1 = 148 den vorhergehenden Zustand (L0, R0) exakt rekonstruiert.

- Erläutern Sie, warum DES-Entschlüsselung denselben Algorithmus wie die Verschlüsselung ver-
wenden kann. In welcher Reihenfolge werden die Rundenschlüssel angewendet?

- Stellen Sie die Rekursion einer inversen Feistel-Runde auf, die aus (Li, Ri) und ki den Zustand
(Li−1, Ri−1) berechnet. Wenden Sie diese auf (L1, R1) aus Aufgabe 2 mit dem Rundenschlüssel

k1 = 148 an und tragen Sie L0 und R0 ein.

### L0:
R0:

- Vergleichen Sie das berechnete Paar (L0, R0) mit dem Zustand nach der Eingangspermutation IP,
angewandt auf den ursprünglichen Klartext aus Aufgabe 2. Welche Schlussfolgerung ergibt sich für

die Korrektheit der `DES`-Entschlüsselung?

### Zusammenfassung
- DES wurde 1972 ausgeschrieben, 1977 standardisiert und basiert auf einer 16-rundigen Feistel-Struktur
mit 56 Bit effektiver Schlüssellänge.

- Die Rundenfunktion kombiniert Expansion, Schlüsseladdition, nichtlineare S-Boxen und eine bitweise
Permutation.

- Die S-Boxen sind die einzigen nichtlinearen Komponenten und damit zentral für die Sicherheit des
Verfahrens.

- Die Diffusion wird durch Permutationen und die wiederholte Anwendung der Rundenfunktion er-
reicht; bereits nach einer Runde wirkt sich ein einzelnes Eingabebit auf mehrere Ausgabebits aus.

- Aufgrund der kurzen Schlüssellänge gilt DES heute als unsicher; in der Praxis kommen 3DES (über-
gangsweise) oder `AES` zum Einsatz.

Vielen Dank an Prof. Dr.-Ing. Christof Paar (`MPI`-SP / `RUB`) sowie an M. Sc. Johannes Tobisch und

- Sc. Paul Staat für die ursprünglichen Aufgabenstellungen, auf denen dieses Übungsblatt basiert.
5

-- 5 of 5 --