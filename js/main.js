document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");

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
