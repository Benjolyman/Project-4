const mongoose = require('mongoose');

const runeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    tree: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
    }
});

const PrimaryRune = mongoose.model('PrimaryRune', runeSchema);

module.exports = PrimaryRune;





