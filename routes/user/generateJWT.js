const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const generateAccessToken = (userId, username) => {
    return jwt.sign({userId, username}, process.env.JWT_SECRET, { expiresIn: '5000s' });
}

module.exports = generateAccessToken;