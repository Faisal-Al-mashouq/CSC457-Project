<?php

declare(strict_types=1);

require_once __DIR__ . '/config.php';

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

function auth_is_admin(): bool
{
    return isset($_SESSION['admin_id']) && (int) $_SESSION['admin_id'] > 0;
}

function auth_require_admin(): void
{
    if (!auth_is_admin()) {
        header('Location: login.php', true, 302);
        exit;
    }
}

function auth_attempt_login(string $username, string $password): bool
{
    require_once __DIR__ . '/db.php';

    $username = trim($username);
    if ($username === '' || $password === '') {
        return false;
    }

    $stmt = db()->prepare(
        'SELECT id, password_hash, role FROM users WHERE username = ? LIMIT 1'
    );
    $stmt->execute([$username]);
    $row = $stmt->fetch();
    if (!$row || ($row['role'] ?? '') !== 'admin') {
        return false;
    }

    if (!password_verify($password, (string) $row['password_hash'])) {
        return false;
    }

    $_SESSION['admin_id'] = (int) $row['id'];

    return true;
}

function auth_logout(): void
{
    session_destroy();
    header('Location: login.php', true, 302);
    exit;
}