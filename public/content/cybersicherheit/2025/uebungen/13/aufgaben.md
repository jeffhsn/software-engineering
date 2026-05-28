# aufgaben

> Converted from PDF | Pages: 1

---

### Universität Duisburg-Essen
Fakultät für Informatik

### Professor im Bereich Informatik
Prof. Dr.-Ing. Lucas Davi

### Christian Niesler
Übungsblatt 13

### Vorlesung “Cybersicherheit”
Sommersemester 2025

### Reverse Engineering und Malware
Für dieses Aufgabenblatt können Sie die Virtuelle Maschine von Übungsblatt zum Thema Reverse En-

gineering/Exploits benutzen. Diese können sie unter folgendem Link herunterladen und anschließend in

### Oracle VirtualBox1 importieren:
[https://uni-duisburg-essen.sciebo.de/s/WR5MKiH97UntQkh.](https://uni-duisburg-essen.sciebo.de/s/WR5MKiH97UntQkh.)

Der Benutzername und das Passwort lautet user. Alternativ dürfen Sie natürlich auch ihr eigenes System

zur Lösung der Aufgabe verwenden.

### Statische Analyse mit Strings
Eine der einfachsten Methoden um statische Analyse von Programmen durchzuführen ist das Finden und

Extrahieren von Zeichenketten aus einer Programmdatei. In dieser Aufgabe sollen Sie drei Programme

mit Hilfe von statischer Analyse untersuchen. Die Programme finden Sie im Moodle-Kurs.

Aufgabe 1.

- Benutzen Sie das Programm strings um Zeichenketten aus den Dateien 1, 2 und 3 zu extrahieren.
Sie können ein einfaches Programm/Skript schreiben um die Ausgabe weiter zu filtern. Um welche

Programme handelt es sich bei den jeweiligen Dateien? Was können Sie anhand der Zeichenketten

außerdem über die Funktionsweise der Programme sagen?

- Die Ausgabe für jedes der drei Programme enthält viele Zeichenketten, welche keine sinnvolle
Information enthält. Erläutern Sie wie es dazu kommt.

### Obfuskation
In dieser Aufgabe sollen Sie die String-Obfuskierung eines Programmes verstehen und implementieren.

Im Moodle-Kurs finden Sie dazu die entsprechenden Dateien. Hinweis: Die Aufgabe ist sowohl auf Linux

als auch unter Windows lösbar. Sie müssen die Aufgabe natürlich nur auf einem System lösen.

Aufgabe 2.

- In dieser Aufgabe sollen Sie ein Testprogramm untersuchen welches eine typische Funktion einer
Malware implementiert, nämlich eine `DNS`-Abfrage für eine Domain. Dies dient in der Praxis

- B. dazu Kontakt zu einem Command-and-Control-Server aufzubauen. Als Analyst möchten Sie
natürlich den Domainnamen herausfinden um diesen zu sperren und die Malware unschädlich zu

machen. Analysieren Sie das Programm mal_linux bzw. mal_windows.exe und finden Sie heraus

welcher Domainname aufgelöst werden soll. Hinweis: Der Domainname der aufgelöst werden soll

existiert nicht. Es wird eine entsprechende Fehlermeldung ausgegeben.

- Extrahieren Sie den obfuskierten Domainnamen und reimplementieren Sie den Deobfuskierungsal-
gorithmus, so dass Sie aus den extrahierten Daten den Domainname im Klartext anzeigen lassen

können.

1[https://www.virtualbox.org/](https://www.virtualbox.org/)

1

-- 1 of 1 --