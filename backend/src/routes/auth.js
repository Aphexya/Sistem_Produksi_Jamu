const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

// POST /api/auth/login
// Menerima email atau username
router.post('/login', async (req, res) => {
  const { email, username, password } = req.body;
  const loginIdentifier = email || username; // Terima email atau username
  
  if (!loginIdentifier || !password) {
    return res.status(400).json({ message: 'Email/username dan password wajib diisi' });
  }

  try {
    // Cari user berdasarkan email ATAU username
    const [rows] = await db.query(
      'SELECT * FROM user WHERE email = ? OR username = ?',
      [loginIdentifier, loginIdentifier]
    );
    
    if (!rows.length) {
      return res.status(401).json({ message: 'Email/username atau password salah' });
    }

    const user = rows[0];
    const valid = await bcrypt.compare(password, user.pw);
    
    if (!valid) {
      return res.status(401).json({ message: 'Email/username atau password salah' });
    }

    const token = jwt.sign(
      { id_user: user.id_user, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );
    
    res.json({ 
      token, 
      user: { 
        id_user: user.id_user, 
        username: user.username, 
        email: user.email, 
        role: user.role 
      } 
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { id_kota, username, email, password, role } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Username, email, dan password wajib diisi' });
  }
  try {
    const hashed = await bcrypt.hash(password, 10);
    const [result] = await db.query(
      'INSERT INTO user (id_kota, username, email, pw, role) VALUES (?, ?, ?, ?, ?)',
      [id_kota || null, username, email, hashed, role || 'staff']
    );
    res.status(201).json({
      message: 'Registrasi berhasil',
      data: { id_user: result.insertId, username, email, role: role || 'staff' }
    });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'Username atau email sudah digunakan' });
    }
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
