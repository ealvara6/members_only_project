const passport = require('../passport');

exports.getLogIn = async(req, res) => {
    if(req.session.messages){
        const errMessage = req.session.messages;
        const size = Object.keys(errMessage).length;
        console.log(size);
        if(size > 1) errMessage.shift();
    }
    res.render('log-in', {error: req.session.messages });
};

exports.LogInUser = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/log-in', failureMessage: true
});