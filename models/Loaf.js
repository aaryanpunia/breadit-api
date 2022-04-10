const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LoafSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^[a-zA-Z1-9]+$/.test(v);
            },
            message: "A Loaf title can only contain letters and numbers",
        }
    },
    bread: { type: Number, default: 0, required: true },
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

module.exports = mongoose.model('Loaf', LoafSchema);