const mongoose = require('mongoose');

// collection
const CollectionSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  gizzyIdArray: [Number],
});

module.exports = mongoose.model('Collections', CollectionSchema);
