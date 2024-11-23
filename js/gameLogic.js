let ruby = 0; // Mata uang utama game
let profit = 0; // Profit dari aset yang di-upgrade

// Fungsi mining ruby
function mineRuby(location) {
  if (location.resource > 0) {
    location.resource -= 10; // Kurangi sumber daya lokasi
    ruby += 10; // Tambahkan ruby
    updateRubyUI(); // Perbarui tampilan ruby
    checkCompletion(); // Periksa apakah semua lokasi mining selesai
    playSound("mining.mp3"); // Putar suara mining
    console.log(`Berhasil mining di ${location.name}. Ruby: ${ruby}`);
  } else {
    alert(`Sumber daya di ${location.name} habis!`);
  }
}

// Fungsi upgrade aset
function upgradeAsset() {
  const upgradeCost = 50; // Biaya upgrade
  if (ruby >= upgradeCost) {
    ruby -= upgradeCost; // Kurangi ruby
    profit += 20; // Tambahkan profit
    updateProfitUI(); // Perbarui tampilan profit
    playSound("upgrade.mp3"); // Putar suara upgrade
    alert(`Upgrade berhasil! Profit meningkat menjadi ${profit}.`);
  } else {
    alert("Ruby tidak cukup untuk upgrade aset!");
  }
}

// Fungsi untuk memberikan reward setelah quest selesai
function giveReward() {
  const rewardAmount = 100; // Jumlah ruby sebagai reward
  ruby += rewardAmount;
  updateRubyUI();
  alert(`Quest selesai! Anda mendapatkan ${rewardAmount} ruby.`);
}

// Fungsi untuk memeriksa apakah semua lokasi mining selesai
function checkCompletion() {
  if (merigiLocations.every((loc) => loc.resource === 0)) {
    completeQuest(); // Tandai quest sebagai selesai
    giveReward(); // Berikan reward
    alert("Selamat! Semua lokasi di Kecamatan Merigi selesai. Lanjutkan ke map berikutnya.");
    proceedToNextMap(); // Transisi ke map berikutnya
  }
}

// Fungsi untuk memulai map berikutnya
function proceedToNextMap() {
  const canvas = document.getElementById("mapCanvas");
  const ctx = canvas.getContext("2d");

  // Ganti peta ke Kecamatan Seberang Musi (contoh)
  alert("Peta berikutnya adalah Kecamatan Seberang Musi.");
  initializeSeberangMusiMap(ctx); // Fungsi untuk inisialisasi map berikutnya
}

// Fungsi untuk memainkan efek suara
function playSound(file) {
  const sound = new Audio(`assets/sounds/${file}`);
  sound.play().catch((err) => console.error("Gagal memutar efek suara:", err));
}

// Fungsi untuk reset game (opsional untuk testing)
function resetGame() {
  ruby = 0;
  profit = 0;
  merigiLocations.forEach((loc) => (loc.resource = 100)); // Reset resource di semua lokasi
  updateRubyUI();
  updateProfitUI();
  alert("Game telah di-reset.");
}

// Fungsi untuk menyelesaikan quest
function completeQuest() {
  const activeQuest = document.getElementById("active-quest");
  activeQuest.textContent = "Quest selesai!";
  playSound("quest_complete.mp3"); // Efek suara quest selesai
  console.log("Quest selesai.");
}

// Fungsi untuk memulai quest baru
function startQuest(questName) {
  const activeQuest = document.getElementById("active-quest");
  activeQuest.textContent = questName;
  console.log(`Quest dimulai: ${questName}`);
}
