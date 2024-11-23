document.addEventListener("DOMContentLoaded", () => {
  console.log("Game sedang dimulai...");
  
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
});
