let selectedCharacter = null;

// Fungsi Pilih Karakter
function selectCharacter(characterName) {
    selectedCharacter = characterName;
    alert(`Anda memilih ${characterName}!`);
}

// Fungsi Mulai Game
function startGame() {
    if (!selectedCharacter) {
        alert("Pilih karakter terlebih dahulu!");
        return;
    }

    // Ambil data pengguna dari LocalStorage
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
        alert("Anda belum login! Kembali ke halaman login.");
        window.location.href = "index.html"; // Arahkan ke login jika tidak ada data pengguna
        return;
    }

    // Simpan karakter yang dipilih
    currentUser.character = selectedCharacter;
    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    alert(`Game dimulai dengan karakter ${selectedCharacter}!`);
    window.location.href = "gameplay.html"; // Arahkan ke halaman gameplay
}
