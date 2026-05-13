const express = require('express');
const router = express.Router();
const { getAll, getById, create, update, remove } = require('../controllers/rempahController');
const { authenticate } = require('../middleware/auth');

router.get('/',      getAll);
router.get('/:id',   getById);
router.post('/',     authenticate, create);
router.put('/:id',   authenticate, update);
router.delete('/:id',authenticate, remove);

module.exports = router;
