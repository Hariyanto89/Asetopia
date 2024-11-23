document.addEventListener("DOMContentLoaded", () => {
  // Inisialisasi elemen game
  const canvas = document.getElementById("mapCanvas");
  const ctx = canvas.getContext("2d");

  // Mulai permainan
  initializeMap(ctx); // Render peta
  initializeGame(); // Inisialisasi variabel dan UI

  // Musik latar otomatis
  const bgm = new Audio("assets/sounds/bgm.mp3");
  bgm.loop = true;
  bgm.volume = 0.5;
  bgm.play().catch(err => console.log("Musik tidak dapat diputar:", err));
});

  // Gambar awal game
  const imgLand = new Image();
  imgLand.src = "assets/images/land.png";
  const imgBuilding = new Image();
  imgBuilding.src = "assets/images/building.png";
  const imgHariyanto = new Image();
  imgHariyanto.src = "assets/images/hariyanto.png";

  imgLand.onload = () => {
    ctx.drawImage(imgLand, 0, 200, 800, 200);
    ctx.drawImage(imgBuilding, 100, 150, 100, 100);
    ctx.drawImage(imgHariyanto, 700, 50, 80, 80);
  };

  initializeGame(ctx);
});
