const { validationResult, matchedData } = require('express-validator');

function getSignUp(req, res) {
	const validFieldsData = {
		email: '',
		first_name: '',
		last_name: '',
	};

	res.render('sign-up-form', {
		validFieldsData: validFieldsData,
	});
}

function postSignUp(req, res) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		// Check errors in console
		// console.log(errors.array());

		// Gather content of valid fields
		const validFieldsData = {
			email: req.body.email || '',
			first_name: req.body.first_name || '',
			last_name: req.body.last_name || '',
		};

		return res.status(400).render('sign-up-form', {
			errors: errors.array(),
			validFieldsData: validFieldsData,
		});
	}

	const { email } = matchedData(req);
	console.log(email);
	res.redirect('/');
}

module.exports = { getSignUp, postSignUp };
