var mongoose = require('mongoose');
var Tweet = require('../models/tweet');

module.exports = {
	tweet: function (req, res){
		var user = req.session.user;
		if (!user) {
			res.redirect('/login?redir=true');
			return;
		}

		var tweet = new Tweet({
			creatorName: user.name,
			created: new Date(),
			text: req.body.tweettext
		})

		tweet.save(function(err) {
			if (err)
				console.error('Error: ', err);
		});

		res.redirect('/');
	}
}