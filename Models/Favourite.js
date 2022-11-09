const mongoose = require('mongoose');

const FavouriteSchema = mongoose.Schema({
    idBlog: {
        type: String,
        require: true
    },

    idUser: {
        type: String,
        require: true,
    },

    quantity: {
        type: Number,
        require: true,
        default: 0
    }

}, {timestamps: true});

module.exports = mongoose.model("Favourite", FavouriteSchema);
