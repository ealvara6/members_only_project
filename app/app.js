const express = require('express');
const app = express();
const path = require('path');
const passport = require('./passport');
const session = require('express-session');
require('dotenv').config();

const signUpRouter = require('./routes/sign-up');
const logInRouter = require('./routes/log-in');
const clubRouter = require('./routes/club');
const postsRouter = require('./routes/posts');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

app.use('/sign-up', signUpRouter);
app.use('/log-in', logInRouter);
app.use('/club', clubRouter);
app.use('/posts', postsRouter);

app.get('/log-out', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next (err);
        }
        res.redirect('/');
    });
});

app.get('/', (req, res) => {
    res.render('index');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { console.log(`Express app listening on port ${PORT}`)});