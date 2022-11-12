const mongoose = require("mongoose");

const ScheduleSchema = mongoose.Schema({
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

    state: {
        type: Number,
        required: true,
    },

    stateAlarm: {
        type: Boolean,
        required: true,
        default: false
    },

    dayStart: {
        type: Date,
        required: true,
    },

    dayEnd: {
        type: Date,
    },

    tag: {
        type: String,
    }
})

module.exports = mongoose.model("Schedule", ScheduleSchema);
