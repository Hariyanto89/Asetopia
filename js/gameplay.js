document.addEventListener("DOMContentLoaded", function () {
    // Ambil data pengguna dari LocalStorage
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
        alert("Anda belum login! Kembali ke halaman login.");
        window.location.href = "index.html";
        return;
    }

    // Tampilkan data pengguna di dashboard
    document.getElementById("playerName").textContent = currentUser.username;
    document.getElementById("playerCharacter").textContent = currentUser.character || "[Belum Dipilih]";
    document.getElementById("playerLevel").textContent = Math.floor(currentUser.score / 100) + 1;
    document.getElementById("playerScore").textContent = currentUser.score;

    // Placeholder untuk peta interaktif
    const mapContainer = document.getElementById("kepahiangMap");
    mapContainer.innerHTML = "<p>Peta Kecamatan (akan diintegrasikan dengan Leaflet.js atau gambar statis)</p>";

    // Placeholder untuk tugas
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "<ul><li>Periksa aset di Kecamatan Kabawetan</li><li>Renovasi jalan utama di Kecamatan Seberang Musi</li></ul>";
});
