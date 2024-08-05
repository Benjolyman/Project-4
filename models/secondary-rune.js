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
  },
});


const SecondaryRune = mongoose.model('SecondaryRune', runeSchema);

module.exports = SecondaryRune;



