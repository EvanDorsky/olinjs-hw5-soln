var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tweetSchema = new Schema({
	_creator: { type: Schema.Types.ObjectId, ref: 'User' },
	created: Date,
	text: String,
});

module.exports = mongoose.model('Tweet', tweetSchema)