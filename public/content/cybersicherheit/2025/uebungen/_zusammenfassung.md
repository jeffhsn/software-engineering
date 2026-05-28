# _zusammenfassung

> Converted from PDF | Pages: 11

---

Übungs-Zusammenfassung Cybersicherheit

### Prof. Dr.-Ing. Lucas Vincenzo Davi
Juniorprofessur für Informatik

und

### M.Sc. Christian Niesler
wissenschaftlicher Mitarbeiter

### Universität Duisburg-Essen
## 18. Juli 2025
Sommersemester 2024

### Vorname:
Nachname:

### Hinweis
Bei dieser Übungszusammenfassung handelt es sich um ein paar umstrukturierte Aufgaben aus den

bisherigen Übungen. Ziel dieser kleinen Übungszusammenfassung ist es in der letzten Übung dieses

Semester, Übungsinhalte zu wiederholen und evtl. Fragen zu Übungsaufgaben zu klären. Sie erhalten

hiermiet die Gelgenheit sich erneut mit den Übungsinhalten durch ähnlich aufgebaute

Übungsuafgaben auseinander zu setzen.

-- 1 of 11 --

### Name: Übungs-Zusammenfassung Cybersicherheit 18. Juli 2025
## 1. Betriebsmodi einer Blockchiffre
Eine einfache Blockchiffre d(·) mit 6-Bit Blockgröße [Block ist (b1, b2, b3, b4, b5, b6)] entschlüs-

selt, indem die Chiffre eine schlüsselabhängige Bit-Permuation durchführt. Für einen bestimmten

Schlüssel, der für diese Aufgabe angewendet wird, führt die Blockchiffre folgende Entschlüsselung

aus:

d(b1, b2, b3, b4, b5, b6) = (b6, b5, b4, b3, b2, b1)

### Entschlüsseln Sie die Nachricht:
y = 110011 010101 101100

mit dem jeweils geforderten Betriebsmodus und geben Sie in jeder Teilaufgabe den Plaintext x an:

```
Lösung:
Es wird blockweise entschlüsselt:
ECB: y = 110011 010101 101100
x1 = 110011
x2 = 101010
x3 = 001101
x = 110011 101010 001101
(b) CBC Modus (Cipher Block Chaining Mode) mit Initialisierungsvektor IV = 001100
Lösung:
CBC: y = 110011 010101 101100 und IV: 001100
110011 ⊕ 001100 = 111111 → d(110011) = x1 = 111111
101010 ⊕ 110011 = 011001 → d(010101) = x2 = 011001
001101 ⊕ 010101 = 011000 → d(101100) = x3 = 011000
x = 111111 011001 011000
Seite 2 von 11
-- 2 of 11 --
Name: Übungs-Zusammenfassung Cybersicherheit 18. Juli 2025
2. RSA Schlüsselpaare
Vervollständigen Sie das Schlüsselpaar. Ist es nicht möglich ein Schlüsselpaar zu bilden, begründen
Sie warum die gewählten Parameter ungültig sind. Führen Sie für vollständige Schlüsselpaare bei
gegebenen Klartext x eine Verschlüsselung und bei gegebenen Chiffrat y eine Entschlüsselung aus.
Um den fehlenden RSA-Parameter d zu bestimmen, nutzen Sie bitte den erweiterten euklidischen
Algorithmus:
Algorithm 1 Der Erweiterte Euklidische Algorithmus (EEA)
Eingabe: Zwei positive Zahlen r0 und r1 wobei r0 > r1
Ausgabe: ggT (r0, r1) sowie s und t mit ggT (r0, r1) = s · r0 + t · r1
Initialisierung: s0 = 1, s1 = 0, t0 = 0, t1 = 1, i = 1
Algorithmus:
1: repeat
2: i = i + 1
3: ri = ri−2 mod ri−1
4: qi−1 = (ri−2 − ri)/ri−1
5: si = si−2 − qi−1 · si−1
6: ti = ti−2 − qi−1 · ti−1
7: until ri = 0 {Die Schleife wird solange wiederholt bis ri zu 0 wird.}
8: return ggT (ro, r1) = ri−1 und s = si−1 und t = ti−1
Seite 3 von 11
-- 3 of 11 --
Name: Übungs-Zusammenfassung Cybersicherheit 18. Juli 2025
(a) p = 31, q = 5, e = 3, x = 42
Lösung:
N = p · q ≡ 31 · 5 ≡ 155
T = (p − 1) · (q − 1) ≡ 30 · 4 ≡ 120
Damit die Parameter gültig sind muss ggt(T, e) = 1 gelten.
Der ggT (T, e) ≡ ggT (120, 3) = 3̸ = 1
Folglich sind die Parameter ungültig.
Seite 4 von 11
-- 4 of 11 --
Name: Übungs-Zusammenfassung Cybersicherheit 18. Juli 2025
(b) p = 83, q = 53, e = 3, x = 2
Lösung:
N = p · q ≡ 83 · 53 ≡ 4399
T = (p − 1) · (q − 1) ≡ 82 · 52 ≡ 4264
ggT (4264, 3) = 1 Das sollte mit EEG gerechnet werden.
1. Lauf:
i = i + 1 = 2
r2 = r0 mod r1 = 4264 mod 3 = 1
q1 = (r0 − r2)/r1 = (4264 − 1)/3 = 1421
s2 = s0 − q1 · s1 = 1 − 1421 · 0 = 1
t2 = t0 − q1 · t1 = 0 − 1421 · 1 = −1421
2. Lauf (final)
i = i + 1 = 3
r3 = r1 mod r2 = 3 mod 1 = 0
q2 = (r1 − r3)/r2 = (3 − 0)/1 = 3
s3 = s1 − q2 · s2 = 0 − 3 · 1 = −3
t3 = t1 − q2 · t2 = 1 − 3 · (−1421) = 4264
Ab hier hat man alle bentögten Parameter.
Da s · T + t · e und t = −1421 laut EEG, ist d = 2843
Kurzer Hinweis: Der private Schlüssel d entspricht dem Parameter t, wobei t die Inverse
von e modulo T (Phi von n) ist. Der Parameter t = −1421 is negativ, daher müssen wir den
Parameter noch in den positiven Restklassenring übertragen. Daher 4264 − 1421 = 2843.
Der private Schlüssel d lautet 2843. Sie können das Ergebnis zuhause prüfen indem Sie z.B.
mithilfe von WolframAlpha (https://www.wolframalpha.com/input/):
3−1 mod 4264 berechnen lassen.
Für die Verschlüsselung y = xe = 23 = 8
Seite 5 von 11
-- 5 of 11 --
Name: Übungs-Zusammenfassung Cybersicherheit 18. Juli 2025
3. Ein Buffer-Overflow
Der Codeausschnitt in Listing 1 beinhaltet eine Buffer-Overflow Schwachstelle auf einem x86 32
Bit-System. Der Buffer-Overflow ermöglicht eine erfolgreiche Authentifizierung trotz inkorrektem
Passwort.
Hinweis:
Auf einem x86-32 Bit-System haben Integer und Pointer die Größe von 4 Byte. Ein char hat immer
1 Byte. Der Compiler in dieser Aufgabe führt keine Optimierungen am Code und Stack-Layout
durch. Variablen werden in der gleichen Reihenfolge auf den Stack geschrieben wie sie im C-Code
allokiert werden.
1 int check_login(char* password) {
2 int log_flag = 0;
3
4 // Allokiere Speicher auf dem Stack
5 char password_buffer[12] = {0};
6
7 // Kopiere den *gesamten* String "password" nach "password_buffer"
8 strcpy(password_buffer, password);
9
10 // Falls das eingegebene Passwort "route69" ist,
11 // setze die Variable "log_flag"
12 if (strcmp(pw_buffer, "route69") == 0)
13 log_flag = 1;
14
15 return log_flag;
16 }
17
18 int main(int argc, char *argv[]) {
19
20 if (argc != 2) {
21 printf("Benutzung: %s <password>\n", argv[0]);
22 exit(0);
23 }
24
25 // Das eingegebene Passwort wird in der Variable "pw" gespeichert.
26 char *pw = argv[1];
27
28 // Die Funktion check_login prueft, ob das richtige Passwort eingegeben wurde
29 if (check_login(pw))
30 {
31 printf("Login!\n");
32 }
33 else {
34 printf("Kein Zugriff\n");
35 }
36 }
Listing 1: Buffer Overflow
Seite 6 von 11
-- 6 of 11 --
Name: Übungs-Zusammenfassung Cybersicherheit 18. Juli 2025
(a) Beschreiben Sie die Sicherheitslücke im Listing 1. Beschreiben Sie textuell wie diese Sicher-
heitslücke behoben werden kann?
Lösung:
In Zeile 8 sieht man ein strcpy ohne Length-Check. Der vom Angreifer kontrollierte String
password inkl Null-Byte wird in den password_buffer geschrieben. Ist password zu lang
(>12 bytes) führt das zu einem Buffer-Overflow. Man kann die Sicherheitslücke beheben,
indem man:
• einen length-check vorm strcpy macht (verhindert den Buffer-Overflow)
• Variablen vertauschen, sodass log_flag unterhalb vom Buffer liegt.
(b) Skizzieren Sie das Stackframe-Layout der Funktion check_password vor dem return state-
ment.
Lösung:
Stack Frame vor dem Overflow:
check_login() frame
&password
return address
saved ebp
log_flag
pw_buffer
strcpy() frame
Seite 7 von 11
-- 7 of 11 --
Name: Übungs-Zusammenfassung Cybersicherheit 18. Juli 2025
(c) Finden Sie eine gültige Eingabe, die nicht route69 ist, damit das Programm die Nachricht
Login! ausgibt. Warum funktioniert Ihr Angriff?
Lösung:
Die Eingabe besteht aus:
• 12 beliebige Zeichen um den Buffer zu füllen.
• 1 beliebiges Zeichen um log_flag ungleich 0 zu setzen.
Eingaben größer 16 Byte fangen an den ebp Pointer zu überschreiben. Das hat in diesem
Fall keine Auswirkung, solange das return noch stimmt.
Eine mögliche Eingabe ist folglich AAAA AAAA AAAA BBB oder AAAA AAAA AAAA
BBBB BB ...
Der Angriff funktioniert, weil die Variable log_flag direkt oberhalb des Buffers liegt und
bei einem Buffer-Overflow überschrieben wird.
In C werden Integer > 0, als true gewertet. Damit kann auth_flag mit einem beliebigen
Wert größer 0 überschrieben werden.
Seite 8 von 11
-- 8 of 11 --
Name: Übungs-Zusammenfassung Cybersicherheit 18. Juli 2025
4. Multics
Im Folgenden wird die gleiche Notation wie in der Vorlesung verwendet.
• Ring Bracket ist gegeben als (r1, r2), (r2, r3)
• Access Bracket (r1,r2), wobei r1 das Schreibrecht und r2 das Leserecht definiert
• Call Bracket (r2,r3), wobei r2 das Leserecht und r3 das Ausführungsrecht definiert
• Aktuelle Ringnummer eines Prozesses ist r
• Bei einer Ring Transition wechselt der Prozess in Ring r′
• Eine User-ID in Multics wird wie folgt definiert: Person.Project.Tag
– Person: Name des Users
– Project: Gruppe des Users
– Tag: Art der Tätigkeit des Users: (m) interaktiv, (a) batch
• Rechte sind gegeben als:
– r: read / Leserecht
– w: write / Schreibrecht
– e: execute / Ausführungsrecht
– n: null / keine Rechte
Seite 9 von 11
-- 9 of 11 --
Name: Übungs-Zusammenfassung Cybersicherheit 18. Juli 2025
Es seien die folgenden Segmente mit zugehörigen ACLs gegeben:
Segment 1
Ring Bracket: (2,4), (4,4)
re Martin.*.a
n *.students.*
re Manuela.students.*
Segment 2
Ring Bracket: (0,0), (0,5)
re *.students.*
rwe Maria.researchers.*
rwe Max.students.m
Nun möchten die unten stehenden Prozesse mit den angegeben Usern die aufgeführten Zugriffe
durchführen. Bestimmen und begründen Sie für die folgenden Fälle, ob der angefragte Zugriff durch
ACL und Ringe erlaubt ist oder nicht. Falls der Zugriff erlaubt ist geben Sie auch an, in welchen
Ring der Prozess wechseln muss oder ob er in seinem bisherigen Ringen weiterlaufen kann.
1. Martin.students.a: P1 (r = 2) lesen von Segment 1
Zugriff durch ACL ⃝ erlaubt ⃝ verboten
Zugriff durch Ring ⃝ erlaubt ⃝ verboten
⃝ Ring Switch nach
Lösung:
Lösung: Zugriff erlaubt. ACL erlaubt. Ring erlaubt, da r=4 <=4.
2. Maria.students.m: P2 (r = 0) schreiben von Segment 2
Zugriff durch ACL ⃝ erlaubt ⃝ verboten
Zugriff durch Ring ⃝ erlaubt ⃝ verboten
⃝ Ring Switch nach
Lösung:
Lösung: Zugriff verboten. ACL verboten. Ring erlaubt, da r=0<=0.
3. Manuela.students.m: P3 (r = 3) ausführen von Segment 1
Zugriff durch ACL ⃝ erlaubt ⃝ verboten
Zugriff durch Ring ⃝ erlaubt ⃝ verboten
⃝ Ring Switch nach
Lösung:
Lösung: Zugriff erlaubt. ACL erlaubt. Ring erlaubt, da r=3 <=4. Keine Ring transition
erforderlich.
4. Martin.students.a: P4 (r = 0) ausführen von Segment 1
Zugriff durch ACL ⃝ erlaubt ⃝ verboten
Zugriff durch Ring ⃝ erlaubt ⃝ verboten
⃝ Ring Switch nach
Lösung:
Lösung: Zugriff erlaubt. ACL erlaubt. Ring erlaubt, da r=0 <= 2. Ring transition nach 2.
Seite 10 von 11
-- 10 of 11 --
Name: Übungs-Zusammenfassung Cybersicherheit 18. Juli 2025
5. Mareike.students.a: P5 (r = 4) ausführen von Segment 2
Zugriff durch ACL ⃝ erlaubt ⃝ verboten
Zugriff durch Ring ⃝ erlaubt ⃝ verboten
⃝ Ring Switch nach
Lösung:
Lösung: Zugriff erlaubt. ACL erlaubt. Ring erlaubt da r=4 <= 5. Ring transition zu r=0.
6. Maria.researchers.m: P6 (r = 1) schreiben von Segment 2
Zugriff durch ACL ⃝ erlaubt ⃝ verboten
Zugriff durch Ring ⃝ erlaubt ⃝ verboten
⃝ Ring Switch nach
Lösung:
Lösung: Zugriff verboten. ACL erlaubt. Ring verboten, da r=1 > 0.
Seite 11 von 11
-- 11 of 11 --