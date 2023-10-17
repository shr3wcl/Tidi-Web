const mongoose = require("mongoose");

const TodoSchema = mongoose.Schema({
    idProject: {
        type: mongoose.Schema.Types.ObjectID,
        ref: "Project",
        required: true,
    },

    title: {
        type: String,
        required: true,
    },

    content: {
        type: String,
    },

    state: {
        type: Number,
        required: true,
    },

    tag: {
        type: String,
    }
})

module.exports = mongoose.model("Todo", TodoSchema);
