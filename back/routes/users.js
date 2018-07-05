'use strict';
const router = require('express').Router();
const auth = require('./auth').auth;
const Users = require('../controllers/users');

router.get('/', auth.required, Users.listUsers);
router.post('/', Users.createUser);

router.get('/:id', auth.required, Users.readUser);
router.put('/:id', auth.required, Users.updateUser);
router.delete('/:id', auth.required, Users.updateUser);


module.exports = router;