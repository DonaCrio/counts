'use strict';
const jwt = require('express-jwt');

const _auth = require('../config/auth');

const getTokenFromHeaders = (req) => {
    const { headers: { authorization } } = req;

    if (authorization && authorization.split(' ')[0] === 'JWT') {
        return authorization.split(' ')[1];
    }
    return null;
};

exports.auth = {
    required: jwt({
        secret: _auth.jwt.secret,
        userProperty: 'payload',
        getToken: getTokenFromHeaders,
    }),
    optional: jwt({
        secret: _auth.jwt.secret,
        userProperty: 'payload',
        getToken: getTokenFromHeaders,
        credentialsRequired: false,
    }),
};