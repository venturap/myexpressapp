const log = require('../local_modules/Log');
const Fish = require('../models/fishModel');

exports.index = async (req, res) => {
    const fishes = await Fish.find();
    log.info(fishes);
    res.json({status: 'success', data: fishes});
};