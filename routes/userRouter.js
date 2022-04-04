var express = require('express');
var router = express.Router();


router.get('/', function (req, res) {
    res.json({ hello: 'world' });
})

router.get('/about', function (req, res) {
})

module.exports = router;