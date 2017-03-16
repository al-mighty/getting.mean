var express = require('express');
var router = express.Router();

var homepageController = function (req,res) {
    res.render('index', {title:'Express'})
};

var ctrlMain = require('../controllers/main');


/* GET home page. */
router.get('/', homepageController);

module.exports = router;
