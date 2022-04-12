const jwt = require('jsonwebtoken');
const User = require('../../models/userModel');

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1] || req.body.token;
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
        if (err) return res.json({ error: "403: Forbidden" });

        req.user = await User.findById(user.userId).select("settings _id email registerDatetime name");

        next()
    })
}

module.exports = authenticateToken;