const express = require('express');
const router = express.Router();
const { getAll, create, update, remove } = require('../controllers/kotaController');
const { authenticate } = require('../middleware/auth');

router.get('/',      getAll);
router.post('/',     authenticate, create);
router.put('/:id',   authenticate, update);
router.delete('/:id',authenticate, remove);

module.exports = router;
