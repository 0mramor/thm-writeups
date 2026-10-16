# TryHackMe — Cryptography Concepts

## Date
2026-10-16

## What I learned
The core difference between symmetric and asymmetric encryption, why both are needed together in practice, and how HTTPS/certificates use asymmetric cryptography to let a browser verify that a site is who it claims to be.

## Key concepts

**Symmetric encryption**
- Uses one single key for both encrypting and decrypting data.
- Problem: securely sharing that key with the other party is hard — if it's intercepted in transit, anyone can decrypt the data.

**Asymmetric encryption**
- Uses a pair of keys: a **public key** and a **private key**.
- Mailbox analogy: a mailbox has a slot anyone can use to drop mail in (the public key — anyone can use it to "encrypt"/send something to you), but only the owner has the key to open the mailbox and read what's inside (the private key — only you can "decrypt").
- Solves the key distribution problem symmetric encryption has: the public key can be shared openly, since only the matching private key can unlock what was sent with it.

**Why both are used together**
- Asymmetric encryption is slower, so it's typically used only to securely exchange a symmetric key (or for signing), not to encrypt all the actual data.
- Once the symmetric key is safely exchanged via asymmetric encryption, the rest of the communication switches to symmetric encryption for speed.

**HTTPS and certificates**
- Certificates let a browser verify a site's identity before trusting its public key.
- Issued by a **Certificate Authority (CA)** — trusted organizations that issue certificates, effectively confirming "this public key really belongs to this site."
- This is how fake/impersonating sites get filtered out — a certificate ties a public key to a verified, legitimate domain owner.

## Practice
Covered conceptually — no hands-on lab tasks in this room, focused on understanding symmetric vs asymmetric encryption and how certificates establish trust in HTTPS.

## Summary
Tied together the earlier theory (symmetric vs asymmetric, public/private keys) with how it's actually used on the web: asymmetric encryption handles identity verification and secure key exchange (via certificates issued by a CA), while symmetric encryption handles the bulk of the actual data transfer.