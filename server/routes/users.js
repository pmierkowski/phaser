var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

console.log('sample log');

/* POST data 8 */
router.post('/', function(req, res, next){
    console.log('post data');
    console.log(req.body);

    res.json({
        'you_send': req.body
    });
});

/* GET users listing. */
router.get('/', function (req, res, next) {
    console.log('log users response');
    console.log(req.param('a'));

    res.json({
        chance: req.chance,
        'test': 'testdata',
        'ch': req.param('a')
    });
});

module.exports = router;
