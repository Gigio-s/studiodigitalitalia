/* ATELIER QUOTA — main.js
   Interazioni leggere: reveal allo scroll, accordion FAQ accessibili,
   slider prima/dopo (mouse+touch+tastiera), stato sticky CTA mobile.
   Nessuna libreria esterna. */
(function () {
  "use strict";

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Reveal ---- */
  function initReveal() {
    var els = document.querySelectorAll(".reveal");
    if (!els.length || reduce || !("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---- Accordion (FAQ + varie) ---- */
  function initAccordion() {
    document.querySelectorAll(".accordion").forEach(function (acc) {
      var triggers = acc.querySelectorAll(".accordion-trigger");
      triggers.forEach(function (btn) {
        var panel = document.getElementById(btn.getAttribute("aria-controls"));
        if (!panel) return;
        btn.addEventListener("click", function () {
          var open = btn.getAttribute("aria-expanded") === "true";
          btn.setAttribute("aria-expanded", String(!open));
          if (open) {
            panel.style.height = panel.scrollHeight + "px";
            requestAnimationFrame(function () { panel.style.height = "0px"; });
          } else {
            panel.style.height = panel.scrollHeight + "px";
            var done = function () { panel.style.height = "auto"; panel.removeEventListener("transitionend", done); };
            panel.addEventListener("transitionend", done);
          }
        });
      });
    });
  }

  /* ---- Before / After ---- */
  function initBeforeAfter() {
    document.querySelectorAll(".ba").forEach(function (ba) {
      var after = ba.querySelector(".ba-after");
      var handle = ba.querySelector(".ba-handle");
      var range = ba.querySelector('input[type="range"]');
      function set(v) {
        v = Math.max(0, Math.min(100, v));
        if (after) after.style.clipPath = "inset(0 0 0 " + v + "%)";
        if (handle) handle.style.left = v + "%";
        if (range) range.value = v;
        ba.setAttribute("aria-valuenow", Math.round(v));
      }
      if (range) {
        range.addEventListener("input", function () { set(parseFloat(range.value)); });
      }
      set(range ? parseFloat(range.value) : 50);
    });
  }

  /* ---- Sticky CTA (solo pagina brief) ---- */
  function initStickyCta() {
    var bar = document.querySelector(".sticky-cta");
    if (!bar) return;
    function upd() {
      var y = window.scrollY || 0;
      bar.classList.toggle("on", y > 500);
    }
    window.addEventListener("scroll", upd, { passive: true });
    upd();
  }

  function init() {
    initReveal();
    initAccordion();
    initBeforeAfter();
    initStickyCta();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
