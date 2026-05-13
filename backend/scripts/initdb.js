// ============================================================
// INIT DB - Buat semua tabel lalu jalankan seeder
// Jalankan dengan: node scripts/initdb.js
// ============================================================

require('dotenv').config();
const { Sequelize } = require('sequelize');

async function initDB() {
  const dbName = process.env.DB_NAME || 'jamu';

  // Step 1: Koneksi tanpa nama DB untuk CREATE DATABASE
  const rootConn = new Sequelize('', process.env.DB_USER || 'root', process.env.DB_PASSWORD || '', {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false,
  });

  try {
    await rootConn.authenticate();
    console.log('✅ Koneksi MySQL berhasil.\n');
    await rootConn.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
    console.log(`🗄️  Database '${dbName}' siap.\n`);
    await rootConn.close();
  } catch (err) {
    console.error('❌ Gagal koneksi MySQL:', err.message);
    process.exit(1);
  }

  // Step 2: Koneksi ke database jamu
  const db = new Sequelize(dbName, process.env.DB_USER || 'root', process.env.DB_PASSWORD || '', {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false,
  });

  try {
    console.log('🏗️  Membuat tabel...\n');

    await db.query(`
      CREATE TABLE IF NOT EXISTS \`kota\` (
        \`id_kota\`   INT AUTO_INCREMENT PRIMARY KEY,
        \`nama_kota\` VARCHAR(100) NOT NULL,
        \`ket_kota\`  TEXT
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('   ✔ kota');

    await db.query(`
      CREATE TABLE IF NOT EXISTS \`user\` (
        \`id_user\`    INT AUTO_INCREMENT PRIMARY KEY,
        \`id_kota\`    INT,
        \`username\`   VARCHAR(100) NOT NULL UNIQUE,
        \`email\`      VARCHAR(150) NOT NULL UNIQUE,
        \`pw\`         VARCHAR(255) NOT NULL,
        \`role\`       ENUM('admin','supervisor','staff') NOT NULL DEFAULT 'staff',
        \`created_at\` DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (\`id_kota\`) REFERENCES \`kota\`(\`id_kota\`) ON DELETE SET NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('   ✔ user');

    await db.query(`
      CREATE TABLE IF NOT EXISTS \`produsen\` (
        \`id_produsen\`   INT AUTO_INCREMENT PRIMARY KEY,
        \`nama_produsen\` VARCHAR(200) NOT NULL,
        \`alamat\`        TEXT,
        \`kota\`          VARCHAR(100),
        \`kontak\`        VARCHAR(100),
        \`email\`         VARCHAR(150),
        \`status\`        ENUM('aktif','menunggu','ditangguhkan') DEFAULT 'aktif',
        \`created_at\`    DATETIME DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('   ✔ produsen');

    await db.query(`
      CREATE TABLE IF NOT EXISTS \`jamu\` (
        \`id_jamu\`     INT AUTO_INCREMENT PRIMARY KEY,
        \`id_user\`     INT,
        \`nama_jamu\`   VARCHAR(200) NOT NULL,
        \`ket_jamu\`    TEXT,
        \`jenis\`       VARCHAR(50),
        \`perizinan\`   VARCHAR(50),
        \`id_produsen\` INT,
        \`created_at\`  DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (\`id_user\`)     REFERENCES \`user\`(\`id_user\`)         ON DELETE SET NULL,
        FOREIGN KEY (\`id_produsen\`) REFERENCES \`produsen\`(\`id_produsen\`) ON DELETE SET NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('   ✔ jamu');

    await db.query(`
      CREATE TABLE IF NOT EXISTS \`rempah\` (
        \`id_rempah\`   INT AUTO_INCREMENT PRIMARY KEY,
        \`nama_rempah\` VARCHAR(200) NOT NULL,
        \`ket_rempah\`  TEXT
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('   ✔ rempah');

    await db.query(`
      CREATE TABLE IF NOT EXISTS \`bahan\` (
        \`id\`          INT AUTO_INCREMENT PRIMARY KEY,
        \`nama\`        VARCHAR(200) NOT NULL,
        \`kategori\`    VARCHAR(100),
        \`satuan\`      VARCHAR(20),
        \`stokAwal\`    DECIMAL(10,2) DEFAULT 0,
        \`hargaSatuan\` DECIMAL(15,2) DEFAULT 0,
        \`threshold\`   DECIMAL(10,2) DEFAULT 10,
        \`created_at\`  DATETIME DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\`  DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('   ✔ bahan');

    await db.query(`
      CREATE TABLE IF NOT EXISTS \`khasiat\` (
        \`id_khasiat\`  INT AUTO_INCREMENT PRIMARY KEY,
        \`khasiat\`     VARCHAR(200) NOT NULL,
        \`ket_khasiat\` TEXT
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('   ✔ khasiat');

    await db.query(`
      CREATE TABLE IF NOT EXISTS \`komposisi\` (
        \`id_komposisi\`  INT AUTO_INCREMENT PRIMARY KEY,
        \`id_rempah\`     INT NOT NULL,
        \`id_jamu\`       INT NOT NULL,
        \`banyak_rempah\` VARCHAR(100),
        FOREIGN KEY (\`id_rempah\`) REFERENCES \`rempah\`(\`id_rempah\`) ON DELETE CASCADE,
        FOREIGN KEY (\`id_jamu\`)   REFERENCES \`jamu\`(\`id_jamu\`)     ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('   ✔ komposisi');

    await db.query(`
      CREATE TABLE IF NOT EXISTS \`khasiat_jamu\` (
        \`id_khasiat_jamu\` INT AUTO_INCREMENT PRIMARY KEY,
        \`id_khasiat\`      INT NOT NULL,
        \`id_jamu\`         INT NOT NULL,
        FOREIGN KEY (\`id_khasiat\`) REFERENCES \`khasiat\`(\`id_khasiat\`) ON DELETE CASCADE,
        FOREIGN KEY (\`id_jamu\`)    REFERENCES \`jamu\`(\`id_jamu\`)       ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('   ✔ khasiat_jamu');

    await db.query(`
      CREATE TABLE IF NOT EXISTS \`produksi\` (
        \`id_produksi\`   INT AUTO_INCREMENT PRIMARY KEY,
        \`id_jamu\`       INT NOT NULL,
        \`id_user\`       INT,
        \`kode_batch\`    VARCHAR(50) UNIQUE,
        \`ukuran_batch\`  DECIMAL(10,2),
        \`volume_output\` DECIMAL(10,2),
        \`efisiensi\`     DECIMAL(5,2),
        \`status\`        ENUM('antrian','ekstraksi','botolisasi','selesai') DEFAULT 'antrian',
        \`catatan\`       TEXT,
        \`created_at\`    DATETIME DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\`    DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (\`id_jamu\`) REFERENCES \`jamu\`(\`id_jamu\`) ON DELETE RESTRICT,
        FOREIGN KEY (\`id_user\`) REFERENCES \`user\`(\`id_user\`) ON DELETE SET NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('   ✔ produksi');

    console.log('\n✅ Semua tabel berhasil dibuat!\n');
    await db.close();

  } catch (err) {
    console.error('❌ Gagal membuat tabel:', err.message);
    if (err.parent) console.error('   Detail:', err.parent.sqlMessage);
    await db.close();
    process.exit(1);
  }

  // Step 3: Jalankan seeder
  console.log('🌱 Menjalankan seeder...\n');
  require('./seeder');
}

initDB();
