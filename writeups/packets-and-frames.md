# TryHackMe — Packets & Frames

## Date
(впиши сегодняшнюю дату)

## What I learned
How data is named at each OSI layer during encapsulation, the TCP three-way handshake, UDP's lack of built-in reliability, and some real-world practice capturing and reading network traffic with Wireshark.

## Key concepts

**Encapsulation naming per layer**
- Data → Segment (Transport, TCP/UDP) → Packet (Network, IP) → Frame (Data Link, MAC)
- Each layer wraps/encapsulates everything from the layer before it

**TCP Three-way handshake**
- SYN → SYN-ACK → ACK
This is how a TCP connection is established, with reliability built in (acknowledgments, ordered delivery).

**UDP**
- No handshake, no connection setup process
- No built-in reliability/integrity checks like TCP provides
- Trade-off: faster, but no guarantee data arrives or arrives intact

**SSH (port 22)**
- Secure remote login protocol, encrypted (unlike Telnet)
- An open port 22 means anyone who can reach it can *attempt* to log in — the port itself isn't the vulnerability, weak authentication (passwords) is
- Common defenses: SSH key-based auth instead of passwords, **Fail2ban** (auto-bans an IP after repeated failed login attempts), firewall rules restricting source IPs

## Practice — Wireshark
Captured live traffic on my own PC (legal/legitimate — own machine, own traffic):
- Identified Telegram's TLS-encrypted traffic (confirmed server IP 149.154.167.51 belongs to Telegram's network) — payload showed as random, unreadable bytes
- Captured HTTP (unencrypted) traffic on neverssl.com for comparison — payload was fully readable plain text (GET request, Host header, User-Agent, etc.)
- Also spotted legitimate unencrypted Windows background traffic (ctldl.windowsupdate.com, Microsoft-CryptoAPI) — a reminder that not all HTTP traffic is suspicious

## Summary
Connected the theory (TCP reliability vs UDP speed, encapsulation layers) to a hands-on, visual demonstration of why HTTPS/encryption matters — saw the literal difference between encrypted and unencrypted traffic side by side.
