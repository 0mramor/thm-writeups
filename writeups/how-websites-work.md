# TryHackMe — How Websites Work

## Date
2026-10-06

## What I learned
Frontend vs backend, how JavaScript interacts with HTML via the DOM, and a first hands-on look at HTML injection.

## Key concepts

**Frontend vs Backend**
- Frontend — HTML (structure), CSS (style), JavaScript (interactivity) — runs in the browser
- Backend — server-side logic, database access — generates the response sent to the browser

**JavaScript + DOM basics**
- `document` — built-in JS object representing the whole page
- `document.getElementById("demo")` — finds a specific HTML element by its id
- `.innerHTML = "new text"` — replaces that element's content
- Events like `onclick` can trigger JS directly from an HTML element

**HTML injection**
- Inserted a raw HTML link tag to demonstrate the concept:
```html
<a href="http://hacker.com">Click here</a>
```
- If a site doesn't sanitize user input (e.g. a comment field), an attacker can inject HTML/JS that gets stored and then rendered — and executed — in every visitor's browser who views that content
- This doesn't modify the site's actual source code permanently; it's stored content (e.g. in a database) that gets reflected back into the page for all viewers
- Real risk: stolen cookies (session hijacking), redirects to phishing pages, fake login forms — this is the basic idea behind XSS

## Summary
First practical look at how unvalidated input becomes a real vulnerability (XSS), not just a theoretical term — ties back to the SQL and sanitization concepts from earlier.