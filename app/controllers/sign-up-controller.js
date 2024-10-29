const asyncHandler = require('express-async-handler');
const { registerUser } = require('../db/queries');
const { body, validationResult } = require('express-validator');

const alphaErr = 'must only contain letters.';
const lengthErr = 'must be between 3 to 12';

const validateUser = [
    body('fname').trim()
    .isAlpha().withMessage(`First name ${alphaErr}`),
    body('lname').trim()
    .isAlpha().withMessage(`Last name ${alphaErr}`),
    body('username').trim()
    .isLength({ min: 3, max: 12 }).withMessage(`username ${lengthErr}`),
    body('password').trim()
    .isLength({ min: 3, max: 12 }).withMessage(`password ${lengthErr}`),
    body('passwordConfirm').trim()
    .custom((value, { req  }) => {
        return value === req.body.password;
    }).withMessage('Passwords do not match')
];

exports.getSignUpForm = asyncHandler(async(req, res) => {
    res.render('sign-up-form');
});

exports.registerUser = [
    validateUser,
    asyncHandler(async(req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render('sign-up-form', { errors: errors.array() });
        }
        try {
            const err = await registerUser(req.body);
            if (err) {
                console.log(err);
                const error = [{ msg: 'username already exists' }];
                return res.status(400).render('sign-up-form', {errors: error });
            } else {
                res.redirect('/');
            }
        } catch (err) {
            next(err);
        }
    })
]
