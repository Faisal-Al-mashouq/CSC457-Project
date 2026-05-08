<?php
require_once "db.php";

// Create
function createUser($name, $email) {
    global $pdo;
    $sql = "INSERT INTO users (name, email) VALUES (:name, :email)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([":name" => $name, ":email" => $email]);
    return $stmt->rowCount();
}

// Read
function getAllUsers() {
    global $pdo;
    $sql = "SELECT id, name, email FROM users";
    $stmt = $pdo->query($sql);
    $users = $stmt->fetchAll();
    return $users;
}

// Update
function updateUser($id, $name, $email) {
    global $pdo;
    $sql = "UPDATE users SET name = :name, email = :email WHERE id = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([":name" => $name, ":email" => $email, ":id" => $id]);
    return $stmt->rowCount();
}

// Delete
function deleteUser($id) {
    global $pdo;
    $sql = "DELETE FROM users WHERE id = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([":id" => $id]);
    return $stmt->rowCount();
}
?>