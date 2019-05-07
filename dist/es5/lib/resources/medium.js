'use strict';

var mediumJSONFeed = require('medium-json-feed');
var environment = require('./../config').env;

var sanitizedUsername = function sanitizedUsername(username) {
    if (username) {
        return username.startsWith('@') ? username : '@' + username;
    }
};

module.exports = {
    get: async function get(from, size) {
        return await mediumJSONFeed(sanitizedUsername(environment().medium.username)).then(function (data) {
            return data;
        }).catch(function (error) {
            return error;
        });
    }
};