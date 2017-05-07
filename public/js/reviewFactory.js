/**
 * Created by karina on 02/05/17.
 */
"use strict";
app.factory('reviewFactory', function ($http) {

    const reviewFactory = {};

    reviewFactory.addReview = function (review, userId) {
        return $http.post('/account/addReview', review)
            .then(function (response) {
                console.log("from the factory");
                console.log(response);
                return response.data
            }, function (err) {
                console.error(err)
            })
    };

    // reviewFactory.upvote = function (reviewToUpvote) {
    //     return $http.put('/review/' + reviewToUpvote + '/upvote', null)
    //         .then(function (response) {
    //             return response.data;
    //
    //         }, function (err) {
    //             console.error(err.data.message)
    //         });
    // };
    //
    // reviewFactory.downvote = function (reviewToDownvote) {
    //     return $http.put('/review/' + reviewToDownvote + '/downvote', null)
    //         .then(function (response) {
    //             return response.data;
    //
    //         }, function (err) {
    //             console.error(err.data.message)
    //         });
    // };

    reviewFactory.deleteReview = function (id) {
        return $http.delete('/review/' + id)
            .then(function(response) {
                return response.data
            })
    }

    return reviewFactory;

})
;
