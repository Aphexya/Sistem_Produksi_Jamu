const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const [rows] = await db.query('SELECT * FROM user WHERE username = ?', [username]);
    if (!rows.length) return res.status(401).json({ message: 'Username atau password salah' });

    const user = rows[0];
    const valid = await bcrypt.compare(password, user.pw);
    if (!valid) return res.status(401).json({ message: 'Username atau password salah' });

    const token = jwt.sign(
      { id_user: user.id_user, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );
    res.json({ token, user: { id_user: user.id_user, username: user.username, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { id_kota, username, email, password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const [result] = await db.query(
      'INSERT INTO user (id_kota, username, email, pw) VALUES (?, ?, ?, ?)',
      [id_kota, username, email, hashed]
    );
    res.status(201).json({ id_user: result.insertId, username, email });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
