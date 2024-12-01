const { Router } = require('express');
const postsRouter = Router();
const postsController = require('../controllers/posts-controller');

postsRouter.get('/new-post', postsController.getPostForm);
postsRouter.post('/new-post',postsController.postPostForm);

postsRouter.get('/delete-post/:id', postsController.deletePost);

module.exports = postsRouter;
