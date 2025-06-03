
document.querySelectorAll('.info-toggle-btn').forEach(function(btn) {
  btn.addEventListener('click', function(e) {
    e.preventDefault();
    const infoBox = btn.nextElementSibling;
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', !expanded);
    infoBox.classList.toggle('open');
  });
});