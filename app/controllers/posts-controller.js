const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const { registerPost, getAllPosts } = require('../db/queries');

const validatePost = [
    body('title')
    .notEmpty().withMessage('Post must have a title.'),
    body('message')
    .notEmpty().withMessage('Post must have a message.')
];

exports.getPostForm = asyncHandler(async(req, res) => {
    res.render('new-post');
});

exports.postPostForm = [
    validatePost,
    asyncHandler(async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render('new-post', { errors: errors.array() });
        }
        try {
            await registerPost(req);
        } catch (err) {
            next(err);
        }
        res.render('/');
    })
]

exports.getAllPosts = asyncHandler(async(req, res, next) => {
    try {
        const posts = await getAllPosts();
        req.posts = posts;
        next();
    } catch (err) {
        next(err);
    }
});
