const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { authenticate } = require('../middleware/auth');

// GET /api/bahan - list semua bahan inventaris
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT id, nama, kategori, satuan, stokAwal, hargaSatuan, threshold, created_at, updated_at
      FROM bahan
      ORDER BY nama ASC
    `);
    res.json({ data: rows });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/bahan/:id - detail bahan
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM bahan WHERE id = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: 'Bahan tidak ditemukan' });
    res.json({ data: rows[0] });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/bahan - tambah bahan baru
router.post('/', authenticate, async (req, res) => {
  const { nama, kategori, satuan, stokAwal, hargaSatuan, threshold } = req.body;
  
  if (!nama || !kategori || !satuan) {
    return res.status(400).json({ message: 'Nama, kategori, dan satuan wajib diisi' });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO bahan (nama, kategori, satuan, stokAwal, hargaSatuan, threshold) VALUES (?, ?, ?, ?, ?, ?)',
      [nama, kategori, satuan, stokAwal || 0, hargaSatuan || 0, threshold || 10]
    );
    res.status(201).json({
      message: 'Bahan berhasil ditambahkan',
      data: { id: result.insertId, nama, kategori, satuan, stokAwal, hargaSatuan, threshold }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/bahan/:id - update bahan
router.put('/:id', authenticate, async (req, res) => {
  const { nama, kategori, satuan, stokAwal, hargaSatuan, threshold } = req.body;
  try {
    await db.query(
      'UPDATE bahan SET nama = ?, kategori = ?, satuan = ?, stokAwal = ?, hargaSatuan = ?, threshold = ? WHERE id = ?',
      [nama, kategori, satuan, stokAwal, hargaSatuan, threshold, req.params.id]
    );
    res.json({ message: 'Bahan diperbarui' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/bahan/:id - hapus bahan
router.delete('/:id', authenticate, async (req, res) => {
  try {
    await db.query('DELETE FROM bahan WHERE id = ?', [req.params.id]);
    res.json({ message: 'Bahan dihapus' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
