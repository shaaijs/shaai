const mongoose = require('mongoose')
const blogSchema = require('./schemas/blog')

module.exports = mongoose.model('Blog', blogSchema)