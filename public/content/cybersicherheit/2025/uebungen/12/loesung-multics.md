# Übungsblatt 2: Praktische Übung Symmetrische Kryptographie

> Converted from PDF | Pages: 26

---

© `SYSSEC`, Prof. Dr. Lucas Davi

Übungsbla 12:

### Praksche Übung Betriebssystemsicherheit
Chrisan Niesler

### Tristan Löding
Fakultät für Informak

Arbeitsgruppe Systemsicherheit hps://www.syssec.wiwi.uni-due.de/

### Universität Duisburg-Essen
Übung Cybersicherheit

-- 1 of 26 --

© `SYSSEC`, Prof. Dr. Lucas Davi

## SYSTEMSICHERHEIT
Prof. Dr. L. Davi

### Aufgabe 1
Vorlesung Cybersicherheit SoSe 2023

## 1. Warum werden bei Mulcs Protecon Rings eingesetzt?
Würde es nicht ausreichen nur Access Control Lists (ACLs) zu verwenden?

- Ohne Protecon Rings läu9 ein Prozess in einer einzigen Domäne,
d.h. er hat feste Zugri<srechte, die sich während der Ausführung

nicht ändern.

- Manchmal bedarf es aber einer kurzweiligen Erhöhung der
Zugri<srechte, um beispielweise System Calls (syscall, int 0x80)

erfolgreich auszuführen. Dies wird über das Prinzip von Protecon

Rings gewährleiste.

-- 2 of 26 --

© `SYSSEC`, Prof. Dr. Lucas Davi

## SYSTEMSICHERHEIT
Prof. Dr. L. Davi

### Aufgabe 1
Vorlesung Cybersicherheit SoSe 2023

## 1. Für Prozesse die lesen und schreiben wollen sind Access Brackets interessant
-- 3 of 26 --

© `SYSSEC`, Prof. Dr. Lucas Davi

## SYSTEMSICHERHEIT
Prof. Dr. L. Davi

### Aufgabe 1
Vorlesung Cybersicherheit SoSe 2023

## 1. Für Prozesse die executen wollen
-- 4 of 26 --

© `SYSSEC`, Prof. Dr. Lucas Davi

## SYSTEMSICHERHEIT
Prof. Dr. L. Davi

### Aufgabe 1
Vorlesung Cybersicherheit SoSe 2023

## 2. Wie werden die Einhaltung der Protecon Rings sichergestellt?
- Der Supervisor wacht über die Einhaltung der
Protecon Rings.

- Er läu9 in Ring 0/1 und stellt die höchste Instanz
des Systems dar (Root of Trust).

-- 5 of 26 --

© `SYSSEC`, Prof. Dr. Lucas Davi

## SYSTEMSICHERHEIT
Prof. Dr. L. Davi

### Aufgabe 1
Vorlesung Cybersicherheit SoSe 2023

## 3. a) Was sind Gate Segmente?
- Welche Aufgaben haben Gate Segmente?
a)

- Gate Segmente sind eine spezielle Art von Code
Segmenten

- Wenn ein Prozess Code aufru9, der in einem
höher privilegierten Ring laufen muss, passiert

dies durch ein Gate Segmentb)

- Gate Segmente prüfen die übergebenen
Argumente (aus niedriger-privilegierten Ringen)

hinsichtlich

Typ und Länge.

- Ferner wird auch geprü9 ob der anfragende
Prozess das Segment an einer gülgen

### Startadresse aufru9
-- 6 of 26 --

© `SYSSEC`, Prof. Dr. Lucas Davi

## SYSTEMSICHERHEIT
Prof. Dr. L. Davi

### Aufgabe 1
Vorlesung Cybersicherheit SoSe 2023

## 4. Warum muss für alle Gate Segmente die Relaon r2 < r3 gelten? Würde zum Beispiel ein Gate Segment mit
r2 = r3 Sinn ergeben?

- Wenn r2 = r3 gelten würde, könnte niemals eine Ring Transion zu einem höher-
privilegierten Ring durchgeführt werden. Ein Prozess mit r = r3 würde seinen aktuellen

Ring nicht verlassen. Ring Transions zu höher-privilegierten Ringen sind nur bei der

Relaon r2 < r3 möglich.

- Das Prinzip von Gate Segmenten ist es aber gerade solche Ring Transions zu
gewährleisten

-- 7 of 26 --

© `SYSSEC`, Prof. Dr. Lucas Davi

## SYSTEMSICHERHEIT
Prof. Dr. L. Davi

### Aufgabe 1 - Zugri2srechte in Mulcs
Vorlesung Cybersicherheit SoSe 2023

## 1. Prozess P1 möchte auf Segment A lesend zugreifen
- Marc.ProjectA.a: P1 (r = 3)
Jedes Segment hat eine `ACL`, Segment

enthält zum Beispiel code oder andere

### Informaonen Daten die für einen Prozess
interessant/gebraucht sind/werden

### Lesen und
schreiben

### Lesen aber
nicht

schreiben

### Nicht lesen
und nicht

schreiben

-- 8 of 26 --

© `SYSSEC`, Prof. Dr. Lucas Davi

## SYSTEMSICHERHEIT
Prof. Dr. L. Davi

### Aufgabe 1 - Zugri2srechte in Mulcs
Vorlesung Cybersicherheit SoSe 2023

## 2. Prozess P7 möchte auf Segment A schreibend zugreifen
- Kim.ProjectD.a: P7 (r = 4)
Jedes Segment hat eine `ACL`, Segment

enthält zum Beispiel code oder andere

### Informaonen Daten die für einen Prozess
interessant/gebraucht sind/werden

### Lesen und
schreiben

### Lesen aber
nicht

schreiben

### Nicht lesen
und nicht

schreiben

- Kim.ProjectD.a: P7 (r = 4)
-- 9 of 26 --

© `SYSSEC`, Prof. Dr. Lucas Davi

## SYSTEMSICHERHEIT
Prof. Dr. L. Davi

### Aufgabe 1 - Zugri2srechte in Mulcs
Vorlesung Cybersicherheit SoSe 2023

## 3. Prozess P2 möchte auf Segment B lesend zugreifen
- Maria.ProjectB.m: P2 (r = 0)
Jedes Segment hat eine `ACL`, Segment

enthält zum Beispiel code oder andere

### Informaonen Daten die für einen Prozess
interessant/gebraucht sind/werden

## 1. Liegt ein passender Eintrag in der ACL vor?
## 1. Nein!
-- 10 of 26 --

© `SYSSEC`, Prof. Dr. Lucas Davi

## SYSTEMSICHERHEIT
Prof. Dr. L. Davi

### Aufgabe 1 - Zugri2srechte in Mulcs
Vorlesung Cybersicherheit SoSe 2023

## 4. Prozess P4 möchte auf Segment B schreibend zugreifen
- Steve.ProjectC.m: P4 (r = 2)
Jedes Segment hat eine `ACL`, Segment

enthält zum Beispiel code oder andere

### Informaonen Daten die für einen Prozess
interessant/gebraucht sind/werden

-- 11 of 26 --

© `SYSSEC`, Prof. Dr. Lucas Davi

## SYSTEMSICHERHEIT
Prof. Dr. L. Davi

### Aufgabe 1 - Zugri2srechte in Mulcs
Vorlesung Cybersicherheit SoSe 2023

## 5. Prozess P6 möchte auf Segment B lesend zugreifen
- Kim.ProjectD.a: P6 (r = 0)
Jedes Segment hat eine `ACL`, Segment

enthält zum Beispiel code oder andere

### Informaonen Daten die für einen Prozess
interessant/gebraucht sind/werden

## 1. Liegt ein passender Eintrag in der ACL vor?
## 1. Zugri< wird verweigert!
-- 12 of 26 --

© `SYSSEC`, Prof. Dr. Lucas Davi

## SYSTEMSICHERHEIT
Prof. Dr. L. Davi

### Aufgabe 1 - Zugri2srechte in Mulcs
Vorlesung Cybersicherheit SoSe 2023

## 6. Prozess P1 möchte auf Segment A schreibend zugreifen
- Marc.ProjectA.a: P1 (r = 3)
Jedes Segment hat eine `ACL`, Segment

enthält zum Beispiel code oder andere

### Informaonen Daten die für einen Prozess
interessant/gebraucht sind/werden

## 1. Liegt ein passender Eintrag in der ACL vor?
## 1. Zugri< wird verweigert!
-- 13 of 26 --

© `SYSSEC`, Prof. Dr. Lucas Davi

## SYSTEMSICHERHEIT
Prof. Dr. L. Davi

### Aufgabe 1 - Zugri2srechte in Mulcs
Vorlesung Cybersicherheit SoSe 2023

## 7. Prozess P6 möchte Segment C ausführen
- Kim.ProjectD.a: P6 (r = 0)
Jedes Segment hat eine `ACL`, Segment

enthält zum Beispiel code oder andere

### Informaonen Daten die für einen Prozess
interessant/gebraucht sind/werden

## 1. Liegt ein passender Eintrag in der ACL vor?
## 1. Ja!
## 2. Brackets check
## 1. (r2,r3) -> (3,5) -> Call Brackets
## 2. r2 höchster Ring der lesen (read) kann
## 3. r3 höchster Ring der lesen (ausführen) kann
## 4. R1 <= r <= r2 = 0 <= 0 <= 0
R3 < r R2 < r <=

r3

### R1 <= r <=
r2

### R < r1
Ausführen

verboten

### Ausführen
mit

### Transion
in r2

### Ausführen
erlaubt

### Ausführen
mit

### Transion
in r1

-- 14 of 26 --

© `SYSSEC`, Prof. Dr. Lucas Davi

## SYSTEMSICHERHEIT
Prof. Dr. L. Davi

### Aufgabe 1 - Zugri2srechte in Mulcs
Vorlesung Cybersicherheit SoSe 2023

## 8. Prozess P3 möchte Segment C ausführen
- Maria.ProjectB.m P3 (r = 5)
Jedes Segment hat eine `ACL`, Segment

enthält zum Beispiel code oder andere

### Informaonen Daten die für einen Prozess
interessant/gebraucht sind/werden

## 1. Liegt ein passender Eintrag in der ACL vor?
## 1. Ja!
## 2. Check Brackets
## 1. (r2,r3) -> (3,5) -> Call Brackets
## 2. r2 höchster Ring der lesen (read) kann
## 3. r3 höchster Ring der lesen (ausführen) kann
## 4. R2 < r <= r3 = 0 < 5 <= 5
## 5. Ring Transion nach r2 = 0
## 6. Möglich da hier Gate Segment (r2<r3)
R3 < r R2 < r <=

r3

### R1 <= r <=
r2

### R < r1
Ausführen

verboten

### Ausführen
mit

### Transion
in r2

### Ausführen
erlaubt

### Ausführen
mit

### Transion
in r1

-- 15 of 26 --

© `SYSSEC`, Prof. Dr. Lucas Davi

## SYSTEMSICHERHEIT
Prof. Dr. L. Davi

### Aufgabe 1 - Zugri2srechte in Mulcs
Vorlesung Cybersicherheit SoSe 2023

## 9. Prozess P2 möchte Segment D ausführen
- Maria.ProjectB.m: P2 (r = 0)
Jedes Segment hat eine `ACL`, Segment

enthält zum Beispiel code oder andere

### Informaonen Daten die für einen Prozess
interessant/gebraucht sind/werden

## 1. Liegt ein passender Eintrag in der ACL vor?
## 1. Ja!
## 2. Check Bracktes
## 1. (r2,r3) -> (3,5) -> Call Brackets
## 2. R < r1 = 0 < 1
## 3. Ring Transion nach r1 = 1
## 4. Möglich, hier muss kein Gate Segment sein
```
-- 16 of 26 --
© SYSSEC, Prof. Dr. Lucas Davi
SYSTEMSICHERHEIT
Prof. Dr. L. Davi
Aufgabe 1 - Zugri2srechte in Mulcs
Vorlesung Cybersicherheit SoSe 2023
10. Prozess P5 möchte Segment D ausführen
• Steve.ProjectC.m P5 (r = 6)
Jedes Segment hat eine ACL, Segment
enthält zum Beispiel code oder andere
Informaonen Daten die für einen Prozess
interessant/gebraucht sind/werden
1. Liegt ein passender Eintrag in der ACL vor?
1. Ja!
2. Call Brackets check
1. R3 < r = 5 < 6
2. Keine Ausführung möglich
-- 17 of 26 --
© SYSSEC, Prof. Dr. Lucas Davi
SYSTEMSICHERHEIT
Prof. Dr. L. Davi
Aufgabe 1 - Zugri2srechte in Mulcs
Vorlesung Cybersicherheit SoSe 2023
11. Prozess P4 möchte Segment D ausführen. P4 übergibt einen Pointer der auf Speicher in Ring 3
zeigt. Prüfen Sie ob der Zugri2 erlaubt wird! Berücksichgen Sie aber diesmal auch den übergebenen
Pointer!
• Maria.ProjectB.m P3 (r = 5)
1. Liegt ein passender Eintrag in der ACL vor?
1. Ja!
-- 18 of 26 --
© SYSSEC, Prof. Dr. Lucas Davi
SYSTEMSICHERHEIT
Prof. Dr. L. Davi
Aufgabe 2 – Linux Security
Vorlesung Cybersicherheit SoSe 2023
a) Der Administrator ist mit dem Nutzer ’devconnect’ verbunden. Eine Datei hat die folgenden Rechte:
-rw-r–r– devconnect devconnect
Kann der Administrator als Nutzer devconnect schreibend auf diese zugreifen?
a) Struktur:
- : Cle
d: directory
rw- r– r–
Rechte
für
Benutzer
Rechte
für
Gruppe
Rechte
für
others
Antwort: Ja, kann er!
-- 19 of 26 --
© SYSSEC, Prof. Dr. Lucas Davi
SYSTEMSICHERHEIT
Prof. Dr. L. Davi
Aufgabe 2 – Linux Security
Vorlesung Cybersicherheit SoSe 2023
b) Der Administrator hat sich als Nutzer ’Bob’ eingeloggt. Ein Ordner ’DirectoryAlice’ hat die folgenden Rechte:
drwxr-xr-- Alice GroupAlice DirectoryAlice
Kann der Nutzer Bob den Ordner ’DirectoryAlice’ ö2nen?
b)
1.Bob ist nicht Alice
2.Bob gehört nicht zur Gruppe „GroupAlice“
3. Für Bob greifen die „Other“ Rechte
Antwort: Nein, kann er nicht!
-- 20 of 26 --
© SYSSEC, Prof. Dr. Lucas Davi
SYSTEMSICHERHEIT
Prof. Dr. L. Davi
Aufgabe 2 – Linux Security
Vorlesung Cybersicherheit SoSe 2023
c) Welche Datei enthält die Liste der Nutzer eines Linuxsystems?
• Die Datei beCndet sich unter /etc/passwd
-- 21 of 26 --
© SYSSEC, Prof. Dr. Lucas Davi
SYSTEMSICHERHEIT
Prof. Dr. L. Davi
Aufgabe 2 – Linux Security
Vorlesung Cybersicherheit SoSe 2023
c) Welche Rechte setzten die folgenden Kommandos: chmod 444, chmod 777, chmod 641?
• chmod 444 : r– r– r—
• Chmod777: rwx rwx rwx
• Chmod641: rw- r-- --x
-- 22 of 26 --
© SYSSEC, Prof. Dr. Lucas Davi
SYSTEMSICHERHEIT
Prof. Dr. L. Davi
Aufgabe 2 – Linux Security
Vorlesung Cybersicherheit SoSe 2023
e) Was bedeutet es für einen Benutzer das ’Execute-Recht’ auf ein Verzeichnis (Ordner) zu besitzen.
Was bedeutet das ’Write- Recht’?
• Das Execute-Recht bedeutet, dass der Nutzer durch das Verzeichnis / Ordnerstruktur navigieren kann.
• Das Write-Recht erlaubt es Einträge (Dateien und Ordner) innerhalb des Verzeichnises bzw. Ordners zu erstellen
-- 23 of 26 --
© SYSSEC, Prof. Dr. Lucas Davi
SYSTEMSICHERHEIT
Prof. Dr. L. Davi
Aufgabe 2 – Linux Security
Vorlesung Cybersicherheit SoSe 2023
e) Was ist das ’SUID’ Nag unter Linux?
• Das 'SUID' wird benutzt um einen Befehl mit den Rechten des Eigentümers der Datei auszuführen, anstelle des
Benutzers, der den Befehl ausführt
-- 24 of 26 --
© SYSSEC, Prof. Dr. Lucas Davi
SYSTEMSICHERHEIT
Prof. Dr. L. Davi
Aufgabe 2 – Linux Security
Vorlesung Cybersicherheit SoSe 2023
e) Beschreiben Sie das 'GUID‘ Nag
• Das 'GUID' wird benutzt um einen Befehl als Teilnehmer der Gruppe auszuführen, zu welcher die Datei gehört,
anstelle der Gruppe, zu welcher der ausführende Nutzer gehört.
-- 25 of 26 --
© SYSSEC, Prof. Dr. Lucas Davi
Vielen Dank für Ihre Aufmerksamkeit
Übung Cybersicherheit SoSe 2025
Chrisan Niesler
Tristan Löding
Fakultät für Informak
Arbeitsgruppe Systemsicherheit hps://www.syssec.wiwi.uni-due.de/
Universität Duisburg-Essen
-- 26 of 26 --