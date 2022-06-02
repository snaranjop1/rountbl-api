const jwt = require('jsonwebtoken');
const config = require('../config');

const getToken = (data) => {
    return jwt.sign(data, config.SECRET, {
        expiresIn: 86400,
    });
};

const verifyToken = (token) => {
    return jwt.verify(token, config.SECRET);
};

module.exports = { getToken, verifyToken };
