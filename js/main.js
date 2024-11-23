// Fungsi untuk memuat dan menggambar peta di canvas
function initializeMap(ctx, mapImagePath, callback) {
  const mapImage = new Image(); // Objek gambar
  mapImage.src = mapImagePath; // Path gambar peta

  mapImage.onload = () => {
    console.log("Gambar peta berhasil dimuat:", mapImagePath);
    ctx.drawImage(mapImage, 0, 0, 800, 400); // Render gambar di canvas
    if (callback) callback(); // Panggil callback jika ada
  };

  mapImage.onerror = () => {
    console.error("Gagal memuat gambar peta:", mapImagePath);
    ctx.fillStyle = "#e0e0e0"; // Warna latar placeholder
    ctx.fillRect(0, 0, 800, 400); // Gambar placeholder abu-abu
  };
}

// Fungsi untuk inisialisasi elemen game
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
  document.getElementById("game-container").style.display = "block";

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

// Event listener utama saat DOM siap
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM siap. Menunggu interaksi pengguna...");
  const startButton = document.getElementById("startGameButton");

  // Event listener untuk tombol "Mulai Game"
  startButton.addEventListener("click", startGame);

  // Event listener untuk tombol reset game (opsional untuk testing)
  const resetButton = document.getElementById("resetButton");
  resetButton?.addEventListener("click", () => {
    resetGame(); // Reset seluruh game
    location.reload(); // Reload halaman
  });
});
