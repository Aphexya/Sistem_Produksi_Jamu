# 📋 RINGKASAN PROJECT - SISTEM PRODUKSI JAMU

## ✅ STATUS PROJECT: SIAP DIJALANKAN

---

## 🎯 JAWABAN SINGKAT PERTANYAAN ANDA

### **Q: Loginnya pakai email dan password apa?**

**A: Username dan password untuk login:**
- **Username:** `admin` (bukan email!)
- **Password:** `admin123`

**PENTING:** Di form login, label-nya memang tertulis "Alamat Email", tapi **isi dengan username `admin`**, bukan email. Ini bug UI kecil yang tidak mempengaruhi fungsi.

---

### **Q: Port 5173 atau 3000? Yang mana yang benar?**

**A: KEDUANYA BENAR dan harus jalan bersamaan!**

- **Port 3000** = Backend API (Express.js)
- **Port 5173** = Frontend (React + Vite)

**Cara aksesnya:**
1. Buka browser
2. Akses **http://localhost:5173** (ini yang Anda buka untuk pakai aplikasi)
3. Frontend akan otomatis komunikasi dengan backend di port 3000

**Jadi yang Anda buka di browser adalah port 5173, tapi backend harus jalan di port 3000.**

---

### **Q: Kenapa tidak bisa dibuka di browser?**

**A: Kemungkinan penyebabnya:**

1. **Server belum jalan** - Pastikan kedua terminal masih running:
   - Terminal 1: Backend (`npm run dev` di folder `backend/`)
   - Terminal 2: Frontend (`npm run dev` di folder `frontend/`)

2. **MySQL belum jalan** - Buka XAMPP/Laragon, klik Start pada MySQL

3. **Dependencies belum diinstall** - Jalankan `npm install` di kedua folder

4. **Port sudah dipakai** - Tutup aplikasi lain yang pakai port 3000 atau 5173

---

## 🚀 CARA MENJALANKAN (RINGKAS)

### **Persiapan (sekali saja):**
```bash
# 1. Import database
# Buka phpMyAdmin → Import → Pilih jamu.sql → Go

# 2. Install backend
cd backend
npm install

# 3. Install frontend
cd ../frontend
npm install
```

### **Jalankan (setiap kali mau pakai):**

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Tunggu sampai muncul: `🚀 Server berjalan di http://localhost:3000`

**Terminal 2 - Frontend (buka terminal baru!):**
```bash
cd frontend
npm run dev
```
Tunggu sampai muncul: `➜  Local:   http://localhost:5173/`

**Buka browser:** http://localhost:5173

**Login dengan:**
- Username: `admin`
- Password: `admin123`

---

## 📁 STRUKTUR PROJECT

```
Sistem_Produksi_Jamu/
├── backend/                    # Backend API (Express.js)
│   ├── src/
│   │   ├── routes/            # Semua endpoint API
│   │   ├── middleware/        # JWT authentication
│   │   └── config/            # Database connection
│   ├── scripts/
│   │   └── importExcel.js     # Import data dari Excel
│   ├── .env                   # Konfigurasi database (sudah OK)
│   └── package.json
│
├── frontend/                   # Frontend (React + Vite)
│   ├── src/
│   │   ├── pages/             # Halaman utama
│   │   ├── components/        # Komponen UI
│   │   └── config/            # Konfigurasi routing
│   └── package.json
│
├── jamu.sql                    # Database schema (import ini!)
├── jamu206.xlsx                # Data Excel (opsional)
├── CARA_MENJALANKAN_PROJECT.md # Panduan lengkap
└── RINGKASAN_PROJECT.md        # File ini
```

---

## 🔐 AKUN DEFAULT

**Login dengan Email:**
| Email | Password | Role |
|-------|----------|------|
| `admin@penjamuhandal.id` | `admin123` | admin |

**ATAU Login dengan Username:**
| Username | Password | Role |
|----------|----------|------|
| `admin` | `admin123` | admin |

**Keduanya bisa digunakan!** Backend mendukung login dengan email atau username.

---

## 🌐 URL PENTING

| Service | URL | Keterangan |
|---------|-----|------------|
| **Aplikasi Web** | http://localhost:5173 | Buka ini di browser |
| **Backend API** | http://localhost:3000 | Jangan dibuka, ini untuk internal |
| **Health Check** | http://localhost:3000/health | Test backend jalan atau tidak |
| **phpMyAdmin** | http://localhost/phpmyadmin | Untuk cek database |

---

## 📡 ENDPOINT API YANG TERSEDIA

### **Auth**
- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Register user baru

### **Jamu (Resep)**
- `GET /api/jamu` - List semua jamu
- `GET /api/jamu/:id` - Detail jamu + komposisi + khasiat
- `POST /api/jamu` - Tambah jamu baru
- `PUT /api/jamu/:id` - Update jamu
- `DELETE /api/jamu/:id` - Hapus jamu

### **Bahan (Inventaris)**
- `GET /api/bahan` - List semua bahan
- `GET /api/bahan/:id` - Detail bahan
- `POST /api/bahan` - Tambah bahan
- `PUT /api/bahan/:id` - Update stok/harga
- `DELETE /api/bahan/:id` - Hapus bahan

### **Supplier (Pemasok)**
- `GET /api/supplier` - List supplier
- `GET /api/supplier/metrics` - Statistik supplier
- `GET /api/supplier/:id` - Detail supplier
- `POST /api/supplier` - Tambah supplier
- `PUT /api/supplier/:id` - Update supplier
- `DELETE /api/supplier/:id` - Hapus supplier

### **Produksi (Batch)**
- `GET /api/produksi` - List batch produksi
- `GET /api/produksi/metrics` - Statistik dashboard
- `GET /api/produksi/:id` - Detail batch
- `POST /api/produksi` - Buat batch baru
- `PUT /api/produksi/:id` - Update batch
- `DELETE /api/produksi/:id` - Hapus batch

### **Search**
- `GET /api/search?q=kunyit` - Pencarian global

### **Lainnya**
- `GET /api/rempah` - List rempah
- `GET /api/khasiat` - List khasiat
- `GET /api/kota` - List kota
- `GET /api/users` - List users (admin only)

---

## 🗄️ DATABASE

**Nama Database:** `jamu`

**Tabel (10):**
1. `user` - Admin dan staff
2. `jamu` - Resep/produk jamu
3. `rempah` - Master rempah/ingredient
4. `bahan` - Inventaris stok bahan baku
5. `khasiat` - Master khasiat
6. `produsen` - Supplier/pemasok
7. `produksi` - Batch produksi
8. `komposisi` - Relasi jamu ↔ rempah
9. `khasiat_jamu` - Relasi jamu ↔ khasiat
10. `kota` - Master kota

---

## 🛠️ TEKNOLOGI YANG DIGUNAKAN

### **Backend:**
- Express.js - Web framework
- MySQL (mysql2) - Database
- JWT - Authentication
- bcryptjs - Password hashing
- XLSX - Import Excel

### **Frontend:**
- React 19 - UI framework
- Vite - Build tool
- TailwindCSS - Styling
- React Router - Routing
- React Query - Data fetching
- Zustand - State management

---

## ✅ CHECKLIST SEBELUM JALANKAN

- [ ] XAMPP/Laragon sudah terinstall
- [ ] MySQL di XAMPP/Laragon sudah **Running** (hijau)
- [ ] Database `jamu.sql` sudah diimport di phpMyAdmin
- [ ] File `backend/.env` sudah ada (sudah OK, tidak perlu diubah)
- [ ] `npm install` sudah dijalankan di folder `backend/`
- [ ] `npm install` sudah dijalankan di folder `frontend/`
- [ ] Backend server sudah jalan di terminal 1
- [ ] Frontend server sudah jalan di terminal 2
- [ ] Browser sudah dibuka di http://localhost:5173

---

## 🔧 TROUBLESHOOTING CEPAT

### **Error: "Cannot connect to database"**
→ Pastikan MySQL di XAMPP/Laragon sudah **Running**

### **Error: "'vite' is not recognized"**
→ Jalankan `npm install` di folder `frontend/`

### **Error: "Port already in use"**
→ Tutup aplikasi lain atau restart komputer

### **Error: "Invalid credentials"**
→ Gunakan email: `admin@penjamuhandal.id` atau username: `admin`
→ Password: `admin123`

### **Halaman login tidak muncul**
→ Pastikan frontend server sudah jalan dan buka http://localhost:5173

---

## 📞 FILE PANDUAN LENGKAP

Untuk panduan lebih detail, baca file:
- **`CARA_MENJALANKAN_PROJECT.md`** - Panduan step-by-step lengkap
- **`backend/README.md`** - Dokumentasi backend API

---

## 🎉 SELAMAT MENCOBA!

Jika masih ada pertanyaan atau error, screenshot error-nya dan tanyakan lagi.

**Update terakhir:** 29 April 2026
**Status:** ✅ Siap dijalankan
**GitHub:** Sudah dipush ke repository
