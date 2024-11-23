let profit = 0;

function initializeGame(ctx) {
  updateProfitUI();
}

function upgradeAsset() {
  profit += 10; // Setiap klik, profit bertambah
  updateProfitUI();
}
