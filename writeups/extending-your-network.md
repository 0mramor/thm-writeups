# TryHackMe — Extending Your Network

## Date
2026-10-05

## What I learned
Devices used to build and extend a network: switches, routers, hubs, access points — and how firewalls fit into the OSI model.

## Key concepts

**Hub vs Switch**
| | Hub | Switch |
|---|---|---|
| Sends data to | All ports | Only the correct port |
| Knows MAC addresses | No | Yes |
| OSI layer | Physical (1) | Data Link (2) |

- Switch — connects multiple devices within a LAN, learns MAC addresses per port, forwards (switches) data only to the intended recipient. Typical switches support anywhere from ~3 to 63 Ethernet ports depending on the model.
- Router — connects separate networks together (e.g. home network to the internet), handles routing, NAT, DHCP, and port forwarding. The verb for what a router does is "to route" / "routing".

**Firewalls and the OSI model**
- Operate at Layer 3 (Network — IP addresses) & Layer 4 (Transport — ports/protocol)
- **Stateful** firewall — inspects the entire connection
- **Stateless** firewall — inspects individual packets only

**VPN (Virtual Private Network)**
- Creates an encrypted tunnel between a device and a VPN server, riding on top of normal internet routing (doesn't replace routers — routers still handle the actual path)
- Hides traffic content from the local network/ISP, and replaces the visible IP with the VPN server's IP
- No-logs policy matters — if the VPN provider keeps logs, that data could still be leaked or requested
- Different from a regular LAN: a VPN is a *virtual* private network, simulating the feel of a local network over the public internet, not an actual physical local network
- Real-world example: Radmin VPN creates a virtual LAN between physically separate devices (e.g. friends in different countries) so LAN-based games like Minecraft can discover each other via broadcast requests that normally don't cross the real internet. Same underlying concept as corporate Site-to-Site VPNs connecting offices in different countries, just a lightweight/consumer-grade implementation — not suited for business scale, uptime, or access control needs

## Summary
Good practical session — connected router/switch/firewall theory to a real example I already use (Radmin VPN for Minecraft with friends), which made the "virtual network over the internet" concept click.