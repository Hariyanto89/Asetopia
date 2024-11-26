document.addEventListener("DOMContentLoaded", function () {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
        alert("Anda belum login! Kembali ke halaman login.");
        window.location.href = "index.html";
        return;
    }

    // Tampilkan data pengguna dan badge
    displayPlayerData(currentUser);
    displayBadges(currentUser);

    // Inisialisasi Peta
    initializeMap();

    // Tampilkan tugas pertama berdasarkan urutan kecamatan
    displayTasksByKecamatan(currentUser);

    // Tampilkan leaderboard
    displayLeaderboard();
});

// Data Tugas Per Kecamatan
const kecamatanTasks = [
    {
        kecamatan: "Merigi",
        unlocked: true,
        tasks: [
            { id: 1, question: "Nomor berapa Peraturan Menteri Dalam Negeri yang mengatur Pengelolaan Barang Milik Daerah yang dikeluarkan tahun 2016?", answer: "16" },
            { id: 2, question: "Siapa nama kepala bidang aset Badan Keuangan Daerah Kabupaten Kepahiang?", answer: "Herwin Noviansyah" }
        ],
        clue: "ASRI",
        password: "MERIGI2024",
        completed: false
    },
    {
        kecamatan: "Ujan Mas",
        unlocked: false,
        tasks: [
            { id: 3, question: "Siapa laki laki yang paling tampan di Bidang Aset Badan Keuangan Daerah Kabupaten Kepahiang?", answer: "Hariyanto" },
            { id: 4, question: "Siapa asisten UX pada pembuatan aplikasi Digitalisasi Pengamanan Aset Kepahiang?", answer: "Robby Kurniawan J" }
        ],
        clue: "SEJAHTERA",
        password: "UJANMAS2024",
        completed: false
    },
    // Tambahkan kecamatan lainnya...
];

// Data Badge
const badgeData = [
    {
        kecamatan: "Merigi",
        image: "assets/images/badges/merigi_badge.png",
        description: "Badge Kecamatan Merigi: Pengelolaan aset sukses!",
    },
    {
        kecamatan: "Ujan Mas",
        image: "assets/images/badges/ujanmas_badge.png",
        description: "Badge Kecamatan Ujan Mas: Pengelolaan aset sukses!",
    },
    // Tambahkan kecamatan lainnya...
];

// Fungsi Menampilkan Data Pemain
function displayPlayerData(user) {
    document.getElementById("playerName").textContent = user.username;
    document.getElementById("playerCharacter").textContent = user.character || "[Belum Dipilih]";
    document.getElementById("playerLevel").textContent = Math.floor((user.token || 0) / 100) + 1;
    document.getElementById("playerToken").textContent = user.token || 0;
}

// Fungsi Menampilkan Badge
function displayBadges(user) {
    const badgeContainer = document.getElementById("badgeList");
    badgeContainer.innerHTML = ""; // Kosongkan container sebelum render

    if (!user.badges || user.badges.length === 0) {
        badgeContainer.innerHTML = "<p>Belum ada badge yang diperoleh.</p>";
        return;
    }

    user.badges.forEach(badge => {
        const badgeItem = document.createElement("div");
        badgeItem.className = "badge-item";
        badgeItem.innerHTML = `
            <img src="${badge.image}" alt="${badge.kecamatan} Badge">
            <p>${badge.description}</p>
        `;
        badgeContainer.appendChild(badgeItem);
    });
}

// Fungsi Menggambar Badge di Canvas
function drawBadgeWithName(badgeImageSrc, playerName) {
    const canvas = document.getElementById("badgeCanvas");
    const ctx = canvas.getContext("2d");

    const badgeImage = new Image();
    badgeImage.crossOrigin = "anonymous"; // Mendukung gambar lintas domain
    badgeImage.src = badgeImageSrc;

    badgeImage.onload = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Bersihkan canvas
        ctx.drawImage(badgeImage, 0, 0, canvas.width, canvas.height);

        // Tambahkan nama pemain
        ctx.font = "bold 20px Arial";
        ctx.fillStyle = "#FFA500"; // Warna teks
        ctx.textAlign = "center";
        ctx.fillText(playerName, canvas.width / 2, canvas.height - 20); // Teks di bawah badge
    };

    badgeImage.onerror = function () {
        alert("Gagal memuat gambar badge. Pastikan URL gambar benar.");
    };
}

// Fungsi Mengunduh Badge
function exportBadge() {
    const canvas = document.getElementById("badgeCanvas");
    const ctx = canvas.getContext("2d");

    if (!ctx.getImageData(0, 0, canvas.width, canvas.height).data.some(channel => channel !== 0)) {
        alert("Canvas kosong. Pastikan gambar badge berhasil dimuat.");
        return;
    }

    const link = document.createElement("a");
    link.download = "badge_with_name.png";
    link.href = canvas.toDataURL();
    link.click();
}

document.getElementById("downloadBadgeButton").addEventListener("click", exportBadge);

// Fungsi Inisialisasi Peta
function initializeMap() {
    const map = L.map('kepahiangMap').setView([-3.6403, 102.6159], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    kecamatanTasks.forEach((task, index) => {
        L.marker([-3.6403 + index * 0.01, 102.6159 + index * 0.01])
            .addTo(map)
            .bindPopup(`<strong>${task.kecamatan}</strong><br>Status: ${task.unlocked ? "Terbuka" : "Terkunci"}`)
            .on('click', () => onKecamatanClick(task));
    });
}

// Fungsi Klik Kecamatan
function onKecamatanClick(task) {
    if (!task.unlocked) {
        alert(`Kecamatan ${task.kecamatan} masih terkunci. Selesaikan kecamatan sebelumnya terlebih dahulu.`);
        return;
    }

    displayQuestionsForKecamatan(task);
}

// Fungsi Menampilkan Tugas Kecamatan
function displayTasksByKecamatan(user) {
    const currentTask = kecamatanTasks.find(task => task.unlocked && !task.completed);
    if (!currentTask) {
        document.getElementById("taskList").innerHTML = "<p>Tidak ada tugas aktif saat ini.</p>";
        return;
    }

    displayQuestionsForKecamatan(currentTask);
}

// Fungsi Menampilkan Pertanyaan untuk Kecamatan
function displayQuestionsForKecamatan(task) {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = `<h3>Tantangan di Kecamatan ${task.kecamatan}</h3>`;

    task.tasks.forEach(q => {
        const questionItem = document.createElement("div");
        questionItem.className = "question-item";
        questionItem.innerHTML = `
            <p>${q.question}</p>
            <input type="text" id="answer-${q.id}" placeholder="Jawaban Anda">
        `;
        taskList.appendChild(questionItem);
    });

    const submitButton = document.createElement("button");
    submitButton.textContent = "Submit Jawaban";
    submitButton.onclick = () => checkAnswers(task);
    taskList.appendChild(submitButton);
}

// Fungsi Memeriksa Jawaban
function checkAnswers(task) {
    let allCorrect = true;

    task.tasks.forEach(q => {
        const userAnswer = document.getElementById(`answer-${q.id}`).value.trim().toLowerCase();
        if (userAnswer !== q.answer.toLowerCase()) {
            allCorrect = false;
        }
    });

    if (allCorrect) {
        alert(`Selamat! Anda menemukan clue: ${task.clue}`);
        task.completed = true;
        awardBadge(task.kecamatan, task.password);

        const nextTask = kecamatanTasks[kecamatanTasks.indexOf(task) + 1];
        if (nextTask) nextTask.unlocked = true;

        displayTasksByKecamatan(JSON.parse(localStorage.getItem("currentUser")));
    } else {
        alert("Jawaban Anda belum benar. Silakan coba lagi.");
    }
}

// Fungsi Memberikan Badge dan Token
function awardBadge(kecamatanName, password) {
    const badge = badgeData.find(b => b.kecamatan === kecamatanName);
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!badge || !currentUser) return;

    if (!currentUser.badges) currentUser.badges = [];
    currentUser.badges.push({
        kecamatan: kecamatanName,
        image: badge.image,
        description: badge.description,
    });

    currentUser.token = (currentUser.token || 0) + 50;
    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    alert(`Selamat! Anda mendapatkan badge untuk Kecamatan ${kecamatanName}. Password: ${password}`);
    drawBadgeWithName(badge.image, currentUser.username);
    displayPlayerData(currentUser);
    displayBadges(currentUser);
}

// Fungsi Menampilkan Leaderboard
function displayLeaderboard() {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const sortedUsers = users.sort((a, b) => b.token - a.token);

    const leaderboardData = document.getElementById("leaderboardData");
    leaderboardData.innerHTML = "";

    sortedUsers.forEach((user, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${user.username}</td>
            <td>${user.token || 0}</td>
        `;
        leaderboardData.appendChild(row);
    });
}
