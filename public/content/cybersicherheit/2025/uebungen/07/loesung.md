# loesung

> Converted from PDF | Pages: 5

---

### Universität Duisburg-Essen
Fakultät für Informatik

### Professor im Bereich Informatik
Prof. Dr.-Ing. Lucas Davi

### Christian Niesler
Übungsblatt 7

### Vorlesung “Cybersicherheit”
Sommersemester 2025

### Praktische Übung Hashing Use-Cases
Hashing of Passwords

Hashing hat eine immense praktische Bedeutung für heutige Web-Apps, die oftmals zusätzliche Dienstlei-

stungen und Funktionen nach dem Login bereitstellen. Dies kann zB. eine Zeitung sein, die Zeitungsartikel

nur Nutzern mit einem Zeitungsabo bereitstellen. Oder aber auch Beispiele wie Online-Banking, Foren

oder digitale Lehre. Die Universität Duisburg-Essen stellt mit der Moodle Platform, eine Möglichkeit

sich in Diskussionsforen aktiv mit anderen Studierenden zum Thema der Vorlesung auszutauschen. Es

können aber auch über Moodle bewertete Abgaben vorgenommen werde. Ein Login erfordert die Eingabe

eines Benutzernamen und Passworts.

Übung 1.

Rainbow-Tables sind ein Time-Storage Tradeoff. Rainbow-Tables sind besonders am Anfang der 2000er

Jahre aufgrund von unsalted, single-hashed Passwörtern sehr beliebt gewesen. Eine Rainbow-Table lohnt

sich besonders, wenn die Berechnungszeit der Hashes im Vergleich zu den Speicherkosten sehr hoch ist.

- Es gibt insgesamt 77 printable non-control ASCII Zeichen, welche für Passwörter verwendet werden
können. Geben Sie die Anzahl an möglichen Passwörtern wenn die Passwortlängen auf: 4,5,6,7,8

Zeichen begrenzt wird.

- Nehmen wir an in einer Datenbank-Tabelle werden zwei Spalten als char(10) für das Passwort und
binary(16) für den dazugehörigen Hash angelegt. Eine Zeile verbraucht folglich 26 B an Daten. Wie

groß ist eine Rainbow-Tabelle für die zugelassenen Passwortlängen aus Teilaufgabe a).

- Ein moderner 4-Kerne Prozessor kommt bei einem modernen Hash-Verfahren wie SHA-256 auf
eine Geschwindigkeit von 200 000 Hashes/s. Berechnen Sie die Zeit, die der Prozessor braucht um

eine Rainbow-Tabelle mit den Passwortlängen aus Teilaufgabe a) zu erstellen.

Hinweis: Sie können Ihre Berechnungen in Tabelle 1 eintragen.

max. Passwortlänge Anzahl Passwortkombi-

nationen

### Disk-Größe Rainbow-
Table

### CPU-Zeit
4

5

6

7

8

### Tabelle 1: Tabelle zur Aufgabe 1
1

-- 1 of 5 --

Lösung 1.

- Anzahl Passwortkombinationen
774 = 35 253 041

775 = 2 706 784 157

776 = 208 422 380 089

777 = 16 048 523 266 853

778 = 1 235 736 291 547 681

- Disk-Größe
774 ∗ 26 Byte ≈ 913 M B

775 ∗ 26 Byte ≈ 70 GB

776 ∗ 26 Byte ≈ 5, 4 T B

777 ∗ 26 Byte ≈ 417 T B

778 ∗ 26 Byte ≈ 32 P B

- CPU-Zeit
774 ÷ 200000 Hashes/s ≈ 3 M inuten

775 ÷ 200000 Hashes/s ≈ 3, 75 Stunden

776 ÷ 200000 Hashes/s ≈ 12 T age

777 ÷ 200000 Hashes/s ≈ 2, 5 Jahre

778 ÷ 200000 Hashes/s ≈ 195 Jahre

max. Passwortlänge Anzahl Passwortkombinationen Disk-Größe Rainbow-Table `CPU`-Zeit
4 35253041 913 MB 3 Minuten
5 2706784157 70 GB 3,75 Stunden
6 208422380089 5,4 TB 12 Tage
7 16048523266853 417 TB 2,5 Jahre
8 1235736291547681 32 PB 195 Jahre

### Kryptowährungen
Übung 2.

### Bitcoin und Blockchains in der Theorie
- Beschreiben Sie den grundlegenden Aufbau einer Blockchain und ihren Zweck.
- Beschreiben Sie das Problem der Byzantinischen Generäle im Kontext von Bitcoin. Welche Lö-
sungsansätze gibt es hier?

- Beschreiben Sie das Proof of Work Konzept. Wie kommt es bei Bitcoin zur Anwendung?
- Was ist ein Merkle-Tree und welche Rolle nimmt er in Bitcoin ein?
Lösung 2.

- • Ein Block beinhaltet eine Liste aller Transaktionen und den Hash des zuvor geminten/gefun-
denen Blocks.

- Blöcke werden durch Miner erstellet, Miner kombinieren alle Transaktionen in einem Block.
- Miner kündigen einen neuen Block an, dieser muss aber durch das Netzwerk verifiziert und
akzeptiert werden. Bei Akzeptanz wird eine Anzahl an Coins ausgezahlt.

- Der Block erweitert bei Akzeptanz die Blockchain in jeder Kopie.
- Der Block-Header hat unter anderem folgende Felder:
## 1. Hash des vorgegangenen Blocks.
## 2. Zeitpunkt wann der Block gemined wurde.
2

-- 2 of 5 --

## 3. Merkle-root aller ink. Transaktionen.
## 4. Nonce.
timestamp

| nonce | tx_root |
| --- | --- |
Block #10

prev_hash timestamp

| nonce | tx_root |
| --- | --- |
Block #11

prev_hash timestamp

| nonce | tx_root |
| --- | --- |
Block #12

prev_hash

### Hash 01
Hash 0 Hash1

### Tx0 Tx1
Hash23

### Tx02 Tx3
| Hash3 | Hash2 |
| --- | --- |
- • Eine öffentliche Blockchain mit dezentraler Struktur braucht eine Vertrauenbasis. Man kann
aber niemanden im Netzwerk vertrauen.

- Es muss Konsens unter den byzantischen Generälen herrschen, Veräter unter den Generälen
können den Erfolg gefährden.

⇒ Deshalb gehört die Vertrauensbasis in einer öffentlichen Blockchain zum "byzantischen

fault Problem".

- Die Blockchain kann abweichen es bestehen gegebenenfalls mehrere Blockchain Nebenketten
die längste wird anerkannt.

- Damit jeder Knoten im Blockchain Netzwerk eine anerkannte Version der Blockchain hat,
braucht es einen Konsensmechanismus.

- Der Durchbruch der Blockchain hängt wesentlich mit der Erfindung des Proof-of-Work Kon-
zepts zusammen. Der Proof-of-Work Mechanismus löst das Problem der byzantischen Generäle

in Bitcoin und anderen Blockchains. Ein alternativer Ansatz ist Proof-of-Stake.

- • Der Fragesteller muss etwas Arbeit vorableisten z.B eun Hash Puzzle lösen um einen Dienst
in Anspruch zu nehmen.

### Challenge-Response:
| Server | 1. Request Service |
| --- | --- |
## 2. Choose
## 3. Challenge
## 4. Solve 5. Response
## 6. Verify
## 7. Grant Service
Solution-Verification:

3

-- 3 of 5 --

## 1. Compute
Sender 2. Solve Server

## 3. Send
## 4. Verify
Reciever

- Bei Bitcoin wird Proof-of-Work genutzt um einen Konsens im Netzwerk zu generieren.
- • Ein Merkle-Tree enthält alle Knoten, welche selbst den Hash vom ’parent’ enthalten.
- Bei Bitcoin kann sind die Hashes: SHA-256
H00

### H(L1)
| H10 | H01 |
| --- | --- |
H(L2) H(L3) H(L4)

### H11
| L2 | L1 L4 | L3 |
| --- | --- | --- |
- Eine Manipulation kann durch den Merkle-Tree leicht detektiert werden.
- In Bitcoin werden die Transaktionen durch den Merkle-Tree vor Manipulation geschützt.
Übung 3.

CyberCoin ist eine Bitcoin-Variante und unterscheidet sich insbesondere durch eine geänderte Hashfunk-

tion. Die Hashwerte sind immer ganzzahlig zwischen 0 und 99, Nachkommastellen werden abgeschnitten.

Blöcke werden vom Netzwerk als gültig anerkannt, wenn ihr Hash größer oder gleich 90 ist. Die folgende

### Formel wird zur Berechnung des Hashes genutzt:
block_header = (100000 · prev_blockhash + 1000 · time + 10 · tx_root) · (nonce + 1)

block_hash =

( block_header

773 + 4312

)

mod 100

- Vervollständige die Tabelle, die zwei aufeinanderfolgende, gültige Blöcken auflistet.
prev_blockhash time tx_root nonce blockhash

93 22 31

38 19

- Das Minen eines neuen CyberCoin-Blockes ist auch mit einer Belohnung von 10 CyberCoins ver-
bunden. Um die Inflation zu begrenzen wird dieser Finderlohn allerdings alle 730 Blöcke halbiert.

Bestimmen Sie die maximale Anzahl an CyberCoins.

Lösung 3.

- Zufällige Nonce als 2 und im nächsten Schritt als 3 gewählt.
prev_blockhash time tx_root nonce blockhash

93 22 31 2 91

91 38 19 3 98

4

-- 4 of 5 --

- Intuituion:
Coins = 730 ∗ 10 + 730 ∗ 5 + 730 ∗ 2, 5 . . .

Da sich die Belohnungen alle 730 Blöcke halbiert kann hier die geometrische Summenformel zur

### Berechnung genutzt werden:
| n | ∑ |
| --- | --- |
k=0

qk = 1 − qn+1
1 − q

Wobei man q = 0,5 für die Halbierung wählt.

730 ∗ 10
1 − 0, 5 = 7300

0, 5 = 14600

### Bonus: Hash Cracking for the Hackers among us
Übung 4.

Passwörter werden als Hashes gespeichert, das gilt auch für passwortgeschützte Zip-Files. Im Zusatz-

material der Übung im MoodleKurs (ZusatzmaterialAufgabenblatt7.zip) finden Sie eine Datei mit dem

Namen protected.zip und eine Passwortliste rockyou.txt. Nutzen Sie die Tools zip2john aus der Software

(John-the-Ripper) und das Tool hashcat. Um die Einrichtung dieser Tools zu vereinfachen nutzen Sie

am besten eine virtuelle Maschine zB. VirtualBox und das Pentesting Linux Image: Kali. Sie finden eine

englischsprachige Anleitung zur Installation von Kali Linux in VirtualBox unter:

[https://www.kali.org/docs/virtualization/install-virtualbox-guest-vm/.](https://www.kali.org/docs/virtualization/install-virtualbox-guest-vm/.) In der VM sind die

beiden notwendigen Tools zip2john und hashcat bereits vorinstalliert. Hinweis: Diese Bonusaufgabe

richtet sich an Studierende, die sich in das Thema Pentesting einarbeiten wollen. Zudem sollten Sie für

diese Aufgabe mit dem Umgang einer Kommandokonsole oder Shell vertraut sein. Eine gute Quelle um

sich mit dem Betriebssystem Linux vertraut zu machen ist: SelfLinux ([https://www.selflinux.org/)](https://www.selflinux.org/))

und für die Shell: [https://www.ernstlx.com/linux90bash.html.](https://www.ernstlx.com/linux90bash.html.)

- Extrahieren Sie den Password-Hash aus der Datei protected.zip mit dem Tool zip2john.
- Nutzen Sie nun Hashcat und die Passwortliste rockyou.txt um eine sogenannte Dictionary-Attack
(Ausprobieren von Passwörtern einer Liste) zu starten. Hashcat wird die Passwörter in Hashes

umwandeln und nach einen passenden Passwort in der Liste suchen.

5

-- 5 of 5 --