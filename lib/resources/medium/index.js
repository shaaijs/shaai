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
        const proxy = environment().proxy || 'https://cors-anywhere.herokuapp.com/'
        const mediumURL = `https://medium.com/feed/${sanitizedUsername(environment().medium.username)}`
        return axios.get(proxy + mediumURL, {
            headers: {
                'x-requested-with': 'axios'
            }
        })
            .then(response => mediumParser(response.data))
            .catch(error => {
                return error
            })
    }
}

