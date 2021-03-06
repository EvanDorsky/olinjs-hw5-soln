var Tweet = require('../models/tweet');
var User = require('../models/user');

module.exports = {
	home: function(req, res) {
		var user = req.session.user;
		if (!user)
			return res.redirect('/user/login?redir=true');

		Tweet.find({}).populate('_creator')
		.exec(function(err, tweets) {
			if (err)
				return console.error('Error: ', err);

			tweets = tweets.map(function(tweet) {
				tweet.creatorName = tweet._creator?
					tweet._creator.name : 'Anon';
				return tweet;
			});
			User.find({}, function(err, users) {
				if (err)
					return console.error('Error: ', err);

				res.render('home', {
					user: user? user.name : '',
					users: users,
					tweets: tweets.reverse()
				});
			});
		});
	}
}