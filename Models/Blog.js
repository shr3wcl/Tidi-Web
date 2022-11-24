const mongoose = require('mongoose');

const BlogSchema = mongoose.Schema({
    idUser: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'User',
        required: true
    },

    title: {
        type: String,
        required: true,
        minLength: 1,
    },

    content: {
        type: mongoose.Schema.Types.Mixed
    },

    status: {
        type: Boolean,
        default: true
    }

}, { timestamps: true });

module.exports = mongoose.model("Blog", BlogSchema);
