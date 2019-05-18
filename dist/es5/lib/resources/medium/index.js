'use strict';

var mediumParser = require('./parser');
var environment = require('./../../config').env;
var axios = require('axios');

var sanitizedUsername = function sanitizedUsername(username) {
    if (username) {
        return username.startsWith('@') ? username : '@' + username;
    }
};

module.exports = {
    get: async function get(from, size) {
        var mediumURL = 'https://medium.com/feed/' + sanitizedUsername(environment().medium.username);
        return axios.get(mediumURL).then(function (response) {
            return mediumParser(response.data);
        }).catch(function (error) {
            console.log("TCL: error", error);
            return error;
        });
    }
};