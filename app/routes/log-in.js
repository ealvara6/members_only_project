const { Router } = require('express');
const logInRouter = Router();
const logInController = require('../controllers/log-in-controller');
const passport = require('../passport');

logInRouter.get('/', logInController.getLogIn);
logInRouter.post('/', logInController.LogInUser);

module.exports = logInRouter;
