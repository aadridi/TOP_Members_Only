function getSignUp(req, res) {
	res.render('sign-up-form');
}

function postSignUp(req, res) {
    const formData = req.body;

    res.json(formData);
}

module.exports = { getSignUp, postSignUp };
