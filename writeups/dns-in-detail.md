# TryHackMe — DNS in Detail

## Date
2026-10-05

## What I learned
How DNS resolves domain names to IP addresses, the hierarchy of DNS servers, common record types, and hands-on queries with nslookup.

## Key concepts

**DNS resolution chain**
User → Resolver → Root Server → TLD Server → Authoritative Server → (answer returned back to User)

- **Root servers** — don't store individual domain data, just know which TLD servers to direct to (e.g. "for .com, go here")
- **TLD servers** — manage one zone (.com, .org, .ua, etc.), know which authoritative server handles a specific domain
- **Authoritative servers** — hold the actual DNS records (A, MX, TXT, etc.) for a domain, configured by the domain owner via their hosting/DNS provider
- **Resolver** — does the actual chain-walking on the user's behalf and caches results so repeat lookups are faster

**Common DNS record types**
| Record | Purpose |
|---|---|
| A | Domain → IPv4 address |
| AAAA | Domain → IPv6 address |
| CNAME | Domain → another domain (alias). Cannot be used on the root/apex domain, only subdomains |
| MX | Where to route email for the domain |
| TXT | Arbitrary text — domain ownership verification, SPF/DKIM/DMARC for email security |
| NS | Which servers are authoritative for this domain's DNS |

**TTL (Time To Live)**
- Field on every DNS record specifying how long a resolver should cache the answer before asking again
- Low TTL = faster propagation of changes, more load on the authoritative server
- High TTL = less load, but changes (e.g. IP migration) take longer to reach all users
- Good practice: lower TTL in advance if planning to change a record soon

## Practice
Used `nslookup` to query DNS records directly:
```bash
nslookup --type=CNAME shop.website.thm
```
Learned the hard way that a stray space in a domain name breaks the lookup entirely (NXDOMAIN) — domains must be written as one continuous string, no spaces.

## Summary
Connected DNS structure to things already covered — CNAME use cases (pointing a subdomain at third-party infrastructure like GitHub Pages or Cloudflare), and how a self-hosted server with a known IP just needs a direct A record instead.