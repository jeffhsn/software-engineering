# Übungsblatt 2: Praktische Übung Symmetrische Kryptographie

> Converted from PDF | Pages: 15

---

© `SYSSEC`, Prof. Dr. Lucas Davi

Übungsbla 11:

### Einführung in Soware-Exploits
Chris&an Niesler

### Tristan Löding
Fakultät für Informa&k

Arbeitsgruppe Systemsicherheit hps://www.syssec.wiwi.uni-due.de/

### Universität Duisburg-Essen
Übung Cybersicherheit

-- 1 of 15 --

© `SYSSEC`, Prof. Dr. Lucas Davi

## SYSTEMSICHERHEIT
Prof. Dr. L. Davi

### Aufgabe 1: Hello World (x86-32)
-- 2 of 15 --

© `SYSSEC`, Prof. Dr. Lucas Davi

## SYSTEMSICHERHEIT
Prof. Dr. L. Davi

### GDB Output
1 mov eax,0x4
2 mov ebx,0x1
3 mov ecx,0x804901f
4 mov edx,0xd
5 int 0x80
6 mov eax,0x1
7 xor ebx,ebx
8 int 0x80
9 dec eax

10 gs ins `BYTE` `PTR` es:[edi],dx

11 ins `BYTE` `PTR` es:[edi],dx

12 outs dx,`DWORD` `PTR` ds:[esi]

13 and `BYTE` `PTR` [edi+0x6f],dl

14 jb 8049095 <_start+0x95>

15 and `DWORD` `PTR` fs:[edx],ecx

hps://www.felixclou&er.com/x86/index.html

-- 3 of 15 --

© `SYSSEC`, Prof. Dr. Lucas Davi

## SYSTEMSICHERHEIT
Prof. Dr. L. Davi

### System Calls (32-bit)
- Interface zu Kernel Funk&onen für Benutzerprozesse
- Zugri: auf Hardware
- Prozessmanagement, Speichermanagement
- Assembly Instruk&on: int 0x80 (32-bit), syscall (64-bit)
- Parameter in Registern, Rückgabewert in Register eax
4

-- 4 of 15 --

© `SYSSEC`, Prof. Dr. Lucas Davi

## SYSTEMSICHERHEIT
Prof. Dr. L. Davi
1 mov eax,0x4
2 mov ebx,0x1
3 mov ecx,0x804901f
4 mov edx,0xd
5 int 0x80
6 mov eax,0x1
7 xor ebx,ebx
8 int 0x80
9 dec eax

10 gs ins `BYTE` `PTR` es:[edi],dx

11 ins `BYTE` `PTR` es:[edi],dx

12 outs dx,`DWORD` `PTR` ds:[esi]

13 and `BYTE` `PTR` [edi+0x6f],dl

14 jb 8049095 <_start+0x95>

15 and `DWORD` `PTR` fs:[edx],ecx

### SYS_WRITE
`SYS_EXIT`

### Das Programm
terminiert an dieser

### Stelle
5

-- 5 of 15 --

© `SYSSEC`, Prof. Dr. Lucas Davi

## SYSTEMSICHERHEIT
Prof. Dr. L. Davi
1 mov eax,0x4 ; `SYSCALL` `WRITE`
2 mov ebx,0x1 ; Schreibe zum Standard Output
3 mov ecx,0x804901f ; Addresse zum String “Hello World\n”
4 mov edx,0xd ; Anzahl der zu schreibenden Zeichen
5 int 0x80 ; `WRITE`(1, “Hello World\n”, 12);
6 mov eax,0x1 ; `SYSCALL` `EXIT`
7 xor ebx,ebx ; Exit Code 0
8 int 0x80 ; `SYSCALL` `EXIT`(0);

### TLDR: Aufgabe 1
Rückgabewert in

eax

6

-- 6 of 15 --

© `SYSSEC`, Prof. Dr. Lucas Davi

## SYSTEMSICHERHEIT
Prof. Dr. L. Davi

### Aufgabe 2: Data-Only A-ack
-- 7 of 15 --

© `SYSSEC`, Prof. Dr. Lucas Davi

## SYSTEMSICHERHEIT
Prof. Dr. L. Davi

### Schwachstellenanalyse
1 // password kann beliebig groß sein
2 int pw_check(char *password) {
3 int auth = 0;
4 char pw_buFer[16] = {0};
5 strcpy(pw_buFer, password);
6 if (strcmp(pw_buFer, "cyssec") == 0)
7 auth = 1;
8 return auth;
9 }

Was ist der Fehler?
- Zeile 5: strcpy(pw_buFer,password)
- Kopiert password (inklusive 0-byte) nach
pw_buFer

8

-- 8 of 15 --

© `SYSSEC`, Prof. Dr. Lucas Davi

## SYSTEMSICHERHEIT
Prof. Dr. L. Davi

### Was passiert, wenn die
Eingabe größer 16 ist?

-- 9 of 15 --

© `SYSSEC`, Prof. Dr. Lucas Davi

## SYSTEMSICHERHEIT
Prof. Dr. L. Davi

### Stack Frame
$ ./bof `AAAAAAAAAAAAAAAABBBB`

0x:…

0x00...

pw_check() frame

&password

return address

saved ebp

auth

pw_buer

…

strcpy() frame

…

pw_check() frame

&password

return address

saved ebp

\x42 \x42 \x42 \x42

\x41 \x41 \x41 \x41

\x41 \x41 \x41 \x41

\x41 \x41 \x41 \x41

\x41 \x41 \x41 \x41

0x:…

0x00... …

…

### Authen&Hzierung
umgangen!

### Nach strcpy()
-- 10 of 15 --

© `SYSSEC`, Prof. Dr. Lucas Davi

## SYSTEMSICHERHEIT
Prof. Dr. L. Davi

### TLDR: Aufgabe 2
1 // password kann beliebig groß sein
2 int pw_check(char *password) {
3 int auth = 0;
4 char pw_buFer[16] = {0};
5 + if (strlen(password) > 16) exit(0);
6 strcpy(pw_buFer, password);
7 if (strcmp(pw_buFer, "cyssec") == 0)
8 auth = 1;
9 return auth;

10 } auth

pw_check() frame

&password

return address

saved ebp

\x41 \x41 \x41 \x41

\x41 \x41 \x41 \x41

\x41 \x41 \x41 \x41

\x41 \x41 \x41 \x41

0x:…

0x00...

…

…

### Variable auth ist
nicht betro:en

11

-- 11 of 15 --

© `SYSSEC`, Prof. Dr. Lucas Davi

## SYSTEMSICHERHEIT
Prof. Dr. L. Davi

### Bonusaufgabe: Canary
-- 12 of 15 --

© `SYSSEC`, Prof. Dr. Lucas Davi

## SYSTEMSICHERHEIT
Prof. Dr. L. Davi
- Das Programm terminiert bei zu lange Eingaben
- Das Programm erkennt Bu:er OverLows
mov `BYTE` `PTR` [ebp-0xd],0x64 ; d

mov `BYTE` `PTR` [ebp-0xe],0x61 ; a

mov `BYTE` `PTR` [ebp-0xf],0x68 ; h

mov `BYTE` `PTR` [ebp-0x10],0x63 ; c

### Analyse
pw_check() frame

&password

return address

saved ebp

auth

pw_buer

…

…

\x64 \x61 \x68 \x63

0x:…

0x00...Am Ende der Funk&on wird überprü, ob

sich die lokalen Variablen veränderten!

-- 13 of 15 --

© `SYSSEC`, Prof. Dr. Lucas Davi

## SYSTEMSICHERHEIT
Prof. Dr. L. Davi

### Lösung
pw_check() frame

&password

return address

saved ebp

\x42

\x41 \x41 \x41 \x41

\x41 \x41 \x41 \x41

\x41 \x41 \x41 \x41

\x41 \x41 \x41 \x41

…

…

\x64 \x61 \x68 \x63

0x:…

0x00...

$ ./canary AAAAAAAAAAAAAAAAchadB

-- 14 of 15 --

© `SYSSEC`, Prof. Dr. Lucas Davi

### Vielen Dank für Ihre Aufmerksamkeit
Übung Cybersicherheit SoSe 2025

### Chris&an Niesler
Tristan Löding

### Fakultät für Informa&k
Arbeitsgruppe Systemsicherheit hps://www.syssec.wiwi.uni-due.de/

### Universität Duisburg-Essen
-- 15 of 15 --