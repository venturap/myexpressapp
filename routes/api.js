const express = require('express');
const router = express.Router();
const mongoClient = require('mongodb').MongoClient;
const log = require('../local_modules/Log');

// READ
router.get('/test', (req, res) => {
    
    mongoClient.connect('mongodb://localhost:27017', (err, client) => {
        if (err) {
            log.error(err);
            res.sendStatus(500);
            return;
        }
        log.info('Connected to MongoDB');

        const db = client.db('sample_training');
        
        const collection = db.collection('test');
        
        collection.find().toArray((err, docs) => {
            if (err) {
                console.log(err);
                res.sendStatus(500);
                return;
            }
            log.info(docs);
            res.send(docs);
        });
    });

});
// CREATE
router.post('/test', (req, res) => {
    const data = req.body;

    mongoClient.connect('mongodb://localhost:27017', (err, client) => {

        if (err) {
            console.log(err);
            return;
        }
        console.log('Connected to MongoDB');

        const db = client.db('sample_training');

        const collection = db.collection('test');

        collection.insertOne(data, (err, result) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log(result);
            res.send(result);
        });
    });
});

// LIST SPECIFIC DOCUMENT
router.get('/test/:id', (req, res) => {
    const id = parseInt(req.params.id);

    mongoClient.connect('mongodb://localhost:27017', (err, client) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
        }
        console.log('Connected to MongoDB');
        const db = client.db('sample_training');
        const collection = db.collection('test');
        collection.findOne({_id: id}, (err, doc) => {
            if (err) {
                console.log(err);
                res.sendStatus(500);
                return;
            }
            console.log(doc);
            res.json(doc);
        });
    });
});

// UPDATE
router.patch('/test/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const data = req.body;

    mongoClient.connect('mongodb://localhost:27017', (err, client) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
        }
        console.log('Connected to MongoDB');
        const db = client.db('sample_training');
        const collection = db.collection('test');
        collection.updateOne({_id: id}, {$set: data}, (err, result) => {
            if (err) {
                console.log(err);
                res.sendStatus(500);
                return;
            }
            console.log(result);
            res.json(result);
        });
    });
});

// DELETE
router.delete('/test/:id', (req, res) => {

    const id = parseInt(req.params.id);

    mongoClient.connect('mongodb://localhost:27017', (err, client) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
        }
        console.log('Connected to MongoDB');
        const db = client.db('sample_training');
        const collection = db.collection('test');
        collection.deleteOne({_id: id}, (err, result) => {
            if (err) {
                console.log(err);
                res.sendStatus(500);
                return;
            }
            console.log(result);
            if (result.deletedCount === 0) {
                res.status(404).json({message: 'No document found'});
                return;
            }
            res.json(result);
        });
    });
});

module.exports = router;