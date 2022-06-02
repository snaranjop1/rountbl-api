const mongoose = require('mongoose');
const config = require('./config');

const uri = config.MONGODB_URL;

mongoose
    .connect(uri)
    .then(() => console.log('\x1b[34m%s\x1b[0m', 'Connected to DB'))
    .catch((err) => console.error(err));

process.on('uncaughtException', (err) => {
    console.error(err);
    mongoose.disconnect();
});
