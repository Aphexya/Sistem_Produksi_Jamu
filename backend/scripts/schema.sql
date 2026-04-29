-- ============================================================
-- SCHEMA DATABASE: jamu
-- Sistem Produksi Jamu - Penjamu Handal
-- ============================================================

CREATE DATABASE IF NOT EXISTS jamu CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE jamu;

-- ------------------------------------------------------------
-- Tabel: kota
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS kota (
  id_kota   INT AUTO_INCREMENT PRIMARY KEY,
  nama_kota VARCHAR(100) NOT NULL,
  ket_kota  TEXT
);

-- ------------------------------------------------------------
-- Tabel: user (admin/staff)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS user (
  id_user   INT AUTO_INCREMENT PRIMARY KEY,
  id_kota   INT,
  username  VARCHAR(100) NOT NULL UNIQUE,
  email     VARCHAR(150) NOT NULL UNIQUE,
  pw        VARCHAR(255) NOT NULL,
  role      ENUM('admin','supervisor','staff') NOT NULL DEFAULT 'staff',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_kota) REFERENCES kota(id_kota) ON DELETE SET NULL
);

-- ------------------------------------------------------------
-- Tabel: produsen (supplier/pemasok)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS produsen (
  id_produsen  INT AUTO_INCREMENT PRIMARY KEY,
  nama_produsen VARCHAR(200) NOT NULL,
  alamat        TEXT,
  kota          VARCHAR(100),
  kontak        VARCHAR(100),
  email         VARCHAR(150),
  status        ENUM('aktif','menunggu','ditangguhkan') DEFAULT 'aktif',
  created_at    DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------
-- Tabel: jamu (resep/produk jamu)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS jamu (
  id_jamu    INT AUTO_INCREMENT PRIMARY KEY,
  id_user    INT,
  nama_jamu  VARCHAR(200) NOT NULL,
  ket_jamu   TEXT,
  jenis      VARCHAR(50),          -- pil, serbuk, kapsul, cair, selai, krim
  perizinan  VARCHAR(50),          -- KEMENKES, BPOM, P-IRT, dll
  id_produsen INT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_user) REFERENCES user(id_user) ON DELETE SET NULL,
  FOREIGN KEY (id_produsen) REFERENCES produsen(id_produsen) ON DELETE SET NULL
);

-- ------------------------------------------------------------
-- Tabel: rempah (bahan baku / ingredient)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS rempah (
  id_rempah   INT AUTO_INCREMENT PRIMARY KEY,
  nama_rempah VARCHAR(200) NOT NULL,
  ket_rempah  TEXT
);

-- ------------------------------------------------------------
-- Tabel: bahan (inventaris stok bahan baku)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS bahan (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  nama        VARCHAR(200) NOT NULL,
  kategori    VARCHAR(100),         -- Rimpang, Akar, Daun, Buah, Biji, Kulit, Bunga, Lainnya
  satuan      VARCHAR(20),          -- kg, gram, liter, ml, butir, tangkai
  stokAwal    DECIMAL(10,2) DEFAULT 0,
  hargaSatuan DECIMAL(15,2) DEFAULT 0,
  threshold   DECIMAL(10,2) DEFAULT 10,  -- batas minimum stok
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at  DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------
-- Tabel: khasiat
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS khasiat (
  id_khasiat  INT AUTO_INCREMENT PRIMARY KEY,
  khasiat     VARCHAR(200) NOT NULL,
  ket_khasiat TEXT
);

-- ------------------------------------------------------------
-- Tabel: komposisi (relasi jamu <-> rempah)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS komposisi (
  id_komposisi  INT AUTO_INCREMENT PRIMARY KEY,
  id_rempah     INT NOT NULL,
  id_jamu       INT NOT NULL,
  banyak_rempah VARCHAR(100),
  FOREIGN KEY (id_rempah) REFERENCES rempah(id_rempah) ON DELETE CASCADE,
  FOREIGN KEY (id_jamu)   REFERENCES jamu(id_jamu)   ON DELETE CASCADE
);

-- ------------------------------------------------------------
-- Tabel: khasiat_jamu (relasi jamu <-> khasiat)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS khasiat_jamu (
  id_khasiat_jamu INT AUTO_INCREMENT PRIMARY KEY,
  id_khasiat      INT NOT NULL,
  id_jamu         INT NOT NULL,
  FOREIGN KEY (id_khasiat) REFERENCES khasiat(id_khasiat) ON DELETE CASCADE,
  FOREIGN KEY (id_jamu)    REFERENCES jamu(id_jamu)       ON DELETE CASCADE
);

-- ------------------------------------------------------------
-- Tabel: produksi (batch produksi)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS produksi (
  id_produksi  INT AUTO_INCREMENT PRIMARY KEY,
  id_jamu      INT NOT NULL,
  id_user      INT,
  kode_batch   VARCHAR(50) UNIQUE,
  ukuran_batch DECIMAL(10,2),       -- dalam KG
  volume_output DECIMAL(10,2),      -- dalam Liter
  efisiensi    DECIMAL(5,2),        -- persentase
  status       ENUM('antrian','ekstraksi','botolisasi','selesai') DEFAULT 'antrian',
  catatan      TEXT,
  created_at   DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at   DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (id_jamu) REFERENCES jamu(id_jamu) ON DELETE RESTRICT,
  FOREIGN KEY (id_user) REFERENCES user(id_user) ON DELETE SET NULL
);

-- ------------------------------------------------------------
-- Seed: Admin default (password: admin123)
-- bcrypt hash dari "admin123"
-- ------------------------------------------------------------
INSERT IGNORE INTO kota (id_kota, nama_kota, ket_kota) VALUES
  (1, 'Sampang',   'Kabupaten Sampang, Madura'),
  (2, 'Sumenep',   'Kabupaten Sumenep, Madura'),
  (3, 'Pamekasan', 'Kabupaten Pamekasan, Madura'),
  (4, 'Bangkalan', 'Kabupaten Bangkalan, Madura');

INSERT IGNORE INTO user (id_user, id_kota, username, email, pw, role) VALUES
  (1, 1, 'admin', 'admin@penjamuhandal.id',
   '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lHHG',
   'admin');
-- password: admin123
