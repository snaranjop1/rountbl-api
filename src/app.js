const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const authRouter = require('./routes/auth.routes');
const communityRouter = require('./routes/community.routes');

let app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan('common'));

app.use('/auth', authRouter);
app.use('/community', communityRouter);

app.get('/', function (req, res) {
    res.status(200).json({ message: 'Welcome to Rountbl API' });
});

app.get('*', function (req, res) {
    res.status(404).json({ err: 'Wrong path!' });
});

module.exports = app;
