const passport = require('../passport');

exports.getLogIn = async(req, res) => {
    res.render('log-in');
};

exports.LogInUser = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/log-in'
});