const express = require('express');
const moment = require('moment');
const router = express.Router();
const Movie = require('../../models/movieModel');
const User = require('../../models/userModel');
const authenticateToken = require('../middleware/authMiddleware');
const bcrypt = require('bcrypt');
const generateAccessToken = require('./generateJWT');
const userValidator = require('./userValidator');

router.post('/me', authenticateToken, (req, res) => {
    return res.json({ user: req.user });
})

router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const { error } = userValidator.registerValidation(name, email, password);
        if (error) {
            return res.json({ error });
        }

        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.json({ error: 'Email already in use' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            name,
            email,
            password: hashedPassword,
            registerDatetime: moment(),
        })

        const token = generateAccessToken(user._id, user.name);

        return user.save().then((doc) => res.json({ token, user: doc }));
    } catch (err) {
        return res.json({ err });
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            const validPassword = await bcrypt.compare(password, user.password);
            if (validPassword) {
                const token = generateAccessToken(user._id, user.name);
                return res.json({ token });
            } else {
                return res.status(400).json({ error: "Invalid Password" });
            }
        } else {
            return res.status(401).json({ error: "User does not exist" });
        }
    } catch (err) {
        return res.json({ err });
    }
})

module.exports = router;