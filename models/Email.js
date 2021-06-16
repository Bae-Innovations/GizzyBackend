const mongoose = require('mongoose');

// email list
const EmailSchema = mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Emails', EmailSchema);
