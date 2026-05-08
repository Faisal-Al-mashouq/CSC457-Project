const STORAGE_KEY = "discoverSaudiArabiaItems";
const AUTH_KEY = "discoverSaudiArabiaAdmin";
const THEME_KEY = "discoverSaudiArabiaTheme";
const FLASH_KEY = "discoverSaudiArabiaFlash";

const seedData = [
  {
    id: "riyadh",
    name: "الرياض",
    category: "ثقافة",
    city: "وسط المملكة",
    season: "الشتاء والربيع",
    excerpt: "عاصمة حديثة تجمع بين التاريخ والأسواق والمراكز الثقافية.",
    intro: "الرياض مدينة محورية في المملكة، تجمع بين الطابع الإداري الحديث والامتداد التاريخي لمنطقة نجد.",
    history: "تضم الرياض مواقع تاريخية مثل الدرعية وقصر المصمك، وهي أماكن ارتبطت ببدايات الدولة السعودية وتطورها.",
    culture: "تتميز بثقافة الضيافة النجدية، والأسواق الشعبية، والمتاحف، والفعاليات التي تعرض الفنون السعودية المعاصرة.",
    landmarks: ["الدرعية التاريخية", "قصر المصمك", "مركز الملك عبد الله المالي"],
    image: "assets/riyadh.svg",
    gallery: ["assets/riyadh.svg", "assets/alula.svg", "assets/taif.svg"]
  },
  {
    id: "makkah",
    name: "مكة المكرمة",
    category: "تاريخ",
    city: "غرب المملكة",
    season: "طوال العام",
    excerpt: "مدينة ذات مكانة دينية وتاريخية عظيمة ومركز للزوار من أنحاء العالم.",
    intro: "تعد مكة المكرمة من أهم مدن المملكة، وهي مقصد روحي رئيسي للمسلمين.",
    history: "تحمل المدينة إرثاً تاريخياً ممتداً، وترتبط بمسارات الحج والعمرة وبعدد من المواقع الإسلامية المهمة.",
    culture: "تتميز بتنوع ثقافي كبير نتيجة استقبالها الزوار من مختلف البلدان، إضافة إلى أسواقها وخدماتها المرتبطة بالحج والعمرة.",
    landmarks: ["المسجد الحرام", "جبل النور", "متحف مكة"],
    image: "assets/makkah.svg",
    gallery: ["assets/makkah.svg", "assets/jeddah.svg", "assets/taif.svg"]
  },
  {
    id: "alula",
    name: "العلا",
    category: "تاريخ",
    city: "شمال غرب المملكة",
    season: "الشتاء",
    excerpt: "متحف مفتوح بين الجبال والنقوش والواجهات الأثرية.",
    intro: "العلا وجهة تاريخية وطبيعية تتميز بتكوينات صخرية فريدة ومواقع أثرية عريقة.",
    history: "تشتهر العلا بمدائن صالح وبالنقوش القديمة التي تعكس مرور حضارات متعددة في المنطقة.",
    culture: "تقدم العلا تجربة تجمع بين الفنون الحديثة، التراث المحلي، والحكايات المرتبطة بطريق التجارة القديم.",
    landmarks: ["الحِجر", "جبل الفيل", "البلدة القديمة"],
    image: "assets/alula.svg",
    gallery: ["assets/alula.svg", "assets/tabuk.svg", "assets/alahsa.svg"]
  },
  {
    id: "jeddah",
    name: "جدة",
    category: "ساحل",
    city: "غرب المملكة",
    season: "الشتاء والربيع",
    excerpt: "بوابة البحر الأحمر ومدينة تجمع الساحل بالتراث العمراني.",
    intro: "جدة مدينة ساحلية نابضة بالحياة، وتعد بوابة تاريخية للحجاج والتجار عبر البحر الأحمر.",
    history: "تشتهر جدة التاريخية ببيوتها الحجازية ورواشينها وأسواقها القديمة.",
    culture: "تتميز بتنوع اجتماعي ومأكولات بحرية وفنون حضرية ومسارات مشي على الواجهة البحرية.",
    landmarks: ["جدة التاريخية", "كورنيش جدة", "بيت نصيف"],
    image: "assets/jeddah.svg",
    gallery: ["assets/jeddah.svg", "assets/makkah.svg", "assets/riyadh.svg"]
  },
  {
    id: "abha",
    name: "أبها",
    category: "طبيعة",
    city: "جنوب المملكة",
    season: "الصيف والربيع",
    excerpt: "مرتفعات خضراء وأجواء معتدلة وثقافة عسيرية غنية.",
    intro: "أبها وجهة جبلية في منطقة عسير، تشتهر بمناظرها الطبيعية وأجوائها اللطيفة.",
    history: "تحتفظ المنطقة بتراث معماري مميز وقرى تاريخية تعكس أساليب البناء الجبلية.",
    culture: "تظهر الثقافة المحلية في الألوان العسيرية، الفنون الشعبية، والأسواق التقليدية.",
    landmarks: ["السودة", "قرية رجال ألمع", "منتزه عسير الوطني"],
    image: "assets/abha.svg",
    gallery: ["assets/abha.svg", "assets/taif.svg", "assets/alahsa.svg"]
  },
  {
    id: "taif",
    name: "الطائف",
    category: "طبيعة",
    city: "غرب المملكة",
    season: "الربيع والصيف",
    excerpt: "مدينة الورود والمرتفعات والمنتجات الزراعية الموسمية.",
    intro: "الطائف مدينة جبلية معروفة بمزارع الورد ومناخها المعتدل مقارنة بالمناطق الساحلية القريبة.",
    history: "ارتبطت الطائف منذ القدم بالطرق التجارية والزراعية وبالقصور والأسواق القديمة.",
    culture: "تشتهر بثقافة الورد الطائفي، الفواكه الموسمية، والأسواق التي تعرض المنتجات المحلية.",
    landmarks: ["الهدا", "سوق عكاظ", "مزارع الورد"],
    image: "assets/taif.svg",
    gallery: ["assets/taif.svg", "assets/abha.svg", "assets/makkah.svg"]
  },
  {
    id: "tabuk",
    name: "تبوك",
    category: "طبيعة",
    city: "شمال غرب المملكة",
    season: "الشتاء والربيع",
    excerpt: "بوابة الشمال بمناظر صحراوية وبحرية وجبلية متنوعة.",
    intro: "تبوك تجمع بين الصحراء والجبال والسواحل القريبة، وتتميز بتنوع جغرافي واضح.",
    history: "تضم المنطقة آثاراً وقلاعاً ومسارات تاريخية مرتبطة بطرق التجارة والحج القديمة.",
    culture: "تعكس تبوك ثقافة شمالية مميزة في الضيافة والمأكولات والارتباط بالبيئة الصحراوية.",
    landmarks: ["قلعة تبوك", "وادي الديسة", "سواحل نيوم"],
    image: "assets/tabuk.svg",
    gallery: ["assets/tabuk.svg", "assets/alula.svg", "assets/jeddah.svg"]
  },
  {
    id: "alahsa",
    name: "الأحساء",
    category: "ثقافة",
    city: "شرق المملكة",
    season: "الشتاء",
    excerpt: "واحة تاريخية تشتهر بالنخيل والحرف والأسواق الشعبية.",
    intro: "الأحساء واحة واسعة في شرق المملكة، معروفة بالمزارع والعيون والتراث الشعبي.",
    history: "احتضنت الأحساء حضارات وأسواقاً مهمة، وتظهر آثارها في القصور والمواقع القديمة.",
    culture: "تتميز بالحرف اليدوية، التمور، القهوة، والأسواق التقليدية التي تعكس هوية المنطقة.",
    landmarks: ["جبل القارة", "سوق القيصرية", "قصر إبراهيم"],
    image: "assets/alahsa.svg",
    gallery: ["assets/alahsa.svg", "assets/riyadh.svg", "assets/abha.svg"]
  }
];

document.addEventListener("DOMContentLoaded", () => {
  initStorage();
  initTheme();
  initMenu();
  setupLogout();
  runPage();
});

function initStorage() {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedData));
  }
}

function getItems() {
  try {
    const items = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    return Array.isArray(items) ? items : [];
  } catch {
    return [];
  }
}

function saveItems(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function initTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === "dark") document.body.classList.add("dark");

  document.querySelectorAll(".theme-toggle").forEach((button) => {
    button.textContent = document.body.classList.contains("dark") ? "الوضع النهاري" : "الوضع الليلي";
    button.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      const isDark = document.body.classList.contains("dark");
      localStorage.setItem(THEME_KEY, isDark ? "dark" : "light");
      document.querySelectorAll(".theme-toggle").forEach((btn) => {
        btn.textContent = isDark ? "الوضع النهاري" : "الوضع الليلي";
      });
    });
  });
}

function initMenu() {
  const toggle = document.querySelector(".menu-toggle");
  const links = document.querySelector(".nav-links");
  if (!toggle || !links) return;
  toggle.addEventListener("click", () => {
    links.classList.toggle("open");
  });
}

function runPage() {
  const page = document.body.dataset.page;

  if (["dashboard", "add", "edit"].includes(page)) {
    requireAdmin();
  }

  if (page === "home") renderHome();
  if (page === "regions") renderRegions();
  if (page === "details") renderDetails();
  if (page === "login") handleLogin();
  if (page === "dashboard") renderDashboard();
  if (page === "add") handleContentForm("add");
  if (page === "edit") handleContentForm("edit");
}

function renderHome() {
  const target = document.getElementById("homeSpotlight");
  if (!target) return;

  const items = getItems().slice(0, 3);
  target.innerHTML = items.map((item) => cardTemplate(item)).join("");
}

function renderRegions() {
  const grid = document.getElementById("regionsGrid");
  const empty = document.getElementById("emptyState");
  const count = document.getElementById("regionCount");
  const search = document.getElementById("searchInput");
  const filterButtons = document.querySelectorAll(".filter-pill");
  let activeFilter = "all";

  const draw = () => {
    const query = (search.value || "").trim().toLowerCase();
    const items = getItems().filter((item) => {
      const matchesFilter = activeFilter === "all" || item.category === activeFilter;
      const text = `${item.name} ${item.category} ${item.city} ${item.excerpt}`.toLowerCase();
      return matchesFilter && text.includes(query);
    });

    grid.innerHTML = items.map((item) => cardTemplate(item)).join("");
    count.textContent = items.length;
    empty.classList.toggle("hidden", items.length !== 0);
  };

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      activeFilter = button.dataset.filter;
      draw();
    });
  });

  search.addEventListener("input", draw);
  draw();
}

function cardTemplate(item) {
  return `
    <article class="region-card">
      <img src="${escapeAttr(item.image)}" alt="${escapeAttr(item.name)}">
      <div class="region-card-content">
        <div class="chip-row">
          <span class="chip">${escapeHTML(item.category)}</span>
          <span class="chip">${escapeHTML(item.city)}</span>
        </div>
        <h3>${escapeHTML(item.name)}</h3>
        <p>${escapeHTML(item.excerpt)}</p>
        <a class="btn primary" href="details.html?id=${encodeURIComponent(item.id)}">عرض التفاصيل</a>
      </div>
    </article>
  `;
}

function renderDetails() {
  const items = getItems();
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id") || (items[0] && items[0].id);
  const item = items.find((entry) => entry.id === id) || items[0];

  if (!item) {
    document.getElementById("detailsTitle").textContent = "لا توجد بيانات";
    return;
  }

  setText("detailsTitle", item.name);
  setText("detailsExcerpt", item.excerpt);
  setText("detailsIntro", item.intro);
  setText("detailsHistory", item.history);
  setText("detailsCulture", item.culture);

  const image = document.getElementById("detailsImage");
  if (image) {
    image.src = item.image;
    image.alt = item.name;
  }

  const meta = document.getElementById("detailsMeta");
  if (meta) {
    meta.innerHTML = `
      <span class="chip">التصنيف: ${escapeHTML(item.category)}</span>
      <span class="chip">الموقع: ${escapeHTML(item.city)}</span>
      <span class="chip">الموسم: ${escapeHTML(item.season)}</span>
    `;
  }

  const landmarks = document.getElementById("landmarksList");
  if (landmarks) {
    landmarks.innerHTML = item.landmarks.map((landmark) => `<li>${escapeHTML(landmark)}</li>`).join("");
  }

  const gallery = document.getElementById("detailsGallery");
  if (gallery) {
    const images = item.gallery && item.gallery.length ? item.gallery : [item.image, item.image, item.image];
    gallery.innerHTML = images.map((src) => `<img src="${escapeAttr(src)}" alt="${escapeAttr(item.name)}">`).join("");
  }
}

function handleLogin() {
  const form = document.getElementById("loginForm");
  const message = document.getElementById("loginMessage");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    clearFieldErrors(form);
    message.classList.add("hidden");

    const username = form.username.value.trim();
    const password = form.password.value.trim();
    let valid = true;

    if (!username) {
      showFieldError(form.username, "اسم المستخدم مطلوب.");
      valid = false;
    }

    if (!password) {
      showFieldError(form.password, "كلمة المرور مطلوبة.");
      valid = false;
    }

    if (!valid) return;

    if (username === "admin" && password === "12345") {
      localStorage.setItem(AUTH_KEY, "true");
      setFlash("تم تسجيل الدخول بنجاح.");
      window.location.href = "admin-dashboard.html";
    } else {
      message.textContent = "بيانات الدخول غير صحيحة. جرّب admin / 12345.";
      message.classList.remove("hidden");
    }
  });
}

function requireAdmin() {
  if (localStorage.getItem(AUTH_KEY) !== "true") {
    window.location.href = "admin-login.html";
  }
}

function setupLogout() {
  document.querySelectorAll("[data-logout]").forEach((button) => {
    button.addEventListener("click", () => {
      localStorage.removeItem(AUTH_KEY);
      window.location.href = "admin-login.html";
    });
  });
}

function renderDashboard() {
  showFlash();
  const items = getItems();
  const body = document.getElementById("adminTableBody");
  const count = document.getElementById("adminCount");
  const stats = document.getElementById("dashboardStats");

  if (count) count.textContent = `${items.length} سجل`;

  if (stats) {
    const categories = ["تاريخ", "طبيعة", "ثقافة", "ساحل"];
    stats.innerHTML = categories.map((category) => {
      const total = items.filter((item) => item.category === category).length;
      return `<div class="stat-card"><strong>${total}</strong><span>${category}</span></div>`;
    }).join("");
  }

  if (!body) return;

  body.innerHTML = items.map((item, index) => `
    <tr>
      <td>${index + 1}</td>
      <td><strong>${escapeHTML(item.name)}</strong></td>
      <td>${escapeHTML(item.category)}</td>
      <td>${escapeHTML(item.city)}</td>
      <td>${escapeHTML(item.excerpt)}</td>
      <td>
        <div class="row-actions">
          <a class="btn ghost small" href="admin-edit.html?id=${encodeURIComponent(item.id)}">تحديث</a>
          <button class="btn danger small" type="button" data-delete="${escapeAttr(item.id)}">حذف</button>
        </div>
      </td>
    </tr>
  `).join("");

  document.querySelectorAll("[data-delete]").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.delete;
      const item = getItems().find((entry) => entry.id === id);
      if (!item) return;

      const accepted = confirm(`هل أنت متأكد من حذف "${item.name}"؟`);
      if (!accepted) return;

      const updated = getItems().filter((entry) => entry.id !== id);
      saveItems(updated);
      setFlash("تم حذف السجل بنجاح.");
      renderDashboard();
    });
  });
}

function handleContentForm(mode) {
  const form = document.getElementById("contentForm");
  if (!form) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (mode === "edit") {
    const item = getItems().find((entry) => entry.id === id);
    if (!item) {
      document.getElementById("editMissing")?.classList.remove("hidden");
      form.classList.add("hidden");
      return;
    }
    fillForm(form, item);
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    clearFieldErrors(form);

    const data = getFormData(form);
    if (!validateContentForm(form, data)) return;

    const items = getItems();

    if (mode === "add") {
      data.id = createId(data.name);
      data.gallery = [data.image, "assets/hero.svg", data.image];
      items.unshift(data);
      saveItems(items);
      setFlash("تمت إضافة السجل بنجاح.");
    } else {
      const index = items.findIndex((entry) => entry.id === id);
      if (index === -1) return;
      data.id = id;
      data.gallery = items[index].gallery && items[index].gallery.length ? items[index].gallery : [data.image, "assets/hero.svg", data.image];
      items[index] = data;
      saveItems(items);
      setFlash("تم تحديث السجل بنجاح.");
    }

    window.location.href = "admin-dashboard.html";
  });
}

function getFormData(form) {
  return {
    name: field(form, "name").value.trim(),
    category: field(form, "category").value.trim(),
    city: field(form, "city").value.trim(),
    season: field(form, "season").value.trim(),
    excerpt: field(form, "excerpt").value.trim(),
    intro: field(form, "intro").value.trim(),
    history: field(form, "history").value.trim(),
    culture: field(form, "culture").value.trim(),
    landmarks: field(form, "landmarks").value.split("\n").map((item) => item.trim()).filter(Boolean),
    image: field(form, "image").value.trim()
  };
}

function validateContentForm(form, data) {
  let valid = true;

  const requiredFields = ["name", "category", "city", "season", "excerpt", "intro", "history", "culture", "landmarks", "image"];

  requiredFields.forEach((fieldName) => {
    const value = fieldName === "landmarks" ? data.landmarks.join("") : data[fieldName];
    if (!value) {
      showFieldError(field(form, fieldName), "هذا الحقل مطلوب.");
      valid = false;
    }
  });

  if (data.excerpt.length > 120) {
    showFieldError(field(form, "excerpt"), "الوصف المختصر يجب ألا يتجاوز 120 حرفاً.");
    valid = false;
  }

  if (data.landmarks.length < 2) {
    showFieldError(field(form, "landmarks"), "أدخل معلمين على الأقل، كل معلم في سطر مستقل.");
    valid = false;
  }

  return valid;
}

function fillForm(form, item) {
  field(form, "name").value = item.name || "";
  field(form, "category").value = item.category || "";
  field(form, "city").value = item.city || "";
  field(form, "season").value = item.season || "";
  field(form, "excerpt").value = item.excerpt || "";
  field(form, "intro").value = item.intro || "";
  field(form, "history").value = item.history || "";
  field(form, "culture").value = item.culture || "";
  field(form, "landmarks").value = (item.landmarks || []).join("\n");
  field(form, "image").value = item.image || "assets/riyadh.svg";
  const idField = field(form, "id");
  if (idField) idField.value = item.id;
}

function field(form, name) {
  return form.elements[name];
}

function showFieldError(input, message) {
  const label = input.closest("label");
  const error = label ? label.querySelector(".field-error") : null;
  if (error) error.textContent = message;
  input.setAttribute("aria-invalid", "true");
}

function clearFieldErrors(form) {
  form.querySelectorAll(".field-error").forEach((error) => error.textContent = "");
  form.querySelectorAll("[aria-invalid]").forEach((input) => input.removeAttribute("aria-invalid"));
}

function setFlash(message) {
  localStorage.setItem(FLASH_KEY, message);
}

function showFlash() {
  const target = document.getElementById("flashMessage");
  if (!target) return;

  const message = localStorage.getItem(FLASH_KEY);
  if (!message) return;

  target.textContent = message;
  target.classList.remove("hidden");
  localStorage.removeItem(FLASH_KEY);
}

function setText(id, value) {
  const element = document.getElementById(id);
  if (element) element.textContent = value || "";
}

function createId(name) {
  const clean = name
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\u0600-\u06FFa-zA-Z0-9-]/g, "")
    .slice(0, 28);
  return `${clean || "item"}-${Date.now()}`;
}

function escapeHTML(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttr(value) {
  return escapeHTML(value);
}
