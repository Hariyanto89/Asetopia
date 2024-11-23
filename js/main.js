// Inisialisasi peta di canvas
function initializeMap(ctx) {
  const mapImage = new Image(); // Objek gambar
  mapImage.src = "assets/images/map.png"; // Path gambar peta

  // Ketika gambar selesai dimuat, render ke canvas
  mapImage.onload = () => {
    console.log("Gambar peta berhasil dimuat.");
    ctx.drawImage(mapImage, 0, 0, 800, 400); // Render gambar di canvas
  };

  // Jika gambar gagal dimuat
  mapImage.onerror = () => {
    console.error("Gagal memuat gambar peta. Pastikan path file benar.");
    ctx.fillStyle = "#e0e0e0"; // Warna latar placeholder
    ctx.fillRect(0, 0, 800, 400); // Gambar kotak abu-abu sebagai placeholder
  };
}

// Fungsi utama untuk inisialisasi game
function initializeGame() {
  // Inisialisasi UI ruby dan profit
  updateRubyUI();
  updateProfitUI();

  // Event listener untuk tombol upgrade
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
  bgm.play().catch(err => console.error("Gagal memutar musik latar:", err)); // Tangani error
}

// Event listener utama saat DOM siap
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("mapCanvas"); // Ambil elemen canvas
  const ctx = canvas.getContext("2d"); // Context untuk menggambar di canvas

  // Inisialisasi peta
  initializeMap(ctx);

  // Mulai musik latar
  startBackgroundMusic();

  // Inisialisasi elemen game lainnya
  initializeGame();

  console.log("Game Asetopia siap dimainkan!");
});
