const { Router } = require('express');
const { getSignUp, postSignUp } = require('../controllers/signupController');
const { body } = require('express-validator');

const signupRouter = Router();

// GET route
signupRouter.get('/', getSignUp);

// POST route
const validateFirstName = body('first_name').trim();
const validateLastName = body('last_name').trim();
const validateEmail = body('email').trim().notEmpty().withMessage('Email is required.').isEmail().withMessage('Please enter a valid email address.');
const validatePassword = body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters.');
const validatePasswordConfirmation = body('password_confirmation')
	.notEmpty()
	.withMessage('Password confirmation can not be empty.')
	.custom((value, { req }) => {
		return value === req.body.password;
	})
	.withMessage('Passwords do not match.');

signupRouter.post('/', validateFirstName, validateLastName, validateEmail, validatePassword, validatePasswordConfirmation, postSignUp);

module.exports = signupRouter;
