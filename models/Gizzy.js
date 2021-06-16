const mongoose = require('mongoose');

const requiredString = {
  type: String,
  required: true,
};

const requiredNumber = {
  type: Number,
  required: true,
};

const requiredDouble = {
  type: Number,
  required: true,
};

const requiredDate = {
  type: Date,
  required: true,
};

const requiredBoolean = {
  type: Boolean,
  required: true,
};

const GizzySchema = mongoose.Schema({
  gizzyId: requiredNumber, // gizzy id string
  gizzyName: requiredString,
  ownedBy: requiredString, // owned by publicAddress
  gizzyImage: requiredString,
  gizzyStatus: requiredString, // ??
  generation: requiredNumber,
  breedable: requiredBoolean,
  cooldownIndex: requiredNumber,
  bio: requiredString,
  hatchedBy: requiredString, // user id string,
  createdAt: requiredDate,
  characteristics: [Object],
  lycanoType: requiredString,
  attributes: {
    strength: requiredNumber,
    constitution: requiredNumber,
    restoration: requiredNumber,
    charisma: requiredNumber,
  },
  parents: {
    sireId: requiredString,
    matronId: requiredString,
  },
  children_list: [Number], // list of ids
});

module.exports = mongoose.model('Gizzies', GizzySchema);
