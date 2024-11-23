// Daftar quest
let quests = [
  {
    name: "Sertifikasi Lahan",
    description: "Selesaikan masalah sertifikasi lahan di Kecamatan Merigi.",
    completed: false,
    reward: 100, // Ruby yang diberikan sebagai reward
    nextQuest: "Pengelolaan Irigasi", // Quest berikutnya
  },
  {
    name: "Pengelolaan Irigasi",
    description: "Perbaiki sistem irigasi untuk meningkatkan produktivitas pertanian.",
    completed: false,
    reward: 150,
    nextQuest: "Peningkatan Infrastruktur",
  },
  {
    name: "Peningkatan Infrastruktur",
    description: "Bangun jalan baru untuk akses yang lebih baik di Kecamatan Merigi.",
    completed: false,
    reward: 200,
    nextQuest: null, // Quest terakhir di stage ini
  },
];

// Quest aktif saat ini
let currentQuest = null;

/**
 * Memulai quest berdasarkan nama.
 * @param {string} questName
 */
function startQuest(questName) {
  if (!currentQuest) {
    currentQuest = quests.find((quest) => quest.name === questName && !quest.completed);

    if (currentQuest) {
      alert(`Quest dimulai: ${currentQuest.description}`);
      updateQuestUI();
      console.log(`Quest aktif: ${currentQuest.name}`);
    } else {
      alert("Quest tidak ditemukan atau sudah selesai.");
    }
  } else {
    alert(`Anda sedang menyelesaikan quest: ${currentQuest.name}`);
  }
}

/**
 * Menyelesaikan quest aktif.
 */
function completeQuest() {
  if (currentQuest) {
    currentQuest.completed = true; // Tandai quest selesai
    alert(`Quest "${currentQuest.name}" selesai! Anda mendapatkan ${currentQuest.reward} ruby.`);
    ruby += currentQuest.reward; // Tambahkan ruby sebagai reward
    updateRubyUI(); // Perbarui UI ruby

    const nextQuest = currentQuest.nextQuest;
    currentQuest = null; // Reset quest aktif

    updateQuestUI();

    if (nextQuest) {
      alert(`Quest berikutnya tersedia: ${nextQuest}`);
      startQuest(nextQuest); // Otomatis mulai quest berikutnya
    } else {
      alert("Semua quest di stage ini selesai! Lanjutkan ke peta berikutnya.");
    }
  } else {
    alert("Tidak ada quest yang aktif.");
  }
}

/**
 * Memperbarui UI quest aktif.
 */
function updateQuestUI() {
  const activeQuestElement = document.getElementById("active-quest");
  if (currentQuest) {
    activeQuestElement.textContent = `${currentQuest.name}: ${currentQuest.description}`;
  } else {
    activeQuestElement.textContent = "Tidak ada quest aktif";
  }
}

/**
 * Reset semua quest untuk testing.
 */
function resetQuests() {
  quests.forEach((quest) => {
    quest.completed = false;
  });
  currentQuest = null;
  updateQuestUI();
  alert("Semua quest telah di-reset.");
}

/**
 * Mendapatkan daftar quest untuk UI.
 */
function getQuestList() {
  return quests.map((quest) => ({
    name: quest.name,
    description: quest.description,
    completed: quest.completed ? "✔️" : "❌",
  }));
}
