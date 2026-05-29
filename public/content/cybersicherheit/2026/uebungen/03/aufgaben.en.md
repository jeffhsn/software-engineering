# CySec2026_Exercise_03_English

> Converted from PDF | Pages: 4

---

### University of Duisburg-Essen
Faculty of Computer Science

### Professor in the field of Computer Science
Prof. Dr.-Ing. Lucas Davi

### Tristan Löding
Christian Niesler

### Firas Khamis
Exercise Sheet 3

### Lecture “Cybersecurity”
Summer Semester 2026

### A Brief Summary
and

### Modes of Operation of Block Ciphers
Fundamentals

Übung 1.

- Kerckhoffs’ principle plays a central role in modern cryptography. Restate it in your own words.
- In the past, cryptosystems were frequently designed whose security, contrary to Kerckhoffs’ prin-
ciple, relied on keeping the design secret. What is this approach called?

- The science of cryptology can be divided into the subfields of cryptography and cryptanalysis.
Briefly describe both in your own words.

- Outline the classic scenario of two communication partners Alice and Bob communicating over
an insecure channel. Use this to explain why communication partners must employ cryptographic

algorithms.

- Match the variables and functions e(·), d(·), x, y, k, K and |K|, which are very important in
cryptography, to their respective names. The options are: number of possible keys, key, encryption,

key space, ciphertext, decryption and plaintext.

1

-- 1 of 4 --

### Adaptation of a Stream Cipher
Übung 2.

In a classical stream cipher, the plaintext x, the ciphertext y and the key stream s consist of individual

bits xi, yi, si. Encryption and decryption are then defined as follows:

yi = esi (xi) = xi ⊕ si = xi + si mod 2

xi = dsi (yi) = yi ⊕ si = yi − si mod 2

A stream cipher defined in this way can be very easily generalised so that it can operate on arbitrary

alphabets and is no longer restricted to the binary alphabet. For hand ciphers, i.e. ciphers for manual

encryption without a computer, it is for example advantageous if the stream cipher can be applied directly

to letters.

- What alphabet can xi, yi, si take on in the function mentioned above?
- Suppose we now replace the binary alphabet with the Latin alphabet A, . . . , Z, where the letters
are represented by the numbers 0, 1, . . . , 25. How would the modulus m need to change

relative to the function mentioned above?

- What does the key stream look like now?
- What would need to change in the decryption function to keep it correct?
- Decrypt the following ciphertext HWHWZB with the key BSASRP.
A 0

### B 1
C 2

### D 3
E 4

### F 5
G 6

### H 7
I 8

### J 9
K 10

### L 11
M 12

### N 13
O 14

### P 15
Q 16

### R 17
S 18

### T 19
U 20

### V 21
W 22

### X 23
Y 24

### Z 25
Tabelle 1: Caesar Alphabet, assigned to numbers (0-25)

### Brute-Force Attacks
Übung 3.

`AES` is currently the most widely used symmetric cipher. In this exercise, the long-term security of `AES`

with 128-bit keys1 is examined. The assumption is that the best known attack is the exhaustive key

search (also: brute-force attack), in which all possible keys are systematically tested. Note:If you do

not have a calculator, estimate your results using the laws of exponents and the assumption that 103 is

approximately 210.

- How many different 128-bit keys are there? Give the result as a power of two.
- We assume that the attacker has specialised hardware, so-called Application Specific Integrated
Circuits (ASICs), which are optimised for `AES` key tests. One such `ASIC` can check 7 · 108 keys

per second and the attacker has a budget of one million euros. A single `ASIC` costs 40€ and an

overhead of 100% is assumed for the integration of the ASICs (building the computer, power supply,

cooling, etc.). How many ASICs can be operated in parallel with the given budget? How long does

an exhaustive key search take on average2? Put this time in relation to the age of the universe,

which is approximately 1010 years.

1A 128-bit number consists of 128 consecutive zeros and ones

2On average, only half of all possible keys need to be tested

2

-- 2 of 4 --

### Modes of Operation of Block Ciphers
In addition to the common block-by-block encryption (so-called `ECB` mode), there are further modes of

operation for block ciphers, including the `CBC` and `OFB` modes. The `ECB` mode has several drawbacks,

among others, uniform and large-scale regions that span multiple blocks in the ciphertext remain reco-

gnisable. As a result, the otherwise secure symmetric encryption in `ECB` mode can become insecure in

a concrete application. An unfavourable scenario of encryption in `ECB` mode is illustrated in Figure 1.

Figures 2, 3 and 4 show the individual modes of operation. The ⊕ operator represents a standard `XOR`

operation.

Übung 4.

A simple block cipher e(·) with a 5-bit block size encrypts by performing a key-dependent bit permutati-

on. For one specific key applied in this exercise, the block cipher performs the following simple encryption:

e(b1b2b3b4b5) = (b2b5b4b1b3)

### Encrypt the message:
x = 01101 11011 11010 00110

using the respectively required mode of operation and state the ciphertext y in each sub-task.

- ECB
- CBC with IV = 11001
- OFB with IV = 11001
Abbildung 1: Example of a concrete unfavourable situation of `ECB` mode encryption

Left: Original image, Centre: Image encrypted in `ECB` mode, Right: Image encrypted in a chained

mode

Image source: [https://de.wikipedia.org/wiki/Electronic_Code_Book_Mode](https://de.wikipedia.org/wiki/Electronic_Code_Book_Mode)

### Abbildung 2: Encryption and decryption in ECB mode
Image source: [https://de.wikipedia.org/wiki/Electronic_Code_Book_Mode](https://de.wikipedia.org/wiki/Electronic_Code_Book_Mode)

3

-- 3 of 4 --

### Abbildung 3: Encryption and decryption in CBC mode
Image source: [https://de.wikipedia.org/wiki/Cipher_Block_Chaining_Mode](https://de.wikipedia.org/wiki/Cipher_Block_Chaining_Mode)

### Abbildung 4: Encryption and decryption in OFB mode
Image source: [https://de.wikipedia.org/wiki/Output_Feedback_Mode](https://de.wikipedia.org/wiki/Output_Feedback_Mode)

4

-- 4 of 4 --