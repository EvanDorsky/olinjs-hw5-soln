var express = require('express');
var mongoose = require('mongoose');
var Tweet = require('../models/tweet');
var User = require('../models/user');

var router = express.Router();

router.post('/create', tweet);
router.get('/', userTweets);

module.exports = router;

function userTweets(req, res) {
	var user = req.session.user;
	if (!user)
		return res.redirect('/user/login?redir=true');

	Tweet.find({ _creator: user._id }, function(err, tweets) {
		if (err)
			return console.error('Error: ', err);

		res.json(tweets);
	});
}

function tweet(req, res) {
	var user = req.session.user;
	if (!user)
		return res.redirect('/user/login?redir=true');

	var tweet = new Tweet({
		_creator: user._id,
		created: new Date(),
		text: req.body.tweettext
	});

	tweet.save(function(err) {
		if (err)
			return console.error('Error: ', err);
		
		User.findById(user._id, function(err, user) {
			if (err)
				return console.error('Error: ', err);

			tweet.layout = false;
			tweet.creatorName = user.name;
			res.render('partials/tweet', tweet);
		});
	});
}