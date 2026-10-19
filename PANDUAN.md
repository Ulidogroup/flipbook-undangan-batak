# ULIDO Digital Flipbook — panduan GitHub Pages

## Cara pasang
1. Ekstrak ZIP ini di komputer.
2. Buka GitHub, buat repository baru dengan nama `ULIDO-Flipbook` (public).
3. Upload **ISI folder** `ULIDO-Digital-Flipbook` (file `index.html` wajib berada di root repository, bukan di dalam subfolder lagi).
4. Buka Settings → Pages → Build and deployment → Deploy from a branch → `main` → `/(root)` → Save.
5. Link website: `https://NAMA-USERNAME.github.io/ULIDO-Flipbook/` (sesuaikan username dan nama repository).

## Untuk pesanan baru
- Salin repository ini menjadi repository baru, atau ganti isi dalam repository yang sama.
- Buka `config.js` lalu ubah `title`, `customer`, `subtitle`, `whatsappNumber`, `mapsUrl`, dan daftar `pages`.
- Masukkan gambar ke `assets/pages/`; boleh JPG, PNG, WebP, SVG. Contoh `assets/pages/01.jpg`.
- Ukuran gambar disarankan: 707×1000 piksel / 1414×2000 (portrait), dengan rasio konsisten pada semua halaman.
- Ubah daftar `pages` sesuai nama file dan urutannya, mis. `['assets/pages/01.jpg', 'assets/pages/02.jpg']`.
- Masukkan file MP3 sendiri ke `assets/music/background.mp3`. **Paket ini tidak berisi musik berlisensi.** Browser dapat menolak putar otomatis, sehingga musik diaktifkan saat pengguna mengetuk tombol Buka Undangan.
- Tautan penerima personal: `https://NAMA-USERNAME.github.io/ULIDO-Flipbook/?to=Bapak%20Andi%20dan%20Keluarga`.
- Jika tidak ingin WhatsApp/Maps, kosongkan `whatsappNumber` atau `mapsUrl`.

## Catatan teknis
- Contoh isi buku memakai empat halaman SVG demo, **bukan** halaman dari FlipHTML5.
- 100% website statis, tanpa database, tanpa biaya berlangganan pustaka flipbook.
- Efek membalik halaman buatan HTML/CSS/JS, tanpa layanan pihak ketiga.
- Untuk pelanggan yang menerima link, nama tamu dapat diubah dengan parameter URL `?to=`; ini hanya personalisasi tampilan, bukan perlindungan privasi.
- Navigasi: tombol, geser di HP, tombol panah keyboard; zoom memperbesar halaman pada bukaan saat itu.
- Agar halaman muncul dalam urutan logis, sebaiknya jumlah halaman genap.
- Jika ada cache setelah update GitHub Pages, lakukan hard refresh (Ctrl+F5).

## Kustomisasi
- Warna latar: `backgroundColor` pada `config.js`.
- Warna aksen: `accentColor` pada `config.js`.
- Ubah semua ilustrasi dan isi halaman cukup dengan mengganti file gambar.

Dibuat untuk ULIDO Cetak.
