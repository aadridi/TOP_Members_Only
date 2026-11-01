const { Router } = require('express');
const passport = require('passport');
const { getLogin } = require('../controllers/loginController');

const loginRouter = Router();

// GET route
loginRouter.get('/', getLogin);

// POST route
loginRouter.post('/', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/log-in'
}));

module.exports = loginRouter;