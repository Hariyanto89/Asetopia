document.addEventListener("DOMContentLoaded", function () {
    // Ambil data pengguna dari localStorage atau inisialisasi data default
    const currentUser = JSON.parse(localStorage.getItem("currentUser")) || initializeUser();
    const kecamatanData = JSON.parse(localStorage.getItem("kecamatanTasks")) || initializeKecamatanData();

    // Inisialisasi elemen utama
    initializeMarkers(kecamatanData);
    displayPlayerData(currentUser);

    // Simpan data awal ke localStorage
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    localStorage.setItem("kecamatanTasks", JSON.stringify(kecamatanData));
});

// Fungsi inisialisasi pengguna jika data tidak ditemukan
function initializeUser() {
    return {
        username: "User1",
        character: "Bujang Aset",
        xp: 0,
        token: 0,
        lives: 5,
        badges: [],
    };
}

// Fungsi inisialisasi data kecamatan jika tidak ditemukan
function initializeKecamatanData() {
    return [
        {
            kecamatan: "Merigi",
            unlocked: true,
            completed: false,
            lastTaskIndex: 0,
            badge: {
                name: "Bronze Badge Agro Visionary",
                description: "Selesaikan semua tugas di Merigi!",
                image: "assets/images/merigi_badge.png",
            },
            tasks: [
                {
                    id: 1,
                    question: "Dalam kategori apakah traktor dicatat sebagai Barang Milik Daerah (BMD)?",
                    options: ["Peralatan dan Mesin", "Tanah", "Gedung dan Bangunan"],
                    answer: "Peralatan dan Mesin",
                    xp: 25,
                    token: 15,
                },
                {
                    id: 2,
                    question: "Apa langkah yang harus dilakukan terhadap pompa air rusak di Kecamatan Merigi?",
                    options: [
                        "Dilakukan penghapusan aset melalui persetujuan pejabat berwenang",
                        "Dijual langsung kepada masyarakat",
                        "Diberikan kepada kepala desa secara informal",
                    ],
                    answer: "Dilakukan penghapusan aset melalui persetujuan pejabat berwenang",
                    xp: 30,
                    token: 20,
                },
            {
                id: 3,
                question: "Apa tujuan utama dari pengelolaan barang milik daerah (BMD)?",
                options: ["Untuk meningkatkan pendapatan pajak", "Untuk mengelola dan memanfaatkan aset secara efisien", "Untuk mengurangi pengeluaran daerah"],
                answer: "Untuk mengelola dan memanfaatkan aset secara efisien",
                xp: 25,
                token: 15,
            },
            {
                id: 4,
                question: "Barang milik daerah yang tidak digunakan harus?",
                options: ["Dibiarkan sampai ada keperluan", "Dijual secara langsung", "Dioptimalkan pemanfaatannya atau dijual melalui mekanisme lelang"],
                answer: "Dioptimalkan pemanfaatannya atau dijual melalui mekanisme lelang",
                xp: 30,
                token: 20,
            },
            {
                id: 5,
                question: "Apa pengertian inventarisasi dalam Permendagri No. 19 Tahun 2016?",
                options: ["Pencatatan seluruh barang milik daerah yang digunakan oleh pemerintah", "Penghapusan barang yang sudah tidak dipakai", "Perencanaan pengadaan aset baru"],
                answer: "Pencatatan seluruh barang milik daerah yang digunakan oleh pemerintah",
                xp: 20,
                token: 15,
            },
            {
                id: 6,
                question: "Apa fungsi utama aplikasi DIPAYANG?",
                options: ["Meningkatkan pencatatan manual", "Mengatur keuangan daerah", "Pencatatan, penatausahaan, dan pelaporan aset daerah"],
                answer: "Pencatatan, penatausahaan, dan pelaporan aset daerah",
                xp: 20,
                token: 15,
            },
            {
                id: 7,
                question: "Siapa penggagas utama aplikasi DIPAYANG?",
                options: ["Herwin Noviansyah", "Robby Kurniawan J", "Kepala Dinas Keuangan"],
                answer: "Herwin Noviansyah",
                xp: 15,
                token: 10,
            },
            {
                id: 8,
                question: "Siapa developer utama aplikasi DIPAYANG?",
                options: ["Hariyanto", "Herwin Noviansyah", "Robby Kurniawan J"],
                answer: "Hariyanto",
                xp: 20,
                token: 15,
            },
            {
                id: 9,
                question: "Apa metode utama untuk menilai aset daerah?",
                options: ["Inventarisasi manual", "Sistem valuasi berdasarkan pasar", "Menggunakan penilaian pemerintah"],
                answer: "Sistem valuasi berdasarkan pasar",
                xp: 25,
                token: 20,
            },
            {
                id: 10,
                question: "Apa tujuan utama dari pemeliharaan aset pertanian?",
                options: ["Memaksimalkan hasil panen", "Meningkatkan harga jual aset", "Menjaga kualitas dan nilai ekonomi aset"],
                answer: "Menjaga kualitas dan nilai ekonomi aset",
                xp: 30,
                token: 25,
            },
            {
                id: 11,
                question: "Berapa jumlah Kelurahan di Kecamatan Merigi?",
                options: ["10", "1", "14"],
                answer: "1",
                xp: 20,
                token: 15,
            },
            {
                id: 12,
                question: "Apa potensi utama di Ujan Mas?",
                options: ["Kopi", "Teh", "Kelapa Sawit"],
                answer: "Kopi",
                xp: 25,
                token: 25,
            },
            {
                id: 13,
                question: "Dalam kasus aset pertanian rusak, apa langkah pertama yang dilakukan?",
                options: ["Melakukan penghapusan langsung", "Mengevaluasi dan memperbaiki aset", "Mengganti aset baru"],
                answer: "Mengevaluasi dan memperbaiki aset",
                xp: 20,
                token: 15,
            },
            {
                id: 14,
                question: "Aset tidak bergerak seperti tanah di kecamatan Merigi harus?",
                options: ["Segera dijual untuk dana tambahan", "Diinventarisasi dan dimanfaatkan sesuai kebutuhan", "Tidak perlu dioptimalkan"],
                answer: "Diinventarisasi dan dimanfaatkan sesuai kebutuhan",
                xp: 30,
                token: 25,
            },
            {
                id: 15,
                question: "Apa peran utama Herwin Noviansyah dalam aplikasi DIPAYANG?",
                options: ["Pengembangan teknis", "Kepala Bidang Aset dan penggagas ide", "Pelaksanaan pelaporan manual"],
                answer: "Kepala Bidang Aset dan penggagas ide",
                xp: 15,
                token: 10,
            },
            {
                id: 16,
                question: "Berapa jarak antara inventarisasi ulang aset?",
                options: ["1 tahun", "5 tahun", "3 tahun"],
                answer: "5 tahun",
                xp: 25,
                token: 20,
            },
            {
                id: 17,
                question: "Apa tujuan optimalisasi lahan di Merigi?",
                options: ["Mengurangi harga pasar aset", "Menambah anggaran pemerintah", "Meningkatkan hasil produksi pertanian"],
                answer: "Meningkatkan hasil produksi pertanian",
                xp: 30,
                token: 25,
            },
            {
                id: 18,
                question: "Siapa asisten UX aplikasi DIPAYANG?",
                options: ["Herwin Noviansyah", "Robby Kurniawan J", "Hariyanto"],
                answer: "Robby Kurniawan J",
                xp: 15,
                token: 10,
            },
            {
                id: 19,
                question: "Apa saja fitur unggulan aplikasi DIPAYANG?",
                options: ["Pencatatan manual", "Pelaporan otomatis dan penatausahaan digital", "Sistem penghapusan aset yang mudah"],
                answer: "Pelaporan otomatis dan penatausahaan digital",
                xp: 20,
                token: 15,
            },
            {
                id: 20,
                question: "Aset pertanian seperti irigasi di kecamatan Merigi harus?",
                options: ["Diserahkan kepada pihak swasta", "Dimanfaatkan untuk kepentingan masyarakat", "Dijadikan sebagai aset cadangan"],
                answer: "Dimanfaatkan untuk kepentingan masyarakat",
                xp: 25,
                token: 20,
            },
            {
                id: 21,
                question: "Dalam kasus penghapusan aset, langkah yang harus diambil adalah?",
                options: ["Melakukan penjualan langsung", "Mekanisme lelang sesuai peraturan", "Mengabaikan aset tersebut"],
                answer: "Mekanisme lelang sesuai peraturan",
                xp: 30,
                token: 20,
            },
            {
                id: 22,
                question: "Apa dasar hukum utama untuk pengelolaan aset daerah?",
                options: ["Permendagri No. 19 Tahun 2016", "Undang-Undang No. 12 Tahun 2020", "Keputusan Presiden"],
                answer: "Permendagri No. 19 Tahun 2016",
                xp: 20,
                token: 15,
            },
            {
                id: 23,
                question: "Apa tujuan utama inventarisasi barang milik daerah?",
                options: ["Mengurangi jumlah aset", "Meningkatkan efisiensi pengelolaan", "Meningkatkan harga aset"],
                answer: "Meningkatkan efisiensi pengelolaan",
                xp: 25,
                token: 20,
            },
            {
                id: 24,
                question: "Dalam pengelolaan aset pertanian, apa yang harus diperhatikan?",
                options: ["Nilai pasar", "Nilai manfaat jangka panjang", "Nilai jual cepat"],
                answer: "Nilai manfaat jangka panjang",
                xp: 30,
                token: 25,
            },
            {
                id: 25,
                question: "Siapa yang bertanggung jawab atas validasi aset daerah?",
                options: ["Kepala Bidang Aset", "Kepala Desa", "Kepala Seksi Pelaporan"],
                answer: "Kepala Bidang Aset",
                xp: 15,
                token: 10,
            },
            {
                id: 26,
                question: "Apa yang harus dilakukan jika ditemukan aset yang tidak tercatat?",
                options: ["Langsung digunakan", "Dihapus dari sistem", "Dilakukan inventarisasi ulang"],
                answer: "Dilakukan inventarisasi ulang",
                xp: 20,
                token: 15,
            },
            {
                id: 27,
                question: "Apa manfaat utama aplikasi DIPAYANG?",
                options: ["Meningkatkan pendapatan daerah", "Efisiensi dan transparansi dalam pengelolaan aset", "Mengurangi jumlah aset daerah"],
                answer: "Efisiensi dan transparansi dalam pengelolaan aset",
                xp: 30,
                token: 25,
            },
            {
                id: 28,
                question: "Bagaimana cara menentukan nilai aset dalam kasus penghapusan?",
                options: ["Dengan penilaian pihak independen", "Dengan harga pasar yang ditentukan sendiri", "Dengan keputusan kepala dinas"],
                answer: "Dengan penilaian pihak independen",
                xp: 25,
                token: 20,
            },
            {
                id: 29,
                question: "Dalam kasus irigasi di Merigi yang rusak, langkah pertama adalah?",
                options: ["Segera mengganti dengan yang baru", "Melakukan evaluasi untuk perbaikan", "Mengabaikan kerusakan"],
                answer: "Melakukan evaluasi untuk perbaikan",
                xp: 20,
                token: 15,
            },
            {
                id: 30,
                question: "Apa prinsip utama dalam pengelolaan barang milik daerah?",
                options: ["Transparansi, efisiensi, dan efektivitas", "Efisiensi dan keuntungan", "Keuntungan dan penghematan biaya"],
                answer: "Transparansi, efisiensi, dan efektivitas",
                xp: 25,
                token: 20,
            },
            {
                id: 31,
                question: "Berapa jumlah aset pertanian yang dimanfaatkan di Merigi?",
                options: ["10", "15", "20"],
                answer: "15",
                xp: 20,
                token: 10,
            },
            {
                id: 32,
                question: "Apa yang dimaksud dengan pencatatan aset dalam DIPAYANG?",
                options: ["Penghapusan aset secara otomatis", "Dokumentasi digital dari aset daerah", "Pelaporan manual aset"],
                answer: "Dokumentasi digital dari aset daerah",
                xp: 20,
                token: 15,
            },
            {
                id: 33,
                question: "Apa tindakan jika aset di Merigi tidak dimanfaatkan?",
                options: ["Segera dijual", "Dilakukan optimalisasi pemanfaatan", "Disimpan tanpa digunakan"],
                answer: "Dilakukan optimalisasi pemanfaatan",
                xp: 30,
                token: 25,
            },
            {
                id: 34,
                question: "Apa peran utama Robby Kurniawan J di aplikasi DIPAYANG?",
                options: ["Asisten UX", "Pengembang utama", "Penyanyi"],
                answer: "Asisten UX",
                xp: 15,
                token: 10,
            },
            {
                id: 35,
                question: "Apa yang harus dilakukan jika ditemukan aset ganda di pencatatan DIPAYANG?",
                options: ["Menghapus semua data aset", "Melakukan validasi dan konsolidasi data", "Mengabaikan aset ganda"],
                answer: "Melakukan validasi dan konsolidasi data",
                xp: 25,
                token: 20,
                },
            ],
        },
    ];
}

// Fungsi menambahkan marker pada peta statis
function initializeMarkers(kecamatanData) {
    const mapContainer = document.querySelector(".map-container");

    kecamatanData.forEach((kecamatan, index) => {
        const marker = document.createElement("div");
        marker.classList.add("marker");

        // Ubah posisi marker berdasarkan peta
        marker.style.top = `${30 + index * 8}%`; // Perbaiki nilai sesuai peta
        marker.style.left = `${40 + index * 8}%`;

        marker.dataset.kecamatan = kecamatan.kecamatan;

        marker.addEventListener("click", function () {
            if (kecamatan.unlocked) {
                startTask(kecamatan);
            } else {
                alert(`Kecamatan ${kecamatan.kecamatan} masih terkunci.`);
            }
        });

        mapContainer.appendChild(marker);
    });
}

// Fungsi menampilkan data pemain
function displayPlayerData(user) {
    document.getElementById("taskMessage").textContent = `Selamat datang, ${user.username}! Pilih lokasi di peta untuk memulai tugas.`;
}

// Fungsi memulai tugas
function startTask(kecamatan) {
    const taskContainer = document.getElementById("taskContainer");
    if (!taskContainer) {
        console.error("Elemen taskContainer tidak ditemukan.");
        return;
    }

    const currentTaskIndex = kecamatan.lastTaskIndex;
    if (currentTaskIndex >= kecamatan.tasks.length) {
        alert(`Selamat! Semua tugas di kecamatan ${kecamatan.kecamatan} telah selesai.`);
        kecamatan.completed = true;
        return;
    }

    const task = kecamatan.tasks[currentTaskIndex];
    taskContainer.innerHTML = `
        <h3>${task.question}</h3>
        <div>
            ${task.options
                .map(
                    (option) =>
                        `<label><input type="radio" name="taskOption" value="${option}"> ${option}</label>`
                )
                .join("")}
        </div>
        <button id="submitTaskButton">Kirim Jawaban</button>
    `;

    // Hapus event lama sebelum menambahkan baru
    const submitButton = document.getElementById("submitTaskButton");
    submitButton.removeEventListener("click", handleTaskSubmit); // Pastikan tidak ada duplikasi
    submitButton.addEventListener("click", () => {
        checkAnswer(kecamatan, currentTaskIndex, task);
    });
}

// Fungsi memeriksa jawaban
function checkAnswer(kecamatan, taskIndex, task) {
    const selectedOption = document.querySelector("input[name='taskOption']:checked");
    if (!selectedOption) {
        alert("Pilih jawaban terlebih dahulu.");
        return;
    }

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const kecamatanData = JSON.parse(localStorage.getItem("kecamatanTasks"));

    if (selectedOption.value === task.answer) {
        alert("Jawaban benar!");
        currentUser.xp += task.xp;
        currentUser.token += task.token;
        kecamatan.lastTaskIndex++;
    } else {
        alert("Jawaban salah!");
        currentUser.lives--;
        if (currentUser.lives <= 0) {
            alert("Nyawa habis! Tunggu 24 jam atau gunakan token untuk menambah nyawa.");
            return;
        }
    }

    // Update data ke localStorage
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    localStorage.setItem("kecamatanTasks", JSON.stringify(kecamatanData));

    displayPlayerData(currentUser);
    startTask(kecamatan);
}

marker.addEventListener("click", function () {
    console.log(`Marker diklik: ${kecamatan.kecamatan}`);
    if (kecamatan.unlocked) {
        startTask(kecamatan);
    } else {
        alert(`Kecamatan ${kecamatan.kecamatan} masih terkunci.`);
    }
});
