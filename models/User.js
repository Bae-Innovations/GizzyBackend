const mongoose = require('mongoose');
const Gizzy = require('./Gizzy');

const UserSchema = mongoose.Schema({
  // username will be the public address of the wallet
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  publicAddress: {
    type: String,
    lowercase: true,
    required: true,
    unique:true
  },
  nonce: {
    type: String,
  },
  bearerToken: {
      type: String
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  gizzyCoin: {
    type: Number,
    default: 0    
  }
  // liked: {
  //    type:
  // }
});

module.exports = mongoose.model('Users', UserSchema);
