const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        validate: {
            validator: function (v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email"
        },
        required: true,
    },
    username: {
        type: String,
        default: "Breaditor.1.1",
    },
    password: {
        type: String,
        required: true,
    },
    bread: { type: Number, default: 100 },
    loafs: [{ type: Schema.Types.ObjectId, ref: 'Loaf' }],
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
});

module.exports = mongoose.model('User', UserSchema);