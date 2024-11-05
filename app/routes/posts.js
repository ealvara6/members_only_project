const { Router } = require('express');
const postsRouter = Router();
const postsController = require('../controllers/posts-controller');

postsRouter.get('/new-post', postsController.getPostForm);
postsRouter.post('/new-post',postsController.postPostForm);

module.exports = postsRouter;
