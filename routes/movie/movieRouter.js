const express = require('express');
const moment = require('moment');
const router = express.Router();
const Movie = require('../../models/movieModel');
const Comment = require('../../models/commentModel');
const User = require('../../models/userModel');
const authenticateToken = require('../user/authMiddleware');
const { default: mongoose } = require('mongoose');

router.get('/all/:page/:limit', async (req, res) => {
    const { page, limit } = req.params;

    const movies = await Movie.find()
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .select('title')
        .exec();

    // get total documents in the Movie collection 
    const count = await Movie.countDocuments();

    // return response with posts, total pages, and current page
    res.json({
        movies,
        totalPages: Math.ceil(count / limit),
        currentPage: page
    });
})


module.exports = router;