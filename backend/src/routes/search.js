const express = require('express');
const router = express.Router();
const db = require('../config/db');

/**
 * GET /api/search?q=kunyit
 * Mencari di jamu, rempah, dan produsen sekaligus
 */
router.get('/', async (req, res) => {
  const { q } = req.query;
  if (!q || q.trim().length < 2) {
    return res.status(400).json({ message: 'Query minimal 2 karakter' });
  }

  const keyword = `%${q.trim()}%`;

  try {
    // Cari di tabel jamu
    const [jamu] = await db.query(`
      SELECT j.id_jamu AS id, j.nama_jamu AS nama, j.jenis, j.ket_jamu AS deskripsi,
             p.nama_produsen AS produsen, 'jamu' AS tipe
      FROM jamu j
      LEFT JOIN produsen p ON j.id_produsen = p.id_produsen
      WHERE j.nama_jamu LIKE ? OR j.ket_jamu LIKE ? OR j.jenis LIKE ?
      LIMIT 20
    `, [keyword, keyword, keyword]);

    // Cari di tabel rempah/bahan
    const [bahan] = await db.query(`
      SELECT id, nama, kategori, satuan, stokAwal AS stok, 'bahan' AS tipe
      FROM bahan
      WHERE nama LIKE ? OR kategori LIKE ?
      LIMIT 20
    `, [keyword, keyword]);

    // Cari di tabel produsen/supplier
    const [supplier] = await db.query(`
      SELECT id_produsen AS id, nama_produsen AS nama, kota, status, 'supplier' AS tipe
      FROM produsen
      WHERE nama_produsen LIKE ? OR kota LIKE ?
      LIMIT 10
    `, [keyword, keyword]);

    // Cari jamu berdasarkan khasiat
    const [byKhasiat] = await db.query(`
      SELECT j.id_jamu AS id, j.nama_jamu AS nama, j.jenis, kh.khasiat AS deskripsi,
             'jamu' AS tipe
      FROM khasiat_jamu kj
      JOIN khasiat kh ON kj.id_khasiat = kh.id_khasiat
      JOIN jamu j ON kj.id_jamu = j.id_jamu
      WHERE kh.khasiat LIKE ?
      LIMIT 20
    `, [keyword]);

    // Cari jamu berdasarkan kandungan rempah
    const [byRempah] = await db.query(`
      SELECT DISTINCT j.id_jamu AS id, j.nama_jamu AS nama, j.jenis,
             r.nama_rempah AS deskripsi, 'jamu' AS tipe
      FROM komposisi k
      JOIN rempah r ON k.id_rempah = r.id_rempah
      JOIN jamu j ON k.id_jamu = j.id_jamu
      WHERE r.nama_rempah LIKE ?
      LIMIT 20
    `, [keyword]);

    res.json({
      query: q,
      results: {
        jamu,
        bahan,
        supplier,
        byKhasiat,
        byRempah,
      },
      total: jamu.length + bahan.length + supplier.length + byKhasiat.length + byRempah.length
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
