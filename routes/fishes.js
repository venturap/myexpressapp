const express = require('express');
const router = express.Router();
const {index, create, read, update, remove} = require('../controllers/fishController');


// List all
router.get('/', index);

module.exports = router;