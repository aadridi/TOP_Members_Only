const pool = require('../db/pool');

async function getAllMessages() {
	const result = await pool.query('SELECT messages.id, messages.title, messages.text_message, users.first_name, users.last_name, messages.created_at FROM messages JOIN users ON messages.author_id = users.id ORDER BY messages.created_at DESC');
	return result.rows;
}

async function createMessage(title, author_id, text_message) {
	await pool.query('INSERT INTO messages (title, author_id, text_message) VALUES ($1, $2, $3)', [title, author_id, text_message]);
}

module.exports = { getAllMessages, createMessage };
