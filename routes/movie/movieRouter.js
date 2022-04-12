const express = require('express');
const router = express.Router();
const Movie = require('../../models/movieModel');
const generateParams = require('./generateParams');

router.get('/all/:page/:limit', async (req, res) => {
    let { page, limit } = req.params;

    const count = await Movie.countDocuments();

    if (limit > 21 || limit < 1) {
        limit = 21;
    }

    if (page > Math.ceil(count / limit)) {
        page = Math.ceil(count / limit);
    }

    const movies = await Movie.find()
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();


    res.json({
        movies,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        limit
    });
})

router.post('/search', async (req, res) => {
    let { params, page, limit, sort } = req.body;

    const searchParams = generateParams(params);

    const count = await Movie.find(searchParams).countDocuments();

    if (limit > 21 || limit < 1) {
        limit = 21;
    }

    if (page > Math.ceil(count / limit)) {
        page = Math.ceil(count / limit);
    }

    const movies = await Movie.find(searchParams)
        .sort(sort)
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();


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