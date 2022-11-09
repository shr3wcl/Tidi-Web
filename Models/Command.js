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
    }
},  { timestamps: true });

module.exports = mongoose.model('Command', CommandSchema);
