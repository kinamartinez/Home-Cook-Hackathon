/**
 * Created by karina on 02/05/17.
 */
"use strict";
app.factory('reviewFactory', function ($http) {

    const reviewFactory = {};

    reviewFactory.addReview = function (newReview) {
        return $http.post('/review', newReview)
            .then(function (response) {
                return response.data
            }, function (err) {
                console.error(err)
            })
    };

    reviewFactory.getReview = function () {
        return $http.get('/review')
            .then(function (response) {
                return response.data
            }, function (err) {
                console.error(err)
            });
    };

    reviewFactory.upvote = function (reviewToUpvote) {
        return $http.put('/review/' + reviewToUpvote + '/upvote', null)
            .then(function (response) {
                return response.data;

            }, function (err) {
                console.error(err.data.message)
            });
    };

    reviewFactory.downvote = function (reviewToDownvote) {
        return $http.put('/review/' + reviewToDownvote + '/downvote', null)
            .then(function (response) {
                return response.data;

            }, function (err) {
                console.error(err.data.message)
            });
    };
    return reviewFactory;

})
;
