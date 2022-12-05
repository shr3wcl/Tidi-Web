const mongoose = require("mongoose");

const FollowSchema = mongoose.Schema({
    idUser: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'User',
        required: true
    },

    idFollow: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'User',
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model("Follow", FollowSchema);