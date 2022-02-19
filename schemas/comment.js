const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose)


const CommentSchema = new mongoose.Schema({

    userNickname : {
        type: String,
        required: true,
        unique: true,
      },
    
      commentContent : {
        type: String,
        required: true,
        unique: true,
      }
});

// CommentSchema.virtual('userId').get(function () {
//     return this._id.toHexString();
//   });
//     CommentSchema.set('toJSON', {
//     virtuals: true,
//   });

CommentSchema.plugin(AutoIncrement, {inc_field: 'commentId'});

module.exports = mongoose.model("Comment", CommentSchema);
