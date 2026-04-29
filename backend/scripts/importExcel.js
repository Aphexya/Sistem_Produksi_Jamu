/**
 * Script Import Data Excel ke MySQL
 * File: backend/scripts/importExcel.js
 *
 * Cara pakai:
 *   node backend/scripts/importExcel.js
 *
 * Pastikan:
 *   1. File jamu206.xlsx ada di root project (sejajar folder backend/)
 *   2. Database sudah dibuat dengan schema.sql
 *   3. File .env sudah dikonfigurasi
 */

require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const XLSX = require('xlsx');
const mysql = require('mysql2/promise');
const path = require('path');

const EXCEL_PATH = path.join(__dirname, '../../jamu206.xlsx');

async function main() {
  const db = await mysql.createConnection({
    host:     process.env.DB_HOST     || 'localhost',
    port:     process.env.DB_PORT     || 3306,
    user:     process.env.DB_USER     || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME     || 'jamu',
  });

  console.log('✅ Terhubung ke database:', process.env.DB_NAME || 'jamu');

  try {
    const wb = XLSX.readFile(EXCEL_PATH);
    console.log('📂 Sheet ditemukan:', wb.SheetNames.join(', '));

    // Kumpulkan semua baris dari semua sheet
    const allRows = [];
    for (const sheetName of wb.SheetNames) {
      const ws = wb.Sheets[sheetName];
      const rows = XLSX.utils.sheet_to_json(ws, { defval: null });
      for (const row of rows) {
        allRows.push({ ...row, _sheet: sheetName });
      }
    }
    console.log(`📊 Total baris data: ${allRows.length}`);

    // --------------------------------------------------------
    // 1. Kumpulkan & insert produsen unik
    // --------------------------------------------------------
    const produsenSet = new Set();
    for (const row of allRows) {
      const nama = (row['PRODUSEN'] || '').toString().trim();
      if (nama) produsenSet.add(nama);
    }

    const produsenMap = {}; // nama -> id_produsen
    for (const nama of produsenSet) {
      const [existing] = await db.query(
        'SELECT id_produsen FROM produsen WHERE nama_produsen = ?', [nama]
      );
      if (existing.length > 0) {
        produsenMap[nama] = existing[0].id_produsen;
      } else {
        const [result] = await db.query(
          'INSERT INTO produsen (nama_produsen) VALUES (?)', [nama]
        );
        produsenMap[nama] = result.insertId;
      }
    }
    console.log(`🏭 Produsen diproses: ${produsenSet.size}`);

    // --------------------------------------------------------
    // 2. Kumpulkan & insert rempah unik dari kolom KANDUNGAN
    // --------------------------------------------------------
    const rempahSet = new Set();
    for (const row of allRows) {
      const kandungan = (row['KANDUNGAN'] || '').toString();
      // Pisahkan berdasarkan koma atau titik koma
      const parts = kandungan.split(/[,;]/).map(s => s.trim().toLowerCase()).filter(Boolean);
      for (const p of parts) {
        if (p.length > 1 && p.length < 150) rempahSet.add(p);
      }
    }

    const rempahMap = {}; // nama -> id_rempah
    for (const nama of rempahSet) {
      const [existing] = await db.query(
        'SELECT id_rempah FROM rempah WHERE LOWER(nama_rempah) = ?', [nama]
      );
      if (existing.length > 0) {
        rempahMap[nama] = existing[0].id_rempah;
      } else {
        const [result] = await db.query(
          'INSERT INTO rempah (nama_rempah) VALUES (?)', [nama]
        );
        rempahMap[nama] = result.insertId;
      }
    }
    console.log(`🌿 Rempah/kandungan diproses: ${rempahSet.size}`);

    // --------------------------------------------------------
    // 3. Kumpulkan & insert khasiat unik dari kolom KHASIAT
    // --------------------------------------------------------
    const khasiatSet = new Set();
    for (const row of allRows) {
      const khasiat = (row['KHASIAT'] || '').toString().trim();
      if (khasiat && khasiat.length < 200) khasiatSet.add(khasiat);
    }

    const khasiatMap = {}; // teks -> id_khasiat
    for (const teks of khasiatSet) {
      const [existing] = await db.query(
        'SELECT id_khasiat FROM khasiat WHERE khasiat = ?', [teks]
      );
      if (existing.length > 0) {
        khasiatMap[teks] = existing[0].id_khasiat;
      } else {
        const [result] = await db.query(
          'INSERT INTO khasiat (khasiat) VALUES (?)', [teks]
        );
        khasiatMap[teks] = result.insertId;
      }
    }
    console.log(`💊 Khasiat diproses: ${khasiatSet.size}`);

    // --------------------------------------------------------
    // 4. Insert jamu + komposisi + khasiat_jamu
    // --------------------------------------------------------
    let jamuInserted = 0;
    let jamuSkipped  = 0;

    for (const row of allRows) {
      const namaJamu = (row['NAMA JAMU'] || '').toString().trim();
      if (!namaJamu) continue;

      const ketJamu    = (row['KHASIAT']  || '').toString().trim();
      const jenis      = (row['JENIS']    || '').toString().trim().toLowerCase();
      const perizinan  = (row['PERIZINAN']|| '').toString().trim();
      const namaProdusen = (row['PRODUSEN']|| '').toString().trim();
      const kandungan  = (row['KANDUNGAN']|| '').toString().trim();

      const id_produsen = produsenMap[namaProdusen] || null;

      // Cek duplikat
      const [existing] = await db.query(
        'SELECT id_jamu FROM jamu WHERE nama_jamu = ? AND jenis = ?',
        [namaJamu, jenis]
      );
      if (existing.length > 0) {
        jamuSkipped++;
        continue;
      }

      // Insert jamu
      const [jamuResult] = await db.query(
        'INSERT INTO jamu (nama_jamu, ket_jamu, jenis, perizinan, id_produsen) VALUES (?, ?, ?, ?, ?)',
        [namaJamu, ketJamu, jenis, perizinan, id_produsen]
      );
      const id_jamu = jamuResult.insertId;
      jamuInserted++;

      // Insert komposisi (rempah)
      if (kandungan) {
        const parts = kandungan.split(/[,;]/).map(s => s.trim().toLowerCase()).filter(Boolean);
        for (const part of parts) {
          if (rempahMap[part]) {
            await db.query(
              'INSERT IGNORE INTO komposisi (id_rempah, id_jamu, banyak_rempah) VALUES (?, ?, ?)',
              [rempahMap[part], id_jamu, null]
            );
          }
        }
      }

      // Insert khasiat_jamu
      if (ketJamu && khasiatMap[ketJamu]) {
        await db.query(
          'INSERT IGNORE INTO khasiat_jamu (id_khasiat, id_jamu) VALUES (?, ?)',
          [khasiatMap[ketJamu], id_jamu]
        );
      }
    }

    console.log(`\n✅ Import selesai!`);
    console.log(`   Jamu baru dimasukkan : ${jamuInserted}`);
    console.log(`   Jamu dilewati (duplikat): ${jamuSkipped}`);

    // --------------------------------------------------------
    // 5. Insert bahan inventaris dari rempah yang sudah ada
    //    (stok awal 0, bisa diupdate manual)
    // --------------------------------------------------------
    let bahanInserted = 0;
    for (const [nama] of Object.entries(rempahMap)) {
      const [existing] = await db.query(
        'SELECT id FROM bahan WHERE LOWER(nama) = ?', [nama.toLowerCase()]
      );
      if (existing.length === 0) {
        await db.query(
          'INSERT INTO bahan (nama, kategori, satuan, stokAwal, hargaSatuan) VALUES (?, ?, ?, ?, ?)',
          [nama, 'Lainnya', 'kg', 0, 0]
        );
        bahanInserted++;
      }
    }
    console.log(`   Bahan inventaris baru: ${bahanInserted}`);

  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  } finally {
    await db.end();
    console.log('\n🔌 Koneksi database ditutup.');
  }
}

main();
