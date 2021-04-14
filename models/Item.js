const mongoose = require('mongoose');

const ItemSchema = mongoose.Schema({
    // relation between each user and their own set of items
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },

    object: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true,
        default: '1'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('item', ItemSchema);