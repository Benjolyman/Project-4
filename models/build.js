const mongoose = require('mongoose');

const buildSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    champion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Champion'
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role'
    }, 
    starterItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'StarterItems'
    },
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
    }],
    primaryRune: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PrimaryRune',
    },
    secondaryRune: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SecondaryRune',
    },
    summonerSpells: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SummonerSpell'
    }],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
});

const Build = mongoose.model('Build', buildSchema);
module.exports = Build


