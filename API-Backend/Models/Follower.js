const mongoose = require("mongoose");

const FollowerSchema = mongoose.Schema({
    idUser: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'User',
        required: true
    },

    idFollowed: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'User',
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.Model("Follower", FollowerSchema);