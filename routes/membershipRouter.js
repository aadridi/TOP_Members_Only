const { Router } = require('express');
const { getMembership, postMembership } = require('../controllers/membershipController');
const { isAuthenticated, isNotMember } = require('../middlewares/authMiddleware');

const membershipRouter = Router();

membershipRouter.get('/', isAuthenticated, isNotMember, getMembership);

membershipRouter.post('/', isAuthenticated, isNotMember, postMembership);

module.exports = membershipRouter;
