const mongoose = require('mongoose');
const Gizzy = require('./Gizzy');

const UserSchema = mongoose.Schema({
  // username will be the public address of the wallet
  name: {
    type: String
  },
  publicAddress: {
    type: String,
    lowercase: true,
    required: true,
  },
  nonce: {
    type: String,
  },
  refreshToken: {
      type: String
  }
  // liked: {
  //    type:
  // }
});

module.exports = mongoose.model('Users', UserSchema);
