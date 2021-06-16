const mongoose = require('mongoose');

const requiredString = {
  type: String,
  required: true
}

const requiredNumber = {
  type: Number,
  required: true
}

const requiredDouble = {
  type: Number,
  required: true
}

const requiredDate = {
  type: Date,
  required: true
}

const requiredBoolean = {
  type: Boolean,
  required: true
}

const CharacteristicSchema = mongoose.Schema({
  name: requiredString,
  type: requiredString
})

const GizzySchema = mongoose.Schema({
  gizzy_id: requiredString,//gizzy id string
  gizzy_name: requiredString,
  owned_by: requiredString,//owned by publicAddress
  gizzy_image: requiredString,
  gizzy_status: requiredString, //??
  generation: requiredNumber,
  breedable: requiredBoolean,
  cooldown_index: requiredNumber,
  bio: requiredString,
  hatched_by: requiredString,//user id string,
  birthday: requiredDate,
  characteristics: [CharacteristicSchema],
  lycano_type: requiredString,
  attributes: {
      strenth: requiredNumber,
      constitution: requiredNumber,
      restoration: requiredNumber,
      charisma: requiredNumber,
  },
  parents: {
      fatherId: requiredString,
      motherId: requiredString,
  },
  children_list: [String], // list of ids
});

module.exports = mongoose.model('Gizzies', GizzySchema);
