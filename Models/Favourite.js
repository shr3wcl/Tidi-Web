const mongoose = require('mongoose');

const FavouriteSchema = mongoose.Schema({
    idBlog: {
        type: String,
        required: true
    },

    idUser: {
        type: String,
        required: true,
    },

    quantity: {
        type: Number,
        required: true,
        default: 0
    }

}, { timestamps: true });

module.exports = mongoose.model("Favourite", FavouriteSchema);
