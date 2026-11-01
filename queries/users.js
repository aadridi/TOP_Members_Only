const pool = require('../db/pool');

async function createUser({ email, first_name, last_name, hashedPassword }) {
	const result = await pool.query('INSERT INTO users (email, first_name, last_name, password) VALUES ($1, $2, $3, $4) RETURNING id', [email, first_name, last_name, hashedPassword]);
	return result.rows[0].id;
}

async function getUserByEmail(email) {
	const result = await pool.query('SELECT * from users WHERE email=$1', [email]);
	return result.rows[0] || null;
}

async function getUserById(id) {
	const result = await pool.query('SELECT * from users WHERE id=$1', [id]);
	return result.rows[0] || null;
}

async function updateMembership(id) {
	await pool.query('UPDATE users SET is_member = true WHERE id=$1', [id]);
}

module.exports = { createUser, getUserByEmail, getUserById, updateMembership };
