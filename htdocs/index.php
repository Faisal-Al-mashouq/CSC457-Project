<?php

declare(strict_types=1);

require_once __DIR__ . '/includes/places.php';
require_once __DIR__ . '/includes/card.php';

$all = places_all();
$featured = array_slice($all, 0, 3);
$count = count($all);

$pageTitle = 'اكتشف السعودية - الرئيسية';
$activeNav = 'home';
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

  <main>
    <section class="hero-section">
      <div class="container hero-grid">
        <div class="hero-content">
          <span class="eyebrow">اكتشف السعودية</span>
          <h1>تعرف على مناطق ومعالم المملكة بطريقة سهلة</h1>
          <p class="lead">
            موقع عربي يساعد الزائر على استكشاف بعض مدن ومناطق المملكة العربية السعودية،
            ومعرفة أهم المعالم والمعلومات الثقافية عنها بطريقة مختصرة وواضحة.
          </p>

          <div class="hero-actions">
            <a class="btn btn-primary" href="regions.php">استكشاف المناطق</a>
            <button id="randomPlaceBtn" class="btn btn-secondary" type="button" <?= $count === 0 ? 'disabled' : '' ?>>اقترح لي وجهة</button>
          </div>

          <div id="randomPlaceBox" class="suggestion-card" hidden></div>
        </div>

        <div class="hero-visual" aria-label="صورة من السعودية">
          <img class="main-visual" src="assets/riyadh.svg" alt="صورة لمدينة الرياض" />
        </div>
      </div>
    </section>

    <section class="container section split-section">
      <div>
        <span class="section-label">عن الموقع</span>
        <h2>نبذة عن الموقع</h2>
        <p>
          يقدم الموقع لمحة بسيطة عن مناطق سعودية مختلفة، مع صور مختصرة ووصف ثقافي وسياحي
          يساعد الزائر على اختيار وجهته والتعرف على أبرز المعالم.
        </p>
      </div>
      <div class="feature-list">
        <article>
          <h3>استكشاف سريع</h3>
          <p>تصفح الوجهات واختر ما يناسبك بسهولة.</p>
        </article>
        <article>
          <h3>معلومات واضحة</h3>
          <p>تعرف على وصف مختصر وأهم المعالم لكل وجهة.</p>
        </article>
        <article>
          <h3>بحث وتصفية</h3>
          <p>ابحث عن مدينة أو صفّ الوجهات حسب التصنيف.</p>
        </article>
      </div>
    </section>

    <section class="container section">
      <div class="section-heading">
        <div>
          <span class="section-label">وجهات مختارة</span>
          <h2>ابدأ بهذه المناطق</h2>
        </div>
        <a class="simple-link" href="regions.php">عرض كل المناطق ←</a>
      </div>
      <div id="featuredGrid" class="cards-grid small-grid">
        <?php foreach ($featured as $place) : ?>
          <?php render_place_card($place); ?>
        <?php endforeach; ?>
      </div>
      <?php if ($count === 0) : ?>
        <p class="hint">لا توجد وجهات بعد.</p>
      <?php endif; ?>
    </section>
  </main>

  <script type="application/json" id="places-json"><?= json_encode($all, JSON_UNESCAPED_UNICODE) ?></script>

  <footer class="site-footer">
    <div class="container footer-inner">
      <p>© 2026 اكتشف السعودية - جامعة الملك سعود</p>
    </div>
  </footer>
</body>
</html>
