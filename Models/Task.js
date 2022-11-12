const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema({
    idProject: {
        type: mongoose.Schema.Types.ObjectID,
        ref: "Project",
        required: true,
    },

    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
    },

    dayStart: {
        type: Date,
        required: true
    },

    dayEnd: {
        type: Date,
    },

    state: {
        type: Number,
        required: true,
    },

    tag: {
        type: String,
    }
})

module.exports = mongoose.model("Task", TaskSchema);
