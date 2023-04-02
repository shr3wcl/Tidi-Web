const mongoose = require("mongoose")

const NotifySchema = mongoose.Schema({
    idUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    idUserTarget: {
        type: String
    },

    idTarget: {
        type: String
    },

    content: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model("Notification",NotifySchema);