const express = require('express');
const router = express.Router();
const User = require('../models/users');

router.get('/login', (req, res) => {
	console.log(req.session);
	res.render('auth/login.ejs', {
		message: req.session.message
	})
})

router.post('/login', (req, res) => {
	req.session.username = req.body.username;
	req.session.logged = true;
	req.session.message = null;
	res.redirect('/artists');
})

router.get('/logout', (req, res) => {
	req.session.destroy((err) => {
		if(err) {
			res.send(err);
		} else {
			res.redirect('/auth/login');
		}
	})
})

module.exports = router;