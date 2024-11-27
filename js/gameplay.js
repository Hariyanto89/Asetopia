document.addEventListener("DOMContentLoaded", function () {
    // Ambil data pengguna dari LocalStorage
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
        alert("Anda belum login! Kembali ke halaman login.");
        window.location.href = "index.html";
        return;
    }

    // Tampilkan data pengguna di dashboard
    displayPlayerData(currentUser);

    // Tampilkan peta interaktif
    initializeMap();

    // Tampilkan tugas pengelolaan aset
    displayTasks();
});

// Fungsi Menampilkan Data Pemain
function displayPlayerData(user) {
    document.getElementById("playerName").textContent = user.username;
    document.getElementById("playerCharacter").textContent = user.character || "[Belum Dipilih]";
    document.getElementById("playerLevel").textContent = Math.floor(user.score / 100) + 1;
    document.getElementById("playerScore").textContent = user.score;
}

// Fungsi Inisialisasi Peta Interaktif
function initializeMap() {
    const mapContainer = document.getElementById("kepahiangMap");

    // Placeholder untuk peta (gunakan gambar atau Leaflet.js)
    mapContainer.innerHTML = "<p>Peta Kecamatan akan ditampilkan di sini.</p>";

    // Jika menggunakan Leaflet.js, tambahkan logika berikut:
    /*
    const map = L.map('kepahiangMap').setView([-3.6403, 102.6159], 12); // Koordinat Kepahiang
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Tambahkan marker atau layer untuk kecamatan
    L.marker([-3.6403, 102.6159]).addTo(map)
        .bindPopup('Kecamatan Kepahiang')
        .openPopup();
    */
}

// Fungsi Menampilkan Tugas Dinamis
function displayTasks() {
    const taskList = document.getElementById("taskList");

    // Contoh tugas dinamis
    const tasks = [
        { title: "Periksa aset di Kecamatan Kabawetan", completed: false },
        { title: "Renovasi jalan utama di Kecamatan Seberang Musi", completed: false },
    ];

    if (tasks.length === 0) {
        taskList.innerHTML = "<p>Tidak ada tugas saat ini.</p>";
        return;
    }

    // Render daftar tugas
    const ul = document.createElement("ul");
    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.textContent = task.title;
        li.style.textDecoration = task.completed ? "line-through" : "none";
        li.addEventListener("click", function () {
            task.completed = !task.completed;
            li.style.textDecoration = task.completed ? "line-through" : "none";
            alert(`Tugas "${task.title}" telah ${task.completed ? "diselesaikan" : "dibatalkan"}.`);
        });
        ul.appendChild(li);
    });
    taskList.innerHTML = ""; // Kosongkan elemen sebelum render
    taskList.appendChild(ul);
}
