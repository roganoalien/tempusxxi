const express = require('express'),
    router = express.Router();

const { config } = require('../config/config-app'),
    userModel = require('../models/model-user'),
    commonModel = require('../models/model-common');
// Login View
router.get('/login', (req, res) => {
    res.render('admin/login');
});
// Register View
router.get('/register', (req, res) => {
    res.render('admin/register');
});
// Dashboard View
router.get('/admin', (req, res) => {
    res.render('admin/dashboard');
});

module.exports = router;
