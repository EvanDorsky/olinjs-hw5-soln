var Tweet = require('../models/tweet');

module.exports = {
	home: function(req, res) {
		var user = req.session.user;
		if (!user)
			return res.redirect("/user/login?redir=true");

		Tweet.find({}).populate('_creator')
		.exec(function(err, tweets) {
			tweets = tweets.map(function(tweet) {
				tweet.creatorName = tweet._creator? tweet._creator.name : 'Anon';
				return tweet;
			});
			res.render('home', {
				user: user? user.name : '',
				tweets: tweets.reverse()
			});
		});
	}
}