'use strict';
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('mongoose').model('User');

passport.use('local', new LocalStrategy({
    usernameField: 'user[email]',
    passwordField: 'user[password]',
}, (email, password, done) => {
    User.findOne({ 'email': email }, (err, user) => {
            if(err) {
                return done(null, false, err);
            }
            if (!user || !user.validatePassword(password)) {
                return done(null, false, { errors: { 'email or password': 'is invalid' } });
            }
            return done(null, user);
        });
}));