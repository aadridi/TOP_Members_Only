const { getAllMessages, createMessage } = require('../queries/messages');

async function getMessages(req, res) {
	const messages = await getAllMessages();
	res.render('messages.ejs', { messages: messages });
}

async function postMessage(req, res, next) {
	const title = req.body.title;
	const author_id = req.user.id;
	const text_message = req.body.text_message;
	try {
		await createMessage(title, author_id, text_message);
		res.redirect('/messages');
	} catch (error) {
		next(error);
	}
}

module.exports = { getMessages, postMessage };
