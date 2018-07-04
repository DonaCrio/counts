'use strict';
const router = require('express').Router();
const auth = require('./auth').auth;
const Users = require('../controllers/users');

router.get('/', auth.required, Users.listUsers);
router.post('/', auth.optional, Users.createUser);
router.get('/:id', auth.required, Users.readUser);

module.exports = router;