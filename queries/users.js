const pool = require('../db/pool');

async function createUser({ email, first_name, last_name, hashedPassword }) {
	const result = await pool.query('INSERT INTO users (email, first_name, last_name, password) VALUES ($1, $2, $3, $4) RETURNING id', [email, first_name, last_name, hashedPassword]);
    return result.rows[0].id;
}

module.exports = { createUser };
