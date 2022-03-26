const app = require('./app');

let port = process.env.PORT || '3000';

app.listen(port, function (err) {
    console.log('Server running on port:' + port);
    if (err) console.err(err);
});
