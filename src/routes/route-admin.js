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
// Users View
router.get('/admin/users', async (req, res) => {
    const users = await userModel.find({});
    res.render('admin/users', {
        title: 'Usuarios Registrados | TempusXXI',
        users
    });
});
// CRUD View
router.get('/admin/crud', async (req, res) => {
    const comun = await commonModel.findOne({ name: 'main' });
    let questions;
    if (comun) {
        questions = {
            one: comun.one,
            two: comun.two,
            three: comun.three,
            four: comun.four,
            five: comun.five,
            six: comun.six,
            seven: comun.seven,
            eight: comun.eight,
            nine: comun.nine,
            ten: comun.ten
        };
    }
    res.render('admin/crud', {
        title: 'CRUD | TempusXXI',
        colors: comun.colors,
        questions
    });
});
// CRUD Save Colors
router.post('/admin/crud/colors', async (req, res) => {
    const {
        monday,
        tuesday,
        wednesday,
        thursday,
        friday,
        saturday,
        sunday
    } = req.body;
    const commonBefore = await commonModel.findOne({ name: 'main' });
    if (commonBefore) {
        commonModel.findById(commonBefore._id, (err, color) => {
            if (err) throw err;
            color.colors.monday = monday;
            color.colors.tuesday = tuesday;
            color.colors.wednesday = wednesday;
            color.colors.thursday = thursday;
            color.colors.friday = friday;
            color.colors.saturday = saturday;
            color.colors.sunday = sunday;
            color.save().then(() => {
                req.flash('success', '¡Colores Guardados!');
                res.redirect('/admin/crud');
            });
        });
    } else {
        const newColors = new commonModel();
        newColors.colors.monday = monday;
        newColors.colors.tuesday = tuesday;
        newColors.colors.wednesday = wednesday;
        newColors.colors.thursday = thursday;
        newColors.colors.friday = friday;
        newColors.colors.saturday = saturday;
        newColors.colors.sunday = sunday;
        newColors.save();
        req.flash('success', '¡Colores Guardados!');
        res.redirect('/admin/crud');
    }
});
// CRUD Save Questions
router.post('/admin/crud/questions', async (req, res) => {
    const {
        one,
        two,
        three,
        four,
        five,
        six,
        seven,
        eight,
        nine,
        ten
    } = req.body;
    const commonBefore = await commonModel.findOne({ name: 'main' });
    if (commonBefore) {
        commonModel.findById(commonBefore._id, (err, question) => {
            if (err) throw err;
            question.one = one;
            question.two = two;
            question.three = three;
            question.four = four;
            question.five = five;
            question.six = six;
            question.seven = seven;
            question.eight = eight;
            question.nine = nine;
            question.ten = ten;
            question.save().then(() => {
                req.flash('success', '¡Preguntas Guardadas!');
                res.redirect('/admin/crud');
            });
        });
    } else {
        const newQuestions = new commonModel();
        newQuestions.one = one;
        newQuestions.two = two;
        newQuestions.three = three;
        newQuestions.four = four;
        newQuestions.five = five;
        newQuestions.six = six;
        newQuestions.seven = seven;
        newQuestions.eight = eight;
        newQuestions.nine = nine;
        newQuestions.ten = ten;
        newQuestions.save();
        req.flash('success', '¡Preguntas Guardadas!');
        res.redirect('/admin/crud');
    }
});

module.exports = router;
