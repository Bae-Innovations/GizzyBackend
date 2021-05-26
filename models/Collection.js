const mongoose = require('mongoose');

const CollectionSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    nonce: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Collections', CollectionSchema);