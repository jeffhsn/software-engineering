# zusatzhilfe

> Converted from PDF | Pages: 2

---

### Universität Duisburg-Essen
Fakultät für Informatik

### Professor im Bereich Informatik
Prof. Dr.-Ing. Lucas Davi

### Christian Niesler
Zusatzhilfe Modulo und Binärrechnung

### Vorlesung “Cybersicherheit”
Sommersemester 2025

### Grundlagenübung - Modulo- und Binärrechnung
Modulares Rechnen - Rechnen mit Resten

### Beispiele aus dem Alltag
## 1. Heute ist Donnerstag. Welcher Wochentag ist in 47 Tagen?
## 2. Es ist der Monat März. Welcher Monat ist in 50 Monaten?
## 3. Es ist jetzt 12 Uhr. Wie spät ist es in 100 Stunden?
Wie lassen sich diese Aufgaben systematisch berechnen?

### Beispiel 1)
Eine Woche hat 7 Tage, d.h. der Wochentag wiederholt sich alle 7 Tage. Um herauszufinden, welcher

Wochentag der 47. Tag nach einem Donnerstag ist, können wir von den 47 Tagen zunächst die Anzahl

aller Tage, die in eine ganze Woche passen abziehen. Doch wie viele ganze Wochen passen in 47 Tage?

Um das zu berechnen dividieren (teilen) wir die Anzahl der Tage (47) durch die Anzahl der Tage, die

in eine Woche passen (7) und betrachten die Zahl vor dem Komma (den „Ganzzahlquotienten“): Das

Ergebnis lautet: 47 : 7 = 6,714285... Diesen Wert bezeichnen wir als Rest der Division durch 7. Wir

können also sagen: 47 : 7 = 6 + Rest 5

Allgemein lässt sich das Ergebnis der Division einer Zahl x durch den Divisor d als Summe aus dem

Produkt des Ganzzahlquotienten mit dem Divisor d und dem Rests r der Division beschreiben:

x

d = q · d + r Beispiel : 47
7 = 6 · 7 + 5 (1)

Die Rest-Funktion wird auch als Modulo-Funktion bezeichnet, wobei der Divisor auch als „der Modul“

bezeichnet wird. Für die Berechnung des Rests r der Division einer Zahl x durch den Divisor d nutzen

wir die übliche Schreibweise „mod“:

r = x mod d Beispiel : 47 mod 7 = 5 (2)

Übung 1.

### Beantworte die folgenden Fragen:
(a) Es ist der Monat April. Welcher Monat ist in 50 Monaten?

(b) Es ist jetzt 13 Uhr. Wie spät ist es in 100 Stunden?

1

-- 1 of 2 --
1 Binärrechnung - Rechnen mit 0 und 1

### Die Potenzschreibweise
Dezimal Man kann Zahlen anhand ihrer Basis darstellen. Im Dezimalsystem haben wir 10 Zahlen zur

Verfügung, von 0 bis 9. Mit 2 Stellen können wir also 10 * 10 = 100 Zahlen darstellen. 100 Zahlen?

Aber 100 hat doch drei Stellen! Dieser Einwand stimmt. Da wir jedoch mit der Zahl 0 beginnen,

ist 0 die 1. Zahl, 1 die 2. Zahl, ... 98 die 99. Zahl und 99 die 100. Zahl. Mit 3 Stellen können wir

10 * 10 * 10 = 1000 Zahlen darstellen. Jede Stelle entspricht einer 10-er Potenz. Wir nehmen die

Zahl 372 und schreiben sie als kleine Rechnung auf: 372 = 3 ∗ 100 + 7 ∗ 10 + 2 ∗ 1. Das kann man

jetzt noch anders darstellen als: 3 ∗ 102 + 7 ∗ 101 + 2 ∗ 100.

Binär Wendet man die Potenzschreibweise bei binären Zahlen an, so muss man eine andere Basis wählen.

Es gibt ja nur 2 verschiedene Ziffern, 0 und 1. Also nehmen wir als Basis 2. Die Zahl 1011 schreibt

sich dann als 1 ∗ 23 + 0 ∗ 22 + 1 ∗ 21 + 1 ∗ 20

Umrechnung binär nach dezimal Die Potenzschreibweise kann man jetzt zur Umrechnung von bi-

nären in dezimale Zahlen benutzen. Wenn wir das ganze normal ausrechnen, bekommen wir den entspre-

chenden dezimalen Wert: 1011 = 1 ∗ 23 + 0 ∗ 22 + 1 ∗ 21 + 1 ∗ 20 = 1 ∗ 8 + 0 ∗ 4 + 1 ∗ 2 + 1 ∗ 1 = 11 Die

duale Zahl 1011 entspricht also der dezimalen Zahl 11.

Umrechnung dezimal nach binär Bei der Umrechnung der Dezimalzahlen verwenden wir die "Divi-

sion mit Rest". Wir teilen die Zahl solange durch 2, bis als Ergebnis 0 herauskommt und merken uns

dabei den Rest. Beispiel mit der Zahl 13:

13 / 2 = 6 Rest 1
6 / 2 = 3 Rest 0
3 / 2 = 1 Rest 1
1 / 2 = 0 Rest 1

Die Reste von unten nach oben aneinander gereiht ergeben dann die Dualzahl 1101.

Übung 2.

(a) Wandle folgende Zahlen vom Binärsystem ins Dezimalsystem um:

1111, 10001, 101010, 101

(b) Wandle folgende Zahlen vom Dezimalsystem ins Binärsystem um:

27, 127, 128, 2025

(c) Addiere die beiden Binärzahlen 10101 und 11110 schriftlich, wie du es aus dem Dezimalsystem

gewohnt bist. Was musst du beachten? Wandle die beiden Summanden samt Ergebnis ins Dezimal-

system um und überprüfe, ob deine Summe stimmt.

2

-- 2 of 2 --