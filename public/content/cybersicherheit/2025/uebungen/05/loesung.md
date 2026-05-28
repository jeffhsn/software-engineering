# loesung

> Converted from PDF | Pages: 4

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

-- 1 of 4 --

### RSA
Übung 1.

- In welchem Jahr wurde RSA entwickelt? Bis wann wurde das Verfahren in den USA patentiert?
- Wofür steht die Abkürzung RSA?
- Auf welchem mathematischen Problem beruht die Sicherheit von RSA? Beschreiben Sie kurz in
eigenen Worten.

- Wie groß ist die RSA Bitlänge für ein Sicherheitsniveau von symmetrischer 128-Bit Verschlüsselung?
Lösung 1.

- Entwickelt in 1977, patentiert bis 2000.
- Namen der Enwtickler: Ronald Rivest, Adi S hamir, Leonard Adleman
- Auf dem Faktorisierungsproblem: Das multiplizieren zwei großer Primzahlen ist einfach, das Fak-
torisieren des Produkts dieser Primzahl ist schwer.

- Für 128 Bit symmetrische Verschlüsselung ca. 3072 Bit bei RSA.
Übung 2.

Vervollständigen Sie das Schlüsselpaar, sofern dies möglich ist. Führen Sie für vollständige Schlüsselpaare

bei gegebenen Klartext x eine Verschlüsselung und bei gegebenen Chiffrat y eine Entschlüsselung aus.

- p = 23, q = 43, e = 71, x = 134
- p = 31, q = 59, e = 185, x = 777
Lösung 2.

- 1) p = 23, q = 43
1. n = p ∗ q = 23 ∗ 43 = 989
1. ϕ(n) = (p − 1) ∗ (q − 1) = 22 ∗ 42 = 924
1. ggt(ϕ(n), e) = ggt(924, 71) = 1
1. d = e−1 mod ϕ(n) = 71−1 ≡ 911 mod 924
Verschlüsselung:

y = xe mod n = 13471 ≡ 632 mod 989

### Alternativ mit EEA:
ggtT (ϕ(n), e) = s ∗ ϕ(n) + t ∗ e

Wobei t dem Parameter d entspricht.

ggT (924, 71) mit `EEA` berechnen

s0 = 1, s1 = 0, t0 = 0, t1 = 1, i = 1

1. • i = 2
- r2 = r0 mod r1 ⇒ 924 mod 71 = 1
- q1 = (r0−r2)
r1 ⇒ (924−1)

71 = 13

- s2 = s0 − q1 ∗ s1 ⇒ 1 − 13 ∗ 0 = 1
- t2 = t0 − q1 ∗ t1 ⇒ 0 − 13 ∗ 1 = −13
- Achtung r2 = 1̸ = 0 ⇒ 2.Durchlauf
1. • i = i + 1 = 2 + 1 = 3
- r3 = r1 mod r2 = 71 mod 1 = 0
- q2 = (r1−r3)
r2 ⇒ (71−0)
1 = 71

- s3 = s1 − q2 ∗ s2 ⇒ 0 − 71 ∗ 1 = 71
- t3 = t1 − q2 ∗ t2 ⇒ 1 − 71 ∗ (−13) = 924
- Achtung da r3 = 0 Return!
2

-- 2 of 4 --

ggT (r0, r1) = ri−1 = 1

s = si−1 ⇒ s = s2 = 1, t = ti−1 ⇒ t = t2 = −13

Der gesuchte Parameter t entspricht -13, da wir aber die positive Entsprechung von -13 im Rest-

klassenring von 924 haben wollen, ist d = 911.

### Da 924 − 13 = 911 Folglich ist der fehlende Parameter d=911
- 1) p = 31, q = 59
1. n = p ∗ q = 31 ∗ 59 = 1829
1. ϕ(n) = (p − 1) ∗ (q − 1) = 30 ∗ 58 = 1740
1. ggt(ϕ(n), e) = ggt(1740, 185) = 5̸ = 1 ⇒ keine gültigen RSA-Parameter
Übung 3.

### Signaturen Gegeben sind die folgenden RSA Parameter:
p = 2617, q = 8123, N = 21257891, T = 21247152, e = 17508821, d = 17230733

- Erstellen Sie eine RSA-Signatur s für die Nachricht ’R’, welche mit der Zahl 17 dargestellt werden
kann.

- Nehmen Sie an die Summe der ASCII-Werte der Buchstaben einer Nachricht sei eine Hashfunk-
tion. Der Hash der Nachricht ’`ABC`’ hat folglich den Hash 198 (65+66+67). Erstellen Sie eine

Hashsignatur für die Nachricht ’`RSAISTCOOL`’.

Lösung 3.

- s = md mod N
s = 1717230733 mod 21257891

s = 12 246 481

- Hashwert = ASCII-Summe
## R S A I S T C O O L
82 83 65 73 83 84 67 79 79 76

x = 82 + 83 + 65 + 73 + 83 + 84 + 67 + 79 + 79 + 76

s = xd mod N

s = 77117230733 mod 21257891

s = 11 094 112

3

-- 3 of 4 --
1 `ASCII` Table

### Abbildung 1: ASCII Table
`GPG` Signaturen - Bonus

Nutzen Sie hier das gleiche Tooling wie in der Bonusaufgabe von Übungsblatt 3.

Übung 4.

## 1. Erstellen Sie ein Textdokument (Notepad) mit einer Nachricht. Signieren Sie dieses Dokument mit
ihrem privaten Schlüssel aus Aufgabe 3 des Übungsblattes 3.

## 2. Tauschen Sie nun das signierte Dokument mit ihrem Partner/in aus und verifizieren Sie die Si-
gnatur, mithilfe des in Aufgabe 3 (Übungsblatt 3) ausgetauschten öffentlichen Schlüssels ihres

Partners.

4

-- 4 of 4 --