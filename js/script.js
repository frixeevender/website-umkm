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