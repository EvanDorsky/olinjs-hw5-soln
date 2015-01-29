var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tweetSchema = new Schema({
	user: String,
	text: String
});

module.exports = mongoose.model('Tweet', tweetSchema)