const mongoose = require('mongoose');

const ProjectSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
    },

    status: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model("Project", ProjectSchema);
