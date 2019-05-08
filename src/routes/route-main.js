const express = require('express'),
    async = require('async'),
    request = require('request'),
    router = express.Router();

const { config } = require('../config/config-app'),
    userModel = require('../models/model-user'),
    questionModel = require('../models/model-questions');

router.get('/', (req, res) => {
    res.send('Hola');
});

module.exports = router;
