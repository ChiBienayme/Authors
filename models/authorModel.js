const mongoose = require("mongoose");

// créer un schéma
const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 30,
  },
  nationality: {
    type: String,
    required: true,
    maxlength: 30,
  },
  books: {
    type: String,
    required: true,
  },
  lastConnection: Date,
  orders: Number,
});

// créer un modèle
const Author = mongoose.model("Author", authorSchema);

// exporter le modèle
module.exports = Author;
