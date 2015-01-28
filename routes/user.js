var mongoose = require('mongoose');
var User = require('../schema/user')

var routes = {}

routes.login = function (req, res){
	var user = new User;
	user.name = req.body.username;

	user.save(function(err) {
		if (err)
			console.error('Error: ', err);
		console.dir(user);
		req.session.user = user;
	});

	res.redirect('/');
};

routes.logout = function (req, res){
	var user = req.session.user;
};

module.exports = routes;