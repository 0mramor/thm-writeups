# TryHackMe — HTTP in Detail

## Date
(впиши сегодняшнюю дату)

## What I learned
URL structure, HTTP status codes, HTTP methods, and the Set-Cookie header.

## Key concepts

**URL structure**
https://www.example.com:443/path/page.html?search=cats#section2

| Part | Meaning | Example |
|---|---|---|
| Scheme | Protocol to use | https:// |
| Subdomain | www. |
| Domain | example.com |
| Port | 443 (often hidden if standard) |
| Path | /path/page.html |
| Query string | ?search=cats |
| Fragment | #section2 |

**HTTP status codes, by first digit**
| Range | Category | Examples |
|---|---|---|
| 1xx | Informational | 100 Continue |
| 2xx | Success | 200 OK |
| 3xx | Redirection | 301 Moved Permanently |
| 4xx | Client error | 404 Not Found, 403 Forbidden |
| 5xx | Server error | 500 Internal Server Error |

**HTTP methods**
- GET — retrieve data
- POST — send data (e.g. a form)
- PUT/DELETE — update/remove a resource

**Set-Cookie header**
- The header a server uses to tell the browser to store a cookie
- Example: `Set-Cookie: 1e32751bb0`

## Summary
Connected this to earlier topics — 404 was already familiar from a real GitHub Pages mistake, and GET requests were already seen live in Wireshark on neverssl.com.