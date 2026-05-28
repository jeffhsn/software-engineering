# aufgaben

> Converted from PDF | Pages: 3

---

### Universität Duisburg-Essen
Fakultät für Informatik

### Professor im Bereich Informatik
Prof. Dr.-Ing. Lucas Davi

### Christian Niesler
Übungsblatt 5

### Vorlesung “Cybersicherheit”
Sommersemester 2025

### Praktische Übung RSA und Signaturen, Hashes
Rekapitulation Signaturen - `RSA` und Hash basierte Verfahren

Wird bei dem `RSA`-Verfahren die Verschlüsselung umgekehrt entsteht die `RSA`-Signatur. Eine `RSA`-

### Signatur wird wie folgt ausgeführt:
## 1. Alice unterschreibt bzw. signiert eine Nachricht m, indem sie die Nachricht mit ihrem privaten
Schlüssel d kodiert. Es entsteht dadurch die Signatur s.

s = md mod N

## 2. Bob empfängt die Signatur s und entschlüsselt diese mit dem öffentlichen Schlüssel von Alice: e.
Dadurch erhält Bob die Nachricht m. Stellt diese einen sinnvollen Text dar, dann hat Alice m

signiert.

m = se mod N

In der Praxis gestaltet sich die Signatur großer Dokumente als schwierig. Deshalb bedient man sich der

sog. Hash-Signaturen. Hierbei wird mithilfe einer kryptografisch sicheren Hashfunktion ein Fingerabdruck

des Dokumentes erstellt. Anschließend wird dieser Fingerabdruck (Hash) signiert. Dies wird wie folgt

ausgeführt:

## 1. Alice bildet mit der öffentlich bekannten Hashfunktion H den Hashwert x der Nachricht m.
x = H(m)

Alice bildet daraufhin die Signatur s mit dem privaten Schlüssel d:

s = xd mod N

## 2. Alice schickt Nachricht und Signatur an Bob: (m, s)
## 3. Bob berechnet mit der ihm auch bekannten Hashfunktion H den Wert x:
x = H(m).

Zudem entschlüsselt Bob die Signatur s mit dem öffentlichen Schlüssel e:

y = se mod N .

## 4. Bob vergleicht x und y, stimmen diese überein ist das Dokument von Alice signiert.
1

-- 1 of 3 --

### RSA
Übung 1.

- In welchem Jahr wurde RSA entwickelt? Bis wann wurde das Verfahren in den USA patentiert?
- Wofür steht die Abkürzung RSA?
- Auf welchem mathematischen Problem beruht die Sicherheit von RSA? Beschreiben Sie kurz in
eigenen Worten.

- Wie groß ist die RSA Bitlänge für ein Sicherheitsniveau von symmetrischer 128-Bit Verschlüsselung?
Übung 2.

Vervollständigen Sie das Schlüsselpaar, sofern dies möglich ist. Führen Sie für vollständige Schlüsselpaare

bei gegebenen Klartext x eine Verschlüsselung und bei gegebenen Chiffrat y eine Entschlüsselung aus.

- p = 23, q = 43, e = 71, x = 134
- p = 31, q = 59, e = 185, x = 777
Übung 3.

### Signaturen Gegeben sind die folgenden RSA Parameter:
p = 2617, q = 8123, N = 21257891, T = 21247152, e = 17508821, d = 17230733

- Erstellen Sie eine RSA-Signatur s für die Nachricht ’R’, welche mit der Zahl 17 dargestellt werden
kann.

- Nehmen Sie an die Summe der ASCII-Werte der Buchstaben einer Nachricht sei eine Hashfunk-
tion. Der Hash der Nachricht ’`ABC`’ hat folglich den Hash 198 (65+66+67). Erstellen Sie eine

Hashsignatur für die Nachricht ’`RSAISTCOOL`’.
1 `ASCII` Table

### Abbildung 1: ASCII Table
2

-- 2 of 3 --

### GPG Signaturen - Bonus
Nutzen Sie hier das gleiche Tooling wie in der Bonusaufgabe von Übungsblatt 3.

Übung 4.

## 1. Erstellen Sie ein Textdokument (Notepad) mit einer Nachricht. Signieren Sie dieses Dokument mit
ihrem privaten Schlüssel aus Aufgabe 3 des Übungsblattes 3.

## 2. Tauschen Sie nun das signierte Dokument mit ihrem Partner/in aus und verifizieren Sie die Si-
gnatur, mithilfe des in Aufgabe 3 (Übungsblatt 3) ausgetauschten öffentlichen Schlüssels ihres

Partners.

3

-- 3 of 3 --