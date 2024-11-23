let quests = [
  {
    name: "Sertifikasi Lahan",
    completed: false,
    description: "Selesaikan masalah sertifikasi lahan di Kecamatan Merigi.",
  },
];

let currentQuest = null;

function startQuest(questName) {
  if (!currentQuest) {
    currentQuest = quests.find((quest) => quest.name === questName);
    if (currentQuest) {
      alert(`Quest dimulai: ${currentQuest.description}`);
      updateQuestUI();
    }
  } else {
    alert("Anda sedang menyelesaikan quest lain.");
  }
}

function completeQuest() {
  if (currentQuest) {
    currentQuest.completed = true;
    alert(`Quest "${currentQuest.name}" selesai!`);
    currentQuest = null;
    updateQuestUI();
  }
}
