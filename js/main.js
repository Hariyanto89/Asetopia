// Fungsi Simpan Data ke LocalStorage
function saveUser(username, password) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    const existingUser = users.find(user => user.username === username);

    if (existingUser) {
        alert("Nama pengguna sudah terdaftar!");
        return false; // Gagal mendaftar
    }

    // Tambahkan pengguna baru
    users.push({ username, password, score: 0 });
    localStorage.setItem("users", JSON.stringify(users));
    return true; // Berhasil mendaftar
}

// Fungsi Daftar
document.getElementById("registerForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const username = document.getElementById("registerUsername").value;
    const password = document.getElementById("registerPassword").value;

    const success = saveUser(username, password);
    if (success) {
        alert("Pendaftaran berhasil! Silakan login.");
        document.getElementById("registerForm").reset(); // Bersihkan form
    }
});

// Fungsi Login
document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Cek kredensial pengguna
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        alert(`Selamat datang, ${username}!`);
        localStorage.setItem("currentUser", JSON.stringify(user)); // Simpan data sesi
        document.getElementById("loginForm").reset(); // Bersihkan form
        window.location.href = "character.html"; // Arahkan ke halaman pemilihan karakter
    } else {
        alert("Nama pengguna atau kata sandi salah!");
    }
});

