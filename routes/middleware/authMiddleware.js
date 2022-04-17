const jwt = require('jsonwebtoken');
const User = require('../../models/userModel');

const authenticateToken = (req, res, next) => {

    const token = req.headers['authorization']?.split(' ')[1] || req.body.token;

    if (token == null) return res.json({ error: "Unauthorized", status: 403 });

    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
        if (err) {
            if (err.name === "TokenExpiredError") {
                return res.json({ error: "Relogin, please", status: 401 });
            }
            return res.json({ error: "Forbidden", status: 403 });
        };

        req.user = await User.findById(user.userId).select("settings _id email registerDatetime name favorites");

        next();
    });
}

module.exports = authenticateToken;