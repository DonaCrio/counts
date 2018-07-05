'use strict';

// MODULE IMPORTS
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const passport =require('passport');
const cors = require('cors');
const mongoose = require('mongoose');

// CONFIG IMPORTS
const _app = require('./config/app');
const _database = require('./config/database');

// EXPRESS SERVER
const app = express();
const port = process.env.port || _app.port;

// DATABASE
mongoose.promise = global.Promise;
mongoose.connect(_database.protocol +
    _database.host +
    _database.port +
    _database.db, {
        useNewUrlParser: true
    }).then(
    () => {
        console.log("Connected to database.")
    },
    (err) => {
        console.log(err);
    }
);
mongoose.set('debug', true);

// MIDDLEWARES
app.use(cors());
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// MODELS
require('./models/User');
require('./models/Note');

// ROUTES
require('./config/passport');
app.use(require('./routes'));

// ERROR HANDLERS
const isProduction = process.env.NODE_ENV === 'production';
require('./middlewares/error-handler').errorHandler(app, isProduction);

// RUN APP
app.listen(port);
console.log('Api running on port ' + port);