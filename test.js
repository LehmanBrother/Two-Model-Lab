const express = require('express');
const router = express.Router();
const Artist = require('./models/artists');
const Songs = require('./models/songs');
require('./db/db');

// Artist.findOne({name: 'Starset'}, (err, foundArtist) => {
// 	console.log(foundArtist);
// })

// Songs.deleteMany({name: 'telepathic'}, (err, deletedSongs) => {
// 	console.log(deletedSongs);
// })

Songs.deleteMany({}, (err, foundSongs) => {
	console.log(foundSongs);
	// for(let i = 0; i < foundArtists.length; i++) {
	// 	console.log(foundArtists[i].name);
	// 	console.log(foundArtists[i].songs);
	// }
})