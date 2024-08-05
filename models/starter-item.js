const mongoose = require('mongoose');

const starterItemsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        require: true
    },
    imageUrl: {
        type: String
    }
});

const StarterItems = mongoose.model('StarterItems', starterItemsSchema);

module.exports = StarterItems;





