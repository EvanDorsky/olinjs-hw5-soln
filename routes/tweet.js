var mongoose = require('mongoose');
var Tweet = require('../schema/tweet');

module.exports = {
	tweet: function (req, res){
		var user = req.session.user;
		console.log('user on tweet');
		console.log(user);
		if (!user) {
			res.redirect('/login?redir=true');
			return;
		}

		var tweet = new Tweet({
			user: user.name,
			text: req.body.tweettext
		})

		tweet.save(function(err) {
			if (err)
				console.error('Error: ', err);
		});

		res.redirect('/');
	}
}