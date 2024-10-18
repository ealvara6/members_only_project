const pool = require('./pool');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');

exports.registerUser = asyncHandler(async(req, res) => {
    const { fname, lname, username, password } = req;
    bcrypt.hash(password, 10, async(err, hashedPassword) => {
        if (err) {
            return err;
        }
        try {
            await pool.query('INSERT INTO members (first_name, last_name, username, password, membership_status) VALUES ($1, $2, $3, $4, $5)', [ fname, lname, username, hashedPassword, false ]);
            return null;
        } catch(err) {
            return err;
        }
    })
});