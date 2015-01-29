var Tweet = require('../schema/tweet');

module.exports = {
	home: function(req, res) {
		var user = req.session.user;
		Tweet.find({}, function(err, list) {
			res.render('home', {
				user: user? user.name : '',
				tweets: list.reverse()
			});
		});
	}
}