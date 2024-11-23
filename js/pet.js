const pets = []; // Daftar pet yang dimiliki pemain
const petPrices = {
  robot: 50,
  loader: 100,
  drone: 150,
};

// Fungsi untuk membeli pet
function buyPet(type) {
  if (ruby >= petPrices[type]) {
    ruby -= petPrices[type]; // Kurangi ruby
    pets.push(type); // Tambahkan pet ke daftar
    updateRubyUI(); // Perbarui tampilan ruby
    playSound("pet.mp3"); // Putar suara pembelian
    alert(`Pet ${type} berhasil dibeli!`);
  } else {
    alert("Ruby tidak cukup untuk membeli pet ini!");
  }
}

// Fungsi menerapkan efek pet
function applyPetEffects(location) {
  pets.forEach(pet => {
    if (pet === "robot") {
      location.resource += 5; // Tambah resource lokasi
    }
    if (pet === "loader") {
      ruby += 5; // Tambahkan ruby ekstra saat mining
    }
    if (pet === "drone") {
      location.resource -= 5; // Mining lebih cepat
    }
  });
}
