# TryHackMe — Putting It All Together

## Date
(впиши сегодняшнюю дату)

## What I learned
How a website request works end to end, and the extra components that sit between a user and a web application: load balancers, CDNs, and WAFs.

## Key concepts

**Request path (what the final quiz tested)**
1. Browser looks up the domain via DNS to get the server's IP
2. Browser connects to the web server on port 80 or 443
3. Web server receives the HTTP GET request
4. Web application queries the database if it needs data
5. Server returns the response and the browser renders the HTML into a viewable website

**Load balancer**
- Distributes incoming requests across several servers and runs health checks, so traffic stops going to a server that is down
- Algorithms: Round Robin, Weighted Round Robin, Least Connections

**CDN (Content Delivery Network)**
- Keeps cached copies of static content (images, CSS, JS, video) on servers geographically close to the user
- Lower latency for the user, less load on the origin server; cache lifetime is controlled by TTL

**WAF (Web Application Firewall)**
- Works at OSI layer 7: inspects the content of HTTP requests (URL, parameters, headers, cookies, body), unlike a regular firewall that only looks at IPs and ports
- Blocks known attack patterns such as SQL injection and XSS, and rate-limits abusive traffic
- Can run as software (e.g. ModSecurity), a hardware appliance, or a cloud service (e.g. Cloudflare)
- Limitations: it doesn't replace secure code, it can be bypassed (encoded payloads, hitting the origin IP directly), and it can produce false positives

## Summary
Closes out the Pre Security web section. DNS, TCP/TLS, HTTP, SQL and the OSI layers from earlier rooms now fit into one request/response picture.