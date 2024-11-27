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
