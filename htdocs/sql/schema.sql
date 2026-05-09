CREATE TABLE IF NOT EXISTS users (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    username VARCHAR(64) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM ('admin', 'user') NOT NULL DEFAULT 'admin',
    PRIMARY KEY (id),
    UNIQUE KEY uq_users_username (username)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE IF NOT EXISTS places (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    region VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    short_text VARCHAR(500) NOT NULL,
    description TEXT NOT NULL,
    image VARCHAR(512) NOT NULL,
    landmarks JSON NOT NULL,
    PRIMARY KEY (id),
    KEY ix_places_region (region(100)),
    KEY ix_places_category (category)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


INSERT INTO users (username, password_hash, role)
VALUES (
  'admin',
  '$2y$12$GEKOW/wjZUtXzyGiFTJbFetbP2w5dGuPKgVJ/4imhph90beo4JIWG',
  'admin'
)
ON DUPLICATE KEY UPDATE username = username;


INSERT INTO places (name, region, category, short_text, description, image, landmarks) VALUES
(
  'الرياض',
  'منطقة الرياض',
  'مدينة',
  'عاصمة المملكة ومركز مهم للتاريخ والاقتصاد.',
  'الرياض هي عاصمة المملكة العربية السعودية، وتجمع بين المباني الحديثة والأماكن التاريخية. من أشهر معالمها برج المملكة والمتحف الوطني وحي الطريف في الدرعية.',
  'assets/riyadh.svg',
  JSON_ARRAY('برج المملكة', 'المتحف الوطني', 'حي الطريف')
),
(
  'مكة المكرمة',
  'منطقة مكة المكرمة',
  'تاريخية',
  'مدينة مقدسة ومقصد المسلمين من جميع أنحاء العالم.',
  'مكة المكرمة لها مكانة دينية عظيمة، وفيها المسجد الحرام والكعبة المشرفة. يزورها ملايين المسلمين سنوياً لأداء الحج والعمرة.',
  'assets/makkah.svg',
  JSON_ARRAY('المسجد الحرام', 'الكعبة المشرفة', 'جبل النور')
),
(
  'جدة',
  'منطقة مكة المكرمة',
  'ساحلية',
  'مدينة ساحلية جميلة على البحر الأحمر.',
  'جدة مدينة ساحلية معروفة بالكورنيش والواجهة البحرية، كما أن منطقة جدة التاريخية تضم بيوتاً قديمة وأسواقاً شعبية جميلة.',
  'assets/jeddah.svg',
  JSON_ARRAY('كورنيش جدة', 'جدة التاريخية', 'نافورة الملك فهد')
),
(
  'العلا',
  'منطقة المدينة المنورة',
  'تاريخية',
  'منطقة تاريخية تشتهر بالصخور والمعالم الأثرية.',
  'العلا من أهم الوجهات التاريخية في المملكة، وتشتهر بمدائن صالح والتكوينات الصخرية والطبيعة الصحراوية المميزة.',
  'assets/alula.svg',
  JSON_ARRAY('مدائن صالح', 'جبل الفيل', 'البلدة القديمة')
),
(
  'أبها',
  'منطقة عسير',
  'جبلية',
  'مدينة جبلية تشتهر بالأجواء المعتدلة والطبيعة الخضراء.',
  'تقع أبها في جنوب المملكة، وتتميز بالمرتفعات الجبلية والطقس الجميل. تعد من الوجهات السياحية المناسبة لمحبي الطبيعة.',
  'assets/abha.svg',
  JSON_ARRAY('جبل السودة', 'قرية المفتاحة', 'منتزه عسير الوطني')
),
(
  'الطائف',
  'منطقة مكة المكرمة',
  'جبلية',
  'مدينة معروفة بالورد والجبال والأجواء اللطيفة.',
  'الطائف مدينة جبلية تشتهر بمزارع الورد، وتعد من المدن السياحية المهمة بسبب مناخها ومواقعها الطبيعية.',
  'assets/taif.svg',
  JSON_ARRAY('الهدا', 'الشفا', 'مزارع الورد')
);
