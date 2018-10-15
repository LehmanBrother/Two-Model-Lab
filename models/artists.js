const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
	name: {type: String, required: true},
	dob: {type: Date, required: true},
	genre: String,
	img: String
})

module.exports = mongoose.model('Artist', artistSchema);