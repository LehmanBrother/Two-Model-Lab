const express = require('express');
const router = express.Router();
const Artist = require('../models/artists');
const Song = require('../models/songs');


//index route
router.get('/', async (req, res) => {
	try {
		const allArtists = await Artist.find();
		res.render('artists/index.ejs', {
			artists: allArtists
		});
	} catch(err) {
		res.send(err);
	}
})

//new route
router.get('/new', (req, res) => {
	res.render('artists/new.ejs');
})

//show route
router.get('/:index', async (req, res) => {
	try {
		const foundArtist = await Artist.findById(req.params.index);
		const foundSongs = await Song.find({artist: foundArtist.name});
		res.render('artists/show.ejs', {
			artist: foundArtist,
			songs: foundSongs
		});
	} catch(err) {
		res.send(err);
	}
})

//post route
router.post('/', async (req, res) => {
	try {
		const createdArtist = await Artist.create(req.body);
		res.redirect('/artists');
	} catch(err) {
		res.send(err);
	}
})

//delete route
router.delete('/:index', async (req, res) => {
	try {
		const deletedArtist = await Artist.findByIdAndDelete(req.params.index);
		const deletedSongs = await Song.deleteMany({artist: deletedArtist.name});
		res.redirect('/artists');
	} catch(err) {
		res.send(err);
	}
})

//edit route
router.get('/:index/edit', async (req, res) => {
	try {
		const editedArtist = await Artist.findById(req.params.index);
		res.render('artists/edit.ejs');
	} catch(err) {
		res.send(err);
	}
})

//put route
router.put('/:index', async (req, res) => {
	try {
		const updatedArtist = await Artist.findByIdAndUpdate(req.params.index, req.body);
		res.redirect('/artists');
	} catch(err) {
		res.send(err);
	}
})

module.exports = router;