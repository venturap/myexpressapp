const express = require('express');
const router = express.Router();
const {index, create, read, update, remove} = require('../controllers/insectsController');



// List all
router.get('/', index);

// Create new
router.post('/', create);

// List specific
router.get('/:id', read);

// Update specific
router.patch('/:id', update);

// Delete specific
router.delete('/:id', remove);

module.exports = router;