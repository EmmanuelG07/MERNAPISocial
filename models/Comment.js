const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    comments: {
      type: String,
      max: 200,
    },
    userId: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    postId: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("comment", CommentSchema);
