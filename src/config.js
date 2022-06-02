require('dotenv').config();

module.exports = {
    SECRET: process.env.SECRET || 'utraSuperSecretWordForJWT',
    MONGODB_URL: process.env.MONGODB_URL,
    PORT: process.env.PORT || '3000',
    NODE_ENV: process.env.NODE_ENV,
};
