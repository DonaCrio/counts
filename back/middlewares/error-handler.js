'use strict';
const errorHandler = require('errorhandler');

exports.errorHandler = (app, isProduction) => {
    if (!isProduction) {
        app.use(errorHandler());
        app.use((err, req, res, next) => {
            res.status(err.status || 500);
            res.json({
                errors: {
                    message: err.message,
                    error: err,
                },
            });
        });
    } else {
        app.use((err, req, res, next) => {
            res.status(err.status || 500);
            res.json({
                errors: {
                    message: err.message,
                    error: {},
                },
            });
        });
    }
}