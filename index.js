require('dotenv').config();
const path = require('node:path');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const { getUserByEmail, getUserById } = require('./queries/users');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const signupRouter = require('./routes/signupRouter');
const loginRouter = require('./routes/loginRouter');
const logoutRouter = require('./routes/logoutRouter');
const messageRouter = require('./routes/messageRouter');
const membershipRouter = require('./routes/membershipRouter');
const errorHandler = require('./middlewares/errorHandler');

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
				return done(null, false, { message: 'Incorrect email or password.' });
			}
			const match = await bcrypt.compare(password, user.password);
			if (!match) {
				// passwords do not match!
				return done(null, false, { message: 'Incorrect email or password.' });
			}

			return done(null, user);
		} catch (err) {
			return done(err);
		}
	}),
);

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	try {
		const user = await getUserById(id);
		done(null, user);
	} catch (err) {
		done(err);
	}
});

// Middleware to make user object available for all views
app.use((req, res, next) => {
	res.locals.user = req.user;
	next();
});

// Test authentification route
app.get('/test-auth', (req, res) => {
	console.log(req.user);
	res.send('Check the terminal');
});

// Sign-up routes
app.use('/sign-up', signupRouter);
app.use('/log-in', loginRouter);
app.use('/log-out', logoutRouter);

// Message routes
app.use('/messages', messageRouter);

// Get membership route
app.use('/become-member', membershipRouter);

app.get('/', (req, res) => res.render('index'));

// Error handling middleware
app.use(errorHandler);

app.listen(3000, (error) => {
	if (error) {
		throw error;
	}
	console.log('app listening on port 3000!');
});
