document.addEventListener("DOMContentLoaded", function () {
    const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {
        username: "User1",
        character: "Bujang Aset",
        xp: 150,
        token: 300,
        lives: 5,
        badges: ["Bronze Badge Agro Visionary"],
    };

    // Tampilkan data pengguna di Status Popup
    displayPlayerStatus(currentUser);

    // Event listener untuk membuka dan menutup popup
    document.getElementById("showStatusButton").addEventListener("click", togglePlayerStatusPopup);
    document.getElementById("closeStatusButton").addEventListener("click", togglePlayerStatusPopup);
});

// Fungsi Tampilkan atau Sembunyikan Popup Status Pemain
function togglePlayerStatusPopup() {
    const popup = document.getElementById("playerStatusPopup");
    popup.classList.toggle("hidden");
}

// Fungsi Menampilkan Data Status Pemain
function displayPlayerStatus(user) {
    document.getElementById("playerName").textContent = user.username;
    document.getElementById("playerCharacter").textContent = user.character;
    document.getElementById("playerLevel").textContent = Math.floor(user.xp / 100) + 1;
    document.getElementById("playerXP").textContent = `${user.xp % 100} / 100`;
    document.getElementById("playerToken").textContent = user.token;
    document.getElementById("playerLives").textContent = user.lives;
    document.getElementById("playerBadges").textContent = user.badges.join(", ");
}
