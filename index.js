const express = require('express');
const app = express();
const port = 3000;
const log = require('./local_modules/Log');
const apiRouter = require('./routes/api');
const insectsRouter = require('./routes/insects');
const fishesRouter = require('./routes/fishes');
const usersRouter = require('./routes/users');

app.use((req, res, next) => {
        log.info('request received path: ' + req.path);
        next();
    }
);

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api', apiRouter);

app.use('/insects', insectsRouter);

app.use('/fishes', fishesRouter);

app.use('/users', usersRouter);

app.listen(port, () => {
   log.warning(`Example app listening at http://localhost:${port}`);
});