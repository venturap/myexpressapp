const express = require('express');
const router = express.Router();
const {index, create, read, update, remove} = require('../controllers/fishesController');

router.route('/')
    .get(index)
    .post(create);

router
    .route('/:id')
    .get(read);

module.exports = router;