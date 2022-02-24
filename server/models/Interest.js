const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const interestSchema = new Schema({
  interests: {
    type: String,
    required: true,
  },
  
});

const Interest = model('Interest', interestSchema);

module.exports = Interest;