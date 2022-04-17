const express = require('express');
const moment = require('moment');
const router = express.Router();
const Movie = require('../../models/movieModel');
const User = require('../../models/userModel');
const authenticateToken = require('../middleware/authMiddleware');
const bcrypt = require('bcrypt');
const generateAccessToken = require('./generateJWT');
const userValidator = require('./userValidator');
const { default: mongoose } = require('mongoose');

router.post('/me', authenticateToken, (req, res) => {
    return res.json({ user: req.user });
});

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
});

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
});

router.post('/editfavorite', authenticateToken, async (req, res) => {
    try {

        const { type, movieId } = req.body;

        let favorites = Array.isArray(req.user?.favorites) ? [...req.user.favorites] : [];

        switch (type) {
            case 'add': {
                if (favorites.includes(movieId)) {
                    return res.json({ err: "Movie already in your favorites" });
                } else {
                    favorites.push(movieId);
                    break;
                }
            }
            case 'remove': {
                if (favorites.includes(movieId)) {
                    favorites = favorites.filter(tempMovieId => tempMovieId !== movieId);
                    break;
                } else {
                    return res.json({ err: "Movie not in your favorites" });
                }
            }
            default: {
                return res.json({ err: "Unknown action" });
            }
        }

        let doc = await User.findOneAndUpdate({ _id: req.user._id }, { $set: { favorites } }, {
            returnOriginal: false
        });

        return res.json({ doc, user: req.user._id });

    } catch (err) {
        return res.json({ err });
    }
})

router.post('/favorites', authenticateToken, async (req, res) => {
    try {

        const favorites = Array.isArray(req.user?.favorites) ? [...req.user.favorites] : [];

        const movies = await Movie.find({ _id: { $in: favorites.map((mId) => mongoose.Types.ObjectId(mId)) } });

        return res.json({ movies, total: movies.length });

    } catch (err) {
        return res.json({ err });
    }
})

module.exports = router;