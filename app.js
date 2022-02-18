const express = require('express');
const app = express();
const port = 5000;

const connect = require('./schemas');
connect();

app.use(express.json());

const userRouter = require('./routes/user');
const commentRouter = require("./routes/comment"); 

app.use('/api', express.urlencoded({ extended: false }), [ 
    userRouter, 
    commentRouter, ]);

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
});