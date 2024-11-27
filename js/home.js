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

// Submit Form
document.getElementById("authForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (isRegisterMode) {
        // Daftar
        let users = JSON.parse(localStorage.getItem("users")) || [];
        if (users.find(user => user.username === username)) {
            alert("Nama pengguna sudah terdaftar!");
            return;
        }
        users.push({ username, password, score: 0 });
        localStorage.setItem("users", JSON.stringify(users));
        alert("Pendaftaran berhasil! Silakan login.");
        toggleAuthMode(); // Kembali ke mode login
    } else {
        // Login
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find(user => user.username === username && user.password === password);
        if (user) {
            alert(`Selamat datang, ${username}!`);
            localStorage.setItem("currentUser", JSON.stringify(user));
            window.location.href = "character.html"; // Arahkan ke halaman karakter
        } else {
            alert("Nama pengguna atau kata sandi salah!");
        }
    }
});
