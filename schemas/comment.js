const mongoose = require("mongoose");


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

CommentSchema.virtual('userId').get(function () {
    return this._id.toHexString();
  });
    CommentSchema.set('toJSON', {
    virtuals: true,
  });

module.exports = mongoose.model("Comment", CommentSchema);
