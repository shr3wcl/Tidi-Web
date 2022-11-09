const mongoose = require('mongoose');

const ManagerSchema = mongoose.Schema({
    idUser: {
        type: String,
        require: true,
    },

    idProject: {
        type: String,
        require: true,
    },

    role: {
        type: String,
        require: true,
    }
}, {timestamps: true});

module.exports = mongoose.model("Manager", ManagerSchema);
