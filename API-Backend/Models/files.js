const mongoose = require('mongoose');

const FileSchema = mongoose.Schema({
    idUser: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'User',
        required: true
    },

    nameFile: {
        type: String,
        required: true
    },

    nameStorage: {
        type: String,
        required: true
    },

    typeFile: {
        type: String,
        default: "image"
    }

}, { timestamps: true });

module.exports = mongoose.model("File", FileSchema);
