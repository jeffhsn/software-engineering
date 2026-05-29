# CySec2026_Exercise_02_2_Solutions

> Converted from PDF | Pages: 8

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
0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0

### Lösung:
Da nur das Bit an Position 15 gesetzt ist, sind alle übrigen 63 Bits gleich 0. Das Ergebnis ist im

obigen Kasten eingetragen.

- Wie lautet die Ausgabe der Eingangspermutation IP, aufgeteilt in die beiden Hälften L0 und R0?
1

-- 1 of 8 --

### Abbildung 1: Eingangspermutation
L0:
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0

### R0:
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0

### Lösung:
Anhand der IP-Tabelle wird Bit x15 auf die vorletzte Position der rechten Hälfte R0 abgebildet;

alle anderen Bits bleiben 0.

- Wenden Sie die Expansionsfunktion E(R0) an und geben Sie die Eingaben der acht S-Boxen an.
Berücksichtigen Sie die `XOR`-Verknüpfung mit dem Rundenschlüssel k1 (alle Nullen).

### Abbildung 2: Expansionstabelle
S1: 0 0 0 0 0 0 S5: 0 0 0 0 0 0

### S2: 0 0 0 0 0 0 S6: 0 0 0 0 0 0
S3: 0 0 0 0 0 0 S7: 0 0 0 0 0 0

### S4: 0 0 0 0 0 0 S8: 0 0 0 1 0 0
2

-- 2 of 8 --

### Lösung:
Die Expansion E bildet R0 auf 48 Bit ab. Da der Rundenschlüssel aus Nullen besteht, gilt E(R0) ⊕

k1 = E(R0). Das einzige gesetzte Bit von R0 liegt im Eingabebereich von S8 (Position 4).

- Bestimmen Sie die Ausgabe der S-Boxen vor Anwendung der Permutation P .
Sout:
1 1 1 0 1 1 1 1 1 0 1 0 0 1 1 1
0 0 1 0 1 1 0 0 0 1 0 0 1 0 0 0

### Lösung:
Für jede S-Box Si ergibt sich der Ausgang über Zeile = b1b6 und Spalte = b2b3b4b5. Mit Eingabe

000000 liefert S1, . . . , S7 jeweils den Eintrag in Zeile 0, Spalte 0. Für S8 ist die Eingabe 000100,

also Zeile 0, Spalte 2:

S1(000000) = 14, S2(000000) = 15, S3(000000) = 10, S4(000000) = 7,

S5(000000) = 2, S6(000000) = 12, S7(000000) = 4, S8(000100) = 8.

Die Konkatenation der 4-Bit-Ausgaben ergibt das oben dargestellte Bitmuster.

3

-- 3 of 8 --

- Geben Sie die Ausgabe der Permutation P an.
Abbildung 3: Permutation

### Pout:
1 1 0 1 1 0 0 0 1 1 0 1 1 0 0 0
1 1 0 1 0 0 1 1 1 0 0 1 1 1 0 0

### Lösung:
Anwendung der P -Tabelle auf Sout liefert das obige Ergebnis.

- Bestimmen Sie den Zustand (L1, R1) am Ende der ersten Runde.
L1:
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0

### R1:
1 1 0 1 1 0 0 0 1 1 0 1 1 0 0 0
1 1 0 1 0 0 1 1 1 0 0 1 1 1 0 0

### Lösung:
Nach der Feistel-Vorschrift gilt L1 = R0 und R1 = L0 ⊕ Pout = Pout, da L0 = 0. Beobachtung: Ein

einzelnes gesetztes Eingabebit beeinflusst nach nur einer Runde bereits zahlreiche Bits in R1. Dies

illustriert die Diffusion innerhalb der `DES`-Rundenfunktion.

4

-- 4 of 8 --

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

### S1: 1 1 1 1 1 1 S5: 1 1 1 1 0 1
S2: 1 1 1 1 1 1 S6: 0 1 1 1 1 1

### S3: 1 1 1 1 1 1 S7: 1 1 1 1 1 1
S4: 1 1 1 1 1 1 S8: 1 1 1 1 1 1

### Lösung:
Nach IP landet das Bit in der rechten Hälfte R0. Über die Expansion E wird die betroffene Position

auf den Eingang von S5 und S6 abgebildet (überlappende Expansionsbereiche). Da der Runden-

schlüssel aus Einsen besteht, werden sämtliche Bits nach E noch mit 1 `XOR`-verknüpft. Betroffen

sind ausschließlich S5 (an Position 5) und S6 (an Position 1).

- Geben Sie das Ergebnis (L1, R1) nach der ersten Runde an.
L1:
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0

### R1:
0 0 1 1 1 0 0 0 1 1 0 1 1 1 1 1
1 1 0 1 1 0 0 1 0 1 0 0 0 0 1 1

### Lösung:
L1 = R0 enthält genau das eine gesetzte Bit aus R0. R1 ergibt sich aus L0 ⊕ P (S-Boxen-Ausgabe).

- Wie viele Bits unterscheiden sich gegenüber der Berechnung mit dem Eingang x = 064 (gleiche
Schlüsselkonfiguration)? Welche Aussage lässt sich daraus für den Avalanche-Effekt ableiten?

### Lösung:
Der Vergleich der ersten Runde liefert für x = 064:

### L(0)
1 :
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0

### R(0)
1 :

5

-- 5 of 8 --
0 0 1 1 1 0 0 0 1 1 0 1 1 0 1 1
1 1 1 1 1 0 0 1 1 1 0 0 1 0 1 1

### Die Hamming-Distanz zwischen (L1, R1) und (L(0)
1 , R(0)
1 ) beträgt 5 Bit (ein Bit in L1 aus dem

trivialen Übergang, vier weitere Änderungen in R1 aufgrund veränderter Eingaben in S5 und S6).

Bereits eine Runde demonstriert, dass die Differenz nicht nur durch Bitverschiebung, sondern durch

die nichtlineare Verarbeitung in den S-Boxen verstärkt wird. Über 16 Runden setzt sich dieser Effekt

fort und führt im Mittel zu einer Änderung von etwa der Hälfte aller Chiffratbits (vollständiger

Avalanche-Effekt).

6

-- 6 of 8 --

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

### Lösung:
Die Feistel-Runde

### Li = Ri−1, Ri = Li−1 ⊕ f (Ri−1, ki)
ist auch dann invertierbar, wenn die Rundenfunktion f selbst nicht invertierbar ist (z. B. aufgrund

der nichtlinearen S-Boxen). Wendet man auf den vertauschten Zustand (Ri, Li) erneut eine Feistel-

Runde mit ki an, resultiert (Ri−1, Li−1). Bei der `DES`-Entschlüsselung wird daher nach IP die ge-

wohnte Folge von Rundenoperationen durchlaufen, allerdings mit umgekehrter Schlüsselreihenfolge

k16, k15, . . . , k1. Nach 16 Runden und einem abschließenden Vertauschen liefert IP−1 den Klartext.

Implementierungen benötigen folglich nur einen einzigen Datenpfad für Ver- und Entschlüsselung.

- Stellen Sie die Rekursion einer inversen Feistel-Runde auf, die aus (Li, Ri) und ki den Zustand
(Li−1, Ri−1) berechnet. Wenden Sie diese auf (L1, R1) aus Aufgabe 2 mit dem Rundenschlüssel

k1 = 148 an und tragen Sie L0 und R0 ein.

### L0:
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0

### R0:
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0

### Lösung:
Aus den Rundengleichungen

### Li = Ri−1, Ri = Li−1 ⊕ f (Ri−1, ki)
ergibt sich durch Umstellen die inverse Rundenrekursion:

Ri−1 = Li, Li−1 = Ri ⊕ f (Li, ki).

Für i = 1 gilt also R0 = L1 und L0 = R1 ⊕ f (L1, k1). Da L1 = R0 ist, gilt f (L1, k1) = f (R0, k1).

In Aufgabe 2 wurde L0 = 032 bestimmt, weshalb für die Verschlüsselungsrunde

### R1 = L0 ⊕ f (R0, k1) = f (R0, k1)
gilt. Daraus folgt f (R0, k1) = R1 und somit:

L0 = R1 ⊕ f (R0, k1) = R1 ⊕ R1 = 032.

Das einzige in L1 gesetzte Bit (Position 20) wird unverändert nach R0 übernommen.

7

-- 7 of 8 --

- Vergleichen Sie das berechnete Paar (L0, R0) mit dem Zustand nach der Eingangspermutation IP,
angewandt auf den ursprünglichen Klartext aus Aufgabe 2. Welche Schlussfolgerung ergibt sich für

die Korrektheit der `DES`-Entschlüsselung?

### Lösung:
Der durch die inverse Runde rekonstruierte Zustand stimmt exakt mit dem in Aufgabe 2 nach

der Eingangspermutation berechneten Zustand überein: L0 = 032, und R0 enthält ein einzelnes

gesetztes Bit an genau jener Position, auf die IP das Klartextbit x37 abbildet (Position 20 innerhalb

R0, entsprechend Bit 52 des 64-Bit-Zustands). Anschließendes Anwenden von IP−1 auf (L0, R0)

liefert den ursprünglichen Klartext mit x37 = 1.

Die Rechnung verifiziert die Korrektheit der `DES`-Entschlüsselung am Beispiel einer einzelnen Run-

de: Die inverse Feistel-Runde hebt die zugehörige Verschlüsselungsrunde unabhängig von der kon-

kreten Ausgestaltung der Rundenfunktion f exakt auf. Diese Eigenschaft überträgt sich auf alle

16 Runden und damit auf den vollständigen `DES`-Algorithmus.

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
8

-- 8 of 8 --