/**
 * Created by karina on 02/05/17.
 */
"use strict";
const express = require('express');
const router = express.Router();
const Review = require('../app/reviewModel'); // Esto es para acceder al schema que estamos exportando como un objeto



const ensureAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
    }
};

//as we are using modular route handlers we use router.param an not app.param
router.param('reviewid', function (req, res, next, id) {
    Review.findById(id, function (err, review) {
        if (err) {
            return next(err);
        } else if (!review) {
            return next(new Error('Post does not exist'));
        } else {
            req.review = review;  //put the review on the request object for the next function in line to use
            return next();
        }
    });
});

router.get('/', function (req, res, next) {
    Review.find(function (error, review) {
        if (error) {
            console.error(error);
            return next(error);
        }
        else {
            console.log(res);
            res.send(review);
        }

    });

});


router.post('/', function (req, res, next) {
    Review.create(Object.assign({author: req.User.username}, req.body), function (err, review) {
        if (err) {
            console.error(err);
            return next(err);
        } else {
            console.log(review);
            res.send(review);
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


router.delete('/:reviewid', function (req, res, next) {

    req.review.remove(function (err, result) {
        if (err) {
            return next(err);
        } else {
            return res.send(result);
        }
    });
});


module.exports = router;