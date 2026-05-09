# اكتشف السعودية · Discover Saudi Arabia

واجهة ويب باللغة العربية لعرض مناطق ومعالم من المملكة العربية السعودية، مع لوحة مشرف لإدارة المحتوى.

A small Arabic-first web app for browsing Saudi regions and places, backed by MySQL, with an admin area for CRUD.

## Project layout

```
CSC457-Project/
├── README.md
└── htdocs/              # document root (local dev & typical shared hosting)
    ├── includes/
    │   ├── .env         # create from .env.example; do not commit secrets
    │   ├── .env.example
    │   ├── .htaccess    # denies direct HTTP access to this folder (Apache)
    │   ├── auth.php
    │   ├── card.php
    │   ├── config.php   # loads includes/.env
    │   ├── db.php
    │   └── places.php
    ├── admin/           # login, dashboard, add, edit, delete
    ├── assets/          # SVG illustrations
    ├── css/
    │   └── style.css
    ├── js/
    │   └── app.js
    ├── details.php
    ├── index.php
    ├── regions.php
    └── sql/
        └── schema.sql   # tables + seed data
```

Copy **`htdocs/` contents** into your host’s web root (e.g. InfinityFree’s `htdocs`), not an extra nested `htdocs` folder, so `index.php` is served at the site root.

On Apache, **`includes/.htaccess`** blocks direct browser access to that directory while PHP `require` still works. Omit it if your stack is not Apache.

## Requirements

- PHP 8+
- MySQL

## Setup

1. Copy `htdocs/includes/.env.example` to `htdocs/includes/.env` and set:

   - `HOST`, `DBNAME`, `PORT`, `USER`, `PASSWORD`

2. Import the schema (creates tables and seed rows):

   ```bash
   mysql -u USER -p DB < htdocs/sql/schema.sql
   ```

3. From the repository root, start the PHP built-in server with `htdocs` as the document root:

   ```bash
   php -S localhost:8080 -t htdocs
   ```

4. Open `http://localhost:8080` in the browser.

## Admin (development seed)

After importing `schema.sql`, the seeded admin user is:

- **Username:** `admin`  
- **Password:** `12345`
