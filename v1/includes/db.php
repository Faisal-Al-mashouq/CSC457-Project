<?php

declare(strict_types=1);

require_once __DIR__ . '/config.php';

function db(): PDO
{
    static $pdo = null;
    if ($pdo instanceof PDO) {
        return $pdo;
    }

    $c = config();
    $port = (int) $c['PORT'];
    $dsn = sprintf(
        'mysql:host=%s;dbname=%s;port=%d;charset=utf8mb4',
        $c['HOST'],
        $c['DBNAME'],
        $port
    );

    $pdo = new PDO(
        $dsn,
        $c['USER'],
        $c['PASSWORD'],
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]
    );

    return $pdo;
}
