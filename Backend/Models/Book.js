// models/Book.js
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: String, required: true },
  publicationDate: { type: Date, required: true },
  summary: { type: String, required: true },
  coverImage: { type: String, required: true },
  likes: { type: Number, default: 0 }
});

module.exports = mongoose.model('Book', bookSchema);
