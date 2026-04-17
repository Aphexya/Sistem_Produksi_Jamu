# Pedoman & Instruksi Frontend (Frontend Skill Guidelines)

Dokumen ini berisi standar dan panduan utama bagi AI dalam mengembangkan, mendesain, atau me-refactor antarmuka pengguna (*Frontend*). AI wajib mengikuti prinsip-prinsip ini agar hasil akhir memiliki performa tinggi, struktur kode yang bersih, dan desain visual yang memukau.

## 0. Aturan Mutlak (Mandatory Prototype)
- **Wajib Ikuti Prototipe:** Seluruh desain antarmuka, tata letak, tampilan komponen, visual, dan alur interaksi aplikasi **WAJIB mengikuti secara ketat** acuan dari prototipe `protype_penjamu_handal_production_system`. Jangan mengubah, mendesain ulang, atau membuat struktur/layout baru yang melenceng dari prototipe tersebut kecuali diminta secara spesifik oleh *User*. Prototipe ini adalah sumber landasan utama (*Single Source of Truth*).

## 1. Visual & Estetika (Rich Aesthetics & UI/UX)
- **Kesan Premium:** Buat antarmuka yang modern dan tidak kaku (hindari desain MVP yang terlalu sederhana). Pengguna harus merasa "wow" pada pandangan pertama.
- **Warna & Tipografi:** Gunakan palet warna yang harmonis (misal: HSL *tailored colors*, *sleek dark mode*) alih-alih warna standar *browser*. Gunakan *font* modern seperti Inter, Roboto, atau Outfit.
- **Interaktivitas:** Tambahkan efek *hover*, transisi yang mulus, *micro-animations*, dan efek modern seperti *glassmorphism* di mana hal itu meningkatkan UX tanpa mengorbankan performa.
- **Responsivitas:** Desain wajib *Mobile-First* dan terlihat sempurna di segala ukuran layar (Desktop, Tablet, Mobile) menggunakan teknik CSS yang dinamis (Flexbox/Grid).

## 2. Arsitektur & Teknologi Stack
- **Kemandirian (Modularity):** Bangun arsitektur komponen yang dapat digunakan ulang (*reusable*), terisolasi (*encapsulated*), dan memiliki *Single Responsibility*.
- **Styling:** Gunakan Vanilla CSS murni untuk fleksibilitas maksimal, kecuali *User* secara eksplisit meminta penggunaan *framework* seperti TailwindCSS. Jika menggunakan Tailwind, pastikan versi yang digunakan dikonfirmasi terlebih dahulu.
- **Framework (Jika digunakan):** Jika *User* meminta Web App yang kompleks (seperti React via Vite atau Next.js), ikuti standar penulisan *framework* tersebut (contoh: *Hooks* yang bersih di React, pemisahan *Routing*, *Code Splitting* dengan Suspense/Lazy load).

## 3. SEO & Aksesibilitas (Best Practices)
- **Semantic HTML:** Selalu gunakan tag HTML5 yang tepat (`<header>`, `<main>`, `<article>`, `<section>`, dll) dan jangan hanya bergantung pada elemen `<div>`.
- **Struktur Heading:** Gunakan struktur *heading* yang benar (Hanya satu `<h1>` per halaman) untuk keperluan SEO.
- **Meta & Atribut:** Pastikan atribut krusial seperti `alt` pada gambar, `aria-labels` untuk elemen interaktif, serta meta deskripsi sudah diterapkan.
- **Identifikasi Elemen:** Beri atribut unik (seperti `id` atau `data-testid`) pada elemen interaktif yang penting untuk mempermudah *testing* (E2E Test) di masa depan.

## 4. Worklfow Implementasi
1. **Pahami & Rencanakan:** Pahami *wireframe* atau *requirements* sebelum menulis kode.
2. **Setup Sistem Desain:** Mulai dari fondasi (misal: `index.css`), atur variabel CSS untuk warna, *spacing*, dan tipografi.
3. **Bangun Komponen:** Buat komponen-komponen kecil dengan *style* bawaan sistem desain (jangan menggunakan *styling ad-hoc* berserakan).
4. **Perakitan & Integrasi:** Gabungkan komponen menjadi halaman utuh, pastikan navigasi antar halaman berfungsi.
5. **Poles Akhir:** Uji interaksi UI, animasi, dan optimasi performa *loading*.

---
**Instruksi untuk AI:** Jika diminta untuk membuat atau memperbaiki antarmuka (*UI/Frontend*), baca file ini sebagai patokan bahwa fungsionalitas saja tidak cukup; desain visual (*Aesthetics*) sangat diprioritaskan.
