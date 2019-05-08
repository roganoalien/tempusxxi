const bodyParser = require('body-parser'),
    express = require('express'),
    favicon = require('serve-favicon'),
    flash = require('connect-flash'),
    logger = require('morgan'),
    mongoose = require('mongoose'),
    path = require('path'),
    passport = require('passport'),
    session = require('express-session');

const { config } = require('./src/config/config-app'),
    adminRoutes = require('./src/routes/route-admin'),
    mainRoutes = require('./src/routes/route-main');

// Init Express
const app = express();
// DB Connection
require('./src/config/database');
// Passport Configuration
// require('./src/config/passport');
// Port Set
app.set('port', process.env.PORT || config.localport);
// Set Views
app.set('views', path.join(__dirname, './src/views'));
// View Engine
app.set('view engine', 'pug');
////////////////
// Middlewares//
////////////////
// Logs every URL requested on DEV
app.use(logger('dev'));
// Saves user session with secret word
app.use(
    session({
        resave: true,
        saveUninitialized: true,
        secret: config.secret
    })
);
// Init Passport
app.use(passport.initialize());
// Saves passport session to avoid DB consultation
app.use(passport.session());
// Sets FLASH to send messages through pages
app.use(flash());
//////////////////////
// Global Variables //
//////////////////////
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});
////////////////////////////
// SETS PUBLIC AND VENDOR //
////////////////////////////
// Public
app.use('/public', express.static(path.join(__dirname, 'public')));
// Vendors
app.use('/vendors', express.static(path.join(__dirname, 'node_modules')));
// Allows NODE to understand post requests
app.use(bodyParser.urlencoded({ extended: true }));
////////////
// ROUTES //
////////////
// Admin Routes
app.use(adminRoutes);
// Main Routes
app.use(mainRoutes);
//////////////////
// STARTS SERVER//
//////////////////
const server = app.listen(app.get('port'), function() {
    console.log(`Escuchando http://localhost:${server.address().port}`);
});
