const mongoose = require('mongoose');
const log = require('../local_modules/Log');

mongoose.connect('mongodb://localhost:27017/animals')
.then(() => {
    log.info('Connected to MongoDB from FishModel');
})
.catch(err => {
    log.error(err.message);
});

const fishSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    species: String,
    fins: Number
});

const Fish = mongoose.model('Fish', fishSchema);

module.exports = Fish;