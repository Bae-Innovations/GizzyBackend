const mongoose = require('mongoose');

const requiredString = {
  type: String,
  required: true,
};

const requiredNumber = {
  type: Number,
  required: true,
};

const EggSchema = mongoose.Schema({
  gizzyId: requiredNumber, // gizzy id string
  ownedBy: requiredString, // owned by publicAddress
});

module.exports = mongoose.model('Eggs', EggSchema);
