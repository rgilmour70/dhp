const express = require('express');
const serverless = require('serverless-http');
const mongoose = require('mongoose');
const verses = require('../models/Verse');

const app = express();
const router = express.Router();

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://rgilmour70:lNOvNsHiiO0toT92@dhammapada.z7bsi.mongodb.net/DBH?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	console.log('connected');
});

// Get all verses
router.get('/', (req, res) => {
	verses.find({}, (err, result) => {
		if (err) {
			res.json(err);
		} else {
			res.json(result);
		}
	});
});

// Get random verse
router.get('/random', async (req, res) => {
	// const n = await verses.countDocuments();
	let coll = new Map();
	let i = 0;
	await verses.find({}, (err, result) => {
		if (err) {
			res.json(err);
		} else {
			result.forEach( r => {
				i++;
                const theText = r.text;
                const theVerseNumber = parseInt(r.verseNumber);
                if (theText && !isNaN(theVerseNumber)) {
                    coll.set( i, { 'verseNumber': theVerseNumber, 'text', theText });
                }
			});
		}
	}).clone().catch(function(err) { console.log(err) })

	const n = coll.size;
	const selected = Math.floor(Math.random() * Math.floor(n) + 1);
	res.json([coll.get(selected)]);
});

// Get specified verse
router.get('/:id', async (req, res) => {
	await verses.find({ verseNumber: parseInt(req.params.id) }, (err, result) => {
		if (err) {
			res.json(err);
		} else {
			res.json(result);
		}
	});
});

const PORT = process.env.PORT || 3000

app.use('/.netlify/functions/api', router);

module.exports.handler = serverless(app);