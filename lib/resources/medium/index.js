const mediumParser = require('./parser');
const environment = require('./../../config').env
const axios = require('axios')

const sanitizedUsername = username => {
    if (username) {
        return username.startsWith('@') ? username : `@${username}`
    }
}

module.exports = {
    get: async (from, size) => {
        const mediumURL = `https://medium.com/feed/${sanitizedUsername(environment().medium.username)}`
        return axios.get(mediumURL)
            .then(response => mediumParser(response.data))
            .catch(error => {
                console.log("TCL: error", error)
                return error
            })
    }
}

