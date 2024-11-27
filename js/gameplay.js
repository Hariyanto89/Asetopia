document.addEventListener("DOMContentLoaded", function () {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
        alert("Anda belum login! Kembali ke halaman login.");
        window.location.href = "index.html";
        return;
    }

    // Tampilkan data pengguna
    displayPlayerData(currentUser);

    // Inisialisasi Peta
    initializeMap();

    // Tampilkan tugas
    displayTasks(currentUser);
});

// Fungsi Menampilkan Data Pemain
function displayPlayerData(user) {
    document.getElementById("playerName").textContent = user.username;
    document.getElementById("playerCharacter").textContent = user.character || "[Belum Dipilih]";
    document.getElementById("playerLevel").textContent = Math.floor(user.token / 100) + 1;
    document.getElementById("playerToken").textContent = user.token || 0;
}

// Fungsi Inisialisasi Peta
function initializeMap() {
    const map = L.map('kepahiangMap').setView([-3.6403, 102.6159], 12); // Koordinat Kepahiang

    // Tambahkan tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Marker Kecamatan
    const kecamatanData = [
        { name: "Kecamatan Kabawetan", lat: -3.5603, lng: 102.7302 },
        { name: "Kecamatan Seberang Musi", lat: -3.6895, lng: 102.5975 },
        { name: "Kecamatan Kepahiang", lat: -3.6403, lng: 102.6159 },
    ];

    kecamatanData.forEach(kec => {
        L.marker([kec.lat, kec.lng])
            .addTo(map)
            .bindPopup(`<strong>${kec.name}</strong><br>Tugas tersedia: 3`);
    });
}

// Fungsi Menampilkan Tugas
function displayTasks(user) {
    const taskList = document.getElementById("taskList");
    const tasks = [
        { title: "Periksa aset di Kecamatan Kabawetan", reward: 50, completed: false },
        { title: "Renovasi jalan utama di Kecamatan Seberang Musi", reward: 100, completed: false },
    ];

    if (tasks.length === 0) {
        taskList.innerHTML = "<p>Tidak ada tugas saat ini.</p>";
        return;
    }

    const ul = document.createElement("ul");
    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.textContent = `${task.title} (Reward: ${task.reward} DIPAYANG TOKEN)`;
        li.style.textDecoration = task.completed ? "line-through" : "none";
        li.addEventListener("click", function () {
            if (!task.completed) {
                user.token += task.reward;
                task.completed = true;
                localStorage.setItem("currentUser", JSON.stringify(user));
                displayPlayerData(user);
                li.style.textDecoration = "line-through";
                alert(`Tugas "${task.title}" selesai! Anda mendapatkan ${task.reward} DIPAYANG TOKEN.`);
            } else {
                alert(`Tugas "${task.title}" sudah selesai sebelumnya.`);
            }
        });
        ul.appendChild(li);
    });

    taskList.innerHTML = ""; // Kosongkan elemen sebelum render
    taskList.appendChild(ul);
}
