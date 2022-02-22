const express = require('express');
const app = express();
const cors = require('cors');
const port = 5000;

const connect = require('./schemas');
connect();

app.use(cors());

app.use(express.json());

const userRouter = require('./routes/user');
const commentRouter = require("./routes/comment"); 
const RoomRouter = require("./routes/room"); 

app.use('/api', express.urlencoded({ extended: false }), [ 
    userRouter, 
    commentRouter,
    RoomRouter ]);  

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
});