const mongoose = require('mongoose');

const CommandSchema = mongoose.Schema({
    idBlog: {
        type: String,
        require: true,
    },

    idUser: {
        type: String,
        require: true,
    },

    content: {
        type: String,
        require: true,
    },

    favorites: {
        type: Number,
        require: false,
        default: 0
    }
},  { timestamps: true });

module.exports = mongoose.model('Command', CommandSchema);
