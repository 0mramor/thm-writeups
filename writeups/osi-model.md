# TryHackMe — OSI Model

## Date
(впиши сегодняшнюю дату)

## What I learned
The 7 layers of the OSI model and how data moves through them when sent and received.

## Key concepts

| # | Layer | Purpose | Examples |
|---|---|---|---|
| 7 | Application | User/app interface | HTTP, FTP, DNS |
| 6 | Presentation | Formatting, encryption | SSL/TLS, encoding |
| 5 | Session | Creates and maintains a connection between two devices; a session exists while the connection is active, can use checkpoints to resume after data loss | — |
| 4 | Transport | Reliable/unreliable delivery | TCP/UDP, ports |
| 3 | Network | Routing between networks | IP addresses |
| 2 | Data Link | Communication within a local network | MAC addresses, ARP |
| 1 | Physical | Raw bits, signals, cables | cable, Wi-Fi |

**Encapsulation / Decapsulation**
- Encapsulation — each layer adds its own header on top of the data as it moves down the stack (sending side), one layer at a time, each wrapping everything added before it
- Decapsulation — the reverse process on the receiving side, each layer strips its own header in order

**Session layer specifics**
- When a connection is successfully established, a session is created and stays active as long as the connection does
- Sessions are unique — data only travels within its own session, not across different ones

## Summary
Already had some background on this from videos, so it clicked quickly. Connected it to earlier topics — Transport (TCP/UDP, ports), Network (IP), and Data Link (MAC, ARP) are layers already covered in previous rooms.