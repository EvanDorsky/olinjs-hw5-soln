var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tweetSchema = new Schema({
	creatorName: String,
	created: Date,
	text: String,
});

module.exports = mongoose.model('Tweet', tweetSchema)