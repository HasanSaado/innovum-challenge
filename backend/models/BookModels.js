const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String
  },

  author: {
    type: String
  },

  yearPublished: {
    type: String
  },

  genre: {
    type: String
  },

  isReserved: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('book', bookSchema);