# Worksheet Evidence

| Checklist | Evidence | Status |
| --- | --- | --- |
| `index.html` dan `tentang.html` dapat dibuka | Kedua file tersedia di folder utama dan memakai stylesheet serta script yang sama. | Terpenuhi |
| Landmark serta heading hierarchy masuk akal | Terdapat `header`, `nav`, `main`, `section`, `footer`, serta urutan heading `h1`, `h2`, dan `h3`. | Terpenuhi |
| Navigasi dua halaman dan anchor Kontak berjalan | Link navigasi mengarah ke `index.html`, `tentang.html`, dan `#kontak`. | Terpenuhi |
| Focus keyboard terlihat | Selector `a:focus-visible` dan `button:focus-visible` menyediakan outline. | Terpenuhi |
| Gambar informatif memiliki alt yang sesuai | Gambar profil dan logo memiliki teks `alt` yang deskriptif. | Terpenuhi |
| Evidence praktikum dan tugas mandiri tercatat pada satu worksheet | Checklist ini menjadi worksheet gabungan proyek. Bukti praktikum/tugas mandiri perlu dilengkapi dengan screenshot atau tautan pengumpulan bila diwajibkan dosen. | Sebagian |

## Challenge

State link aktif menggunakan class manual `active` pada halaman yang sedang dibuka, dengan `aria-current="page"` tetap dipertahankan untuk aksesibilitas.