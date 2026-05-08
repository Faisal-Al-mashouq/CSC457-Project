<?php

declare(strict_types=1);

require_once dirname(__DIR__) . '/includes/places.php';
require_once dirname(__DIR__) . '/includes/card.php';

$all = places_all();

$pageTitle = 'اكتشف السعودية - المناطق';
$activeNav = 'regions';
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
    <section class="page-hero compact-hero">
      <span class="eyebrow">معرض المناطق</span>
      <h1>اختر منطقة أو ابحث عن وجهة</h1>
      <p>استخدم البحث أو التصنيف، ثم اضغط على البطاقة لعرض التفاصيل.</p>
    </section>

    <section class="filter-panel" aria-label="خيارات البحث والتصفية">
      <div class="field-group search-field">
        <label for="searchInput">البحث</label>
        <input id="searchInput" type="text" placeholder="مثال: الرياض، جدة، العلا" />
      </div>

      <div class="field-group">
        <label for="categoryFilter">التصنيف</label>
        <select id="categoryFilter">
          <option value="all">كل التصنيفات</option>
          <option value="مدينة">مدينة</option>
          <option value="تاريخية">تاريخية</option>
          <option value="ساحلية">ساحلية</option>
          <option value="جبلية">جبلية</option>
        </select>
      </div>

      <button id="resetFilters" class="btn btn-secondary" type="button">إعادة ضبط</button>
      <p id="resultCount" class="result-count">عدد النتائج: <?= count($all) ?></p>
    </section>

    <section id="regionsGrid" class="cards-grid regions-grid">
      <?php if (count($all) === 0) : ?>
        <div class="empty-box">لا توجد وجهات بعد.</div>
      <?php endif; ?>
      <?php foreach ($all as $place) : ?>
        <?php render_place_card($place); ?>
      <?php endforeach; ?>
    </section>
  </main>

  <footer class="site-footer">
    <div class="container footer-inner">
      <p>© 2026 اكتشف السعودية - جامعة الملك سعود</p>
    </div>
  </footer>
</body>
</html>
