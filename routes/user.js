var mongoose = require('mongoose');
var User = require('../schema/user')

module.exports.login = function(req, res) {
	res.render('login');
}

module.exports.create = function(req, res) {
	User.findOne({name: req.body.username}, function(err, user) {
		if (err)
			return console.error('Error: ', err);

		if (!user) {
			var newUser = new User({name: req.body.username});
			newUser.save(function(err) {
				if (err)
					return console.error('Error: ', err);
				return login(req, res, newUser);
			});
		}
		else
			return login(req, res, user);
	})
};

function login(req, res, user) {
	req.session.user = user;
	res.redirect('/');
};