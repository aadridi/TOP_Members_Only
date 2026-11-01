function isAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}

	res.redirect('/log-in');
}

function isMember(req, res, next) {
	if (req.user.is_member === true) {
		return next();
	}
	res.redirect('/');
}

function isAdmin(req, res, next) {
	if (req.user.is_admin === true) {
		return next();
	}
	res.redirect('/');
}

module.exports = { isAuthenticated, isMember, isAdmin };
