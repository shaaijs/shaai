const mediumParser = require('./parser');
const environment = require('./../../config').env
const axios = require('axios')

const DEFAULT_PROXY = `https://shaai-medium-proxy.herokuapp.com`

const sanitizedUsername = username => {
    if (username) {
        return username.startsWith('@') ? username : `@${username}`
    }
}

module.exports = {
    get: async (from, size) => {
        const proxy = environment().source.config.proxy || DEFAULT_PROXY
        const mediumURL = `${proxy}/${sanitizedUsername(environment().source.config.username)}`
        return axios.get(mediumURL)
            .then(response => mediumParser(response.data))
            .catch(error => {
                return error
            })
    }
}

