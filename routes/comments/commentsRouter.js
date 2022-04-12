const express = require('express');
const moment = require('moment');
const router = express.Router();
const Comment = require('../../models/commentModel');
const { default: mongoose } = require('mongoose');
const authenticateToken = require('../middleware/authMiddleware');

router.get('/get/:movieId', async (req, res) => {
    const { movieId } = req.params;

    const comments = await Comment.find({
        movie_id: mongoose.Types.ObjectId(movieId)
    });

    res.json({ comments });
})

router.post('/new', authenticateToken, async (req, res) => {
    const { movieId, text } = req.body;

    const comment = new Comment({
        name: req.user?.name,
        email: req.user?.email,
        movie_id: mongoose.Types.ObjectId(movieId),
        text,
        date: moment().toDate()
    });

    comment.save().then((doc) => res.json({ comment: doc }));
})

module.exports = router;