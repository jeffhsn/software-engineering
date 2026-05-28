# aufgaben

> Converted from PDF | Pages: 4

---

### Universität Duisburg-Essen
Fakultät für Informatik

### Professor im Bereich Informatik
Prof. Dr.-Ing. Lucas Davi

### Christian Niesler
Übungsblatt 1

### Vorlesung “Cybersicherheit”
Sommersemester 2025

### Praktische Übung Klassische Kryptographie
Begriffe

cipher Methode/Algorithmus, der für die Verschlüsselung benutzt wird

ciphertext verschlüsselte Nachricht

plaintext entschlüsselte Nachricht (Klartext)

alphabet Set von Symbolen, welcher für die Ver- und Entschlüsselung genutzt wird.

substitution cipher Eine Cipher, die Symbole durch andere Symbole ersetzt

transposition cipher Eine Cipher, welche die Anordnung von Symbolen im plaintext vertauscht

### Shift Cipher - Caesar
Eine bekannte Chiffre / Cipher ist die Shift-Chiper, auch Caesar genannt. Caesar gehört zu den sub-

stitution ciphers. Hierbei wird jeder Buchstabe aus dem plaintext um eine fixe Anzahl im Alphabet

verschoben. Der Schlüssel 3, bedeutet das die Buchstaben des plaintext um 3 im ciphertext verschoben

sind. Folglich wird ein A zum D, B wird zu E und C wird zu F.

Jedem Buchstaben im Alphabet kann auch eine Ziffer zugeordnet werden, siehe Tabelle 1.

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
Eine caesar chipher kann formal wie folgt definiert werden:

Z26 alle Zahlen von 0 bis 25, das Alphabet wird wie in Tabelle 1 beschrieben zugeordnet.

### Sind x,y,k ∈ Z26
Die Verschlüsselung mit Schlüssel k, des plaintext Buchstaben x:

ek(x) = x + k mod 26

Die Entschlüsselung mit Schlüssel k, des chipertext Buchstaben y:

dk(x) = y − k mod 26

1

-- 1 of 4 --

Übung 1.
1 E 17,4%
2 N 9,78%
3 I 7,55%
4 S 7,27%
5 R 7,00%
6 A 6,51%
7 T 6,15%
8 D 5,08%
9 H 4,76%

10 U 4,35%

11 L 3,44%

12 C 3,06%

13 G 3,01%

14 M 2,53%

15 O 2,51%

16 B 1,89%

17 W 1,89%

18 F 1,66%

19 K 1,21%

20 Z 1,13%

21 P 0,79%

22 V 0,67%

23 ß 0,31%

24 J 0,27%

25 Y 0,04%

26 X 0,03%

27 Q 0,02%

### Tabelle 2: Deutsche Häufigkeitsverteilung
## 1. Installieren Sie auf Ihrem System Cryptool 2 (https://www.cryptool.org/de/ct2/downloads)
## 2. Verschlüsseln Sie den folgenden plaintext mit Schlüssel k = 5 (Shift-Cipher) im Cryptool: Sehr
geehrte Damen und Herren, wilkommen bei der Vorlesung fuer Cybersicherheit. Wir starten mit

einer klassischen Chiffre Caesear. Und nun ein schoenes Zitat von Gaius Julius Caesar. Das beste

Glück, ein schöner Blick, ein kluger Scherz, ein redlich Herz.

## 3. Führen Sie nun mithilfe von Cryptool eine Häufigkeitsanalyse für den plaintext und den ciphertext
durch. Hierbei wird die Häufigkeit für das Auftreten eines jeden Symbols (A-Z) gezählt und in

Relation zur Gesamtlänge der Nachricht gesetzt.

## 4. Vergleichen Sie die resultierenden Balkendiagramme (Häufigkeitsanalyse).
## 5. Nehmen Sie nun verschieden lange deutschsprachige Texte1 und führen Sie mithilfe vom Cryptool
eine Häufigkeitsanalyse durch. Vergleichen Sie die resultierenden Verteilungen mit Tabelle 2. Was

können Sie beobachten?

### Spaltenweise Transposition
Es besteht neben der Substitution auch die Möglichkeit durch Permuatation der Zeichen im plaintext

zu verschlüsseln. Die Griechen nutzten in der Antike eine sogenannte: Skytale. Hierbei handelt es sich

um einen Stab und einen Streifen zB. aus Leder mit der Nachricht. Der Streifen wurde um den Stab

gewickelt. Zur Entschlüsselung der Nachricht bedurfte es die Kenntnis des Stabsdurchmessers.

Ein etwas neueres bekanntes Transpositionsverfahren nennt sich spaltenweise Transposition. Bei der

spaltenweisen Transposition gibt es mehrere Möglichkeiten zu verschlüsseln. Je nach gewählter Leserich-

tung (Spalte/Zeile) und Schlüsselkonvention können bei gleichem Schlüssel unterschiedliche ciphertexte

entstehen. Im Rahmen der Übung stellen wir nun folgende Variante am Beispiel vor:

Gegeben ist folgender plaintext: Beispiele. Dieses soll nun mit dem Schlüssel: `HAL` verschlüsselt und der

ciphertext bestimmt werden. Hierzu wird der plaintext in Spalten aufgeteilt. Aufgrund der Schlüssellänge
3 (`HAL` besteht aus 3 Buchstaben) ordnen wir den Text nun wie folgt in 3 Spalten ein:

## B E I
## S P I
## E L E
Die alphabetische Reihenfolge der Buchstaben im Schlüssel bestimmt die Permutation. Sortiert man die

Buchstaben H A L, alphabetisch erhält man A H L. Folglich steht Spalte 2 (A) im Ciphertext an erster

Stelle, Spalte 1 (H) steht an zweiter Stelle, Spalte 3 (L) steht an dritter Stelle. Es entsteht folgender

### Ciphertext: EBIPSILEE
## E B I
## P S I
## L E E
Übung 2.

## 1. Überlegen Sie sich anhand des obigen Beispiels wie die vorgestellte Variante einer spaltenweisen
Transposition entschlüsselt werden kann.

## 2. Entschlüsseln Sie den folgenden ciphertext: YRCOTPCSILOO mit dem Schlüssel SEC. Beschreiben
Sie Ihr Vorgehen.

1(eine gute Quelle für deutschsprachige Texte ist [https://www.projekt-gutenberg.org/)](https://www.projekt-gutenberg.org/))

2

-- 2 of 4 --

### Polyalphabetische Substitution - Vigenere
Es besteht die Möglichkeit anstelle eines Alphabets wie bei Caesar mehrere Alphabete zu nutzen. Das

im Mittelalter sehr beliebte Verfahren namens Vigenere nutzt ein Schlüsselwort zB: Sicher. Bei Vigenere

kann die Ver- und Entschlüsselung ähnlich zur Shift bzw. Caesar cipher beschrieben werden. Das Schlüs-

selwort S(K=18) I(K=8) C(K=2) H(K=7) E(K=4) R(K=17) gibt die Verschiebung der Buchstaben

an dem entsprechenden Index im plaintext an. Das bedeutet das im konkreten Fall (Schlüssel: Sicher)

der erste Buchstabe mit Caesar und Schlüssel 18, der zweite Buchstabe mit Caesar und Schlüssel 8,

etc. verschlüsselt wird. Im Regelfall, dass der plaintext länger als der Schlüssel ist, wird die Ver- und

Entschlüsselung zyklisch fortgesetzt. Folglich wird der Buchstabe mit Index 7, wieder mit Casear und

Schlüssel 18 (S), und Index 8 mit Schlüssel 8 (I) ver. bzw. entschlüsselt.

Zur Ver und Entschlüsselung hat sich bei Vigenere folgendes Quadrat durchgesetzt:

### Abbildung 1: Vigenère-Quadrat
3

-- 3 of 4 --

Übung 3.

## 1. Verschlüsseln Sie per Hand (ohne Cryptool), aber mithilfe des Vigenere Quadrats folgenden plain-
text: Cybersicherheitsvorlesung

## 2. Nutzen Sie nun Cryptool, und verschlüsseln Sie unterschiedlich lange deutschsprachige Texte2 mit
dem Schlüssel: `SICHER`

## 3. Führen Sie auf die ciphertexte mithilfe von Cryptool eine Häufigkeitsanalyse durch und verglei-
chen Sie Ihre Beobachtungen mit ihren Beobachtungen aus Aufgabe 1. Sollten Sie Unterschiede

feststellen, beschreiben Sie mögliche Ursachen für die Unterschiede.

2(eine gute Quelle für deutschprachige Texte ist [https://www.projekt-gutenberg.org/)](https://www.projekt-gutenberg.org/))

4

-- 4 of 4 --