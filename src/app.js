const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

let app = express();

app.use(bodyParser.json());
app.use(morgan('common'));

app.get('/', function (req, res) {
    res.send('App works!!');
});

app.get('*', function (req, res) {
    res.send('App works!!!!!');
});

module.exports = app;
