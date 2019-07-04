const environment = require('./../../config').env
const axios = require('axios')

const DEFAULT_CMS = `https://shaai.herokuapp.com`

module.exports = {
    get: async (from, size) => {
        const host = environment().source.config.adminUrl || DEFAULT_CMS
        const blogCode = environment().source.config.blogCode
        const url = `${host}/api/blogs/${blogCode}`
        return axios.get(url)
            .then(response => {
                return { items: response.data }
            })
            .catch(error => {
                return error
            })
    }
}

