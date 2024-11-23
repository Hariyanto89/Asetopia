// Fungsi memperbarui tampilan ruby
function updateRubyUI() {
  document.getElementById("ruby").textContent = ruby;
}

// Fungsi memperbarui tampilan profit
function updateProfitUI() {
  document.getElementById("profit").textContent = profit;
}

// Fungsi memperbarui tampilan quest aktif
function updateQuestUI() {
  const activeQuestElement = document.getElementById("active-quest");
  activeQuestElement.textContent = currentQuest
    ? currentQuest.description
    : "Tidak ada quest aktif";
}

// Fungsi untuk memperbarui status lokasi mining di UI
function updateLocationUI(locations) {
  const locationContainer = document.getElementById("location-status");
  locationContainer.innerHTML = ""; // Bersihkan kontainer

  locations.forEach((loc) => {
    const locationElement = document.createElement("p");
    locationElement.textContent = `${loc.name}: ${loc.resource} resource tersisa`;
    locationContainer.appendChild(locationElement);
  });
}

// Fungsi inisialisasi UI
function initializeUI() {
  // Inisialisasi nilai awal
  updateRubyUI();
  updateProfitUI();
  updateQuestUI();
  updateLocationUI(merigiLocations);

  // Tombol upgrade aset
  document.getElementById("upgradeButton").addEventListener("click", () => {
    upgradeAsset();
  });

  // Tombol reset game (opsional, untuk testing)
  document.getElementById("resetButton").addEventListener("click", () => {
    resetGame();
    updateLocationUI(merigiLocations); // Perbarui tampilan lokasi
  });
}
