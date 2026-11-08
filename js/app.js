// Angka stok adalah data contoh latihan; sesuaikan dengan persediaan aktual.
const produkUmkm = [
  { nama: "Kopi Tubruk Signature", kategori: "Kopi", harga: 45000, stok: 12, unggulan: true },
  { nama: "Cold Brew Aren", kategori: "Minuman", harga: 22000, stok: 4, unggulan: false },
  { nama: "Es Kopi Gula Aren", kategori: "Minuman", harga: 20000, stok: 18, unggulan: false },
  { nama: "Paket Tester Lokal", kategori: "Bundling", harga: 25000, stok: 0, unggulan: false },
  { nama: "Kopi Hitam House Blend", kategori: "Kopi", harga: 25000, stok: 8, unggulan: false },
];

function formatRupiah(nilai) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(nilai);
}

function statusStok(stok) {
  if (stok <= 0) {
    return { label: "Habis", className: "empty" };
  }

  if (stok <= 5) {
    return { label: "Stok terbatas", className: "warning" };
  }

  return { label: "Tersedia", className: "" };
}

function buatKartuProduk(produk) {
  const status = statusStok(produk.stok);
  const labelUnggulan = produk.unggulan
    ? '<span class="product-badge">Favorit</span>'
    : "";

  return `
    <article class="js-product-card">
      ${labelUnggulan}
      <h3>${produk.nama}</h3>
      <p>${produk.kategori}</p>
      <p class="price">${formatRupiah(produk.harga)}</p>
      <span class="stock-badge ${status.className}">${status.label}</span>
    </article>
  `;
}

function renderProduk() {
  const grid = document.querySelector("#produk-dinamis");
  const ringkasan = document.querySelector("#produk-ringkasan");
  const unggulan = document.querySelector("#produk-unggulan");

  if (!grid || !ringkasan || !unggulan) {
    console.warn("Target render produk belum lengkap.");
    return;
  }

  const produkTersedia = produkUmkm.filter((produk) => produk.stok > 0);
  const produkUnggulan = produkUmkm.find((produk) => produk.unggulan === true);
  const markupProduk = produkTersedia.map(buatKartuProduk).join("");

  produkUmkm.forEach((produk) => {
    console.log("Debug produk:", produk.nama, "stok:", produk.stok);
  });

  grid.innerHTML = markupProduk;
  ringkasan.textContent = `${produkTersedia.length} produk tersedia dari ${produkUmkm.length} data.`;
  unggulan.textContent = produkUnggulan
    ? `Produk unggulan: ${produkUnggulan.nama}`
    : "Belum ada produk unggulan.";

  console.log("Jumlah produk tersedia:", produkTersedia.length);
  console.table(produkUmkm);
}

document.addEventListener("DOMContentLoaded", renderProduk);
