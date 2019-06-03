const configurator = require('./config').setup
const getters = require('./src/getters');

const DEFAULT_OPTIONS = {
    source: 'CMS'
}

module.exports = options => {

    if (!options)
        options = DEFAULT_OPTIONS
    configurator(options)

    return {
        getBlogs: getters.getBlogs,
        getLatestBlogs: getters.getLatestBlogs,
        getLatestBlog: getters.getLatestBlog
    }
}