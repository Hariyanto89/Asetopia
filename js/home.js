document.addEventListener("DOMContentLoaded", function () {
    // Periksa apakah ada pengguna yang sudah login
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    // Jika ada pengguna yang login
    if (currentUser) {
        if (currentUser.character) {
            // Jika karakter sudah dipilih, langsung ke gameplay
            window.location.href = "gameplay.html";
        } else {
            // Jika belum memilih karakter, arahkan ke character.html
            window.location.href = "character.html";
        }
        return;
    }

    // Mode default adalah Login
    let isRegisterMode = false;

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

    // Fungsi untuk Login
    function loginUser(username, password) {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find(user => user.username === username && user.password === password);

        if (user) {
            localStorage.setItem("currentUser", JSON.stringify(user));
            alert(`Selamat datang, ${username}!`);
            if (user.character) {
                window.location.href = "gameplay.html"; // Jika karakter sudah dipilih
            } else {
                window.location.href = "character.html"; // Jika karakter belum dipilih
            }
        } else {
            alert("Nama pengguna atau kata sandi salah!");
        }
    }

    // Fungsi untuk Daftar
    function registerUser(username, password) {
        let users = JSON.parse(localStorage.getItem("users")) || [];
        if (users.find(user => user.username === username)) {
            alert("Nama pengguna sudah terdaftar!");
            return;
        }

        // Simpan pengguna baru
        const newUser = { username, password, character: null, token: 0 };
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("currentUser", JSON.stringify(newUser)); // Login otomatis
        alert("Pendaftaran berhasil! Silakan pilih karakter.");
        window.location.href = "character.html";
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
            registerUser(username, password); // Daftar
        } else {
            loginUser(username, password); // Login
        }
    });

    // Attach toggleAuthMode ke elemen
    window.toggleAuthMode = toggleAuthMode;
});
