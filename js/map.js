// Lokasi mining beserta resource dan koordinatnya di Kecamatan Merigi
const merigiLocations = [
  { x: 100, y: 150, resource: 100, name: "Lahan Pertanian A" },
  { x: 300, y: 250, resource: 80, name: "Lahan Pertanian B" },
  { x: 500, y: 100, resource: 120, name: "Lahan Pertanian C" },
];

// NPC Hariyanto
const hariyanto = { x: 400, y: 200, size: 40, name: "Hariyanto" };

// Karakter pemain
let character = { x: 50, y: 50, size: 30 }; // Posisi awal karakter

// Fungsi untuk menggambar lokasi mining di peta
function renderLocations(ctx, locations) {
  locations.forEach((loc) => {
    ctx.beginPath();
    ctx.arc(loc.x, loc.y, 10, 0, Math.PI * 2); // Gambar lingkaran kecil
    ctx.fillStyle = loc.resource > 0 ? "red" : "gray"; // Warna berdasarkan resource
    ctx.fill();
    ctx.stroke();
  });
}

// Fungsi untuk menggambar NPC Hariyanto
function drawHariyanto(ctx) {
  const npcImage = new Image();
  npcImage.src = "assets/images/hariyanto.png";
  npcImage.onload = () => {
    ctx.drawImage(npcImage, hariyanto.x, hariyanto.y, hariyanto.size, hariyanto.size);
  };
}

// Fungsi untuk menggambar karakter pemain
function drawCharacter(ctx) {
  const characterImage = new Image();
  characterImage.src = "assets/images/character.png";
  characterImage.onload = () => {
    ctx.drawImage(characterImage, character.x, character.y, character.size, character.size);
  };
}

// Fungsi untuk inisialisasi peta Kecamatan Merigi
function initializeMerigiMap(ctx) {
  const mapImage = new Image(); // Objek gambar peta
  mapImage.src = "assets/images/map_merigi.png"; // Path gambar peta

  // Ketika gambar selesai dimuat, render peta dan elemen lainnya
  mapImage.onload = () => {
    ctx.drawImage(mapImage, 0, 0, 800, 400); // Render gambar peta
    renderLocations(ctx, merigiLocations); // Render lokasi mining
    drawHariyanto(ctx); // Gambar NPC Hariyanto
    drawCharacter(ctx); // Gambar karakter pemain
  };

  // Penanganan jika gambar gagal dimuat
  mapImage.onerror = () => {
    console.error("Gagal memuat gambar peta Merigi.");
    ctx.fillStyle = "#e0e0e0"; // Warna latar placeholder
    ctx.fillRect(0, 0, 800, 400); // Gambar placeholder abu-abu
  };
}

// Fungsi untuk menangani klik pada lokasi mining
function handleMapClick(event, ctx, locations) {
  const rect = ctx.canvas.getBoundingClientRect(); // Posisi canvas relatif ke viewport
  const x = event.clientX - rect.left; // Koordinat klik X relatif ke canvas
  const y = event.clientY - rect.top; // Koordinat klik Y relatif ke canvas

  // Cek apakah klik berada di salah satu lokasi mining
  locations.forEach((loc) => {
    if (Math.hypot(loc.x - x, loc.y - y) < 10) {
      console.log(`Lokasi ${loc.name} diklik.`);
      if (loc.resource > 0) {
        mineRuby(loc); // Proses mining ruby
        renderLocations(ctx, locations); // Perbarui tampilan lokasi
      } else {
        alert(`Sumber daya di ${loc.name} habis!`);
      }
    }
  });
}

// Fungsi untuk berinteraksi dengan NPC Hariyanto
function interactWithHariyanto() {
  const distance = Math.hypot(hariyanto.x - character.x, hariyanto.y - character.y);
  if (distance < 50) {
    alert(
      "Hariyanto: Selamat datang di Kecamatan Merigi! Tantangan Anda adalah menyelesaikan masalah sertifikasi lahan."
    );
    startQuest("Sertifikasi Lahan");
  }
}

// Fungsi untuk menangani pergerakan karakter
function moveCharacter(event, ctx) {
  const previousPosition = { x: character.x, y: character.y }; // Simpan posisi sebelumnya
  const speed = 10; // Kecepatan pergerakan

  switch (event.key) {
    case "ArrowUp":
      if (character.y > 0) character.y -= speed;
      break;
    case "ArrowDown":
      if (character.y < ctx.canvas.height - character.size) character.y += speed;
      break;
    case "ArrowLeft":
      if (character.x > 0) character.x -= speed;
      break;
    case "ArrowRight":
      if (character.x < ctx.canvas.width - character.size) character.x += speed;
      break;
  }

  // Jika posisi berubah, render ulang peta
  if (previousPosition.x !== character.x || previousPosition.y !== character.y) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Bersihkan canvas
    initializeMerigiMap(ctx); // Render ulang peta
    interactWithHariyanto(); // Cek interaksi dengan Hariyanto
  }
}

// Fungsi untuk transisi ke peta berikutnya
function initializeSeberangMusiMap(ctx) {
  const mapImage = new Image();
  mapImage.src = "assets/images/map_seberang_musi.png";

  mapImage.onload = () => {
    ctx.drawImage(mapImage, 0, 0, 800, 400); // Render peta baru
    // Tambahkan elemen di peta berikutnya
    renderLocations(ctx, seberangMusiLocations);
    drawHariyanto(ctx);
    drawCharacter(ctx);
  };

  mapImage.onerror = () => {
    console.error("Gagal memuat peta Seberang Musi.");
  };
}

// Inisialisasi event listener untuk klik pada canvas dan pergerakan karakter
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("mapCanvas"); // Ambil elemen canvas
  const ctx = canvas.getContext("2d"); // Context untuk menggambar di canvas

  // Inisialisasi peta dan lokasi mining
  initializeMerigiMap(ctx);

  // Tambahkan event listener untuk klik pada peta
  canvas.addEventListener("click", (event) => handleMapClick(event, ctx, merigiLocations));

  // Tambahkan event listener untuk pergerakan karakter
  document.addEventListener("keydown", (event) => moveCharacter(event, ctx));

  console.log("Event listener untuk klik dan pergerakan karakter berhasil ditambahkan.");
});
