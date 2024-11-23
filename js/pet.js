const pets = []; // Daftar pet pemain
const petPrices = {
  robot: 50,
  loader: 100,
  drone: 150
};

// Fungsi membeli pet
function buyPet(type) {
  if (ruby >= petPrices[type]) {
    ruby -= petPrices[type]; // Kurangi ruby
    pets.push(type); // Tambahkan pet ke daftar
    updateRubyUI(); // Perbarui UI ruby
    playSound("pet.mp3"); // Efek suara pembelian
    alert(`${type} berhasil dibeli!`);
  } else {
    alert("Ruby tidak cukup untuk membeli pet ini!");
  }
}

// Fungsi efek pet
function applyPetEffects(location) {
  pets.forEach(pet => {
    if (pet === "robot") {
      location.resource += 5; // Tambah resource lokasi
    }
    if (pet === "loader") {
      ruby += 5; // Tambah ruby saat mining
    }
    if (pet === "drone") {
      location.resource -= 5; // Mining lebih cepat
    }
  });
}
