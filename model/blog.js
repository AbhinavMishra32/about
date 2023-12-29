const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    body: String, 
    date: Date 
});

const BlogPostSchema = mongoose.Schema({
    title: String, 
    author: String,
    body: String, 
    comments: [CommentSchema],
    date: {type: Date, default: Date.now},
    tags: [String]
},{collection: 'users'});

const model = mongoose.model('BlogSchema', BlogSchema);

module.exports = model;
