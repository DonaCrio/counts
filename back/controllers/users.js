'use strict'
const User = require('mongoose').model('User');

exports.listUsers = (req, res, next) => {
  User.find({}, (err, users) => {
    if(err) {
      return next(err);
    } else {
      res.status(200).json({ users: users })
    }
  })
};

exports.createUser = (req, res, next) => {
  const { body: { user } } = req;
  let newUser = new User(user);
  newUser.setPassword(user.password);
  newUser.save((err, user) => {
    if (err) {
      return next(err);
    } else {
      res.status(200).json({ user: user.toAuthJSON() });
    }
  });
};

exports.readUser = (req, res, next) => {
  const { params: { id } } = req;
  User.findById(id, (err, user) => {
      if (err) {
          return next(err);
      } else {
          res.status(200).json({ user: user });
      }
  });
};