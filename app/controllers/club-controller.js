const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const { registerMember } = require('../db/queries');
require('dotenv').config({ path: '../.env'});

const validatePassword = [
    body('password').trim()
    .custom(value => {
        return value === process.env.SECRET_CLUB_PASSWORD;
    }).withMessage('Incorrect password entered.')
];

exports.getJoinClubView = asyncHandler(async(req, res) => {
    res.render('join-club');
});

exports.registerMember = [
    validatePassword,
    asyncHandler(async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render('join-club', { errors: errors.array() });
        }
        try {
            const err = await registerMember(req.user);
            if (err) {
                return err;
            } else {
                res.redirect('/');
            }
        } catch (err) {
            next(err);
        }
    })
]

exports.getClubView = asyncHandler(async(req, res) => {
    res.render('club-view');
})