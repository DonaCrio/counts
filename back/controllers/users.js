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
      res.status(200).json({ jwt: user.generateJWT() });
    }
  });
};

exports.readUser = (req, res, next) => {
  const { params: { id } } = req;
  console.log(req.user);
  User.findById(id, (err, user) => {
      if (err) {
          return next(err);
      } else {
          res.status(200).json({ user: user });
      }
  });
};

exports.updateUser = (req, res, next) => {
  const { params: { id } } = req;
  const { body : { user } } = req;
  const { user: { _id } } = req;
  if(id != _id) {
    res.status(403).json({ errors : { message: "Unauthorized" } });
  } else {
    User.update(id, user, (err, newUser) => {
      if(err) {
        return next(err);
      } else {
        res.status(200).json({ user: newUser });
      }
    });
  }
};

exports.deleteUser = (req, res, next) => {
  const { params: { id } } = req;
  const { user: { _id } } = req;
  if(id !== _id) {
    res.status(403).json({ errors : { message: "Unauthorized" } });
  } else {
    User.findByIdAndRemove(id, (err, user) => {
      if(err) {
        return next(err);
      } else {
        res.status(200).json({ user: user });
      }
    });
  }
};