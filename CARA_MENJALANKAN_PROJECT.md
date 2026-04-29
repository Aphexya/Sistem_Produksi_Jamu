# 🚀 CARA MENJALANKAN PROJECT SISTEM PRODUKSI JAMU

## ✅ CHECKLIST PERSIAPAN

Sebelum menjalankan project, pastikan sudah terinstall:
- ✅ **XAMPP** atau **Laragon** (untuk MySQL)
- ✅ **Node.js** versi 16 atau lebih baru
- ✅ **npm** (otomatis terinstall dengan Node.js)

---

## 📋 LANGKAH-LANGKAH LENGKAP

### **STEP 1: Jalankan MySQL**

1. Buka **XAMPP Control Panel** atau **Laragon**
2. Klik tombol **Start** pada **MySQL**
3. Pastikan statusnya menjadi **Running** (hijau)

---

### **STEP 2: Import Database**

1. Buka browser, akses **http://localhost/phpmyadmin**
2. Klik tab **"Import"** di menu atas
3. Klik tombol **"Choose File"**
4. Pilih file **`jamu.sql`** yang ada di **root folder project** ini
5. Scroll ke bawah, klik tombol **"Go"**
6. Tunggu sampai muncul pesan sukses ✅

**Hasil yang diharapkan:**
- Database `jamu` terbuat
- 10 tabel terbuat (user, jamu, rempah, khasiat, dll)
- 4 kota Madura sudah masuk
- 1 admin default sudah masuk

---

### **STEP 3: Install Dependencies Backend**

Buka **Command Prompt** atau **Terminal**, lalu jalankan:

```bash
cd backend
npm install
```

Tunggu sampai selesai (biasanya 1-2 menit).

---

### **STEP 4: Import Data dari Excel (OPSIONAL)**

Jika ingin import data dari file `jamu206.xlsx`:

```bash
node scripts/importExcel.js
```

**Catatan:** File `jamu206.xlsx` harus ada di **root folder project** (sejajar dengan folder `backend/` dan `frontend/`).

Output yang diharapkan:
```
✅ Terhubung ke database: jamu
📂 Sheet ditemukan: Sheet1, BPOM, pil, serbuk, kapsul, cair, selai, krim
📊 Total baris data: 206
🏭 Produsen diproses: 15
🌿 Rempah/kandungan diproses: 120
💊 Khasiat diproses: 85
✅ Import selesai!
```

---

### **STEP 5: Jalankan Backend Server**

Masih di folder `backend/`, jalankan:

```bash
npm run dev
```

**Output yang diharapkan:**
```
🚀 Server berjalan di http://localhost:3000
✅ Database terhubung: jamu
```

**JANGAN TUTUP TERMINAL INI!** Biarkan tetap berjalan.

---

### **STEP 6: Install Dependencies Frontend**

Buka **terminal/command prompt BARU** (jangan tutup yang backend), lalu:

```bash
cd frontend
npm install
```

Tunggu sampai selesai (biasanya 2-3 menit).

---

### **STEP 7: Jalankan Frontend Server**

Masih di folder `frontend/`, jalankan:

```bash
npm run dev
```

**Output yang diharapkan:**
```
  VITE v8.0.4  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

**JANGAN TUTUP TERMINAL INI!** Biarkan tetap berjalan.

---

### **STEP 8: Buka di Browser**

1. Buka browser (Chrome/Firefox/Edge)
2. Akses **http://localhost:5173**
3. Anda akan melihat halaman login

---

## 🔐 LOGIN CREDENTIALS

Gunakan akun admin default:

- **Username:** `admin`
- **Password:** `admin123`

**CATATAN PENTING:** 
- Di form login, label-nya tertulis "Alamat Email" tapi **isi dengan USERNAME**, bukan email!
- Ini bug UI kecil yang belum diperbaiki, tapi fungsionalitasnya benar.

---

## 🌐 URL PENTING

| Service | URL | Status |
|---------|-----|--------|
| **Frontend** | http://localhost:5173 | Harus jalan |
| **Backend API** | http://localhost:3000 | Harus jalan |
| **phpMyAdmin** | http://localhost/phpmyadmin | Untuk cek database |
| **Health Check** | http://localhost:3000/health | Test backend |

---

## 🔧 TROUBLESHOOTING

### ❌ Problem: "Port 3000 already in use"

**Solusi Windows:**
```bash
netstat -ano | findstr :3000
taskkill /PID <nomor_PID> /F
```

Ganti `<nomor_PID>` dengan nomor yang muncul di kolom terakhir.

---

### ❌ Problem: "Port 5173 already in use"

**Solusi Windows:**
```bash
netstat -ano | findstr :5173
taskkill /PID <nomor_PID> /F
```

---

### ❌ Problem: "Cannot connect to database"

**Cek:**
1. Apakah MySQL di XAMPP/Laragon sudah **Running**?
2. Apakah file `backend/.env` sudah benar?
   - `DB_USER=root`
   - `DB_PASSWORD=` (kosong untuk XAMPP default)
   - `DB_NAME=jamu`

---

### ❌ Problem: "'vite' is not recognized"

**Solusi:**
```bash
cd frontend
npm install
npm run dev
```

---

### ❌ Problem: "Table 'jamu.user' doesn't exist"

**Solusi:**
Import ulang database `jamu.sql` di phpMyAdmin (lihat STEP 2).

---

### ❌ Problem: Frontend tidak bisa fetch data dari backend

**Cek:**
1. Apakah backend sudah jalan di port 3000?
2. Buka http://localhost:3000/health di browser
3. Jika muncul `{"status":"ok"}`, berarti backend OK
4. Jika tidak, restart backend server

---

### ❌ Problem: Login gagal "Invalid credentials"

**Cek:**
1. Apakah sudah import `jamu.sql`?
2. Apakah username = `admin` (bukan email)?
3. Apakah password = `admin123`?
4. Cek di phpMyAdmin, tabel `user`, apakah ada user dengan username `admin`?

---

## 📊 CARA CEK APAKAH SUDAH JALAN

### ✅ Backend OK:
```bash
curl http://localhost:3000/health
```
Harus muncul: `{"status":"ok"}`

### ✅ Frontend OK:
Buka http://localhost:5173 di browser, harus muncul halaman login.

### ✅ Database OK:
Buka phpMyAdmin → Database `jamu` → harus ada 10 tabel.

---

## 🎯 RINGKASAN PERINTAH

```bash
# Terminal 1 - Backend
cd backend
npm install
npm run dev

# Terminal 2 - Frontend (buka terminal baru!)
cd frontend
npm install
npm run dev
```

**Kedua terminal harus tetap berjalan!**

---

## 📞 BANTUAN LEBIH LANJUT

Jika masih ada masalah:
1. Screenshot error yang muncul
2. Cek apakah MySQL sudah running
3. Cek apakah kedua server (backend + frontend) sudah jalan
4. Pastikan tidak ada firewall yang memblokir port 3000 atau 5173

---

## 📝 CATATAN PENTING

- **Backend** harus jalan di port **3000**
- **Frontend** harus jalan di port **5173**
- **Kedua server** harus jalan **bersamaan**
- **MySQL** harus **running** sebelum jalankan backend
- **Jangan tutup terminal** yang menjalankan server
- Untuk stop server: tekan **Ctrl + C** di terminal

---

**Selamat mencoba! 🎉**
