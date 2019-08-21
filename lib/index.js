const configurator = require('./config').setup
const getters = require('./src/getters');

module.exports = (options, err) => {

    if (!options)
        return err && err({ code: 'NO_OPTIONS_SENT' })
    configurator(options)

    return {
        getBlogs: getters.getBlogs,
        getLatestBlogs: getters.getLatestBlogs,
        getLatestBlog: getters.getLatestBlog
    }
}
