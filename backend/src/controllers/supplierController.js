const { Produsen } = require('../models');
const { Op } = require('sequelize');

// GET /api/supplier - list semua pemasok
const getAll = async (req, res) => {
  try {
    const { status, search } = req.query;
    const where = {};

    if (status) where.status = status;
    if (search) {
      where[Op.or] = [
        { nama_produsen: { [Op.like]: `%${search}%` } },
        { kota:          { [Op.like]: `%${search}%` } },
      ];
    }

    const rows = await Produsen.findAll({ where, order: [['nama_produsen', 'ASC']] });
    res.json({ data: rows });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/supplier/metrics - statistik pemasok
const getMetrics = async (req, res) => {
  try {
    const total        = await Produsen.count();
    const aktif        = await Produsen.count({ where: { status: 'aktif' } });
    const menunggu     = await Produsen.count({ where: { status: 'menunggu' } });
    const ditangguhkan = await Produsen.count({ where: { status: 'ditangguhkan' } });

    res.json({ data: { total, aktif, menunggu, ditangguhkan } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/supplier/:id
const getById = async (req, res) => {
  try {
    const row = await Produsen.findByPk(req.params.id);
    if (!row) return res.status(404).json({ message: 'Pemasok tidak ditemukan' });
    res.json({ data: row });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/supplier
const create = async (req, res) => {
  const { nama_produsen, alamat, kota, kontak, email, status } = req.body;
  if (!nama_produsen) return res.status(400).json({ message: 'Nama produsen wajib diisi' });
  try {
    const row = await Produsen.create({
      nama_produsen, alamat, kota, kontak, email,
      status: status || 'aktif',
    });
    res.status(201).json({ message: 'Pemasok ditambahkan', data: { id_produsen: row.id_produsen, nama_produsen } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/supplier/:id
const update = async (req, res) => {
  const { nama_produsen, alamat, kota, kontak, email, status } = req.body;
  try {
    await Produsen.update(
      { nama_produsen, alamat, kota, kontak, email, status },
      { where: { id_produsen: req.params.id } }
    );
    res.json({ message: 'Pemasok diperbarui' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/supplier/:id
const remove = async (req, res) => {
  try {
    await Produsen.destroy({ where: { id_produsen: req.params.id } });
    res.json({ message: 'Pemasok dihapus' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAll, getMetrics, getById, create, update, remove };
