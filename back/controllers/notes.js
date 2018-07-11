'use strict'
const Note = require('mongoose').model('Note');

exports.listNotes = (req, res, next) => {
  Note.find({}, (err, notes) => {
    if(err) {
      return next(err);
    } else {
      res.status(200).json({ notes: notes })
    }
  })
};

exports.createNote = (req, res, next) => {
  const { body: { note } } = req;
  let newNote = new Note(note);
  newNote.creationDate = Date.now();
  newNote.updateDate = newNote.creationDate;
  if(newNote.isValid()) {
    newNote.save((err, note) => {
        if (err) {
          return next(err);
        } else {
          res.status(200).json({ note: note });
        }
      });
  } else {
      res.status(403).json({ errors: { amount: "amount does not match contributions and debts" } });
  }
};

exports.readNote = (req, res, next) => {
  const { params: { id } } = req;
  Note.findById(id, (err, note) => {
      if (err) {
          return next(err);
      } else {
          res.status(200).json({ note: note });
      }
  });
};

exports.updateNote = (req, res, next) => {
  const { params: { id } } = req;
  const { body : { note } } = req;
  note.updateDate = Date.now();
  Note.update(id, note, (err, newNote) => {
    if (err) {
        return next(err);
    } else {
        res.status(200).json({ note: newNote });
    }
  })
};

exports.deleteNote = (req, res, next) => {
  const { params: { id } } = req;
    User.findByIdAndRemove(id, (err, user) => {
        if(err) {
            return next(err);
        } else {
            res.status(200).json({ user: user });
        }
    });
};