const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String, // 👈 Add this
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Todo', TodoSchema);
