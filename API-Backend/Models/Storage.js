const mongoose = require('mongoose');

const StorageSchema = mongoose.Schema({
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

}, { timestamps: true });

module.exports = mongoose.model("Storage", StorageSchema);
