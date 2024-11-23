function updateRubyUI() {
  document.getElementById("ruby").textContent = ruby;
}

function updateProfitUI() {
  document.getElementById("profit").textContent = profit;
}

// Fungsi inisialisasi UI
function initializeGame() {
  updateRubyUI();
  updateProfitUI();
}
