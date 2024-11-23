let ruby = 0; // Mata uang utama game
let profit = 0; // Profit dari aset yang di-upgrade

// Fungsi mining ruby
function mineRuby(location) {
  if (location.resource > 0) {
    location.resource -= 10; // Kurangi sumber daya lokasi
    ruby += 10; // Tambahkan ruby
    updateRubyUI(); // Perbarui tampilan ruby
    playSound("mining.mp3"); // Putar suara mining
  } else {
    alert(`Sumber daya di ${location.name} habis!`);
  }
}

// Fungsi upgrade aset
function upgradeAsset() {
  if (ruby >= 50) {
    ruby -= 50; // Kurangi ruby
    profit += 20; // Tambahkan profit
    updateProfitUI(); // Perbarui tampilan profit
    playSound("upgrade.mp3"); // Putar suara upgrade
  } else {
    alert("Ruby tidak cukup untuk upgrade aset!");
  }
}

// Fungsi memainkan efek suara
function playSound(file) {
  const sound = new Audio(`assets/sounds/${file}`);
  sound.play().catch(err => console.error("Gagal memutar efek suara:", err));
}
