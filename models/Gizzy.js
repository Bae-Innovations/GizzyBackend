const mongoose = require('mongoose');

const GizzySchema = mongoose.Schema({
  id: {
    type: Integer,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  patronId: {
    type: Integer,
    required: true,
  },
  matronId: {
    type: Integer,
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
