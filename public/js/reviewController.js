/**
 * Created by karina on 02/05/17.
 */
"use strict";
app.controller('reviewController', ["$scope", "reviewFactory", "relevantCook", "$http", 'authFactory', function ($scope, reviewFactory, relevantCook, $http, authFactory) {

    // $scope.reviews = [];
    // $scope.reviews.push(reviews.data);
    $scope.cooks = relevantCook;

    $scope.addReview = function (review) {
        let newReview = {
            text: review.text,
            //author: $scope.author,
            cooksid: $scope.cooks._id,
        };

        reviewFactory.addReview(review)
            .then(function (review) {
                $scope.cooks.reviews.push(review);
        }, function (err) {
            console.error(err);
        });

    };


    // $scope.upvote = function (review) {
    //     reviewFactory.upvote(review).then(function () {
    //         reviewFactory.getReview().then(function (reviews) {
    //             $scope.reviews = reviews;
    //             console.log("i like it")
    //         });
    //     });
    // };
    //
    // $scope.downvote = function (review) {
    //     reviewFactory.downvote(review).then(function () {
    //         reviewFactory.getReview().then(function (review) {
    //             $scope.reviews = review;
    //             console.log("i dislike it")
    //         });
    //     });
    // };

    $scope.deleteReview = function (reviewToRemove) {
        return $http.delete('/review/' + reviewToRemove._id)
            .then(function (response) {
                $http.get('/review').then(function (reviews) {
                    $scope.reviews = reviews.data;///now we are reshowing the data after the db removed it
                });
            })

    }
}]);
