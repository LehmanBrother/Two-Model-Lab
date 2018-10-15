const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
	name: {type: String, required: true},
	albumImg: String
})

module.exports = mongoose.model('Song', songSchema);