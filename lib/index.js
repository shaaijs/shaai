const configurator = require('./config').setup

const getters = require('./src/getters');

class Shaai {

    constructor(options) {
        this.config(options)
    }

    config(options) {
        if (!options) return
        configurator(options)
        this.instantiate()
    }

    instantiate() {
        this.getBlogs = getters.getBlogs
        this.getLatestBlogs = getters.getLatestBlogs
        this.getLatestBlog = getters.getLatestBlog
    }
}

let _instance = null;
module.exports = options => _instance || (_instance = new Shaai(options))
