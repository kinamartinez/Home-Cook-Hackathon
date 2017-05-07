/**
 * Created by karina on 02/05/17.
 */
"use strict";
const express = require('express');
const router  = express.Router();
const Review  = require('../app/reviewModel'); // Esto es para acceder al schema que estamos exportando como un objeto
const User    = require('../app/model');

const ensureAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
    }
};


router.get('/:userid', function (req, res, next) {
    console.log("********************* userId*********************");

    const userId = req.params.userid;

    console.log("Looking for user with id ", userId);
    User.findOne({ _id: userId }).populate("reviews")
        .exec(function (error, user) {
            console.log(user);
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


router.post('/:userid/upvote', function (req, res) {

    const userId = req.params.userid;

    console.log("Looking for user with id ", userId);
    User.findOne({ _id: userId })
        .exec(function (error, user) {

            if (error) {
                console.error("Error finding user with id ", userId, ":", error);
                return next(error);
            }
            else if (!user) {
                return next(new Error('Used with id ' + userId + ' does not exist.'));
            } else {

                console.log("Upvote for user with id ", userId);

                if (!user.upvotes) {
                    user.upvotes = 0;
                }
                user.upvotes += 1;

                user.save((err) => {
                    if (err) {
                        return next(err);
                    } else {
                        console.log('Success in upvote!');
                        res.send(user);
                    }
                });
            }

        });
});


router.post('/:userid/downvote', function (req, res) {

    const userId = req.params.userid;

    console.log("Looking for user with id ", userId);
    User.findOne({ _id: userId }).exec(function (error, user) {

        if (error) {
            console.error("Error finding user with id ", userId, ":", error);
            return next(error);
        }
        else if (!user) {
            return next(new Error('Used with id ' + userId + ' does not exist.'));
        } else {

            console.log("Downvote for user with id ", userId);
            if (!user.downvotes) {
                user.downvotes = 0;
            }
            user.downvotes += 1;

            user.save((err) => {
                if (err) {
                    return next(err);
                } else {
                    console.log('Success in downvote!');
                    res.send(user);
                }
            });
        }

    });
});




module.exports = router;