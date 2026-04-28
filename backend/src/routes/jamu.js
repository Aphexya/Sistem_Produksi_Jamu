const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { authenticate } = require('../middleware/auth');

// GET /api/jamu - dengan komposisi dan khasiat
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT j.id_jamu, j.nama_jamu, j.ket_jamu, u.username AS pembuat
      FROM jamu j
      LEFT JOIN user u ON j.id_user = u.id_user
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/jamu/:id - detail lengkap dengan komposisi & khasiat
router.get('/:id', async (req, res) => {
  try {
    const [jamu] = await db.query(`
      SELECT j.id_jamu, j.nama_jamu, j.ket_jamu, u.username AS pembuat
      FROM jamu j
      LEFT JOIN user u ON j.id_user = u.id_user
      WHERE j.id_jamu = ?
    `, [req.params.id]);
    if (!jamu.length) return res.status(404).json({ message: 'Jamu tidak ditemukan' });

    const [komposisi] = await db.query(`
      SELECT r.id_rempah, r.nama_rempah, k.banyak_rempah
      FROM komposisi k
      JOIN rempah r ON k.id_rempah = r.id_rempah
      WHERE k.id_jamu = ?
    `, [req.params.id]);

    const [khasiat] = await db.query(`
      SELECT kh.id_khasiat, kh.khasiat, kh.ket_khasiat
      FROM khasiat_jamu kj
      JOIN khasiat kh ON kj.id_khasiat = kh.id_khasiat
      WHERE kj.id_jamu = ?
    `, [req.params.id]);

    res.json({ ...jamu[0], komposisi, khasiat });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/jamu
router.post('/', authenticate, async (req, res) => {
  const { nama_jamu, ket_jamu, komposisi = [], khasiat = [] } = req.body;
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    const [result] = await conn.query(
      'INSERT INTO jamu (id_user, nama_jamu, ket_jamu) VALUES (?, ?, ?)',
      [req.user.id_user, nama_jamu, ket_jamu]
    );
    const id_jamu = result.insertId;

    for (const k of komposisi) {
      await conn.query('INSERT INTO komposisi (id_rempah, id_jamu, banyak_rempah) VALUES (?, ?, ?)', [k.id_rempah, id_jamu, k.banyak_rempah]);
    }
    for (const kh of khasiat) {
      await conn.query('INSERT INTO khasiat_jamu (id_khasiat, id_jamu) VALUES (?, ?)', [kh.id_khasiat, id_jamu]);
    }

    await conn.commit();
    res.status(201).json({ id_jamu, nama_jamu, ket_jamu });
  } catch (err) {
    await conn.rollback();
    res.status(500).json({ message: err.message });
  } finally {
    conn.release();
  }
});

// PUT /api/jamu/:id
router.put('/:id', authenticate, async (req, res) => {
  const { nama_jamu, ket_jamu } = req.body;
  try {
    await db.query('UPDATE jamu SET nama_jamu = ?, ket_jamu = ? WHERE id_jamu = ?', [nama_jamu, ket_jamu, req.params.id]);
    res.json({ message: 'Jamu diperbarui' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/jamu/:id
router.delete('/:id', authenticate, async (req, res) => {
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();
    await conn.query('DELETE FROM komposisi WHERE id_jamu = ?', [req.params.id]);
    await conn.query('DELETE FROM khasiat_jamu WHERE id_jamu = ?', [req.params.id]);
    await conn.query('DELETE FROM jamu WHERE id_jamu = ?', [req.params.id]);
    await conn.commit();
    res.json({ message: 'Jamu dihapus' });
  } catch (err) {
    await conn.rollback();
    res.status(500).json({ message: err.message });
  } finally {
    conn.release();
  }
});

module.exports = router;
