'use strict';
const router = require('express').Router();
const auth = require('./auth').auth;
const Notes = require('../controllers/notes');

router.get('/', auth.required, Notes.listNotes);
router.post('/', Notes.createNote);

router.get('/:id', auth.required, Notes.readNote);
router.put('/:id', auth.required, Notes.updateNote);
router.delete('/:id', auth.required, Notes.deleteNote);

module.exports = router;