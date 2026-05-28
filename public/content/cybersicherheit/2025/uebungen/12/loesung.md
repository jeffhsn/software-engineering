# loesung

> Converted from PDF | Pages: 4

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

### Antwort:
- Ohne Protection Rings läuft ein Prozess in einer einzigen Domäne, d.h. ihm sind
feste Zugriffsrechte zugeteilt, die sich während der Ausführung nicht ändern.

- Manchmal bedarf es aber einer kurzweiligen Erhöhung der Zugriffsrechte um beispiel-
weise System Calls erfolgreich auszuführen. Dies wird über das Prinzip von Protec-

tion Rings gewährleistet.

## 2. Wie werden die Einhaltung der Protection Rings sichergestellt?
Antwort: Der Supervisor wacht über die Einhaltung der Protection Rings. Er läuft in

Ring 0/1 und stellt die höchste Instanz des Systems dar (Root of Trust).

1

-- 1 of 4 --

## 3. Fragen zu Gate Segmenten:
(a) Was sind Gate Segmente?

(b) Welche Aufgaben haben Gate Segmente?

### Antwort:
(a) Gate Segmente sind eine spezielle Art von Code Segmenten. Sie sind die Tür für die

### Prozesse die in höher-privilegierte Ringe wechseln möchten
(b) Gate Segmente prüfen die übergebenen Argumente (aus niedriger-privilegierten Rin-

gen) hinsichtlich Typ und Länge. Ferner wird auch geprüft ob der anfragende Prozess

das Segment an einer gültigen Startaddresse aufruft.

## 4. Warum muss für alle Gate Segmente die Relation r2 < r3 gelten? Würde zum Beispiel ein Gate
Segment mit r2 = r3 Sinn ergeben?

Antwort: Wenn r2 = r3 gelten würde, könnte niemals eine Ring Transition zu einem

höher-privilegierten Ring durchgeführt werden. Ein Prozess mit r = r3 würde seine aktu-

ellen Ring nicht verlassen. Ring Transitions zu höher-privilegierten Ringen sind nur bei

der Relation r2 < r3 möglich. Das Prinzip von Gate Segmenten ist es aber gerade solche

Ring Transitions zu gewährleisten.

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
Antwort: Zugriff erlaubt, da `ACL` ok und r = 3 < r2 = 5

## 2. Prozess P7 möchte auf Segment A schreibend zugreifen.
Antwort: Zugriff nicht erlaubt: `ACL` ok und r = 4 > r1 = 3

## 3. Prozess P2 möchte auf Segment B lesend zugreifen.
2

-- 2 of 4 --

Antwort: Zugriff nicht erlaubt: Nein, da kein `ACL`-Eintrag vorhanden ist.

## 4. Prozess P4 möchte auf Segment B schreibend zugreifen.
Antwort: Zugriff nicht erlaubt: `ACL` ok aber r = 2 > r1 = 0

## 5. Prozess P6 möchte auf Segment B lesend zugreifen.
Antwort: Zugriff nicht erlaubt, da `ACL` batch (a) Usern Zugriff verweigert

## 6. Prozess P1 möchte auf Segment A schreibend zugreifen.
Antwort: Zugriff nicht erlaubt: `ACL` verbietet dies. r = 3 ≤ r1 = 3

## 7. Prozess P6 möchte Segment C ausführen.
Antwort: Zugriff erlaubt, da `ACL` ok und r = 0 ≤ r1 = 0

### Keine Ring transition, da r1 = 0 ≤ r = 0 ≤ r2 = 0
## 8. Prozess P3 möchte Segment C ausführen.
Antwort: Zugriff erlaubt, da `ACL` ok und r2 = 0 < r = 5 ≤ r3 = 5

### Ring transition zu r′ = 0 = r2
## 9. Prozess P2 möchte Segment D ausführen.
Antwort: Zugriff erlaubt, da `ACL` ok und r = 0 < r1 = 1

### Ring transition zu r′ = 1 = r1
## 10. Prozess P5 möchte Segment D ausführen.
Antwort: Zugriff nicht erlaubt, da r = 6 > r3 = 5

## 11. Prozess P4 möchte Segment D ausführen. P4 übergibt einen Pointer der auf Speicher in Ring 3 zeigt.
Prüfen Sie ob der Zugriff erlaubt wird! Berücksichtigen Sie aber diesmal auch den übergebenen

Pointer!

Antwort: Zugriff erlaubt, da `ACL` ok und r = 2 ≤ r2 = 3 (Keine Ring Transition)

Pointer ist ok, da dieser in Speicher von Ring 3 zeigt.
2 Linux Security

Linux verfügt ähnlich wie ’Multics’ ein Rechte-Management. Besonders in der Praxis ist der Umgang

mit Dateirechten für Administratoren von großer Bedeutung. In den folgenden Aufgaben sollen Sie einige

Linux-Dateimanagement Fragen beantworten. Linux ist eins der am weitesten verbreiteten Betriebssyste-

me im Server-Bereich. Eine kleine Hilfe stellt die folgende Webseite dar: [https://nsrc.org/workshops/](https://nsrc.org/workshops/)

2019/sanog33-sysadmin/sysadm/labs/permissions-exercises.htm.

- Der Administrator ist als mit dem Nutzer ’devconnect’ verbunden. Eine Datei hat die folgenden
Rechte: -rw-r–r– devconnect devconnect. Kann der Administrator als Nutzer devconnect schreibend

auf diese zugreifen? Antwort. Das Nutzerattribut hat Write-Rechte, folglich kann ’devconnect’

Modifikationen an der Datei vornehmen.

- Der Administrator hat sich als Nutzer ’Bob’ eingeloggt. Ein Ordner ’DirectoryAlice’ hat die folgen-
den Rechte: drwxr-xr– Alice GroupAlice DirectoryAlice. Kann der Nutzer Bob den Ordner ’Direc-

toryAlice’ öffnen? Antwort. Bob ist nicht Alice und gehört auch nicht zur Gruppe ’GroupAlice’.

Für ihn greifen die Einstellungen für Other (Andere). Da für Other kein Execute-Bit gesetzt ist,

kann Bob den Ordner nicht öffnen.

- Welche Datei enthält die Liste der Nutzer eines Linuxsystems? Antwort. Die Datei befindet sich
unter /etc/passwd.

3

-- 3 of 4 --

- Welche Rechte setzten die folgenden Kommandos: chmod 444, chmod 777, chmod 641? Antwort.
Die Rechte-Einstellung 777 setzt für alle –Nutzer (user), Gruppe (group), Andere (others)– die

Read, Write und Execute Berechtigungen. Die Rechte-Einstellung 444 ist äquivalent zu r – – r – – r – –

also nur Leserechte für alle. Die Einstellung 641 ist äquivalent zu r w – r – – – – x .

- Was bedeutet es für einen Benutzer das ’Exceute-Recht’ auf ein Verzeichnis (Ordner) zu besitzen.
Was bedeutet das ’Write- Recht’ ? Antwort. Das Execute-Recht bedeutet, dass der Nutzer durch

das Verzeichnis / Ordnerstruktur navigieren kann. Das Write-Recht erlaubt es Einträge (Dateien

und Ordner) innerhalb des Verzeichnises bzw. Ordners zu erstellen.

- Was ist das ’SUID’ flag unter Linux? Antwort. Das ’SUID’ wird benutzt um einen Befehl als
Eigentümer1 der Datei auszuführen, anstelle des Benutzers, der den Befehl ausführt.

- Beschreiben Sie das ’GUID’ flag. Antwort. Das ’GUID’ wird benutzt um einen Befehl als Teil-
nehmer der Gruppe auszuführen, zu welcher die Datei gehört, anstelle der Gruppe zu welcher der

ausführende Nutzer gehört.

1mit den Rechten des Eigentümers

4

-- 4 of 4 --