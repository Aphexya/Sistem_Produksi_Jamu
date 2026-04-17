# Panduan & Pengingat untuk AI (AI Guidelines)

Dokumen ini berfungsi sebagai pengingat untuk AI agar tetap fokus, akurat, dan tidak melenceng dari konteks permasalahan.

## 1. Fokus pada Tujuan (Stay Focus)
- Pahami tujuan utama dari setiap permintaan pengguna (*User*).
- Jangan menambahkan fitur, kode, detail, atau penjelasan di luar konteks yang diminta kecuali sangat krusial dan relevan.
- Jika instruksi atau konteks kurang jelas, **wajib bertanya** untuk meminta klarifikasi sebelum memulai eksekusi.

## 2. Hindari Halusinasi (No Hallucination)
- Jika tidak yakin, tidak tahu, atau tidak memiliki konteks file yang cukup, katakan dengan jujur. Jangan menebak-nebak.
- Jangan mengarang *library*, *method*, API, atau sintaks palsu. Gunakan hanya yang terbukti ada di dokumentasi resmi.
- Lakukan verifikasi struktur direktori, nama file, dan kode sebelum membuat asumsi.

## 3. Eksekusi yang Presisi & Aman
- Jangan mengeksekusi perintah terminal yang bersifat destruktif tanpa double-check.
- Saat melakukan *edit* kode, ubah HANYA bagian yang relevan. Jangan merusak komentar atau kode lain yang tidak terkait.
- Lakukan pendekatan *step-by-step* (langkah demi langkah) untuk masalah yang kompleks.

## 4. Eksekusi Langsung & Komunikasi Efisien (Direct Code Implementation)
- **LANGSUNG TULIS KODENYA:** Jangan terlalu banyak berteori, bertele-tele, ataupun sekedar memberi saran panjang. Jika *User* meminta suatu fitur atau perbaikan, **langsung berikan cuplikan kodenya** atau aplikasikan perubahan ke dalam file secara langsung.
- Hindari penulisan *pseudocode*. Berikan implementasi yang real, siap pakai, dan bisa langsung dijalankan (*executable*).
- Jawablah dengan ringkas, lugas, dan seperlunya (*Concise*).
- Formatlah jawaban dan kode menggunakan Markdown yang rapi agar mudah dipahami.

## 5. Arsitektur Modular & Penataan Kode (Separation of Concerns)
- **Hindari Kode Menumpuk dalam 1 File:** Jangan membuat *Spaghetti Code* atau menyatukan seluruh fungsi ke dalam satu file besar.
- **Pemisahan Konteks yang Jelas:** Pisahkan kode berdasarkan fungsinya strukturnya (contoh: *Routes* khusus menangani rute/endpoint, *Controllers/Logic* khusus untuk logika bisnis, *Models* untuk *database/query*, dan *Utils/Helpers* untuk fungsi bantuan).
- Bangun kode ke dalam *folder-folder* yang tertata rapi agar proyek mudah dipertahankan (*maintainable*) seiring berjalannya waktu.

## 6. Ikuti Konvensi Proyek
- Sesuaikan gaya penulisan kode (*code style*) dan struktur dengan yang sudah ada di dalam proyek (*workspace*).
- Utamakan performa, keamanan, dan penerapan praktik terbaik (*best practices*) dari bahasa pemrograman atau *framework* yang sedang digunakan.

---
**Instruksi untuk AI:**
Setiap kali menghadapi tugas (terutama yang kompleks), ingatlah prinsip-prinsip di atas agar solusi yang diberikan tepat sasaran, efektif, dan tidak melenceng.
