'use strict';
const passport = require('passport');
const LocalStrategy = require('passport-local');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const _auth = require('../config/auth');
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

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: _auth.jwt.secret
};
passport.use('jwt', new JwtStrategy(opts, function(jwt_payload, done) {
    User.findById(jwt_payload._id, function(err, user) {
        if (err) {
            return done(err, undefined);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, undefined);
        }
    });
}));