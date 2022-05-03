const express = require('express');
const router = express.Router();
const Movie = require('../../models/movieModel');
const Actor = require('../../models/actorModel');
const Countrie = require('../../models/countrieModel');
const Director = require('../../models/directorModel');
const Genre = require('../../models/genreModel');
const Language = require('../../models/languageModel');
const Rate = require('../../models/rateModel');
const Writer = require('../../models/writerModel');

router.get('/movies-data', async (req, res) => {
    try {

        const movies = await Movie.find();

        console.log(`Received ${movies.length} movies`);

        const allFields = [];

        const genres = [];
        const types = [];
        const actors = [];
        const languages = [];
        const directors = [];
        const writers = [];
        const countries = [];
        const rates = [];

        const existingFields = {
            allMovies: 0,
            plot: 0,
            fullplot: 0,
            poster: 0,
            tomatoes: 0,
            imdb: 0,
            metacritic: 0,
            awards: 0
        }

        movies.forEach(movie => {

            movie = movie._doc;

            existingFields.allMovies++;

            movie?.genres?.forEach(genre => {
                if (!genres.includes(genre)) {
                    genres.push(genre);
                }
            })

            if (!types.includes(movie.type)) {
                types.push(movie.type);
            }

            if (movie.rated && !rates.includes(movie.rated)) {
                rates.push(movie.rated);
            }

            movie?.cast?.forEach(actor => {
                if (!actors.includes(actor)) {
                    actors.push(actor);
                }
            })

            movie?.languages?.forEach(language => {
                if (!languages.includes(language)) {
                    languages.push(language);
                }
            })

            movie?.directors?.forEach(director => {
                if (!directors.includes(director)) {
                    directors.push(director);
                }
            })

            movie?.writers?.forEach(writer => {
                if (!writers.includes(writer)) {
                    writers.push(writer);
                }
            })

            movie?.countries?.forEach(countrie => {
                if (!countries.includes(countrie)) {
                    countries.push(countrie);
                }
            })

            if (movie.plot) existingFields.plot++;
            if (movie.fullplot) existingFields.fullplot++;
            if (movie.poster) existingFields.poster++;
            if (movie.tomatoes) existingFields.tomatoes++;
            if (movie.imdb) existingFields.imdb++;
            if (movie.metacritic) existingFields.metacritic++;
            if (movie.awards) existingFields.awards++;

        })

        console.log(`Calculation end, inserting documents...`);

        await Actor.insertMany([...actors.map(actor => ({ name: actor }))]);
        await Genre.insertMany([...genres.map(genre => ({ name: genre }))]);
        await Language.insertMany([...languages.map(language => ({ name: language }))]);
        await Countrie.insertMany([...countries.map(countrie => ({ name: countrie }))]);
        await Director.insertMany([...directors.map(director => ({ name: director }))]);
        await Rate.insertMany([...rates.map(rate => ({ name: rate }))]);
        await Writer.insertMany([...writers.map(writer => ({ name: writer }))]);

        console.log(`Inserted.`);

        return res.json({ allFields, genres, types, actors, languages, directors, writers, countries, rates, existingFields });

    } catch (err) {
        console.error(err);
    }

})

module.exports = router;