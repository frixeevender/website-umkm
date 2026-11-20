const form = document.querySelector("#form-kontak");
const preview = document.querySelector("#preview-form");
const formFeedback = document.querySelector("#form-feedback");
const fields = ["nama", "email", "telepon", "paket", "pesan", "setuju"]
    .map((id) => document.querySelector(`#${id}`))
    .filter(Boolean);
const radioGroups = ["waktu", "topik"].map((name) => ({
    inputs: Array.from(document.querySelectorAll(`input[name="${name}"]`)),
    error: document.querySelector(`#${name}-error`),
})).filter((group) => group.inputs.length > 0);
let hasSubmitted = false;

function pesanError(field) {
    const validity = field.validity;
    if (validity.valueMissing) return "Bagian ini wajib diisi.";
    if (validity.typeMismatch) return "Format email belum benar.";
    if (validity.tooShort) return `Isi minimal ${field.minLength} karakter.`;
    if (validity.patternMismatch) return field.title || "Format belum sesuai.";
    if (validity.tooLong) return `Isi maksimal ${field.maxLength} karakter.`;
    return "";
}

function validasiField(field) {
    field.setCustomValidity("");
    const pesan = pesanError(field);
    field.setCustomValidity(pesan);
    field.setAttribute("aria-invalid", pesan ? "true" : "false");

    const error = document.querySelector(`#${field.id}-error`);
    if (error) error.textContent = pesan;

    return pesan === "";
}

function validasiRadioGroup(group) {
    group.inputs.forEach((input) => input.setCustomValidity(""));
    const terpilih = group.inputs.some((input) => input.checked);
    const pesan = terpilih ? "" : "Pilih salah satu opsi.";

    if (pesan && group.inputs[0]) group.inputs[0].setCustomValidity(pesan);
    group.inputs.forEach((input) => input.setAttribute("aria-invalid", pesan ? "true" : "false"));
    if (group.error) group.error.textContent = pesan;

    return pesan === "";
}

if (form && preview && formFeedback) {
    fields.forEach((field) => {
        ["input", "change"].forEach((eventName) => {
            field.addEventListener(eventName, () => {
                if (hasSubmitted) validasiField(field);
            });
        });
    });

    radioGroups.forEach((group) => {
        group.inputs.forEach((input) => {
            input.addEventListener("change", () => {
                if (hasSubmitted) validasiRadioGroup(group);
            });
        });
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        hasSubmitted = true;

        const semuaFieldValid = fields.every(validasiField);
        const semuaGroupValid = radioGroups.every(validasiRadioGroup);

        if (!semuaFieldValid || !semuaGroupValid || !form.checkValidity()) {
            formFeedback.textContent = "Periksa kembali bagian yang ditandai.";
            formFeedback.classList.remove("success");
            preview.textContent = "Preview hanya tersedia setelah semua field valid.";
            form.reportValidity();
            form.querySelector(":invalid")?.focus();
            return;
        }

        const data = new FormData(form);
        preview.textContent = [
            `Nama: ${data.get("nama")}`,
            `Email: ${data.get("email")}`,
            `Nomor WhatsApp: ${data.get("telepon") || "Tidak diisi"}`,
            `Waktu yang nyaman dihubungi: ${data.get("waktu")}`,
            `Paket: ${data.get("paket")}`,
            `Topik: ${data.get("topik")}`,
            `Pesan: ${data.get("pesan")}`,
        ].join("\n");
        formFeedback.textContent = "Form valid. Preview berhasil dibuat.";
        formFeedback.classList.add("success");
    });
}
