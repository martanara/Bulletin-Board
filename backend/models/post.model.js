const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  email: { type: String, required: true },
  created: { type: Date, required: true },
  updated: { type: Date },
  status: { type: String, required: true },
  title: { type: String, required: true },
  text: { type: String, required: true },
  image: { type: String },
  price: { type: Number },
  phone: { type: String },
  location: { type: String },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Post', postSchema);
