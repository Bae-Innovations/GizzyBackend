const mongoose = require('mongoose');

const GizzySchema = mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  patronId: {
    type: Number,
    required: true,
  },
  matronId: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Gizzies', GizzySchema);
