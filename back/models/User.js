'use strict';
const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const _auth = require('../config/auth');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    pseudo: {
        type: String,
        required: true,
        unique: true
    },
    avatar: String,
    counts: [{
        _id: String
    }],
    email: {
        type: String,
        required: true,
        unique: true
    },
    hash: {
        type: String,
        required: true,
        unique: true
    },
    salt: {
        type: String,
        required: true,
        unique: true
    }
});

UserSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 256, 'sha512').toString('hex');
};

UserSchema.methods.validatePassword = function (password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 256, 'sha512').toString('hex');
    return this.hash === hash;
};

UserSchema.methods.generateJWT = function(req, res, next) {
    const today = new Date();
    const expirationDate = new Date(today);

    return jwt.sign(this.toJSON(), _auth.jwt.secret, { expiresIn: 3600 });
};

UserSchema.methods.toJSON = function() {
    return {
        _id: this._id,
        firstName: this.firstName,
        lastName: this.lastName,
        pseudo: this.pseudo,
        avatar: this.avatar,
        counts: this.counts,
        email: this.email
    };
};

UserSchema.statics.update = (id, update, callback) => {
    if(update.password) {
        update.salt = crypto.randomBytes(16).toString('hex');
        update.hash = crypto.pbkdf2Sync(update.password, update.salt, 1000, 256, 'sha512').toString('hex');
    }
    User.findByIdAndUpdate(id, update, {new:true}, (err,user) => {
        if(err) {
            return callback(err);
        } else {
            return callback(null,user);
        }
    });
};

let User = mongoose.model('User', UserSchema);
module.exports = User;