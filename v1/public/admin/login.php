<?php

declare(strict_types=1);

require_once dirname(__DIR__, 2) . '/includes/auth.php';

if (auth_is_admin()) {
    header('Location: dashboard.php');
    exit;
}

$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (auth_attempt_login((string) ($_POST['username'] ?? ''), (string) ($_POST['password'] ?? ''))) {
        header('Location: dashboard.php');
        exit;
    }
    $error = 'خطأ في الدخول.';
}
?>
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <title>دخول</title>
  <link rel="stylesheet" href="../css/style.css" />
</head>
<body class="admin-simple admin-login">
<main class="admin-simple-inner">
<p class="admin-nav-top"><a href="../index.php">رجوع للموقع</a></p>
<h1>دخول مشرف</h1>
<?php if ($error !== '') : ?>
  <p class="admin-error"><?= h($error) ?></p>
<?php endif; ?>
<form method="post" action="login.php" class="admin-form">
  <p><label>المستخدم<br><input name="username" required /></label></p>
  <p><label>كلمة المرور<br><input name="password" type="password" required /></label></p>
  <p><button type="submit">دخول</button></p>
</form>
</main>
</body>
</html>
