function getLogin(req, res) {
	console.log('Authentification successful!');
	res.render('login-form');
}

module.exports = { getLogin };
