const mongoClient = require('mongodb').MongoClient;
const log = require('../local_modules/Log');
const Insect = require('../models/insectModel');

exports.index = (req, res) => {
    mongoClient.connect('mongodb://localhost:27017', (err, client) => {
        if (err) {
            log.error(err);
            res.sendStatus(500);
            return;
        }
        log.info('Connected to MongoDB from InsectsController');

        const db = client.db('animals');
        
        const collection = db.collection('insects');
        
        collection.find().toArray((err, docs) => {
            if (err) {
                log.error(err);
                res.sendStatus(500);
                return;
            }
            log.info(docs);
            res.json(docs);
        });
    });
};

exports.create = (req, res) => {
    res.send('Hello World!');
};

exports.read = async (req, res) => {
    const id = parseInt(req.params.id);
    const insect = await Insect.findById(id);

    res.json(insect);
};

exports.update = (req, res) => {
    res.send('Hello World!');
};

exports.remove = (req, res) => {
    res.send('Hello World!');
};
