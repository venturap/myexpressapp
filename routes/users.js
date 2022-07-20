const express = require('express');
const router = express.Router();
const {index, create, read, update, remove, userLogin} = require('../controllers/usersController');

router.route('/')
    .get(index)
    .post(create);

router
    .route('/:id')
    .get(read)
    .patch(update)
    .delete(remove);

router
    .route('/login')
    .post(userLogin);

module.exports = router;