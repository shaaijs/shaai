const mediumJSONFeed = require('medium-json-feed');
const environment = require('./../config').env

const sanitizedUsername = username => {
    if (username) {
        return username.startsWith('@') ? username : `@${username}`
    }
}

module.exports = {
    get: async (from, size) => {
        return await mediumJSONFeed(sanitizedUsername(environment().medium.username))
            .then(data => {
                return data
            })
            .catch(error => {
                return error
            })
    }
}