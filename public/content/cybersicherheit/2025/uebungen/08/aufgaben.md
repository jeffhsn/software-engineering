# aufgaben

> Converted from PDF | Pages: 3

---

### Universität Duisburg-Essen
Fakultät für Informatik

### Professor im Bereich Informatik
Prof. Dr.-Ing. Lucas Davi

### Christian Niesler
Übungsblatt 8

### Vorlesung “Cybersicherheit”
Sommersemester 2025

Praktische Übung Kerberos, Key-Exchange, Certificates and `TLS`

### Diffie-Hellman-Schlüsselaustausch
Da asymmetrische Kryptografie sehr aufwendig ist (schwache Performance im Vergleich zu symmetri-

schen Verfahren), werden in der Praxis hybride Protokolle verwendet. So werden unter anderem für den

Schlüsselaustausch asymmetrische Verfahren verwendet und später auf eine symmetrische Verschlüsse-

lung umgestellt. Eines dieser Verfahren ist der sogenannte Diffie-Hellman-Schlüsselaustausch. In Abbil-

dung 1 wird anhand der Beispiels Farben mischen das Vorgehen veranschaulicht. Hierbei wird Folgendes

angenommen:

- Es ist einfach zwei Farben zu mischen.
- Die Zerlegung einer gemischten Farbe in die Kernfarben ist schwierig durchführbar.
Am Ende des Verfahrens haben beide Parteien, ein gemeinsames Geheimnis bzw. eine gemeinsame Farbe,

die für die symmetrische Verschlüsselung genutzt werden kann.

Abbildung 1: Veranschaulichung des Diffie-Hellman-Schlüsselaustausch anhand der Farbmischung.

Bildquelle: [https://de.wikipedia.org/wiki/Diffie-Hellman-Schl%C3%BCsselaustausch#/media/](https://de.wikipedia.org/wiki/Diffie-Hellman-Schl%C3%BCsselaustausch#/media/)

### Datei:Diffie-Hellman_Key_Exchange_(de).svg
1

-- 1 of 3 --

### Diffie-Hellman-Schlüsselaustausch
## 1. Alice und Bob wählen zwei Zahlen p und g. Die Zahl p ist eine große Primzahl, der Moduls p.
Die Zahl g ist eine kleine Zahl, die Basis g (kleine Zahlen für g vereinfachen die Berechnung). Als

Beispiel wählen wir nun zufällig p = 17 und g = 4.

## 2. Nun wählen jeweils Alice und Bob eine geheime Zahl. Alice wählt die Zahl a (zB. a = 3) und Bob
die geheime Zahl b (zB. die geheime Zahl b = 6)

## 3. Alice macht die folgende Berechnung: A = ga mod p. Alice schickt das Ergebnis A an Bob.
## 4. Bob mach die gleiche Berechnung mit seiner geheimen Zahl B = gb mod p. Bob schick das Ergebnis
B an Alice.

## 5. Alice und Bob berechnen nun das gemeinsame Geheimnis s.
Alice berechnet s = Ba mod p.

Bob berechnet s = Ab mod p.

Aufgabe 1.

Berechnen Sie nun das gemeinsame Geheimnis s für Alice und Bob mit den folgenden Parametern (Diffie-

### Hellman-Schlüsselaustausch):
- p = 13, g = 2, a = 4, b = 5
- p = 23, g = 9, a = 15, b = 17
- p = 19, g = 13, a = 10, b = 2
X.509 und `SSL`/`TLS`

Aufgabe 2.

Der Zertifikatsstandard X.509 wird in Verbindung mit der `SSL`/`TLS`-Verschlüsselung verwendet. Beant-

worten (Recherchieren) Sie die folgenden Fragen im Zusammenhang mit X.509.

- Fassen Sie kurz das Aufgabenspektrum einer CA zusammen.
- Welche grundsätzlichen Ansätze existieren für den Widerruf eines Zertifikats? Erläutern Sie diese.
- Für die Echtzeit-Überprüfung des Status eines Zertifikats wurde das Online Certificate Status
Protocol entwickelt. Beschreiben Sie dessen grundsätzlichen Ablauf.

### Vergleich X.509 und GPG
Aufgabe 3.

In der Übung haben Sie in der Vergangenheit die asymmetrische Verschlüsselung kennen gelernt. Im

Gegensatz zu X.509 verwendet `GPG` das sogenannte Web of Trust. Vergleichen Sie nun die CA-basierte

Vertrauensstruktur mit dem Web of Trust.

Wie unterscheiden sich die CA-basierte Struktur und das Web of Trust? Erklären Sie die grundsätzliche

Funktionsweise und erläutern die Unterschiede in der Benutzung. Gehen Sie auf die Vor- und Nachteile

ein. Unterscheiden Sie hierbei zwischen

- Unternehmen und Organisationen mit zentraler Verwaltung
- Privatanwendern
- Dissidenten/Aktivisten/Hackern, die sich Bedrohungen von staatlicher Seite ausgesetzt sehen
2

-- 2 of 3 --

### Let’s Encrypt
Aufgabe 4.

Ein Problem von `SSL` ist, dass selbst unterschriebene Zertifikate bei anderen Benutzern eine Warnung

auslösen, da diese, wenn Sie nicht den Public-Key ihrer CA verteilen, die Authentizität des Zertifikats

überprüfen können. Bis auf wenige Ausnahmen war das Erstellen eines von einer ‘vertrauenswürdigen’

CA unterschriebenen Zertifikats bisher umständlich und teuer. Das soll durch das, unter anderen von

Mozilla und der `EFF` unterstützte, Projekt Let’s Encrypt [https://letsencrypt.org](https://letsencrypt.org) anders werden.

- Beschreiben Sie mindestens eine Validierungsmöglichkeit von Let’s Encrypt.
- Beschreiben Sie allgemein mindestens zwei Vor und Nachteile der von Let’s Encrypt erstellten/un-
terschriebenen Zertifikate.

- Let’s Encrypt verwendet Certificate Transparency. Beschreiben Sie kurz Certificate Transparency
Logs und nennen Sie mindestens einen Vor und Nachteil.

### Bonus-Aufgabe
Aufgabe 5.

Nutzen Sie OpenSSL um praktische Erfahrungen mit Verschlüsselungssoftware zu sammeln und die fol-

genden Aufgaben zu bearbeiten. OpenSSL ist eine weit verbreitete Software und erlaubt das Beantragen,

Erzeugen und Verwalten von Zertifikaten über die Kommandozeile. Um die Einrichtung dieser Tools

zu vereinfachen nutzen Sie am besten eine virtuelle Maschine wie z.B. VirtualBox und eine Linux-

Distribution wie Kali. Sie finden eine englischsprachige Anleitung zur Installation von Kali Linux in

### VirtualBox unter:
[https://www.kali.org/docs/virtualization/install-virtualbox-guest-vm/](https://www.kali.org/docs/virtualization/install-virtualbox-guest-vm/)

Hinweis: Diese Bonusaufgabe richtet sich an Studierende, die praktische Erfahrungen mit Verschlüs-

selungssoftware sammeln wollen. Diese Aufgabe lässt sich nicht mit der `GUI` Kleopatra aus GPG4Win

lösen. Zum Lösen dieser Aufgabe sollten Sie mit dem Umgang mit einer Kommandokonsole oder Shell

vertraut sein. Eine gute Quelle um sich mit dem Betriebssystem Linux vertraut zu machen ist: SelfLinux

([https://www.selflinux.org/)](https://www.selflinux.org/)) und für die Shell: [https://www.ernstlx.com/linux90bash.html.](https://www.ernstlx.com/linux90bash.html.)

- Erstellen Sie mit Hilfe von OpenSSL eine X.509 Certificate Authority (CA) mit der Lebensdauer
von zehn Jahren.

- Erzeugen Sie ein Public/Private Key Pair und erstellen sie ein Certificate Signing Request (CSR).
- Signieren Sie den Public Key mit Hilfe ihrer CA. Das Zertifikat soll ein Jahr gültig sein.
- Lassen Sie sich die Details ihres Zertifikates anzeigen.
- Welche grundsätzlichen Ansätze existieren für den Widerruf eines Zertifikats? Erläutern Sie diese
und widerrufen Sie Ihr Zertifikat.

Vielen Dank an Prof. Dr. Helmut Reiser von der Ludwig-Maximilians-Universität München für diese

Aufgaben.

3

-- 3 of 3 --