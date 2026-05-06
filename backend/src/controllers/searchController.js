const { sequelize } = require('../models');
const { QueryTypes } = require('sequelize');

// GET /api/search?q=kunyit
// Query kompleks multi-join — menggunakan raw query Sequelize
const search = async (req, res) => {
  const { q } = req.query;
  if (!q || q.trim().length < 2) {
    return res.status(400).json({ message: 'Query minimal 2 karakter' });
  }

  const keyword = `%${q.trim()}%`;

  try {
    const jamu = await sequelize.query(`
      SELECT j.id_jamu AS id, j.nama_jamu AS nama, j.jenis, j.ket_jamu AS deskripsi,
             p.nama_produsen AS produsen, 'jamu' AS tipe
      FROM jamu j
      LEFT JOIN produsen p ON j.id_produsen = p.id_produsen
      WHERE j.nama_jamu LIKE :kw OR j.ket_jamu LIKE :kw OR j.jenis LIKE :kw
      LIMIT 20
    `, { replacements: { kw: keyword }, type: QueryTypes.SELECT });

    const bahan = await sequelize.query(`
      SELECT id, nama, kategori, satuan, stokAwal AS stok, 'bahan' AS tipe
      FROM bahan
      WHERE nama LIKE :kw OR kategori LIKE :kw
      LIMIT 20
    `, { replacements: { kw: keyword }, type: QueryTypes.SELECT });

    const supplier = await sequelize.query(`
      SELECT id_produsen AS id, nama_produsen AS nama, kota, status, 'supplier' AS tipe
      FROM produsen
      WHERE nama_produsen LIKE :kw OR kota LIKE :kw
      LIMIT 10
    `, { replacements: { kw: keyword }, type: QueryTypes.SELECT });

    const byKhasiat = await sequelize.query(`
      SELECT j.id_jamu AS id, j.nama_jamu AS nama, j.jenis, kh.khasiat AS deskripsi,
             'jamu' AS tipe
      FROM khasiat_jamu kj
      JOIN khasiat kh ON kj.id_khasiat = kh.id_khasiat
      JOIN jamu j ON kj.id_jamu = j.id_jamu
      WHERE kh.khasiat LIKE :kw
      LIMIT 20
    `, { replacements: { kw: keyword }, type: QueryTypes.SELECT });

    const byRempah = await sequelize.query(`
      SELECT DISTINCT j.id_jamu AS id, j.nama_jamu AS nama, j.jenis,
             r.nama_rempah AS deskripsi, 'jamu' AS tipe
      FROM komposisi k
      JOIN rempah r ON k.id_rempah = r.id_rempah
      JOIN jamu j ON k.id_jamu = j.id_jamu
      WHERE r.nama_rempah LIKE :kw
      LIMIT 20
    `, { replacements: { kw: keyword }, type: QueryTypes.SELECT });

    res.json({
      query: q,
      results: { jamu, bahan, supplier, byKhasiat, byRempah },
      total: jamu.length + bahan.length + supplier.length + byKhasiat.length + byRempah.length,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { search };
