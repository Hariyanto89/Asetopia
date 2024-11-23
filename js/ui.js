// Fungsi memperbarui tampilan ruby
function updateRubyUI() {
  document.getElementById("ruby").textContent = ruby;
}

// Fungsi memperbarui tampilan profit
function updateProfitUI() {
  document.getElementById("profit").textContent = profit;
}

// Fungsi inisialisasi game
function initializeGame() {
  updateRubyUI();
  updateProfitUI();

  // Tombol upgrade aset
  document.getElementById("upgradeButton").addEventListener("click", () => {
    upgradeAsset();
  });
}
