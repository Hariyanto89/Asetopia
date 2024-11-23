function updateProfitUI() {
  document.getElementById("profit").textContent = profit;
}

document.getElementById("upgradeButton").addEventListener("click", () => {
  upgradeAsset();
});
