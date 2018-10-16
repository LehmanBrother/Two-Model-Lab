const mongoose = require('mongoose');
const Song = require('./songs')

const artistSchema = new mongoose.Schema({
	name: {type: String, required: true},
	genre: String,
	img: String,
	songs: [Song.schema]
})

module.exports = mongoose.model('Artist', artistSchema);