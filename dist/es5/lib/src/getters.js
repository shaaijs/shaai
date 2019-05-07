'use strict';

var environment = require('./../config').env;
var medium = require('./../resources/medium');
module.exports = {
    getBlogs: async function getBlogs() {
        var from = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;

        if (environment().source == 'MEDIUM') {
            return await medium.get(from, size);
        }
    },
    getLatestBlogs: function getLatestBlogs() {
        var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    },
    getLatestBlog: function getLatestBlog() {
        return undefined.getLatestBlogs();
    }
};