const mongoose = require('mongoose');
const Gizzy = require('./Gizzy');

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  nonce: {
    type: String,
    required: true,
  },
  // liked: {
  //    type:
  // }
});

module.exports = mongoose.model('Users', UserSchema);
