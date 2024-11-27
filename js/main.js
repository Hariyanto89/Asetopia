// Global Variables
let selectedCharacter = null;

// Function to Select Character
function selectCharacter(characterName) {
    selectedCharacter = characterName;
    alert(`Anda telah memilih ${characterName}!`);
}

// Function to Start Game
function startGame() {
    if (!selectedCharacter) {
        alert("Pilih karakter terlebih dahulu sebelum memulai permainan!");
        return;
    }
    alert(`Permainan dimulai dengan karakter ${selectedCharacter}. Selamat bermain!`);
    // Logic to transition to gameplay screen
}
