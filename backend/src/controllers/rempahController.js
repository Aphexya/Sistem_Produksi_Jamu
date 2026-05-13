const { Rempah } = require('../models');

const getAll = async (req, res) => {
  try {
    const rows = await Rempah.findAll();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const row = await Rempah.findByPk(req.params.id);
    if (!row) return res.status(404).json({ message: 'Rempah tidak ditemukan' });
    res.json(row);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const create = async (req, res) => {
  const { nama_rempah, ket_rempah } = req.body;
  try {
    const row = await Rempah.create({ nama_rempah, ket_rempah });
    res.status(201).json({ id_rempah: row.id_rempah, nama_rempah, ket_rempah });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const update = async (req, res) => {
  const { nama_rempah, ket_rempah } = req.body;
  try {
    await Rempah.update({ nama_rempah, ket_rempah }, { where: { id_rempah: req.params.id } });
    res.json({ message: 'Rempah diperbarui' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const remove = async (req, res) => {
  try {
    await Rempah.destroy({ where: { id_rempah: req.params.id } });
    res.json({ message: 'Rempah dihapus' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAll, getById, create, update, remove };
