var Tweet = require('../schema/tweet');

var home = function(req, res){
	Tweet.find({}, function(err, list) {
		res.render("home", {
			tweets: list.reverse()
		});
	});
};

module.exports.home = home;