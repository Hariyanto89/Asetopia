function initializeMap(ctx) {
  const mapImage = new Image();
  mapImage.src = "assets/images/map.png";

  mapImage.onload = () => {
    console.log("Gambar peta berhasil dimuat.");
    ctx.drawImage(mapImage, 0, 0, 800, 400); // Gambar peta di canvas
  };

  mapImage.onerror = () => {
    console.error("Gagal memuat gambar peta. Pastikan path file benar.");
  };
}

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("mapCanvas");
  const ctx = canvas.getContext("2d");

  console.log("Inisialisasi map...");
  initializeMap(ctx);
});

function initializeMap(ctx) {
  ctx.fillStyle = "#e0e0e0"; // Warna latar placeholder
  ctx.fillRect(0, 0, 800, 400); // Gambar kotak abu-abu sebagai placeholder
}

  // Memutar musik latar
  const bgm = new Audio("assets/sounds/bgm.mp3");
  bgm.loop = true;
  bgm.volume = 0.5;
  bgm.play().catch(err => console.error("Gagal memutar musik latar:", err));

  // Inisialisasi canvas untuk peta
  const canvas = document.getElementById("mapCanvas");
  const ctx = canvas.getContext("2d");

  initializeMap(ctx); // Render peta lokasi mining
  initializeGame();   // Inisialisasi UI dan variabel

  // Event listener untuk NPC Hariyanto
  document.getElement
::contentReference[oaicite:0]{index=0}
 
