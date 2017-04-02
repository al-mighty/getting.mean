// var playlist = require('../models/playlist');
var request = require('request');
var apiOptions = {
    server : "http://localhost:3000"
};
var _showError = function (req, res, status) {
    var title, content;
    if (status === 404) {
        title = "404, page not found";
        content = "Oh dear. Looks like we can't find this page. Sorry.";
    } else if (status === 500) {
        title = "500, internal server error";
        content = "How embarrassing. There's a problem with our server.";
    } else {
        title = status + ", something's gone wrong";
        content = "Something, somewhere, has gone just a little bit wrong.";
    }
    res.status(status);
    res.render('generic-text', {
        title : title,
        content : content
    });
};

// var renderDetailPage = function (req, res, locDetail) {
//     res.render('playlist-info', {
//         title: locDetail.name,
//         pageHeader: {title: locDetail.name},
//         sidebar: {
//             context: 'is on Loc8r because it has accessible wifi and space to sit down with your laptop and get some work done.',
//             callToAction: 'If you\'ve been and you like it - or if you don\'t - please leave a review to help other people just like you.'
//         }
//         // location: locDetail
//     });
// };


var sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

exports.all = function (req, res) {
    playlist.all(function (err, docs) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs)
    })
};

module.exports.playlistInfo = function(req, res){
    getPlaylistInfo(req, res, function(req, res, responseData) {
        renderDetailPage(req, res, responseData);
    });
};

var getPlaylistInfo = function (req, res, callback) {
    var requestOptions, path;
    path = "/api/playlist/" + req.params.playlistid;
    requestOptions = {
        url : apiOptions.server + path,
        method : "GET",
        json : {}
    };
    request(
        requestOptions,
        function(err, response, body) {
            var data = body;
            if (response.statusCode === 200) {
                // data.coords = {
                //     lng : body.coords[0],
                //     lat : body.coords[1]
                // };
                data.playlist = {
                    src: body
                };
                callback(req, res, data);
            } else {
                console.log(response.statusCode)
                _showError(req, res, response.statusCode);
            }
        }
    );
};

/* POST 'Add review' page */
module.exports.doAddReview = function(req, res){
    var requestOptions, path, playlistid, postdata;
    playlistid = req.params.playlistid;
    path = "/api/playlist/" + playlistid + '/reviews';
    postdata = {
        author: req.body.name,
        rating: parseInt(req.body.rating, 10),
        reviewText: req.body.review
    };
    requestOptions = {
        url : apiOptions.server + path,
        method : "POST",
        json : postdata
    };
    if (!postdata.author || !postdata.rating || !postdata.reviewText) {
        res.redirect('/playlist/' + playlistid + '/reviews/new?err=val');
    } else {
        request(
            requestOptions,
            function(err, response, body) {
                if (response.statusCode === 201) {
                    res.redirect('/playlist/' + playlistid);
                } else if (response.statusCode === 400 && body.name && body.name === "ValidationError" ) {
                    res.redirect('/playlist/' + playlistid + '/reviews/new?err=val');
                } else {
                    console.log(body);
                    _showError(req, res, response.statusCode);
                }
            }
        );
    }
};
