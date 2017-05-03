/**
 * Created by karina on 02/05/17.
 */
"use strict";
app.controller('reviewController', ["$scope", "reviewFactory", "reviews", "$http", function ($scope, reviewFactory, reviews, $http) {


    $scope.reviews = reviews.data;


    $scope.addReview = function () {
        let newReview = {
            text: $scope.text,
            //author: $scope.author,
            upvotes: $scope.upvotes,

        };

        reviewFactory.addReview(newReview).then(function (review) {
            $scope.reviews.push(review);
        });
    };


    $scope.upvote = function (review) {
        reviewFactory.upvote(review).then(function () {
            reviewFactory.getReview().then(function (reviews) {
                $scope.reviews = reviews;
                console.log("i like it")
            });
        });
    };

    $scope.downvote = function (review) {
        reviewFactory.downvote(review).then(function () {
            reviewFactory.getReview().then(function (review) {
                $scope.reviews = review;
                console.log("i dislike it")
            });
        });
    };

    $scope.deleteReview = function (reviewToRemove) {
        return $http.delete('/review/' + reviewToRemove._id)
            .then(function (response) {
                $http.get('/review').then(function (reviews) {
                    $scope.reviews = reviews.data;///now we are reshowing the data after the db removed it
                });
            })

    }
}]);
