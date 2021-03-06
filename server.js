const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
require('./db/db');

const artistsController = require('./controllers/artists');

const songsController = require('./controllers/songs');
const authController = require('./controllers/auth');

//middleware
app.use(session({
	secret: 'stuff, I guess',
	resave: false,
	saveUninitialized: false
}))
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use('/artists', artistsController);
app.use('/songs', songsController);
app.use('/auth', authController);

app.get('/', (req, res) => {
	res.render('index.ejs');
})

app.listen(3000, () => {
	console.log('Server listening on port 3000');
})