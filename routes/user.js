var express = require('express');
var mongoose = require('mongoose');
var User = require('../models/user')

var router = express.Router();

router.get('/login', login);
router.get('/logout', logout);
router.post('/create', create);

module.exports = router;

function login(req, res) {
	res.render('login', {
		redir: req.query.redir
	});
}

function logout(req, res) {
	req.session.user = null;
	res.redirect('/');
}

function create(req, res) {
	User.findOne({name: req.body.username}, function(err, user) {
		if (err)
			return console.error('Error: ', err);

		if (!user) {
			var newUser = new User({name: req.body.username});
			newUser.save(function(err) {
				if (err)
					return console.error('Error: ', err);
				return doLogin(req, res, newUser);
			});
		}
		else
			return doLogin(req, res, user);
	})
}

// helpers

function doLogin(req, res, user) {
	req.session.user = user;
	res.redirect('/');
}