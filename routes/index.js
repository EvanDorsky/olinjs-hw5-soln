var Tweet = require('../schema/tweet');

module.exports = {
	home: function(req, res){
		Tweet.find({}, function(err, list) {
			res.render("home", {
				tweets: list.reverse()
			});
		});
	}
}