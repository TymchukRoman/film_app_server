const express = require('express');
const router = express.Router();
const Theater = require('../../models/theaterModel');
const getParamType = require('./getParamType');

router.get('/all', async (req, res) => {
    try {

        const theaters = await Theater.find({}).select('theaterId location');

        return res.json({ total: theaters.length, theaters });

    } catch (err) {
        return res.json({ err });
    }
})

router.get('/search/:param', async (req, res) => {
    try {

        let { param } = req.params;

        const params = getParamType(param);

        const theaters = await Theater.find(params).select('theaterId location');

        return res.json({ total: theaters.length, theaters });

    } catch (err) {
        return res.json({ err });
    }
});

module.exports = router;