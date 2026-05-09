<?php

declare(strict_types=1);

require_once dirname(__DIR__) . '/includes/auth.php';

auth_require_admin();

if (isset($_GET['confirm']) && $_GET['confirm'] === '1') {
    auth_logout();
}

?>
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <title>تسجيل الخروج</title>
  <link rel="stylesheet" href="../css/style.css" />
</head>
<body class="admin-simple admin-logout">
<main class="admin-simple-inner">
<p class="admin-nav-top"><a href="dashboard.php">لوحة التحكم</a></p>
<h1>تسجيل الخروج</h1>
<p>هل أنت متأكد من تسجيل الخروج؟</p>
<p class="admin-actions"><a href="dashboard.php">لا</a> <a href="logout.php?confirm=1">نعم</a></p>
</main>
</body>
</html>
