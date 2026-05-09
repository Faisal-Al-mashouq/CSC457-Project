<?php

declare(strict_types=1);

require_once dirname(__DIR__) . '/includes/auth.php';
require_once dirname(__DIR__) . '/includes/places.php';

auth_require_admin();

$rows = places_all();
?>
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <title>لوحة</title>
  <link rel="stylesheet" href="../css/style.css" />
</head>
<body class="admin-simple admin-dashboard">
<main class="admin-simple-inner">
<p class="admin-nav-top"><a href="../index.php">الموقع</a> | <a href="logout.php">تسجيل الخروج</a></p>
<?php if (!empty($_SESSION['flash'])) : ?>
  <p class="admin-success"><?= h((string) $_SESSION['flash']) ?></p>
  <?php unset($_SESSION['flash']); ?>
<?php endif; ?>
<h1>الوجهات</h1>
<p><a href="add.php">إضافة</a></p>
<div class="admin-table-wrap">
<table>
  <tr><th>#</th><th>الاسم</th><th></th></tr>
  <?php foreach ($rows as $row) : ?>
    <?php $rid = (int) $row['id']; ?>
    <tr>
      <td><?= $rid ?></td>
      <td><?= h((string) $row['name']) ?></td>
      <td><a href="edit.php?id=<?= $rid ?>">تعديل</a> <a href="delete.php?id=<?= $rid ?>">حذف</a></td>
    </tr>
  <?php endforeach; ?>
</table>
</div>
</main>
<script src="../js/app.js" defer></script>
</body>
</html>
