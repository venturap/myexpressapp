const express = require('express');
const router = express.Router();
const {index, create, read, update, remove} = require('../controllers/fishesController');
const auth = require('../middleware/auth');


router.route('/')
    .get(auth, index)
    .post(create);

router
    .route('/:id')
    .get(read)
    .patch(update)
    .delete(remove);

module.exports = router;