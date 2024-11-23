// Objek karakter pemain
const character = {
  x: 50, // Posisi awal X
  y: 50, // Posisi awal Y
  size: 30, // Ukuran karakter (lebar dan tinggi)
  speed: 10, // Kecepatan pergerakan
  imagePath: "assets/images/character.png", // Path gambar karakter
};

// Fungsi menggambar karakter di peta
function drawCharacter(ctx) {
  const characterImage = new Image();
  characterImage.src = character.imagePath;

  characterImage.onload = () => {
    ctx.drawImage(
      characterImage,
      character.x,
      character.y,
      character.size,
      character.size
    );
  };

  characterImage.onerror = () => {
    console.error("Gagal memuat gambar karakter.");
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
    renderUpdatedMap(ctx); // Render ulang peta dengan posisi baru
  }
}

// Fungsi untuk menangani kontrol virtual
function handleVirtualControl(direction, ctx) {
  const previousPosition = { x: character.x, y: character.y }; // Simpan posisi sebelumnya

  switch (direction) {
    case "up":
      if (character.y > 0) character.y -= character.speed;
      break;
    case "down":
      if (character.y < ctx.canvas.height - character.size)
        character.y += character.speed;
      break;
    case "left":
      if (character.x > 0) character.x -= character.speed;
      break;
    case "right":
      if (character.x < ctx.canvas.width - character.size)
        character.x += character.speed;
      break;
    default:
      return; // Abaikan input lainnya
  }

  // Jika posisi berubah, render ulang peta
  if (
    previousPosition.x !== character.x ||
    previousPosition.y !== character.y
  ) {
    renderUpdatedMap(ctx); // Render ulang peta dengan posisi baru
  }
}

// Fungsi untuk merender ulang peta
function renderUpdatedMap(ctx) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Bersihkan canvas
  initializeMerigiMap(ctx); // Render ulang peta utama
  interactWithHariyanto(ctx); // Cek interaksi dengan Hariyanto
}

// Fungsi untuk memeriksa apakah karakter berinteraksi dengan Hariyanto
function interactWithHariyanto(ctx) {
  const distance = Math.hypot(
    hariyanto.x - character.x,
    hariyanto.y - character.y
  );
  if (distance < 50) {
    alert(
      "Hariyanto: Selamat datang di Kecamatan Merigi! Tantangan Anda adalah menyelesaikan masalah sertifikasi lahan."
    );
    startQuest("Sertifikasi Lahan"); // Mulai quest melalui quest.js
  }
}

// Event Listener untuk kontrol keyboard
document.addEventListener("keydown", (event) => {
  const canvas = document.getElementById("mapCanvas"); // Ambil elemen canvas
  const ctx = canvas.getContext("2d"); // Dapatkan context 2D
  moveCharacter(event, ctx); // Panggil fungsi pergerakan karakter
});

// Event Listener untuk kontrol virtual
document.querySelectorAll(".control-button").forEach((button) => {
  button.addEventListener("click", () => {
    const direction = button.getAttribute("data-direction");
    const canvas = document.getElementById("mapCanvas"); // Ambil elemen canvas
    const ctx = canvas.getContext("2d"); // Dapatkan context 2D
    handleVirtualControl(direction, ctx); // Panggil fungsi kontrol virtual
  });
});

document.querySelectorAll(".control-button").forEach((button) => {
  button.addEventListener("click", () => {
    const direction = button.dataset.direction;
    const canvas = document.getElementById("mapCanvas");
    const ctx = canvas.getContext("2d");
    handleVirtualControl(direction, ctx);
  });
});
