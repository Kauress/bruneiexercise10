
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

//login checking if username and pw match

/*
User.findOne({name:name}, function(err, user){
    //Alternative to exec you can also try this
})

RECOGNIZE PATTERNS - PART OF LEARNING TO DECODE LOGIC

*/

UserSchema.statics.authenticate = function(name, password, callback){
 User.findOne({
     name:name
 }).exec(function(error,user){
     if(error){
         console.log(error)
     } else if(!user){
         var err = new Error("User not found");
         err.status = 401;
         console.log(err);
     }// if user exists
     bcrypt.compare(password, user.password, function(error,result){
         if(result === true){
             return callback(null, user);
         } else {
             return callback()
         }
     })
 })

}// end of function

/*

Sendgrid node mailer


*/


/*
UserSchema.pre("save", function(next){
const self = this;
User.find({
 name: self.name
}, function(err, docs){
    if(!docs.length){
        next();
    } else{
        console.log("user exists", self.name);
        next();
    }

})

})
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