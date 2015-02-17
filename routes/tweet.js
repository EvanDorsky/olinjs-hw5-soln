var express = require('express');
var mongoose = require('mongoose');
var Tweet = require('../models/tweet');
var User = require('../models/user');

var router = express.Router();

router.post('/', tweet);
router.delete('/', remove);
router.get('/:user', userTweets);

module.exports = router;

function remove(req, res) {
	Tweet.findById(req.body.tweetId, function(err, tweet) {
		if (err)
			return console.error('Error: ', err);

		if (tweet._creator == req.session.passport.user) {
			tweet.remove(function(err) {
				if (err)
					return console.error('Error: ', err);

				res.send('success');
			});
		}
	});
}

function userTweets(req, res) {
	console.log('USER TWEETS BE LIKE');
	console.log(req.params.user);
	if (req.params.user) {
		User.findOne({ name: req.params.user }, function(err, user) {
			if (err)
				return console.error('Error: ', err);

			tweets(user, res);
		});
	}
	else
		User.findById(req.session.passport.user, function(err, user) {
			tweets(user, res);
	});
}

function tweets(user, res) {
	Tweet.find({ _creator: user._id }, function(err, tweets) {
		if (err)
			return console.error('Error: ', err);

		res.json(tweets);
	});
}

function tweet(req, res) {
	User.findById(req.session.passport.user, function(err, user) {
			if (err)
				return console.error('Error: ', err);
		var tweet = new Tweet({
			_creator: user._id,
			created: new Date(),
			text: req.body.tweettext
		});

		tweet.save(function(err) {
			if (err)
				return console.error('Error: ', err);

			tweet.layout = false;
			tweet.creatorName = user.name;
			res.render('partials/tweet', tweet);
		});
	});
}