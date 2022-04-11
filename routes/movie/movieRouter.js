const express = require('express');
const moment = require('moment');
const router = express.Router();
const Movie = require('../../models/movieModel');
const Comment = require('../../models/commentModel');
const User = require('../../models/userModel');
const authenticateToken = require('../user/authMiddleware');
const { default: mongoose } = require('mongoose');
const generateParams = require('./generateParams');

router.get('/all/:page/:limit', async (req, res) => {
    const { page, limit } = req.params;

    const movies = await Movie.find()
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();

    const count = await Movie.countDocuments();

    res.json({
        movies,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        limit
    });
})

router.post('/search', async (req, res) => {
    const { params, page, limit, sort } = req.body;

    const searchParams = generateParams(params);

    const movies = await Movie.find(searchParams)
        .sort(sort)
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();

    const count = await Movie.find(searchParams).countDocuments();
    
    res.json({
        movies,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        limit
    });
})

router.get('/id/:movieId', async (req, res) => {
    const { movieId } = req.params;

    const movie = await Movie.findById(movieId);

    res.json({ movie });
})

router.post('/leaveComment', authenticateToken, async (req, res) => {

    const { movie_id, text } = req.body;
    const { userId } = req.user;

    const user = await User.findById(userId);

    const comment = new Comment({
        name: user.name || user.username || "AnonymousUser",
        email: user.email || "AnonymousUser",
        movie_id: mongoose.Types.ObjectId(movie_id),
        text,
        date: moment().toDate()
    })

    comment.save().then((doc) => res.json({ comment: doc }));
})

router.get('/genres', async (req, res) => {
    try {
        const movies = await Movie.find();

        console.log(`Received ${movies.length} movies`);

        const genres = [];
        const types = [];

        movies.forEach(movie => {
            movie?.genres?.forEach(genre => {
                if (!genres.includes(genre)) {
                    console.log(`Getted genre: ${genre}`);
                    genres.push(genre);
                }
            })
            if (!types.includes(movie.type)) {
                console.log(`Getted type: ${movie.type}`);
                types.push(movie.type);
            }
        })

        return res.json({ genres, types });
    } catch (err) {
        console.error(err);
    }

})

module.exports = router;