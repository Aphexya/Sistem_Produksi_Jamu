const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { authenticate } = require('../middleware/auth');

// GET /api/supplier - list semua pemasok
router.get('/', async (req, res) => {
  try {
    const { status, search } = req.query;
    let sql = 'SELECT * FROM produsen WHERE 1=1';
    const params = [];

    if (status) {
      sql += ' AND status = ?';
      params.push(status);
    }
    if (search) {
      sql += ' AND (nama_produsen LIKE ? OR kota LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }
    sql += ' ORDER BY nama_produsen ASC';

    const [rows] = await db.query(sql, params);
    res.json({ data: rows });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/supplier/metrics - statistik pemasok
router.get('/metrics', async (req, res) => {
  try {
    const [[total]]  = await db.query('SELECT COUNT(*) AS total FROM produsen');
    const [[aktif]]  = await db.query("SELECT COUNT(*) AS total FROM produsen WHERE status = 'aktif'");
    const [[menunggu]] = await db.query("SELECT COUNT(*) AS total FROM produsen WHERE status = 'menunggu'");
    const [[ditangguhkan]] = await db.query("SELECT COUNT(*) AS total FROM produsen WHERE status = 'ditangguhkan'");

    res.json({
      data: {
        total: total.total,
        aktif: aktif.total,
        menunggu: menunggu.total,
        ditangguhkan: ditangguhkan.total,
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/supplier/:id
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM produsen WHERE id_produsen = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: 'Pemasok tidak ditemukan' });
    res.json({ data: rows[0] });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/supplier
router.post('/', authenticate, async (req, res) => {
  const { nama_produsen, alamat, kota, kontak, email, status } = req.body;
  if (!nama_produsen) return res.status(400).json({ message: 'Nama produsen wajib diisi' });

  try {
    const [result] = await db.query(
      'INSERT INTO produsen (nama_produsen, alamat, kota, kontak, email, status) VALUES (?, ?, ?, ?, ?, ?)',
      [nama_produsen, alamat, kota, kontak, email, status || 'aktif']
    );
    res.status(201).json({ message: 'Pemasok ditambahkan', data: { id_produsen: result.insertId, nama_produsen } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/supplier/:id
router.put('/:id', authenticate, async (req, res) => {
  const { nama_produsen, alamat, kota, kontak, email, status } = req.body;
  try {
    await db.query(
      'UPDATE produsen SET nama_produsen = ?, alamat = ?, kota = ?, kontak = ?, email = ?, status = ? WHERE id_produsen = ?',
      [nama_produsen, alamat, kota, kontak, email, status, req.params.id]
    );
    res.json({ message: 'Pemasok diperbarui' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/supplier/:id
router.delete('/:id', authenticate, async (req, res) => {
  try {
    await db.query('DELETE FROM produsen WHERE id_produsen = ?', [req.params.id]);
    res.json({ message: 'Pemasok dihapus' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
