const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    description: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    watchlist: [{ type: String }],
  },
  {
    timestamps: true,
  },
);

module.exports = model('User', userSchema);
