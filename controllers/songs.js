const express = require('express');

const router = express.Router();

const Songs = require('../models/songs');

// Index router
router.get('/', (req, res) => {
	Songs.find({}, (err, allSongs) => {
		res.render('songs/index.ejs', {
			songs: allSongs
		});
	});
});

router.get('/new', (req, res) => {
	res.render('songs/new.ejs')
})

router.post('/', (req, res) => {
	Songs.create(req.body, (err, newSong) => {
		if(err) {
			console.log(err);
		} else {
			res.redirect('/songs')
		}
	})
})

router.get('/:index', (req, res) => {
	Songs.findById(req.params.index, (err, showSong) => {
		if(err){
			console.log(err);
		} else {
			res.render('songs/show.ejs', {
				song: showSong
			})
		}
	})
})

router.get('/:index/edit', (req, res) => {
	Songs.findById(req.params.index, (err, editSong) => {
		if(err){
			console.log(err);
		} else {
			res.render('songs/edit.ejs', {
				song: editSong
			})
		}
	})
})

router.put('/:index', (req, res) => {
	Songs.findByIdAndUpdate(req.params.index, req.body, (err, updateSong) => {
		res.redirect('/songs')
	})
})

router.delete('/:index', (req, res) => {
	Songs.findOneAndDelete(req.params.index, (err, removeSong) => {
		if(err){
			console.log(err);
		} else {
			res.redirect('/songs')
		}
	})	
})

module.exports = router;