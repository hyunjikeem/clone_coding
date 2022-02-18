const express = require('express');
const app = express();
const port = 5000;

const connect = require('./schemas');
connect();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const user = require('./routes/user');
app.use('/api', user);

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
});