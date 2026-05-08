<?php

declare(strict_types=1);

require_once __DIR__ . '/db.php';

function places_normalize_row(array $row): array
{
    $lm = $row['landmarks'] ?? null;
    if (is_string($lm)) {
        $decoded = json_decode($lm, true);
        $row['landmarks'] = is_array($decoded) ? $decoded : [];
    } elseif (!is_array($lm)) {
        $row['landmarks'] = [];
    }

    return $row;
}

function places_all(): array
{
    $sql = <<<SQL
        SELECT id, name, region, category, short_text, description, image, landmarks
        FROM places
        ORDER BY id ASC
    SQL;

    $stmt = db()->query($sql);
    $rows = $stmt->fetchAll();
    return array_map('places_normalize_row', $rows);
}

function places_get_by_id(int $id): ?array
{
    $stmt = db()->prepare(
        'SELECT id, name, region, category, short_text, description, image, landmarks FROM places WHERE id = ? LIMIT 1'
    );
    $stmt->execute([$id]);
    $row = $stmt->fetch();
    if (!$row) {
        return null;
    }

    return places_normalize_row($row);
}

function places_create(array $data): int
{
    $json = json_encode($data['landmarks'], JSON_UNESCAPED_UNICODE) ?: '[]';
    $stmt = db()->prepare(
        'INSERT INTO places (name, region, category, short_text, description, image, landmarks) VALUES (?,?,?,?,?,?,?)'
    );
    $stmt->execute([
        $data['name'],
        $data['region'],
        $data['category'],
        $data['short_text'],
        $data['description'],
        $data['image'],
        $json,
    ]);

    return (int) db()->lastInsertId();
}

function places_update(int $id, array $data): void
{
    $json = json_encode($data['landmarks'], JSON_UNESCAPED_UNICODE) ?: '[]';
    $stmt = db()->prepare(
        'UPDATE places SET name=?, region=?, category=?, short_text=?, description=?, image=?, landmarks=? WHERE id=?'
    );
    $stmt->execute([
        $data['name'],
        $data['region'],
        $data['category'],
        $data['short_text'],
        $data['description'],
        $data['image'],
        $json,
        $id,
    ]);
}

function places_delete(int $id): void
{
    $stmt = db()->prepare('DELETE FROM places WHERE id = ?');
    $stmt->execute([$id]);
}
