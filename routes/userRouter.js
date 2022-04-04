var express = require('express');
var router = express.Router();
const Movie = require('../models/movieModel');

router.get('/', function (req, res) {
    res.json({ hello: 'world' });
})

router.get('/about', async (req, res) => {
    const response = await Movie.find({}).limit(10);
    console.log(response);
    res.json(response);
})

module.exports = router;