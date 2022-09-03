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
router.get('/', async (req, res) => {
	await verses.find({}, (err, result) => {
		if (err) {
			res.json(err);
		} else {
			res.json(result);
		}
	});
});

// Get random verse
router.get('/random', async (req, res) => {
	const selected = Math.floor(Math.random() * Math.floor(176) + 1);
    await verses.find({ verseNumber: selected }, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    }).clone().catch(function(err){ console.log(err)});
});

// Get specified verse
router.get('/:id', async (req, res) => {
	await verses.find({ verseNumber: parseInt(req.params.id) }, (err, result) => {
		if (err) {
			res.json(err);
		} else {
			res.json(result);
		}
	}).clone().catch(function(err){ console.log(err)});
});

const PORT = process.env.PORT || 3000

app.use('/.netlify/functions/api', router);

module.exports.handler = serverless(app);