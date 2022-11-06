const mongoose = require('mongoose');

const BlogSchema = mongoose.Schema({
    idOwner: {
        type: String,
        require: true
    },
    title: {
        type: String,
        require: true,
        minLength: 1,
        maxLength: 40
    },
    description: {
        type: String,
        require: true,
    }

}, {timestamps: true});

module.exports = mongoose.model("Blog", BlogSchema);
