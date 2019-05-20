const passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy;

const User = require('../models/model-user');

passport.use(
    new FacebookStrategy(
        {
            clientID: '241030339991999',
            clientSecret: 'e63cf16823d753b00d86d53046302846',
            callbackURL: '/second'
        },
        async function(accessToken, refreshToken, profile, cb) {
            // User.findOrCreate({ facebookId: profile.id }, function(err, user) {
            //     return cb(err, user);
            // });
            const user = await User.findOne({ facebookId: profile.id });
            if (!user) {
                return cb(err, user);
            } else {
                const newUser = new User({
                    avatar: profile.photos,
                    email: profile.emails,
                    name: profile.displayName
                });
                await newUser.save();
                req.flash('success', '¡Continuar!');
                res.redirect('/continuar');
            }
        }
    )
);
