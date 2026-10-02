# TryHackMe — What is Networking?

## Date
(впиши сегодняшнюю дату)

## What I learned
Introduction to networking fundamentals: IP addresses, MAC addresses, public vs private networks, basic ping/ICMP, and a bit of internet history.

## Key concepts

**IP address vs MAC address**
- IP address — a logical address assigned to a device on a network, used for routing data between networks (can change, depends on the network you're on)
- MAC address — a physical address burned into a device's network hardware, unique to that device, doesn't change

**Public vs Private IP addresses**
- Private IP — used inside a local network (home, office), not directly reachable from the internet (e.g. 192.168.x.x, 10.x.x.x)
- Public IP — the address visible to the wider internet, usually assigned to a router by an ISP; multiple devices on a private network share one public IP via NAT

**Ping and ICMP**
- `ping` — command to test if a host is reachable, sends packets and waits for a reply
- Uses the **ICMP** protocol (Internet Control Message Protocol)
- Basic syntax: `ping <IP_ADDRESS>`
- `-c <number>` flag on Linux limits how many packets are sent (without it, ping runs until manually stopped)

## Practice
Pinged 8.8.8.8 and 10.10.10.10 using `ping -c 4 <IP>`, confirmed 0% packet loss and got response times.

## Notes
A bit of internet history was covered too — who helped create today's internet. Worth revisiting the TryHackMe room notes for exact names/dates if needed later.

## Summary
Solid intro to how devices are identified and found on a network. Good foundation before diving deeper into networking topics.