var express = require('express');

var config = require('../oauth.js');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../models/user');

var router = express.Router();

function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated())
		return next();

	res.redirect('/user/login')
}

router.get('/facebook',
	passport.authenticate('facebook'));

router.get('/facebook/callback', 
	passport.authenticate('facebook', { failureRedirect: '/' }),
function(req, res) {
	res.redirect('/auth/account');
});

router.get('/account', ensureAuthenticated, function(req, res){
	User.findById(req.session.passport.user, function(err, user) {
		if(err) {
			console.error(err);
		} else {
			res.redirect('/');
		};
	});
});

passport.use(new FacebookStrategy({
	clientID: config.facebook.clientID,
	clientSecret: config.facebook.clientSecret,
	callbackURL: config.facebook.callbackURL
},
function(accessToken, refreshToken, profile, done) {
	User.findOne({ oauthID: profile.id }, function(err, user) {
		if (err)
			console.error(err);
		if (!err && user != null) {
			done(null, user);
		} else {
			var user = new User({
				oauthID: profile.id,
				name: profile.displayName,
				created: Date.now()
			});
			user.save(function(err) {
				if (err) {
					console.error(err);
				} else {
					console.log("saving user ...");
					done(null, user);
				};
			});
		};
	});
}
));

passport.serializeUser(function(user, done) {
	console.log('serializeUser: ' + user._id)
	done(null, user._id);
});
passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, user){
		console.log(user)
		if(!err) done(null, user);
		else done(err, null)
	})
});

module.exports.router = router;
module.exports.passport = passport;
module.exports.auth = ensureAuthenticated;