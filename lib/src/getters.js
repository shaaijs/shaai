const environment = require('./../config').env
const medium = require('./../resources/medium')
module.exports = {
    getBlogs: async (from = 0, size = 10) => {
        if (environment().source == 'MEDIUM') {
            return await medium.get(from, size)
        }
    },
    getLatestBlogs: (size = 1) => { },
    getLatestBlog: () => this.getLatestBlogs()
}