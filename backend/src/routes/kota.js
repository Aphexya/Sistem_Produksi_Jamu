const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { authenticate } = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM kota');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', authenticate, async (req, res) => {
  const { nama_kota, ket_kota } = req.body;
  try {
    const [result] = await db.query('INSERT INTO kota (nama_kota, ket_kota) VALUES (?, ?)', [nama_kota, ket_kota]);
    res.status(201).json({ id_kota: result.insertId, nama_kota, ket_kota });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id', authenticate, async (req, res) => {
  const { nama_kota, ket_kota } = req.body;
  try {
    await db.query('UPDATE kota SET nama_kota = ?, ket_kota = ? WHERE id_kota = ?', [nama_kota, ket_kota, req.params.id]);
    res.json({ message: 'Kota diperbarui' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', authenticate, async (req, res) => {
  try {
    await db.query('DELETE FROM kota WHERE id_kota = ?', [req.params.id]);
    res.json({ message: 'Kota dihapus' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
