const express = require('express');
const router = express.Router();
const Artist = require('../models/artists');
const Song = require('../models/songs');


//index route
router.get('/', (req, res) => {
	Artist.find({}, (err, allArtists) => {
		res.render('artists/index.ejs', {
			artists: allArtists
		});
	})
})

//new route
router.get('/new', (req, res) => {
	res.render('artists/new.ejs');
})

//show route
router.get('/:index', (req, res) => {
	Artist.findById(req.params.index, (err, foundArtist) => {
		Song.find({artist: foundArtist.name}, (err, foundSongs) => {
			res.render('artists/show.ejs', {
				artist: foundArtist,
				songs: foundSongs
			})
		})
	})
})

//post route
router.post('/', (req, res) => {
	Artist.create(req.body, (err, createdArtist) => {
		if(err) {
			console.log(err);
		} else {
			res.redirect('/artists');
		}
	})
})

//delete route
router.delete('/:index', (req, res) => {
	Artist.findOneAndDelete(req.params.index, (err, deletedArtist) => {
		if(err) {
			console.log(err);
		} else {
			Song.deleteMany({artist: deletedArtist.name}, (err, deletedSongs) => {
				res.redirect('/artists');
			})
		}
	})
})

//edit route
router.get('/:index/edit', (req, res) => {
	Artist.findById(req.params.index, (err, editedArtist) => {
		res.render('artists/edit.ejs', {
			artist: editedArtist
		});
	})
})

//put route
router.put('/:index', (req, res) => {
	Artist.findByIdAndUpdate(req.params.index, req.body, (err, updatedArtist) => {
		res.redirect('/artists');
	})
})

module.exports = router;