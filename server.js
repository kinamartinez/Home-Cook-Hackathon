// Dependencies
// -----------------------------------------------------
const express = require('express');
const expressSession = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const plm = require('passport-local-mongoose')
    //const passport = require('./app/passport');
const port = process.env.PORT || 3000;
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
var userRoutes = require('./app/authRoutes');
var User = require("./app/model");



const app = express();
mongoose.connect("mongodb://localhost/trial3");
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(bodyParser.text()); // allows bodyParser to look at raw text
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

app.use(expressSession({
    secret: 'yourSecretHere',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// Configure passport-local to use user model for authentication
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/users', userRoutes);
// Logging and Parsing
app.use(express.static(__dirname + '/public')); // sets the static files location to public
app.use(express.static(__dirname + '/node_modules'));
app.use('/bower_components', express.static(__dirname + '/bower_components')); // Use BowerComponents
app.use(morgan('dev')); // log with Morgan
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(bodyParser.text()); // allows bodyParser to look at raw text
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

// Routes
// ------------------------------------------------------
require('./app/routes.js')(app);



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