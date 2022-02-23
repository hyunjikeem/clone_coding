const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose)


const CommentSchema = new mongoose.Schema({

    userNickname : {
        type: String,
        required: true,
      },
    
      commentContent : {
        type: String,
        required: true,
      },

      placeId : {
        type: Number,
      }
});

CommentSchema.plugin(AutoIncrement, {inc_field: 'commentId'});

module.exports = mongoose.model("Comment", CommentSchema);
