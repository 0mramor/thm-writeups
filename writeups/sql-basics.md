# TryHackMe — SQL Fundamentals

## Date
30 September 2026

## What I learned
Basics of SQL (Structured Query Language) — how to query and filter data stored in database tables.

## Key concepts
A database table is organized into **columns** (categories of data) and **rows** (individual records), similar to a spreadsheet.

**Core commands, in required query order:**
```sql
SELECT columns
FROM table
WHERE condition
ORDER BY column [ASC|DESC];
```

- `SELECT` — choose which columns to return (`*` = all columns)
- `FROM` — which table to query
- `WHERE` — filter rows based on a condition
- `ORDER BY` — sort results (ascending by default, `DESC` for descending)

## Example
```sql
SELECT name, age
FROM users
WHERE age > 18
ORDER BY age DESC;
```

## Why this matters for cybersecurity
Understanding SQL is the foundation for understanding **SQL injection** — when user input is inserted directly into a query without proper validation, allowing an attacker to manipulate the query itself (e.g. bypass a login check or dump a whole table).

## Summary
Picked up the core SQL query structure quickly — it reads close to plain English, much easier than Python/JS syntax so far.