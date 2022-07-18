const mongoose = require('mongoose');
const log = require('../local_modules/Log');

mongoose.connect('mongodb://localhost:27017/animals')
.then(() => {
    log.info('Connected to MongoDB from InsectModel');
})
.catch(err => {
    log.error(err.message);
});

const insectSchema = mongoose.Schema({
    _id: Number,
    species: String,
    legs: Number
});

const Insect = mongoose.model('Insect', insectSchema);

module.exports = Insect;