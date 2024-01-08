const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  filename: String,
  path: String,
  size: Number,
  title: String,
  description: String,
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", postSchema);
