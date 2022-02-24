const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const matchSchema = new Schema({
  matches: {
    type: String,
    required: true,
  },
});

const Match = model('Match', matchSchema);

module.exports = Match;