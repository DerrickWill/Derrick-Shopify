/**
 * Footer Custom
 * Handles copyright year replacement ({year} token).
 * Newsletter form is handled natively by Shopify's {% form 'customer' %}.
 */
document.addEventListener('DOMContentLoaded', function () {

  /* Replace {year} token in copyright text */
  var copyright = document.querySelector('.footer-copyright');
  if (copyright) {
    copyright.innerHTML = copyright.innerHTML.replace(/\{year\}/g, new Date().getFullYear());
  }

});
