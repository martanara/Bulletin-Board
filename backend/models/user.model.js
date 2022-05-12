const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  role: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post', default: [] }],
});

module.exports = mongoose.model('User', userSchema);
