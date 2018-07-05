'use strict';
const router = require('express').Router();
const Index = require('../controllers/index');

router.use('/users', require('./users'));
router.use('/notes', require('./notes'));
router.post('/login', Index.login);

module.exports = router;