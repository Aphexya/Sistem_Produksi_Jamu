// ============================================================
// SEEDER - Sistem Produksi Jamu Penjamu Handal
// Jalankan dengan: node scripts/seeder.js
// ============================================================

require('dotenv').config();
const bcrypt = require('bcryptjs');
const { Sequelize } = require('sequelize');

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

async function seed() {
  try {
    await sequelize.authenticate();
    console.log('✅ Koneksi database berhasil.\n');

    const queryInterface = sequelize.getQueryInterface();

    // ============================================================
    // 1. KOTA
    // ============================================================
    console.log('🌆 Seeding tabel kota...');
    await sequelize.query(`DELETE FROM khasiat_jamu`);
    await sequelize.query(`DELETE FROM komposisi`);
    await sequelize.query(`DELETE FROM produksi`);
    await sequelize.query(`DELETE FROM jamu`);
    await sequelize.query(`DELETE FROM bahan`);
    await sequelize.query(`DELETE FROM rempah`);
    await sequelize.query(`DELETE FROM khasiat`);
    await sequelize.query(`DELETE FROM produsen`);
    await sequelize.query(`DELETE FROM user`);
    await sequelize.query(`DELETE FROM kota`);

    // Reset AUTO_INCREMENT
    const tables = ['khasiat_jamu','komposisi','produksi','jamu','bahan','rempah','khasiat','produsen','user','kota'];
    for (const t of tables) {
      await sequelize.query(`ALTER TABLE \`${t}\` AUTO_INCREMENT = 1`);
    }

    await queryInterface.bulkInsert('kota', [
      { nama_kota: 'Sampang',   ket_kota: 'Kabupaten Sampang, Madura' },
      { nama_kota: 'Sumenep',   ket_kota: 'Kabupaten Sumenep, Madura' },
      { nama_kota: 'Pamekasan', ket_kota: 'Kabupaten Pamekasan, Madura' },
      { nama_kota: 'Bangkalan', ket_kota: 'Kabupaten Bangkalan, Madura' },
    ]);
    console.log('   ✔ 4 kota berhasil dimasukkan.');

    // ============================================================
    // 2. USER
    // ============================================================
    console.log('👤 Seeding tabel user...');
    const hashAdmin  = await bcrypt.hash('admin123', 10);
    const hashSuper  = await bcrypt.hash('super123', 10);
    const hashStaff  = await bcrypt.hash('staff123', 10);

    await queryInterface.bulkInsert('user', [
      { id_kota: 1, username: 'admin',      email: 'admin@penjamuhandal.id',      pw: hashAdmin, role: 'admin' },
      { id_kota: 2, username: 'supervisor1',email: 'supervisor1@penjamuhandal.id', pw: hashSuper, role: 'supervisor' },
      { id_kota: 1, username: 'staff_budi', email: 'budi@penjamuhandal.id',        pw: hashStaff, role: 'staff' },
      { id_kota: 3, username: 'staff_ani',  email: 'ani@penjamuhandal.id',         pw: hashStaff, role: 'staff' },
      { id_kota: 4, username: 'staff_rudi', email: 'rudi@penjamuhandal.id',        pw: hashStaff, role: 'staff' },
    ]);
    console.log('   ✔ 5 user berhasil dimasukkan.');
    console.log('   📋 Akun:');
    console.log('      admin       / admin123  (role: admin)');
    console.log('      supervisor1 / super123  (role: supervisor)');
    console.log('      staff_budi  / staff123  (role: staff)');

    // ============================================================
    // 3. PRODUSEN (Supplier)
    // ============================================================
    console.log('🏭 Seeding tabel produsen...');
    await queryInterface.bulkInsert('produsen', [
      {
        nama_produsen: 'CV. Rempah Nusantara',
        alamat: 'Jl. Raya Sampang No. 12',
        kota: 'Sampang',
        kontak: '08123456789',
        email: 'rempah.nusantara@gmail.com',
        status: 'aktif',
      },
      {
        nama_produsen: 'UD. Herbal Madura Jaya',
        alamat: 'Jl. Trunojoyo No. 45',
        kota: 'Sumenep',
        kontak: '08234567890',
        email: 'herbal.madura@gmail.com',
        status: 'aktif',
      },
      {
        nama_produsen: 'PT. Alam Segar Sejahtera',
        alamat: 'Jl. Pasar Baru No. 7',
        kota: 'Pamekasan',
        kontak: '08345678901',
        email: 'alam.segar@gmail.com',
        status: 'aktif',
      },
      {
        nama_produsen: 'CV. Berkah Rempah',
        alamat: 'Jl. Veteran No. 23',
        kota: 'Bangkalan',
        kontak: '08456789012',
        email: 'berkah.rempah@gmail.com',
        status: 'menunggu',
      },
      {
        nama_produsen: 'UD. Sumber Herbal',
        alamat: 'Jl. Diponegoro No. 99',
        kota: 'Sampang',
        kontak: '08567890123',
        email: 'sumber.herbal@gmail.com',
        status: 'ditangguhkan',
      },
    ]);
    console.log('   ✔ 5 produsen berhasil dimasukkan.');

    // ============================================================
    // 4. REMPAH (Bahan Baku Master)
    // ============================================================
    console.log('🌿 Seeding tabel rempah...');
    await queryInterface.bulkInsert('rempah', [
      { nama_rempah: 'Jahe Merah',   ket_rempah: 'Zingiber officinale var. rubrum, rasa pedas hangat, baik untuk imunitas.' },
      { nama_rempah: 'Kunyit',       ket_rempah: 'Curcuma longa, mengandung curcumin, anti-inflamasi alami.' },
      { nama_rempah: 'Temulawak',    ket_rempah: 'Curcuma xanthorrhiza, baik untuk kesehatan hati dan pencernaan.' },
      { nama_rempah: 'Kayu Manis',   ket_rempah: 'Cinnamomum verum, mengontrol gula darah dan antioksidan.' },
      { nama_rempah: 'Cengkeh',      ket_rempah: 'Syzygium aromaticum, analgesik alami dan antiseptik.' },
      { nama_rempah: 'Lada Hitam',   ket_rempah: 'Piper nigrum, meningkatkan penyerapan nutrisi.' },
      { nama_rempah: 'Kencur',       ket_rempah: 'Kaempferia galanga, baik untuk batuk dan masuk angin.' },
      { nama_rempah: 'Daun Sirih',   ket_rempah: 'Piper betle, antiseptik dan antibakteri.' },
      { nama_rempah: 'Sambiloto',    ket_rempah: 'Andrographis paniculata, antipiretik dan imunomodulator.' },
      { nama_rempah: 'Bangle',       ket_rempah: 'Zingiber purpureum, melangsingkan dan detoksifikasi.' },
      { nama_rempah: 'Kapulaga',     ket_rempah: 'Elettaria cardamomum, menyegarkan dan melancarkan pencernaan.' },
      { nama_rempah: 'Secang',       ket_rempah: 'Caesalpinia sappan, antioksidan tinggi, warna merah alami.' },
      { nama_rempah: 'Biji Pala',    ket_rempah: 'Myristica fragrans, menenangkan dan antispasmodik.' },
      { nama_rempah: 'Alang-alang',  ket_rempah: 'Imperata cylindrica, diuretik alami dan mendinginkan.' },
      { nama_rempah: 'Mahkota Dewa', ket_rempah: 'Phaleria macrocarpa, antidiabetes dan antioksidan.' },
    ]);
    console.log('   ✔ 15 rempah berhasil dimasukkan.');

    // ============================================================
    // 5. BAHAN (Inventaris Stok)
    // ============================================================
    console.log('📦 Seeding tabel bahan...');
    await queryInterface.bulkInsert('bahan', [
      { nama: 'Jahe Merah Segar',   kategori: 'Rimpang',  satuan: 'kg',  stokAwal: 150.00, hargaSatuan: 25000,  threshold: 20 },
      { nama: 'Kunyit Bubuk',       kategori: 'Rimpang',  satuan: 'kg',  stokAwal: 80.00,  hargaSatuan: 30000,  threshold: 15 },
      { nama: 'Temulawak Kering',   kategori: 'Rimpang',  satuan: 'kg',  stokAwal: 60.00,  hargaSatuan: 35000,  threshold: 10 },
      { nama: 'Kayu Manis Batang',  kategori: 'Kulit',    satuan: 'kg',  stokAwal: 40.00,  hargaSatuan: 55000,  threshold: 8  },
      { nama: 'Cengkeh Kering',     kategori: 'Bunga',    satuan: 'kg',  stokAwal: 30.00,  hargaSatuan: 80000,  threshold: 5  },
      { nama: 'Lada Hitam Bubuk',   kategori: 'Biji',     satuan: 'kg',  stokAwal: 25.00,  hargaSatuan: 70000,  threshold: 5  },
      { nama: 'Kencur Segar',       kategori: 'Rimpang',  satuan: 'kg',  stokAwal: 45.00,  hargaSatuan: 20000,  threshold: 10 },
      { nama: 'Sambiloto Kering',   kategori: 'Daun',     satuan: 'kg',  stokAwal: 20.00,  hargaSatuan: 45000,  threshold: 5  },
      { nama: 'Secang Serut',       kategori: 'Kayu',     satuan: 'kg',  stokAwal: 35.00,  hargaSatuan: 40000,  threshold: 7  },
      { nama: 'Kapulaga',           kategori: 'Biji',     satuan: 'kg',  stokAwal: 15.00,  hargaSatuan: 120000, threshold: 3  },
      { nama: 'Gula Jawa',          kategori: 'Pemanis',  satuan: 'kg',  stokAwal: 200.00, hargaSatuan: 18000,  threshold: 30 },
      { nama: 'Madu Murni',         kategori: 'Pemanis',  satuan: 'liter',stokAwal: 50.00, hargaSatuan: 150000, threshold: 10 },
      { nama: 'Air Mineral (Galon)',kategori: 'Pelarut',  satuan: 'galon',stokAwal: 100.00,hargaSatuan: 20000,  threshold: 20 },
      { nama: 'Botol Kaca 250ml',   kategori: 'Kemasan',  satuan: 'pcs', stokAwal: 500.00, hargaSatuan: 5000,   threshold: 100},
      { nama: 'Botol Kaca 500ml',   kategori: 'Kemasan',  satuan: 'pcs', stokAwal: 300.00, hargaSatuan: 8000,   threshold: 50 },
      { nama: 'Label Produk',       kategori: 'Kemasan',  satuan: 'lembar',stokAwal:1000.00,hargaSatuan: 500,   threshold: 200},
    ]);
    console.log('   ✔ 16 bahan berhasil dimasukkan.');

    // ============================================================
    // 6. KHASIAT
    // ============================================================
    console.log('💊 Seeding tabel khasiat...');
    await queryInterface.bulkInsert('khasiat', [
      { khasiat: 'Meningkatkan Imunitas',      ket_khasiat: 'Membantu tubuh melawan infeksi dan penyakit.' },
      { khasiat: 'Melancarkan Pencernaan',     ket_khasiat: 'Mengatasi kembung, sembelit, dan maag ringan.' },
      { khasiat: 'Anti-Inflamasi',             ket_khasiat: 'Mengurangi peradangan pada sendi dan otot.' },
      { khasiat: 'Antioksidan',                ket_khasiat: 'Menangkal radikal bebas, mencegah penuaan dini.' },
      { khasiat: 'Mengontrol Gula Darah',      ket_khasiat: 'Membantu menstabilkan kadar glukosa darah.' },
      { khasiat: 'Melangsingkan Badan',        ket_khasiat: 'Membantu metabolisme lemak dan detoksifikasi.' },
      { khasiat: 'Mengatasi Masuk Angin',      ket_khasiat: 'Menghangatkan tubuh dan meredakan gejala flu.' },
      { khasiat: 'Menyehatkan Hati',           ket_khasiat: 'Melindungi fungsi liver dari kerusakan.' },
      { khasiat: 'Meredakan Nyeri',            ket_khasiat: 'Analgesik alami untuk sakit kepala dan nyeri.' },
      { khasiat: 'Menenangkan & Relaksasi',    ket_khasiat: 'Mengurangi stres dan membantu tidur nyenyak.' },
    ]);
    console.log('   ✔ 10 khasiat berhasil dimasukkan.');

    // ============================================================
    // 7. JAMU (Resep Produk)
    // ============================================================
    console.log('🫙 Seeding tabel jamu...');
    await queryInterface.bulkInsert('jamu', [
      {
        id_user: 1, id_produsen: 1,
        nama_jamu: 'Jamu Jahe Merah Kunyit',
        ket_jamu: 'Minuman herbal tradisional dari perpaduan jahe merah dan kunyit untuk imunitas dan anti-inflamasi.',
        jenis: 'minuman', perizinan: 'BPOM-TR12345',
      },
      {
        id_user: 1, id_produsen: 2,
        nama_jamu: 'Jamu Temulawak Hati Sehat',
        ket_jamu: 'Formula herbal berbasis temulawak untuk menjaga kesehatan organ hati dan melancarkan pencernaan.',
        jenis: 'minuman', perizinan: 'BPOM-TR23456',
      },
      {
        id_user: 2, id_produsen: 1,
        nama_jamu: 'Jamu Rempah Angin',
        ket_jamu: 'Racikan kencur, jahe, dan kapulaga untuk mengatasi masuk angin dan menghangatkan badan.',
        jenis: 'minuman', perizinan: 'BPOM-TR34567',
      },
      {
        id_user: 2, id_produsen: 3,
        nama_jamu: 'Jamu Pelangsing Bangle',
        ket_jamu: 'Herbal berbasis bangle dan sambiloto untuk membantu program diet dan detoksifikasi.',
        jenis: 'kapsul', perizinan: 'BPOM-TR45678',
      },
      {
        id_user: 1, id_produsen: 2,
        nama_jamu: 'Wedang Secang Manis',
        ket_jamu: 'Minuman herbal berbasis secang dengan rasa manis alami, kaya antioksidan.',
        jenis: 'minuman', perizinan: 'BPOM-TR56789',
      },
      {
        id_user: 1, id_produsen: 3,
        nama_jamu: 'Jamu Mahkota Dewa Plus',
        ket_jamu: 'Formula antidiabetes dari mahkota dewa dikombinasikan dengan kayu manis.',
        jenis: 'kapsul', perizinan: 'BPOM-TR67890',
      },
    ]);
    console.log('   ✔ 6 jamu berhasil dimasukkan.');

    // ============================================================
    // 8. KOMPOSISI (Relasi Jamu <-> Rempah)
    // ============================================================
    console.log('🔗 Seeding tabel komposisi...');
    await queryInterface.bulkInsert('komposisi', [
      // Jamu 1: Jahe Merah Kunyit
      { id_jamu: 1, id_rempah: 1,  banyak_rempah: '200 gram' },
      { id_jamu: 1, id_rempah: 2,  banyak_rempah: '150 gram' },
      { id_jamu: 1, id_rempah: 4,  banyak_rempah: '50 gram'  },
      // Jamu 2: Temulawak Hati Sehat
      { id_jamu: 2, id_rempah: 3,  banyak_rempah: '300 gram' },
      { id_jamu: 2, id_rempah: 2,  banyak_rempah: '100 gram' },
      { id_jamu: 2, id_rempah: 11, banyak_rempah: '30 gram'  },
      // Jamu 3: Rempah Angin
      { id_jamu: 3, id_rempah: 7,  banyak_rempah: '150 gram' },
      { id_jamu: 3, id_rempah: 1,  banyak_rempah: '100 gram' },
      { id_jamu: 3, id_rempah: 11, banyak_rempah: '20 gram'  },
      { id_jamu: 3, id_rempah: 5,  banyak_rempah: '10 gram'  },
      // Jamu 4: Pelangsing Bangle
      { id_jamu: 4, id_rempah: 10, banyak_rempah: '250 gram' },
      { id_jamu: 4, id_rempah: 9,  banyak_rempah: '100 gram' },
      { id_jamu: 4, id_rempah: 6,  banyak_rempah: '20 gram'  },
      // Jamu 5: Wedang Secang
      { id_jamu: 5, id_rempah: 12, banyak_rempah: '100 gram' },
      { id_jamu: 5, id_rempah: 4,  banyak_rempah: '30 gram'  },
      { id_jamu: 5, id_rempah: 11, banyak_rempah: '15 gram'  },
      // Jamu 6: Mahkota Dewa Plus
      { id_jamu: 6, id_rempah: 15, banyak_rempah: '200 gram' },
      { id_jamu: 6, id_rempah: 4,  banyak_rempah: '80 gram'  },
      { id_jamu: 6, id_rempah: 14, banyak_rempah: '50 gram'  },
    ]);
    console.log('   ✔ 19 komposisi berhasil dimasukkan.');

    // ============================================================
    // 9. KHASIAT_JAMU (Relasi Jamu <-> Khasiat)
    // ============================================================
    console.log('🔗 Seeding tabel khasiat_jamu...');
    await queryInterface.bulkInsert('khasiat_jamu', [
      // Jamu 1
      { id_jamu: 1, id_khasiat: 1 },
      { id_jamu: 1, id_khasiat: 3 },
      { id_jamu: 1, id_khasiat: 7 },
      // Jamu 2
      { id_jamu: 2, id_khasiat: 2 },
      { id_jamu: 2, id_khasiat: 8 },
      { id_jamu: 2, id_khasiat: 4 },
      // Jamu 3
      { id_jamu: 3, id_khasiat: 7 },
      { id_jamu: 3, id_khasiat: 9 },
      // Jamu 4
      { id_jamu: 4, id_khasiat: 6 },
      { id_jamu: 4, id_khasiat: 4 },
      { id_jamu: 4, id_khasiat: 2 },
      // Jamu 5
      { id_jamu: 5, id_khasiat: 4 },
      { id_jamu: 5, id_khasiat: 10 },
      // Jamu 6
      { id_jamu: 6, id_khasiat: 5 },
      { id_jamu: 6, id_khasiat: 4 },
      { id_jamu: 6, id_khasiat: 1 },
    ]);
    console.log('   ✔ 16 khasiat_jamu berhasil dimasukkan.');

    // ============================================================
    // 10. PRODUKSI (Batch Produksi)
    // ============================================================
    console.log('⚙️  Seeding tabel produksi...');
    await queryInterface.bulkInsert('produksi', [
      {
        id_jamu: 1, id_user: 3,
        kode_batch: 'BATCH-2025-001',
        ukuran_batch: 100.00, volume_output: 92.50, efisiensi: 92.50,
        status: 'selesai', catatan: 'Produksi berjalan lancar, kualitas baik.',
      },
      {
        id_jamu: 2, id_user: 3,
        kode_batch: 'BATCH-2025-002',
        ukuran_batch: 80.00, volume_output: 74.00, efisiensi: 92.50,
        status: 'selesai', catatan: 'Selesai tepat waktu.',
      },
      {
        id_jamu: 3, id_user: 4,
        kode_batch: 'BATCH-2025-003',
        ukuran_batch: 50.00, volume_output: 45.00, efisiensi: 90.00,
        status: 'selesai', catatan: 'Efisiensi sedikit rendah karena bahan baku kurang optimal.',
      },
      {
        id_jamu: 1, id_user: 3,
        kode_batch: 'BATCH-2025-004',
        ukuran_batch: 150.00, volume_output: 140.00, efisiensi: 93.33,
        status: 'botolisasi', catatan: 'Dalam proses pengemasan.',
      },
      {
        id_jamu: 4, id_user: 5,
        kode_batch: 'BATCH-2025-005',
        ukuran_batch: 60.00, volume_output: null, efisiensi: null,
        status: 'ekstraksi', catatan: 'Masih dalam proses ekstraksi.',
      },
      {
        id_jamu: 5, id_user: 4,
        kode_batch: 'BATCH-2025-006',
        ukuran_batch: 75.00, volume_output: null, efisiensi: null,
        status: 'antrian', catatan: 'Menunggu giliran produksi.',
      },
      {
        id_jamu: 6, id_user: 5,
        kode_batch: 'BATCH-2025-007',
        ukuran_batch: 40.00, volume_output: null, efisiensi: null,
        status: 'antrian', catatan: 'Bahan baku sudah siap.',
      },
    ]);
    console.log('   ✔ 7 produksi berhasil dimasukkan.');

    // ============================================================
    // SELESAI
    // ============================================================
    console.log('\n🎉 Seeding selesai! Semua data berhasil dimasukkan.\n');
    console.log('📊 Ringkasan data:');
    console.log('   - kota     : 4 records');
    console.log('   - user     : 5 records');
    console.log('   - produsen : 5 records');
    console.log('   - rempah   : 15 records');
    console.log('   - bahan    : 16 records');
    console.log('   - khasiat  : 10 records');
    console.log('   - jamu     : 6 records');
    console.log('   - komposisi: 19 records');
    console.log('   - khasiat_jamu: 16 records');
    console.log('   - produksi : 7 records');
    console.log('\n🔑 Login default:');
    console.log('   Email    : admin@penjamuhandal.id');
    console.log('   Password : admin123\n');

    await sequelize.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding gagal:', error.message);
    if (error.parent) console.error('   Detail:', error.parent.sqlMessage);
    await sequelize.close();
    process.exit(1);
  }
}

seed();
