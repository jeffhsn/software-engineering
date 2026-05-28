# aufgaben

> Converted from PDF | Pages: 3

---

### Universität Duisburg-Essen
Fakultät für Informatik

### Professor im Bereich Informatik
Prof. Dr.-Ing. Lucas Davi

### Christian Niesler
Übungsblatt 12

### Vorlesung “Cybersicherheit”
Sommersemester 2025

### Praktische Übung Betriebssystemsicherheit
1 Multics

### Notation
In dieser Übung wird die gleiche Notation wie in der Vorlesung verwendet:

- Access Bracket (r1,r2), wobei r1 das Schreibrecht und r2 das Leserecht definiert
- Call Bracket (r2,r3), wobei r2 das Leserecht und r3 das Ausführungsrecht definiert
- Aktuelle Ringnummer eines Prozesses ist r
- Bei einer Ring Transition wechselt der Prozess in Ring r′.
- Eine User-ID in Multics wird wie folgt definiert: Person.Project.Tag
– Person: Name des Users

– Project: Gruppe des Users

– Tag: Art der Tätigkeit des Users: (m) interaktiv, (a) batch

### Theoriefragen
Beantworten Sie die folgenden Fragen:

## 1. Warum werden bei Multics Protection Rings eingesetzt? Würde es nicht ausreichen nur Access
Control Lists (ACLs) zu verwenden?

## 2. Wie werden die Einhaltung der Protection Rings sichergestellt?
## 3. Fragen zu Gate Segmenten:
(a) Was sind Gate Segmente?

(b) Welche Aufgaben haben Gate Segmente?

## 4. Warum muss für alle Gate Segmente die Relation r2 < r3 gelten? Würde zum Beispiel ein Gate
Segment mit r2 = r3 Sinn ergeben?

1

-- 1 of 3 --

### Zugriffsrechte in Multics
Gegeben seien folgende Multics User mit den folgenden zugehörigen Prozessen (Pi):

- Marc.ProjectA.a: P1 (r = 3)
- Maria.ProjectB.m: P2 (r = 0), P3 (r = 5)
- Steve.ProjectC.m: P4 (r = 2), P5 (r = 6)
- Kim.ProjectD.a: P6 (r = 0), P7 (r = 4)
Ebenfalls seien folgende Segmente mit zugehörigen ACLs gegeben:

rw Steve.ProjectC.m

r *.ProjectA.a

rw *.*.m

rw Kim.ProjectD.a

n *.ProjectC.*

rwe Kim.ProjectD.a

n *.ProjectA.*

rwe Maria.ProjectB.m

rwe Steve.*.*

rwe *.ProjectD.*

### Segment A
Ring Bracket: (3,5), (5,5)

### Code Segment C
Ring Bracket: (0,0), (0,5)

### Code Segment D
Ring Bracket: (1,3), (3,5)

n *.*.a

n *.ProjectA.*

### Segment B
Ring Bracket: (0,2), (2,2)

rwe *.ProjectB.*

Bestimmen und begründen Sie für die folgenden Fälle, ob der angefragte Zugriff vom Supervisor erlaubt

wird oder nicht! Begründen Sie Ihre Entscheidung!

Falls eine Antwort positiv ist, geben Sie auch an, ob der Prozess in seinem aktuellen Ring weiterläuft

oder in einen anderen Ring wechseln muss! Geben Sie für diesen Fall auch die neue Ringnummer an!

## 1. Prozess P1 möchte auf Segment A lesend zugreifen.
## 2. Prozess P7 möchte auf Segment A schreibend zugreifen.
## 3. Prozess P2 möchte auf Segment B lesend zugreifen.
## 4. Prozess P4 möchte auf Segment B schreibend zugreifen.
## 5. Prozess P6 möchte auf Segment B lesend zugreifen.
## 6. Prozess P1 möchte auf Segment A schreibend zugreifen.
## 7. Prozess P6 möchte Segment C ausführen.
## 8. Prozess P3 möchte Segment C ausführen.
## 9. Prozess P2 möchte Segment D ausführen.
## 10. Prozess P5 möchte Segment D ausführen.
## 11. Prozess P4 möchte Segment D ausführen. P4 übergibt einen Pointer der auf Speicher in Ring 3 zeigt.
Prüfen Sie ob der Zugriff erlaubt wird! Berücksichtigen Sie aber diesmal auch den übergebenen

Pointer!

2

-- 2 of 3 --
2 Linux Security

Linux verfügt ähnlich wie ’Multics’ ein Rechte-Management. Besonders in der Praxis ist der Umgang

mit Dateirechten für Administratoren von großer Bedeutung. In den folgenden Aufgaben sollen Sie einige

Linux-Dateimanagement Fragen beantworten. Linux ist eins der am weitesten verbreiteten Betriebssyste-

me im Server-Bereich. Eine kleine Hilfe stellt die folgende Webseite dar: [https://nsrc.org/workshops/](https://nsrc.org/workshops/)

2019/sanog33-sysadmin/sysadm/labs/permissions-exercises.htm.

- Der Administrator ist als mit dem Nutzer ’devconnect’ verbunden. Eine Datei hat die folgenden
Rechte: -rw-r–r– devconnect devconnect. Kann der Administrator als Nutzer devconnect schreibend

auf diese zugreifen?

- Der Administrator hat sich als Nutzer ’Bob’ eingeloggt. Ein Ordner ’DirectoryAlice’ hat die folgen-
den Rechte: drwxr-xr– Alice GroupAlice DirectoryAlice. Kann der Nutzer Bob den Ordner ’Direc-

toryAlice’ öffnen?

- Welche Datei enthält die Liste der Nutzer eines Linuxsystems?
- Welche Rechte setzten die folgenden Kommandos: chmod 444, chmod 777, chmod 641?
- Was bedeutet es für einen Benutzer das ’Exceute-Recht’ auf ein Verzeichnis (Ordner) zu besitzen.
Was bedeutet das ’Write- Recht’ ?

- Was ist das ’SUID’ flag unter Linux?
- Beschreiben Sie das ’GUID’ flag.
3

-- 3 of 3 --