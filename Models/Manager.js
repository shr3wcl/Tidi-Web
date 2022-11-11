const mongoose = require('mongoose');

const ManagerSchema = mongoose.Schema({
    idUser: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'User',
        required: true,
    },

    idProject: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Project',
        required: true,
    },

    role: {
        type: Number,
        required: true,
    }
}, {timestamps: true});

module.exports = mongoose.model("Manager", ManagerSchema);
