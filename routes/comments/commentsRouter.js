const express = require('express');
const moment = require('moment');
const router = express.Router();
const Comment = require('../../models/commentModel');
const { default: mongoose } = require('mongoose');
const authenticateToken = require('../middleware/authMiddleware');
const commentValidator = require('./commentValidator');

router.get('/get/:movieId', async (req, res) => {
    try {
        const { movieId } = req.params;

        const comments = await Comment.find({
            movie_id: mongoose.Types.ObjectId(movieId)
        });

        return res.json({ comments });
    } catch (err) {
        return res.json({ err })
    }
})

router.post('/new', authenticateToken, async (req, res) => {
    try {
        const { movieId, text } = req.body;

        const { error } = commentValidator.commentPostValidation(movieId, text);
        if (error) {
            return res.json({ error });
        }

        const comment = new Comment({
            name: req.user?.name,
            email: req.user?.email,
            movie_id: mongoose.Types.ObjectId(movieId),
            text,
            date: moment().toDate()
        });

        return comment.save().then((doc) => res.json({ comment: doc }));
    } catch (err) {
        return res.json({ err });
    }
})

module.exports = router;