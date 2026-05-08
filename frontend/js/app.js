

const STORAGE_KEY = "discover_saudi_items_real_photos_v1";
const ADMIN_KEY = "discover_saudi_admin_real_photos_v1";
const MESSAGE_KEY = "discover_saudi_message_real_photos_v1";
const THEME_KEY = "discover_saudi_theme_real_photos_v1";

const defaultItems = [
  {
    id: "riyadh",
    name: "الرياض",
    region: "منطقة الرياض",
    category: "مدينة",
    image: "assets/riyadh.jpg",
    short: "عاصمة المملكة ومركز مهم للتاريخ والاقتصاد.",
    description:
      "الرياض هي عاصمة المملكة العربية السعودية، وتجمع بين المباني الحديثة والأماكن التاريخية. من أشهر معالمها برج المملكة والمتحف الوطني وحي الطريف في الدرعية.",
    landmarks: ["برج المملكة", "المتحف الوطني", "حي الطريف"]
  },
  {
    id: "makkah",
    name: "مكة المكرمة",
    region: "منطقة مكة المكرمة",
    category: "تاريخية",
    image: "assets/makkah.jpg",
    short: "مدينة مقدسة ومقصد المسلمين من جميع أنحاء العالم.",
    description:
      "مكة المكرمة لها مكانة دينية عظيمة، وفيها المسجد الحرام والكعبة المشرفة. يزورها ملايين المسلمين سنوياً لأداء الحج والعمرة.",
    landmarks: ["المسجد الحرام", "الكعبة المشرفة", "جبل النور"]
  },
  {
    id: "jeddah",
    name: "جدة",
    region: "منطقة مكة المكرمة",
    category: "ساحلية",
    image: "assets/jeddah.jpg",
    short: "مدينة ساحلية جميلة على البحر الأحمر.",
    description:
      "جدة مدينة ساحلية معروفة بالكورنيش والواجهة البحرية، كما أن منطقة جدة التاريخية تضم بيوتاً قديمة وأسواقاً شعبية جميلة.",
    landmarks: ["كورنيش جدة", "جدة التاريخية", "نافورة الملك فهد"]
  },
  {
    id: "alula",
    name: "العلا",
    region: "منطقة المدينة المنورة",
    category: "تاريخية",
    image: "assets/alula.jpg",
    short: "منطقة تاريخية تشتهر بالصخور والمعالم الأثرية.",
    description:
      "العلا من أهم الوجهات التاريخية في المملكة، وتشتهر بمدائن صالح والتكوينات الصخرية والطبيعة الصحراوية المميزة.",
    landmarks: ["مدائن صالح", "جبل الفيل", "البلدة القديمة"]
  },
  {
    id: "abha",
    name: "أبها",
    region: "منطقة عسير",
    category: "جبلية",
    image: "assets/abha.jpg",
    short: "مدينة جبلية تشتهر بالأجواء المعتدلة والطبيعة الخضراء.",
    description:
      "تقع أبها في جنوب المملكة، وتتميز بالمرتفعات الجبلية والطقس الجميل. تعد من الوجهات السياحية المناسبة لمحبي الطبيعة.",
    landmarks: ["جبل السودة", "قرية المفتاحة", "منتزه عسير الوطني"]
  },
  {
    id: "taif",
    name: "الطائف",
    region: "منطقة مكة المكرمة",
    category: "جبلية",
    image: "assets/taif.jpg",
    short: "مدينة معروفة بالورد والجبال والأجواء اللطيفة.",
    description:
      "الطائف مدينة جبلية تشتهر بمزارع الورد، وتعد من المدن السياحية المهمة بسبب مناخها ومواقعها الطبيعية.",
    landmarks: ["الهدا", "الشفا", "مزارع الورد"]
  }
];

function getItems() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultItems));
    return defaultItems;
  }

  try {
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : defaultItems;
  } catch (error) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultItems));
    return defaultItems;
  }
}

function saveItems(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function escapeHTML(text) {
  return String(text || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getQueryValue(name) {
  return new URLSearchParams(window.location.search).get(name);
}

function setupTheme() {
  const button = document.getElementById("themeToggle");
  const savedTheme = localStorage.getItem(THEME_KEY);

  if (savedTheme === "dark") {
    document.body.classList.add("dark");
  }

  if (!button) return;

  function updateText() {
    button.textContent = document.body.classList.contains("dark")
      ? "الوضع النهاري"
      : "الوضع الليلي";
  }

  updateText();

  button.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem(
      THEME_KEY,
      document.body.classList.contains("dark") ? "dark" : "light"
    );
    updateText();
  });
}

function setupActiveNav() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });
}

function protectAdminPages() {
  const protectedPage = document.body.dataset.admin === "protected";
  if (protectedPage && localStorage.getItem(ADMIN_KEY) !== "true") {
    window.location.href = "admin-login.html";
    return false;
  }
  return true;
}

function setupLogout() {
  document.querySelectorAll(".logout-btn").forEach((button) => {
    button.addEventListener("click", () => {
      localStorage.removeItem(ADMIN_KEY);
      window.location.href = "admin-login.html";
    });
  });
}

function cardTemplate(item) {
  return `
    <a class="place-card" href="details.html?id=${encodeURIComponent(item.id)}">
      <div class="card-image">
        <img src="${escapeHTML(item.image)}" alt="${escapeHTML(item.name)}" loading="lazy" />
        <span class="badge">${escapeHTML(item.category)}</span>
      </div>
      <div class="card-body">
        <h3>${escapeHTML(item.name)}</h3>
        <div class="card-meta">${escapeHTML(item.region)}</div>
        <p>${escapeHTML(item.short)}</p>
      </div>
    </a>
  `;
}

function renderHome() {
  const count = document.getElementById("placesCount");
  const featuredGrid = document.getElementById("featuredGrid");
  const items = getItems();

  if (count) count.textContent = items.length;
  if (featuredGrid) featuredGrid.innerHTML = items.slice(0, 3).map(cardTemplate).join("");
}

function setupRandomSuggestion() {
  const button = document.getElementById("randomPlaceBtn");
  const box = document.getElementById("randomPlaceBox");
  if (!button || !box) return;

  button.addEventListener("click", () => {
    const items = getItems();
    const item = items[Math.floor(Math.random() * items.length)];

    box.hidden = false;
    box.innerHTML = `
      <h3>اقتراح اليوم: ${escapeHTML(item.name)}</h3>
      <p>${escapeHTML(item.short)}</p>
      <a class="btn btn-primary" href="details.html?id=${encodeURIComponent(item.id)}">عرض التفاصيل</a>
    `;
  });
}

function renderRegions() {
  const grid = document.getElementById("regionsGrid");
  const searchInput = document.getElementById("searchInput");
  const categoryFilter = document.getElementById("categoryFilter");
  const resultCount = document.getElementById("resultCount");
  const resetButton = document.getElementById("resetFilters");

  if (!grid || !searchInput || !categoryFilter) return;

  function draw() {
    const searchValue = searchInput.value.trim().toLowerCase();
    const categoryValue = categoryFilter.value;

    const filtered = getItems().filter((item) => {
      const text = `${item.name} ${item.region} ${item.short}`.toLowerCase();
      const matchesSearch = text.includes(searchValue);
      const matchesCategory = categoryValue === "all" || item.category === categoryValue;
      return matchesSearch && matchesCategory;
    });

    if (resultCount) {
      resultCount.textContent = `عدد النتائج: ${filtered.length}`;
    }

    grid.innerHTML = filtered.length
      ? filtered.map(cardTemplate).join("")
      : `<div class="empty-box">لا توجد نتائج مطابقة. جرّب كلمة أخرى أو أعد ضبط الفلتر.</div>`;
  }

  searchInput.addEventListener("input", draw);
  categoryFilter.addEventListener("change", draw);

  if (resetButton) {
    resetButton.addEventListener("click", () => {
      searchInput.value = "";
      categoryFilter.value = "all";
      draw();
      searchInput.focus();
    });
  }

  draw();
}

function renderDetails() {
  const detailsContent = document.getElementById("detailsContent");
  const relatedGrid = document.getElementById("relatedGrid");
  if (!detailsContent) return;

  const items = getItems();
  const id = getQueryValue("id") || items[0]?.id;
  const item = items.find((place) => place.id === id);

  if (!item) {
    detailsContent.innerHTML = `
      <div class="details-content">
        <span class="section-label">تنبيه</span>
        <h1>لم يتم العثور على المحتوى</h1>
        <p>الرجاء الرجوع إلى معرض المناطق واختيار بطاقة أخرى.</p>
        <a class="btn btn-primary" href="regions.html">العودة للمعرض</a>
      </div>
    `;
    return;
  }

  const landmarks = Array.isArray(item.landmarks) ? item.landmarks : [];

  detailsContent.innerHTML = `
    <article class="details-card-layout">
      <img class="details-image" src="${escapeHTML(item.image)}" alt="${escapeHTML(item.name)}" />
      <div class="details-content">
        <span class="section-label">صفحة التفاصيل</span>
        <h1>${escapeHTML(item.name)}</h1>
        <div class="info-line">
          <span>${escapeHTML(item.region)}</span>
          <span>${escapeHTML(item.category)}</span>
        </div>
        <p>${escapeHTML(item.description)}</p>

        <h2>أهم المعالم</h2>
        <ul class="landmark-list">
          ${landmarks.map((landmark) => `<li>${escapeHTML(landmark)}</li>`).join("")}
        </ul>

        <a class="btn btn-primary" href="regions.html">العودة إلى المناطق</a>
      </div>
    </article>
  `;

  if (relatedGrid) {
    relatedGrid.innerHTML = items
      .filter((place) => place.id !== item.id)
      .slice(0, 3)
      .map(cardTemplate)
      .join("");
  }
}

function setupLogin() {
  const form = document.getElementById("loginForm");
  if (!form) return;

  const errorBox = document.getElementById("loginError");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !password) {
      errorBox.textContent = "الرجاء إدخال اسم المستخدم وكلمة المرور.";
      return;
    }

    if (username === "admin" && password === "12345") {
      localStorage.setItem(ADMIN_KEY, "true");
      localStorage.setItem(MESSAGE_KEY, "تم تسجيل الدخول بنجاح.");
      window.location.href = "admin-dashboard.html";
    } else {
      errorBox.textContent = "بيانات الدخول غير صحيحة.";
    }
  });
}

function showAdminMessage(message) {
  const messageBox = document.getElementById("adminMessage");
  if (!messageBox || !message) return;
  messageBox.textContent = message;
  messageBox.classList.add("show");
}

function renderAdminDashboard() {
  const tableBody = document.getElementById("adminTableBody");
  if (!tableBody) return;

  const savedMessage = localStorage.getItem(MESSAGE_KEY);
  if (savedMessage) {
    showAdminMessage(savedMessage);
    localStorage.removeItem(MESSAGE_KEY);
  }

  function drawTable() {
    const items = getItems();

    tableBody.innerHTML = items.length
      ? items
          .map(
            (item) => `
              <tr>
                <td>${escapeHTML(item.name)}</td>
                <td>${escapeHTML(item.region)}</td>
                <td><span class="badge">${escapeHTML(item.category)}</span></td>
                <td>
                  <button class="action-btn edit-btn" data-edit="${escapeHTML(item.id)}">تعديل</button>
                  <button class="action-btn delete-btn" data-delete="${escapeHTML(item.id)}">حذف</button>
                </td>
              </tr>
            `
          )
          .join("")
      : `<tr><td colspan="4">لا توجد سجلات حالياً.</td></tr>`;
  }

  tableBody.addEventListener("click", (event) => {
    const editId = event.target.dataset.edit;
    const deleteId = event.target.dataset.delete;

    if (editId) {
      window.location.href = `admin-edit.html?id=${encodeURIComponent(editId)}`;
    }

    if (deleteId) {
      const answer = confirm("هل أنت متأكد من حذف هذا السجل؟");
      if (answer) {
        const updatedItems = getItems().filter((item) => item.id !== deleteId);
        saveItems(updatedItems);
        showAdminMessage("تم حذف السجل بنجاح.");
        drawTable();
      }
    }
  });

  drawTable();
}

function collectFormData() {
  const landmarksText = document.getElementById("landmarks").value.trim();

  return {
    name: document.getElementById("title").value.trim(),
    region: document.getElementById("region").value.trim(),
    category: document.getElementById("category").value.trim(),
    short: document.getElementById("shortText").value.trim(),
    description: document.getElementById("description").value.trim(),
    image: document.getElementById("image").value.trim() || "assets/generic.svg",
    landmarks: landmarksText
      .split("،")
      .map((item) => item.trim())
      .filter(Boolean)
  };
}

function validateContentForm(data) {
  return Boolean(
    data.name &&
      data.region &&
      data.category &&
      data.short &&
      data.description &&
      data.landmarks.length > 0
  );
}

function setupAddForm() {
  const form = document.getElementById("addForm");
  if (!form) return;

  const errorBox = document.getElementById("formError");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = collectFormData();

    if (!validateContentForm(data)) {
      errorBox.textContent = "الرجاء تعبئة جميع الحقول المطلوبة وكتابة معلم واحد على الأقل.";
      return;
    }

    const items = getItems();
    items.push({ id: "item-" + Date.now(), ...data });
    saveItems(items);

    localStorage.setItem(MESSAGE_KEY, "تمت إضافة السجل بنجاح.");
    window.location.href = "admin-dashboard.html";
  });
}

function setupEditForm() {
  const form = document.getElementById("editForm");
  if (!form) return;

  const errorBox = document.getElementById("formError");
  const id = getQueryValue("id");
  const item = getItems().find((place) => place.id === id);

  if (!item) {
    form.innerHTML = "<p class='error-message'>لم يتم العثور على السجل المطلوب.</p>";
    return;
  }

  document.getElementById("title").value = item.name;
  document.getElementById("region").value = item.region;
  document.getElementById("category").value = item.category;
  document.getElementById("shortText").value = item.short;
  document.getElementById("description").value = item.description;
  document.getElementById("landmarks").value = item.landmarks.join("، ");
  document.getElementById("image").value = item.image;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = collectFormData();

    if (!validateContentForm(data)) {
      errorBox.textContent = "الرجاء تعبئة جميع الحقول المطلوبة وكتابة معلم واحد على الأقل.";
      return;
    }

    const updatedItems = getItems().map((place) =>
      place.id === id ? { id, ...data } : place
    );

    saveItems(updatedItems);
    localStorage.setItem(MESSAGE_KEY, "تم تحديث السجل بنجاح.");
    window.location.href = "admin-dashboard.html";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupTheme();
  setupActiveNav();
  setupLogout();

  if (!protectAdminPages()) return;

  getItems();
  renderHome();
  setupRandomSuggestion();
  renderRegions();
  renderDetails();
  setupLogin();
  renderAdminDashboard();
  setupAddForm();
  setupEditForm();
});
