const mongoose = require('mongoose');

const summonerSpellSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl: String,
});

const SummonerSpell = mongoose.model('SummonerSpell', summonerSpellSchema);

module.exports = SummonerSpell;




