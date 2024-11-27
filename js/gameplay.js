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
            { id: 1, question: "Berapa jumlah sekolah di Merigi?", answer: "15" },
            { id: 2, question: "Apa alat utama yang digunakan di Merigi?", answer: "cangkul" }
        ],
        clue: "ASRI",
        password: "MERIGI2024",
        completed: false
    },
    {
        kecamatan: "Ujan Mas",
        unlocked: false,
        tasks: [
            { id: 3, question: "Berapa jumlah desa di Ujan Mas?", answer: "12" },
            { id: 4, question: "Apa potensi utama di Ujan Mas?", answer: "kopi" }
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
        image: "assets/badges/merigi_badge.png",
        description: "Badge Kecamatan Merigi: Pengelolaan aset sukses!",
    },
    {
        kecamatan: "Ujan Mas",
        image: "assets/badges/ujanmas_badge.png",
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

// Fungsi Inisialisasi Peta
function initializeMap() {
    const map = L.map('kepahiangMap').setView([-3.6403, 102.6159], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Tambahkan marker untuk setiap kecamatan
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

    task.tasks.forEach((q, index) => {
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

        // Buka kecamatan berikutnya
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

    // Inisialisasi array badges jika belum ada
    if (!currentUser.badges) currentUser.badges = [];
    
    // Tambahkan badge dan token
    currentUser.badges.push({
        kecamatan: kecamatanName,
        image: badge.image,
        description: badge.description,
    });

    currentUser.token = (currentUser.token || 0) + 50; // Tambahkan token
    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    alert(`Selamat! Anda mendapatkan badge untuk Kecamatan ${kecamatanName}. Password: ${password}`);
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
