<?php
$dbname = "database_quick";
$user = "root";
$password = "";
$host = "localhost";
$port = 3306;

try {
    $pdo = new PDO(
        "mysql:host=$host;dbname=$dbname;port=$port",
        $user,
        $password,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]
    );
} catch (PDOException $e) {
    die("Database Connection failed: " . $e->getMessage());
}

return $pdo;
?>