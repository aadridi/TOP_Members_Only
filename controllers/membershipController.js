const { updateMembership } = require('../queries/users');

function getMembership(req, res) {
	res.render('become-member');
}

async function postMembership(req, res, next) {
	const id = req.user.id;
	const membershipCode = req.body.membershipCode;
	const secretCode = process.env.MEMBERSHIP_CODE;
	if (membershipCode === secretCode) {
		try {
			await updateMembership(id);
			res.redirect('/messages');
		} catch (err) {
			next(err);
		}
	} else {
		res.status(400).render('become-member', {
			errors: [{ msg: 'Incorrect membership code.' }],
		});
	}
}

module.exports = { getMembership, postMembership };
