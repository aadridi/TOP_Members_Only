const { createUser } = require('../queries/users');
const { validationResult, matchedData } = require('express-validator');
const bcrypt = require('bcryptjs');

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

async function postSignUp(req, res, next) {
	// Gather content of valid fields
	const validFieldsData = {
		email: req.body.email || '',
		first_name: req.body.first_name || '',
		last_name: req.body.last_name || '',
	};

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		// Check errors in console
		// console.log(errors.array());

		return res.status(400).render('sign-up-form', {
			errors: errors.array(),
			validFieldsData: validFieldsData,
		});
	}

	try {
		const hashedPassword = await bcrypt.hash(matchedData(req).password, 10);
		const { email, first_name, last_name } = matchedData(req);
		console.log(email, first_name, last_name);
		await createUser({ email, first_name, last_name, hashedPassword });
		res.redirect('/');
	} catch (error) {
		if (error.code === '23505') {
			return res.status(400).render('sign-up-form', {
				errors: [{ msg: 'This email already exists.' }],
				validFieldsData: validFieldsData,
			});
		}
		console.error(error);
		next(error);
	}
}

module.exports = { getSignUp, postSignUp };
