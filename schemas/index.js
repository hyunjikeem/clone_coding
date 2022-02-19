const mongoose = require('mongoose');

const connect = () => {
    mongoose.connect('mongodb://test:test@localhost:27017/admin', {
        dbName: 'airb2b'
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        ignoreUndefined: true
    }).catch(err => console.log(err));
};

mongoose.connection.on('error', err => {
    console.log('몽고디비 연결 에러!', err);
});

module.exports = connect;