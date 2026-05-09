# Discover Saudi Arabia — Full Repository Guide

This document explains **every part** of this project in simple terms. If you are new to PHP, HTML, CSS, or JavaScript, read the “Building blocks” section first.

---

## Building blocks (one sentence each)

| Technology | Simple explanation |
|------------|-------------------|
| **HTML** | The **skeleton** of a page: headings, paragraphs, buttons, links. |
| **CSS** | The **paint and layout**: colors, fonts, spacing, dark mode. |
| **JavaScript (JS)** | **Instructions in the visitor’s browser** after the page loads (search, random place, theme toggle). |
| **PHP** | **Instructions on the server** *before* sending the page: load data from the database, build HTML. |
| **MySQL** | A **database**: tables of rows (like smart spreadsheets) that PHP reads and writes. |

---

## The big picture

**Discover Saudi Arabia** (“اكتشف السعودية”) is a small **Arabic-first** website that:

- Shows **regions and places** in Saudi Arabia (names, short blurbs, long descriptions, images, landmarks).
- Gives a **logged-in admin** a private area to **create, read, update, and delete** places (**CRUD**).

Think of it as a **digital museum**: visitors browse exhibits; a **keeper** (admin) manages them; a **filing cabinet** (MySQL) stores the facts.

### How the pieces work together

1. The **browser** asks for a URL (e.g. the home page).
2. The **web server** runs the matching **PHP file**.
3. PHP connects to **MySQL**, fetches rows, then **outputs HTML**.
4. The browser receives HTML plus **CSS** and **JS** and displays the page.
5. On the **regions** page, **JavaScript** shows or hides cards as you type—**without** asking the server again for that step.

---

## Project layout

```
CSC457-Project/
├── README.md                 # Setup & run instructions
├── REPOSITORY_GUIDE.md       # This file
├── .gitignore                # Git: ignore secrets (e.g. .env)
└── htdocs/                   # Web root (document root)
    ├── index.php             # Home
    ├── regions.php           # All places + search/filter
    ├── details.php           # One place by ?id=
    ├── includes/             # Shared PHP (not for direct browsing)
    ├── admin/                # Login, dashboard, add, edit, delete
    ├── assets/               # Images (SVG, JPG)
    ├── css/style.css         # All styling
    ├── js/app.js             # Theme, filters, random suggestion, forms
    └── sql/schema.sql        # Tables + seed data
```

Copy **`htdocs/` contents** into your host’s web root so `index.php` is at the site root (see `README.md`).

---

## Top-level files

### `README.md`

Project **manual**: requirements (PHP 8+, MySQL), `.env` setup, importing `schema.sql`, running `php -S localhost:8080 -t htdocs`, and the **development** admin user (`admin` / `12345`).

### `.gitignore`

Tells Git **not** to commit `.env` (so database passwords stay off GitHub).

### `.DS_Store`

macOS Finder metadata—not part of the app. Safe to ignore for learning; teams often add it to `.gitignore`.

---

## `htdocs/` — public website root

Everything under `htdocs/` is what a web server serves as your site.

### Public pages

| File | Purpose |
|------|---------|
| **`index.php`** | **Home**: loads all places from the DB, shows the **first three** as “featured,” intro text, link to regions, “suggest a destination” button, and embeds **JSON** of all places for JavaScript. |
| **`regions.php`** | **Gallery**: every place as a **card**, plus **search**, **category** filter, **result count**, and reset. |
| **`details.php`** | **Detail page** for one place (`details.php?id=…`). Long description, **landmarks** list, and up to **three** other places as suggestions. Invalid id → “not found” message. |

**PHP patterns you will see**

- `require_once '…'` — include another PHP file so its functions are available.
- `<?= h($text) ?>` — print text **safely** for HTML (prevents injection); `h()` lives in `includes/config.php`.
- `foreach (… as $place)` — repeat HTML for each place in a list.

---

## `htdocs/includes/` — shared server-side code

| File | Purpose |
|------|---------|
| **`config.php`** | Reads **`includes/.env`** with `parse_ini_file`. Exposes **`config()`** for DB settings and **`h($string)`** for HTML escaping. |
| **`db.php`** | Opens a single **PDO** MySQL connection (created once, reused), UTF-8 (`utf8mb4`), strict errors. |
| **`places.php`** | All **place** DB logic: list all, get by id, create, update, delete; **normalizes** `landmarks` from JSON string to a PHP **array**. |
| **`card.php`** | **`render_place_card($place)`** — prints one clickable **card** (image, category badge, title, region, short text) with `data-category` and `data-search` for client-side filtering. |
| **`auth.php`** | **Sessions**: `auth_is_admin()`, `auth_require_admin()` (redirect to login if not admin), `auth_attempt_login()` (username + **password_verify** against bcrypt hash), `auth_logout()`. |
| **`.env.example`** | Template for `HOST`, `DBNAME`, `PORT`, `USER`, `PASSWORD`. Copy to **`.env`** locally (never commit `.env`). |
| **`.htaccess`** | On **Apache**, denies **direct HTTP** access to this folder so `.env` cannot be downloaded by URL guessing. PHP `require` still works. |

---

## `htdocs/admin/` — admin area

| File | Purpose |
|------|---------|
| **`login.php`** | Login form. Success → `dashboard.php`. Already logged in → dashboard. |
| **`dashboard.php`** | Lists all places; links to **Add**, **Edit**, **Delete**; shows one-time **flash** message after actions. |
| **`add.php`** | Form to **create** a place; validates required fields; landmarks = **one line per item** in a textarea → array → JSON in DB. |
| **`edit.php`** | Same as add but **updates** existing row (`?id=`); 404 if missing. |
| **`delete.php`** | Confirm screen; **POST** performs delete. |
| **`logout.php`** | Confirmation then destroys session when `?confirm=1`. |

All admin pages except **`login.php`** call **`auth_require_admin()`** so strangers cannot open the dashboard.

---

## `htdocs/sql/schema.sql`

Defines two tables and seed rows.

### Table `users`

- `id`, `username`, `password_hash` (bcrypt, **not** plain text), `role` (`admin` / `user`).
- Seed: one admin (see `README.md` for dev password).

### Table `places`

- `id`, `name`, `region`, `category`, `short_text` (card blurb, max 500 in forms), `description` (long text), `image` (path under site, e.g. `assets/riyadh.svg`), `landmarks` (**JSON** array of strings).

Seed data includes six places (e.g. Riyadh, Makkah, Jeddah, AlUla, Abha, Taif) with Arabic content.

---

## `htdocs/css/style.css`

- **`:root`** — CSS variables (greens, gold, sand, borders, shadows, radius).
- **Layout** — CSS Grid for hero, cards, details, filters; **sticky** header; **footer**.
- **Components** — buttons (`.btn-primary`, `.btn-secondary`), cards, badges, filter panel, detail layout, landmark pills.
- **`body.dark`** — dark theme by swapping variables and a few overrides.
- **Admin** — narrow centered panels, tables, error (red) / success (green), danger button for delete.
- **`@media`** — narrower screens: single column, stacked nav, smaller grids.

---

## `htdocs/js/app.js`

Runs when the document is ready (`DOMContentLoaded`).

| Function / area | What it does |
|-----------------|----------------|
| **`THEME_KEY` + `setupTheme`** | Reads/writes **localStorage** for dark vs light; toggles `dark` on `<body>`; updates button label (Arabic). |
| **`parsePlacesFromPage`** | Parses hidden JSON in `#places-json` on the home page (all places for random picker). |
| **`setupRandomSuggestion`** | Random place + safe HTML via **`escapeHTML`**; link to `details.php?id=…`. |
| **`setupRegionsFilters`** | Uses **`data-search`** and **`data-category`** on each `.place-card`; shows/hides cards; updates result count. |
| **`setupActiveNav`** | Marks the current page’s nav link with class **`active`** using the URL path. |
| **`setupAdminFormValidation`** | On submit, blocks empty **required** fields with an Arabic **alert**. |

---

## `htdocs/assets/`

- **`.svg`** — vector images (used in seed `image` paths).
- **`.jpg`** — photos (optional use; paths can point here instead of SVG).
- **`generic.svg`** — default image path for new rows in **`add.php`**.
- **`hero.svg`** — decorative hero imagery where referenced.

---

## Mental model (very short)

- **Browser** = screen you look at  
- **HTML** = structure  
- **CSS** = look and layout  
- **JS** = reacts to clicks and typing in the browser  
- **PHP** = builds pages and talks to the database on the server  
- **MySQL** = stored data  
- **Session** = server-side “you are logged in as admin” after login  

---

## Security reminder

Default **`admin` / `12345`** is for **local development only**. Change credentials and harden hosting for anything public.

---

## Related file

For install and run commands, see **`README.md`**.
