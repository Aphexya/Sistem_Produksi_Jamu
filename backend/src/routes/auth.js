const express = require('express');
const router = express.Router();
const { login, me, logout, register } = require('../controllers/authController');

router.post('/login',    login);
router.get('/me',        me);       // Cek sesi aktif & ambil data user
router.post('/logout',   logout);   // Hapus cookie
router.post('/register', register);

module.exports = router;
