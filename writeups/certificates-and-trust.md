# Self-Study — Certificates, CA & HTTPS Trust

## Date
2026-10-16

## What I learned
Started from a question about whitelisting trusted IPs in a firewall, which led into why IP-based trust is weak and how certificate-based trust (mTLS) solves it. Went hands-on: created a self-signed Certificate Authority, issued a device certificate, imported it into Windows' Trusted Root store, and ran a local HTTPS server with it — then explored how public trust (Let's Encrypt, Certificate Transparency) and MITM risks actually work.

## Key concepts

**Why IP whitelisting is weak**
- A firewall can be set to default-deny with an allow-list of known IPs, but it's fragile in practice:
  - Most home ISPs assign dynamic IPs that change over time.
  - IP-based trust applies to external/internet traffic, not internal LAN traffic (which uses internal DHCP-assigned IPs).
  - IP addresses can be spoofed.
  - Doesn't scale for people on mobile networks, travel, VPNs, etc.
- Real-world alternatives: VPN + authentication, client certificates / mTLS, or static IP + site-to-site VPN for genuinely fixed, trusted endpoints.

**Certificates (X.509) and mTLS**
- A certificate ties a public key to an identity (domain, organization), signed by a Certificate Authority (CA).
- Regular HTTPS only verifies the server to the client. **mTLS (mutual TLS)** verifies both directions — the client also presents a certificate, so the server can confirm it's a trusted device before allowing a connection, regardless of its IP.
- Chain of trust: Root CA → (optional Intermediate CA) → Leaf certificate. Trust is anchored at the root; everyone's OS/browser ships with a list of pre-trusted public Root CAs.

**Creating a self-signed CA and certificate (OpenSSL)**
- Generated a root CA key and self-signed root certificate:
  ```
  openssl genrsa -out rootCA.key 4096
  openssl req -x509 -new -key rootCA.key -sha256 -days 3650 -out rootCA.crt
  ```
- Generated a device key, CSR, and had the CA sign it into a certificate:
  ```
  openssl genrsa -out device1.key 2048
  openssl req -new -key device1.key -out device1.csr
  openssl x509 -req -in device1.csr -CA rootCA.crt -CAkey rootCA.key -CAcreateserial -out device1.crt -days 365 -sha256
  ```
- First attempt failed in the browser with `ERR_CERT_COMMON_NAME_INVALID` — the certificate's CN didn't match `localhost`. Modern browsers require the domain to match the certificate's CN/SAN (Subject Alternative Name), not just any CN.
- Fixed it with an OpenSSL config file defining `localhost`/`127.0.0.1` as SAN entries, then regenerated the CSR and certificate using that config (`-extfile ... -extensions v3_req`).

**Trusting a self-signed CA locally**
- Importing `rootCA.crt` into Windows' **Trusted Root Certification Authorities** store (via `certmgr.msc`) made the browser trust any certificate signed by that CA — shown by Windows' explicit security warning when manually trusting a new root CA.
- This trust is local only: it was set up by hand, on one machine. It does not extend to any other computer.

**Local HTTPS server (Node.js)**
- Ran a minimal HTTPS server using the device cert/key:
  ```js
  const https = require('https');
  const fs = require('fs');
  const options = {
    key: fs.readFileSync('device1.key'),
    cert: fs.readFileSync('device1.crt')
  };
  https.createServer(options, (req, res) => {
    res.writeHead(200);
    res.end('Hello over HTTPS with my own cert!\n');
  }).listen(8443);
  ```
- After fixing the SAN mismatch and trusting the root CA, `https://localhost:8443` loaded securely with no browser warning.

**Certificate storage and formats**
- PEM (`.crt`/`.pem`/`.key`, Base64 text) vs DER (binary) vs PKCS#12/PFX (cert + private key bundled, often password-protected).
- Windows stores certs in a Certificate Store (`certmgr.msc`), separated into Personal, Trusted Root CA, Intermediate CA, etc. Linux typically keeps them as files under `/etc/ssl/certs/`.
- Private keys must stay protected (restricted file permissions, or hardware-backed storage like a TPM/HSM) — if a root CA's private key is ever compromised, every certificate it issued becomes untrustworthy.

**Why a self-signed cert can't be used for a real public domain**
- Two separate reasons: the CN/SAN must match the actual domain being accessed, and — more importantly — nobody else's device trusts a privately-created root CA. For a real public site, a certificate must come from a publicly trusted CA (e.g. Let's Encrypt), which browsers/OSes already trust out of the box.

**Can certificate trust be abused?**
- A certificate itself is just data (text fields + a cryptographic signature) — it is not executable code and can't carry a "payload."
- The real risk is trust itself: if an attacker gets their own root CA installed in a victim's Trusted Root store (phishing, malicious installer, physical access), they can then mint certificates for any domain that the victim's browser will accept without warning — enabling a man-in-the-middle attack on HTTPS traffic. This is also used legitimately by some companies (corporate MITM for DLP/inspection) via managed root CAs pushed through policy.
- A real historical case of a compromised CA: DigiNotar (2011) — a breached CA issued fraudulent certificates for Google, later used for surveillance; it was subsequently removed from all trust stores.

**HTTPS can still be used for scam sites**
- HTTPS/a valid certificate only proves domain control — not that the business behind it is legitimate.
- DV (Domain Validation) certificates (e.g. free, automated via Let's Encrypt) are trivial to get for any registered domain, including deliberately deceptive lookalike domains.
- Defenses that actually catch this in practice: Certificate Transparency logs (every public cert must be logged publicly, letting companies monitor for lookalike certs issued on their behalf), browser-level phishing blocklists (Google Safe Browsing, Microsoft SmartScreen), and CAs/hosts revoking/taking down reported abuse.

**HTTP/HTTPS transport layer**
- Both HTTP and HTTPS run over **TCP**, not UDP — TLS is simply an added layer between HTTP and TCP. TCP's reliability (ordered delivery, retransmission) is needed for a webpage to load correctly.
- HTTP/3 is the exception: it runs over UDP via the QUIC protocol, which implements its own reliability and has encryption built in by default — but this is a newer, separate protocol from classic HTTP/1.1 and HTTP/2.

## Practice
- Generated a root CA and a signed device certificate with OpenSSL.
- Hit and diagnosed a real `ERR_CERT_COMMON_NAME_INVALID` error, fixed it by adding a SAN config and reissuing the certificate.
- Imported the root CA into Windows' Trusted Root store and confirmed the change in trust behavior before/after.
- Ran a working local HTTPS server (Node.js) and verified the padlock/secure connection in the browser using the self-issued certificate.

## Summary
Started from a simple firewall question and ended up building and trusting an entire mini certificate authority by hand — which made concepts like chain of trust, CN/SAN validation, and the limits of self-signed certificates concrete rather than abstract. Also clarified real-world attack surface around CAs (rogue root CA installs, DV-cert phishing) and the actual mechanisms (CT logs, Safe Browsing) that catch it.