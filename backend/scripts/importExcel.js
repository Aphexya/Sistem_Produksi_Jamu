// ============================================================
// IMPORT EXCEL - Impor data jamu dari jamu206.xlsx ke database
// Jalankan dengan: node scripts/importExcel.js
// ============================================================

require('dotenv').config();
const XLSX = require('xlsx');
const { Sequelize } = require('sequelize');
const path = require('path');

const EXCEL_PATH = path.resolve(__dirname, '../../jamu206.xlsx');

const sequelize = new Sequelize(
  process.env.DB_NAME || 'jamu',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false,
  }
);

// Helper: upsert dan kembalikan ID
async function getOrCreate(table, whereField, whereValue, insertData) {
  const [rows] = await sequelize.query(
    `SELECT * FROM \`${table}\` WHERE \`${whereField}\` = ? LIMIT 1`,
    { replacements: [whereValue], type: Sequelize.QueryTypes.SELECT }
  );
  if (rows && Object.keys(rows).length > 0) {
    // rows adalah object langsung (QueryTypes.SELECT mengembalikan array of objects)
    return rows[Object.keys(rows)[0]] !== undefined ? rows : null;
  }
  return null;
}

async function importExcel() {
  try {
    await sequelize.authenticate();
    console.log('✅ Koneksi database berhasil.\n');

    // Baca semua sheet Excel
    const wb = XLSX.readFile(EXCEL_PATH);
    console.log(`📄 File: ${path.basename(EXCEL_PATH)}`);
    console.log(`📋 Sheet: ${wb.SheetNames.join(', ')}\n`);

    // Gabungkan data dari Sheet1 (semua data sudah ada di sini)
    const ws = wb.Sheets['Sheet1'];
    const rows = XLSX.utils.sheet_to_json(ws); // pakai header otomatis dari baris 1

    console.log(`📊 Total data ditemukan: ${rows.length} jamu\n`);

    // Cache untuk produsen dan kota agar tidak query berulang
    const produsenCache = {}; // nama_produsen -> id_produsen
    const kotaCache     = {}; // nama_kota -> id_kota

    let successCount = 0;
    let skipCount    = 0;

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];

      const namaJamu   = (row['NAMA JAMU']   || '').toString().trim();
      const khasiat    = (row['KHASIAT']     || '').toString().trim();
      const kandungan  = (row['KANDUNGAN']   || '').toString().trim();
      const jenis      = (row['JENIS']       || '').toString().trim().toLowerCase();
      const namaProdusen = (row['PRODUSEN']  || '').toString().trim();
      const namaKota   = (row['KABUPATEN']   || '').toString().trim();
      const perizinan  = (row['PERIZINAN']   || '').toString().trim();

      if (!namaJamu) {
        skipCount++;
        continue;
      }

      // ── Cek duplikat jamu ──────────────────────────────────────
      const [existingJamu] = await sequelize.query(
        `SELECT id_jamu FROM jamu WHERE nama_jamu = ? LIMIT 1`,
        { replacements: [namaJamu], type: Sequelize.QueryTypes.SELECT }
      );
      if (existingJamu) {
        console.log(`   ⏭️  Skip (duplikat): ${namaJamu}`);
        skipCount++;
        continue;
      }

      // ── Handle Kota ────────────────────────────────────────────
      let idKota = null;
      if (namaKota) {
        if (kotaCache[namaKota] !== undefined) {
          idKota = kotaCache[namaKota];
        } else {
          const [kotaRow] = await sequelize.query(
            `SELECT id_kota FROM kota WHERE nama_kota = ? LIMIT 1`,
            { replacements: [namaKota], type: Sequelize.QueryTypes.SELECT }
          );
          if (kotaRow) {
            idKota = kotaRow.id_kota;
          } else {
            const [result] = await sequelize.query(
              `INSERT INTO kota (nama_kota, ket_kota) VALUES (?, ?)`,
              { replacements: [namaKota, `Kabupaten ${namaKota}`] }
            );
            idKota = result;
            console.log(`   🆕 Kota baru: ${namaKota} (id: ${idKota})`);
          }
          kotaCache[namaKota] = idKota;
        }
      }

      // ── Handle Produsen ────────────────────────────────────────
      let idProdusen = null;
      if (namaProdusen) {
        if (produsenCache[namaProdusen] !== undefined) {
          idProdusen = produsenCache[namaProdusen];
        } else {
          const [prodRow] = await sequelize.query(
            `SELECT id_produsen FROM produsen WHERE nama_produsen = ? LIMIT 1`,
            { replacements: [namaProdusen], type: Sequelize.QueryTypes.SELECT }
          );
          if (prodRow) {
            idProdusen = prodRow.id_produsen;
          } else {
            const lokasiProduksi = (row['LOKASI PRODUKSI'] || '').toString().trim();
            const lokasiPemasaran = (row['LOKASI PEMASARAN'] || '').toString().trim();
            const [result] = await sequelize.query(
              `INSERT INTO produsen (nama_produsen, alamat, kota, status) VALUES (?, ?, ?, 'aktif')`,
              { replacements: [namaProdusen, lokasiProduksi || lokasiPemasaran, namaKota] }
            );
            idProdusen = result;
            console.log(`   🆕 Produsen baru: ${namaProdusen} (id: ${idProdusen})`);
          }
          produsenCache[namaProdusen] = idProdusen;
        }
      }

      // ── Insert Jamu ────────────────────────────────────────────
      const ketJamu = [
        khasiat    ? `Khasiat: ${khasiat}`       : '',
        kandungan  ? `Kandungan: ${kandungan}`   : '',
        row['ATURAN MINUM'] ? `Aturan minum: ${row['ATURAN MINUM']}` : '',
        row['EFEK SAMPING'] ? `Efek samping: ${row['EFEK SAMPING']}` : '',
      ].filter(Boolean).join('\n');

      const [insertResult] = await sequelize.query(
        `INSERT INTO jamu (id_user, nama_jamu, ket_jamu, jenis, perizinan, id_produsen) VALUES (1, ?, ?, ?, ?, ?)`,
        { replacements: [namaJamu, ketJamu, jenis, perizinan, idProdusen] }
      );
      const idJamu = insertResult;

      // ── Handle Khasiat (split by koma/titik koma) ─────────────
      if (khasiat) {
        const khasiatList = khasiat
          .split(/[,;\/]/)
          .map(k => k.trim())
          .filter(k => k.length > 3 && k.length < 200);

        for (const khasiatStr of khasiatList.slice(0, 5)) { // max 5 khasiat per jamu
          // Cari atau buat khasiat
          const [khasiatRow] = await sequelize.query(
            `SELECT id_khasiat FROM khasiat WHERE khasiat = ? LIMIT 1`,
            { replacements: [khasiatStr], type: Sequelize.QueryTypes.SELECT }
          );

          let idKhasiat;
          if (khasiatRow) {
            idKhasiat = khasiatRow.id_khasiat;
          } else {
            const [kr] = await sequelize.query(
              `INSERT INTO khasiat (khasiat) VALUES (?)`,
              { replacements: [khasiatStr] }
            );
            idKhasiat = kr;
          }

          // Relasi khasiat_jamu
          await sequelize.query(
            `INSERT IGNORE INTO khasiat_jamu (id_khasiat, id_jamu) VALUES (?, ?)`,
            { replacements: [idKhasiat, idJamu] }
          );
        }
      }

      // ── Handle Rempah/Kandungan ────────────────────────────────
      if (kandungan) {
        const rempahList = kandungan
          .split(/[,;]/)
          .map(r => r.trim())
          .filter(r => r.length > 1 && r.length < 200);

        for (const rempahStr of rempahList) {
          const [rempahRow] = await sequelize.query(
            `SELECT id_rempah FROM rempah WHERE nama_rempah = ? LIMIT 1`,
            { replacements: [rempahStr], type: Sequelize.QueryTypes.SELECT }
          );

          let idRempah;
          if (rempahRow) {
            idRempah = rempahRow.id_rempah;
          } else {
            const [rr] = await sequelize.query(
              `INSERT INTO rempah (nama_rempah) VALUES (?)`,
              { replacements: [rempahStr] }
            );
            idRempah = rr;
          }

          // Relasi komposisi
          await sequelize.query(
            `INSERT IGNORE INTO komposisi (id_rempah, id_jamu, banyak_rempah) VALUES (?, ?, NULL)`,
            { replacements: [idRempah, idJamu] }
          );
        }
      }

      successCount++;
      process.stdout.write(`\r   ⏳ Progres: ${successCount + skipCount}/${rows.length} (${successCount} berhasil, ${skipCount} dilewati)`);
    }

    console.log(`\n\n🎉 Import selesai!`);
    console.log(`   ✅ Berhasil diimport : ${successCount} jamu`);
    console.log(`   ⏭️  Dilewati (duplikat): ${skipCount} jamu`);
    console.log(`\n📊 Statistik DB sekarang:`);

    const tables = ['jamu', 'produsen', 'kota', 'rempah', 'khasiat', 'komposisi', 'khasiat_jamu'];
    for (const t of tables) {
      const [[{ cnt }]] = await sequelize.query(`SELECT COUNT(*) as cnt FROM \`${t}\``);
      console.log(`   - ${t.padEnd(15)}: ${cnt} records`);
    }

    await sequelize.close();
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Import gagal:', error.message);
    if (error.parent) console.error('   Detail:', error.parent.sqlMessage);
    console.error(error.stack);
    await sequelize.close();
    process.exit(1);
  }
}

importExcel();
