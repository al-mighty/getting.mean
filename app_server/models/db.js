var mongoose = require('mongoose');
var gracefulShutdown;

var dbURI = 'mongodb://localhost/testmean';
mongoose.connect(dbURI);
var logDB = mongoose.createConnection(dbURI);



var readLine = require ("readline");
if (process.platform === "win32"){
    var rl = readLine.createInterface ({
        input: process.stdin,
        output: process.stdout
    });
    rl.on ("SIGINT", function (){
        process.emit ("SIGINT");
    });
}

logDB.on('connected', function () {
    console.log('mongoose connected to '+ dbURI);
});

logDB.on('error', function (err) {
    console.log('mongoose connection error to '+ err);
});

logDB.on('disconnected', function () {
    console.log('mongoose disconnected to '+ dbURI);
});

gracefulShutdown = function(msg, callback) {
    logDB.close(function() {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};
// For nodemon restarts
process.once('SIGUSR2', function() {
    gracefulShutdown('nodemon restart', function() {
        process.kill(process.pid, 'SIGUSR2');
    });
});
// For app termination
process.on('SIGINT', function() {
    gracefulShutdown('app termination', function() {
        process.exit(0);
    });
});
// For Heroku app termination
process.on('SIGTERM', function() {
    gracefulShutdown('Heroku app termination', function() {
        process.exit(0);
    });
});

require('./locations');

// this.locations.save(
//     {
//         name: "Coffe house",
//         address: 'Континент, Комендантский пр., 13, корп. 1, Санкт-Петербург, 197371',
//         rating: 3,
//         facilities: ['Hot drinks', 'Food', 'Premium wifi'],
//         cords: {
//             lat: 60.0058226,
//             lng: 30.2736626
//         },
//         openingTimes: [{
//             days: 'Monday - Friday',
//             opening: '7:00am',
//             closing: '7:00pm',
//             closed: false
//         }, {
//             days: 'Saturday',
//             opening: '8:00am',
//             closing: '5:00pm',
//             closed: false
//         }, {
//             days: 'Sunday',
//             closed: true
//         }],
//         reviews: [{
//             author: 'Simon Holmes',
//             rating: 5,
//             timestamp: '16 July 2013',
//             reviewText: 'What a great place. I can\'t say enough good things about it.'
//         }, {
//             author: 'Charlie Chaplin',
//             rating: 3,
//             timestamp: '16 June 2013',
//             reviewText: 'It was okay. Coffee wasn\'t great, but the wifi was fast.'
//         }]
//     }
// );

