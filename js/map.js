const miningLocations = [
  { x: 100, y: 150, resource: 100, name: "Lokasi A" },
  { x: 300, y: 250, resource: 50, name: "Lokasi B" },
  { x: 500, y: 100, resource: 75, name: "Lokasi C" }
];

function initializeMap(ctx) {
  const mapImage = new Image();
  mapImage.src = "assets/images/map.png";

  mapImage.onload = () => {
    ctx.drawImage(mapImage, 0, 0, 800, 400);
    miningLocations.forEach(loc => {
      ctx.beginPath();
      ctx.arc(loc.x, loc.y, 10, 0, Math.PI * 2);
      ctx.fillStyle = "red"; // Lokasi mining
      ctx.fill();
      ctx.stroke();
    });
  };

  // Interaksi klik pada peta
  document.getElementById("mapCanvas").addEventListener("click", (event) => {
    const rect = ctx.canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    miningLocations.forEach(loc => {
      if (Math.hypot(loc.x - x, loc.y - y) < 10) {
        mineRuby(loc); // Jalankan fungsi mining
      }
    });
  });
}
