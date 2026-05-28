# aufgaben

> Converted from PDF | Pages: 5

---

### Universität Duisburg-Essen
Fakultät für Informatik

### Professor im Bereich Informatik
Prof. Dr.-Ing. Lucas Davi

### Christian Niesler
Übungsblatt 2

### Vorlesung “Cybersicherheit”
Sommersemester 2025

### Praktische Übung Symmetrische Kryptografie
Vernam-Chipher (Onetimepad und Stromchiffre)

Die Vernam-Chiffre stellt eine Erweiterung der Vigenère-Chiffre dar, bei der für die Verschlüsselung ein

Schlüssel mit der gleichen Länge wie der Klartext hat. Ein solches Verfahren gilt nach heutigen Standard

als unsicher. Wird aber der Schhlüssel durch einen kryptografisch starken Zufallszahlengenerator erzeugt,

ist Vernam eine Stromverschlüsselung. Die Sicherheit hängt hier von der Sicherheit des Zufallszahlenge-

nerators ab. Ist der Schhlüssel echt zufällig gewählt, so wird es auch One-Time-Pad genannt.

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
Verschlüsselung:

## 1. Für die Verschlüsselung wird jedem Buchstaben im Klartext eine Zahl von 0 bis 26 zugeordnet
(siehe Tabelle 1).

## 2. Im zweiten Schritt wird der Buchstabe mit dem Schlüssel addiert. (plaintext + key)
## 3. Subtrahieren Sie 26, falls die resultierende Zahl größer als 25 ist. Ansonsten bleibt diese unverändert.
Für die Entschlüsselung gilt der umgekehrte Prozess.

### Formale Definition:
Z26 alle Zahlen von 0 bis 25, das Alphabet wird wie in Tabelle 1 beschrieben eindeutig zugeordnet.

### Sei der Schlüssel k ∈ Z26
Verschlüsselung: Für jeden Buchstaben im Klartext wird die folgende Funktion angewandt:

e(x) = (Buchstabe + k) mod 26

Entschlüsselung: Für jeden Buchstaben im Klartext wird die folgende Funktion angewandt:

d(y) = (Buchstabe - k) mod 26

### Beispiel:
1

-- 1 of 5 --

## C Y B E R S E C U R E
2 24 1 4 17 18 4 2 20 17 4

## K E Y R A N D O M K I
10 4 24 17 0 13 3 14 12 10 8

## M C Z V R F I Q G B M
12 2 25 21 17 5 8 16 6 1 12

Übung 1.

## 1. Verschlüsseln Sie die Nachricht: VORLESUNG mit der Vernam-Chiffre und dem Key:
`SECUNIDUE`?

## 2. Bei der vorgestellten Methode handelt es sich um eine (schwache) Variante des Onetimepads. Geben
Sie die Anzahl der möglichen Schlüssel für eine Vernam-Chiffre mit Klartextlänge 5 an. Wie viele

Schlüssel gibt es für einen Klartext der Länge n?

## 3. Angenommen eine CPU mit 2 Kernen und 4 GHz kann vollständig mit der Berechnung von Schlüs-
seln für einen Text der Länge 1024 ausgelastet werden. Pro Schlüsselberechnung werden 4 Ope-

rationen benötigt. 1 Ghz entspricht 1.000.000 Operationen pro Sekunde. Wie lange benötigt ein

Angreifer um mit dieser `CPU` einen passenden Schlüssel zu finden (Brute-Force Angriff)?

## 4. Mehrfache Verschlüsselung: Eine beliebte Methode um die Sicherheit von Verschlüsselungsverfah-
ren zu erhöhen ist das mehrfache Anwenden der Verschlüsselung. So kann die in der Vorlesung

vorgestellte `DES` Chiffre durch die dreifache Anwendung sicher gemacht werden.

Eine doppelte Verschlüsselung kann wie folgt mathematisch dargestellt werden: y ≡ ek2 (ek1 (x))

Wie verändert die doppelte Anwendung der Vernam-Chiffre den Schlüsselraum K. Geben Sie eine

allgemeine Formel in Abhängigkeit der Nachrichtenlänge n an.

### Formbarkeit (engl. Malleability) von Stromchiffren
Die Formbarkeit bezeichnet eine besondere Eigenschaft eines Kryptosystems. Eine Kryptosystem gilt als

formbar, wenn Veränderungen am ciphertext (y) vorgenommen werden können, die sich gezielt auf den

plaintext (x) auswirken, ohne dass der dazugehörige plaintext bekannt sein muss. Der Angreifer hat die

volle Kontrolle über Änderungen am Klartext, obwohl ihm der entsprechende Klartext unbekannt ist.

Übung 2.

## 1. Beschreiben Sie, wieso Stromchiffren im Prinzip immer die Eigenschaft eines formbaren Kryp-
tosystems aufweisen und wie ein Angreifer vorgehen muss, um gezielt Änderungen am Klartext

vorzunehmen.

## 2. Sie sind nun ein Angreifer und haben sich über Nacht in das System eines Bitcoin-Brokers gehackt.
Der Broker überweist Ihnen am nächsten Morgen 1 Bitcoin (zurzeit ca. 40 000 `EUR`). Die Anzahl

an Bitcoins wird als 16-bit Integer (in C short) gespeichert. Wie müssen Sie den Wert manipulieren

um über Nacht zum Millionär zu werden?

## 3. Angenommen Sie sind ein böser Admin bei einem Streaming-Dienst mit kostenlosem Mitarbeiter-
Abo. Sie möchten jedoch alle Premium-Angebote ohne Zusatzkosten nutzen. Daher entscheiden

Sie sich den Wert von ’m’ (Mitarbeiter) zu ’p’ (Premium) zu ändern. Die beiden Werte ’m’und

’p’ sind `ASCII` kodiert (siehe Tabelle 1). Der Eintrag in der Datenbank liegt als Chiffrat y(’m’)

(Stromchiffre) vor und lautet binär 100 0000. Geben Sie den Eintrag (Chiffrat von ’p’) in binärer

Darstellung an, den Sie setzen, müssen um mit dem Premium-Paket zu schauen. Bemerkung: Es

handelt sich hiebei, um einen sogenannten known-plaintext Angriff.

2

-- 2 of 5 --
1 `ASCII` Table

### Abbildung 1: ASCII Tabelle
Die Blockchiffre `DES`

`DES` basiert auf der Anwendung von Substitutionsboxen und der Strukur namens Feistelnetzwerk. Bei

den S-Boxen für eine sichere Verschlüsselung müssen folgende Anforderungen erfüllt sein, um eine sichere

### Chiffre zu erhalten:
Vollständigkeit Jedes Bit in der Ausgabe ist von jedem Bit in der Eingabe abhängig.

Avalanche Die Änderung eines Bits in der Eingabe ändert im Mittel die Hälfte der Ausgabebits

Nichtlinearität Kein Ausgangsbit ist linear von einem Eingangsbit abhängig.

Korrelationsimmunität Solange nur ein Teil der Eingangsbits bekannt ist können keine Rückschlüsse

auf die Ausgangsbits gezogen werden und umgekehrt.

Tabelle 2 zeigt die S-Box #5 von `DES`. Die S-Boxen von `DES` wurden so erstellt, dass sie den obigen

Kriterien genügen.

3

-- 3 of 5 --

### SBox 5 (DES)
Abbildung 2: SBox #5 von `DES`. Hier wird ein Eingabewert mit 6-Bit angenommen, welcher einen 4-Bit

Ausgabewert durch Substitution erzeugt. Beipsiel: 01101 1, hat die äußeren Bits 01 und die inneren Bits

1101, folglich ergibt sich laut Tabelle 1001 als Substitution (gelb markiert).

### Fragen zu DES
Übung 3.

## 1. Welche Schlüssellänge wurde für DES ursprünglich vorgeschlagen und welche (effektive) Schlüssel-
länge wurde am Ende gewählt? Wer ist für diese Änderung verantwortlich?

## 2. Was steckt hinter den Begriffen Konfusion und Diffusion und welche Bausteine setzen diese Funktion
beim `DES` um?

## 3. Zeichnen Sie ein Schaubild eines Feistelnetzwerks.
Nichtlinearität von S-Boxen

### S1 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15
0 14 04 13 01 02 15 11 08 03 10 06 12 05 09 00 07
1 00 15 07 04 14 02 13 01 10 06 12 11 09 05 03 08
2 04 01 14 08 13 06 02 11 15 12 09 07 03 10 05 00
3 15 12 08 02 04 09 01 07 05 11 03 14 10 00 06 13

Tabelle 2: S-Box # 1 von `DES`. Die Werte in der Tabelle sind in Dezimaldarstellung!

Verwenden Sie für die folgenden Aufgaben S-Box #1 von `DES`. Eine Kopie der S-Box finden sie in

### Tabelle 2
Eine S-Box Si verhält sich linear, wenn folgendes gilt:

### Si(x1) ⊕ Si(x2) = Si(x1 ⊕ x2)
wobei der Operator ⊕ ein bitweises `XOR` darstellt.

Übung 4.

## 1. Eine wichtige Eigenschaft von DES ist die Nichtlinearität von S-Boxen. Zeigen Sie für folgenden
Eingabebits, das die S-Box nicht linear ist.

- x1 = 000000 und x2 = 000001
- x1 = 111111 und x2 = 100000
- x1 = 101010 und x2 = 010101
4

-- 4 of 5 --

### Bonusaufgabe: Schwache Keys
Diese Aufgabe benötigt Zeit und einer guten Kenntnis von `DES`. Daher werden wir diese Aufgabe erst

am Anfang der nächsten Übung besprechen.

Ein `DES`-Key (`DES` Schlüssel) wird als schwach bezeichnet, wenn die Ver- und Entschlüsselung identische

### Operationen sind:
Ein `DES`-Key ist schwach wenn folgende Bedingung erfüllt ist:

DESKw (x) = (DESKw (x))−1, für alle x.

Tipp: Schauen Sie sich die Subkeys bzw. auch die Rundenschlüssel von `DES` genau an. Zeichnen Sie den

Aufbau von `DES` für mindestens 2 Runden (Siehe Aufgabe 3).

Übung 5.

## 1. Beschreiben Sie welche Werte die Subkeys Ki für die 16 DES Runden annehmen müssten, damit
die obige Gleichung für schwache Keys erfüllt ist.

## 2. Es gibt 4 schwache DES-Keys, welche sind dies?
## 3. Was ist die Wahrscheinlichkeit, dass ein zufällig gewählter DES-Key, ein schwacher DES-Key ist?
5

-- 5 of 5 --