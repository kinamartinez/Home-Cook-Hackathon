var express = require('express');
var router = express.Router();
var User = require("../app/model");
var passport = require('passport')

//the '/users' routes will go here

router.post('/register', function(req, res, next) {
    User.register(new User({
        username: req.body.username,
        email: req.body.email,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        cook: false,
        htmlverified: req.body.htmlverified,
        fullname: req.body.fullname
    }), req.body.password, function(err, user) {
        if (err) {
            console.log('Error registering!', err);
            return next(err);
        }
        req.login(user, function(err) {
            if (err) {
                return next(err);
            }
            res.send(req.user);
        });
    });
});

router.post('/registerCook', function(req, res, next) {
    User.register(new User({
        username: req.body.username,
        email: req.body.email,
        cook: true,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        location: [req.body.longitude, req.body.latitude],
        htmlverified: req.body.htmlverified,
        fullname: req.body.fullname
    }), req.body.password, function(err, user) {
        if (err) {
            console.log('Error registering!', err);
            return next(err);
        }
        req.login(user, function(err) {
            if (err) {
                return next(err);
            }
            res.send(req.user);
        });
    });
});
// ******** WORK IN PROGRESS **********//
router.post('/updateProfile', (req, res, next) => {
    req.assert('email', 'Please enter a valid email address.').isEmail();
    req.sanitize('email').normalizeEmail({ remove_dots: false });

    const errors = req.validationErrors();

    if (errors) {
        req.flash('errors', errors);
        //return res.redirect('/account');
    }

    User.findById(req.user.id, (err, user) => {
        if (err) { return next(err); }

        user.email = req.body.email || '';
        user.username = req.body.username || '';
        user.fullname = req.body.fullname || '';
        user.profile.username = req.body.username || '';
        user.profile.location = req.body.location || '';
        user.profile.phoneNumber = req.body.phoneNumber || '';
        user.profile.image = req.body.image || '';
        user.cook = x || '';

        user.save((err) => {
            if (err) {
                if (err.code === 11000) {
                    req.flash('errors', { msg: 'The email address you have entered is already associated with an account.' });
                    return res.redirect('/account');
                }
                return next(err);
            }
            req.flash('success', { msg: 'Profile information has been updated.' });
            res.redirect('/account');
        });
    });
});
// ******** UNTIL HERE WORK IN PROGRESS **********//

router.post('/login', passport.authenticate('local'), function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.send(req.user.username)
});

router.get('/logout', function(req, res) {
    req.logout();
    res.send('Logged Out');
});

router.get('/currentuser', function(req, res) {
    if (req.user) {
        res.send(req.user.username)
    } else {
        res.send(null)
    }
});

router.post('/query/', function(req, res) {

    // Grab all of the query parameters from the body.
    var lat = req.body.latitude;
    var long = req.body.longitude;
    var distance = req.body.distance;
    var favLang = req.body.favlang;


    // Opens a generic Mongoose Query. Depending on the post body we will...
    var query = User.find({});

    // ...include filter by Max Distance (converting Kms to meters)
    if (distance) {

        // Using MongoDB's geospatial querying features. (Note how coordinates are set [long, lat]
        query = query.where('location').near({
            center: { type: 'Point', coordinates: [long, lat] },

            // Converting Kms to meters. Specifying spherical geometry (for globe)
            maxDistance: distance * 1000,
            spherical: true
        });
    }

    // ...include filter by Gender (all options)
    if (male || female || other) {
        query.or([{ 'gender': male }, { 'gender': female }, { 'gender': other }]);
    }

    // ...include filter by Type of Food
    if (favLang) {
        query = query.where('favlang').equals(favLang);
    }

    // ...include filter for Verified Locations
    if (reqVerified) {
        query = query.where('htmlverified').equals("Yep (Thanks for giving us real data!)");
    }

    // Execute Query and Return the Query Results
    query.exec(function(err, users) {
        if (err)
            res.send(err);

        // If no errors, respond with a JSON of all users that meet the criteria
        res.json(users);
    });
});
module.exports = router;