const express = require('express');
const movieGenres = require('../../constants/movie_categories');
const router = express.Router();
const Movie = require('../../models/movieModel');
const generateParams = require('./generateParams');

router.get('/all/:page/:limit', async (req, res) => {
    try {

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

        return res.json({
            movies,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            limit
        });

    } catch (err) {
        return res.json({ err });
    }
})

router.post('/search', async (req, res) => {
    try {

        let { params, page, limit, sort } = req.body;

        const searchParams = generateParams(params);

        const count = await Movie.find(searchParams).countDocuments();

        if (limit > 21 || limit < 1) {
            limit = 21;
        }

        if (page > Math.ceil(count / limit)) {
            page = Math.ceil(count / limit) || 1;
        }

        const movies = await Movie.find(searchParams)
            .sort(sort)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();


        return res.json({
            movies,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            limit
        });

    } catch (err) {
        return res.json({ err });
    }
})

router.get('/id/:movieId', async (req, res) => {
    try {

        const { movieId } = req.params;

        const movie = await Movie.findById(movieId);

        return res.json({ movie });

    } catch (err) {
        return res.json({ err });
    }
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

router.get('/top/:cate', async (req, res) => {
    try {

        const { cate } = req.params;

        let param;

        switch (cate) {
            case "hot": {
                param = "num_mflix_comments";
                break;
            }
            case "latest": {
                param = "released";
                break;
            }
            default: {
                param = "released";
                break;
            }
        }

        const hot_movies = await Movie.find({}).sort({ [param]: -1 }).limit(20);

        res.json({ movies: hot_movies });

    } catch (err) {
        console.error(err);
    }
});

router.get('/categories', async (req, res) => {
    try {

        const movies = {};

        Promise.all(
            movieGenres.map(async (genre) => {
                const count = await Movie.count({ genres: genre, poster: { $exists: true, $ne: null } });
                const random_skip = count > 10 ? Math.floor(Math.random() * 10) : Math.floor(Math.random() * count);
                const genreMovie = await Movie.find({ genres: genre, poster: { $exists: true, $ne: null } })
                    .sort('-num_mflix_comments')
                    .skip(random_skip)
                    .select("title genres poster")
                    .limit(1);
                movies[genre] = genreMovie[0];
            })
        ).then(() => {
            res.json({ movies: movies });
        });

    } catch (err) {
        console.error(err);
    }
})

router.get('/random', async (req, res) => {
    try {

        Movie.count({ poster: { $exists: true, $ne: null } }).exec((err, count) => {
            const random = Math.floor(Math.random() * count);

            Movie.findOne({ poster: { $exists: true, $ne: null } }).skip(random).select("title _id").exec((err, movie) => {
                res.json({ movie });
            });
        });

    } catch (err) {
        console.error(err);
    }
})

module.exports = router;