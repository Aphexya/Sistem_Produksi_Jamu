const { Bahan } = require('../models');
const { Op } = require('sequelize');

// GET /api/bahan - list semua bahan inventaris
const getAll = async (req, res) => {
  try {
    const rows = await Bahan.findAll({ order: [['nama', 'ASC']] });
    res.json({ data: rows });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/bahan/:id - detail bahan
const getById = async (req, res) => {
  try {
    const row = await Bahan.findByPk(req.params.id);
    if (!row) return res.status(404).json({ message: 'Bahan tidak ditemukan' });
    res.json({ data: row });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/bahan - tambah bahan baru
const create = async (req, res) => {
  const { nama, kategori, satuan, stokAwal, hargaSatuan, threshold } = req.body;
  if (!nama || !kategori || !satuan) {
    return res.status(400).json({ message: 'Nama, kategori, dan satuan wajib diisi' });
  }
  try {
    const row = await Bahan.create({
      nama, kategori, satuan,
      stokAwal:    stokAwal    ?? 0,
      hargaSatuan: hargaSatuan ?? 0,
      threshold:   threshold   ?? 10,
    });
    res.status(201).json({
      message: 'Bahan berhasil ditambahkan',
      data: { id: row.id, nama, kategori, satuan, stokAwal, hargaSatuan, threshold },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/bahan/:id - update bahan
const update = async (req, res) => {
  const { nama, kategori, satuan, stokAwal, hargaSatuan, threshold } = req.body;
  try {
    await Bahan.update(
      { nama, kategori, satuan, stokAwal, hargaSatuan, threshold },
      { where: { id: req.params.id } }
    );
    res.json({ message: 'Bahan diperbarui' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/bahan/:id - hapus bahan
const remove = async (req, res) => {
  try {
    await Bahan.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Bahan dihapus' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/bahan/summary - ringkasan stok (total, kritis, kosong, aman)
const getSummary = async (req, res) => {
  try {
    const all = await Bahan.findAll({
      attributes: ['stokAwal', 'threshold'],
    });

    let totalKritis = 0;
    let totalKosong = 0;
    let totalAman   = 0;

    for (const item of all) {
      const stok      = parseFloat(item.stokAwal);
      const threshold = parseFloat(item.threshold);

      if (stok <= 0)               totalKosong++;
      else if (stok <= threshold)  totalKritis++;
      else                         totalAman++;
    }

    res.json({
      data: {
        total:        all.length,
        totalKritis,
        totalKosong,
        totalAman,
        // Gabungan yang butuh perhatian
        totalPerhatian: totalKritis + totalKosong,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAll, getById, getSummary, create, update, remove };
