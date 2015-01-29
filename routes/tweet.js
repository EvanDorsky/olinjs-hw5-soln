var mongoose = require('mongoose');
var Tweet = require('../schema/tweet');

var routes = {}

routes.tweet = function (req, res){
	var sess = req.session;
	var user = sess.user;

	var tweet = new Tweet({
		user: user.name,
		text: req.body.tweettext
	})

	tweet.save(function(err) {
		if (err)
			console.error('Error: ', err);
	});

	res.redirect('/');
};

module.exports = routes;