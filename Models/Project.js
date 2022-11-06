const mongoose = require('mongoose');

const Project = mongoose.Schema({
    name: {
        type: String,

    }
}, {timestamps: true});

module.exports = mongoose.model("Project", UserSchema);
