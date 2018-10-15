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

//new

module.exports = router;