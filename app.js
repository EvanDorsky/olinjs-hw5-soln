var express = require('express');
var session = require('express-session');
var path = require('path');

// routes
var index = require('./routes/index');
var user = require('./routes/user');
var tweet = require('./routes/tweet');
var auth = require('./routes/auth').router;
var passport = require('./routes/auth').passport;
var ensureAuthenticated = require('./routes/auth').auth;

var mongoose = require('mongoose');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');

var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
	secret: 'secret',
	resave: false,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
// mongo
var db = mongoose.connection;
db.on('error', console.error);

var MONGO = process.env.MONGOURI_TWOTER || 'mongodb://localhost/test';
mongoose.connect(MONGO);

// routes
app.get('/', ensureAuthenticated, index.home);

app.use('/user', user);
app.use('/auth', auth);

app.use('/tweet', tweet);

app.listen(process.env.PORT || 3000);