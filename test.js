const express = require('express');
const router = express.Router();
const Artist = require('./models/artists');
const Songs = require('./models/songs');
require('./db/db');

// Artist.findOne({name: 'Starset'}, (err, foundArtist) => {
// 	console.log(foundArtist);
// })

Songs.deleteMany({}, (err, deletedSongs) => {
	console.log(deletedSongs);
})