var Tweet = require('../models/tweet');

module.exports = {
	home: function(req, res) {
		console.dir(req.cookies);
		var user = req.session.user;
		if (!user) {
			res.redirect("/user/login?redir=true");
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