<?php

declare(strict_types=1);

function h(string $s): string
{
    return htmlspecialchars($s, ENT_QUOTES, 'UTF-8');
}

function config(): array
{
    static $cached = null;
    if ($cached !== null) {
        return $cached;
    }

    $cached = parse_ini_file(__DIR__ . '/.env');
    if ($cached === false) {
        throw new RuntimeException('Missing or invalid includes/.env');
    }
    return $cached;
}
