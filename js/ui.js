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

// Fungsi memperbarui daftar pet di UI
function updatePetUI() {
  const petList = document.getElementById("pet-list");
  petList.innerHTML = ""; // Bersihkan daftar sebelumnya

  if (pets.length > 0) {
    pets.forEach((pet) => {
      const petItem = document.createElement("li");
      petItem.textContent = `- ${pet}`;
      petList.appendChild(petItem);
    });
  } else {
    const noPetItem = document.createElement("li");
    noPetItem.textContent = "Tidak ada pet.";
    petList.appendChild(noPetItem);
  }
}

// Fungsi memperbarui status lokasi mining di UI
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
  updateRubyUI();
  updateProfitUI();
  updateQuestUI();
  updatePetUI();
  updateLocationUI(merigiLocations);

  // Tombol upgrade aset
  document.getElementById("upgradeButton").addEventListener("click", () => {
    upgradeAsset();
  });

  // Tombol reset game (opsional untuk testing)
  document.getElementById("resetButton").addEventListener("click", () => {
    resetGame();
    updateLocationUI(merigiLocations); // Perbarui tampilan lokasi
    updatePetUI(); // Reset tampilan pet
  });
}
