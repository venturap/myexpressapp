const express = require('express');
const router = express.Router();
const {index, create, read, update, remove} = require('../controllers/fishesController');

router.route('/')
    .get(index)
    .post(create);

router
    .route('/:id')
    .get(read)
    .patch(update)
    .delete(remove);

module.exports = router;