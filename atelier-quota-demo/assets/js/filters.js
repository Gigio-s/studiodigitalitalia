/* ATELIER QUOTA — filters.js
   Filtri portfolio accessibili: tipologia, servizio, stato, località + ricerca
   + ordinamento. Nessun ricaricamento pagina. Stato sincronizzato in URL. */
(function () {
  "use strict";
  if (!document.getElementById("portfolio-grid")) return;

  var P = window.AQ_PROJECTS || [];
  var L = window.AQ_LABELS || {};
  var state = { type: "", services: "", status: "", area: "", q: "", sort: "num" };

  var grid = document.getElementById("portfolio-grid");
  var countEl = document.getElementById("result-count");
  var noRes = document.getElementById("no-results");
  var searchInput = document.getElementById("portfolio-search");
  var sortSelect = document.getElementById("portfolio-sort");

  function apply() {
    var q = state.q.trim().toLowerCase();
    var list = P.filter(function (p) {
      if (state.type && p.type.indexOf(state.type) === -1) return false;
      if (state.services && p.services.indexOf(state.services) === -1) return false;
      if (state.status && p.status !== state.status) return false;
      if (state.area && p.area.indexOf(state.area) === -1) return false;
      if (q) {
        var hay = (p.name + " " + p.location + " " + p.summary).toLowerCase();
        if (hay.indexOf(q) === -1) return false;
      }
      return true;
    });
    list.sort(function (a, b) {
      if (state.sort === "year-desc") return b.year - a.year;
      if (state.sort === "year-asc") return a.year - b.year;
      if (state.sort === "name") return a.name.localeCompare(b.name);
      return a.num.localeCompare(b.num);
    });

    window.AQ.renderAll("portfolio-grid", list);
    if (countEl) countEl.textContent = list.length + (list.length === 1 ? " progetto" : " progetti");
    if (noRes) noRes.classList.toggle("hide", list.length !== 0);
    grid.setAttribute("aria-busy", "false");
    syncURL();
  }

  function syncURL() {
    var params = new URLSearchParams();
    ["type", "services", "status", "area", "q"].forEach(function (k) { if (state[k]) params.set(k, state[k]); });
    if (state.sort !== "num") params.set("sort", state.sort);
    var qs = params.toString();
    history.replaceState(null, "", qs ? ("?" + qs) : location.pathname);
  }

  function readURL() {
    var params = new URLSearchParams(location.search);
    ["type", "services", "status", "area", "q", "sort"].forEach(function (k) {
      if (params.get(k)) state[k] = params.get(k);
    });
  }

  function setupChips() {
    document.querySelectorAll(".chip[data-facet]").forEach(function (chip) {
      var facet = chip.dataset.facet, val = chip.dataset.value;
      if (state[facet] === val || (val === "" && !state[facet])) chip.setAttribute("aria-pressed", "true");
      chip.addEventListener("click", function () {
        state[facet] = (state[facet] === val) ? "" : val;
        // aggiorna aria-pressed nel gruppo
        document.querySelectorAll('.chip[data-facet="' + facet + '"]').forEach(function (c) {
          c.setAttribute("aria-pressed", String(c.dataset.value === state[facet] || (c.dataset.value === "" && !state[facet])));
        });
        grid.setAttribute("aria-busy", "true");
        window.trackEvent && trackEvent("project_filter", { facet: facet, value: state[facet] });
        apply();
      });
    });
  }

  function setup() {
    readURL();
    setupChips();
    if (searchInput) {
      searchInput.value = state.q;
      var t;
      searchInput.addEventListener("input", function () {
        clearTimeout(t);
        t = setTimeout(function () {
          state.q = searchInput.value;
          window.trackEvent && trackEvent("project_search", { q: state.q });
          apply();
        }, 200);
      });
    }
    if (sortSelect) {
      sortSelect.value = state.sort;
      sortSelect.addEventListener("change", function () { state.sort = sortSelect.value; apply(); });
    }
    var reset = document.getElementById("filter-reset");
    if (reset) reset.addEventListener("click", function () {
      state = { type: "", services: "", status: "", area: "", q: "", sort: "num" };
      if (searchInput) searchInput.value = "";
      if (sortSelect) sortSelect.value = "num";
      document.querySelectorAll(".chip[data-facet]").forEach(function (c) {
        c.setAttribute("aria-pressed", String(c.dataset.value === ""));
      });
      apply();
    });
    apply();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", setup);
  else setup();
})();
