const { Router } = require('express');
const { getMessages, postMessage, postDeleteMessage } = require('../controllers/messageController');
const { isAuthenticated, isMember, isAdmin } = require('../middlewares/authMiddleware');

const messageRouter = Router();

messageRouter.get('/', getMessages);

messageRouter.post('/new', isAuthenticated, isMember, postMessage);

messageRouter.post('/:id/delete', isAuthenticated, isAdmin, postDeleteMessage);

module.exports = messageRouter;
