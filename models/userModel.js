const mongoose = require('mongoose');
const log = require('../local_modules/Log');

mongoose.connect(`mongodb://${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/animals`)
.then(() => {
    log.info('Connected to MongoDB from UserModel');
})
.catch(err => {
    log.error(err.message);
});

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;