const express = require('express'),
    router = express.Router();

const { config } = require('../config/config-app'),
    userModel = require('../models/model-user'),
    questionModel = require('../models/model-questions');

router.get('/admin', (req, res) => {
    res.send('Admin');
});

module.exports = router;
