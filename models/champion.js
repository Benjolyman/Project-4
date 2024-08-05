const mongoose = require ('mongoose');

const ChampSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
    },
    builds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Build', 
    }]
});

const Champion = mongoose.model('Champion', ChampSchema);
module.exports = Champion;



