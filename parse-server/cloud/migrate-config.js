'use strict';

const DATABASE_URL = (process.env.DATABASE_URL || 'mongodb://mongo');

module.exports = {
    "mongoAppDb": {
        "connectionString": DATABASE_URL,
    }
};