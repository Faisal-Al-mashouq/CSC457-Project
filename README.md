# اكتشف السعودية · Discover Saudi Arabia

واجهة ويب باللغة العربية لعرض مناطق ومعالم من المملكة العربية السعودية، مع لوحة مشرف لإدارة المحتوى.

A small Arabic-first web app for browsing Saudi regions and places, backed by MySQL, with an admin area for CRUD.

## Project layout

```
CSC457-Project/
├── README.md
└── v1/
    ├── includes/
    │   ├── auth.php
    │   ├── card.php
    │   ├── config.php   # loads includes/.env
    │   ├── db.php
    │   └── places.php
    ├── public/          # web root (point the server here)
    │   ├── admin/       # login, dashboard, add, edit, delete
    │   ├── assets/      # SVG illustrations
    │   ├── css/
    │   │   └── style.css
    │   ├── js/
    │   │   └── app.js
    │   ├── details.php
    │   ├── index.php
    │   └── regions.php
    └── sql/
        └── schema.sql   # tables + seed data
```

## Requirements

- PHP 8+ with PDO MySQL
- MySQL

## Setup

1. Create a database and configure environment variables in `v1/includes/.env` with:

   - `HOST`, `DBNAME`, `PORT`, `USER`, `PASSWORD`

2. Import the schema (creates tables and seed rows):

   ```bash
   mysql -u USER -p DB < v1/sql/schema.sql
   ```

3. From the repository root, start server from the public folder:

   ```bash
   php -S localhost:8080 -t v1/public
   ```

4. Open `http://localhost:8080` in the browser.

## Admin (development seed)

After importing `schema.sql`, the seeded admin user is:

- **Username:** `admin`  
- **Password:** `12345`
