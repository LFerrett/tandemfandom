const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const fandomSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },

});

const Fandom = model('Fandom', fandomSchema);

module.exports = Fandom;