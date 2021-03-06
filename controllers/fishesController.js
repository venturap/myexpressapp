const log = require('../local_modules/Log');
const Fish = require('../models/fishModel');

exports.index = async (req, res) => {
    const fishes = await Fish.find();
    log.info(fishes);
    res.json({status: 'success', data: fishes});
};

exports.read = async (req, res) => {
    const id = req.params.id;
    const fish = await Fish.findById(id);
    log.info(fish);
    res.json({status: 'success', data: fish});
};

exports.update = async (req, res) => {
    const id = req.params.id;
    const fish = await Fish.updateOne({_id: id}, req.body);
    log.info(fish);
    res.json({status: 'success', data: fish}, 201);
}

exports.remove = async (req, res) => {
    const id = req.params.id;
    const fish = await Fish.deleteOne({_id: id});
    log.info(fish);
    res.json({status: 'success', data: fish});
};

exports.create = async (req, res) => {
    const fish = await new Fish(req.body);
    fish.save()
    res.json({status: 'success', data: fish});
};