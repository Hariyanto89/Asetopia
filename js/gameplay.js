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
                        {
                id: 1,
                question: "Berapa jumlah sekolah di Merigi?",
                options: ["12", "15", "18"],
                answer: "15",
                xp: 20,
                token: 10
            },
            {
                id: 2,
                question: "Apa alat utama yang digunakan di Merigi?",
                options: ["Cangkul", "Traktor", "Parang"],
                answer: "Cangkul",
                xp: 30,
                token: 20
            },
            {
                id: 3,
                question: "Apa tujuan utama dari pengelolaan barang milik daerah (BMD)?",
                options: [
                    "Untuk meningkatkan pendapatan pajak",
                    "Untuk mengelola dan memanfaatkan aset secara efisien",
                    "Untuk mengurangi pengeluaran daerah"
                ],
                answer: "Untuk mengelola dan memanfaatkan aset secara efisien",
                xp: 25,
                token: 15
            },
            {
                id: 4,
                question: "Barang milik daerah yang tidak digunakan harus:",
                options: [
                    "Dibiarkan sampai ada keperluan",
                    "Dijual secara langsung",
                    "Dioptimalkan pemanfaatannya atau dijual melalui mekanisme lelang"
                ],
                answer: "Dioptimalkan pemanfaatannya atau dijual melalui mekanisasi lelang",
                xp: 30,
                token: 20
            },
            {
                id: 5,
                question: "Apa pengertian inventarisasi dalam Permendagri No. 19 Tahun 2016?",
                options: [
                    "Pencatatan seluruh barang milik daerah yang digunakan oleh pemerintah",
                    "Penghapusan barang yang sudah tidak dipakai",
                    "Perencanaan pengadaan aset baru"
                ],
                answer: "Pencatatan seluruh barang milik daerah yang digunakan oleh pemerintah",
                xp: 20,
                token: 15
            },
            {
                id: 6,
                question: "Apa fungsi utama aplikasi DIPAYANG?",
                options: [
                    "Meningkatkan pencatatan manual",
                    "Mengatur keuangan daerah",
                    "Pencatatan, penatausahaan, dan pelaporan aset daerah"
                ],
                answer: "Pencatatan, penatausahaan, dan pelaporan aset daerah",
                xp: 20,
                token: 15
            },
            {
                id: 7,
                question: "Siapa penggagas utama aplikasi DIPAYANG?",
                options: [
                    "Herwin Noviansyah",
                    "Robby Kurniawan J",
                    "Kepala Dinas Keuangan"
                ],
                answer: "Herwin Noviansyah",
                xp: 15,
                token: 10
            },
            {
                id: 8,
                question: "Siapa developer utama aplikasi DIPAYANG?",
                options: [
                    "Hariyanto",
                    "Herwin Noviansyah",
                    "Robby Kurniawan J"
                ],
                answer: "Hariyanto",
                xp: 20,
                token: 15
            },
            {
                id: 9,
                question: "Apa metode utama untuk menilai aset daerah?",
                options: [
                    "Inventarisasi manual",
                    "Sistem valuasi berdasarkan pasar",
                    "Menggunakan penilaian pemerintah"
                ],
                answer: "Sistem valuasi berdasarkan pasar",
                xp: 25,
                token: 20
            },
            {
                id: 10,
                question: "Apa tujuan utama dari pemeliharaan aset pertanian?",
                options: [
                    "Memaksimalkan hasil panen",
                    "Meningkatkan harga jual aset",
                    "Menjaga kualitas dan nilai ekonomi aset"
                ],
                answer: "Menjaga kualitas dan nilai ekonomi aset",
                xp: 30,
                token: 25
            },
            {
                id: 11,
                question: "Berapa jumlah desa di Ujan Mas?",
                options: ["10", "12", "14"],
                answer: "12",
                xp: 20,
                token: 15
            },
            {
                id: 12,
                question: "Apa potensi utama di Ujan Mas?",
                options: ["Kopi", "Teh", "Kelapa Sawit"],
                answer: "Kopi",
                xp: 25,
                token: 25
            },
            {
                id: 13,
                question: "Dalam kasus aset pertanian rusak, apa langkah pertama yang dilakukan?",
                options: [
                    "Melakukan penghapusan langsung",
                    "Mengevaluasi dan memperbaiki aset",
                    "Mengganti aset baru"
                ],
                answer: "Mengevaluasi dan memperbaiki aset",
                xp: 20,
                token: 15
            },
            {
                id: 14,
                question: "Aset tidak bergerak seperti tanah di kecamatan Merigi harus:",
                options: [
                    "Segera dijual untuk dana tambahan",
                    "Diinventarisasi dan dimanfaatkan sesuai kebutuhan",
                    "Tidak perlu dioptimalkan"
                ],
                answer: "Diinventarisasi dan dimanfaatkan sesuai kebutuhan",
                xp: 30,
                token: 25
            },
            {
                id: 15,
                question: "Apa peran utama Herwin Noviansyah dalam aplikasi DIPAYANG?",
                options: [
                    "Pengembangan teknis",
                    "Kepala Bidang Aset dan penggagas ide",
                    "Pelaksanaan pelaporan manual"
                ],
                answer: "Kepala Bidang Aset dan penggagas ide",
                xp: 15,
                token: 10
            },
            {
                id: 16,
                question: "Berapa jarak antara inventarisasi ulang aset?",
                options: ["1 tahun", "5 tahun", "3 tahun"],
                answer: "5 tahun",
                xp: 25,
                token: 20
            },
            {
                id: 17,
                question: "Apa tujuan optimalisasi lahan di Merigi?",
                options: [
                    "Mengurangi harga pasar aset",
                    "Menambah anggaran pemerintah",
                    "Meningkatkan hasil produksi pertanian"
                ],
                answer: "Meningkatkan hasil produksi pertanian",
                xp: 30,
                token: 25
            },
            {
                id: 18,
                question: "Siapa asisten UX aplikasi DIPAYANG?",
                options: ["Herwin Noviansyah", "Robby Kurniawan J", "Hariyanto"],
                answer: "Robby Kurniawan J",
                xp: 15,
                token: 10
            },
            {
                id: 19,
                question: "Apa saja fitur unggulan aplikasi DIPAYANG?",
                options: [
                    "Pencatatan manual",
                    "Pelaporan otomatis dan penatausahaan digital",
                    "Sistem penghapusan aset yang mudah"
                ],
                answer: "Pelaporan otomatis dan penatausahaan digital",
                xp: 20,
                token: 15
            },
            {
                id: 20,
                question: "Aset pertanian seperti irigasi di kecamatan Merigi harus:",
                options: [
                    "Diserahkan kepada pihak swasta",
                    "Dimanfaatkan untuk kepentingan masyarakat",
                    "Dijadikan sebagai aset cadangan"
                ],
                answer: "Dimanfaatkan untuk kepentingan masyarakat",
                xp: 25,
                token: 20
            },
            {
                id: 21,
                question: "Dalam kasus penghapusan aset, langkah yang harus diambil adalah:",
                options: [
                    "Melakukan penjualan langsung",
                    "Mekanisme lelang sesuai peraturan",
                    "Mengabaikan aset tersebut"
                ],
                answer: "Mekanisme lelang sesuai peraturan",
                xp: 30,
                token: 20
            },
            {
                id: 22,
                question: "Apa dasar hukum utama untuk pengelolaan aset daerah?",
                options: [
                    "Permendagri No. 19 Tahun 2016",
                    "Undang-Undang No. 12 Tahun 2020",
                    "Keputusan Presiden"
                ],
                answer: "Permendagri No. 19 Tahun 2016",
                xp: 20,
                token: 15
            },
            {
                id: 23,
                question: "Apa tujuan utama inventarisasi barang milik daerah?",
                options: [
                    "Mengurangi jumlah aset",
                    "Meningkatkan efisiensi pengelolaan",
                    "Meningkatkan harga aset"
                ],
                answer: "Meningkatkan efisiensi pengelolaan",
                xp: 25,
                token: 20
            },
            {
                id: 24,
                question: "Dalam pengelolaan aset pertanian, apa yang harus diperhatikan?",
                options: [
                    "Nilai pasar",
                    "Nilai manfaat jangka panjang",
                    "Nilai jual cepat"
                ],
                answer: "Nilai manfaat jangka panjang",
                xp: 30,
                token: 25
            },
            {
                id: 25,
                question: "Siapa yang bertanggung jawab atas validasi aset daerah?",
                options: [
                    "Kepala Bidang Aset",
                    "Kepala Desa",
                    "Kepala Seksi Pelaporan"
                ],
                answer: "Kepala Bidang Aset",
                xp: 15,
                token: 10
            },
            {
                id: 26,
                question: "Apa yang harus dilakukan jika ditemukan aset yang tidak tercatat?",
                options: [
                    "Langsung digunakan",
                    "Dihapus dari sistem",
                    "Dilakukan inventarisasi ulang"
                ],
                answer: "Dilakukan inventarisasi ulang",
                xp: 20,
                token: 15
            },
            {
                id: 27,
                question: "Apa manfaat utama aplikasi DIPAYANG?",
                options: [
                    "Meningkatkan pendapatan daerah",
                    "Efisiensi dan transparansi dalam pengelolaan aset",
                    "Mengurangi jumlah aset daerah"
                ],
                answer: "Efisiensi dan transparansi dalam pengelolaan aset",
                xp: 30,
                token: 25
            },
            {
                id: 28,
                question: "Bagaimana cara menentukan nilai aset dalam kasus penghapusan?",
                options: [
                    "Dengan penilaian pihak independen",
                    "Dengan harga pasar yang ditentukan sendiri",
                    "Dengan keputusan kepala dinas"
                ],
                answer: "Dengan penilaian pihak independen",
                xp: 25,
                token: 20
            },
            {
                id: 29,
                question: "Dalam kasus irigasi di Merigi yang rusak, langkah pertama adalah:",
                options: [
                    "Segera mengganti dengan yang baru",
                    "Melakukan evaluasi untuk perbaikan",
                    "Mengabaikan kerusakan"
                ],
                answer: "Melakukan evaluasi untuk perbaikan",
                xp: 20,
                token: 15
            },
            {
                id: 30,
                question: "Apa prinsip utama dalam pengelolaan barang milik daerah?",
                options: [
                    "Transparansi, efisiensi, dan efektivitas",
                    "Efisiensi dan keuntungan",
                    "Keuntungan dan penghematan biaya"
                ],
                answer: "Transparansi, efisiensi, dan efektivitas",
                xp: 25,
                token: 20
            },
            {
                id: 31,
                question: "Berapa jumlah aset pertanian yang dimanfaatkan di Merigi?",
                options: ["10", "15", "20"],
                answer: "15",
                xp: 20,
                token: 10
            },
            {
                id: 32,
                question: "Apa yang dimaksud dengan pencatatan aset dalam DIPAYANG?",
                options: [
                    "Penghapusan aset secara otomatis",
                    "Dokumentasi digital dari aset daerah",
                    "Pelaporan manual aset"
                ],
                answer: "Dokumentasi digital dari aset daerah",
                xp: 20,
                token: 15
            },
            {
                id: 33,
                question: "Apa tindakan jika aset di Merigi tidak dimanfaatkan?",
                options: [
                    "Segera dijual",
                    "Dilakukan optimalisasi pemanfaatan",
                    "Disimpan tanpa digunakan"
                ],
                answer: "Dilakukan optimalisasi pemanfaatan",
                xp: 30,
                token: 25
            },
            {
                id: 34,
                question: "Apa peran utama Robby Kurniawan J di aplikasi DIPAYANG?",
                options: [
                    "Asisten UX",
                    "Pengembang utama",
                    "Kepala Bidang Aset"
                ],
                answer: "Asisten UX",
                xp: 15,
                token: 10
            },
            {
                id: 35,
                question: "Apa yang harus dilakukan jika ditemukan aset ganda di pencatatan DIPAYANG?",
                options: [
                    "Menghapus semua data aset",
                    "Melakukan validasi dan konsolidasi data",
                    "Mengabaikan aset ganda"
                ],
                answer: "Melakukan validasi dan konsolidasi data",
                xp: 25,
                token: 20
            }
                ],
                completed: false
            },
    {
        kecamatan: "Ujan Mas",
        unlocked: false,
        tasks: [
            {
                id: 3,
                question: "Berapa jumlah desa di Ujan Mas?",
                options: ["10", "12", "14"],
                answer: "12",
                xp: 20,
                token: 15
            },
            {
                id: 4,
                question: "Apa potensi utama di Ujan Mas?",
                options: ["Kopi", "Teh", "Kelapa Sawit"],
                answer: "Kopi",
                xp: 25,
                token: 25
            }
        ],
        completed: false
    }
];

// Data Badge
const badgeData = [
    {
        kecamatan: "Merigi",
        image: "assets/images/badges/merigi_badge.png",
        description: "Bronze Badge Agro Visionary: Pengelolaan aset sukses!"
    },
    {
        kecamatan: "Ujan Mas",
        image: "assets/images/badges/ujanmas_badge.png",
        description: "Badge Kecamatan Ujan Mas: Pengelolaan aset sukses!"
    }
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
        ctx.fillText(playerName, canvas.width / 2, canvas.height - 60);
        ctx.fillText(`Level: ${playerLevel}`, canvas.width / 2, canvas.height - 40);
        ctx.fillText(`Tanggal: ${dateObtained}`, canvas.width / 2, canvas.height - 20);
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

// Fungsi Menampilkan Pertanyaan untuk Kecamatan
function displayQuestionsForKecamatan(task) {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = `<h3>Tantangan di Kecamatan ${task.kecamatan}</h3>`;

    task.tasks.forEach(q => {
        const questionItem = document.createElement("div");
        questionItem.className = "question-item";
        questionItem.innerHTML = `
            <p>${q.question}</p>
            <div>
                ${q.options
                    .map(
                        option => `
                    <label>
                        <input type="radio" name="question-${q.id}" value="${option}"> ${option}
                    </label>
                `
                    )
                    .join("")}
            </div>
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
        const selectedOption = document.querySelector(`input[name="question-${q.id}"]:checked`);
        if (!selectedOption || selectedOption.value !== q.answer) {
            allCorrect = false;
        } else {
            currentUser.xp = (currentUser.xp || 0) + q.xp;
            currentUser.token = (currentUser.token || 0) + q.token;
        }
    });

    if (allCorrect) {
        alert("Tugas selesai! Anda mendapatkan XP dan Token.");
        task.completed = true;

        const nextTask = kecamatanTasks[kecamatanTasks.indexOf(task) + 1];
        if (nextTask) nextTask.unlocked = true;

        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        displayPlayerData(currentUser);
        displayTasksByKecamatan(currentUser);
    } else {
        alert("Beberapa jawaban salah. Silakan coba lagi.");
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
            <td>${user.token || 0}</td>
        `;
        leaderboardData.appendChild(row);
    });
}
