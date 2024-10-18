const { Router } = require('express');
const signUpRouter = Router();
const signUpController = require('../controllers/sign-up-controller');

signUpRouter.get('/', signUpController.getSignUpForm);
signUpRouter.post('/', signUpController.registerUser);

module.exports = signUpRouter;
