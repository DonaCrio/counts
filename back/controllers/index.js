'use strict';
const passport = require('passport');

exports.login = (req, res, next) => {
    const { body: { user } } = req;
    
    if(!user.email) {
      return res.status(422).json({ errors: { email: 'is required' } });
    }
    if(!user.password) {
      return res.status(422).json({ errors: { password: 'is required' }});
    }
  
    return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
      if(err) {
        return next(err);
      }
      if(passportUser) {
        return res.json({ jwt: passportUser.generateJWT() });
      }
      return res.status(400).json( {info : info});
    })(req, res, next);
};