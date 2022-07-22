const mongoose = require('mongoose');
const log = require('../local_modules/Log');

mongoose.connect(`mongodb://${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/animals`)
.then(() => {
    log.info('Connected to MongoDB from FishModel');
})
.catch(err => {
    log.error(err.message);
});

const fishSchema = mongoose.Schema({
    species: String,
    fins: Number
}, {collection: 'fishes'});

const Fish = mongoose.model('Fish', fishSchema);

module.exports = Fish;