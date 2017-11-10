var express = require('express');
var router = express.Router();

console.log('sample log');

/* GET users listing. */
router.get('/', function (req, res, next) {
    console.log('log users response');

    res.json({
        chance: req.chance,
        'test': 'testdata',
        'ch': 123
    });
});

module.exports = router;
