const asyncHandler = require('express-async-handler');
const { registerUser } = require('../db/queries');
const { body, validationResult } = require('express-validator');
const { LogInUser } = require('./log-in-controller');
require('dotenv').config();

const alphaErr = 'must only contain letters.';
const lengthErr = 'must be between 3 to 12.';

const validateUser = [
    body('fname').trim()
    .notEmpty().withMessage('Please enter a first name.')
    .isAlpha().withMessage(`First name ${alphaErr}`),
    body('lname').trim()
    .notEmpty().withMessage('Please enter a last name.')
    .isAlpha().withMessage(`Last name ${alphaErr}`),
    body('username').trim()
    .isLength({ min: 3, max: 12 }).withMessage(`username ${lengthErr}`),
    body('password').trim()
    .isLength({ min: 3, max: 12 }).withMessage(`password ${lengthErr}`),
    body('passwordConfirm').trim()
    .custom((value, { req  }) => {
        return value === req.body.password;
    }).withMessage('Passwords do not match'),
    body('adminPasscode')
    .optional({ nullable: true, checkFalsy: true })
    .custom((value, { req }) => {
        if (value === process.env.ADMIN_PASSCODE) {
            req.body.isAdmin = true;
            req.body.isMember = true;
            return true;
        }
        return false;
    }).withMessage('Incorrect admin passcode')
];

exports.getSignUpForm = asyncHandler(async(req, res) => {
    res.render('sign-up-form');
});

exports.registerUser = [
    validateUser,
    asyncHandler(async(req, res, next) => {
        if (!req.body.isAdmin) {
            req.body.isAdmin = false;
            req.body.isMember = false;
        }
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render('sign-up-form', { errors: errors.array() });
        }
        try {
            const user = await registerUser(req.body);
            console.log(user);
            if (user.err !== null) {
                const error = [{ msg: 'username already exists' }];
                return res.status(400).render('sign-up-form', {errors: error });
            } else {
                req.login(user.user);
                res.redirect('/');
            }
        } catch (err) {
            next(err);
        }
    })
]
