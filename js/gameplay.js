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

// Fungsi Menampilkan Data Pemain
function displayPlayerData(user) {
    document.getElementById("playerName").textContent = user.username;
    document.getElementById("playerCharacter").textContent = user.character || "[Belum Dipilih]";
    document.getElementById("playerLevel").textContent = Math.floor(user.token / 100) + 1;
    document.getElementById("playerToken").textContent = user.token || 0;
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
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
        alert(`Badge untuk ${kecamatanName} diperoleh! Password: ${password}`);
        currentUser.token += 50; // Tambahkan token
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        displayPlayerData(currentUser);
    }
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
            <td>${user.token}</td>
        `;
        leaderboardData.appendChild(row);
    });
}
