const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { authenticate } = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM rempah');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM rempah WHERE id_rempah = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: 'Rempah tidak ditemukan' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', authenticate, async (req, res) => {
  const { nama_rempah, ket_rempah } = req.body;
  try {
    const [result] = await db.query('INSERT INTO rempah (nama_rempah, ket_rempah) VALUES (?, ?)', [nama_rempah, ket_rempah]);
    res.status(201).json({ id_rempah: result.insertId, nama_rempah, ket_rempah });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id', authenticate, async (req, res) => {
  const { nama_rempah, ket_rempah } = req.body;
  try {
    await db.query('UPDATE rempah SET nama_rempah = ?, ket_rempah = ? WHERE id_rempah = ?', [nama_rempah, ket_rempah, req.params.id]);
    res.json({ message: 'Rempah diperbarui' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', authenticate, async (req, res) => {
  try {
    await db.query('DELETE FROM rempah WHERE id_rempah = ?', [req.params.id]);
    res.json({ message: 'Rempah dihapus' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
