/* Paola Torrieri — demo interactions (front-end simulato) */
document.addEventListener('DOMContentLoaded', function () {

  /* Mobile nav */
  var burger = document.querySelector('.hamburger');
  var links = document.querySelector('.nav-links');
  if (burger && links) burger.addEventListener('click', function () { links.classList.toggle('open'); });

  /* Accordion */
  document.querySelectorAll('.acc-q').forEach(function (q) {
    q.addEventListener('click', function () {
      var item = q.closest('.acc-item');
      var a = item.querySelector('.acc-a');
      var open = item.classList.contains('open');
      item.classList.toggle('open');
      a.style.maxHeight = open ? null : a.scrollHeight + 'px';
    });
  });

  /* Fade-in on scroll */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: .12 });
  document.querySelectorAll('.fade').forEach(function (el) { io.observe(el); });

  /* Generic modal helpers */
  window.openModal = function (id) { var m = document.getElementById(id); if (m) m.classList.add('show'); };
  window.closeModal = function (el) { var m = el.closest ? el.closest('.modal-overlay') : document.getElementById(el); if (m) m.classList.remove('show'); };
  document.querySelectorAll('.modal-overlay').forEach(function (ov) {
    ov.addEventListener('click', function (e) { if (e.target === ov) ov.classList.remove('show'); });
  });

  /* ---------- Booking (slot fissi) ---------- */
  var selectedSlot = null;
  document.querySelectorAll('.slot:not(:disabled)').forEach(function (s) {
    s.addEventListener('click', function () {
      document.querySelectorAll('.slot').forEach(function (x) { x.classList.remove('selected'); });
      s.classList.add('selected');
      selectedSlot = { day: s.dataset.day, time: s.textContent.trim() };
      var svc = document.getElementById('bk-service');
      var summ = document.getElementById('bk-summary');
      if (summ) summ.textContent = (svc ? svc.value + ' — ' : '') + selectedSlot.day + ' ore ' + selectedSlot.time;
      var btn = document.getElementById('bk-confirm');
      if (btn) btn.disabled = false;
    });
  });
  var bkBtn = document.getElementById('bk-confirm');
  if (bkBtn) bkBtn.addEventListener('click', function () {
    if (!selectedSlot) return;
    var svc = document.getElementById('bk-service');
    var t = document.getElementById('bk-modal-text');
    if (t) t.textContent = (svc ? svc.value : 'Consulenza') + ' — ' + selectedSlot.day + ', ore ' + selectedSlot.time;
    openModal('bk-modal');
  });

  /* ---------- Shop / access (simulato con localStorage disattivato: usa memoria) ---------- */
  window.buyProduct = function (name, price) {
    var t = document.getElementById('buy-modal-text');
    if (t) t.textContent = name + ' — € ' + price;
    window.__pendingBuy = name;
    openModal('buy-modal');
  };
  window.confirmBuy = function () {
    closeModal('buy-modal');
    // sblocca area riservata nella stessa sessione
    if (window.__pendingBuy) {
      var area = document.getElementById('reserved-area');
      var locked = document.getElementById('locked-msg');
      if (area && locked) { locked.style.display = 'none'; area.style.display = 'block'; }
      openModal('access-modal');
    }
  };

  /* Newsletter / contact fake submit */
  document.querySelectorAll('form[data-demo]').forEach(function (f) {
    f.addEventListener('submit', function (e) { e.preventDefault(); openModal('thanks-modal'); f.reset(); });
  });
});
