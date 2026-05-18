/**
 * Language Switcher
 * Handles open/close of the dropdown and submits the localization form
 * when the user picks a language.
 */
(function () {
  'use strict';

  const trigger = document.getElementById('languageSwitcherTrigger');
  const dropdown = document.getElementById('languageSwitcherDropdown');
  const codeInput = document.getElementById('language-code-input');
  const form = document.getElementById('language-switcher-form');

  if (!trigger || !dropdown || !codeInput || !form) return;

  function openDropdown() {
    dropdown.hidden = false;
    trigger.setAttribute('aria-expanded', 'true');
    dropdown.querySelector('.language-switcher__option')?.focus();
  }

  function closeDropdown() {
    dropdown.hidden = true;
    trigger.setAttribute('aria-expanded', 'false');
  }

  function toggleDropdown() {
    dropdown.hidden ? openDropdown() : closeDropdown();
  }

  trigger.addEventListener('click', toggleDropdown);

  trigger.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleDropdown();
    }
    if (e.key === 'Escape') closeDropdown();
  });

  dropdown.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeDropdown();
      trigger.focus();
    }
  });

  // Close when clicking outside
  document.addEventListener('click', function (e) {
    const container = document.getElementById('languageSwitcherContainer');
    if (container && !container.contains(e.target)) closeDropdown();
  });

  // Language selection
  dropdown.querySelectorAll('.language-switcher__option').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const code = btn.dataset.code;
      if (!code) return;
      codeInput.value = code;
      form.submit();
    });
  });
})();
