const express = require('express');
const router = express.Router();
const { getAll, getMetrics, getById, create, update, remove } = require('../controllers/produksiController');
const { authenticate } = require('../middleware/auth');

router.get('/',         getAll);
router.get('/metrics',  getMetrics);
router.get('/:id',      getById);
router.post('/',        authenticate, create);
router.put('/:id',      authenticate, update);
router.delete('/:id',   authenticate, remove);

module.exports = router;
