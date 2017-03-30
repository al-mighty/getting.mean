var request  = require('request');

var apiOptions = {
    server: "http://localhost:3000"
};

var requestOptions = {
    url: "http://localhost/api/path",
    method :"GET",
    json: {},
    qs: {
        offset: 20
    }
};
request(requestOptions, function (err,response,body)
{
    if (err) {
        console.log(err)
    } else if (response.statusCode = 200) {
        console.log(body);
    } else {
        console.log(response.statusCode)
    }
});

/* Получить (GET) домашнюю страницу */

var renderHomepage = function(req,res){
    res.render('locations-list', {
            title: 'find a place to work with wifi',
            pageHeader: {
                title: "mySite",
                strapline: "Поиск мест для работы с вафлей!"
            },
            sidebar: "Looking for wifi and a seat? Loc8r helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let Loc8r help you find the place you're looking for.",
            locations: [{
                name: 'Чайная ложка',
                address: '125 High Street, Reading, RG6 1PS',
                rating: 3,
                facilities: ['Hot drinks', 'Food', 'Premium wifi'],
                distance: '100m'
            }, {
                name: 'Кофе хауз',
                address: '125 High Street, Reading, RG6 1PS',
                rating: 4,
                facilities: ['Hot drinks', 'Food', 'Premium wifi'],
                distance: '200m'
            }, {
                name: 'Бургер кинг',
                address: '125 High Street, Reading, RG6 1PS',
                rating: 2,
                facilities: ['Food', 'Premium wifi'],
                distance: '250m'
            }]
        });

};

module.exports.homelist = function (req,res) {
    res.render('locations-list', {
        title: 'find a place to work with wifi',
        pageHeader: {
            title: "mySite",
            strapline: "Поиск мест для работы с вафлей!"
        },
        sidebar: "Looking for wifi and a seat? Loc8r helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let Loc8r help you find the place you're looking for.",
        locations: [{
            name: 'Чайная ложка',
            address: '125 High Street, Reading, RG6 1PS',
            rating: 3,
            facilities: ['Hot drinks', 'Food', 'Premium wifi'],
            distance: '100m'
        }, {
            name: 'Кофе хауз',
            address: '125 High Street, Reading, RG6 1PS',
            rating: 4,
            facilities: ['Hot drinks', 'Food', 'Premium wifi'],
            distance: '200m'
        }, {
            name: 'Бургер кинг',
            address: '125 High Street, Reading, RG6 1PS',
            rating: 2,
            facilities: ['Food', 'Premium wifi'],
            distance: '250m'
        }]
    });
}
/* Получить (GET) страницу с информацией о местоположениях */
module.exports.locationInfo = function(req, res){
    res.render('location-info',
        {
            title: "Оценка",
            pageHeader:{
                title:"Оценка"
            },
            sidebar:{
                context:"Используйте мой сайт потому что это вам предоставит вайфай и место для вашей работой за ноутбуков и получите рабочее место",
                callToAction: 'If you\'ve been and you like it - or if you don\'t - please leave a review to help other people just like you.'
            },
            location:{
                name:'Кофе хауз',
                address: 'Континент, Комендантский пр., 13, корп. 1, Санкт-Петербург, 197371',
                rating: 3,
                facilities: ['Hot drinks', 'Food', 'Premium wifi'],
                coords: {
                    lat: 60.0058226,
                    lng: 30.2736626
                },
                openingTimes: [{
                    days: 'Monday - Friday',
                    opening: '7:00am',
                    closing: '7:00pm',
                    closed: false
                }, {
                    days: 'Saturday',
                    opening: '8:00am',
                    closing: '5:00pm',
                    closed: false
                }, {
                    days: 'Sunday',
                    closed: true
                }],
                reviews: [{
                    author: 'Simon Holmes',
                    rating: 5,
                    timestamp: '16 July 2013',
                    reviewText: 'What a great place. I can\'t say enough good things about it.'
                }, {
                    author: 'Charlie Chaplin',
                    rating: 3,
                    timestamp: '16 June 2013',
                    reviewText: 'It was okay. Coffee wasn\'t great, but the wifi was fast.'
                }]
            }
        });
};

/* Получить (GET) страницу добавления отзыва */
module.exports.addReview = function(req, res){
    res.render('location-review-form', {
        title: 'Обзор рейтинга на MySite',
        pageHeader: {
            title: 'Обзор рейтинга'
        }
    })
};
