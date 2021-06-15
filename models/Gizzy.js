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

const GizzySchema = mongoose.Schema({
  gizzy_id: requiredString,//gizzy id string
  gizzy_name: requiredString,
  gizzy_price: requiredDouble,
  owned_by: requiredString,//owned by user id
  gizzy_image: requiredString,
  gizzy_status: requiredString, //??
  generation: requiredNumber,
  cooldown_index: requiredNumber,
  bio: requiredString,
  hatched_by: requiredString,//user id string,
  birthday: requiredDate,
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
  children_list: [String],
});

module.exports = mongoose.model('Gizzies', GizzySchema);
