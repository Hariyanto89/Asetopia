// Daftar pet yang dimiliki pemain
const pets = [];

// Harga pet
const petPrices = {
  robot: 50, // Harga pet robot tambang
  loader: 100, // Harga hewan loader
  drone: 150, // Harga drone eksplorasi
};

// Fungsi untuk membeli pet
function buyPet(type) {
  if (!petPrices[type]) {
    alert("Jenis pet tidak valid!");
    return;
  }

  if (ruby >= petPrices[type]) {
    ruby -= petPrices[type]; // Kurangi ruby
    pets.push(type); // Tambahkan pet ke daftar pemain
    updateRubyUI(); // Perbarui tampilan ruby
    updatePetUI(); // Perbarui daftar pet di UI
    playSound("pet.mp3"); // Putar suara pembelian pet
    alert(`Pet ${type} berhasil dibeli!`);
    console.log(`Daftar pet saat ini: ${pets.join(", ")}`);
  } else {
    alert("Ruby tidak cukup untuk membeli pet ini!");
  }
}

// Fungsi untuk menerapkan efek pet ke lokasi mining
function applyPetEffects(location) {
  pets.forEach((pet) => {
    switch (pet) {
      case "robot":
        // Robot tambang menambahkan 5 resource ke lokasi setiap kali mining
        location.resource += 5;
        console.log("Robot tambang menambahkan resource +5.");
        break;
      case "loader":
        // Loader memberikan tambahan ruby setiap kali mining
        ruby += 5;
        console.log("Hewan loader menambahkan ruby +5.");
        break;
      case "drone":
        // Drone mengurangi resource lokasi lebih cepat (menambang lebih efektif)
        location.resource -= 5;
        console.log("Drone eksplorasi meningkatkan kecepatan mining.");
        break;
      default:
        console.warn(`Efek untuk pet ${pet} tidak ditemukan.`);
        break;
    }
  });

  // Pastikan resource lokasi tidak negatif
  if (location.resource < 0) {
    location.resource = 0;
    console.log(`Resource di ${location.name} habis.`);
  }
}

// Fungsi untuk memperbarui daftar pet di UI
function updatePetUI() {
  const petList = document.getElementById("pet-list");
  petList.innerHTML = ""; // Bersihkan daftar sebelumnya

  pets.forEach((pet) => {
    const listItem = document.createElement("li");
    listItem.textContent = pet.charAt(0).toUpperCase() + pet.slice(1); // Format nama pet
    petList.appendChild(listItem);
  });

  console.log("UI daftar pet diperbarui.");
}

// Integrasi efek pet ke dalam proses mining
function mineRuby(location) {
  if (location.resource > 0) {
    location.resource -= 10; // Kurangi resource dasar
    applyPetEffects(location); // Terapkan efek pet ke lokasi
    ruby += 10; // Tambahkan ruby dasar
    updateRubyUI(); // Perbarui UI ruby
    playSound("mining.mp3"); // Putar suara mining
    console.log(`Mining di ${location.name}, resource tersisa: ${location.resource}`);
  } else {
    alert(`Sumber daya di ${location.name} habis!`);
  }
}

// Fungsi untuk menampilkan deskripsi efek pet (opsional, untuk UI)
function showPetDescription(type) {
  const descriptions = {
    robot: "Robot Tambang: Menambah resource lokasi +5 setiap mining.",
    loader: "Hewan Loader: Menambah ruby +5 setiap mining.",
    drone: "Drone Eksplorasi: Mengurangi resource lokasi lebih cepat.",
  };

  alert(descriptions[type] || "Deskripsi pet tidak ditemukan.");
}

// Event listener untuk tombol pembelian pet (opsional)
document.querySelectorAll(".buy-pet-button").forEach((button) => {
  button.addEventListener("click", () => {
    const petType = button.getAttribute("data-pet");
    buyPet(petType); // Beli pet berdasarkan tipe
  });
});
