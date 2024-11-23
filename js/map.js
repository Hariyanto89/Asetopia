// Lokasi mining beserta resource dan koordinatnya
const miningLocations = [
  { x: 100, y: 150, resource: 100, name: "Lokasi A" },
  { x: 300, y: 250, resource: 50, name: "Lokasi B" },
  { x: 500, y: 100, resource: 75, name: "Lokasi C" },
];

// Fungsi untuk inisialisasi peta
function initializeMap(ctx) {
  const mapImage = new Image(); // Objek gambar peta
  mapImage.src = "assets/images/map.png"; // Path gambar peta

  // Ketika gambar selesai dimuat, render peta dan lokasi mining
  mapImage.onload = () => {
    ctx.drawImage(mapImage, 0, 0, 800, 400); // Render gambar peta
    renderMiningLocations(ctx); // Render lokasi mining
    console.log("Peta dan lokasi mining berhasil diinisialisasi.");
  };

  // Penanganan jika gambar gagal dimuat
  mapImage.onerror = () => {
    console.error("Gagal memuat gambar peta. Pastikan path file benar.");
    ctx.fillStyle = "#e0e0e0"; // Warna latar placeholder
    ctx.fillRect(0, 0, 800, 400); // Gambar placeholder abu-abu
    renderMiningLocations(ctx); // Tetap render lokasi mining meski tanpa peta
  };
}

// Fungsi untuk menggambar lokasi mining di peta
function renderMiningLocations(ctx) {
  miningLocations.forEach((loc) => {
    ctx.beginPath();
    ctx.arc(loc.x, loc.y, 10, 0, Math.PI * 2); // Gambar lingkaran kecil
    ctx.fillStyle = loc.resource > 0 ? "red" : "gray"; // Warna berdasarkan resource
    ctx.fill();
    ctx.stroke();
  });
}

// Fungsi untuk menangani klik pada lokasi mining
function handleMapClick(event, ctx) {
  const rect = ctx.canvas.getBoundingClientRect(); // Posisi canvas relatif ke viewport
  const x = event.clientX - rect.left; // Koordinat klik X relatif ke canvas
  const y = event.clientY - rect.top; // Koordinat klik Y relatif ke canvas

  // Cek apakah klik berada di salah satu lokasi mining
  miningLocations.forEach((loc) => {
    if (Math.hypot(loc.x - x, loc.y - y) < 10) {
      console.log(`Lokasi ${loc.name} diklik.`);
      if (loc.resource > 0) {
        mineRuby(loc); // Proses mining ruby
        renderMiningLocations(ctx); // Perbarui tampilan lokasi
      } else {
        alert(`Sumber daya di ${loc.name} habis!`);
      }
    }
  });
}

// Inisialisasi event listener untuk klik pada canvas
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("mapCanvas"); // Ambil elemen canvas
  const ctx = canvas.getContext("2d"); // Context untuk menggambar di canvas

  // Inisialisasi peta dan lokasi mining
  initializeMap(ctx);

  // Tambahkan event listener untuk klik pada peta
  canvas.addEventListener("click", (event) => handleMapClick(event, ctx));
  console.log("Event listener untuk klik pada peta berhasil ditambahkan.");
});
