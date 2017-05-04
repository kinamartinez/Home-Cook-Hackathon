// Dependencies
// -----------------------------------------------------
const express = require('express');
const expressSession = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const plm = require('passport-local-mongoose');
//const passport = require('./app/passport');
const port = process.env.PORT || 3000;
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');






// Connect to database
mongoose.connect("mongodb://localhost/trial3");






// Main app

const app = express();

app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(bodyParser.text()); // allows bodyParser to look at raw text
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(morgan('dev')); // log with Morgan











// Auth + sessions

app.use(expressSession({
    secret: 'yourSecretHere',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());


var User = require("./app/model");

// Configure passport-local to use user model for authentication
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());











// Backend / API

var userRoutes = require('./app/authRoutes');
var accountRoutes = require('./app/accountRoutes');

var reviewRoute = require('./app/reviewRoute');


var ensureAuthenticated = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        return res.status(401).send({ message: "Unauthorized" });
    }
};

app.use('/users', userRoutes);
app.use('/account', accountRoutes);
app.use('/review', reviewRoute);
app.use('/account', ensureAuthenticated, accountRoutes);
app.use('/review', reviewRoute);


// Logging and Parsing

// Routes
// ------------------------------------------------------
const registerRoutes = require('./app/routes.js');

registerRoutes(app);




// Front end server

app.use(express.static(__dirname + '/public')); // sets the static files location to public
app.use(express.static(__dirname + '/node_modules'));
app.use('/bower_components', express.static(__dirname + '/bower_components')); // Use BowerComponents

app.all('[^.]+', function(req, res) {
    res.sendFile(__dirname + "/public/index.html")
});










// main error handler
// warning - not for use in production code!
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send({
        message: err.message,
        error: err
    });
});










// Listen
// -------------------------------------------------------
app.listen(port);
console.log('App listening on port ' + port);