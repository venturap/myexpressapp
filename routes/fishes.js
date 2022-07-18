const express = require('express');
const router = express.Router();
const {index, create, read, update, remove} = require('../controllers/fishesController');


// List all
router.get('/', index);

module.exports = router;