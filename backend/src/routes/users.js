const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { authenticate } = require('../middleware/auth');

// GET /api/users
router.get('/', authenticate, async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT u.id_user, u.username, u.email, k.nama_kota 
      FROM user u 
      LEFT JOIN kota k ON u.id_kota = k.id_kota
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/users/:id
router.get('/:id', authenticate, async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT u.id_user, u.username, u.email, k.nama_kota 
      FROM user u 
      LEFT JOIN kota k ON u.id_kota = k.id_kota 
      WHERE u.id_user = ?
    `, [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: 'User tidak ditemukan' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
