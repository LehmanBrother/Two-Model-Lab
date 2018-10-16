const express = require('express');

const router = express.Router();

const Songs = require('../models/songs');
const Artists = require('../models/artists');


// Index router
router.get('/', (req, res) => {
	Songs.find({}, (err, allSongs) => {
		res.render('songs/index.ejs', {
			songs: allSongs
		});
	});
});
// New Route
router.get('/new', (req, res) => {
	Artists.find({}, (err, allArtists) => {
		res.render('songs/new.ejs', {
			artists: allArtists
		});
	});
});
// Post Route
router.post('/', (req, res) => {
	Songs.create(req.body, (err, newSong) => {
		if(err) {
			console.log(err);
		} else {
			console.log(req.body.artist);
			Artists.findOne({name: req.body.artist}, (err, foundArtist) => {
				foundArtist.songs.push(newSong)
				foundArtist.save()
				console.log(foundArtist);
			})
			console.log(newSong);
			res.redirect('/songs')
		}
	})
})
// Show Route
router.get('/:index', (req, res) => {
	Songs.findById(req.params.index, (err, showSong) => {
		if(err){
			console.log(err);
		} else {
			Artists.findOne({name: showSong.artist}, (err, foundArtist) => {
				res.render('songs/show.ejs', {
					song: showSong,
					artist: foundArtist
				})	
			})
		}
	})
})
// Edit Route
router.get('/:index/edit', (req, res) => {
	Songs.findById(req.params.index, (err, editSong) => {
		if(err){
			console.log(err);
		} else {
			Artists.find({}, (err, allArtists) => {
				res.render('songs/edit.ejs', {
					song: editSong,
					artists: allArtists
				})
			})
		}
	})
})
// Put Route
router.put('/:index', (req, res) => {
	Songs.findByIdAndUpdate(req.params.index, req.body, (err, updateSong) => {
		Artists.findOne({name: updateSong.artist}, (err, updateArtist) => {
			let songToUpdate = updateArtist.songs.id(updateSong.id)
			songToUpdate = req.body;
			updateArtist.save();
			res.redirect('/songs')
		})
	})
})
// Delete Route
router.delete('/:index', (req, res) => {
	Songs.findOneAndDelete(req.params.index, (err, removeSong) => {
		if(err){
			console.log(err);
		} else {
			Artists.findOne({name: removeSong.artist}, (err, deleteArtist) => {
				deleteArtist.songs.id(removeSong.id).remove();
				deleteArtist.save();
				res.redirect('/songs')
			})
		}
	})	
})

module.exports = router;