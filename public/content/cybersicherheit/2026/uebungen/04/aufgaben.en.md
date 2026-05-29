# CySec2026_Exercise_04_English

> Converted from PDF | Pages: 2

---

### University of Duisburg-Essen
Faculty of Computer Science

### Professor in the Field of Computer Science
Prof. Dr.-Ing. Lucas Davi

### Christian Niesler
Exercise Sheet 4

### Lecture “Cybersecurity”
Summer Semester 2026

### Practical Exercise: Asymmetric Cryptography
`AES` and `RSA`

In the lecture, you learned about the symmetric encryption method `AES` and the asymmetric method

`RSA`. The basic procedure for `RSA` is summarized below.

### Key Generation in 5 Steps:
## 1. Choose two large prime numbers p and q.
## 2. Compute the product N of both numbers: N = p · q.
## 3. Compute Euler’s totient: T = (p − 1) · (q − 1).
## 4. Choose two numbers e and d, such that: (e · d) mod T = 1
## 5. Public Key: (N, e), and Private Key: (N, d)
Notes

- The number e must be smaller than the totient T : e < T
- The number e must be coprime (i.e. relatively prime) to both T and N .
- Make sure that for d: (e · d) mod T = 1
- For a number/letter x (plaintext), it must hold that x < N
Encryption and Decryption with `RSA`

### The value x is encrypted as:
y = xe mod N

### The value y is decrypted as:
x = yd mod N

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
1

-- 1 of 2 --

Exercise 1.

- Given is an RSA encryption with: p = 2, q = 7, N = 14, T = 6, e = 5, and d = 11. Which pairs
of numbers form the private key and which form the public key?

- Use the values from a) and the letter mapping from Table 1 to encrypt the message ‘BCD’ using
`RSA`. Verify by decrypting the ciphertext and comparing it to the plaintext.

- Compare symmetric and asymmetric cryptography. What are the advantages and disadvantages
of using symmetric and asymmetric cryptography? (A general comparison is sufficient, but you

can also argue with specific examples such as symmetric encryption (e.g., `AES`) and asymmetric

encryption (e.g., `RSA`).)

- A medium-sized company has 120 employees. How many keys are needed so that all employees can
communicate directly (without additional infrastructure) with each other? Consider the following

cases:

- Only AES is used.
- Only RSA is used.
- An encryption library such as OpenSSL achieves a performance of 100 kbit s−1 for RSA on your
computer. For `AES` encryption, your computer achieves a performance of 17 Mbit s−1. How long

does it take to decrypt a video of size 1 GB? Consider each case for `AES` and `RSA`.

- Where does the performance difference between AES and RSA come from (see previous question)?
What could be done to combine the advantages of asymmetric cryptography with those of symmetric

cryptography?

### Practical Exercise GPG (Bonus)
Encryption is essential for daily and secure communication, e.g., with your bank or one of the numerous

online shops. In this exercise, you will learn how to encrypt arbitrary files using `RSA` in practice and

exchange them with your friends.

Exercise 2.

- Install GPG1 on your system. If you are using Windows, we recommend: GPG4Win2, which is
available free of charge.

- Create an RSA key pair (public and private) with a key length of at least 2048 bits. Detailed
instructions for this can be found in the GPG4Win documentation: [https://files.gpg4win.](https://files.gpg4win.)

org/doc/gpg4win-compendium-de.pdf.

- Find a partner with whom you would like to exchange secret messages in the future. Exchange
your public `RSA` keys, e.g., via `USB` stick or email. Import the public key under your partner’s

first name in `GPG`.

- Encrypt a file (e.g., a text file/Notepad) with secret content and send it via the Internet (e.g.,
email) to your partner.

- Decrypt the received message.
1[https://gnupg.org/](https://gnupg.org/)

2[https://www.gpg4win.de/version4-de.html](https://www.gpg4win.de/version4-de.html)

2

-- 2 of 2 --