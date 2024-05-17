const { Schema, model } = require('mongoose');

const postsSchema = new Schema(
  {
    username: { type: String, required: true },
    title: { type: String, required: true },
    post: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

module.exports = model('Post', postsSchema);
