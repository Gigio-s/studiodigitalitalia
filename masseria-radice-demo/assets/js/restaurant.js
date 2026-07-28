/* =====================================================================
   restaurant.js — rende i menu stagionali e la disponibilità simulata
   del form prenota-tavolo. Allergeni sempre da confermare.
   ===================================================================== */
(function () {
  "use strict";
  var M = (window.MR && window.MR.menu) || {};
  var ORIGIN = { farm: "Prodotto in masseria", local: "Produttore locale", ita: "Provenienza italiana", season: "Solo di stagione" };

  function dishHTML(d) {
    var tags = d.origin.map(function (o) {
      var cls = { farm: "dot--farm", local: "dot--local", ita: "dot--ita", season: "dot--season" }[o];
      return '<span><span class="dot ' + cls + '"></span>' + ORIGIN[o] + "</span>";
    }).join("");
    var diet = d.diet === "vegano" ? '<span class="chip chip--olive">Vegano</span>' :
      d.diet === "vegetariano" ? '<span class="chip chip--olive">Vegetariano</span>' :
      d.diet === "pesce" ? '<span class="chip">Pesce</span>' : '<span class="chip">Carne</span>';
    return '<article style="padding:1.1rem 0;border-bottom:1px solid var(--line)">' +
      '<div style="display:flex;justify-content:space-between;gap:1rem;align-items:baseline">' +
        '<h4 style="margin:0;font-size:1.3rem">' + d.name + '</h4>' +
        '<span class="card__price">€' + d.price + '</span></div>' +
      '<p class="small muted" style="margin:.3rem 0">' + d.desc + '</p>' +
      '<div class="legend" style="margin:.4rem 0">' + tags + ' ' + diet + '</div>' +
      '<p class="small muted" style="margin:0"><b>Ingredienti:</b> ' + d.ingredients + ' · <b>Allergeni (da confermare):</b> ' + d.allergens + '</p>' +
    '</article>';
  }

  function renderMenus() {
    var mount = document.querySelector("[data-menus]");
    if (!mount) return;
    var seasons = ["primavera","estate","autunno","inverno"];
    var current = window.MR.monthToSeason(new Date().getMonth());
    var tabs = seasons.map(function (s) {
      return '<button class="season-switch-btn" data-menu-tab="' + s + '" aria-pressed="' + (s === current) + '">' + M[s].label + '</button>';
    }).join("");
    mount.innerHTML =
      '<div class="season-switch" role="tablist" style="margin-bottom:1rem">' + tabs + '</div>' +
      '<div data-menu-body></div>';
    function draw(s) {
      var body = mount.querySelector("[data-menu-body]");
      body.innerHTML = '<p class="lead">' + M[s].intro + '</p>' + M[s].dishes.map(dishHTML).join("");
      mount.querySelectorAll("[data-menu-tab]").forEach(function (b) {
        b.setAttribute("aria-pressed", b.getAttribute("data-menu-tab") === s ? "true" : "false");
      });
    }
    // stile pulsanti tab
    mount.querySelectorAll("[data-menu-tab]").forEach(function (b) {
      b.style.cssText = "border:1px solid var(--line);background:var(--warm-white);border-radius:100px;padding:.4rem 1rem;font-weight:600;color:var(--ink-soft)";
      b.addEventListener("click", function () { draw(b.getAttribute("data-menu-tab")); });
      b.addEventListener("click", function () {
        mount.querySelectorAll("[data-menu-tab]").forEach(function (x) { x.style.background = "var(--warm-white)"; x.style.color = "var(--ink-soft)"; });
        b.style.background = "var(--olive-dark)"; b.style.color = "#fff";
      });
    });
    draw(current);
    var cb = mount.querySelector('[data-menu-tab="' + current + '"]');
    if (cb) { cb.style.background = "var(--olive-dark)"; cb.style.color = "#fff"; }
  }

  /* Prenota tavolo — disponibilità simulata */
  function setupTable() {
    var form = document.querySelector("[data-table-form]");
    if (!form) return;
    var dateEl = form.querySelector('[name="data"]');
    if (dateEl) dateEl.min = new Date().toISOString().split("T")[0];
    var slot = form.querySelector("[data-table-availability]");
    form.querySelectorAll('[name="data"], [name="orario"], [name="persone"]').forEach(function (el) {
      el.addEventListener("change", check);
    });
    function check() {
      if (!slot) return;
      var d = form.querySelector('[name="data"]').value;
      if (!d) { slot.innerHTML = ""; return; }
      // logica demo: lunedì e martedì chiuso
      var day = new Date(d).getDay();
      window.trackEvent("table_search", { date: d });
      if (day === 1 || day === 2) {
        slot.innerHTML = '<span class="badge-avail none">Chiuso</span> Il ristorante è chiuso il lunedì e il martedì (demo). Prova un altro giorno.';
      } else {
        slot.innerHTML = '<span class="badge-avail ok">Disponibile</span> Ci sono tavoli in questa fascia (disponibilità dimostrativa).';
      }
    }
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var s = form.querySelector("[data-table-status]");
      s.className = "form-status ok"; s.setAttribute("role", "status");
      s.textContent = "Questa è una demo. La richiesta di tavolo non è stata trasmessa.";
      window.trackEvent("table_request_demo", {});
    });
  }

  document.addEventListener("DOMContentLoaded", function () { renderMenus(); setupTable(); });
})();
