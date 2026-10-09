# TryHackMe — Intro to LAN

## Date
2026-10-02

## What I learned
Network topologies, ARP, and DHCP — how devices find and communicate with each other on a local network.

## Key concepts

**Network Topologies**
- Bus Topology — cost-efficient to set up, but expensive/hard to maintain and troubleshoot as it grows
- Star Topology — more expensive to set up (needs a central switch), but easier to manage and isolate issues

**ARP (Address Resolution Protocol)**
- Resolves an IP address to a MAC address within a local network
- **ARP Request** — a broadcast asking "who has this IP address?"
- **ARP Reply** — the response containing the matching MAC address
- IP handles routing between networks; MAC handles identifying a specific device within the same local network. They work together, not as alternatives.

**DHCP (Dynamic Host Configuration Protocol)**
- Automatically assigns IP addresses (and other settings) to devices joining a network, instead of manual configuration
- Process follows **DORA**: Discover → Offer → Request → Acknowledge
- IP addresses are "leased" for a period of time, not assigned permanently — they can change when the lease expires
- Works at multiple levels: a home router's DHCP assigns private IPs to home devices; an ISP's DHCP assigns a (often dynamic) public IP to the router
- Even a phone's personal hotspot runs a built-in DHCP server — it acts as a mini router for connected devices

## Notes
- MAC addresses can be spoofed (MAC spoofing) — modern OSes (iOS/Android) randomize MAC by default for privacy; it can also be used to bypass MAC-based access filtering
- Clarified a common misconception: private IPs matter even at home — they're what let multiple devices share one internet connection via NAT, and let devices find each other locally (printer, smart TV, etc.)

## Summary
Connected several previously separate concepts (IP, MAC, ARP, NAT) into a clearer picture of how a local network actually functions end to end.