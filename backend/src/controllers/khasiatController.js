const { Khasiat } = require('../models');

const getAll = async (req, res) => {
  try {
    const rows = await Khasiat.findAll();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const row = await Khasiat.findByPk(req.params.id);
    if (!row) return res.status(404).json({ message: 'Khasiat tidak ditemukan' });
    res.json(row);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const create = async (req, res) => {
  const { khasiat, ket_khasiat } = req.body;
  try {
    const row = await Khasiat.create({ khasiat, ket_khasiat });
    res.status(201).json({ id_khasiat: row.id_khasiat, khasiat, ket_khasiat });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const update = async (req, res) => {
  const { khasiat, ket_khasiat } = req.body;
  try {
    await Khasiat.update({ khasiat, ket_khasiat }, { where: { id_khasiat: req.params.id } });
    res.json({ message: 'Khasiat diperbarui' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const remove = async (req, res) => {
  try {
    await Khasiat.destroy({ where: { id_khasiat: req.params.id } });
    res.json({ message: 'Khasiat dihapus' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAll, getById, create, update, remove };
