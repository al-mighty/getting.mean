var express = require('express');
var router = express.Router();
var playlistConroller = require('./../controllers/playlist');


// var ctrlLocations = require('./../controllers/locations');
// var ctrlOthers = require('./../controllers/others');




/* GET home page. */
// router.get('/', ctrlLocations.homelist);
// router.get('/location', ctrlLocations.loscationInfo);
// router.get('/location/review/new', ctrlLocations.addReview);

// router.get('/playlist',playlistConroller.all);

// получение по айди
router.get('/playlist/:playlistId', playlistConroller.playlistInfo);
router.post('/playlist/:playlistId/review/new', playlistConroller.doAddReview);

//Находим объект по айди и обновляем его объектом с данными "name"
// router.put('/playlist/:id', playlistConroller.update);
//
// router.delete('/playlist/:id', playlistConroller.delete);
//
//other
// router.get('/about', ctrlOthers.about);

module.exports = router;
