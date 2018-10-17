const express = require('express');

const router = express.Router();

const Songs = require('../models/songs');
const Artists = require('../models/artists');


// Index router
router.get('/', async (req, res) => {
	try {
		const allSongs = await Songs.find({});
		res.render('songs/index.ejs', {
			songs: allSongs
		})
	} catch(err) {
		res.send(err);
	}
});
// New Route
router.get('/new', async (req, res) => {
	try {
		const allArtists = await Artists.find({});
		res.render('songs/new.ejs', {
			artists: allArtists
		})
	} catch(err) {
		res.send(err);
	}
});
// Post Route
router.post('/', async (req, res) => {
	try {
		const newSong = await Songs.create(req.body);
		const foundArtist = await Artists.findOne({name: req.body.artist});
		foundArtist.songs.push(newSong);
		foundArtist.save();
		res.redirect('/songs');
	} catch(err) {
		res.send(err);
	}
})
// Show Route
router.get('/:index', async (req, res) => {
	try {
		const showSong = await Songs.findById(req.params.index);
		const foundArtist = await Artists.findOne({name: showSong.artist});
		res.render('songs/show.ejs', {
			song: showSong,
			artist: foundArtist
		})
	} catch(err) {
		res.send(err);
	}
})
// Edit Route
router.get('/:index/edit', async (req, res) => {
	try {
		const editSong = await Songs.findById(req.params.index);
		const allArtists = await Artists.find({});
		res.render('songs/edit.ejs', {
			song: editSong,
			artists: allArtists
		});
	} catch(err) {
		res.send(err);
	}
})
// Put Route
router.put('/:index', async (req, res) => {
	try {
		const updateSong = await Songs.findByIdAndUpdate(req.params.index, req.body);
		const updateArtist = await Artists.findOne({name: updateSong.artist});
		let songToUpdate = await updateArtist.songs.id(updateSong.id);
		songToUpdate = await req.body;
		res.redirect('/songs');
	} catch(err) {
		res.send(err);
	}
})
// Delete Route
router.delete('/:index', async (req, res) => {
	try {
		const removeSong = await Songs.findByIdAndDelete(req.params.index);
		const deleteArtist = await Artists.findOne({name: removeSong.artist});
		deleteArtist.songs.id(removeSong.id).remove();
		deleteArtist.save();
		res.redirect('/songs');
	} catch(err) {
		res.send(err);
	}	
})

module.exports = router;