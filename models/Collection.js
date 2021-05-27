const mongoose = require('mongoose');

const CollectionSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  gizzyIdArray: [Number]
});

module.exports = mongoose.model('Collections', CollectionSchema);
