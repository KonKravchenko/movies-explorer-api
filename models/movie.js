const mongoose = require('mongoose');
const isUrl = require('validator/lib/isURL');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    validate: {
      validator: (v) => isUrl(v),
      message: 'Неправильный формат ссылки на постер к фильму',
    },
  },
  trailerLink: {
    type: String,
    validate: {
      validator: (v) => isUrl(v),
      message: 'Неправильный формат ссылки на трейлер к фильму',
    },
  },
  thumbnail: {
    type: String,
    validate: {
      validator: (v) => isUrl(v),
      message: 'Неправильный формат ссылки на постер к фильму',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: Number,
    required: true,
  },
  nameEN: {
    type: Number,
    required: true,
  },

});

module.exports = mongoose.model('movie', movieSchema);
