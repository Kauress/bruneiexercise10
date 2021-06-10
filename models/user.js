
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema  = new mongoose.Schema({
    name: {
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

/*
pre save runs before the user.create call

*/


UserSchema.pre("save", function(next){
    const user  = this;
    bcrypt.hash(user.password, 10,(err, hash)=>{
        if(err){
            return next();
        }
        user.password = hash;
        next();
    });
});

const User = mongoose.model("User", UserSchema); //create a mongoose model based on UserSchema 
//and call it User and save it as a variable called User. Nice
module.exports = User;