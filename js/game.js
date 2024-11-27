// Fungsi untuk Memuat Halaman Pemilihan Karakter
document.addEventListener("DOMContentLoaded", function () {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {
        alert("Anda belum login! Kembali ke halaman login.");
        window.location.href = "index.html";
        return;
    }

    if (currentUser.character) {
        alert(`Karakter Anda (${currentUser.character}) sudah dipilih. Anda akan diarahkan ke gameplay.`);
        window.location.href = "gameplay.html";
    }
});

// Fungsi untuk Memilih Karakter
function selectCharacter(characterName) {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {
        alert("Anda belum login! Kembali ke halaman login.");
        window.location.href = "index.html";
        return;
    }

    // Simpan karakter yang dipilih
    currentUser.character = characterName;
    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    alert(`Anda telah memilih karakter ${characterName}!`);
    window.location.href = "gameplay.html"; // Arahkan ke gameplay
}

// Fungsi untuk Memulai Game
function startGame() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {
        alert("Anda belum login! Kembali ke halaman login.");
        window.location.href = "index.html";
        return;
    }

    if (!currentUser.character) {
        alert("Pilih karakter terlebih dahulu sebelum memulai game!");
        window.location.href = "character.html";
        return;
    }

    alert(`Game dimulai dengan karakter ${currentUser.character}!`);
    window.location.href = "gameplay.html"; // Arahkan ke gameplay
}
