// Fungsi memperbarui tampilan ruby
function updateRubyUI() {
  document.getElementById("ruby").textContent = ruby;
  console.log(`Ruby diperbarui: ${ruby}`);
}

// Fungsi memperbarui tampilan profit
function updateProfitUI() {
  document.getElementById("profit").textContent = profit;
  console.log(`Profit diperbarui: ${profit}`);
}

// Fungsi memperbarui tampilan quest aktif
function updateQuestUI() {
  const activeQuestElement = document.getElementById("active-quest");
  activeQuestElement.textContent = currentQuest
    ? `${currentQuest.name}: ${currentQuest.description}`
    : "Tidak ada quest aktif";
  console.log(`Quest aktif diperbarui: ${currentQuest ? currentQuest.name : "Tidak ada"}`);
}

// Fungsi memperbarui daftar pet di UI
function updatePetUI() {
  const petList = document.getElementById("pet-list");
  petList.innerHTML = ""; // Bersihkan daftar sebelumnya

  if (pets.length > 0) {
    pets.forEach((pet) => {
      const petItem = document.createElement("li");
      petItem.textContent = `- ${pet.charAt(0).toUpperCase() + pet.slice(1)}`;
      petList.appendChild(petItem);
    });
  } else {
    const noPetItem = document.createElement("li");
    noPetItem.textContent = "Tidak ada pet.";
    petList.appendChild(noPetItem);
  }
  console.log("UI daftar pet diperbarui.");
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
  console.log("Status lokasi mining diperbarui di UI.");
}

// Fungsi untuk menampilkan pesan status ke pemain
function showStatusMessage(message) {
  const statusElement = document.getElementById("status-message");
  statusElement.textContent = message;
  statusElement.style.opacity = 1;

  // Animasi fade-out setelah 3 detik
  setTimeout(() => {
    statusElement.style.opacity = 0;
  }, 3000);
  console.log(`Status pesan diperbarui: ${message}`);
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
    showStatusMessage("Upgrade berhasil! Profit meningkat.");
  });

  // Tombol reset game (opsional untuk testing)
  document.getElementById("resetButton")?.addEventListener("click", () => {
    resetGame();
    updateLocationUI(merigiLocations); // Reset tampilan lokasi
    updatePetUI(); // Reset tampilan pet
    showStatusMessage("Game di-reset ke kondisi awal.");
  });

  console.log("UI berhasil diinisialisasi.");
}
