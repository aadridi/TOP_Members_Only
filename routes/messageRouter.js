const { Router } = require('express');
const { getMessages, postMessage } = require('../controllers/messageController');
const { isAuthenticated, isMember } = require('../middlewares/authMiddleware');

const messageRouter = Router();

messageRouter.get('/', isAuthenticated, isMember, getMessages);

messageRouter.post('/new', isAuthenticated, isMember, postMessage);

module.exports = messageRouter;
