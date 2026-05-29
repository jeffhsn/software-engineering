# CySec2026_Exercise_02_English

> Converted from PDF | Pages: 5

---

### University of Duisburg-Essen
Faculty of Computer Science

### Professor in the Field of Computer Science
Prof. Dr.-Ing. Lucas Davi

### Christian Niesler
Exercise Sheet 2

### Lecture “Cybersecurity”
Summer Term 2025

### Practical Exercise Symmetric Cryptography
Vernam Cipher (One-time pad and Stream Cipher)

The Vernam cipher is an extension of the Vigenère cipher, where the key used for encryption is the same

length as the plaintext. Such a method is considered insecure by modern standards. However, if the

key is generated using a cryptographically strong random number generator, Vernam becomes a stream

cipher. The security then depends on the randomness of the generator. If the key is truly random, the

method is referred to as a one-time pad.

### A 0
B 1

### C 2
D 3

### E 4
F 5

### G 6
H 7

### I 8
J 9

### K 10
L 11

### M 12
N 13

### O 14
P 15

### Q 16
R 17

### S 18
T 19

### U 20
V 21

### W 22
X 23

### Y 24
Z 25

### Table 1: Caesar Alphabet, assigned to numbers (0-25)
Encryption:

## 1. Each letter in the plaintext is assigned a number from 0 to 25 (see Table 1).
## 2. The corresponding key value is added to each letter (plaintext + key).
## 3. Subtract 26 if the result is greater than 25. Otherwise, leave it unchanged.
Decryption is the inverse process.

### Formal Definition:
Z26 denotes the set of numbers from 0 to 25, with a unique letter assignment as described in Table 1.

Let k ∈ Z26 be the key.

Encryption: For each letter x in the plaintext, apply the function:

e(x) = (x + k) mod 26

Decryption: For each letter y in the ciphertext, apply the function:

d(y) = (y − k) mod 26

### Example:
## C Y B E R S E C U R E
2 24 1 4 17 18 4 2 20 17 4

## K E Y R A N D O M K I
10 4 24 17 0 13 3 14 12 10 8

## M C Z V R F I Q G B M
12 2 25 21 17 5 8 16 6 1 12

1

-- 1 of 5 --

Exercise 1.

## 1. Encrypt the message: VORLESUNG using the Vernam cipher with the key:
## SECUNIDUE
## 2. The method shown is a (weak) variant of the one-time pad. Give the number of possible keys for
a Vernam cipher with plaintext length 5. How many keys exist for a plaintext of length n?

## 3. Assume a CPU with 2 cores and 4 GHz is fully dedicated to key computation for a message of
length 1024. Each key computation requires 4 operations. 1 GHz equals 1,000,000 operations per

second. How long does it take for an attacker to brute-force a key with this `CPU`?

## 4. Multiple Encryption: A popular method to increase security is to apply the encryption multiple
times. For example, the `DES` cipher can be made secure by applying it three times.

### A double encryption can be expressed as: y ≡ ek2 (ek1 (x))
How does double encryption affect the key space K in the Vernam cipher? Provide a general

formula based on message length n.

### Malleability of Stream Ciphers
Malleability describes a property of a cryptosystem where changes to the ciphertext (y) can result in

controlled changes to the plaintext (x) without knowing the plaintext. The attacker can modify the

ciphertext and achieve predictable changes in the decrypted plaintext.

Exercise 2.

## 1. Explain why stream ciphers are inherently malleable and how an attacker can exploit this to make
targeted changes to the plaintext.

## 2. Suppose you are an attacker and have hacked into a Bitcoin broker’s system overnight. The broker
transfers 1 Bitcoin to you (currently worth 40,000 `EUR`). The number of Bitcoins is stored as a

16-bit integer (in C: short). How can you modify the value to become a millionaire?

## 3. Suppose you are a malicious admin of a streaming service with free employee access. You want to
watch all premium content without paying. So, you change the `ASCII` value of ’m’ (employee) to

’p’ (premium). The database entry is encrypted as a ciphertext y(’m’) (stream cipher) with binary

value 100 0000. What ciphertext (binary) must you set to view premium content? (Hint: known

plaintext attack)

2

-- 2 of 5 --
1 `ASCII` Table

### Figure 1: ASCII Tabelle
The Block Cipher `DES`

`DES` is based on the application of substitution boxes and a structure called the Feistel network. For

secure encryption, the S-boxes must meet the following requirements to ensure a secure cipher:

Completeness Each bit in the output depends on every bit in the input.

Avalanche Effect Changing one bit in the input changes, on average, half of the output bits.

Non-linearity No output bit is linearly dependent on a single input bit.

Correlation Immunity As long as only a part of the input bits is known, no inference can be made

about the output bits, and vice versa.

Table 2 shows S-Box #5 of `DES`. The `DES` S-boxes were constructed to satisfy the criteria listed above.

3

-- 3 of 5 --

### SBox 5 (DES)
Figure 2: S-Box #5 of `DES`. A 6-bit input value is taken, which produces a 4-bit output value through

substitution. Example: 01101 1 has outer bits 01 and inner bits 1101, resulting in the substitution value

1001 according to the table (highlighted in yellow).

### Questions on DES
Exercise 3.

## 1. What key length was originally proposed for DES, and what (effective) key length was ultimately
chosen? Who was responsible for this change?

## 2. What do the terms confusion and diffusion mean, and which components of DES implement these
functions?

## 3. Draw a diagram of a Feistel network.
Non-linearity of S-Boxes

### S1 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15
0 14 04 13 01 02 15 11 08 03 10 06 12 05 09 00 07
1 00 15 07 04 14 02 13 01 10 06 12 11 09 05 03 08
2 04 01 14 08 13 06 02 11 15 12 09 07 03 10 05 00
3 15 12 08 02 04 09 01 07 05 11 03 14 10 00 06 13

Table 2: S-Box #1 of `DES`. The values in the table are in decimal notation!

Use `DES` S-Box #1 for the following tasks. A copy of the S-box can be found in Table 2.

### An S-box Si behaves linearly if the following holds:
Si(x1) ⊕ Si(x2) = Si(x1 ⊕ x2)

where the operator ⊕ denotes bitwise `XOR`.

Exercise 4.

## 1. One important property of DES is the non-linearity of its S-boxes. Show, for the following input
bits, that the S-box is not linear:

- x1 = 000000 and x2 = 000001
- x1 = 111111 and x2 = 100000
- x1 = 101010 and x2 = 010101
4

-- 4 of 5 --

### Bonus Exercise: Weak Keys
This task requires time and a good understanding of `DES`. Therefore, we will discuss it at the beginning

of the next exercise session.

A `DES` key is considered weak if encryption and decryption are identical operations:

### A DES key is weak if the following condition is fulfilled:
DESKw (x) = (DESKw (x))−1, for all x.

Hint: Look closely at the subkeys, especially the round keys of `DES`. Draw the `DES` structure for at

least 2 rounds (see Question 3).

Exercise 5.

## 1. Describe what values the subkeys Ki would need to take over the 16 DES rounds for the above
weak key equation to hold.

## 2. There are 4 weak DES keys. Which are they?
## 3. What is the probability that a randomly chosen DES key is a weak key?
5

-- 5 of 5 --