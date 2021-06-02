const mongoose = require('mongoose');

const GizzySchema = mongoose.Schema({
  gizzy_id: String,//gizzy id string
  gizzy_name: String,
  owned_by: String,//owned by user id
  gizzy_image: String,
  gizzy_status: String,
  genaration: Number,
  cooldown_time_hours: Number,
  bio: String,
  hatched_by: String,//user id string,
  birthday: Date,
  lycan_type: String,
  attributes: {
      strenth: Number,
      constitution: Number,
      restoration: Number,
      charisma: Number,
  },
  parents: {
      father: String,
      mother: String,
  },
  children_list: [String],
});

module.exports = mongoose.model('Gizzies', GizzySchema);
