/* =====================================================================
   seasonal.js — matrice stagionale accessibile (stagioni.html).
   Il blocco "La stagione adesso" è gestito in main.js.
   ===================================================================== */
(function () {
  "use strict";
  function renderMatrix() {
    var mount = document.querySelector("[data-season-matrix]");
    if (!mount || !window.MR.seasonMatrix) return;
    var months = ["G","F","M","A","M","G","L","A","S","O","N","D"];
    var head = "<tr><th scope='col'>Esperienza</th>" + months.map(function (m, i) {
      return "<th scope='col' title='mese " + (i + 1) + "'>" + m + "</th>";
    }).join("") + "<th scope='col'>Meteo</th><th scope='col'>Bimbi</th></tr>";
    var rows = window.MR.seasonMatrix.map(function (r) {
      var cells = r.months.map(function (v) {
        return v ? '<td class="yes" aria-label="disponibile">●</td>' : '<td class="no" aria-label="non disponibile">·</td>';
      }).join("");
      return "<tr><th scope='row'>" + r.name + "</th>" + cells +
        "<td>" + (r.weather ? "Dipende" : "No") + "</td><td>" + (r.kids ? "Sì" : "No") + "</td></tr>";
    }).join("");
    mount.innerHTML = '<table class="data"><thead>' + head + '</thead><tbody>' + rows + '</tbody></table>';
  }
  document.addEventListener("DOMContentLoaded", renderMatrix);
})();
