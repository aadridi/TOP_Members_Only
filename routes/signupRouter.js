const { Router } = require('express');
const { getSignUp, postSignUp } = require('../controllers/signupController');

const signupRouter = Router();

signupRouter.get('/', getSignUp);

signupRouter.post('/', postSignUp);

module.exports = signupRouter;
