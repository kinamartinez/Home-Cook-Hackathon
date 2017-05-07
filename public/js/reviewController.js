/**
 * Created by karina on 02/05/17.
 */
"use strict";
app.controller('reviewController', ["$scope", "reviewFactory", "relevantCook", "$http", 'authFactory', function ($scope, reviewFactory, relevantCook, $http, authFactory) {


    $scope.cook = relevantCook;
    console.log(relevantCook);

    $scope.addReview = function (review) {
        let newReview = {
            text: review.text,
            author: $scope.currentUser,
            cooksid: $scope.cook._id,
        };

        reviewFactory.addReview(newReview)
            .then(function (review) {
                $scope.cook.reviews.push(review);
            }, function (err) {
                console.error(err);
            });

    };


    $scope.upvote = function (user) {
        reviewFactory.upvote(user).then(function () {
            $scope.cook.upvotes++;
            console.log("i like it")
        });

    };

    $scope.downvote = function (user) {
        reviewFactory.downvote(user).then(function () {
            $scope.cook.downvotes++;
            console.log("i like it")
        });

    };

    $scope.deleteReview = function (id) {
        var self = this;//this is the scope of a single review as defined by ng-repeat
        reviewFactory.deleteReview(id)
            .then(function (review) {
                $scope.cook.reviews.splice(self.$index, 1)
            }, function (err) {
                console.error(err);
            });
    }


}]);
