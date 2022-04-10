const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;

const PostSchema = new mongoose.Schema({
    author_id: { type: Schema.Types.ObjectId, ref: 'User' },
    author_name: { type: String, required: true },
    title: {
        type: String,
        required: true,
    },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    date: {
        type: Date,
        default: new Date(moment.utc().format()),
    },
    content: String,
    bread: { type: Number, default: 0, required: true }
});

module.exports = mongoose.model('Post', PostSchema);