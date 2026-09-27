const promoButton = document.querySelector("#promoButton");

if (promoButton) {
     promoButton.addEventListener("click", () => {
          promoButton.textContent = "Promo: beli 2 gratis tester!";
          console.log("Promo Rumah Samudra Kopi berhasil ditampilkan.");
     });
}

const productRows = document.querySelectorAll("tbody tr");
const tableCaption = document.querySelector("caption");

if (productRows.length && tableCaption) {
     console.log("Jumlah produk pada tabel:", productRows.length);
     console.log("Caption tabel:", tableCaption.textContent);
}

document.querySelectorAll(".audio-player").forEach((player) => {
     const audio = player.querySelector("audio");
     const toggle = player.querySelector(".audio-toggle");
     const progress = player.querySelector(".audio-progress");
     const status = player.querySelector(".audio-status");

     if (!audio || !toggle || !progress || !status) return;

     const updateProgress = () => {
          if (!Number.isFinite(audio.duration) || audio.duration <= 0) return;
          progress.value = String((audio.currentTime / audio.duration) * 100);
          progress.setAttribute("aria-valuetext", `${Math.floor(audio.currentTime)} detik`);
     };

     const showPlaybackError = (message) => {
          player.classList.remove("is-playing");
          player.classList.add("has-error");
          toggle.setAttribute("aria-label", "Putar Secangkir Cerita");
          status.textContent = message;
     };

     toggle.addEventListener("click", async () => {
          if (audio.paused) {
               try {
                    await audio.play();
               } catch {
                    showPlaybackError(window.location.protocol === "file:"
                         ? "Audio diblokir saat halaman dibuka langsung. Buka situs lewat server lokal."
                         : "Audio gagal diputar. Pastikan file MP3 tersedia dan volume perangkat aktif.");
               }
          } else {
               audio.pause();
          }
     });

     audio.addEventListener("error", () => {
          showPlaybackError(window.location.protocol === "file:"
               ? "Audio diblokir saat halaman dibuka langsung. Buka situs lewat server lokal."
               : "Audio gagal dimuat. Pastikan file MP3 tersedia.");
     });

     audio.addEventListener("play", () => {
          player.classList.add("is-playing");
          player.classList.remove("has-error");
          toggle.setAttribute("aria-label", "Jeda Secangkir Cerita");
          status.textContent = "Audio sedang diputar.";
     });

     audio.addEventListener("pause", () => {
          player.classList.remove("is-playing");
          toggle.setAttribute("aria-label", "Putar Secangkir Cerita");
          status.textContent = "Audio dijeda.";
     });

     audio.addEventListener("timeupdate", updateProgress);
     audio.addEventListener("ended", () => {
          progress.value = "0";
          status.textContent = "Audio selesai diputar.";
     });

     progress.addEventListener("input", () => {
          if (Number.isFinite(audio.duration) && audio.duration > 0) {
               audio.currentTime = (Number(progress.value) / 100) * audio.duration;
          }
     });
});