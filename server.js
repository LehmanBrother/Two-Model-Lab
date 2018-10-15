const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
require('./db/db');

const artistsController = require('./controllers/artists');

const songsController = require('./controllers/songs');

//middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use('/artists', artistsController);
app.use('/songs', songsController);

app.get('/', (req, res) => {
	res.render('index.ejs');
})

app.listen(3000, () => {
	console.log('Server listening on port 3000');
})