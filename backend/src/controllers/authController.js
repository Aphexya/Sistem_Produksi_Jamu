const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

// Konfigurasi cookie yang aman
const COOKIE_OPTIONS = {
  httpOnly: true,          // JavaScript tidak bisa baca token ini (XSS protection)
  secure: process.env.NODE_ENV === 'production', // HTTPS-only di production
  sameSite: 'lax',         // Melindungi dari CSRF
  maxAge: 8 * 60 * 60 * 1000, // 8 jam (sama dengan JWT expiry)
};

// POST /api/auth/login
const login = async (req, res) => {
  const { email, username, password } = req.body;
  const loginIdentifier = email || username;

  if (!loginIdentifier || !password) {
    return res.status(400).json({ message: 'Email/username dan password wajib diisi' });
  }

  try {
    const user = await User.findOne({
      where: {
        [require('sequelize').Op.or]: [
          { email: loginIdentifier },
          { username: loginIdentifier },
        ],
      },
    });

    if (!user) {
      return res.status(401).json({ message: 'Email/username atau password salah' });
    }

    const valid = await bcrypt.compare(password, user.pw);
    if (!valid) {
      return res.status(401).json({ message: 'Email/username atau password salah' });
    }

    const payload = {
      id_user:  user.id_user,
      username: user.username,
      role:     user.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '8h' });

    // Set token ke HttpOnly cookie — tidak bisa dibaca JS browser
    res.cookie('token', token, COOKIE_OPTIONS);

    // Kembalikan hanya data user (TANPA token di body — token ada di cookie)
    res.json({
      message: 'Login berhasil',
      user: {
        id_user:  user.id_user,
        username: user.username,
        email:    user.email,
        role:     user.role,
        id_kota:  user.id_kota,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/auth/me — ambil data user dari token di cookie (untuk refresh setelah reload)
const me = async (req, res) => {
  const token = req.cookies?.token;
  if (!token) {
    return res.status(401).json({ message: 'Belum login' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Ambil data user terbaru dari DB
    const user = await User.findByPk(decoded.id_user, {
      attributes: ['id_user', 'username', 'email', 'role', 'id_kota'],
    });

    if (!user) {
      res.clearCookie('token', COOKIE_OPTIONS);
      return res.status(401).json({ message: 'User tidak ditemukan' });
    }

    res.json({ user });
  } catch {
    res.clearCookie('token', COOKIE_OPTIONS);
    res.status(401).json({ message: 'Token tidak valid atau kadaluarsa' });
  }
};

// POST /api/auth/logout — hapus cookie
const logout = (req, res) => {
  res.clearCookie('token', COOKIE_OPTIONS);
  res.json({ message: 'Logout berhasil' });
};

// POST /api/auth/register
const register = async (req, res) => {
  const { id_kota, username, email, password, role } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Username, email, dan password wajib diisi' });
  }
  try {
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
      id_kota: id_kota || null,
      username,
      email,
      pw: hashed,
      role: role || 'staff',
    });
    res.status(201).json({
      message: 'Registrasi berhasil',
      data: { id_user: user.id_user, username, email, role: user.role },
    });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ message: 'Username atau email sudah digunakan' });
    }
    res.status(500).json({ message: err.message });
  }
};

module.exports = { login, me, logout, register };
