\# TryHackMe — CyberHeroes



\## Date

2026-10-13



\## What I learned

How client-side authentication can be completely bypassed when the login logic (including the actual credentials) lives in JavaScript that's sent to the browser — meaning anyone can read it via view-source, with no server-side validation involved.



\## Key concepts



\*\*Client-side vs server-side authentication\*\*

\- In this challenge, the login form's JS ran the password check entirely in the browser:

```js

&#x20; function authenticate() {

&#x20;   a = document.getElementById('uname')

&#x20;   b = document.getElementById('pass')

&#x20;   const RevereString = str => \[...str].reverse().join('');

&#x20;   if (a.value == "h3ck3rBoi" \& b.value == RevereString("54321@terceSrepuS")) {

&#x20;     ...

&#x20;   }

&#x20; }

```

\- The server never validated the credentials — the comparison happened locally in JS, which is fully visible via "View Page Source" / dev tools.

\- Mild obfuscation was used to slow down reading: the password string was reversed (`RevereString`), and the surrounding file had a lot of unrelated boilerplate (footer, library includes, license comments) to bury the relevant lines.



\*\*Finding the credentials\*\*

\- Username was hardcoded directly: `"h3ck3rBoi"`.

\- Password was hardcoded reversed: `"54321@terceSrepuS"` → reversing it character by character gives `SuperSecret@12345`.

\- `\[...str].reverse().join('')` splits a string into a character array, reverses the array order, and joins it back — a simple reversible obfuscation, not real security.



\*\*Why this is a vulnerability\*\*

\- Any logic or secret shipped to the client (HTML/JS/CSS) is fully readable by the user — there's no such thing as a "hidden" client-side secret.

\- Real authentication must be verified server-side; the client should never be the one deciding whether a login is valid.



\## Practice

\- Opened `view-source:` on the login page to read the full JS.

\- Located the `authenticate()` function and the credential comparison logic.

\- Manually reversed the obfuscated password string to recover the real value.

\- Submitted the recovered username/password — the script fired a GET request to a flag file (`...\_Flag\_{username}\_{password}.txt`) and displayed the flag.



\## Summary

A simple but clear demonstration of why authentication logic and secrets must never live in client-side code: no matter how it's obfuscated (reversed strings, buried in boilerplate), anything sent to the browser can be read and reverse-engineered by the user.

