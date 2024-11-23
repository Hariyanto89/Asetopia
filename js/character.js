// Objek karakter pemain
const character = {
  x: 50, // Posisi awal X
  y: 50, // Posisi awal Y
  size: 30, // Ukuran karakter (lebar dan tinggi)
  speed: 10, // Kecepatan pergerakan
};

// Fungsi menggambar karakter di peta
function drawCharacter(ctx) {
  const characterImage = new Image();
  characterImage.src = "assets/images/character.png"; // Path gambar karakter

  characterImage.onload = () => {
    ctx.drawImage(
      characterImage,
      character.x,
      character.y,
      character.size,
      character.size
    );
  };
}

// Fungsi untuk menangani pergerakan karakter
function moveCharacter(event, ctx) {
  const previousPosition = { x: character.x, y: character.y }; // Simpan posisi sebelumnya

  switch (event.key) {
    case "ArrowUp":
      if (character.y > 0) character.y -= character.speed;
      break;
    case "ArrowDown":
      if (character.y < ctx.canvas.height - character.size)
        character.y += character.speed;
      break;
    case "ArrowLeft":
      if (character.x > 0) character.x -= character.speed;
      break;
    case "ArrowRight":
      if (character.x < ctx.canvas.width - character.size)
        character.x += character.speed;
      break;
    default:
      return; // Abaikan tombol selain panah
  }

  // Jika posisi berubah, render ulang peta
  if (
    previousPosition.x !== character.x ||
    previousPosition.y !== character.y
  ) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Bersihkan canvas
    initializeMerigiMap(ctx); // Render ulang peta
    interactWithHariyanto(); // Cek interaksi dengan Hariyanto
  }
}

// Fungsi untuk memeriksa apakah karakter berinteraksi dengan Hariyanto
function interactWithHariyanto() {
  const distance = Math.hypot(
    hariyanto.x - character.x,
    hariyanto.y - character.y
  );
  if (distance < 50) {
    alert(
      "Hariyanto: Selamat datang di Kecamatan Merigi! Selesaikan masalah sertifikasi lahan untuk melanjutkan!"
    );
    startQuest("Sertifikasi Lahan"); // Mulai quest melalui quest.js
  }
}

// Tambahkan event listener untuk pergerakan karakter
document.addEventListener("keydown", (event) => {
  const canvas = document.getElementById("mapCanvas"); // Ambil elemen canvas
  const ctx = canvas.getContext("2d"); // Dapatkan context 2D
  moveCharacter(event, ctx); // Panggil fungsi pergerakan karakter
});
