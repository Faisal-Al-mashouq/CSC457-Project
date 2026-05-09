<?php

declare(strict_types=1);

require_once __DIR__ . '/includes/places.php';
require_once __DIR__ . '/includes/card.php';

$id = isset($_GET['id']) ? (int) $_GET['id'] : 0;
$item = $id > 0 ? places_get_by_id($id) : null;
$all = places_all();

$landmarks = [];
$related = [];
if ($item) {
    $landmarks = is_array($item['landmarks']) ? $item['landmarks'] : [];
    $currentId = (int) $item['id'];
    foreach ($all as $row) {
        if ((int) $row['id'] === $currentId) {
            continue;
        }
        $related[] = $row;
        if (count($related) >= 3) {
            break;
        }
    }
}

$pageTitle = 'اكتشف السعودية - التفاصيل';
$activeNav = '';
?>
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title><?= h($pageTitle) ?></title>
  <link rel="stylesheet" href="css/style.css" />
  <script src="js/app.js" defer></script>
</head>
<body>
  <header class="site-header">
    <nav class="nav container">
      <a class="logo" href="index.php"><span class="logo-mark">س</span>اكتشف السعودية</a>
      <div class="nav-links">
        <a href="index.php" class="<?= $activeNav === 'home' ? 'active' : '' ?>">الرئيسية</a>
        <a href="regions.php" class="<?= $activeNav === 'regions' ? 'active' : '' ?>">المناطق</a>
        <a href="admin/login.php">دخول المشرف</a>
        <button id="themeToggle" class="theme-btn" type="button">الوضع الليلي</button>
      </div>
    </nav>
  </header>

  <main class="container section">
    <div id="detailsContent" class="details-wrapper">
      <?php if (!$item) : ?>
        <div class="details-content">
          <span class="section-label">تنبيه</span>
          <h1>لم يتم العثور على المحتوى</h1>
          <p>الرجاء الرجوع إلى معرض المناطق واختيار بطاقة أخرى.</p>
          <a class="btn btn-primary" href="regions.php">العودة للمعرض</a>
        </div>
      <?php else : ?>
        <article class="details-card-layout">
          <img class="details-image" src="<?= h((string) $item['image']) ?>" alt="<?= h((string) $item['name']) ?>" />
          <div class="details-content">
            <span class="section-label">صفحة التفاصيل</span>
            <h1><?= h((string) $item['name']) ?></h1>
            <div class="info-line">
              <span><?= h((string) $item['region']) ?></span>
              <span><?= h((string) $item['category']) ?></span>
            </div>
            <p><?= h((string) $item['description']) ?></p>

            <h2>أهم المعالم</h2>
            <ul class="landmark-list">
              <?php foreach ($landmarks as $landmark) : ?>
                <li><?= h((string) $landmark) ?></li>
              <?php endforeach; ?>
            </ul>

            <a class="btn btn-primary" href="regions.php">العودة إلى المناطق</a>
          </div>
        </article>
      <?php endif; ?>
    </div>

    <?php if ($item) : ?>
    <section class="section related-section">
      <div class="section-heading">
        <div>
          <span class="section-label">اقتراحات أخرى</span>
          <h2>أماكن قد تهمك</h2>
        </div>
        <a class="simple-link" href="regions.php">العودة للمعرض ←</a>
      </div>
      <div id="relatedGrid" class="cards-grid small-grid">
        <?php foreach ($related as $place) : ?>
          <?php render_place_card($place); ?>
        <?php endforeach; ?>
      </div>
    </section>
    <?php endif; ?>
  </main>

  <footer class="site-footer">
    <div class="container footer-inner">
      <p>© 2026 اكتشف السعودية - جامعة الملك سعود</p>
    </div>
  </footer>
</body>
</html>
