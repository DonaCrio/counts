'use strict';
const passport = require('passport');
const _auth = require('../config/auth');

exports.auth = {
    required: passport.authenticate('jwt', {session: false})
};