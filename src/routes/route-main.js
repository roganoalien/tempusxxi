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
// Save facebook user
router.post('/users/facebook/save', (req, res) => {
    const {
        avatar,
        birthday,
        email,
        gender,
        id,
        location,
        name,
        token
    } = req.body;
    request(
        `https://graph.facebook.com/me?access_token=${token}`,
        async (error, response) => {
            if (error) throw error;
            console.log(req.body);
            const respuesta = JSON.parse(response.body);
            console.log(respuesta);
            if (respuesta.name === name && respuesta.id === id) {
                console.log('ENTRA AQUI');
                const repeatedUser = await userModel.findOne({
                    facebookId: id
                });
                if (!repeatedUser) {
                    const newUser = new userModel({
                        avatar,
                        birthday,
                        email,
                        facebookId: id,
                        gender,
                        location,
                        name
                    });
                    newUser.save(function(err, user) {
                        if (err) throw err;
                        // res.redirect(`/preguntas/${user._id}`);
                        res.status(200).json({
                            texto: 'Todo OK',
                            url: `/preguntas/${user._id}`
                        });
                    });
                } else {
                    res.status(200).json({
                        text: 'Usuario Repetido',
                        url: `/preguntas/${repeatedUser._id}`
                    });
                }
            } else {
                res.status(500).json({
                    texto: 'Los datos no coinciden'
                });
            }
        }
    );
});

router.get('/preguntas/:id', (req, res) => {
    const id = req.params.id;
    userModel.findById(id, (err, User) => {
        // res.send(User);
        res.render('sections/questions', {
            title: 'Preguntas | TempusXXI',
            user: User
        });
    });
});

router.post('/login', passport.authenticate('facebook'));

module.exports = router;
