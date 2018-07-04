'use strict';
const router = require('express').Router();
const auth = require('./auth').auth;
const Index = require('../controllers/index');

router.use('/users', require('./users'));
router.post('/login', auth.optional, Index.login);

module.exports = router;