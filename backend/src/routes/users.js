const express = require('express');
const router = express.Router();
const { getAll, getMe, getById, update, updatePassword, remove } = require('../controllers/usersController');
const { authenticate } = require('../middleware/auth');

router.get('/', authenticate, getAll);
router.get('/me', authenticate, getMe);
router.get('/:id', authenticate, getById);
router.put('/:id', authenticate, update);
router.put('/:id/password', authenticate, updatePassword);
router.delete('/:id', authenticate, remove);

module.exports = router;