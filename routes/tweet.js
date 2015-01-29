var mongoose = require('mongoose');
var Tweet = require('../schema/tweet');

var routes = {}

routes.tweet = function (req, res){
	var sess = req.session;
	var user = sess.user;
	console.log("session");
	console.dir(sess);
	console.log("==================");
	var tweet = new Tweet({
		user: user,
		text: req.body.tweettext
	})

	tweet.save(function(err) {
		if (err)
			console.error('Error: ', err);
	});

	res.redirect('/');
};

module.exports = routes;