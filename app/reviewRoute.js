/**
 * Created by karina on 02/05/17.
 */
"use strict";
const express = require('express');
const router = express.Router();
const Review = require('../app/reviewModel'); // Esto es para acceder al schema que estamos exportando como un objeto
const User = require('../app/model');

const ensureAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
    }
};


router.param('userid', function (req, res, next, id) {
    User.findById(id, function (err, user) {
        if (err) {
            return next(err);
        } else if (!user) {
            return next(new Error('Review does not exist'));
        } else {
            req.user = user;  //put the review on the request object for the next function in line to use
            return next();
        }
    });
});

router.get('/:userid2', function (req, res, next) {
    console.log("********************* userId*********************");

    const userId = req.params.userid2;

    console.log("Looking for user with id ", userId);
    User.findOne ({_id: userId}).populate('review')
        .exec(function (error, user) {
        if (error) {
            console.error("Error finding user with id ", userId, ":", error);
            return next(error);
        }
        else if (!user) {
            console.log("No  exists user with id ", userId);
            res.send({});
        } else {
            console.log("********************* review*********************");
            console.log("Found user with id ", userId, ":", user);
            res.send(user);
        }

    });

});

router.post('/:userid/review', function (req, res, next) {
    let newReview = new Review(Object.assign({author: req.user.username}, req.body));
    console.log("********************* new review*********************");
    console.log(newReview);
    newReview.save(function (err,reviewWithId) {
        if (err) {
            return next(err);
        }
        else {
            req.user.reviews.push(reviewWithId);
            req.user.save(function (err) {
                if (err) {
                    return next(err);
                }
                res.send(reviewWithId)
            })
        }
    });
});


// router.put('/:revieswid/upvote', function (req, res) {
//     req.review.upvote();
//     req.review.save(function (err, review) {
//         res.send(review);
//     });
// });
//
// router.put('/:reviewsid/downvote',  function (req, res) {
//     req.review.downvote();
//     req.review.save(function (err, review) {
//         res.send(review);
//     });
// });


router.delete('/:usersid/review', function (req, res, next) {

    req.review.remove(function (err, result) {
        if (err) {
            return next(err);
        } else {
            return res.send(result);
        }
    });
});


module.exports = router;