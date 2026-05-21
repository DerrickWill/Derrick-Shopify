document.addEventListener('DOMContentLoaded', function () {

  /* ---- Language switcher ---- */
  var langBtn   = /** @type {HTMLElement|null} */        (document.getElementById('annLangBtn'));
  var langDrop  = /** @type {HTMLElement|null} */        (document.getElementById('annLangDrop'));
  var langInput = /** @type {HTMLInputElement|null} */   (document.getElementById('ann-lang-input'));
  var langForm  = /** @type {HTMLFormElement|null} */    (document.getElementById('ann-lang-form'));

  if (langBtn && langDrop) {
    langBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = !langDrop.hidden;
      langDrop.hidden = isOpen;
      langBtn.setAttribute('aria-expanded', String(!isOpen));
    });

    langDrop.querySelectorAll('.ann-bar__lang-opt').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var code = btn.getAttribute('data-code');
        if (!code || !langInput || !langForm) return;
        langInput.value = code;
        if (langForm.requestSubmit) {
          langForm.requestSubmit();
        } else {
          langForm.submit();
        }
      });
    });

    document.addEventListener('click', function (e) {
      if (langDrop && !langDrop.hidden) {
        var container = langBtn.closest('.ann-bar__item--lang');
        if (container && !container.contains(/** @type {Node} */ (e.target))) {
          langDrop.hidden = true;
          langBtn.setAttribute('aria-expanded', 'false');
        }
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && langDrop && !langDrop.hidden) {
        langDrop.hidden = true;
        langBtn.setAttribute('aria-expanded', 'false');
        langBtn.focus();
      }
    });
  }

  /* ---- Close bar ---- */
  var closeBtn = document.getElementById('annBarClose');
  var annBar   = /** @type {HTMLElement|null} */ (document.getElementById('annBar'));

  if (closeBtn && annBar) {
    closeBtn.addEventListener('click', function () {
      annBar.hidden = true;
      try { sessionStorage.setItem('ann_bar_closed', '1'); } catch (e) {}
    });

    /* Restore dismissed state across page loads */
    try {
      if (sessionStorage.getItem('ann_bar_closed') === '1') {
        annBar.hidden = true;
      }
    } catch (e) {}
  }

});
