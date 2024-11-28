document.addEventListener("DOMContentLoaded", function () {
    // Ambil data pengguna dari localStorage atau gunakan default
    const currentUser = JSON.parse(localStorage.getItem("currentUser")) || getDefaultUser();

    // Tampilkan data pengguna di halaman
    displayPlayerStatus(currentUser);

    // Event listener untuk membuka dan menutup popup (jika ada tombol show/hide popup di status.html)
    const showButton = document.getElementById("showStatusButton");
    const closeButton = document.getElementById("closeStatusButton");

    if (showButton && closeButton) {
        showButton.addEventListener("click", togglePlayerStatusPopup);
        closeButton.addEventListener("click", togglePlayerStatusPopup);
    }
});

// Fungsi untuk mendapatkan data pengguna default
function getDefaultUser() {
    return {
        username: "User1",
        character: "Bujang Aset",
        xp: 150,
        token: 300,
        lives: 5,
        badges: ["Bronze Badge Agro Visionary"],
    };
}

// Fungsi Tampilkan atau Sembunyikan Popup Status Pemain
function togglePlayerStatusPopup() {
    const popup = document.getElementById("playerStatusPopup");
    if (popup) {
        popup.classList.toggle("hidden");
    }
}

// Fungsi Menampilkan Data Status Pemain
function displayPlayerStatus(user) {
    // Update nama pemain
    document.getElementById("playerName").textContent = user.username || "[Nama Tidak Diketahui]";

    // Update karakter pemain
    document.getElementById("playerCharacter").textContent = user.character || "[Karakter Tidak Dipilih]";

    // Hitung level berdasarkan XP
    const level = Math.floor(user.xp / 100) + 1;
    const xpCurrentLevel = user.xp % 100;
    document.getElementById("playerLevel").textContent = level;
    document.getElementById("playerXP").textContent = `${xpCurrentLevel} / 100`;

    // Update token dan nyawa
    document.getElementById("playerToken").textContent = user.token || 0;
    document.getElementById("playerLives").textContent = user.lives || 0;

    // Update badge
    const badgeContainer = document.getElementById("badgeList");
    badgeContainer.innerHTML = ""; // Bersihkan kontainer badge sebelumnya
    if (user.badges && user.badges.length > 0) {
        user.badges.forEach((badge) => {
            const badgeItem = document.createElement("p");
            badgeItem.textContent = badge;
            badgeContainer.appendChild(badgeItem);
        });
    } else {
        badgeContainer.innerHTML = "<p>Belum ada badge yang diperoleh.</p>";
    }
}
