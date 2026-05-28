# aufgaben

> Converted from PDF | Pages: 2

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

-- 1 of 2 --

### Kryptowährungen
Übung 2.

### Bitcoin und Blockchains in der Theorie
- Beschreiben Sie den grundlegenden Aufbau einer Blockchain und ihren Zweck.
- Beschreiben Sie das Problem der Byzantinischen Generäle im Kontext von Bitcoin. Welche Lö-
sungsansätze gibt es hier?

- Beschreiben Sie das Proof of Work Konzept. Wie kommt es bei Bitcoin zur Anwendung?
- Was ist ein Merkle-Tree und welche Rolle nimmt er in Bitcoin ein?
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

2

-- 2 of 2 --