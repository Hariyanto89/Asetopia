// Fungsi untuk memuat dan menggambar peta di canvas
function initializeMap(ctx, mapImagePath, callback) {
  const mapImage = new Image(); // Objek gambar
  mapImage.src = mapImagePath; // Path gambar peta

  mapImage.onload = () => {
    console.log("Gambar peta berhasil dimuat:", mapImagePath);
    ctx.drawImage(mapImage, 0, 0, ctx.canvas.width, ctx.canvas.height); // Render gambar di canvas
    if (callback) callback(); // Panggil callback jika ada
  };

  mapImage.onerror = () => {
    console.error("Gagal memuat gambar peta:", mapImagePath);
    ctx.fillStyle = "#e0e0e0"; // Warna latar placeholder
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Gambar placeholder abu-abu
  };
}

// Fungsi untuk memperbarui elemen UI utama game
function initializeGame() {
  updateRubyUI(); // Perbarui UI ruby
  updateProfitUI(); // Perbarui UI profit
  updateQuestUI("Tidak ada quest aktif"); // Perbarui UI quest

  // Event listener untuk tombol upgrade aset
  document.getElementById("upgradeButton").addEventListener("click", () => {
    upgradeAsset(); // Logika upgrade aset
  });

  console.log("Game berhasil diinisialisasi.");
}

// Fungsi untuk memulai musik latar
function startBackgroundMusic() {
  const bgm = new Audio("assets/sounds/bgm.mp3"); // Path musik latar
  bgm.loop = true; // Ulangi musik
  bgm.volume = 0.5; // Volume musik
  bgm.play()
    .then(() => console.log("Musik latar berhasil diputar."))
    .catch((err) => console.error("Gagal memutar musik latar:", err));
}

// Fungsi untuk memulai game
function startGame() {
  console.log("Game dimulai!");

  // Sembunyikan tombol start dan tampilkan game
  document.getElementById("start-container").style.display = "none";
  document.getElementById("game-container").style.display = "flex";

  // Inisialisasi canvas dan context
  const canvas = document.getElementById("mapCanvas");
  const ctx = canvas.getContext("2d");

  // Inisialisasi peta pertama (Kecamatan Merigi)
  initializeMap(ctx, "assets/images/map_merigi.png", () => {
    initializeMerigiMap(ctx); // Peta pertama: Kecamatan Merigi
  });

  // Inisialisasi elemen lain (UI, event listener, dll.)
  initializeGame();
  startBackgroundMusic(); // Mulai musik latar
}

// Fungsi untuk transisi ke map berikutnya
function transitionToNextMap(nextMapFunction, mapImagePath) {
  console.log("Transisi ke map berikutnya...");
  const canvas = document.getElementById("mapCanvas");
  const ctx = canvas.getContext("2d");

  // Bersihkan canvas dan muat peta baru
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  initializeMap(ctx, mapImagePath, () => {
    nextMapFunction(ctx); // Inisialisasi peta berikutnya
  });

  alert("Anda sekarang berada di map berikutnya!");
}

// Fungsi untuk reset game (opsional untuk testing)
function resetGame() {
  ruby = 0; // Reset jumlah ruby
  profit = 0; // Reset jumlah profit
  merigiLocations.forEach((loc) => (loc.resource = 100)); // Reset resource di semua lokasi
  updateRubyUI();
  updateProfitUI();
  updateQuestUI("Tidak ada quest aktif");
  updateLocationUI(merigiLocations); // Reset status lokasi mining
  updatePetUI(); // Reset pet yang dimiliki
  alert("Game telah di-reset.");
  console.log("Game di-reset ke kondisi awal.");
}

// Fungsi untuk menambahkan interaksi tombol reset game
function setupResetButton() {
  const resetButton = document.getElementById("resetButton");
  resetButton?.addEventListener("click", () => {
    resetGame(); // Reset seluruh game
    location.reload(); // Reload halaman
  });
}

// Event listener utama saat DOM siap
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM siap. Menunggu interaksi pengguna...");
  const startButton = document.getElementById("startGameButton");

  // Event listener untuk tombol "Mulai Game"
  startButton.addEventListener("click", startGame);

  // Setup tombol reset game
  setupResetButton();
});
