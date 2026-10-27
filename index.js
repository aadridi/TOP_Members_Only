require('dotenv').config();
const path = require('node:path');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const signupRouter = require('./routes/signupRouter');

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Session info

app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
	}),
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: false }));

// Sign-up routes
app.use('/sign-up', signupRouter);

app.get('/', (req, res) => res.render('index'));

app.listen(3000, (error) => {
	if (error) {
		throw error;
	}
	console.log('app listening on port 3000!');
});
