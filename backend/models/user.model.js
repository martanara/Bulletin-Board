const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  role: { type: String, required: true },
  id: { type: String, required: true },
  displayName: { type: String, required: true },
  email: { type: String, required: true },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post', default: [] }],
});

module.exports = mongoose.model('User', userSchema);
