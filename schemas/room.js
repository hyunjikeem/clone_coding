const mongoose = require('mongoose');

const { Schema } = mongoose;
const RoomSchema = new Schema ({
    listId: {
        type: Number,
    },

    placeName: {
        type: String,
    },

    placePicture: {
        type: String,
    },

    placeAddress: {
        type: String,
    },

    placeInfo: {
        type: String,
    },

    placePrice: {
        type: Number,
    },

    comment_Cnt: {
        type: Number,
    }
});

RoomSchema.plugin(AutoIncrement, {inc_field: 'placeId'});

module.exports = mongoose.model('User', RoomSchema);