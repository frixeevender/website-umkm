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

const produkGrid = document.querySelector("#produk-dinamis");
const produkStatus = document.querySelector("#produk-ringkasan");
const produkUnggulan = document.querySelector("#produk-unggulan");
const tombolFilter = document.querySelectorAll("[data-filter]");

function buatElemenProduk(produk) {
  const card = document.createElement("article");
  card.classList.add("js-product-card");

  const status = statusStok(produk.stok);
  if (produk.unggulan) {
    const badge = document.createElement("span");
    badge.classList.add("product-badge");
    badge.textContent = "Favorit";
    card.append(badge);
  }

  const title = document.createElement("h3");
  title.textContent = produk.nama;

  const category = document.createElement("p");
  category.classList.add("category-note");
  category.textContent = produk.kategori;

  const price = document.createElement("p");
  price.classList.add("price");
  price.textContent = formatRupiah(produk.harga);

  const stock = document.createElement("span");
  stock.classList.add("stock-badge");
  if (status.className) {
    stock.classList.add(status.className);
  }
  stock.textContent = status.label;

  const actions = document.createElement("div");
  actions.classList.add("card-actions");

  const contactLink = document.createElement("a");
  contactLink.classList.add("button");
  contactLink.href = "kontak.html";
  contactLink.textContent = "Tanya produk";

  const priceLink = document.createElement("a");
  priceLink.href = "#harga-title";
  priceLink.textContent = "Lihat harga";

  const hideButton = document.createElement("button");
  hideButton.classList.add("hide-product-button");
  hideButton.type = "button";
  hideButton.textContent = "Sembunyikan sementara";
  hideButton.addEventListener("click", () => {
    card.remove();
    produkStatus.textContent = "Satu kartu disembunyikan sementara. Pilih filter untuk menampilkannya kembali.";
  });

  actions.append(contactLink, priceLink, hideButton);
  card.append(title, category, price, stock, actions);
  return card;
}

function buatEmptyState(kategori) {
  const empty = document.createElement("p");
  empty.classList.add("empty-state");
  empty.textContent = `Belum ada produk pada kategori ${kategori}.`;
  return empty;
}

function renderProduk(kategoriAktif = "Semua") {
  if (!produkGrid || !produkStatus) {
    console.warn("Target render produk belum lengkap.");
    return;
  }

  const produkTampil = kategoriAktif === "Semua"
    ? produkUmkm
    : produkUmkm.filter((produk) => produk.kategori === kategoriAktif);

  produkGrid.replaceChildren();

  if (produkTampil.length === 0) {
    produkGrid.append(buatEmptyState(kategoriAktif));
    produkStatus.textContent = "0 produk ditemukan.";
    return;
  }

  produkTampil.forEach((produk) => {
    produkGrid.append(buatElemenProduk(produk));
  });

  produkStatus.textContent = `${produkTampil.length} produk ditampilkan.`;
}

tombolFilter.forEach((tombol) => {
  tombol.addEventListener("click", (event) => {
    const tombolAktif = event.currentTarget;
    const kategori = tombolAktif.dataset.filter;

    if (!kategori) {
      console.warn("Tombol filter tidak memiliki data-filter.");
      return;
    }

    tombolFilter.forEach((item) => {
      item.classList.remove("is-active");
      item.setAttribute("aria-pressed", "false");
    });
    tombolAktif.classList.add("is-active");
    tombolAktif.setAttribute("aria-pressed", "true");

    renderProduk(kategori);
  });
});

if (produkUnggulan) {
  const unggulan = produkUmkm.find((produk) => produk.unggulan === true);
  produkUnggulan.textContent = unggulan
    ? `Produk unggulan: ${unggulan.nama}`
    : "Belum ada produk unggulan.";
}

renderProduk();
