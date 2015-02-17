var express = require('express');
var mongoose = require('mongoose');
var User = require('../models/user');

var router = express.Router();

router.get('/login', login);
router.get('/logout', logout);

module.exports = router;

function login(req, res) {
	res.render('login', {
		redir: req.query.redir
	});
}

function logout(req, res) {
	req.logout();
	res.redirect('/');
}

// helpers

function doLogin(req, res, user) {
	req.session.user = user;
	res.redirect('/');
}