"use strict";

const THEME_KEY = "discover_saudi_theme_real_photos_v1";

function escapeHTML(text) {
  return String(text || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function parsePlacesFromPage() {
  const el = document.getElementById("places-json");
  if (!el || !el.textContent.trim()) {
    return [];
  }
  try {
    const data = JSON.parse(el.textContent);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
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
  const parts = window.location.pathname.split("/").filter(Boolean);
  const currentPage =
    parts.length > 0 ? parts[parts.length - 1] : "index.php";
  document.querySelectorAll(".nav-links a").forEach((link) => {
    const href = link.getAttribute("href") || "";
    if (href === currentPage) {
      link.classList.add("active");
    }
  });
}

function setupRandomSuggestion() {
  const button = document.getElementById("randomPlaceBtn");
  const box = document.getElementById("randomPlaceBox");
  if (!button || !box) return;

  button.addEventListener("click", () => {
    const items = parsePlacesFromPage();
    if (!items.length) return;

    const item = items[Math.floor(Math.random() * items.length)];

    box.hidden = false;
    const shortText = item.short_text != null ? item.short_text : item.short;
    box.innerHTML = `
      <h3>اقتراح اليوم: ${escapeHTML(item.name)}</h3>
      <p>${escapeHTML(shortText)}</p>
      <a class="btn btn-primary" href="details.php?id=${encodeURIComponent(item.id)}">عرض التفاصيل</a>
    `;
  });
}

function setupRegionsFilters() {
  const grid = document.getElementById("regionsGrid");
  const searchInput = document.getElementById("searchInput");
  const categoryFilter = document.getElementById("categoryFilter");
  const resultCount = document.getElementById("resultCount");
  const resetButton = document.getElementById("resetFilters");

  if (!grid || !searchInput || !categoryFilter) return;

  const cards = Array.from(grid.querySelectorAll(".place-card"));

  function draw() {
    const searchValue = searchInput.value.trim().toLowerCase();
    const categoryValue = categoryFilter.value;

    let visible = 0;
    cards.forEach((card) => {
      const category = card.dataset.category || "";
      const blob = (card.dataset.search || "").toLowerCase();
      const matchesSearch = blob.includes(searchValue);
      const matchesCategory = categoryValue === "all" || category === categoryValue;
      const show = matchesSearch && matchesCategory;
      card.hidden = !show;
      if (show) visible += 1;
    });

    if (resultCount) {
      resultCount.textContent = `عدد النتائج: ${visible}`;
    }
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

function setupAdminFormValidation() {
  document.querySelectorAll(".admin-form").forEach((form) => {
    form.addEventListener("submit", (e) => {
      const empty = [...form.querySelectorAll("input,textarea,select")].filter(
        (el) => el.required && !String(el.value).trim()
      );
      if (empty.length) {
        e.preventDefault();
        alert("الرجاء إكمال جميع الحقول.");
        empty[0].focus();
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupTheme();
  setupActiveNav();
  setupRandomSuggestion();
  setupRegionsFilters();
  setupAdminFormValidation();
});
