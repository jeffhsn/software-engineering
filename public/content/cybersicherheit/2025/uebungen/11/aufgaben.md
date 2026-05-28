# aufgaben

> Converted from PDF | Pages: 6

---

### Universität Duisburg-Essen
Fakultät für Informatik

### Professor im Bereich Informatik
Prof. Dr.-Ing. Lucas Davi

### Christian Niesler
Übungsblatt 11

### Vorlesung „Cybersicherheit“
Sommersemester 2024

Übung Software-Exploits

Im Laufe der Übung werden wir verschiedene Tools zur Analyse von Programmen verwenden. Wir emp-

fehlen die Verwendung einer virtuellen Maschine (z.B., VirtualBox1) mit Windows oder Linux, um Pro-

bleme mit bestehender Software zu vermeiden. Alle Aufgaben können jedoch auch ohne eine virtuelle

Maschine erledigt werden.

Secuso-VM Zur Lösung der Aufgaben stellen wir eine virtuelle Linux-Maschine (VM) zur Verfügung.

Um die VM zu verwenden, installieren Sie Oracle VirtualBox und importieren Sie die VM. Der Benut-

zername und das Passwort in der VM lauten beide user. Alle Werkzeuge, die Sie für diesen Lehrgang

benötigen, sind in der VM installiert. Die VM kann über den folgenden Link heruntergeladen werden:

[https://uni-duisburg-essen.sciebo.de/s/WR5MKiH97UntQkh](https://uni-duisburg-essen.sciebo.de/s/WR5MKiH97UntQkh)

### Einführung in die x86 Programmierung
In dieser Aufgabe werden Sie ein „Hello World“ Assembler Programm analysieren. Das hello-x86 Pro-

gramm in der Intel 32-Bit `ISA` (für Linux i386) geschrieben. Gehen Sie in den in der `ZIP`-Datei enthaltenen

Ordner 1_hello. Um das Programm hello-x86 im Debugger gdb zu starten gehen Sie wie folgt vor:

- Laden Sie das Programm in gdb:
$ gdb ./hello-x86

- Um das Programm zu disassemblieren können Sie folgendes Kommando in gdb verwenden:
disassemble _start

Alternativ dazu können Sie auch Cutter verwenden.

- Starten Sie das Programm in gdb:
start

und „steppen“ Sie Instruktion für Instruktion durch das Programm:

stepi (oder kurz: si) (step instruction)

- Verwenden Sie kill und start um das Programm im Debugger zu terminieren und neu zu starten.
Siehe Appendix A für mehr gdb Befehle. Machen Sie sich Notizen (z.B. in einer Assembler Datei (.S)

oder mittels der Kommentarfunktion von Cutter) zu dieser Aufgabe.

1[https://www.virtualbox.org/](https://www.virtualbox.org/)

1

-- 1 of 6 --

Aufgabe 1.

- Disassemblieren Sie die Routine _start in hello-x86 und erklären Sie kurz jede Instruktion.
- Debuggen Sie das Programm hello-x86 mit dem Debugger gdb und bestimmen Sie die tatsächli-
chen Werte und Adressen in den Registern jeweils bevor die int 0x80 Instruktion ausgeführt wird.

Erklären Sie die Bedeutung der verschiedenen Register.

Hinweis: Appendix B beinhaltet einen Ausschnitt aus der „System Call Table“.

- Wie funktionieren Linux System-Calls auf x86 32-Bit? Wie werden Parameter übergeben? Wie
wird der Rückgabewert übergeben?

### Links: Nützliche Links zum Thema Assembler Programmierung:
- http://www.cs.virginia.edu/~evans/cs216/guides/x86.html
- http://unixwiz.net/techtips/x86-jumps.html
- http://www.felixcloutier.com/x86/
Data-Only Attack

Der Codeausschnitt in Listing 1 beinhaltet eine fehlerhafte Passwort-Authentifizierung. Diese Schwach-

stelle ermöglicht eine erfolgreiche Authentifizierung trotz inkorrektem passwort. Das Ziel dieser Übung

ist es diese Schwachstelle zu analysieren, nachzuvollziehen, und auszunutzen.

Mehr Informationen zu den benutzten libc-Funktionen finden Sie auch in dem Man-pages:

- $ man 3 strcpy (unter Linux) oder unter https://linux.die.net/man/3/strcpy
- $ man 3 strcmp oder https://linux.die.net/man/3/strcmp
Aufgabe 2.

## 1. Beschreibe den Fehler in Listing 1. Was sind die Auswirkungen des Fehlers? Wie könnte dieser
Fehler behoben werden?

## 2. Skizzieren Sie das Stackframe-Layout der Funktion pw_check.
## 3. Finde eine gültige Eingabe, die nicht „cyssec“ ist, damit das Programm die Nachricht „Gut ge-
macht!“ ausgibt. Warum funktioniert Ihr Angriff?

## 4. Was würde passieren, wenn der Compiler die Reihenfolge der lokalen Variablen ändert? Erläutern
Sie kurz.

2

-- 2 of 6 --
1 int pw_check(char *password) {
2 int auth = 0;

3
4 // Allokiere Speicher auf dem Stack
5 char pw_buffer[16] = {0};

6
7 // Kopiere den *gesamten* String "password" nach "pw_buffer"
8 strcpy(pw_buffer, password);

9

10 // Falls das eingegeben Passwort "cyssec" ist,

11 // setze die Variable "auth"

12 if (strcmp(pw_buffer, "cyssec") == 0)

13 auth = 1;

14

15 return auth;

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

28 // Die Funtkion "pw_check" prüft das Passwort.

29 if (pw_check(pw)) printf("Gut gemacht!\n");

30 else printf("Zzzzzz...\n");

31 }

### Listing 1: Passwort-Authentifizierung
Bonusaufgabe

Der Entwickler hat nun das Problem in Listing 1 erkannt und hat die anfällige Passwort-Authentifizierung

korrigiert. Analysieren Sie nun das Programm canary mit der aktualisierten Authentifizierungsroutine.

Aufgabe 3.

## 1. Was hat sich in der pw_check Funktion verändert?
## 2. Wie hat der Entwickler den Fehler korrigiert? Beschreiben Sie es mithilfe des Stackframe-Layouts
der pw_check Funktion.

## 3. Beschreiben Sie wie diese Korrektur umgangen werden kann.
## 4. Übermitteln Sie erneut eine Eingabe die nicht cyssec ist, welche die Nachricht „Gut gemacht!“
ausgibt.

3

-- 3 of 6 --

### A GNU Debugger gdb
The following gdb commands may help you to solve this exercise:

- Use Intel Assembly Syntax: set disassembly-flavor intel
- quit / q: Exit gdb
- list: Show lines of the source code
- disassemble function : Disassemble a function
– disassemble main: Disassemble the main function

- break / b: Set a breakpoint
– break *0x4009c0: Set a breakpoint at address 0x4009c0

– break main: Set a breakpoint at the main function

- run [arglist] : Run the program with arguments arglist
- step / s: Execute one source line. Steps into functions calls.
- next / n: Execute one source line. Steps over function calls.
- step instruction / si: Execute one assembler instruction. Steps into function calls.
- next instruction / ni: Execute one assembler instruction. Steps over function calls.
- continue: Continue program execution until the next breakpoint is hit
- info registers / i r: Print the processor register values.
- print [expression] : Show value of expression
– print /x $rax: Print the value of the %rax register in in hexadecimal (x) notation

- x/[Nuf] expression : Examine memory at address expression, whereas N indicates the Number
of units to display, u the unit size, and f the printing format.

– x/4wx $rsp: Print the top four (4) 32 bit words (w) on the stack ($rsp) in hexadecimal (x)

notation

– x/4gx $rsp: Print the top four (4) 64 bit words (g) on the stack ($rsp) in hexadecimal (x)

notation

– x/1s $rsi: Display one String (1s) starting from the address stored in ($rsi).

The following commands are provided by gdb extensions, such as pwndbg or gef. pwndbg is loaded by

default on the lab virtual machine.

- context: print all kinds of information (stack, registers, source if available)
- telescope $eax 40: Dereference the register eax and print 40 words of data, dereferencing poin-
ters.

- registers: pretty-print register contents
- stack: pretty-print stack contents
4

-- 4 of 6 --

### B Linux System Calls für x86 32-bit
Tabelle 1 zeigt einen vereinfachten Ausschnitt aus der “System Call Table” des Linux Kernels. Darin

sollten sich alle wichtigen System Calls befinden, die Ihnen während der Übungen begegnen.

### Tabelle 1: First 14 Linux Systems Calls on x86 32-bit
Number Name eax ebx ecx edx esi edi
0 sys_restart_syscall 0x00 - - - - -
1 sys_exit 0x01 int error_code - - - -
2 sys_fork 0x02 struct pt_regs * - - - -
3 sys_read 0x03 unsigned int fd char *buf size_t count - -
4 sys_write 0x04 unsigned int fd char *buf size_t count - -
5 sys_open 0x05 char *filename int flags int mode - -
6 sys_close 0x06 unsigned int fd - - - -
7 sys_waitpid 0x07 pid_t pid int *stat_addr int options - -
8 sys_creat 0x08 char *pathname int mode - - -
9 sys_link 0x09 char *oldname char *newname - - -

10 sys_unlink 0x0a char *pathname - - - -

11 sys_execve 0x0b char* filename char** argv char** envp struct pt_regs * -

12 sys_chdir 0x0c char *filename - - - -

13 sys_time 0x0d time_t *tloc - - - -

14 sys_mknod 0x0e char *filename int mode unsigned dev - -

...

5

-- 5 of 6 --

### C ASCII Table
Abbildung 1: `ASCII` Tabelle

6

-- 6 of 6 --