const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    firstName: {
      type: String,
      require: true,
      minLength: 1,
    },
    lastName: {
        type: String,
        require: true,
        minLength: 1,
    },
    username: {
        type: String,
        require: true,
        minLength: 6,
        maxLength: 30,
        unique: true
    },
    email:{
        type: String,
        require: true,
        minLength: 6,
        unique: true,
    },
    gender: {
        type: Boolean,
        require: true
    },
    birthday: {
        type: Date,
        require: false,
    }
    ,
    password:{
        type: String,
        require: true,
    },

    admin:{
        type: Boolean,
        default: false
    }
}, {timestamps: true});

module.exports = mongoose.model("User", UserSchema);
