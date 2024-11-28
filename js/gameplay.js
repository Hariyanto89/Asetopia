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
            { id: 1, question: "Berapa jumlah sekolah di Merigi?", answer: "15", xp: 20, token: 10 },
            { id: 2, question: "Apa alat utama yang digunakan di Merigi?", answer: "cangkul", xp: 30, token: 20 }
        ],
        completed: false
    },
    {
        kecamatan: "Ujan Mas",
        unlocked: false,
        tasks: [
            { id: 3, question: "Berapa jumlah desa di Ujan Mas?", answer: "12", xp: 20, token: 15 },
            { id: 4, question: "Apa potensi utama di Ujan Mas?", answer: "kopi", xp: 25, token: 25 }
        ],
        completed: false
    },
];

// Data Badge
const badgeData = [
    {
        kecamatan: "Merigi",
        image: "assets/images/badges/merigi_badge.png",
        description: "Badge Kecamatan Merigi: Pengelolaan aset sukses!"
    },
    {
        kecamatan: "Ujan Mas",
        image: "assets/images/badges/ujanmas_badge.png",
        description: "Badge Kecamatan Ujan Mas: Pengelolaan aset sukses!"
    },
];

// Fungsi Menampilkan Data Pemain
function displayPlayerData(user) {
    document.getElementById("playerName").textContent = user.username;
    document.getElementById("playerCharacter").textContent = user.character || "[Belum Dipilih]";
    document.getElementById("playerLevel").textContent = Math.floor((user.xp || 0) / 100) + 1;
    document.getElementById("playerXP").textContent = `${user.xp || 0} / 100`;
    document.getElementById("playerToken").textContent = user.token || 0;
}

// Fungsi Menampilkan Badge
function displayBadges(user) {
    const badgeContainer = document.getElementById("badgeList");
    badgeContainer.innerHTML = "";

    if (!user.badges || user.badges.length === 0) {
        badgeContainer.innerHTML = "<p>Belum ada badge yang diperoleh.</p>";
        return;
    }

    user.badges.forEach(badge => {
        const badgeItem = document.createElement("div");
        badgeItem.className = "badge-item";
        badgeItem.innerHTML = `
            <img src="${badge.image}" alt="${badge.kecamatan} Badge" class="clickable-badge">
            <p>${badge.description}</p>
        `;
        badgeItem.onclick = () => {
            drawBadgeWithName(badge.image, user.username, badge.level, badge.dateObtained);
        };
        badgeContainer.appendChild(badgeItem);
    });
}

// Fungsi Menggambar Badge di Canvas
function drawBadgeWithName(badgeImageSrc, playerName, playerLevel, dateObtained) {
    const canvas = document.getElementById("badgeCanvas");
    const ctx = canvas.getContext("2d");

    const badgeImage = new Image();
    badgeImage.crossOrigin = "anonymous";
    badgeImage.src = badgeImageSrc;

    badgeImage.onload = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(badgeImage, 0, 0, canvas.width, canvas.height);

        ctx.font = "bold 16px Arial";
        ctx.fillStyle = "#FFA500";
        ctx.textAlign = "center";
        ctx.fillText(playerName, canvas.width / 2, canvas.height - 60); // Nama
        ctx.fillText(`Level: ${playerLevel}`, canvas.width / 2, canvas.height - 40); // Level
        ctx.fillText(`Tanggal: ${dateObtained}`, canvas.width / 2, canvas.height - 20); // Tanggal
    };
}

// Fungsi Mengunduh Badge
function exportBadge() {
    const canvas = document.getElementById("badgeCanvas");
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
        alert(`Kecamatan ${task.kecamatan} masih terkunci.`);
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

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    task.tasks.forEach(q => {
        const userAnswer = document.getElementById(`answer-${q.id}`).value.trim().toLowerCase();
        if (userAnswer !== q.answer.toLowerCase()) {
            allCorrect = false;
        } else {
            currentUser.xp = (currentUser.xp || 0) + q.xp;
            currentUser.token = (currentUser.token || 0) + q.token;
        }
    });

    if (allCorrect) {
        alert(`Tugas selesai! Anda mendapatkan XP dan Token.`);
        task.completed = true;

        const nextTask = kecamatanTasks[kecamatanTasks.indexOf(task) + 1];
        if (nextTask) nextTask.unlocked = true;

        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        awardBadge(task.kecamatan);
        displayPlayerData(currentUser);
        displayTasksByKecamatan(currentUser);
    } else {
        alert("Jawaban Anda belum benar. Silakan coba lagi.");
    }
}

// Fungsi Memberikan Badge
function awardBadge(kecamatanName) {
    const badge = badgeData.find(b => b.kecamatan === kecamatanName);
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!badge || !currentUser) return;

    if (!currentUser.badges) currentUser.badges = [];

    // Cek apakah badge sudah diperoleh
    if (currentUser.badges.find(b => b.kecamatan === kecamatanName)) {
        alert("Anda sudah memiliki badge ini.");
        return;
    }

    const dateObtained = new Date().toLocaleDateString();
    currentUser.badges.push({
        kecamatan: kecamatanName,
        image: badge.image,
        description: badge.description,
        level: Math.floor((currentUser.xp || 0) / 100) + 1,
        dateObtained,
    });

    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    alert(`Selamat! Anda mendapatkan badge untuk Kecamatan ${kecamatanName}.`);
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
