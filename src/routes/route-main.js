const express = require('express'),
    async = require('async'),
    passport = require('passport'),
    request = require('request'),
    router = express.Router();

const { config } = require('../config/config-app'),
    userModel = require('../models/model-user'),
    commonModel = require('../models/model-common');
// Renders index page
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
    // Hace petición para validar el token de acceso
    // Si es correcto validamos que tanto el id y el nombre
    // Sean iguales a los que se están enviando. Para asegurar el registro
    request(
        `https://graph.facebook.com/me?access_token=${token}`,
        async (error, response) => {
            if (error) throw error;
            // console.log(req.body);
            const respuesta = JSON.parse(response.body);
            // console.log(respuesta);
            if (respuesta.name === name && respuesta.id === id) {
                console.log('ENTRA AQUI');
                const repeatedUser = await userModel.findOne({
                    facebookId: id
                });
                console.log(repeatedUser);
                if (!repeatedUser) {
                    // If user does not exists, it saves it
                    const newUser = await new userModel({
                        avatar,
                        birthday,
                        email,
                        facebookId: id,
                        gender,
                        location,
                        name
                    });
                    newUser.save(function(err, user) {
                        // Saves user
                        // In case of error throws error
                        if (err) throw err;
                        // Responds with 200 status and with a json
                        res.status(200).json({
                            texto: 'Todo OK',
                            url: `/preguntas/${user._id}`
                        });
                    });
                } else {
                    // If user exists returns status 200 and with response json
                    res.status(200).json({
                        text: 'Usuario Repetido',
                        url: `/preguntas/${repeatedUser._id}`
                    });
                }
            } else {
                // In case the token does not match with user id and name
                // Returns error and reponse text
                res.status(500).json({
                    texto: 'Los datos no coinciden'
                });
            }
        }
    );
});
// Renders the question part for the user id
router.get('/preguntas/:id', (req, res) => {
    console.log('Preguntas carga');
    // Gets the id parameter from the url
    const id = req.params.id;
    // Finds the user matching with the id
    userModel.findById(id, (err, User) => {
        if (err) {
            // If findbyid does not find a match
            req.flash('error', '¡El usuario no existe!');
            res.redirect('/');
        } else {
            console.log(User);
            // If it finds a match
            // Renders the questions page
            res.render('sections/questions', {
                title: 'Preguntas | TempusXXI',
                user: User
            });
        }
    });
});

router.post('/login', passport.authenticate('facebook'));

module.exports = router;
