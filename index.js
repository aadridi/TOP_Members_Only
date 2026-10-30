require('dotenv').config();
const path = require('node:path');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const { getUserByEmail } = require('./queries/users');
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

// Authentification Strategy

passport.use(
	new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
		try {
			const user = await getUserByEmail(email);

			if (user === null) {
				return done(null, false, { message: 'Incorrect username or password.' });
			}
			const match = await bcrypt.compare(password, user.password);
			if (!match) {
				// passwords do not match!
				return done(null, false, { message: 'Incorrect username or password.' });
			}

			return done(null, user);
		} catch (err) {
			return done(err);
		}
	}),
);

// Sign-up routes
app.use('/sign-up', signupRouter);

app.get('/', (req, res) => res.render('index'));

app.listen(3000, (error) => {
	if (error) {
		throw error;
	}
	console.log('app listening on port 3000!');
});
