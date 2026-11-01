const { Router } = require('express');
const { logout } = require('../controllers/logoutController');

const logoutRouter = Router();

logoutRouter.post('/', logout);

module.exports = logoutRouter;
