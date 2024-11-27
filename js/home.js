let isRegisterMode = false; // Default: Login Mode

// Ganti antara Login dan Daftar
function toggleAuthMode() {
    const authButton = document.getElementById("authButton");
    const toggleText = document.getElementById("toggleAuth");
    const title = document.querySelector(".auth-card h2");

    isRegisterMode = !isRegisterMode;

    if (isRegisterMode) {
        title.textContent = "Daftar Akun";
        authButton.textContent = "Daftar";
        toggleText.innerHTML = `Sudah punya akun? <span onclick="toggleAuthMode()">Masuk di sini</span>`;
    } else {
        title.textContent = "Masuk Akun";
        authButton.textContent = "Masuk";
        toggleText.innerHTML = `Belum punya akun? <span onclick="toggleAuthMode()">Daftar di sini</span>`;
    }
}

// Fungsi untuk Simpan Pengguna Baru
function saveNewUser(username, password) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.push({ username, password, score: 0, character: null });
    localStorage.setItem("users", JSON.stringify(users));
}

// Fungsi untuk Cek Login
function loginUser(username, password) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    return users.find(user => user.username === username && user.password === password);
}

// Fungsi untuk Redirect Berdasarkan Karakter
function redirectToNextStep(user) {
    if (user.character) {
        // Jika karakter sudah dipilih, langsung ke gameplay
        alert(`Selamat datang kembali, ${user.username} dengan karakter ${user.character}!`);
        window.location.href = "gameplay.html";
    } else {
        // Jika belum memilih karakter, arahkan ke character.html
        alert(`Selamat datang, ${user.username}! Silakan pilih karakter.`);
        window.location.href = "character.html";
    }
}

// Submit Form
document.getElementById("authForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !password) {
        alert("Nama pengguna dan kata sandi tidak boleh kosong!");
        return;
    }

    if (isRegisterMode) {
        // Proses Daftar
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const existingUser = users.find(user => user.username === username);

        if (existingUser) {
            alert("Nama pengguna sudah terdaftar! Silakan login.");
            return;
        }

        saveNewUser(username, password);
        alert("Pendaftaran berhasil! Silakan login.");
        toggleAuthMode(); // Kembali ke mode login
    } else {
        // Proses Login
        const user = loginUser(username, password);

        if (user) {
            localStorage.setItem("currentUser", JSON.stringify(user));
            redirectToNextStep(user); // Arahkan sesuai karakter
        } else {
            alert("Nama pengguna atau kata sandi salah!");
        }
    }
});
