/*
 Note: commands don't work properly due to Parse undefined. use invocation in main.js instead
 node ./node_modules/mongodb-migrate -runmm -c ./cloud -cfg migrate-config.js  up
 node ./node_modules/mongodb-migrate -runmm -c ./cloud -cfg migrate-config.js  down
 */

'use strict';
exports.up = function (db, next) {
    return Promise.all([])
        .then(reply=>{
            return next();
        })
        .catch(function (err) {
            return next(err);
        });
};

exports.down = function (db, next) {
    return Promise.all([])
        .then(reply=>{
            return next();
        })
        .catch(function (err) {
            return next(err);
        });
};
