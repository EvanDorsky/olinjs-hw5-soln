var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	oauthID: Number,
	name: String,
	created: Date
});

module.exports = mongoose.model('User', userSchema)