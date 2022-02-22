const mongoose = require('mongoose');

const { Schema } = mongoose;
const RoomSchema = new Schema ({
    placeId: Number,
    listId: Number,
    placeName: String,
    placeAddress: String,
    subtitle: String,
    subtitle1: String,
    check_in: String,
    check_in1: String,
    check2: String,
    check_in_2: String,
    check3:String,
    description:String,
    Convenience1:String,
    Convenience2:String,
    Convenience3:String,
    Convenience4:String,
    Convenience5:String,
    placeFurniture:String,
    placeFurnitureDetail:String,
    image1:String,
    image2:String,
    image3:String,
    image4:String,
    image5:String,
    comment_Cnt: Number,
});

RoomSchema.plugin(AutoIncrement, {inc_field: 'placeId'});

module.exports = mongoose.model('Place', RoomSchema);