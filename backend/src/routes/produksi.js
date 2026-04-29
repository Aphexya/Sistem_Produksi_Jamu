const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { authenticate } = require('../middleware/auth');

// GET /api/produksi - list semua batch produksi
router.get('/', async (req, res) => {
  try {
    const { status } = req.query;
    let sql = `
      SELECT p.*, j.nama_jamu, j.jenis, u.username AS operator
      FROM produksi p
      LEFT JOIN jamu j ON p.id_jamu = j.id_jamu
      LEFT JOIN user u ON p.id_user = u.id_user
      WHERE 1=1
    `;
    const params = [];
    if (status) {
      sql += ' AND p.status = ?';
      params.push(status);
    }
    sql += ' ORDER BY p.created_at DESC';

    const [rows] = await db.query(sql, params);
    res.json({ data: rows });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/produksi/metrics - statistik dashboard
router.get('/metrics', async (req, res) => {
  try {
    const [[totalBatch]] = await db.query('SELECT COUNT(*) AS total FROM produksi');
    const [[aktif]]      = await db.query("SELECT COUNT(*) AS total FROM produksi WHERE status IN ('antrian','ekstraksi','botolisasi')");
    const [[selesai]]    = await db.query("SELECT COUNT(*) AS total FROM produksi WHERE status = 'selesai'");
    const [[stokKritis]] = await db.query('SELECT COUNT(*) AS total FROM bahan WHERE stokAwal <= threshold AND stokAwal > 0');
    const [[stokKosong]] = await db.query('SELECT COUNT(*) AS total FROM bahan WHERE stokAwal = 0');

    res.json({
      data: {
        totalBatch: totalBatch.total,
        produksiAktif: aktif.total,
        produksiSelesai: selesai.total,
        stokKritis: stokKritis.total,
        stokKosong: stokKosong.total,
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/produksi/:id - detail batch
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT p.*, j.nama_jamu, j.jenis, j.ket_jamu, u.username AS operator
      FROM produksi p
      LEFT JOIN jamu j ON p.id_jamu = j.id_jamu
      LEFT JOIN user u ON p.id_user = u.id_user
      WHERE p.id_produksi = ?
    `, [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: 'Batch tidak ditemukan' });
    res.json({ data: rows[0] });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/produksi - buat batch baru
router.post('/', authenticate, async (req, res) => {
  const { id_jamu, ukuran_batch, catatan } = req.body;
  if (!id_jamu) return res.status(400).json({ message: 'id_jamu wajib diisi' });

  try {
    // Generate kode batch otomatis: BAT-YYYY-XXX
    const [[{ total }]] = await db.query('SELECT COUNT(*) AS total FROM produksi');
    const kode_batch = `BAT-${new Date().getFullYear()}-${String(total + 1).padStart(3, '0')}`;

    const [result] = await db.query(
      'INSERT INTO produksi (id_jamu, id_user, kode_batch, ukuran_batch, status, catatan) VALUES (?, ?, ?, ?, ?, ?)',
      [id_jamu, req.user.id_user, kode_batch, ukuran_batch || 0, 'antrian', catatan || null]
    );
    res.status(201).json({
      message: 'Batch produksi dibuat',
      data: { id_produksi: result.insertId, kode_batch, status: 'antrian' }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/produksi/:id - update status/data batch
router.put('/:id', authenticate, async (req, res) => {
  const { status, volume_output, efisiensi, catatan } = req.body;
  try {
    await db.query(
      'UPDATE produksi SET status = ?, volume_output = ?, efisiensi = ?, catatan = ? WHERE id_produksi = ?',
      [status, volume_output, efisiensi, catatan, req.params.id]
    );
    res.json({ message: 'Batch diperbarui' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/produksi/:id
router.delete('/:id', authenticate, async (req, res) => {
  try {
    await db.query('DELETE FROM produksi WHERE id_produksi = ?', [req.params.id]);
    res.json({ message: 'Batch dihapus' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
