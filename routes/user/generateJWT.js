const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const generateAccessToken = (userId, name) => {
    return jwt.sign({ userId, name }, process.env.JWT_SECRET, { expiresIn: '5000s' });
}

module.exports = generateAccessToken;