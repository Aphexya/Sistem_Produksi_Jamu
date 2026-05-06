const bcrypt = require('bcryptjs');
const { User, Kota } = require('../models');

// GET /api/users - list semua user
const getAll = async (req, res) => {
  try {
    const rows = await User.findAll({
      attributes: ['id_user', 'username', 'email', 'role', 'created_at'],
      include: [{ model: Kota, as: 'kota', attributes: ['nama_kota'] }],
      order: [['created_at', 'DESC']],
    });
    res.json({ data: rows });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/users/me - profil user yang sedang login
const getMe = async (req, res) => {
  try {
    const row = await User.findByPk(req.user.id_user, {
      attributes: ['id_user', 'username', 'email', 'role'],
      include: [{ model: Kota, as: 'kota', attributes: ['nama_kota'] }],
    });
    if (!row) return res.status(404).json({ message: 'User tidak ditemukan' });
    res.json({ data: row });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/users/:id
const getById = async (req, res) => {
  try {
    const row = await User.findByPk(req.params.id, {
      attributes: ['id_user', 'username', 'email', 'role', 'created_at'],
      include: [{ model: Kota, as: 'kota', attributes: ['nama_kota'] }],
    });
    if (!row) return res.status(404).json({ message: 'User tidak ditemukan' });
    res.json({ data: row });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/users/:id - update profil / role
const update = async (req, res) => {
  const { username, email, role, id_kota } = req.body;
  try {
    await User.update(
      { username, email, role, id_kota },
      { where: { id_user: req.params.id } }
    );
    res.json({ message: 'User diperbarui' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/users/:id/password - ganti password
const updatePassword = async (req, res) => {
  const { password } = req.body;
  if (!password || password.length < 6) {
    return res.status(400).json({ message: 'Password minimal 6 karakter' });
  }
  try {
    const hashed = await bcrypt.hash(password, 10);
    await User.update({ pw: hashed }, { where: { id_user: req.params.id } });
    res.json({ message: 'Password diperbarui' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/users/:id
const remove = async (req, res) => {
  try {
    await User.destroy({ where: { id_user: req.params.id } });
    res.json({ message: 'User dihapus' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAll, getMe, getById, update, updatePassword, remove };
