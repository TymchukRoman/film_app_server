const express = require('express');
const moment = require('moment');
const router = express.Router();
const Movie = require('../../models/movieModel');
const User = require('../../models/userModel');
const authenticateToken = require('./authMiddleware');
const bcrypt = require('bcrypt');
const generateAccessToken = require('./generateJWT');

router.post('/me', authenticateToken, (req, res) => {
    res.json({ user: req.user });
})

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
        name,
        email,
        password: hashedPassword,
        registerDatetime: moment(),
    })

    const token = generateAccessToken(user._id, user.name);

    user.save().then((doc) => res.json({ token, user: doc }));
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        const validPassword = await bcrypt.compare(password, user.password);
        if (validPassword) {
            const token = generateAccessToken(user._id, user.name);
            res.json({ token });
        } else {
            res.status(400).json({ error: "Invalid Password" });
        }
    } else {
        res.status(401).json({ error: "User does not exist" });
    }
})

module.exports = router;