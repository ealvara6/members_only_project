const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();

const signUpRouter = require('./routes/sign-up');

app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/sign-up', signUpRouter);

app.get('/', (req, res) => {
    res.send('this is the home page.');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { console.log(`Express app listening on port ${PORT}`)});