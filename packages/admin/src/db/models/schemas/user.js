const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const Blog = require('./blog')

module.exports = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    blogCode: { type: String, required: true },
    userToken: { type: String, required: true },
    modified: { type: Date, default: Date.now }
});