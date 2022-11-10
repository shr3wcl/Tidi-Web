const mongoose = require('mongoose');

const ProjectSchema = mongoose.Schema({
    idTask: {
        type: String,
        require: true
    },

    idTodo: {
        type: String,
        require: true,
    },

    id_schedule: {
        type: String,
        require: true,
    },

    idNote: {
        type: String,
        require: true,
    },
}, { timestamps: true });

module.exports = mongoose.model("Project", ProjectSchema);
