# CySec2026_Exercise_01_English

> Converted from PDF | Pages: 3

---

### University of Duisburg-Essen
Faculty of Computer Science

### Professor in the Computer Science Department
Prof. Dr.-Ing. Lucas Davi

### Christian Niesler
Exercise Sheet 1

### Lecture “Cybersecurity”
Summer Semester 2025

### Practical Exercise: Classical Cryptography
Terminology

cipher Method/algorithm used for encryption

ciphertext encrypted message

plaintext decrypted message (clear text)

alphabet Set of symbols used for encryption and decryption

substitution cipher A cipher that replaces symbols with other symbols

transposition cipher A cipher that rearranges the order of symbols in the plaintext

### Shift Cipher - Caesar
A well-known cipher is the Shift Cipher, also known as Caesar. Caesar belongs to the substitution

ciphers. Each letter of the plaintext is shifted by a fixed number in the alphabet. The key 3 means that

the letters of the plaintext are shifted by 3 in the ciphertext. So A becomes D, B becomes E, and C

becomes F.

Each letter in the alphabet can also be assigned a number, see Table 1.

### A Caesar cipher can formally be defined as follows:
Z26 is the set of numbers from 0 to 25; the alphabet is assigned as described in Table 1.

### Let x, y, k ∈ Z26
Encryption with key k of plaintext letter x:

ek(x) = x + k26

### Decryption with key k of ciphertext letter y:
dk(x) = y − k26

Exercise 1.
1 E 17,4%
2 N 9,78%
3 I 7,55%
4 S 7,27%
5 R 7,00%
6 A 6,51%
7 T 6,15%
8 D 5,08%
9 H 4,76%

10 U 4,35%

11 L 3,44%

12 C 3,06%

13 G 3,01%

14 M 2,53%

15 O 2,51%

16 B 1,89%

17 W 1,89%

18 F 1,66%

19 K 1,21%

20 Z 1,13%

21 P 0,79%

22 V 0,67%

23 ß 0,31%

24 J 0,27%

25 Y 0,04%

26 X 0,03%

27 Q 0,02%

### Table 1: Deutsche Häufigkeitsverteilung
## 1. Install Cryptool 2 on your system (https://www.cryptool.org/de/ct2/downloads)
1

-- 1 of 3 --

## 2. Encrypt the following plaintext using key k = 5 (Shift Cipher) in Cryptool: Sehr geehrte Damen
und Herren, wilkommen bei der Vorlesung fuer Cybersicherheit. Wir starten mit einer klassischen

Chiffre Caesear. Und nun ein schoenes Zitat von Gaius Julius Caesar. Das beste Glück, ein

schöner Blick, ein kluger Scherz, ein redlich Herz.

## 3. Now perform a frequency analysis for the plaintext and ciphertext using Cryptool. The frequency
of each symbol (A–Z) is counted and related to the total message length.

## 4. Compare the resulting bar charts (frequency analysis).
## 5. Now take various German texts1 and run a frequency analysis using Cryptool. Compare the
resulting distributions with Table 1. What can you observe?

### Columnar Transposition
Besides substitution, it is also possible to encrypt a plaintext by permuting its characters. In ancient

Greece, a device called a "scytale" was used. It consisted of a rod and a strip (e.g., of leather) with

the message. The strip was wrapped around the rod. To decrypt the message, knowledge of the rod’s

diameter was required.

A more modern transposition method is called columnar transposition (Spaltenweise Transposition).

There are several variants depending on read direction (column/row) and key convention. In this exercise,

we illustrate one variant using an example.

Given the plaintext: Beispiele.

### Encrypt with the key: HAL
The text is arranged into columns (3 columns because "`HAL`" has 3 letters):

## B E I
## S P I
## E L E
Alphabetically sorting the key `HAL` gives A H L. This means column 2 (A) comes first, then column 1

(H), then column 3 (L). The resulting ciphertext is: `EBIPSILEE`

## E B I
## P S I
## L E E
Exercise 2.

## 1. Based on the example above, think about how to decrypt this columnar transposition variant.
## 2. Decrypt the ciphertext: YRCOTPCSILOO using the key SEC. Describe your process.
Polyalphabetic Substitution - Vigenère

Instead of using a single alphabet like in Caesar, it’s possible to use multiple alphabets. A popular

method in the Middle Ages called Vigenère uses a keyword, e.g., "Sicher". Encryption and decryption

work similarly to the Caesar cipher. The keyword S(K=18) I(K=8) C(K=2) H(K=7) E(K=4) R(K=17)

determines the Caesar shift for each character in the plaintext. If the plaintext is longer than the key,

the key repeats cyclically. Thus, character 7 uses shift 18 again, and so on.

For encryption/decryption, the Vigenère square is commonly used:

1(a good source for German texts is [https://www.projekt-gutenberg.org/)](https://www.projekt-gutenberg.org/))

2

-- 2 of 3 --

### Figure 1: Vigenère Square
Exercise 3.

## 1. Manually (without Cryptool), use the Vigenère square to encrypt: Cybersicherheitsvorlesung
## 2. Use Cryptool to encrypt various German texts2 using the key: SICHER
## 3. Perform a frequency analysis on the ciphertexts using Cryptool. Compare your findings with those
from Task 1. If you notice differences, describe potential reasons.

2(a good source for German texts: [https://www.projekt-gutenberg.org/)](https://www.projekt-gutenberg.org/))

3

-- 3 of 3 --