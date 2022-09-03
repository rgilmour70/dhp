const mongoose = require('mongoose');

const verseSchema = new mongoose.Schema({
	_id: {
		type: Number
	},
	verseNumber: {
		type: Number
	},
	text: {
		type: String
	}
},
{ collection: 'verses' }
);

module.exports = mongoose.model('verses', verseSchema);