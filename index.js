const express = require('express');
const app = express();
const port = 3000;
const mongoClient = require('mongodb').MongoClient;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

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

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});