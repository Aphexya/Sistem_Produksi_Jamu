const { Kota } = require('../models');

const getAll = async (req, res) => {
  try {
    const rows = await Kota.findAll();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const create = async (req, res) => {
  const { nama_kota, ket_kota } = req.body;
  try {
    const kota = await Kota.create({ nama_kota, ket_kota });
    res.status(201).json({ id_kota: kota.id_kota, nama_kota, ket_kota });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const update = async (req, res) => {
  const { nama_kota, ket_kota } = req.body;
  try {
    await Kota.update({ nama_kota, ket_kota }, { where: { id_kota: req.params.id } });
    res.json({ message: 'Kota diperbarui' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const remove = async (req, res) => {
  try {
    await Kota.destroy({ where: { id_kota: req.params.id } });
    res.json({ message: 'Kota dihapus' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAll, create, update, remove };
