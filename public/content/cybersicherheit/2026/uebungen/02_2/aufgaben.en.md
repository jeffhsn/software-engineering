# CySec2026_Exercise_02_2_English

> Converted from PDF | Pages: 5

---

### University of Duisburg-Essen
Faculty of Computer Science

### Professor in the field of Computer Science
Prof. Dr.-Ing. Lucas Davi

### Tristan Löding
Christian Niesler

### Exercise Sheet 2.2
Lecture “Cybersecurity”

### Summer Semester 2026
Practical Exercise: Data Encryption Standard (`DES`)

Note. The S-boxes required for the calculations can be found starting on page 17 of the `NIST` standard.

### Exercise 1: Computation of the First DES Round
Aufgabe 1.

In this exercise, the first round of `DES` is computed step by step. Let the plaintext bits xi (indexed from

i = 1 to i = 64 from left) be:

xi = 0 ∀ i ∈ {1, . . . , 64} \ {15}, x15 = 1.

The key k and all round keys ki consist entirely of zeros.

- State the initial state x before applying the initial permutation IP (4 rows of 16 bits each). x:
- What is the output of the initial permutation IP, split into the two halves L0 and R0?
Abbildung 1: Initial Permutation

1

-- 1 of 5 --

### L0:
R0:

- Apply the expansion function E(R0) and state the inputs of the eight S-boxes. Take into account
the `XOR` operation with the round key k1 (all zeros).

### Abbildung 2: Expansion Table
S1: S5:

### S2: S6:
S3: S7:

### S4: S8:
- Determine the output of the S-boxes before applying the permutation P . Sout:
2

-- 2 of 5 --

- State the output of the permutation P .
Abbildung 3: Permutation

### Pout:
- Determine the state (L1, R1) at the end of the first round. L1:
R1:

3

-- 3 of 5 --

### Exercise 2: Avalanche Effect in DES
Aufgabe 2.

For a good block cipher it is desirable that changing a single input bit causes as many output bits as

possible to change. This property is also called diffusion or the avalanche effect. In the following we

examine the diffusion property of `DES`. We consider a bit sequence as input to `DES` in which the bit at

position x37 = 1 (indexed from x1 to x64) and all other bits are equal to 0. The 56 key bits (and therefore

all round keys) are all set to 1.

- Which S-boxes are affected by bit x37 in the first round? What do the input bits of the eight
S-boxes look like?

### S1: S5:
S2: S6:

### S3: S7:
S4: S8:

- State the result (L1, R1) after the first round. L1:
R1:

- How many bits differ compared to the computation with input x = 064 (same key configuration)?
What conclusion can be drawn from this regarding the avalanche effect?

4

-- 4 of 5 --

### Exercise 3: DES Decryption
Aufgabe 3.

In `DES` decryption, the same algorithm as in encryption is used; only the round keys are applied in

reverse order. This property follows directly from the symmetry of the Feistel structure. We continue

the computation from Exercise 2: after one encryption round with x37 = 1, all remaining plaintext bits

equal to 0, and a key consisting of ones, the state (L1, R1) is given. We now show that an inverse Feistel

round with round key k1 = 148 exactly reconstructs the previous state (L0, R0).

- Explain why DES decryption can use the same algorithm as encryption. In what order are the
round keys applied?

- Derive the recurrence of an inverse Feistel round that computes the state (Li−1, Ri−1) from (Li, Ri)
and ki. Apply it to (L1, R1) from Exercise 2 with round key k1 = 148 and enter L0 and R0. L0:

### R0:
- Compare the computed pair (L0, R0) with the state obtained after applying the initial permutati-
on IP to the original plaintext from Exercise 2. What conclusion follows regarding the correctness

of `DES` decryption?

### Summary
- DES was put out to tender in 1972, standardized in 1977, and is based on a 16-round Feistel structure
with an effective key length of 56 bits.

- The round function combines expansion, key addition, nonlinear S-boxes, and a bitwise permutation.
- The S-boxes are the only nonlinear components and therefore central to the security of the scheme.
- Diffusion is achieved through permutations and the repeated application of the round function; after
just one round, a single input bit already affects multiple output bits.

- Due to the short key length, DES is considered insecure today; in practice, 3DES (transitionally) or
`AES` are used instead.

Many thanks to Prof. Dr.-Ing. Christof Paar (`MPI`-SP / `RUB`) as well as M. Sc. Johannes Tobisch and

- Sc. Paul Staat for the original exercises on which this problem set is based.
5

-- 5 of 5 --