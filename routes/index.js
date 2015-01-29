var Tweet = require('../schema/tweet');

module.exports = {
	home: function(req, res) {
		var user = req.session.user;
		if (!user) {
			res.redirect("/login?redir=true");
			return;
		}
		Tweet.find({}, function(err, list) {
			res.render('home', {
				user: user? user.name : '',
				tweets: list.reverse()
			});
		});
	}
}