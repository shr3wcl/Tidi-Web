const mongoose = require('mongoose');

const CommandSchema = mongoose.Schema({
    idBlog: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Blog',
        required: true,
    },

    idUser: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'User',
        required: true,
    },

    content: {
        type: String,
        required: true,
    },

    favorites: {
        type: Number,
        required: false,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('Command', CommandSchema);
