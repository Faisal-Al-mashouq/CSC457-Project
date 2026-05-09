<?php

declare(strict_types=1);

require_once dirname(__DIR__) . '/includes/auth.php';
require_once dirname(__DIR__) . '/includes/places.php';

auth_require_admin();

$id = isset($_GET['id']) ? (int) $_GET['id'] : 0;
$place = $id > 0 ? places_get_by_id($id) : null;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $postId = isset($_POST['id']) ? (int) $_POST['id'] : 0;
    if ($postId > 0 && places_get_by_id($postId)) {
        places_delete($postId);
    }
    header('Location: dashboard.php');
    exit;
}

if (!$place) {
    http_response_code(404);
    echo 'غير موجود. <a href="dashboard.php">لوحة</a>';
    exit;
}
?>
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <title>حذف</title>
  <link rel="stylesheet" href="../css/style.css" />
</head>
<body class="admin-simple">
<main class="admin-simple-inner">
<p class="admin-nav-top"><a href="dashboard.php">لوحة</a></p>
<h1>حذف «<?= h((string) $place['name']) ?>»؟</h1>
<form method="post" action="delete.php?id=<?= $id ?>" class="admin-form">
  <input type="hidden" name="id" value="<?= $id ?>" />
  <p class="admin-actions-row">
    <button type="submit" class="admin-btn-danger">نعم احذف</button>
    <a href="dashboard.php">إلغاء</a>
  </p>
</form>
</main>
</body>
</html>
