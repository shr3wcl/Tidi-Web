const mongoose = require('mongoose');

const BlogSchema = mongoose.Schema({
    idOwner: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'User',
        required: true
    },

    title: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 40
    },

    content: {
        type: String,
        required: true,
    },

}, {timestamps: true});

module.exports = mongoose.model("Blog", BlogSchema);
