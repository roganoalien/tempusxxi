const express = require('express'),
    async = require('async'),
    passport = require('passport'),
    request = require('request'),
    router = express.Router();

const { config } = require('../config/config-app'),
    userModel = require('../models/model-user'),
    commonModel = require('../models/model-common');

router.get('/', (req, res) => {
    res.render('sections/index');
});

router.post('/login', passport.authenticate('facebook'));

module.exports = router;
