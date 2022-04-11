const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1] || req.body.token;
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.json({ error: "403: Forbidden" })

        req.user = user

        next()
    })
}

module.exports = authenticateToken;