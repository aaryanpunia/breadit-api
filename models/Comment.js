const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new mongoose.Schema({
    content: { type: String, required: true },
    author_id: { type: Schema.Types.ObjectId, ref: 'User' },
    author_name: { type: String, required: true },
    post_id: { type: Schema.Types.ObjectId, ref: 'Post' },
});

module.exports = mongoose.model('Comment', CommentSchema);