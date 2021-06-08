
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema  = new mongoose.Schema({
    username: {
     type: String,
     unique: true,
     lowercase: true,
     required: true,
     trim: true
    },
    password: {
        type: String,
        required: true,
        minlength : 6,
        trim: true

    }
});
const User = mongoose.model("User", UserSchema);
module.exports = User;