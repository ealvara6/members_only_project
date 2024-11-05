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
            return;
        } catch(err) {
            return err;
        }
    })
});

exports.registerMember = asyncHandler(async(req, res) => {
    try {
        await pool.query('UPDATE members SET membership_status = true WHERE id = $1', [ req.id ]);
        return;
    } catch(err) {
        return err
    }
})

exports.registerPost = asyncHandler(async(req, res) => {
    const {title, message } = req.body;
    const { id } = req.user;
    try {
        await pool.query('INSERT INTO posts (title, timestamp, message, author_id) values ($1, $2, $3, $4);', [title, new Date(), message, id])
        return;
    } catch(err) {
        return (err);
    }
});

exports.getAllPosts = asyncHandler(async(req, res) => {
    try {
        const { rows } = await pool.query('SELECT posts.title, posts.timestamp, posts.message, members.username FROM posts INNER JOIN members ON posts.author_id = members.id;');
        console.log(rows);
        return rows;
    } catch(err) {
        return (err);
    }
})