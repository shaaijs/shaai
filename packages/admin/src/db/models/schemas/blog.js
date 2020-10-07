const mongoose = require('mongoose')
const Schema = mongoose.Schema;

module.exports = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    subtitle: { type: String, required: true },
    publishedDate: { type: String },
    author: { type: String, required: true },
    userId: { type: String, required: true },
    publicUrl: { type: String },
    coverImage: { type: String },
    modified: { type: Date, default: Date.now }
});