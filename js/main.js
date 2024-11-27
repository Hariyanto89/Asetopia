// Mock database untuk menyimpan pengguna sementara
const users = [];

// Fungsi Daftar
document.getElementById("registerForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("registerUsername").value;
    const password = document.getElementById("registerPassword").value;

    // Cek jika pengguna sudah ada
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        alert("Nama pengguna sudah terdaftar!");
        return;
    }

    // Tambahkan pengguna baru
    users.push({ username, password, score: 0 });
    alert("Pendaftaran berhasil! Silakan login.");
    console.log(users); // Debugging untuk melihat daftar pengguna
});

// Fungsi Login
document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    // Cek kredensial
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        alert(`Selamat datang, ${username}!`);
        // Simpan data pengguna untuk sesi game
        localStorage.setItem("currentUser", JSON.stringify(user));
        console.log("Login berhasil:", user); // Debugging
    } else {
        alert("Nama pengguna atau kata sandi salah!");
    }
});

// Global Variables
let selectedCharacter = null;
const leaderboardData = [
    { name: "Player1", score: 1500 },
    { name: "Player2", score: 1200 },
    { name: "Player3", score: 800 }
];

// Function to Select Character
function selectCharacter(characterName) {
    selectedCharacter = characterName;
    alert(`Anda telah memilih ${characterName}!`);
}

// Function to Display Leaderboard
function displayLeaderboard() {
    const leaderboardTable = document.getElementById("leaderboardTable");
    let htmlContent = "<table><tr><th>Nama</th><th>Skor</th></tr>";
    leaderboardData.forEach((player) => {
        htmlContent += `<tr><td>${player.name}</td><td>${player.score}</td></tr>`;
    });
    htmlContent += "</table>";
    leaderboardTable.innerHTML = htmlContent;
}

// Initialize Leaderboard on Load
document.addEventListener("DOMContentLoaded", displayLeaderboard);
