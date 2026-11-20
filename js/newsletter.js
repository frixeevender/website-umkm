const STORAGE_KEY = "rumah-samudra-preferensi-kontak";
const preferenceForm = document.querySelector("#form-kontak");
const preferenceStatus = document.querySelector("#preferensi-status");
const savePreferencesButton = document.querySelector("#simpan-preferensi");
const clearPreferencesButton = document.querySelector("#hapus-preferensi");

function isValidPreference(value) {
    const validPackages = Array.from(document.querySelectorAll("#paket option"))
        .map((option) => option.value)
        .filter(Boolean);
    const validTopics = Array.from(document.querySelectorAll('input[name="topik"]'))
        .map((input) => input.value);

    return value !== null
        && typeof value === "object"
        && !Array.isArray(value)
        && validPackages.includes(value.paket)
        && validTopics.includes(value.topik);
}

function simpanPreferensi() {
    if (!preferenceForm || !preferenceStatus) return;

    const data = new FormData(preferenceForm);
    const paket = data.get("paket");
    const topik = data.get("topik");
    if (!paket || !topik) {
        preferenceStatus.textContent = "Pilih paket dan topik sebelum menyimpan preferensi.";
        preferenceStatus.classList.remove("success");
        return;
    }

    const preferensi = {
        paket,
        topik,
        updatedAt: new Date().toISOString(),
    };

    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(preferensi));
        preferenceStatus.textContent = "Preferensi berhasil disimpan di browser ini.";
        preferenceStatus.classList.add("success");
    } catch (error) {
        console.error("Preferensi tidak dapat disimpan.", error);
        preferenceStatus.textContent = "Preferensi gagal disimpan. Periksa pengaturan penyimpanan browser.";
        preferenceStatus.classList.remove("success");
    }
}

function muatPreferensi() {
    if (!preferenceForm || !preferenceStatus) return;

    let tersimpan;
    try {
        tersimpan = localStorage.getItem(STORAGE_KEY);
    } catch (error) {
        console.error("Preferensi tidak dapat dibaca.", error);
        preferenceStatus.textContent = "Preferensi tidak dapat dibaca dari penyimpanan browser.";
        return;
    }

    if (!tersimpan) {
        preferenceStatus.textContent = "Belum ada preferensi tersimpan.";
        return;
    }

    let preferensi;
    try {
        preferensi = JSON.parse(tersimpan);
        if (!isValidPreference(preferensi)) {
            throw new Error("Struktur preferensi tidak sesuai.");
        }
    } catch (error) {
        console.warn("Data preferensi tidak valid dan akan dihapus.", error);
        try {
            localStorage.removeItem(STORAGE_KEY);
            preferenceStatus.textContent = "Data preferensi rusak dan sudah dihapus.";
        } catch (storageError) {
            console.error("Data preferensi rusak dan tidak dapat dihapus.", storageError);
            preferenceStatus.textContent = "Data preferensi rusak dan tidak dapat dibersihkan.";
        }
        return;
    }

    preferenceForm.elements.paket.value = preferensi.paket;
    const topik = preferenceForm.querySelector(`input[name="topik"][value="${preferensi.topik}"]`);
    if (topik) topik.checked = true;
    preferenceStatus.textContent = "Preferensi terakhir dimuat dari browser.";
}

if (savePreferencesButton) {
    savePreferencesButton.addEventListener("click", simpanPreferensi);
}

if (clearPreferencesButton && preferenceStatus) {
    clearPreferencesButton.addEventListener("click", () => {
        try {
            localStorage.removeItem(STORAGE_KEY);
            preferenceStatus.textContent = "Preferensi berhasil dihapus.";
            preferenceStatus.classList.remove("success");
        } catch (error) {
            console.error("Preferensi tidak dapat dihapus.", error);
            preferenceStatus.textContent = "Preferensi gagal dihapus dari penyimpanan browser.";
        }
    });
}

muatPreferensi();
