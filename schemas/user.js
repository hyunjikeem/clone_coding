const mongoose = require('mongoose');

const { Schema } = mongoose;
const UserSchema = new Schema ({
    userEmail: {
        type: String,
        require: true,
        unique: true
    },
    userNickname: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
});

UserSchema.virtual('userId').get(function () {
    return this._id.toHexString();
});

UserSchema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model('User', UserSchema);