const mongoose = require("mongoose");

const FollowSchema = mongoose.Schema({
    idUser: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'User',
        required: true
    },

    followers: {
        type: mongoose.Schema.Types.Mixed,
        default: []
    }
}, { timestamps: true })

module.exports = mongoose.Model("Follow", FollowSchema);