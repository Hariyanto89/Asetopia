document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM content loaded. Memulai inisialisasi...");

    // Validasi apakah pengguna sudah login
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {
        alert("Anda belum login. Silakan login terlebih dahulu.");
        window.location.href = "index.html"; // Arahkan kembali ke halaman utama
        return; // Hentikan eksekusi lebih lanjut
    } else if (!currentUser.character) {
        alert("Anda belum memilih karakter. Silakan pilih karakter terlebih dahulu.");
        window.location.href = "character.html";
        return; // Hentikan eksekusi lebih lanjut
    } else {
        console.log(`Selamat datang kembali, ${currentUser.username}!`);
    }

    // Deklarasikan variabel `kecamatanData` hanya jika belum ada
    let kecamatanData;

    // Validasi atau inisialisasi data kecamatan
    if (!localStorage.getItem("kecamatanTasks")) {
        console.warn("Data kecamatan tidak ditemukan atau tidak valid. Membuat data baru...");
        kecamatanData = initializeKecamatanData();
        localStorage.setItem("kecamatanTasks", JSON.stringify(kecamatanData));
    } else {
        kecamatanData = JSON.parse(localStorage.getItem("kecamatanTasks"));
    }

    // Inisialisasi elemen utama (marker dan data pengguna)
    try {
        initializeMarkers(kecamatanData); // Fungsi ini menambahkan semua marker ke dalam peta
        displayPlayerData(currentUser); // Menampilkan data pemain di UI
        console.log("Inisialisasi selesai. Marker dan data pengguna siap.");
    } catch (error) {
        console.error("Terjadi kesalahan selama inisialisasi:", error);
    }
});

// ========================
// Fungsi Inisialisasi Data
// ========================

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
                image: "../assets/images/badges/merigi_badge.png",
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
                question: "Berapa jumlah Kecamatan di Kabupaten Kepahiang?",
                options: ["10", "15", "8"],
                answer: "8",
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

// ========================
// Fungsi Inisialisasi Marker
// ========================
function initializeMarkers(kecamatanData) {
    const mapContainer = document.querySelector(".map-container");

    // Bersihkan semua marker sebelumnya
    mapContainer.innerHTML = "";

    // Validasi data kecamatan
    if (!kecamatanData || !Array.isArray(kecamatanData)) {
        console.error("Data kecamatan tidak valid atau kosong.");
        alert("Kesalahan: Data kecamatan tidak tersedia.");
        return;
    }

    // Loop melalui data kecamatan dan tugas
    kecamatanData.forEach((kecamatan, kecamatanIndex) => {
        if (!kecamatan.tasks || kecamatan.tasks.length === 0) {
            console.warn(`Kecamatan ${kecamatan.kecamatan} tidak memiliki tugas.`);
            return;
        }

        kecamatan.tasks.forEach(task => {
            // Validasi ID tugas
            if (!task.id || isNaN(task.id)) {
                console.warn(`Tugas tanpa ID atau ID tidak valid ditemukan:`, task);
                return;
            }

            // Buat elemen marker
            const marker = document.createElement("div");
            marker.classList.add("marker");
            marker.dataset.taskId = task.id;

            // Tambahkan kelas jika kecamatan sudah selesai
            if (kecamatan.completed) {
                marker.classList.add("completed");
            }

            // Atur posisi marker pada peta
            marker.style.top = `${15 + kecamatanIndex * 10}%`;
            marker.style.left = `${10 + task.id * 5}%`;

            // Event listener untuk klik marker
            marker.addEventListener("click", function () {
                const taskId = parseInt(this.dataset.taskId);

                // Ambil data kecamatan dari localStorage
                const storedData = JSON.parse(localStorage.getItem("kecamatanTasks"));
                if (!storedData) {
                    console.error("Data kecamatan tidak ditemukan di localStorage.");
                    alert("Kesalahan: Data kecamatan tidak ditemukan.");
                    return;
                }

                // Cari tugas yang sesuai dengan ID yang diklik
                const task = storedData.flatMap(kec => kec.tasks).find(t => t.id === taskId);

                if (!task) {
                    console.error("Tugas tidak ditemukan.");
                    return;
                }

                // Tampilkan tugas dengan memanggil displayTask
                displayTask(task);
            });

            // Tambahkan marker ke dalam peta
            mapContainer.appendChild(marker);
        });
    });
}

// ========================
// Fungsi Menampilkan Data Pemain
// ========================

function displayPlayerData(user) {
    const taskMessageElement = document.getElementById("taskMessage");
    if (taskMessageElement) {
        taskMessageElement.textContent = `Selamat datang, ${user.username}! Pilih lokasi di peta untuk memulai tugas.`;
    } else {
        console.error("Elemen taskMessage tidak ditemukan.");
    }
}

// ========================
// Fungsi Menampilkan Tugas
// ========================
function displayTask(task) {
    const taskContainer = document.getElementById("taskContainer");

    // Validasi keberadaan elemen taskContainer
    if (!taskContainer) {
        console.error("Elemen taskContainer tidak ditemukan.");
        alert("Kesalahan: Elemen untuk menampilkan tugas tidak tersedia.");
        return;
    }

    // Validasi data tugas
    if (!task || !task.question || !Array.isArray(task.options)) {
        console.error("Tugas tidak valid:", task);
        taskContainer.innerHTML = `<p class="error-message">Tugas tidak valid atau data tugas tidak lengkap. Silakan coba lagi.</p>`;
        return;
    }

    if (!task.id || typeof task.id !== "number") {
        console.error("Tugas tidak memiliki ID valid:", task);
        taskContainer.innerHTML = `<p class="error-message">Kesalahan: ID tugas tidak valid.</p>`;
        return;
    }

    if (!task.options.includes(task.answer)) {
        console.error("Jawaban tugas tidak cocok dengan opsi yang tersedia:", task);
        taskContainer.innerHTML = `<p class="error-message">Kesalahan: Jawaban tidak valid.</p>`;
        return;
    }

    // Bersihkan taskContainer sebelum menambahkan konten baru
    taskContainer.innerHTML = "";

    // Buat elemen judul
    const taskTitle = document.createElement("h3");
    taskTitle.textContent = task.question.trim();
    taskContainer.appendChild(taskTitle);

    // Buat opsi jawaban
    const optionsContainer = document.createElement("div");
    optionsContainer.classList.add("task-options");
    task.options
        .filter(option => option.trim() !== "")
        .forEach(option => {
            const label = document.createElement("label");
            label.classList.add("task-option");

            const input = document.createElement("input");
            input.type = "radio";
            input.name = "taskOption";
            input.value = option.trim();

            label.appendChild(input);
            label.appendChild(document.createTextNode(` ${option.trim()}`));
            optionsContainer.appendChild(label);
        });
    taskContainer.appendChild(optionsContainer);

    // Tambahkan tombol submit
    const submitButton = document.createElement("button");
    submitButton.id = "submitTaskButton";
    submitButton.classList.add("submit-button");
    submitButton.textContent = "Kirim Jawaban";
    taskContainer.appendChild(submitButton);

    // Tambahkan event listener ke tombol
    submitButton.addEventListener("click", () => {
        console.log("Tombol Kirim Jawaban diklik");
        checkAnswer(task);
    });
}

// ========================
// Fungsi Memeriksa Jawaban
// ========================
function checkAnswer(task) {
    const selectedOption = document.querySelector("input[name='taskOption']:checked");

    // Periksa apakah pengguna telah memilih jawaban
    if (!selectedOption) {
        alert("Pilih jawaban terlebih dahulu.");
        return;
    }

    const taskContainer = document.getElementById("taskContainer");
    if (!taskContainer) {
        console.error("Elemen taskContainer tidak ditemukan.");
        return;
    }

    if (selectedOption.value === task.answer) {
        alert("Jawaban benar!");
        console.log(`Jawaban benar: ${task.answer}`);

        // Temukan marker terkait dan sembunyikan
        const marker = document.querySelector(`.marker[data-task-id="${task.id}"]`);
        if (marker) {
            marker.classList.add("completed"); // Tandai selesai
            marker.style.display = "none"; // Sembunyikan secara visual
        }

        // Perbarui data kecamatan
        const kecamatanData = JSON.parse(localStorage.getItem("kecamatanTasks"));
        const kecamatan = kecamatanData.find(kec => kec.tasks.some(t => t.id === task.id));

        if (kecamatan) {
            // Hapus tugas dari daftar
            kecamatan.tasks = kecamatan.tasks.filter(t => t.id !== task.id);

            // Tandai kecamatan sebagai selesai jika semua tugas telah selesai
            if (kecamatan.tasks.length === 0) {
                kecamatan.completed = true;
                awardBadgeToUser(kecamatan.badge); // Berikan badge
            }

            // Simpan kembali data kecamatan
            localStorage.setItem("kecamatanTasks", JSON.stringify(kecamatanData));
        }

        // Perbarui UI
        taskContainer.innerHTML = `
            <p>Selamat! Anda berhasil menyelesaikan tugas ini.</p>
            <button id="nextTaskButton">Lanjutkan ke tugas berikutnya</button>
        `;
        document.getElementById("nextTaskButton").addEventListener("click", () => {
            taskContainer.innerHTML = `<p>Pilih tugas baru di peta!</p>`;
        });
    } else {
        alert("Jawaban salah!");
        console.log(`Jawaban salah: ${selectedOption.value}`);
        taskContainer.innerHTML = `
            <p>Jawaban salah! Silakan coba lagi.</p>
            <button id="retryTaskButton">Coba Lagi</button>
        `;
        document.getElementById("retryTaskButton").addEventListener("click", () => displayTask(task));
    }
}

    // Tambahkan event untuk tombol "Lanjutkan ke tugas berikutnya"
    const nextTaskButton = document.getElementById("nextTaskButton");
    nextTaskButton.addEventListener("click", () => {
        taskContainer.innerHTML = `<p>Pilih tugas baru di peta!</p>`;
    });

    // Tandai tugas sebagai selesai dan perbarui kecamatanData
    const kecamatanData = JSON.parse(localStorage.getItem("kecamatanTasks"));
const kecamatan = kecamatanData.find(kec => kec.tasks.some(t => t.id === task.id));

if (kecamatan) {
    // Hapus tugas dari daftar
    kecamatan.tasks = kecamatan.tasks.filter(t => t.id !== task.id);

    // Tandai kecamatan sebagai selesai jika tidak ada tugas yang tersisa
    if (kecamatan.tasks.length === 0) {
        kecamatan.completed = true; // Tandai kecamatan selesai
    }

    localStorage.setItem("kecamatanTasks", JSON.stringify(kecamatanData)); // Simpan kembali data
}

    // Jika jawaban salah
    else {
        alert("Jawaban salah!");
        console.log(`Jawaban salah: ${selectedOption.value}`);

        taskContainer.innerHTML = `
            <p>Jawaban salah! Silakan coba lagi.</p>
            <button id="retryTaskButton">Coba Lagi</button>
        `;

        // Tambahkan event untuk tombol "Coba Lagi"
        const retryTaskButton = document.getElementById("retryTaskButton");
        retryTaskButton.addEventListener("click", () => displayTask(task));
    }
}
// ========================
// Fungsi Pembaruan Status Pemain
// ========================

function updatePlayerStatus(user) {
    const statusElement = document.getElementById("playerStatus");
    if (statusElement) {
        statusElement.innerHTML = `
            <p>Nama: ${user.username}</p>
            <p>Karakter: ${user.character}</p>
            <p>XP: ${user.xp}</p>
            <p>Token: ${user.token}</p>
            <p>Nyawa: ${user.lives}</p>
        `;
    } else {
        console.error("Elemen playerStatus tidak ditemukan.");
    }
}

function awardBadgeToUser(badge) {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {
        console.error("Data pengguna tidak ditemukan di localStorage.");
        return;
    }

    // Periksa apakah badge sudah ada
    const badgeAlreadyAwarded = currentUser.badges.find(b => b.name === badge.name);

    if (!badgeAlreadyAwarded) {
        currentUser.badges.push(badge); // Tambahkan badge ke daftar
        localStorage.setItem("currentUser", JSON.stringify(currentUser)); // Simpan data pemain

        // Tampilkan notifikasi bahwa badge telah diterima
        alert(`Selamat! Anda telah menerima badge: ${badge.name}`);
    }

    // Selalu tambahkan badge ke UI (untuk memastikan UI terupdate)
    const badgeContainer = document.getElementById("badgeContainer");

    if (!badgeContainer) {
        console.error("Elemen badgeContainer tidak ditemukan.");
        return;
    }

    // Cegah duplikasi badge di UI
    const existingBadge = Array.from(badgeContainer.children).find(
        child => child.alt === badge.name
    );
    if (!existingBadge) {
        const badgeElement = document.createElement("img");
        badgeElement.src = badge.image;
        badgeElement.alt = badge.name;
        badgeElement.title = badge.description;
        badgeElement.classList.add("badge"); // Tambahkan kelas CSS jika perlu
        badgeContainer.appendChild(badgeElement);
    }
}


function displayBadges() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const badgeContainer = document.getElementById("badgeContainer");

    if (badgeContainer) {
        badgeContainer.innerHTML = currentUser.badges
            .map(badge => `
                <div class="badge-item">
                    <img src="${badge.image}" alt="${badge.name}" />
                    <p>${badge.name}</p>
                </div>
            `)
            .join("");
    }
}
