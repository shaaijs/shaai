const environment = require('./../config').env
const medium = require('./../resources/medium')
const cms = require('./../resources/cms')

module.exports = {
    getBlogs: async (from = 0, size = 10) => {
        switch (environment().source.name.toUpperCase()) {
            case 'MEDIUM':
                return await medium.get(from, size)
            case 'CMS':
                return await cms.get(from, size)
        }

    },
    getLatestBlogs: (size = 1) => { },
    getLatestBlog: () => this.getLatestBlogs()
}