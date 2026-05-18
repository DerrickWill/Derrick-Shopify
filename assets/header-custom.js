document.addEventListener('DOMContentLoaded', function () {

  /* ============================================================
     Search bar – "All Categories" dropdown
     ============================================================ */
  var catBtn   = document.getElementById('searchCatBtn');
  var catDrop  = document.getElementById('searchCatList');
  var catLabel = document.getElementById('searchCatLabel');

  if (catBtn && catDrop) {
    catBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = !catDrop.hidden;
      catDrop.hidden = open;
      catBtn.setAttribute('aria-expanded', String(!open));
    });

    catDrop.querySelectorAll('.search-bar__cat-opt').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var val = btn.getAttribute('data-value');
        catLabel.textContent = btn.textContent.trim();
        catDrop.querySelectorAll('.search-bar__cat-opt').forEach(function (b) {
          b.classList.toggle('is-active', b === btn);
        });
        var hidden = document.getElementById('searchCategoryHidden');
        if (hidden) hidden.value = val;
        catDrop.hidden = true;
        catBtn.setAttribute('aria-expanded', 'false');
        document.getElementById('headerSearchInput').focus();
      });
    });

    document.addEventListener('click', function (e) {
      var wrap = document.getElementById('searchCatWrap');
      if (wrap && !wrap.contains(e.target)) {
        catDrop.hidden = true;
        catBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ============================================================
     Nav – "Shop by Categories" dropdown
     ============================================================ */
  var navCatBtn  = document.getElementById('navCatBtn');
  var navCatMenu = document.getElementById('navCatMenu');

  if (navCatBtn && navCatMenu) {
    navCatBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = !navCatMenu.hidden;
      navCatMenu.hidden = open;
      navCatBtn.setAttribute('aria-expanded', String(!open));
    });

    document.addEventListener('click', function (e) {
      var wrap = document.getElementById('navCatWrap');
      if (wrap && !wrap.contains(e.target)) {
        navCatMenu.hidden = true;
        navCatBtn.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !navCatMenu.hidden) {
        navCatMenu.hidden = true;
        navCatBtn.setAttribute('aria-expanded', 'false');
        navCatBtn.focus();
      }
    });
  }

  /* ============================================================
     Mobile drawer
     ============================================================ */
  var mobileToggle  = document.getElementById('mobileToggle');
  var mobileDrawer  = document.getElementById('mobileDrawer');
  var mobileOverlay = document.getElementById('mobileOverlay');
  var mobileClose   = document.getElementById('mobileClose');

  function openDrawer() {
    if (!mobileDrawer || !mobileOverlay) return;
    mobileDrawer.hidden  = false;
    mobileOverlay.hidden = false;
    document.body.style.overflow = 'hidden';
    if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'true');
  }

  function closeDrawer() {
    if (!mobileDrawer || !mobileOverlay) return;
    mobileDrawer.hidden  = true;
    mobileOverlay.hidden = true;
    document.body.style.overflow = '';
    if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
  }

  if (mobileToggle)  mobileToggle.addEventListener('click', openDrawer);
  if (mobileClose)   mobileClose.addEventListener('click', closeDrawer);
  if (mobileOverlay) mobileOverlay.addEventListener('click', closeDrawer);

  /* Accordion sub-menus in drawer */
  document.querySelectorAll('.mobile-drawer__expand').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var sub = btn.closest('.mobile-drawer__item').querySelector('.mobile-drawer__sub');
      if (!sub) return;
      sub.hidden = !sub.hidden;
      btn.textContent = sub.hidden ? '+' : '−';
    });
  });

  /* ============================================================
     Sticky header
     ============================================================ */
  var header = document.getElementById('siteHeader');
  if (header) {
    window.addEventListener('scroll', function () {
      header.classList.toggle('is-scrolled', window.scrollY > 60);
    }, { passive: true });
  }

});
