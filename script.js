/* ============================================================
   LIBRARIA — Catalog JavaScript
   ============================================================ */

/* ----------------------------------------------------------
   1. LIKE BUTTON TOGGLE
   Переключает сердечко между ♡ и ♥ и добавляет/убирает
   класс .liked, управляющий цветом через CSS.
   ---------------------------------------------------------- */
function toggleLike(btn) {
  btn.classList.toggle('liked');
  btn.textContent = btn.classList.contains('liked') ? '♥' : '♡';
}

/* ----------------------------------------------------------
   2. MOBILE FILTER SIDEBAR TOGGLE
   Показывает/скрывает сайдбар с фильтрами на мобильных.
   ---------------------------------------------------------- */
function toggleFilters() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('open');
}

/* ----------------------------------------------------------
   3. PRICE RANGE DUAL SLIDER
   Синхронизирует два input[type="range"] и два числовых поля.
   Жёлтая полоска (sliderFill) отражает выбранный диапазон.
   ---------------------------------------------------------- */
function updateSlider() {
  const minInput = document.getElementById('rangeMin');
  const maxInput = document.getElementById('rangeMax');
  const fill     = document.getElementById('sliderFill');
  const TOTAL    = 5000;

  let min = parseInt(minInput.value);
  let max = parseInt(maxInput.value);

  // Prevent min from overtaking max
  if (min > max - 100) {
    minInput.value = max - 100;
    min = max - 100;
  }

  // Update fill bar position
  fill.style.left  = (min / TOTAL * 100) + '%';
  fill.style.right = ((TOTAL - max) / TOTAL * 100) + '%';

  // Keep number inputs in sync
  document.getElementById('priceMin').value = min;
  document.getElementById('priceMax').value = max;
}

// Sync number inputs → sliders
document.getElementById('priceMin').addEventListener('input', function () {
  document.getElementById('rangeMin').value = this.value;
  updateSlider();
});

document.getElementById('priceMax').addEventListener('input', function () {
  document.getElementById('rangeMax').value = this.value;
  updateSlider();
});

/* ----------------------------------------------------------
   4. RATING RADIO — VISUAL HIGHLIGHT
   Добавляет класс .selected активной строке рейтинга,
   CSS раскрашивает её фоном.
   ---------------------------------------------------------- */
document.querySelectorAll('.rating-filter .rating-row').forEach(function (row) {
  row.querySelector('input').addEventListener('change', function () {
    document.querySelectorAll('.rating-row').forEach(function (r) {
      r.classList.remove('selected');
    });
    if (this.checked) {
      row.classList.add('selected');
    }
  });
});

/* ----------------------------------------------------------
   5. VIEW TOGGLE (сетка / список)
   Переключает активную кнопку. Реальное изменение вёрстки
   можно добавить позднее, добавив класс к .cards-grid.
   ---------------------------------------------------------- */
document.querySelectorAll('.view-btn').forEach(function (btn) {
  btn.addEventListener('click', function () {
    document.querySelectorAll('.view-btn').forEach(function (b) {
      b.classList.remove('active');
    });
    this.classList.add('active');
  });
});

/* ----------------------------------------------------------
   6. RESET ALL FILTERS
   Снимает все чекбоксы, сбрасывает рейтинг и ползунок цены.
   ---------------------------------------------------------- */
function resetFilters() {
  // Uncheck all checkboxes
  document.querySelectorAll('.check-item input[type="checkbox"]').forEach(function (cb) {
    cb.checked = false;
  });

  // Reset rating to "Любой"
  const firstRadio = document.querySelectorAll('input[name="rating"]')[0];
  firstRadio.checked = true;
  document.querySelectorAll('.rating-row').forEach(function (r) {
    r.classList.remove('selected');
  });
  document.querySelectorAll('.rating-row')[0].classList.add('selected');

  // Reset price slider to full range
  document.getElementById('rangeMin').value = 0;
  document.getElementById('rangeMax').value = 5000;
  updateSlider();
}

/* ----------------------------------------------------------
   7. ACTIVE FILTER TAGS — DISMISS ON CLICK
   Тег плавно исчезает и удаляется из DOM.
   ---------------------------------------------------------- */
document.querySelectorAll('.filter-tag').forEach(function (tag) {
  tag.addEventListener('click', function () {
    this.style.opacity   = '0';
    this.style.transform = 'scale(0.8)';
    this.style.transition = 'opacity 0.2s, transform 0.2s';
    setTimeout(function () { tag.remove(); }, 200);
  });
});

/* ----------------------------------------------------------
   8. PAGINATION — ACTIVE PAGE HIGHLIGHT
   Переключает активную страницу в пагинации.
   ---------------------------------------------------------- */
document.querySelectorAll('.page-btn').forEach(function (btn) {
  btn.addEventListener('click', function () {
    // Only numeric page buttons (not arrows ‹ ›)
    if (!isNaN(parseInt(this.textContent))) {
      document.querySelectorAll('.page-btn').forEach(function (b) {
        b.classList.remove('active');
      });
      this.classList.add('active');
    }
  });
});

/* ----------------------------------------------------------
   9. INITIALISATION
   Устанавливает начальное состояние ползунка при загрузке.
   ---------------------------------------------------------- */
(function init() {
  // Set initial price max to 2000 (not 5000)
  document.getElementById('rangeMax').value = 2000;
  updateSlider();
})();
