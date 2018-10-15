const express = require('express');
const router = express.Router();
const Artist = require('../models/artists');

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
		res.render('artists/show.ejs', {
			artist: foundArtist
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
			res.redirect('/artists');
		}
	})
})

module.exports = router;