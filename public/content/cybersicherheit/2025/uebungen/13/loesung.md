# Übungsblatt 2: Praktische Übung Symmetrische Kryptographie

> Converted from PDF | Pages: 14

---

© `SYSSEC`, Prof. Dr. Lucas Davi

Übungsblatt 13:

### Reverse Engineering und Malware
Christian Niesler

### Tristan Löding
Fakultät für Informatik

Arbeitsgruppe Systemsicherheit [https://www.syssec.wiwi.uni-due.de/](https://www.syssec.wiwi.uni-due.de/)

### Universität Duisburg-Essen
Übung Cybersicherheit

-- 1 of 14 --

© `SYSSEC`, Prof. Dr. Lucas Davi

## SYSTEMSICHERHEIT
Prof. Dr. L. Davi

### Aufgabe 1
Vorlesung Cybersicherheit SoSe 2023

- Benutzen Sie das Programm strings um Zeichenketten aus den Dateien 1, 2 und 3 zu extrahieren.
Um welche Programme handelt es sich bei den jeweiligen Dateien?

Was können Sie anhand der Zeichenketten außerdem über die Funktionsweise der Programme sagen?

- 1. Datei: 7-Zip:
- Nützliche Strings:
-- 2 of 14 --

© `SYSSEC`, Prof. Dr. Lucas Davi

## SYSTEMSICHERHEIT
Prof. Dr. L. Davi

### Aufgabe 1
Vorlesung Cybersicherheit SoSe 2023

- Benutzen Sie das Programm strings um Zeichenketten aus den Dateien 1, 2 und 3 zu extrahieren.
Um welche Programme handelt es sich bei den jeweiligen Dateien?

Was können Sie anhand der Zeichenketten außerdem über die Funktionsweise der Programme sagen?

- 2. Datei: Notepad
- Nützliche Strings:
-- 3 of 14 --

© `SYSSEC`, Prof. Dr. Lucas Davi

## SYSTEMSICHERHEIT
Prof. Dr. L. Davi

### Aufgabe 1
Vorlesung Cybersicherheit SoSe 2023

- Benutzen Sie das Programm strings um Zeichenketten aus den Dateien 1, 2 und 3 zu extrahieren.
Um welche Programme handelt es sich bei den jeweiligen Dateien?

Was können Sie anhand der Zeichenketten außerdem über die Funktionsweise der Programme sagen?

- 3. Datei: VLC
- Nützliche Strings:
-- 4 of 14 --

© `SYSSEC`, Prof. Dr. Lucas Davi

## SYSTEMSICHERHEIT
Prof. Dr. L. Davi

### Aufgabe 1
Vorlesung Cybersicherheit SoSe 2023

- Die Ausgabe für jedes der drei Programme enthält viele Zeichenketten, welche keine sinnvolle Information
enthält. Erläutern Sie wie es dazu kommt.

- Programme wie strings versuche jegliche Daten als Zeichenketten zu interpretieren
- Allerdings enthalten Programme auch andere Datentypen (etwa int oder double) und
auch Code (Instruktionen)

- Manchmal können diese Daten auch als Zeichenketten interpretiert werden. Deswegen
enthält die Ausgabe so viele Strings welche keinen offensichtlichen Sinn haben

-- 5 of 14 --

© `SYSSEC`, Prof. Dr. Lucas Davi

## SYSTEMSICHERHEIT
Prof. Dr. L. Davi

### Aufgabe 2
Vorlesung Cybersicherheit SoSe 2023

- Analysieren Sie das Programm mal_linux bzw. mal_windows.exe und finden Sie heraus welcher Domainname
aufgelöst werden soll.

Hinweis: Der Domainname der aufgelöst werden soll existiert nicht. Es wird eine entsprechende Fehlermeldung

ausgegeben.

### Domainname: www.evil-domain.abcd
-- 6 of 14 --

© `SYSSEC`, Prof. Dr. Lucas Davi

## SYSTEMSICHERHEIT
Prof. Dr. L. Davi

### Aufgabe 2
Vorlesung Cybersicherheit SoSe 2023

- Extrahieren Sie den obfuskierten Domainnamen und reimplementieren Sie den Deobfuskierungsalgorithmus, so
dass Sie aus den extrahierten Daten den Domainname im Klartext anzeigen lassen können

-- 7 of 14 --

© `SYSSEC`, Prof. Dr. Lucas Davi

## SYSTEMSICHERHEIT
Prof. Dr. L. Davi

### Aufgabe 2
Vorlesung Cybersicherheit SoSe 2023

- Extrahieren Sie den obfuskierten Domainnamen und reimplementieren Sie den Deobfuskierungsalgorithmus, so
dass Sie aus den extrahierten Daten den Domainname im Klartext anzeigen lassen können

Mit Hilfe eines Decompilers können die Sie herausfinden, dass einfaches Byte-`XOR` genutzt wird um den

String zu verschleiern. Eine einfache Lösungen in Python ist die folgende:

obfus_bytes = [22, 18, 18, 55, 124, 99, 124, 125, 60, 113, 122, 116, 120, 108, 107, 47, 96, 103, 102, 125]

key = [97, 101, 101, 25, 25, 21, 21, 17, 17, 21, 21, 25, 25, 5, 5, 1, 1, 5, 5, 25]

temp = ""

for i in range(len(obfus_bytes)):

temp += chr(obfus_bytes[i] ^ key[i])

print("Deobfuscated string with key:", temp)

-- 8 of 14 --

© `SYSSEC`, Prof. Dr. Lucas Davi

### Aufbau des Stacks:
Funktionsprolog und -epilog
9 Vorlesung Cybersicherheit SoSe 2023

-- 9 of 14 --

© `SYSSEC`, Prof. Dr. Lucas Davi

## SYSTEMSICHERHEIT
Prof. Dr. L. Davi

### Beispiel anhand des Codes aus Übung 9
Vorlesung Cybersicherheit SoSe 2023

### Was für Informationen (für den Aufbau des
Stackframe) gewinnen wir aus dem Code:

- Es gibt ein Argument: (char *password)
- Zudem zwei lokale Variablen:
- Einen Integer (4 Bytes)
- Einen Buffer (16 Bytes)
- Klar ist: pw_check wurde von einer anderen
Funktion aufgerufen

-- 10 of 14 --

© `SYSSEC`, Prof. Dr. Lucas Davi

## SYSTEMSICHERHEIT
Prof. Dr. L. Davi

### Funktionsprolog (x86)
Vorlesung Cybersicherheit SoSe 2023

push ebp

mov ebp, esp

sub esp, <Größe der lokalen Variablen>

Der Prolog einer Funktion wird zu Beginn der Funktion ausgeführt. Sein Hauptzweck ist es, den Stack-Frame für die

### Funktion vorzubereiten. Typischerweise sieht dieser so aus
Legt den aktuellen Wert des Base-Pointers auf den Stack

-> Sichert Kontext der vorherigen Funktion

### Setzt Base-Pointer auf den aktuellen Stack-Pointer um einen
neuen Stack-Frame „starten“ zu können

-> ebp befindet sich damit am Beginn des neuen Stack-Frame,

bei den lokalen Variablen und der Rücksprungadresse

### Schafft innerhalb des neuen Stack-Frames Platz für lokale
Variablen

-> Da ein Stack „nach unten“ wächst wird dekrementiert

-- 11 of 14 --

© `SYSSEC`, Prof. Dr. Lucas Davi

## SYSTEMSICHERHEIT
Prof. Dr. L. Davi

### In unserem Kontext
Vorlesung Cybersicherheit SoSe 2023

push ebp

mov ebp, esp

sub esp, 20
4 Bytes für Variable auth, 16 Bytes für pw_buffer

0xff…

0x00...

pw_check() frame

&password

return address

saved ebp

auth

pw_buffer

…

strcpy() frame

…

### Wurde, da es ein Argument ist, mit
Aufruf der Funktion, von der

vorherigen Funktion, auf den Stack

gelegt

### Ebenfalls durch call
pw_check

gesichert

-- 12 of 14 --

© `SYSSEC`, Prof. Dr. Lucas Davi

## SYSTEMSICHERHEIT
Prof. Dr. L. Davi

### Funktionsepilog (x86)
Vorlesung Cybersicherheit SoSe 2023

mov esp, ebp

pop ebp

ret

Der Epilog ist ein Standardabschnitt am Ende einer Funktion, der dafür verantwortlich ist, den Zustand des Stacks zu bereinigen und

die Funktion sauber zu verlassen, um zur aufrufenden Funktion zurückzukehren. Der Epilog stellt sicher, dass die durch den Prolog

vorgenommenen Änderungen am Stack und an den Registern rückgängig gemacht werden, damit der ursprüngliche Kontext der

aufrufenden Funktion wiederhergestellt wird.

### Zurücksetzen des Stack-Pointers (esp) auf den Base-Pointer
(ebp), damit alle lokalen Variablen, die Speicherplatz auf dem

Stack belegen, effektiv "vergessen" werden.

Entfernt den obersten Wert vom Stack (den alten ebp-Wert) und

lädt ihn zurück in das ebp-Register.

-> Stack-Frame der aktuellen Funktion ist aufgelöst und ebp zeigt

wieder auf den Base-Pointer der aufrufenden Funktion.

### Nimmt die Rücksprungadresse, die sich jetzt oben
auf dem Stack befindet (nachdem pop ebp den

### Stack-Pointer um 4 Bytes erhöht hat), und springt zu
dieser Adresse.

-- 13 of 14 --

© `SYSSEC`, Prof. Dr. Lucas Davi

### Vielen Dank für Ihre Aufmerksamkeit
Übung Cybersicherheit SoSe 2025

### Christian Niesler
Tristan Löding

### Fakultät für Informatik
Arbeitsgruppe Systemsicherheit [https://www.syssec.wiwi.uni-due.de/](https://www.syssec.wiwi.uni-due.de/)

### Universität Duisburg-Essen
-- 14 of 14 --