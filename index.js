const express = require('express');
const app = express();
const port = 3000;
const mongoClient = require('mongodb').MongoClient;

app.use((req, res, next) => {
        console.log('request received path: ' + req.path);
        next();
    }
);

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// READ
app.get('/api/test', (req, res) => {
    
    mongoClient.connect('mongodb://localhost:27017', (err, client) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
        }
        console.log('Connected to MongoDB');

        const db = client.db('sample_training');
        
        const collection = db.collection('test');
        
        collection.find().toArray((err, docs) => {
            if (err) {
                console.log(err);
                res.sendStatus(500);
                return;
            }
            console.log(docs);
            res.send(docs);
        });
    });

});
// CREATE
app.post('/api/test', (req, res) => {
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
app.get('/api/test/:id', (req, res) => {
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
app.patch('/api/test/:id', (req, res) => {
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
app.delete('/api/test/:id', (req, res) => {

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


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});