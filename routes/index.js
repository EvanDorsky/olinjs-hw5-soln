var Tweet = require('../schema/tweet');

module.exports = {
	home: function(req, res) {
		console.log('VOCALLY');
		console.log(req.session.user);
		var user = req.session.user;
		Tweet.find({}, function(err, list) {
			res.render('home', {
				user: user.name,
				tweets: list.reverse()
			});
		});
	}
}