# TryHackMe — The CIA Triad

## Date
2026-10-12

## What I learned
The three core properties of information security, and how to classify any security measure or attack by which property it affects.

## Key concepts

| Property | Meaning | Example measures | Example attacks |
|---|---|---|---|
| **Confidentiality** | Digital information is not available to unauthorized parties | Encryption (TLS), VPN, access permissions, strong passwords / SSH keys | Credential leak, sniffing traffic on public Wi-Fi |
| **Integrity** | Digital information is not changed without authorization | Hashing, digital signatures, TCP delivery checks | Tampering with requests, DNS spoofing |
| **Availability** | Digital information is accessible when needed | Load balancers, CDN, redundancy, DDoS protection | DDoS, port exhaustion, ransomware |

- One tool can serve more than one property: TLS encrypts traffic (confidentiality) and also prevents unnoticed modification in transit (integrity).
- The properties can conflict: maximum confidentiality (MFA, heavy encryption) can hurt availability, so real systems balance them depending on what they protect.
- Any vulnerability can be described by the damage it does to C, I or A. Example: XSS that steals session cookies is a confidentiality issue.

## Notes
The Russian translation of the room renders "Integrity" as "Честность"; the correct meaning is data integrity (unchanged data), not honesty.

## Summary
Not much new technology here; it gives a framework for classifying everything covered in earlier rooms (encryption, hashing, firewalls, load balancers, DDoS) by what is being protected.