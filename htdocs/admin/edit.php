<?php

declare(strict_types=1);

require_once dirname(__DIR__) . '/includes/auth.php';
require_once dirname(__DIR__) . '/includes/places.php';

auth_require_admin();

$id = isset($_GET['id']) ? (int) $_GET['id'] : 0;
$place = $id > 0 ? places_get_by_id($id) : null;
if (!$place) {
    http_response_code(404);
    echo 'غير موجود. <a href="dashboard.php">لوحة</a>';
    exit;
}

$lms = $place['landmarks'];
$landmarkLines = is_array($lms) ? implode("\n", array_map('strval', $lms)) : '';

$errors = [];
$pf = [
    'name' => (string) $place['name'],
    'region' => (string) $place['region'],
    'category' => (string) $place['category'],
    'short_text' => (string) $place['short_text'],
    'description' => (string) $place['description'],
    'image' => (string) $place['image'],
    'landmarks' => $landmarkLines,
];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $pf = [
        'name' => trim((string) ($_POST['name'] ?? '')),
        'region' => trim((string) ($_POST['region'] ?? '')),
        'category' => trim((string) ($_POST['category'] ?? '')),
        'short_text' => trim((string) ($_POST['short_text'] ?? '')),
        'description' => trim((string) ($_POST['description'] ?? '')),
        'image' => trim((string) ($_POST['image'] ?? '')),
        'landmarks' => (string) ($_POST['landmarks'] ?? ''),
    ];
    $landmarks = [];
    foreach (preg_split('/\r\n|\r|\n/', $pf['landmarks']) ?: [] as $line) {
        $t = trim((string) $line);
        if ($t !== '') {
            $landmarks[] = $t;
        }
    }
    if (
        $pf['name'] === '' || $pf['region'] === '' || $pf['category'] === ''
        || $pf['short_text'] === '' || $pf['description'] === '' || $pf['image'] === ''
        || $landmarks === []
    ) {
        $errors[] = 'أكمل كل الحقول.';
    } else {
        places_update($id, [
            'name' => $pf['name'],
            'region' => $pf['region'],
            'category' => $pf['category'],
            'short_text' => $pf['short_text'],
            'description' => $pf['description'],
            'image' => $pf['image'],
            'landmarks' => $landmarks,
        ]);
        $_SESSION['flash'] = 'تم التحديث بنجاح';
        header('Location: dashboard.php');
        exit;
    }
}
?>
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <title>تعديل</title>
  <link rel="stylesheet" href="../css/style.css" />
</head>
<body class="admin-simple admin-form-page">
<main class="admin-simple-inner">
<p class="admin-nav-top"><a href="dashboard.php">لوحة</a> | <a href="logout.php">تسجيل الخروج</a></p>
<h1>تعديل</h1>
<?php foreach ($errors as $msg) : ?>
  <p class="admin-error"><?= h($msg) ?></p>
<?php endforeach; ?>
<form method="post" action="edit.php?id=<?= $id ?>" class="admin-form">
  <p>اسم<br><input name="name" value="<?= h($pf['name']) ?>" required /></p>
  <p>منطقة<br><input name="region" value="<?= h($pf['region']) ?>" required /></p>
  <p>تصنيف<br>
    <select name="category">
      <option value="مدينة" <?= $pf['category'] === 'مدينة' ? 'selected' : '' ?>>مدينة</option>
      <option value="تاريخية" <?= $pf['category'] === 'تاريخية' ? 'selected' : '' ?>>تاريخية</option>
      <option value="ساحلية" <?= $pf['category'] === 'ساحلية' ? 'selected' : '' ?>>ساحلية</option>
      <option value="جبلية" <?= $pf['category'] === 'جبلية' ? 'selected' : '' ?>>جبلية</option>
    </select>
  </p>
  <p>نص قصير<br><textarea name="short_text" required maxlength="500"><?= h($pf['short_text']) ?></textarea></p>
  <p>وصف<br><textarea name="description" rows="5" required><?= h($pf['description']) ?></textarea></p>
  <p>صورة<br><input name="image" value="<?= h($pf['image']) ?>" required /></p>
  <p>معالم (سطر لكل معلم)<br><textarea name="landmarks" rows="4" required><?= h($pf['landmarks']) ?></textarea></p>
  <p><button type="submit">حفظ</button></p>
</form>
</main>
<script src="../js/app.js" defer></script>
</body>
</html>
