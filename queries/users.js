const pool = require('../db/pool');

async function createUser({ email, first_name, last_name, hashedPassword }) {
	const result = await pool.query('INSERT INTO users (email, first_name, last_name, password) VALUES ($1, $2, $3, $4) RETURNING id', [email, first_name, last_name, hashedPassword]);
	return result.rows[0].id;
}

async function getUserByEmail(email) {
	const result = await pool.query('SELECT * from users WHERE email=$1', [email]);
	return result.rows[0] || null;
}

module.exports = { createUser, getUserByEmail };
